package com.example.prueba_sockets.config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.event.EventListener;
import org.springframework.stereotype.Service;
import org.springframework.web.socket.messaging.AbstractSubProtocolEvent;
import org.springframework.web.socket.messaging.SessionConnectedEvent;
import org.springframework.web.socket.messaging.SessionDisconnectEvent;

@Service
public class WebSocketConnectedListener {
    private final SessionManagement sessionManagement;

    @Autowired
    public WebSocketConnectedListener(SessionManagement sessionManagement) {
        this.sessionManagement = sessionManagement;
    }

    @EventListener
    public void handleConnectedEvent(SessionConnectedEvent event) {
        sessionManagement.connect(getSessionIdFromEvent(event));
    }

    @EventListener
    public void handleConnectedEvent(SessionDisconnectEvent event) {
        sessionManagement.disconnect(getSessionIdFromEvent(event));
    }

    public String getSessionIdFromEvent(AbstractSubProtocolEvent event) {
        return (String) event.getMessage().getHeaders().getOrDefault("simpSessionId", "sessioniddefault");
    }
}
