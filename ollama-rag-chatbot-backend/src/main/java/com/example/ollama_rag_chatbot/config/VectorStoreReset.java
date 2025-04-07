package com.example.ollama_rag_chatbot.config;

import jakarta.annotation.PostConstruct;

import java.util.List;

import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Component;

@Component
public class VectorStoreReset {

    private final JdbcTemplate jdbcTemplate;

    public VectorStoreReset(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    @PostConstruct
    public void clearVectorStoreOnStartup() {
    	jdbcTemplate.execute("DELETE FROM vector_store");
        System.out.println("Vector store (embedding table) cleared on startup");
    }
}
