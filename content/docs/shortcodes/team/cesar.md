# Cesar Velasco

{{<columns>}}
## Bio
Estudiante de Ingenieria de sistemas y computacion de la universidad nacional de Colombia.
<--->
## Intereses
Desarollo de software, diseño de de UI, videojuegos.
<--->
## Hobbies
Videojuegos,futbol, cine.
{{< /columns>}}

## Ilusión Visual
## Cafe Wall
Fue descubierta en 1898 bajo el nombre de la ilusion de kindergarten y re descubierta en 1973 por Richard Gregory, un miembro de su laboratorio vio este arreglo de baldosas en la pared de un cafe en Bristol.

La ilusion consiste en un arreglo de tablero de ajedrez en donde las filas individuales han sido desplazadas, ¿las lineas grises horizontales entre las filas se ven paralelas entre ellas?

{{< details title="Codigo" open=false >}}
```js
{{</* p5-global-iframe id="breath" width="625" height="625" >}}
  // Adaptado de [this](http://nrajansblog.blogspot.com/2018/05/cafe-wall-illusion-using-processing.html)
  let update=0;

function setup() {
  createCanvas(700, 680);
  stroke(90, 90, 90);
  strokeWeight(5);
  line(0,0, 200,200);
  let lines=[]; 
 
  for(let i=0;i<8;i++){
    line[i]=new Line(i*90);
    //line[i].drawL(update);
  }
}

function draw() {
  for(let i=0;i<8;i++){
    if(i%2==0){
      line[i].drawL(-270+update);
    }else{
      line[i].drawL(-270-update);
    }
  }
  update=update+0.5;
  if(update==180){
    update=0;
  }
}

class Line {
  constructor (posY) {
    this.n =90;
    this.posY = posY;
  }
  
  drawL(diff){
    for(let i=0;i<16;i++){
     let posX=i*90+diff;
     if(i%2==0){
       fill(0);
       rect(posX,this.posY,this.n,this.n);
     }else{
       fill(255);
       rect(posX,this.posY,this.n,this.n);
    }
   }
  }
}
{{< /p5-global-iframe */>}}
```
{{< /details >}}

{{< p5-global-iframe id="breath" width="725" height="725" >}}
  let update=0;

function setup() {
  createCanvas(700, 680);
  stroke(90, 90, 90);
  strokeWeight(5);
  line(0,0, 200,200);
  let lines=[]; 
 
  for(let i=0;i<8;i++){
    line[i]=new Line(i*90);
    //line[i].drawL(update);
  }
}


function draw() {
  for(let i=0;i<8;i++){
    if(i%2==0){
      line[i].drawL(-270+update);
    }else{
      line[i].drawL(-270-update);
    }
  }
  update=update+0.5;
  if(update==180){
    update=0;
  }
}

class Line {
  constructor (posY) {
    this.n =90;
    this.posY = posY;
  }
  
  drawL(diff){
    for(let i=0;i<16;i++){
     let posX=i*90+diff;
     if(i%2==0){
       fill(0);
       rect(posX,this.posY,this.n,this.n);
     }else{
       fill(255);
       rect(posX,this.posY,this.n,this.n);
    }
   }
  }
}
{{< /p5-global-iframe >}}