package com.taskit.backend.repositories;

import com.taskit.backend.entity.Checklist;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ChecklistRepository extends JpaRepository<Checklist, Integer>  {
}
