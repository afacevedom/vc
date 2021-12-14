# Algoritmo de visibilización (Z-Buffer)
Algoritmo Z-Buffer para el problema de visibilidad

El problema de visibilidad es el problema de decidir cuales elementos de una escena son visibles y cuales se "esconden".

## Definición
Es un tipo de buffer de datos usados en computación grafica para representar información de la profundidad de los objetos en un espacio 3D desde una perspectiva particular. Los búferes de profundidad son una ayuda para renderizar una escena para garantizar que los correctos polígonos ocluyan correctamente otros polígonos. El almacenamiento en búfer Z fue descrito por primera vez en 1974 por Wolfgang Straßer en su tesis doctoral sobre algoritmos rápidos para renderizar objetos ocluidos. Una solución similar para determinar polígonos superpuestos es el algoritmo del pintor, que es capaz de manejar elementos de escena no opacos, aunque a costa de la eficiencia y los resultados incorrectos.

El búfer z tiene la misma estructura de datos interna que una imagen, es decir, una matriz 2d, con la única diferencia de que almacena un valor único para cada píxel de la pantalla en lugar de imágenes en color que usan 3 valores para crear color. Esto hace que el búfer z aparezca en blanco y negro porque no almacena información de color. El búfer tiene las mismas dimensiones que el búfer de pantalla para mantener la coherencia. 

El Z-buffer tiene la misma estructura de datos interna que una imagen, es decir, una matriz 2d, con la única diferencia de que almacena un valor único para cada píxel de la pantalla en lugar de imágenes en color que usan 3 valores para crear color. Esto hace que el búfer z aparezca en blanco y negro porque no almacena información de color. El búfer tiene las mismas dimensiones que el búfer de pantalla para mantener la coherencia. 

## Usos
El Z-buffer es una tecnología utilizada en casi todas las computadoras, portátiles y teléfonos móviles contemporáneos para realizar gráficos de computadora en 3D . El uso principal ahora es para videojuegos, que requieren un procesamiento rápido y preciso de escenas 3D. El Z-buffer se implementa en hardware dentro de las tarjetas gráficas. El Z-buffer también se utiliza (implementado como software en lugar de hardware) para producir efectos especiales generados por computadora para películas. 

## Formula matemática(proyección de perspectiva)
{{< p5-div sketch="/vc/sketches/Matebuffer.js" >}}

## Implementación
```tpl
class Shape {
  constructor(vertices) {
    this.vertices = vertices;
    this.pickRandomPosition();
    // store initial random props
    this.curX = this.x;
    this.curY = this.y;
    this.curRadius = this.radius;
    this.curFill = this.fill;
    this.curRot = this.rotation;
  }
    pickRandomPosition() {
    this.x = random(0, width);
    this.y = random(0, height);
    this.radius = random(20, 100);
    this.fill = random(0, 255);
    this.rotation = random(0, TWO_PI);
  }
  
  display() {
    // lerp values
    this.curX = lerp(this.curX, this.x, 0.1);
    this.curY = lerp(this.curY, this.y, 0.1);
    this.curRadius = lerp(this.curRadius, this.radius, 0.1);
    this.curRot = lerp(this.curRot, this.rotation, 0.1);
    
    // draw poly
    let segmentRadians = TWO_PI / this.vertices;
    fill(this.fill);
    push();
    translate(this.curX, this.curY);
    rotate(this.curRot);
    beginShape();
    for(let i=0; i < this.vertices; i++) {
      let x = cos(i * segmentRadians) * this.radius;
      let y = sin(i * segmentRadians) * this.radius;
      vertex(x, y);
    }
    endShape(CLOSE);
    pop();
  }
}

let shapesArray = [];
let numShapes = 0;

let polygons = [];
let shape =[];
let bg = 0;
let curBg = 0;

function setup() {
  createCanvas(windowWidth, windowHeight);
  for(let i=0; i < 20; i++) {
    let vertices = round(random(3, 6));
    shapesArray.push(new Shape(vertices));
  }
  for(let i=0; i< 1; i++){
    let x = round(random(1,255));
    shape.push(x);
    for(let h=0; h< 1; h++){
      let y = round(random(1,255));
      shape.push(y);
      for(let j=0; j< 1; j++){
        let z = round(random(1,255));
        shape.push(z);
        for(let i=0; i< 1; i++){
          let depth = round(random(1,255));    
          shape.push(depth);
        }
      }
    }
  polygons.push(shape);
  }
  
}
function zBuffer(polygons) {
  let zBufferArray = [];
  let colorArray = [];
  let pixelRow = [];
  
  /* Initialize arrays */
  for (let i = 0; i < windowHeight.length; i += 1) {
    let bufferRow = [];
    let colorRow = [];
    for (let j = 0; j < windowWidth.length; j += 1) {
      bufferRow.push(Infinity);
      colorRow.push(this.backgroundColor);
    }
    zBufferArray.push(bufferRow);
    colorArray.push(colorRow);
  }

  // Iterate over all polygons
  for (let i = 0; i < polygons.length; i += 1) {
    let polygon = polygons[i];
    for (let j = 0; j < polygon.length; j += 1) {
      pixelRow.push(polygon[j]);
      for (let k = 0; k < 4; k += 1) {
        // Check z-depth of pixel
        if (pixelRow[k][3] < zBufferArray[j][k]) {
          zBufferArray[j][k] = pixelRow[k][3];
          colorArray[j][k] = pixelRow[k];
        }
      }
    }
  }
  console.log(colorArray)
  return colorArray;
}

function draw(){
  background(255);
  
  for(let i=0; i < shapesArray.length; i++) {
    shapesArray[i].display();
  }
}

function mouseClicked() {
  zBuffer(polygons);
  for(let i=0; i < shapesArray.length; i++) {
    shapesArray[i].pickRandomPosition();
  }
  bg = random(0, 255);
}
```

{{< p5-global-iframe id="breath" width="700" height="700" >}}
class Shape {
  constructor(vertices) {
    this.vertices = vertices;
    this.pickRandomPosition();
    // store initial random props
    this.curX = this.x;
    this.curY = this.y;
    this.curRadius = this.radius;
    this.curFill = this.fill;
    this.curRot = this.rotation;
  }
  
  pickRandomPosition() {
    this.x = random(0, width);
    this.y = random(0, height);
    this.radius = random(20, 100);
    this.fill = random(0, 255);
    this.rotation = random(0, TWO_PI);
  }
  
  display() {
    // lerp values
    this.curX = lerp(this.curX, this.x, 0.1);
    this.curY = lerp(this.curY, this.y, 0.1);
    this.curRadius = lerp(this.curRadius, this.radius, 0.1);
    this.curRot = lerp(this.curRot, this.rotation, 0.1);
    
    // draw poly
    let segmentRadians = TWO_PI / this.vertices;
    fill(this.fill);
    push();
    translate(this.curX, this.curY);
    rotate(this.curRot);
    beginShape();
    for(let i=0; i < this.vertices; i++) {
      let x = cos(i * segmentRadians) * this.radius;
      let y = sin(i * segmentRadians) * this.radius;
      vertex(x, y);
    }
    endShape(CLOSE);
    pop();
  }
}

let shapesArray = [];
let numShapes = 0;

let polygons = [];
let shape =[];
let bg = 0;
let curBg = 0;

function setup() {
  createCanvas(windowWidth, windowHeight);
  for(let i=0; i < 20; i++) {
    let vertices = round(random(3, 6));
    shapesArray.push(new Shape(vertices));
  }
  for(let i=0; i< 1; i++){
    let x = round(random(1,255));
    shape.push(x);
    for(let h=0; h< 1; h++){
      let y = round(random(1,255));
      shape.push(y);
      for(let j=0; j< 1; j++){
        let z = round(random(1,255));
        shape.push(z);
        for(let i=0; i< 1; i++){
          let depth = round(random(1,255));    
          shape.push(depth);
        }
      }
    }
  polygons.push(shape);
  }
  
}
function zBuffer(polygons) {
  let zBufferArray = [];
  let colorArray = [];
  let pixelRow = [];
  
  /* Initialize arrays */
  for (let i = 0; i < windowHeight.length; i += 1) {
    let bufferRow = [];
    let colorRow = [];
    for (let j = 0; j < windowWidth.length; j += 1) {
      bufferRow.push(Infinity);
      colorRow.push(this.backgroundColor);
    }
    zBufferArray.push(bufferRow);
    colorArray.push(colorRow);
  }

  // Iterate over all polygons
  for (let i = 0; i < polygons.length; i += 1) {
    let polygon = polygons[i];
    for (let j = 0; j < polygon.length; j += 1) {
      pixelRow.push(polygon[j]);
      for (let k = 0; k < 4; k += 1) {
        // Check z-depth of pixel
        if (pixelRow[k][3] < zBufferArray[j][k]) {
          zBufferArray[j][k] = pixelRow[k][3];
          colorArray[j][k] = pixelRow[k];
        }
      }
    }
  }
  console.log(colorArray)
  return colorArray;
}

function draw(){
  background(255);
  
  for(let i=0; i < shapesArray.length; i++) {
    shapesArray[i].display();
  }
}

function mouseClicked() {
  <!-- zBuffer(polygons); -->
  for(let i=0; i < shapesArray.length; i++) {
    shapesArray[i].pickRandomPosition();
  }
  bg = random(0, 255);
}
{{< /p5-global-iframe >}}

## Referencias 

https://www.davepagurek.com/blog/depth-of-field/