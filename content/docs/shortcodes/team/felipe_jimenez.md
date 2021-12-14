# Felipe Jiménez @felipejimenezjp (Instagram, Twitter, YouTube)

{{<columns>}}
## Bio
Nacido en Bogotá D.C. Colombia, se distingue por su curiosidad y determinación en conseguir lo que se propone. Disfruta de ayudar a las demás personas a conseguir sus propósitos, al mismo tiempo que trabaja por sus objetivos.
<--->
## Intereses
Inversiones en diferentes tipos de activos financieros. Creación de ideas para la solución de problemas sociales. Defensor de la libertad. Tiempo, salud y dinero son los tres recursos claves.
<--->
## Hobbies
Ejercicio, natación, leer, escribir, inversiones y creación de valor mediante ideas de negocio con el fin mejorar colectivamente nuestro entorno.
{{< /columns>}}

## Ilusión visual
## Moving dots illusion
La ilusión de los punto en movimiento, es una ilusión de movimiento. Se experimenta de manera simple desde cualquier punto donde se encuentre el espectador. Los puntos, en verdad están estáticos; sin embargo, giran entorno a cada uno dos circunferencias delgadas (ambas en sentido contrario). Lo anterior, produce que el espectador tenga la ilusión de los puntos moviéndose —algunas personas aseguran ver un tipo de oleaje.

A los seres humanos les fascinan las ilusiones visuales, que se producen cuando hay un desajuste entre el patrón de luz que incide en la retina y lo que percibimos. Antes de que los libros, las películas e Internet permitieran compartir ampliamente las ilusiones, la gente estaba cautivada por las ilusiones en la naturaleza. De hecho, es aquí donde comienza la larga historia del estudio de las ilusiones. Tanto Aristóteles como Lucrecio describieron las ilusiones de movimiento tras la observación del agua que fluye.

Aristóteles observó durante un tiempo las piedras que se encontraban bajo el agua corriente y observó que después las piedras que se encontraban junto al agua parecían estar en movimiento. Por su parte, Lucrecio observó la pata inmóvil de su caballo cuando se encontraba en medio de un río de corriente rápida y observó que parecía moverse en dirección contraria a la corriente. Esto se llama movimiento inducido y se ha observado durante mucho tiempo cuando las nubes pasan por la luna: la luna puede parecer que se mueve en la dirección opuesta.

Pero una explicación más convincente de tales ilusiones fue proporcionada por primera vez por Robert Addams, un conferenciante itinerante de filosofía natural, en 1834 tras su observación de las cataratas de Foyers en Escocia. Tras observar la cascada durante un rato, observó que las rocas adyacentes parecían moverse hacia arriba:

Habiendo mirado fijamente durante unos segundos una parte concreta de la cascada, admirando la confluencia de las corrientes que formaban el paño líquido de las aguas, y dirigiendo de repente mis ojos hacia la izquierda, para observar la cara vertical de las sombrías rocas desgastadas por el paso del tiempo e inmediatamente contiguas a la caída del agua, vi la cara rocosa como en movimiento hacia arriba, y con una velocidad aparente igual a la del agua descendente, que el momento anterior había preparado mis ojos para contemplar este singular engaño.


{{< details title="Código" open=false >}}
```js
{{</* p5-global-iframe id="breath" width="625" height="625" >}}
  // Adaptado de (https://www.youtube.com/watch?v=BQbrx6V0jTs)
let angle = 0;
function setup() {
  createCanvas(700, 700);
}

function draw() {
  background(50);
  for (let i = 50; i < width - 45; i += 50) {
    for (let j = 50; j < height - 45; j += 50) {

      push()
      fill(0, 168, 0);
      stroke(0, 0, 150);
      strokeWeight(3);
      ellipse(i, j, 25, 25);
      pop()

      push()
      translate(i, j);
      rotate(HALF_PI + i - angle * 3)
      stroke(0, 168, 168);
      strokeWeight(3);
      noFill();
      arc(0, 0, 30, 30, 0, PI)
      pop()

      push()
      translate(i, j);
      rotate(QUARTER_PI * j + angle * 4)
      stroke(0, 255, 255);
      strokeWeight(3);
      noFill();
      arc(0, 0, 25, 25, PI , 0)
      pop()

      angle += 0.0005

    }
  }
}
{{< /p5-global-iframe */>}}
```
{{< /details >}}

{{< p5-global-iframe id="breath" width="725" height="725" >}}
let angle = 0;
function setup() {
  createCanvas(700, 700);
}

function draw() {
  background(50);
  for (let i = 50; i < width - 45; i += 50) {
    for (let j = 50; j < height - 45; j += 50) {

      push()
      fill(0, 168, 0);
      stroke(0, 0, 150);
      strokeWeight(3);
      ellipse(i, j, 25, 25);
      pop()

      push()
      translate(i, j);
      rotate(HALF_PI + i - angle * 3)
      stroke(0, 168, 168);
      strokeWeight(3);
      noFill();
      arc(0, 0, 30, 30, 0, PI)
      pop()

      push()
      translate(i, j);
      rotate(QUARTER_PI * j + angle * 4)
      stroke(0, 255, 255);
      strokeWeight(3);
      noFill();
      arc(0, 0, 25, 25, PI , 0)
      pop()

      angle += 0.0005

    }
  }
}
{{< /p5-global-iframe >}}

## Referencias
https://theconversation.com/waterfall-illusion-when-you-see-still-objects-move-and-what-it-tells-you-about-your-brain-113953
https://gizmodo.com/moving-dots-optical-illusion-reveals-the-power-of-silen-5728804
