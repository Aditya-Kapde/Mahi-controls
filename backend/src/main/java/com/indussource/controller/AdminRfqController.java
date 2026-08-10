package com.indussource.controller;

import com.indussource.dto.RfqNoteRequest;
import com.indussource.dto.RfqResponse;
import com.indussource.dto.RfqStatusUpdateRequest;
import com.indussource.model.RfqRequest;
import com.indussource.service.RfqService;
import jakarta.validation.Valid;
import org.springdoc.core.annotations.ParameterObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import com.indussource.repository.UserRepository;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;

@RestController
@RequestMapping("/api/v1/admin/rfq")
@PreAuthorize("hasAnyRole('ADMIN', 'SALES_MANAGER')")
public class AdminRfqController {

    @Autowired
    private RfqService rfqService;

    @Autowired
    private UserRepository userRepository;

    @GetMapping
    public ResponseEntity<Page<RfqResponse>> getAllRfqs(
            @RequestParam(required = false) RfqRequest.RfqStatus status,
            @ParameterObject Pageable pageable) {
        return ResponseEntity.ok(rfqService.getAllRfqs(status, pageable));
    }

    @GetMapping("/{id}")
    public ResponseEntity<RfqResponse> getRfqById(@PathVariable UUID id) {
        return ResponseEntity.ok(rfqService.getRfqById(id));
    }

    @PatchMapping("/{id}/status")
    public ResponseEntity<RfqResponse> updateRfqStatus(
            @PathVariable UUID id,
            @Valid @RequestBody RfqStatusUpdateRequest request) {
        return ResponseEntity.ok(rfqService.updateRfqStatus(id, request.getStatus()));
    }

    @PostMapping("/{id}/notes")
    public ResponseEntity<RfqResponse> addRfqNote(
            @PathVariable UUID id,
            @Valid @RequestBody RfqNoteRequest request,
            org.springframework.security.core.Authentication authentication) {
        
        String email = authentication.getName();
        com.indussource.model.User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new com.indussource.exception.ResourceNotFoundException("User not found"));
                
        return ResponseEntity.ok(rfqService.addRfqNote(id, request.getNote(), user.getId()));
    }
}
