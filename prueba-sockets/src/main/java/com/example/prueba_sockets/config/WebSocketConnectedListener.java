package com.example.prueba_sockets.config;

import com.example.prueba_sockets.modelo.ChatMessage;
import com.example.prueba_sockets.modelo.TipoMensaje;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.event.EventListener;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Service;
import org.springframework.web.socket.messaging.AbstractSubProtocolEvent;
import org.springframework.web.socket.messaging.SessionConnectedEvent;
import org.springframework.web.socket.messaging.SessionDisconnectEvent;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.time.format.FormatStyle;

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
            var now = LocalDateTime.now().format(DateTimeFormatter.ofLocalizedDateTime(FormatStyle.MEDIUM));
            var texto = String.format("[%s] <Server> Se desconecto %s", now, nombre);
            simpMessagingTemplate.convertAndSend("/topic/public", new ChatMessage(texto, nombre, TipoMensaje.LEAVE, ""));
        }
        sessionManagement.disconnect(getSessionIdFromEvent(event));
    }

    public String getSessionIdFromEvent(AbstractSubProtocolEvent event) {
        return (String) event.getMessage().getHeaders().getOrDefault("simpSessionId", "sessioniddefault");
    }
}
