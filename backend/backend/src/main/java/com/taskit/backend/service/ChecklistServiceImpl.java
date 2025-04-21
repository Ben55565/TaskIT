package com.taskit.backend.service;

import com.taskit.backend.entity.Checklist;
import com.taskit.backend.repositories.ChecklistRepository;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ChecklistServiceImpl implements ChecklistService {
	
	private final ChecklistRepository checklistRepository;
	
	@Autowired
	public ChecklistServiceImpl (ChecklistRepository checklistRepository) {
		this.checklistRepository = checklistRepository;
	}
	
	@Transactional
	@Override
	public Checklist createOrUpdate (Checklist checklist) {
		Checklist saved = checklistRepository.save(checklist);
		checklistRepository.flush();
		return saved;
	}
	
	@Transactional
	@Override
	public void delete (int id) {
		checklistRepository.deleteById(id);
		checklistRepository.flush();
	}
	
	@Override
	public Checklist read (int id) {
		return checklistRepository.findById(id).orElse(null);
	}
	
	@Override
	public List<Checklist> readAll () {
		return checklistRepository.findAll();
	}
}
