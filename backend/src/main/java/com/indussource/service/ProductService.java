package com.indussource.service;

import com.indussource.dto.ProductCreateRequest;
import com.indussource.dto.ProductResponse;
import com.indussource.exception.ResourceNotFoundException;
import com.indussource.model.Category;
import com.indussource.model.Product;
import com.indussource.repository.CategoryRepository;
import com.indussource.repository.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Collections;
import java.util.UUID;

@Service
public class ProductService {

    @Autowired
    private ProductRepository productRepository;

    @Autowired
    private CategoryRepository categoryRepository;

    public Page<ProductResponse> getPublicProducts(UUID categoryId, Boolean featured, Pageable pageable) {
        Page<Product> products;
        
        if (categoryId != null) {
            products = productRepository.findByCategoryIdAndStatus(categoryId, Product.ProductStatus.ACTIVE, pageable);
        } else if (Boolean.TRUE.equals(featured)) {
            products = productRepository.findByIsFeaturedTrueAndStatus(Product.ProductStatus.ACTIVE, pageable);
        } else {
            products = productRepository.findByStatus(Product.ProductStatus.ACTIVE, pageable);
        }
        
        return products.map(this::mapToResponse);
    }

    public Page<ProductResponse> getAllAdminProducts(Pageable pageable) {
        return productRepository.findAll(pageable).map(this::mapToResponse);
    }

    public ProductResponse getProductBySlug(String slug) {
        Product product = productRepository.findBySlugAndStatus(slug, Product.ProductStatus.ACTIVE)
                .orElseThrow(() -> new ResourceNotFoundException("Product not found with slug: " + slug));
        return mapToResponse(product);
    }

    @Transactional
    public ProductResponse createProduct(ProductCreateRequest request) {
        Category category = categoryRepository.findById(request.getCategoryId())
                .orElseThrow(() -> new ResourceNotFoundException("Category not found"));

        // Simplistic slug generation
        String slug = request.getTitle().toLowerCase().replaceAll("[^a-z0-9]+", "-");

        Product product = Product.builder()
                .title(request.getTitle())
                .slug(slug)
                .category(category)
                .shortDescription(request.getShortDescription())
                .fullDescription(request.getFullDescription())
                .specifications(request.getSpecifications())
                .isFeatured(request.getIsFeatured())
                .status(Product.ProductStatus.ACTIVE)
                .build();

        return mapToResponse(productRepository.save(product));
    }

    @Transactional
    public ProductResponse updateProduct(UUID id, ProductCreateRequest request) {
        Product product = productRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Product not found"));

        Category category = categoryRepository.findById(request.getCategoryId())
                .orElseThrow(() -> new ResourceNotFoundException("Category not found"));

        product.setTitle(request.getTitle());
        // Skip updating slug unless title changes significantly (simplified for now)
        product.setCategory(category);
        product.setShortDescription(request.getShortDescription());
        product.setFullDescription(request.getFullDescription());
        product.setSpecifications(request.getSpecifications());
        product.setIsFeatured(request.getIsFeatured());

        return mapToResponse(productRepository.save(product));
    }

    @Transactional
    public void archiveProduct(UUID id) {
        Product product = productRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Product not found"));
        product.setStatus(Product.ProductStatus.ARCHIVED);
        productRepository.save(product);
    }

    @Autowired
    private com.indussource.repository.ProductImageRepository productImageRepository;

    @Transactional
    public ProductResponse addProductImage(UUID productId, String imageUrl, String publicId, Boolean isPrimary) {
        Product product = productRepository.findById(productId)
                .orElseThrow(() -> new ResourceNotFoundException("Product not found"));

        com.indussource.model.ProductImage image = com.indussource.model.ProductImage.builder()
                .product(product)
                .imageUrl(imageUrl)
                .publicId(publicId)
                .isPrimary(isPrimary != null ? isPrimary : false)
                .build();
        productImageRepository.save(image);
        return getProductBySlug(product.getSlug());
    }

    @Transactional
    public ProductResponse removeProductImage(UUID productId, String publicId) {
        Product product = productRepository.findById(productId)
                .orElseThrow(() -> new ResourceNotFoundException("Product not found"));
        
        com.indussource.model.ProductImage image = productImageRepository.findByPublicId(publicId)
                .orElseThrow(() -> new ResourceNotFoundException("Image not found with publicId: " + publicId));
                
        if (!image.getProduct().getId().equals(productId)) {
            throw new IllegalArgumentException("Image does not belong to this product");
        }
        
        productImageRepository.delete(image);
        return getProductBySlug(product.getSlug());
    }

    private ProductResponse mapToResponse(Product product) {
        java.util.List<ProductResponse.ProductImageDto> imageDtos = java.util.Collections.emptyList();
        if (product.getId() != null) {
            java.util.List<com.indussource.model.ProductImage> images = productImageRepository.findByProductId(product.getId());
            imageDtos = images.stream().map(img -> ProductResponse.ProductImageDto.builder()
                    .id(img.getId())
                    .imageUrl(img.getImageUrl())
                    .publicId(img.getPublicId())
                    .isPrimary(img.getIsPrimary())
                    .build()).collect(java.util.stream.Collectors.toList());
        }

        return ProductResponse.builder()
                .id(product.getId())
                .title(product.getTitle())
                .slug(product.getSlug())
                .categoryId(product.getCategory() != null ? product.getCategory().getId() : null)
                .categoryName(product.getCategory() != null ? product.getCategory().getName() : null)
                .shortDescription(product.getShortDescription())
                .fullDescription(product.getFullDescription())
                .specifications(product.getSpecifications())
                .isFeatured(product.getIsFeatured())
                .status(product.getStatus())
                .createdAt(product.getCreatedAt())
                .images(imageDtos)
                .build();
    }
}
