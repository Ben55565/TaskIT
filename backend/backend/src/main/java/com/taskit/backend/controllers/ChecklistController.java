package com.taskit.backend.controllers;

import com.taskit.backend.entity.Checklist;
import com.taskit.backend.entity.ChecklistItem;
import com.taskit.backend.responses.ChecklistResponse;
import com.taskit.backend.service.ChecklistItemService;
import com.taskit.backend.service.ChecklistService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;

@RestController
@RequestMapping ("/api/checklists")
public class ChecklistController {
	
	@Autowired
	private ChecklistService checklistService;
	
	@Autowired
	private ChecklistItemService checklistItemService;
	
	@GetMapping ()
	public ResponseEntity<List<ChecklistResponse>> getUserChecklists(@RequestParam String username) {
		List<Checklist> userChecklists = checklistService.readAll().stream()
				.filter(cl -> username.equals(cl.getUsername()))
				.toList();
		
		List<ChecklistItem> allItems = checklistItemService.readAll();
		
		List<ChecklistResponse> response = userChecklists.stream()
				.map(cl -> {
					List<ChecklistItem> tasks = allItems.stream()
							.filter(item -> item.getTaskId() == cl.getId())
							.toList();
					return new ChecklistResponse(cl, tasks);
				})
				.toList();
		
		return ResponseEntity.ok(response);
	}
	
	@PostMapping ()
	public ResponseEntity<String> addNewChecklist(@RequestBody ChecklistResponse checklistResponse) {
		Checklist cl = checklistResponse.getChecklist();
		List<ChecklistItem> items = checklistResponse.getTasks();
		cl.setDateTime(LocalDateTime.now());
		Checklist createdCL = checklistService.createOrUpdate(cl);
		items.forEach(item -> {
			item.setDateTime(LocalDateTime.now());
			item.setTaskId(createdCL.getId());
			checklistItemService.createOrUpdate(item);
			System.out.println(item);
		});
		System.out.println(cl);
		return ResponseEntity.ok("Saved the checklist successfully");
	}
	
}
