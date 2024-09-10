package com.example.prueba_sockets.modelo;

public record ChatMessage(String texto, String sender, TipoMensaje tipo, String receiver) {}
