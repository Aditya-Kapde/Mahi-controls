package com.indussource.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class ProductImageRequest {
    @NotBlank(message = "ImageUrl is required")
    private String imageUrl;

    @NotBlank(message = "PublicId is required")
    private String publicId;

    private Boolean isPrimary = false;
}
