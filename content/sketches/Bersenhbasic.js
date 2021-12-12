new p5((p)=>{
    let img;
    p.preload = function (){
    img= p.loadImage('/vc/sketches/Bresenham.png');
  }
  p.setup = function(){
    p.createCanvas(400,300);
    img.resize(400,300);
    p.image(img, 0, 0);
  }
  p.draw = function(){

  }
},"Bersenhbasic");
