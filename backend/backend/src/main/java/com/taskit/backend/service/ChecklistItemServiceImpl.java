package com.taskit.backend.service;

import com.taskit.backend.entity.ChecklistItem;
import com.taskit.backend.repositories.ChecklistItemRepository;
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
	
	@Override
	public ChecklistItem createOrUpdate (ChecklistItem checklistItem) {
		return checklistItemRepository.save(checklistItem);
	}
	
	@Override
	public void delete (int id) {
		checklistItemRepository.deleteById(id);
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
