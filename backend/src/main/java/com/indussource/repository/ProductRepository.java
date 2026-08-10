package com.indussource.repository;

import com.indussource.model.Product;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;
import java.util.UUID;

@Repository
public interface ProductRepository extends JpaRepository<Product, UUID> {
    Page<Product> findByStatus(Product.ProductStatus status, Pageable pageable);
    Page<Product> findByCategoryIdAndStatus(UUID categoryId, Product.ProductStatus status, Pageable pageable);
    Page<Product> findByIsFeaturedTrueAndStatus(Product.ProductStatus status, Pageable pageable);
    Optional<Product> findBySlugAndStatus(String slug, Product.ProductStatus status);
}
