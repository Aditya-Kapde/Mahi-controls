package com.indussource.dto;

import com.indussource.model.Product;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ProductResponse {
    private UUID id;
    private String title;
    private String slug;
    private UUID categoryId;
    private String categoryName;
    private String shortDescription;
    private String fullDescription;
    private String specifications;
    private Boolean isFeatured;
    private List<ProductImageDto> images;
    private Product.ProductStatus status;
    private LocalDateTime createdAt;

    @Data
    @Builder
    @NoArgsConstructor
    @AllArgsConstructor
    public static class ProductImageDto {
        private UUID id;
        private String imageUrl;
        private String publicId;
        private Boolean isPrimary;
    }
}
