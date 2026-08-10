package com.indussource.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.util.UUID;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class RfqItemRequest {
    private UUID productId;
    private String productName;
    private Integer quantity;
    private LocalDate targetDeliveryDate;
}
