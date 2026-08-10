package com.indussource.repository;

import com.indussource.model.RfqNote;
import com.indussource.model.RfqRequest;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
public interface RfqNoteRepository extends JpaRepository<RfqNote, UUID> {
    List<RfqNote> findByRfqRequest(RfqRequest rfqRequest);
}
