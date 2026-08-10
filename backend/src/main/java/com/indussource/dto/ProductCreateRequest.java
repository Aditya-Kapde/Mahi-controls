package com.indussource.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

import java.util.UUID;

@Data
public class ProductCreateRequest {
    @NotBlank(message = "Title cannot be blank")
    private String title;

    @NotNull(message = "Category ID is required")
    private UUID categoryId;

    private String shortDescription;
    private String fullDescription;
    
    // Storing as JSON string
    private String specifications;

    private Boolean isFeatured = false;
}
