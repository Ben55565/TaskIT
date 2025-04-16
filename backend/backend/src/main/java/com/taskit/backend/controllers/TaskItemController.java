package com.taskit.backend.controllers;

import com.taskit.backend.entity.ChecklistItem;
import com.taskit.backend.service.ChecklistItemService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.Collections;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping ("/api/list-items")
public class TaskItemController {
	
	@Autowired
	private ChecklistItemService checklistItemService;
	
	@GetMapping ()
	public ResponseEntity<List<ChecklistItem>> getAll () {
		List<ChecklistItem> allItems = checklistItemService.readAll();
		
		if (allItems.isEmpty()) {
			return ResponseEntity.ok(Collections.emptyList());
		}
		
		return ResponseEntity.ok(allItems);
		
	}
	
	@PostMapping ()
	public ResponseEntity<Map> create (@RequestBody ChecklistItem checklistItem) {
		checklistItem.setDateTime(LocalDateTime.now());
		checklistItemService.createOrUpdate(checklistItem);
		
		return ResponseEntity.ok().body(Map.of("success", "Checklist item created successfully"));
	}
}
