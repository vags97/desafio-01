# desafio-01
first challenge for copernicus HR

El desafío corresponde a la creación de una aplicación web utilizando Node y React para un usuario que quiere obtener informacion de manera sistematica a eventos que realiza periodicamente, el cuenta con un archivo csv de las y los asistentes, pero quiere un programa web que le entregue alguna informacion procesada de estos eventos sin que el tenga que abrir dicho archivo. para esto se propone la siguiente arquitectura.

A nivel de front, utilizando react, se debe confeccionar un sitio que conste de tres páginas, una en donde se de la bienvenida al usuario y se proporcione un contexto de la utilidad de la aplicación, en otra página se debe desplegar lo necesario para que el usuario suba un archivo csv y luego muestre algún insight de los datos que ha subido. Y una tercera pagina donde se muestren creditos a quienes crearon esta aplicacion. Como referencia grafica se muestran las siguientes imagenes (con fines meramente ilustrativos)

Bienvenida:
![Bienvenida](Imagenes/bienvenida-ejemplo.png?raw=true "Bienvenida")
Archivo:
![Archivo](Imagenes/archivo-ejemplo.png?raw=true "Archivo")
Creditos:
![Creditos](Imagenes/creditos-ejemplo.png?raw=true "Creditos")

El insight a mostrar debe constar de cualquier información relevante que se pueda obtener a partir de analizar el archivo csv, pudiendo ser por ejemplo promedios, recuentos o cualquier otra información simple que se pueda desplegar de una manera sencilla, en esta página.

Para poder procesar el archivo se debe enviar un requerimiento a un servicio de backend basado en node que se debe crear, este servicio debera procesar este requerimiento enviado por el servicio de react y luego devolver los insights que haya encontrado en el archivo. A continuacion se muestra un diagrama del flujo en cuestion.

Flujo de servicios:
![Flujo de servicios](Imagenes/diagrama-flujo-servicios.png?raw=true "Flujo de servicios")

A parte de lo descrito en este documento se puede asumir todo el contexto que el o la postulante desee o encuentre mas razonable o facilite la ejecucion del problema (manteniendo justificaciones de todo lo que se asuma). 

En caso de no poder completar el desafio al 100%, se puede entregar una resolucion parcial o que entregue la solucion de una manera diferente a la descrita, tanto en terminos de procesamiento como de visualizacion.

El plazo y formato de entrega de este desafio es 7 dias desde la entrega de la ruta a este desafio y se entregara a traves de un repositorio den github de el o la postulante.