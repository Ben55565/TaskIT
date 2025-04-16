package com.taskit.backend.controllers;

import com.taskit.backend.entity.Checklist;
import com.taskit.backend.service.ChecklistService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.Collections;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping ("/api/tasks")
public class TaskController {
	
	@Autowired
	private ChecklistService checklistService;
	
	@GetMapping ()
	public ResponseEntity<List<Checklist>> getAll () {
		List<Checklist> allNotes = checklistService.readAll();
		
		if (allNotes.isEmpty()) {
			return ResponseEntity.ok(Collections.emptyList());
		}
		
		return ResponseEntity.ok(allNotes);
		
	}
	
	@PostMapping ()
	public ResponseEntity<Map> create (@RequestBody Checklist checklist) {
		checklist.setDateTime(LocalDateTime.now());
		checklistService.createOrUpdate(checklist);
		
		return ResponseEntity.ok().body(Map.of("success", "Checklist created successfully"));
	}
}
