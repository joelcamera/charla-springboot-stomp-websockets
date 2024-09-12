package com.example.prueba_sockets.controllers;

import com.example.prueba_sockets.config.SessionManagement;
import com.example.prueba_sockets.modelo.ChatMessage;
import com.example.prueba_sockets.modelo.TipoMensaje;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.messaging.simp.SimpMessageHeaderAccessor;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Controller;

@Controller
public class ChatController {

    private static final Logger logger = LoggerFactory.getLogger(ChatController.class);

    private final SimpMessagingTemplate simpMessagingTemplate;
    private final SessionManagement sessionManagement;

    public ChatController(SimpMessagingTemplate simpMessagingTemplate, SessionManagement sessionManagement) {
        this.simpMessagingTemplate = simpMessagingTemplate;
        this.sessionManagement = sessionManagement;
    }

    @MessageMapping("/chat.register")
    @SendTo("/topic/public")
    public ChatMessage register(@Payload ChatMessage chatMessage, SimpMessageHeaderAccessor headerAccessor) {
        logger.info("sender: " + chatMessage.sender() + "; tipo: " + TipoMensaje.JOIN);
        headerAccessor.getSessionAttributes().put("username", chatMessage.sender());
        sessionManagement.setNombreDeSessionId(headerAccessor.getSessionId(), chatMessage.sender());
        simpMessagingTemplate.convertAndSend("/topic/conectados/" + chatMessage.sender(), sessionManagement.nombresConectades());

        return ChatMessage.editarTextoJoinAEnviar(chatMessage);
    }

    @MessageMapping("/chat.send")
    @SendTo("/topic/public")
    public ChatMessage sendMessage(@Payload ChatMessage chatMessage) {
        logger.info("sender: " + chatMessage.sender() + "; texto: " + chatMessage.texto() + "; tipo: " + chatMessage.tipo());
        return ChatMessage.editarTextoAEnviar(chatMessage);
    }

    @MessageMapping("/chat.private")
    public void sendPrivateMessage(@Payload ChatMessage chatMessage) {
        logger.info("sender: " + chatMessage.sender() + "; receiver: " + chatMessage.receiver() + "; texto: " + chatMessage.texto() + "; tipo: " + chatMessage.tipo());

        var chatMessageAEnviar = ChatMessage.editarTextoPrivadoAEnviar(chatMessage);
        simpMessagingTemplate.convertAndSend("/queue/private/" + chatMessageAEnviar.receiver(), chatMessageAEnviar);
        simpMessagingTemplate.convertAndSend("/queue/private/" + chatMessageAEnviar.sender(), chatMessageAEnviar);
    }

}
