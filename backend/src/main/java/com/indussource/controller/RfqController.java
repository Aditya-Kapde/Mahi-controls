package com.indussource.controller;

import com.indussource.dto.RfqCreateRequest;
import com.indussource.dto.RfqResponse;
import com.indussource.service.RfqService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/rfq")
public class RfqController {

    @Autowired
    private RfqService rfqService;

    @PostMapping
    public ResponseEntity<RfqResponse> createRfq(@Valid @RequestBody RfqCreateRequest request) {
        return ResponseEntity.status(HttpStatus.CREATED).body(rfqService.createRfq(request));
    }
}
