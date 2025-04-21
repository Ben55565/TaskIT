package com.taskit.backend.service;

import com.taskit.backend.entity.ChecklistItem;
import com.taskit.backend.repositories.ChecklistItemRepository;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ChecklistItemServiceImpl implements ChecklistItemService {
	
	private final ChecklistItemRepository checklistItemRepository;
	
	@Autowired
	public ChecklistItemServiceImpl (ChecklistItemRepository checklistItemRepository) {
		this.checklistItemRepository = checklistItemRepository;
	}
	
	@Transactional
	@Override
	public ChecklistItem createOrUpdate (ChecklistItem checklistItem) {
		ChecklistItem saved = checklistItemRepository.save(checklistItem);
		checklistItemRepository.flush();
		return saved;
	}
	
	@Transactional
	@Override
	public void delete (int id) {
		checklistItemRepository.deleteById(id);
		checklistItemRepository.flush();
	}
	
	@Override
	public ChecklistItem read (int id) {
		return checklistItemRepository.findById(id).orElse(null);
	}
	
	@Override
	public List<ChecklistItem> readAll () {
		return checklistItemRepository.findAll();
	}
}
