let imageSet=[],setLuma=[];
let WIDTH=500,HEIGHT=500;
var imgMosaic;
let numImg=31;
let scl;
function preload(){
  var img;
  for(var i=1;i<=numImg;i++){
    img = loadImage('/vc/sketches/Images/'+i+'.jpg');
    imageSet.push(img);
  }
  imgMosaic = loadImage("/vc/sketches/Images/"+int(random(numImg))+".jpg");
}

function setup(){
  //scl=12;
  scl=createSlider(1,16,4);
  scl.position(400,50);
  scl.style('width','50px');
  createCanvas(imgMosaic.width*2,imgMosaic.height*2);
  quadrille = createQuadrille(imageSet);
  quadrille.sort();
  for (var j = 0;j<numImg;j++){
    var imgLuma = getLuma(quadrille.read(0,j));
    setLuma.push(imgLuma);
  }
}


function draw() {
  mosaicQuadrille = createQuadrille(10*scl.value(),imgMosaic);
for(var cx=0;cx<10*scl.value();cx++){
    for(var cy=0;cy<mosaicQuadrille.size/(10*scl.value());cy++){
       var alum = mosaicQuadrille.read(cy,cx)[0] * 0.299 + mosaicQuadrille.read(cy,cx)[1] * 0.587 + mosaicQuadrille.read(cy,cx)[2] * 0.114;
      var closest = setLuma.reduce(function(prev, curr) {
        return (Math.abs(curr - alum) < Math.abs(prev - alum) ? curr : prev);
      });
      var cell = setLuma.indexOf(closest);
      mosaicQuadrille.fill(cy,cx,imageSet[cell]);
    }
  }
  drawQuadrille(mosaicQuadrille, {cellLength: 40 / scl.value(), outlineWeight: 1.6 / scl.value(), outline: color(255)});
  image(imgMosaic,400,0,imgMosaic.width/10,imgMosaic.height/10);
}


function getLuma(imagelum){
  imagelum.loadPixels();
  var avgluma=0;
  
  for(var k=0;k<imagelum.pixels.length;k+=4){
      let r = imagelum.pixels[k+0];
      let g = imagelum.pixels[k+1];
      let b = imagelum.pixels[k+2];
      let a = imagelum.pixels[k+3];
      var luma = 0.299 * r + 0.587 * g + 0.114 * b;
      avgluma +=luma;
    }
  avgluma = avgluma/(imagelum.pixels.length/4);
  return avgluma;
}