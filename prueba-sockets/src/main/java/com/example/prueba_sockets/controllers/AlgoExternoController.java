package com.example.prueba_sockets.controllers;

import com.example.prueba_sockets.modelo.ChatMessage;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class AlgoExternoController {

    private static final Logger logger = LoggerFactory.getLogger(AlgoExternoController.class);

    private final SimpMessagingTemplate simpMessagingTemplate;

    public AlgoExternoController(SimpMessagingTemplate simpMessagingTemplate) {
        this.simpMessagingTemplate = simpMessagingTemplate;
    }

    @PostMapping("/algoExterno")
    @ResponseStatus(HttpStatus.OK)
    public void saraza(@RequestBody MensajeAEnviar mensajeAEnviar) {
        logger.info("sender: " + mensajeAEnviar.mensaje.sender() + "; texto: " + mensajeAEnviar.mensaje.texto() + "; tipo: " + mensajeAEnviar.mensaje.tipo());

        simpMessagingTemplate.convertAndSend(mensajeAEnviar.destino(), ChatMessage.editarTextoAEnviar(mensajeAEnviar.mensaje()));
    }

    public record MensajeAEnviar(String destino, ChatMessage mensaje) {}
}
