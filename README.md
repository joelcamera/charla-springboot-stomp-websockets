# Charla Websockets con SpringBoot usando STOMP!

### Cosas para hablar de back
- que es stomp?
- diferencia entre stomp y websockets
- stomp sin socks js
- que es socks js?
- stomp con socks js
- hablar un poco de cuanto se puede manipular la conexion (solo la url, guardar atributos...)
- testing
- logs (queres tener info)
- seguridad? (rechazar conexiones por ejemplo...)


### Cosas para hacer de front
- crear una app react next js
- canales de chat?
- mensajes privados? (diciendo de quien a quien)
- bloquear gente??
- Que avise que alguien se conecta y se desconecta.




# Charla

* Queremos enviar (y tal vez recibir) mensajes en tiempo real.
* Tenemos una aplicacion Springboot.
Que hacemo? Vamos a la docu y encontramos dos formas:
1. una es manejar los websockets a mano, y cuando digo a mano es completamente a mano.
2. y la otra es STOMP!

<<Mostar la app como esta funcionando.>>

Pero que corno es stomp?
Nada tiene que ver con websockets.
STOMP (Simple Text Oriented Messaging Protocol), que fue creado para lenguajes de scripting (ruby, python, perl)
para conectarse entre brokers de mensajes. Y es muy minimal, mucho muy. Se basa en frames y tiene estos mensajes
CONNECT, SUBSCRIBE, UNSUBSCRIBE, ACK, or SEND.

Springboot se para sobre esto y te abstrae de utilizar los websockets pelados.

Que beneficios te da:
* No tenes que inventar un protocolo.
* podes utilizar otros brokers de mensajes (RabbitMQ, Kafka), para manejar suscripciones y broadcastear mensajes.
* La logica puede estar organizada en @Controllers y enviar mensajes ruteados sobre los headers de destino que da STOMP.


# La papa
Se agrega la dependencia de websockets e ir a la config.

`config.enableSimpleBroker("/topic/", "/queue/");`
Estos son los prefijos para enviar y recibir mensajes, hay dos en este caso. Por convencion, "/topic" es para 
el modelo pub-sub (one to many); y "/queue/" es para mensajes privados. Pueden ser los textos que quieran.

`config.setApplicationDestinationPrefixes("/app");`
Prefijo para filtrar destinos que se handlean con metodos que tengan el annotation `@MessageMapping` dentro de algun controller.
Luego de ser procesado, se lo envia al broker.

Mostrar primera imagen de la arquitectura.

Mostrar controller, empezar a explicar.




