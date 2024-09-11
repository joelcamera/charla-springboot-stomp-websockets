package com.example.prueba_sockets;

import com.example.prueba_sockets.config.SessionManagement;
import com.example.prueba_sockets.modelo.ChatMessage;
import com.example.prueba_sockets.modelo.TipoMensaje;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.SpyBean;
import org.springframework.boot.test.web.server.LocalServerPort;
import org.springframework.messaging.converter.MappingJackson2MessageConverter;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.messaging.simp.stomp.StompSessionHandlerAdapter;
import org.springframework.web.socket.client.standard.StandardWebSocketClient;
import org.springframework.web.socket.messaging.WebSocketStompClient;
import org.springframework.web.socket.sockjs.client.SockJsClient;
import org.springframework.web.socket.sockjs.client.Transport;
import org.springframework.web.socket.sockjs.client.WebSocketTransport;

import java.time.Duration;
import java.util.List;
import java.util.concurrent.ExecutionException;
import java.util.concurrent.TimeUnit;

import static org.assertj.core.api.Assertions.assertThat;
import static org.awaitility.Awaitility.await;

@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
class PruebaSocketsApplicationTests {

	@LocalServerPort
	private Integer port;

	@Autowired
	private SessionManagement sessionManagement;

	@Test
	void seRegistraUnNuevoUsuarie() throws ExecutionException, InterruptedException {
		var webSocketStompClient = crearWebSocketStompClient();
		var stompSession = webSocketStompClient
				.connectAsync(String.format("ws://localhost:%d/websocket", port), new StompSessionHandlerAdapter() {})
				.get();

		var nombre = "GuidoSu";

		stompSession.send("/app/chat.register", new ChatMessage("", nombre, TipoMensaje.JOIN, ""));

		await()
				.atMost(1, TimeUnit.SECONDS)
				.untilAsserted(() -> {
					assertThat(sessionManagement.nombresConectades())
							.hasSize(1)
							.contains(nombre);
				});
	}

	private WebSocketStompClient crearWebSocketStompClient() {
		List<Transport> transports = List.of(new WebSocketTransport(new StandardWebSocketClient()));
		SockJsClient webSocketClient = new SockJsClient(transports);
		WebSocketStompClient webSocketStompClient = new WebSocketStompClient(webSocketClient);
		webSocketStompClient.setMessageConverter(new MappingJackson2MessageConverter());
		return webSocketStompClient;
	}
}
