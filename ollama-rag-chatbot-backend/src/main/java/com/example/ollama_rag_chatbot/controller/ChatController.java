package com.example.ollama_rag_chatbot.controller;

import java.util.List;
import java.util.stream.Collectors;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.ai.chat.client.ChatClient;
import org.springframework.ai.chat.client.advisor.QuestionAnswerAdvisor;
import org.springframework.ai.document.Document;
import org.springframework.ai.ollama.OllamaChatModel;
import org.springframework.ai.vectorstore.VectorStore;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/chat")
public class ChatController {
	
	private final OllamaChatModel ollamaChatModel;
	private final VectorStore vectorStore;
	private static final Logger log = LoggerFactory.getLogger(ChatController.class);
	
	public ChatController(OllamaChatModel ollamaChatModel, VectorStore vectorStore) {
		this.ollamaChatModel = ollamaChatModel;
		this.vectorStore = vectorStore;
	}
	
	@PostMapping
	public String chat(@RequestBody String message) {
		log.info("Received message: {}", message);
		
		try {
			ChatClient chatClient = ChatClient.builder(ollamaChatModel).build();
			var promptSpec = chatClient.prompt().advisors(new QuestionAnswerAdvisor(vectorStore)).user(message);
			String response = promptSpec.call().content();
			log.info("Response generated");
			return response;
		} catch (Exception e) {
			log.error("An error occured while processing message: ", e);
			return "An error occured: " + e.getMessage();
		}
	}
	
	@GetMapping("/vector-store")
	public List<String> dumpVectorStore() {
		List<Document> docs = vectorStore.similaritySearch("a");
		return docs.stream().map(Document::toString).collect(Collectors.toList());
	}
}
