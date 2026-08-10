package com.indussource.dto;

import com.indussource.model.RfqRequest;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class RfqResponse {
    private UUID id;
    private String companyName;
    private String contactPerson;
    private String email;
    private String phone;
    private String gstin;
    private String projectLocation;
    private String message;
    private RfqRequest.RfqStatus status;
    private List<RfqItemDto> items;
    private List<RfqNoteDto> notes;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;

    @Data
    @Builder
    @NoArgsConstructor
    @AllArgsConstructor
    public static class RfqItemDto {
        private UUID id;
        private UUID productId;
        private String productName;
        private Integer quantity;
        private LocalDate targetDeliveryDate;
    }

    @Data
    @Builder
    @NoArgsConstructor
    @AllArgsConstructor
    public static class RfqNoteDto {
        private UUID id;
        private String note;
        private String authorName;
        private LocalDateTime createdAt;
    }
}
