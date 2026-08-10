package com.indussource.service;

import com.indussource.dto.RfqCreateRequest;
import com.indussource.dto.RfqResponse;
import com.indussource.exception.ResourceNotFoundException;
import com.indussource.model.Product;
import com.indussource.model.RfqItem;
import com.indussource.model.RfqNote;
import com.indussource.model.RfqRequest;
import com.indussource.model.User;
import com.indussource.repository.ProductRepository;
import com.indussource.repository.RfqNoteRepository;
import com.indussource.repository.RfqRequestRepository;
import com.indussource.repository.RfqItemRepository;
import com.indussource.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
public class RfqService {

    @Autowired
    private RfqRequestRepository rfqRequestRepository;

    @Autowired
    private RfqItemRepository rfqItemRepository;

    @Autowired
    private RfqNoteRepository rfqNoteRepository;

    @Autowired
    private ProductRepository productRepository;

    @Autowired
    private UserRepository userRepository;

    @Transactional
    public RfqResponse createRfq(RfqCreateRequest request) {
        RfqRequest rfq = RfqRequest.builder()
                .companyName(request.getCompanyName())
                .contactPerson(request.getContactPerson())
                .email(request.getEmail())
                .phone(request.getPhone())
                .gstin(request.getGstin())
                .projectLocation(request.getProjectLocation())
                .message(request.getMessage())
                .status(RfqRequest.RfqStatus.NEW)
                .build();

        final RfqRequest savedRfq = rfqRequestRepository.save(rfq);

        List<RfqItem> items = new ArrayList<>();
        if (request.getItems() != null) {
            items = request.getItems().stream().map(dto -> {
                Product product = null;
                if (dto.getProductId() != null) {
                    product = productRepository.findById(dto.getProductId()).orElse(null);
                }
                
                RfqItem item = RfqItem.builder()
                        .rfqRequest(savedRfq)
                        .product(product)
                        .productName(dto.getProductName() != null ? dto.getProductName() : (product != null ? product.getTitle() : null))
                        .quantity(dto.getQuantity())
                        .targetDeliveryDate(dto.getTargetDeliveryDate())
                        .build();
                return rfqItemRepository.save(item);
            }).collect(Collectors.toList());
        }

        return mapToResponse(savedRfq, items, Collections.emptyList());
    }

    public Page<RfqResponse> getAllRfqs(RfqRequest.RfqStatus status, Pageable pageable) {
        Page<RfqRequest> rfqs;
        if (status != null) {
            rfqs = rfqRequestRepository.findByStatusOrderByCreatedAtDesc(status, pageable);
        } else {
            rfqs = rfqRequestRepository.findAllByOrderByCreatedAtDesc(pageable);
        }
        
        return rfqs.map(rfq -> mapToResponse(
                rfq, 
                rfqItemRepository.findByRfqRequest(rfq), 
                rfqNoteRepository.findByRfqRequest(rfq)
        ));
    }

    public RfqResponse getRfqById(UUID id) {
        RfqRequest rfq = rfqRequestRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("RFQ not found"));
                
        List<RfqItem> items = rfqItemRepository.findByRfqRequest(rfq);
        List<RfqNote> notes = rfqNoteRepository.findByRfqRequest(rfq);
        
        return mapToResponse(rfq, items, notes);
    }

    @Transactional
    public RfqResponse updateRfqStatus(UUID id, RfqRequest.RfqStatus status) {
        RfqRequest rfq = rfqRequestRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("RFQ not found"));
                
        rfq.setStatus(status);
        RfqRequest updated = rfqRequestRepository.save(rfq);
        
        return mapToResponse(updated, rfqItemRepository.findByRfqRequest(updated), rfqNoteRepository.findByRfqRequest(updated));
    }

    @Transactional
    public RfqResponse addRfqNote(UUID id, String note, UUID authorId) {
        RfqRequest rfq = rfqRequestRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("RFQ not found"));
                
        User author = userRepository.findById(authorId)
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));
                
        RfqNote rfqNote = RfqNote.builder()
                .rfqRequest(rfq)
                .author(author)
                .note(note)
                .build();
                
        rfqNoteRepository.save(rfqNote);
        
        return mapToResponse(rfq, rfqItemRepository.findByRfqRequest(rfq), rfqNoteRepository.findByRfqRequest(rfq));
    }

    private RfqResponse mapToResponse(RfqRequest rfq, List<RfqItem> items, List<RfqNote> notes) {
        List<RfqResponse.RfqItemDto> itemDtos = items.stream()
                .map(item -> RfqResponse.RfqItemDto.builder()
                        .id(item.getId())
                        .productId(item.getProduct() != null ? item.getProduct().getId() : null)
                        .productName(item.getProductName())
                        .quantity(item.getQuantity())
                        .targetDeliveryDate(item.getTargetDeliveryDate())
                        .build())
                .collect(Collectors.toList());

        List<RfqResponse.RfqNoteDto> noteDtos = notes.stream()
                .map(note -> RfqResponse.RfqNoteDto.builder()
                        .id(note.getId())
                        .note(note.getNote())
                        .authorName(note.getAuthor() != null ? note.getAuthor().getFullName() : "Unknown")
                        .createdAt(note.getCreatedAt())
                        .build())
                .collect(Collectors.toList());

        return RfqResponse.builder()
                .id(rfq.getId())
                .companyName(rfq.getCompanyName())
                .contactPerson(rfq.getContactPerson())
                .email(rfq.getEmail())
                .phone(rfq.getPhone())
                .gstin(rfq.getGstin())
                .projectLocation(rfq.getProjectLocation())
                .message(rfq.getMessage())
                .status(rfq.getStatus())
                .createdAt(rfq.getCreatedAt())
                .updatedAt(rfq.getUpdatedAt())
                .items(itemDtos)
                .notes(noteDtos)
                .build();
    }
}
