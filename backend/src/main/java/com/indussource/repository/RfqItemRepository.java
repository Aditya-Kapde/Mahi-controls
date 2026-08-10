package com.indussource.repository;

import com.indussource.model.RfqItem;
import com.indussource.model.RfqRequest;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
public interface RfqItemRepository extends JpaRepository<RfqItem, UUID> {
    List<RfqItem> findByRfqRequest(RfqRequest rfqRequest);
}
