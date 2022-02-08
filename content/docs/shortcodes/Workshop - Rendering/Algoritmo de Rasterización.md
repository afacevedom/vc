# Algoritmo de BERSENHAM
Metodo para rasterizar lineas

## Algoritmo Basico
El algoritmo funciona de la siguiente manera, asumimos un pixel en la posicion {{< katex >}}P_1(x_1,y_1){{< /katex >}}, nos moveremos un pixel a la vez de forma horizontal hasta el punto final de la linea en  {{< katex >}}P_2(x_2,y_2){{< /katex >}}; cada paso que nos movemos en sentido del eje {{< katex >}}X{{< /katex >}} tendremos que escoger entre dos pixeles:
-  {{< katex >}}(x_k+1,y_k){{< /katex >}}
- {{< katex >}}(x_k+1,y_k+1){{< /katex >}}

entonces podemos usar la distancia entre la recta y los puntos mencionados anterirmente para ver cual de los dos escogemos. Para eso usamos la ecuacion de la recta {{< katex >}}y=mx+b{{< /katex >}}. La derivacion del algoritmo se puede encontrar [aqui](https://getsetcg.blogspot.com/2018/10/bresenham-line-drawing-derivation.html) .
{{< p5-div sketch="/vc/sketches/Bersenhbasic.js" >}}

**Implementación del algoritmo** para rectas en el octante ubicado debajo del eje x, por lo tanto, las rectas a rasterizar en este octante deben cumplir ciertas condiciones: ser dibujada de izquierda a derecha y tener una pendiente m tal que: 0>m>1.

{{< p5-global-iframe id="breath" width="850" height="500" >}}
let Scale = 40;
let l,g;
var cols,rows,rast,y2=8,x2=17;
function setup() {
  createCanvas(800,400); 
  
  //----------------INPUT ESCALA--------------
  let inp = createInput(Scale);
  inp.position(0, 10*Scale+10);
  inp.size(50);
  inp.input(InputScale);
  let p =createP("Escala");
  p.style('font-size', '16px');
  p.position(60,10*Scale-5);
  //----------------INPUT Y2--------------
  let inpy2 = createInput(y2);
  inpy2.position(275, 10*Scale+35);
  inpy2.size(25);
  inpy2.input(Inputy2);
  let py2 =createP("Y2:");
  py2.style('font-size', '16px');
  py2.position(250,10*Scale+20);
  //----------------INPUT X2 --------------
  let inpx2 = createInput(x2);
  inpx2.position(275, 10*Scale+10);
  inpx2.size(25);
  inpx2.input(Inputx2);
  let px2 =createP("X2:");
  px2.style('font-size', '16px');
  px2.position(250,10*Scale-5);
    //----------------Controles---------------
  let pcont =createP("flecha izquierda: raster; flecha derecha: pixeles");
  pcont.style('font-size', '20px');
  pcont.position(400,10*Scale-15);
  let pcont2 =createP("flecha arriba: ambas; flecha abajo: linea");
  pcont2.style('font-size', '20px');
  pcont2.position(400,10*Scale+10);
}


function draw() {
  cols = width/Scale;
  rows = height/Scale;
  l = new Line(2,3,x2,y2);
  g = new Grid(Scale);
    //strokeWeight(5);
    stroke('red');
    //point(5*Scale,5*Scale);
    
  Bresenham(l);
  l.drawLine();

    
}

class Grid{
  constructor(scale){
    this.scale=scale;
    this.cols= width/this.scale;
    this.rows= height/this.scale;
  }
  
  drawRaster(){
  for(var i =0;i<this.cols;i++){
      for(var j = 0;j<this.rows;j++){
        var x = i*Scale;
        var y = j*Scale;
        stroke(0,0,0);
        strokeWeight(2);
        noFill();
        rect(x-Scale/2,y-Scale/2,Scale,Scale);
      }
    }
  }
  drawPixelGrid(){
    for(var i =0;i<this.cols;i++){
      for(var j = 0;j<this.rows;j++){
        var x = i*Scale;
        var y = j*Scale;
        strokeWeight(1);
        stroke(0,0,0,50);
        rect(x,y,Scale,Scale);
        strokeWeight(5);
        point(x,y);
      }
    }
  }
}
function keyPressed() {
  if (keyCode === LEFT_ARROW) {
    clear();
    g.drawRaster();
    rast=0;
  } else if (keyCode === RIGHT_ARROW) {
    clear();
    g.drawPixelGrid();
    rast=1;
  } else if(keyCode === UP_ARROW){
    clear();
    g.drawRaster();
    g.drawPixelGrid();
    rast=2;
  } else{
    clear();
    rast=3;
  }
}


//Clase de la lineas a dibujar
class Line{
  constructor(x,y,x2,y2){
  this.x=x;
  this.y=y;
  this.x2=x2;
  this.y2=y2;
  }
  //metodo que dibuja la linea
  drawLine(){
    stroke('red');
    strokeWeight(2);
    line(this.x*Scale,this.y*Scale,this.x2*Scale,this.y2*Scale);
  }
}

function Bresenham(line){
  let dx= line.x2-line.x;
  //console.log(dx);
  let dy= line.y2-line.y;
  if(dy/dx>=1 || dy/dx<0){
    return;
  }
  let D = (2*dy)-dx;
  
  let y = line.y;
  
  for(let x=line.x;x<=line.x2;x++){
    //console.log("D="+D+"("+x+","+y+")");
    if(rast===1){
      strokeWeight(5);
      stroke('red');
      point(x*Scale,y*Scale);
    }else if(rast===0){
      stroke(0,0,0);
      strokeWeight(2);
      fill(245, 200, 66,70);
      rect(x*Scale-Scale/2,y*Scale-Scale/2,Scale,Scale);
      noFill();
    }else if(rast===2){
      stroke(0,0,0);
      strokeWeight(2);
      fill(245, 200, 66,150);
      rect(x*Scale-Scale/2,y*Scale-Scale/2,Scale,Scale);
      noFill();
      strokeWeight(5);
      stroke('red');
      point(x*Scale,y*Scale);
    }
 
    if(D>=0){
      y = y+1;
      D=D-2*dx;
    }
    D=D+2*dy;
  }
}

function InputScale(){
  Scale = this.value();
}
function Inputy2(){
  y2 = this.value();
}
function Inputx2(){
  x2 = this.value();
}


{{< /p5-global-iframe >}}


## Algoritmo para todos los octantes
{{< p5-global-iframe id="breath" width="670" height="510" >}}
function setup() {
createCanvas(640, 480);
}


function draw() {
 background(255);
  bresenham(320, 240, mouseX, mouseY);
}

function sign(i) {
  if (i > 0) {
    return 1;
  } else if (i == 0) {
    return 0;
  } else {
    return -1;
  }
}

function bresenham(xStart, yStart, xEnd, yEnd) {
  let x1 = xStart;
  let y1 = yStart;
  let x2 = xEnd;
  let y2 = yEnd;
  let ΔX = x2 - x1;
  let ΔY = y2 - y1;
  
  if (Math.abs(ΔX) >= Math.abs(ΔY)) {
    let e = Math.abs(ΔX) - 2 * Math.abs(ΔY);
  
    while (x1 != x2) {
      //strokeWeight(10);
      point(x1,y1);
      
      x1 = x1 + sign(ΔX);
      
      if (e > 0) {
        e = e - 2 * Math.abs(ΔY);
      } else {
        y1 = y1 + sign(ΔY);
        e = e + 2 * (Math.abs(ΔX) - Math.abs(ΔY));
      }
    }
  } else {
    let e = Math.abs(ΔY) - 2 * Math.abs(ΔX);
  
    while (y1 != y2) {
      point(x1,y1);
      
      y1 = y1 + sign(ΔY);
       if (e > 0) {
        e = e - 2 * Math.abs(ΔX);
      } else {
        x1 = x1 + sign(ΔX);
        e = e + 2 * (Math.abs(ΔY) - Math.abs(ΔX));
      }
    }    
  }
}
{{< /p5-global-iframe >}}
Obetenido de [aqui](https://getsetcg.blogspot.com/2018/10/bresenham-line-drawing-derivation.html) .
## References
[1] Charalambos Hernandez, J. P. (n.d.). Visual Computing. Visual Computing. Retrieved December 10, 2021, from https://visualcomputing.github.io/vc/docs/workshops/rendering/#tareas

[2] Wikipedia contributors. (2021, August 11). Line drawing algorithm. Wikipedia. Retrieved December 11, 2021, from https://en.wikipedia.org/wiki/Line_drawing_algorithm

[3] xWikipedia contributors. (2021b, November 22). Rasterisation. Wikipedia. Retrieved December 10, 2021, from https://en.wikipedia.org/wiki/Rasterisation#:%7E:text=Rasterization%20(or%20rasterisation)%20is%20the,which%20was%20represented%20via%20shapes).

