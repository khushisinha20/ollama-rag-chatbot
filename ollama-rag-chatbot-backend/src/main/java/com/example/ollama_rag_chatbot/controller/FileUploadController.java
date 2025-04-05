package com.example.ollama_rag_chatbot.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import com.example.ollama_rag_chatbot.service.DocumentIngestionService;


@RestController
@RequestMapping("/api/files")
public class FileUploadController {
	
	private static final Logger log = LoggerFactory.getLogger(FileUploadController.class);
	private final DocumentIngestionService ingestionService;
	
	public FileUploadController(DocumentIngestionService ingestionService) {
		this.ingestionService = ingestionService;
	}
	
	@PostMapping("/upload")
	public ResponseEntity<String> uploadFiles(@RequestParam("files") MultipartFile[] files) {
		try {
			ingestionService.ingestFiles(files);
			return ResponseEntity.ok("All files uploaded and ingested successfully.");
		} catch (Exception e) {
			log.error("Error during file upload: ", e);
			return ResponseEntity.internalServerError().body("Error: " + e.getMessage());
		}
	} 
}
