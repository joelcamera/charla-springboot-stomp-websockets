package com.example.prueba_sockets.modelo;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.time.format.FormatStyle;

public record ChatMessage(String texto, String sender, TipoMensaje tipo, String receiver) {

    public static ChatMessage editarTextoAEnviar(ChatMessage chatMessage) {
        var texto = String.format("[%s] <%s> %s", strNow(), chatMessage.sender(), chatMessage.texto());
        return new ChatMessage(texto, chatMessage.sender(), chatMessage.tipo, chatMessage.receiver());
    }

    public static ChatMessage editarTextoPrivadoAEnviar(ChatMessage chatMessage) {
        var texto = String.format("[%s] <%s to %s> %s", strNow(), chatMessage.sender(), chatMessage.receiver(), chatMessage.texto());
        return new ChatMessage(texto, chatMessage.sender(), chatMessage.tipo, chatMessage.receiver());
    }

    public static ChatMessage editarTextoJoinAEnviar(ChatMessage chatMessage) {
        var texto = String.format("[%s] <Server> Se conecto %s", strNow(), chatMessage.sender());
        return new ChatMessage(texto, chatMessage.sender(), TipoMensaje.JOIN, "");
    }

    public static ChatMessage editarTextoLeaveAEnviar(String nombre) {
        var texto = String.format("[%s] <Server> Se desconecto %s", strNow(), nombre);
        return new ChatMessage(texto, nombre, TipoMensaje.LEAVE, "");
    }

    private static String strNow() {
        return LocalDateTime.now().format(DateTimeFormatter.ofLocalizedDateTime(FormatStyle.MEDIUM));
    }
}
