# Felipe Jiménez @felipejimenezjp (Instagram, Twitter, YouTube)

{{<columns>}}
## Bio
Nacido en Boyacá, Estudiante de Ingeniería de Sistemas y Computacion, viví un año en Inglaterra una experiencia muy enriquecedora conociendo distintas culturas.
  
<--->
## Intereses
Desarollo de software, la criptografía y la inteligencia artificial. Economía y politica. 
<--->
## Hobbies
Viajar, ir a cine y la fotografía. Me gusta aprender de todo y me gusta estar enterado de la actualidad.
{{< /columns>}}

## Ilusión Visual
## Waterfall illusion
La ilusión de la cascada, o efecto posterior al movimiento, es una ilusión de movimiento. Se experimenta después de observar un estímulo que se mueve en una dirección durante algún tiempo, y luego se mira una escena estacionaria. La escena inmóvil parece tener movimiento (en la dirección opuesta al estímulo en movimiento que se observó anteriormente).

A los seres humanos les fascinan las ilusiones visuales, que se producen cuando hay un desajuste entre el patrón de luz que incide en la retina y lo que percibimos. Antes de que los libros, las películas e Internet permitieran compartir ampliamente las ilusiones, la gente estaba cautivada por las ilusiones en la naturaleza. De hecho, es aquí donde comienza la larga historia del estudio de las ilusiones. Tanto Aristóteles como Lucrecio describieron las ilusiones de movimiento tras la observación del agua que fluye.

Aristóteles observó durante un tiempo las piedras que se encontraban bajo el agua corriente y observó que después las piedras que se encontraban junto al agua parecían estar en movimiento. Por su parte, Lucrecio observó la pata inmóvil de su caballo cuando se encontraba en medio de un río de corriente rápida y observó que parecía moverse en dirección contraria a la corriente. Esto se llama movimiento inducido y se ha observado durante mucho tiempo cuando las nubes pasan por la luna: la luna puede parecer que se mueve en la dirección opuesta.

Pero una explicación más convincente de tales ilusiones fue proporcionada por primera vez por Robert Addams, un conferenciante itinerante de filosofía natural, en 1834 tras su observación de las cataratas de Foyers en Escocia. Tras observar la cascada durante un rato, observó que las rocas adyacentes parecían moverse hacia arriba:

Habiendo mirado fijamente durante unos segundos una parte concreta de la cascada, admirando la confluencia de las corrientes que formaban el paño líquido de las aguas, y dirigiendo de repente mis ojos hacia la izquierda, para observar la cara vertical de las sombrías rocas desgastadas por el paso del tiempo e inmediatamente contiguas a la caída del agua, vi la cara rocosa como en movimiento hacia arriba, y con una velocidad aparente igual a la del agua descendente, que el momento anterior había preparado mis ojos para contemplar este singular engaño.


{{< details title="Código" open=false >}}
```js
{{</* p5-global-iframe id="breath" width="625" height="625" >}}
  // Adaptado de (https://www.youtube.com/watch?v=xlPWCrjQsTE)
 let update=0;
let angle = 0;
function setup() {
  createCanvas(700, 700);
  strokeWeight(4)
}

function draw() {
  background(50);
  noStroke();
  fill(255,0,0)
  ellipse(width/2, height/2, 10,10)
  
  for(let i = 15; i< 5000; i+=15)
  {
    push()
    translate(width/2,height/2)
    rotate(i+ angle * 2)
    noFill()
    stroke(20 , i * 100, i -100)
    ellipse(0, 0, i + 15 , i )
    
    pop()
    
    angle += 0.0003
  }
  
  
}
{{< /p5-global-iframe */>}}
```
{{< /details >}}

{{< p5-global-iframe id="breath" width="725" height="725" >}}
let update=0;
let angle = 0;
function setup() {
  createCanvas(700, 700);
  strokeWeight(4)
}

function draw() {
  background(50);
  noStroke();
  fill(255,0,0)
  ellipse(width/2, height/2, 10,10)
  
  for(let i = 15; i< 5000; i+=15)
  {
    push()
    translate(width/2,height/2)
    rotate(i+ angle * 2)
    noFill()
    stroke(20 , i * 100, i -100)
    ellipse(0, 0, i + 15 , i )
    
    pop()
    
    angle += 0.0003
  }
  
  
}
{{< /p5-global-iframe >}}

## Efecto posterior al movimiento
Esta descripción del fenómeno contribuyó a estimular un torrente de investigación, y el efecto pasó a conocerse como la "ilusión de la cascada". Básicamente, después de mirar algo que se mueve en una dirección durante un tiempo, algo que está quieto parecerá moverse en la dirección opuesta.

Addams no necesitaba una teoría para saber que se trataba de una ilusión: las rocas parecían inmóviles antes de mirar la cascada, pero parecían moverse hacia arriba después de haber mirado la cascada. Todo lo que se necesitaba era la creencia de que los objetos permanecen iguales a lo largo del tiempo, pero que la percepción de los mismos puede cambiar. Este movimiento ilusorio -que vemos quieto tras la observación del movimiento- se conoce como efecto posterior al movimiento.

## Referencias
https://theconversation.com/waterfall-illusion-when-you-see-still-objects-move-and-what-it-tells-you-about-your-brain-113953
https://www.illusionsindex.org/ir/waterfall-illusion
