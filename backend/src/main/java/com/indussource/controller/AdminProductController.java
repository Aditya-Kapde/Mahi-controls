package com.indussource.controller;

import com.indussource.dto.ProductCreateRequest;
import com.indussource.dto.ProductResponse;
import com.indussource.service.ProductService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;

@RestController
@RequestMapping("/api/v1/admin/products")
@PreAuthorize("hasRole('ADMIN')")
public class AdminProductController {

    @Autowired
    private ProductService productService;

    @GetMapping
    public ResponseEntity<org.springframework.data.domain.Page<ProductResponse>> getAllProducts(
            @org.springdoc.core.annotations.ParameterObject @org.springframework.data.web.PageableDefault(size = 10, sort = "createdAt", direction = org.springframework.data.domain.Sort.Direction.DESC) org.springframework.data.domain.Pageable pageable) {
        return ResponseEntity.ok(productService.getAllAdminProducts(pageable));
    }

    @PostMapping
    public ResponseEntity<ProductResponse> createProduct(@Valid @RequestBody ProductCreateRequest request) {
        return ResponseEntity.status(HttpStatus.CREATED).body(productService.createProduct(request));
    }

    @PutMapping("/{id}")
    public ResponseEntity<ProductResponse> updateProduct(
            @PathVariable UUID id,
            @Valid @RequestBody ProductCreateRequest request) {
        return ResponseEntity.ok(productService.updateProduct(id, request));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> archiveProduct(@PathVariable UUID id) {
        productService.archiveProduct(id);
        return ResponseEntity.noContent().build();
    }

    @PostMapping("/{id}/images")
    public ResponseEntity<ProductResponse> addProductImage(
            @PathVariable UUID id,
            @Valid @RequestBody com.indussource.dto.ProductImageRequest request) {
        return ResponseEntity.ok(productService.addProductImage(id, request.getImageUrl(), request.getPublicId(), request.getIsPrimary()));
    }

    @DeleteMapping("/{id}/images/{publicId}")
    public ResponseEntity<ProductResponse> removeProductImage(
            @PathVariable UUID id,
            @PathVariable String publicId) {
        return ResponseEntity.ok(productService.removeProductImage(id, publicId));
    }
}
