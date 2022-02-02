let imageSet=[],setLuma=[];
let WIDTH=500,HEIGHT=500;
var imgMosaic;
let numImg=31;
function preload(){
  var img;
  for(var i=1;i<=numImg;i++){
    img = loadImage('/vc/sketches/Images/'+i+'.jpg');
    imageSet.push(img);
  }
  imgMosaic = loadImage("/vc/sketches/Images/"+int(random(numImg))+".jpg");
}

function setup(){
  let scl=12;
  createCanvas(imgMosaic.width*2,imgMosaic.height*2);
  mosaicQuadrille = createQuadrille(10*scl,imgMosaic);
  quadrille = createQuadrille(imageSet);
  //image(imageSet[5],0,0,WIDTH,HEIGHT);
  quadrille.sort();
  console.log(quadrille.read(0,1));
  //drawQuadrille(quadrille,{cellLength:20,pixely:20});
  //drawQuadrille(mosaicQuadrille, {cellLength: 40 / scl, outlineWeight: 1.6 / scl, outline: color(random(255))});
  //image(imgMosaic,0,0,500,500);
  for (var j = 0;j<numImg;j++){
    var imgLuma = getLuma(quadrille.read(0,j));
    setLuma.push(imgLuma);
  }
  console.log("cols: "+10*scl+" rows:"+mosaicQuadrille.size/(10*scl));
  for(var cx=0;cx<10*scl;cx++){
    for(var cy=0;cy<mosaicQuadrille.size/(10*scl);cy++){
      //console.log(mosaicQuadrille.read(cy,cx));
      //mosaicQuadrille.fill(cy,cx,'a');
       var alum = mosaicQuadrille.read(cy,cx)[0] * 0.299 + mosaicQuadrille.read(cy,cx)[1] * 0.587 + mosaicQuadrille.read(cy,cx)[2] * 0.114;
      
      
      var closest = setLuma.reduce(function(prev, curr) {
        return (Math.abs(curr - alum) < Math.abs(prev - alum) ? curr : prev);
      });
      var cell = setLuma.indexOf(closest);
      mosaicQuadrille.fill(cy,cx,imageSet[cell]);
    }
  }
  
  
  drawQuadrille(mosaicQuadrille, {cellLength: 40 / scl, outlineWeight: 1.6 / scl, outline: color(random(255))});
  image(imgMosaic,400,0,imgMosaic.width/10,imgMosaic.height/10);
  console.log(setLuma);
}


function draw() {

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
