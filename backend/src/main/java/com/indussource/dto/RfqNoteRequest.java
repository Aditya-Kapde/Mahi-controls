package com.indussource.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class RfqNoteRequest {
    @NotBlank(message = "Note cannot be blank")
    private String note;
}
