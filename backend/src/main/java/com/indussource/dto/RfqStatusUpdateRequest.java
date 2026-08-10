package com.indussource.dto;

import com.indussource.model.RfqRequest;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class RfqStatusUpdateRequest {
    @NotNull(message = "Status cannot be null")
    private RfqRequest.RfqStatus status;
}
