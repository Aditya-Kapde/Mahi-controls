package com.indussource.repository;

import com.indussource.model.RfqRequest;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.UUID;

@Repository
public interface RfqRequestRepository extends JpaRepository<RfqRequest, UUID> {
    Page<RfqRequest> findAllByOrderByCreatedAtDesc(Pageable pageable);
    Page<RfqRequest> findByStatusOrderByCreatedAtDesc(RfqRequest.RfqStatus status, Pageable pageable);
}
