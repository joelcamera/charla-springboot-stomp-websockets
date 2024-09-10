package com.example.prueba_sockets.config;

import com.example.prueba_sockets.modelo.UsuarieConectado;
import org.springframework.lang.NonNull;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

import static com.example.prueba_sockets.modelo.UsuarieConectado.NOMBRE_DEFAULT;

@Component
public class SessionManagement {
    private final Map<String, UsuarieConectado> sessions = new ConcurrentHashMap<>();

    public void connect(@NonNull String sessionId) {
        this.sessions.put(sessionId, new UsuarieConectado(NOMBRE_DEFAULT));
    }

    public void disconnect(@NonNull String sessionId) {
        this.sessions.remove(sessionId);
    }

    public void setNombreDeSessionId(String sessionId, String nombre) {
        this.sessions.computeIfPresent(sessionId, (key, value) -> new UsuarieConectado(nombre));
    }

    public List<String> nombresConectades() {
        return this.sessions.values().stream().map(UsuarieConectado::nombre).toList();
    }
}
