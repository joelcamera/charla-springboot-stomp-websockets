package com.example.prueba_sockets.config;

import com.example.prueba_sockets.modelo.ChatMessage;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.event.EventListener;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Service;
import org.springframework.web.socket.messaging.AbstractSubProtocolEvent;
import org.springframework.web.socket.messaging.SessionConnectedEvent;
import org.springframework.web.socket.messaging.SessionDisconnectEvent;

import static com.example.prueba_sockets.modelo.UsuarieConectado.NOMBRE_DEFAULT;

@Service
public class WebSocketConnectedListener {
    private final SessionManagement sessionManagement;
    private final SimpMessagingTemplate simpMessagingTemplate;

    @Autowired
    public WebSocketConnectedListener(SessionManagement sessionManagement, SimpMessagingTemplate simpMessagingTemplate) {
        this.sessionManagement = sessionManagement;
        this.simpMessagingTemplate = simpMessagingTemplate;
    }

    @EventListener
    public void handleConnectedEvent(SessionConnectedEvent event) {
        sessionManagement.connect(getSessionIdFromEvent(event));
    }

    @EventListener
    public void handleConnectedEvent(SessionDisconnectEvent event) {
        var nombre = sessionManagement.obtenerNombreDeUsuarie(getSessionIdFromEvent(event));
        if(!NOMBRE_DEFAULT.equals(nombre)) {
            simpMessagingTemplate.convertAndSend("/topic/public", ChatMessage.editarTextoLeaveAEnviar(nombre));
        }
        sessionManagement.disconnect(getSessionIdFromEvent(event));
    }

    public String getSessionIdFromEvent(AbstractSubProtocolEvent event) {
        return (String) event.getMessage().getHeaders().getOrDefault("simpSessionId", "sessioniddefault");
    }
}
