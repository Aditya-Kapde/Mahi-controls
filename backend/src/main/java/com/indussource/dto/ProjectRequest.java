package com.indussource.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.Data;

@Data
public class ProjectRequest {
    @NotBlank(message = "Title is required")
    private String title;

    @NotBlank(message = "Client name is required")
    private String clientName;

    @NotBlank(message = "Location is required")
    private String location;

    private Integer completionYear;

    @NotBlank(message = "Summary is required")
    @Size(max = 500, message = "Summary cannot exceed 500 characters")
    private String summary;

    private String description;

    private String equipmentSupplied;

    private Boolean isFeatured;

    private String primaryImageUrl;

    private String imagePublicId;
}
