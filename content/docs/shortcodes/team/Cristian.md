# Cristian Moreno

{{<columns>}}
## Bio
Estudiante de ingeniera de Sistemas.
<--->
## Intereses
Dentro de mis intereses se encuentra la astrofotografia, desarrollo de software y la seguridad informatica.
<--->
## Hobbies
Microfutbol,Billar, Ajedrez.
{{< /columns>}}

## visual Ilussion
{{< details title="Codigo" open=false >}}
```js
{{</* p5-global-iframe id="breath" width="425" height="425" >}}
  // Adaptado de [this](https://github.com/simon-tiger/colorIllusions/blob/master/colorIllusion2/colorIllusion2.pde)
 let rotating = false;
let dissapear = false;
var a = 0;

function setup() {
  createCanvas(400, 400);
}

function draw() {
  background(255);
  translate(200, 200);
  rotate(a);
  if (rotating) {
    a += PI/4;
  }
  fill(255, 0, 0);
  noStroke();
  arc(0, 0, 300, 300, 0, PI/4);
  arc(0, 0, 300, 300, PI/2, 3*PI/4);
  arc(0, 0, 300, 300, PI, 5*PI/4);
  arc(0, 0, 300, 300, 3*PI/2, 7*PI/4);
  if (dissapear) {
    fill(0, 255, 255);
  } else {
    fill(0, 255, 0);
  }
  arc(0, 0, 300, 300, PI/4, PI/2);
  arc(0, 0, 300, 300, 3*PI/4, PI);
  arc(0, 0, 300, 300, 5*PI/4, 3*PI/2);
  arc(0, 0, 300, 300, 7*PI/4, TWO_PI);
}

function mousePressed() {
  if (mouseButton == LEFT) {
    rotating = !rotating;
  } else if (mouseButton == RIGHT) {
    dissapear = !dissapear;
  }
}
{{< /p5-global-iframe */>}}
```
{{< /details >}}

{{< p5-global-iframe id="breath" width="425" height="425" >}}
let rotating = false;
let dissapear = false;
var a = 0;

function setup() {
  createCanvas(400, 400);
}

function draw() {
  background(255);
  translate(200, 200);
  rotate(a);
  if (rotating) {
    a += PI/4;
  }
  fill(255, 0, 0);
  noStroke();
  arc(0, 0, 300, 300, 0, PI/4);
  arc(0, 0, 300, 300, PI/2, 3*PI/4);
  arc(0, 0, 300, 300, PI, 5*PI/4);
  arc(0, 0, 300, 300, 3*PI/2, 7*PI/4);
  if (dissapear) {
    fill(0, 255, 255);
  } else {
    fill(0, 255, 0);
  }
  arc(0, 0, 300, 300, PI/4, PI/2);
  arc(0, 0, 300, 300, 3*PI/4, PI);
  arc(0, 0, 300, 300, 5*PI/4, 3*PI/2);
  arc(0, 0, 300, 300, 7*PI/4, TWO_PI);
}

function mousePressed() {
  if (mouseButton == LEFT) {
    rotating = !rotating;
  } else if (mouseButton == RIGHT) {
    dissapear = !dissapear;
  }
}
{{< /p5-global-iframe >}}