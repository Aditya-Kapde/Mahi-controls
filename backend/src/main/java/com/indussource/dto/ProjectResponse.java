package com.indussource.dto;

import lombok.Builder;
import lombok.Data;

import java.time.LocalDateTime;
import java.util.UUID;

@Data
@Builder
public class ProjectResponse {
    private UUID id;
    private String title;
    private String slug;
    private String clientName;
    private String location;
    private Integer completionYear;
    private String summary;
    private String description;
    private String equipmentSupplied;
    private Boolean isFeatured;
    private String primaryImageUrl;
    private String imagePublicId;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
}
