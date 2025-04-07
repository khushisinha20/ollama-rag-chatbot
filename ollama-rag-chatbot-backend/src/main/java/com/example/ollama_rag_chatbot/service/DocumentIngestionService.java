package com.example.ollama_rag_chatbot.service;

import java.util.ArrayList;
import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.ai.document.Document;
import org.springframework.ai.reader.tika.TikaDocumentReader;
import org.springframework.ai.transformer.splitter.TextSplitter;
import org.springframework.ai.transformer.splitter.TokenTextSplitter;
import org.springframework.ai.vectorstore.VectorStore;
import org.springframework.core.io.InputStreamResource;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

@Service
public class DocumentIngestionService {

	private static final Logger log = LoggerFactory.getLogger(DocumentIngestionService.class);
	private final VectorStore vectorStore;

	public DocumentIngestionService(VectorStore vectorStore) {
		this.vectorStore = vectorStore;
	}

	public void ingestFiles(MultipartFile[] files) {
		try {
			TextSplitter splitter = new TokenTextSplitter();

			for (MultipartFile file : files) {
				log.info("Reading file: {}", file.getOriginalFilename());
				InputStreamResource resource = new InputStreamResource(file.getInputStream());
				TikaDocumentReader reader = new TikaDocumentReader(resource);

				List<Document> documents = reader.get();
				List<Document> chunks = new ArrayList<>();

				for (Document doc : documents) {
					chunks.addAll(splitter.split(doc));
				}

				vectorStore.add(chunks);
				log.info("File '{}' ingested successfully.", file.getOriginalFilename());
			}
		} catch (Exception e) {
			log.error("Failed to ingest documents: ", e);
			throw new RuntimeException("Failed to ingest documents", e);
		}
	}
}