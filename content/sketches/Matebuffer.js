new p5((p)=>{
    let img;
    p.preload = function (){
    img= p.loadImage('/vc/sketches/matebuff.png');
  }
  p.setup = function(){
    p.createCanvas(400,100);
    img.resize(400,100);
    p.image(img, 0, 0);
  }
  p.draw = function(){

  }
},"Matebuffer");
