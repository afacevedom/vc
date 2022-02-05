let imageSet=[];
let imgMosaic, numImg=30;
let resolucion,mosaico,cells;
let cSize=100;
let pSize=[];


//API
let page = Math.floor(Math.random() * 20);
let apiKey = "W55dn_UlaJ8Qj9DcrGbFHTuNPfVjkNpfsy_kg4gpUPI";
let url = `https://api.unsplash.com/photos?client_id=${apiKey}&page=${page}&per_page=${numImg}`;
function preload(){
  var img;
  mosaico = loadShader('/vc/sketches/mosaic.vert', '/vc/sketches/mosaic.frag');
  /*for(var i=1;i<=numImg;i++){
    img = loadImage('./Images/'+i+'.jpg');
    imageSet.push(img);
  }
  imgMosaic = loadImage("./Images/"+int(random(numImg))+".jpg");*/

}

function setup() {
  createCanvas(700, 700, WEBGL);
  textureMode(NORMAL);
  noStroke();
  shader(mosaico);
  httpGet(url, 'json', false, async (data) => {
    try {
      resp = await Promise.all(data.map((value) => 
                                     getImage(value.urls.regular + "&w=700&h=700")));
    } catch (err) {
      console.log(err);
    }
    console.log(resp);
  
  //cells = createQuadrille(imageSet);
  cells = createQuadrille(resp);
  cells.sort();
  pg= createGraphics(cSize*numImg,cSize);
  drawQuadrille(cells,{graphics:pg,cellLength: cSize,outlineWeight:0});
  pSize.push(cSize*31);
  pSize.push(cSize);
  
  mosaico.setUniform('pallete',pg);
  mosaico.setUniform('cellSize',cSize);
  mosaico.setUniform('palleteSize',pSize);
  mosaico.setUniform('cols',numImg);
  
  //mosaico.setUniform('img', imgMosaic);
  mosaico.setUniform('img', random(resp));
  
  resolucion = createSlider(5, 200, 1, 1);
  resolucion.position(90, 50);
  resolucion.style('width', '90px');
  resolucion.input(() => mosaico.setUniform('resolucion', resolucion.value()));
  mosaico.setUniform('resolucion', resolucion.value());
  });
}


function draw() {
    background(33);
    cover({ texture: true });
    //cover(true);
}

function cover(texture = false) {
  beginShape();
  vertex(-width / 2, -height / 2, 0, 0, 0);
  vertex(width / 2, -height / 2, 0, texture ? 1 : 0, 0);
  vertex(width / 2, height / 2, 0, texture ? 1 : 0, texture ? 1 : 0);
  vertex(-width / 2, height / 2, 0, 0, texture ? 1 : 0);
  endShape(CLOSE);
}
function getImage (url) {
  return new Promise(function (resolve, reject) {
    loadImage(url, (result) => {
      resolve(result);
    }, (e) => reject(Error("Image not found")));
  });
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
