

let imageSet=[];
let imgMosaic, numImg=30;
let resolucion,mosaico,cells,sel,pg,resp,src,video;
let cSize=100;
let pSize=[];
let capture;
//API
let page = Math.floor(Math.random() * 100);
let apiKey = "e534b214d8734140ad84984bd010042c";
let url = `https://api.rawg.io/api/games?key=${apiKey}&page=${page}&page_size=${numImg}`;
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
  video = createVideo(['/vc/sketches/Video.mp4']);
  
  video.volume(0);
  video.hide();
  capture = createCapture(VIDEO);
  capture.hide();
  httpGet(url, 'json', false, async (data) => {
    try {
      resp = await Promise.all(data.results.map((value) => 
                                     getImage(value.background_image )));
    } catch (err) {
      console.log(err);
    }
    console.log(resp);
    //---------------Option selector-------------------
  sel = createSelect();
  sel.position(5, 50);
  sel.option('LUMA');
  sel.option('AVG');
  sel.option('ORIGINAL');
  sel.selected('ORIGINAL');
  sel.changed(Selected);
  //---------------Source selector-------------------
  src = createSelect();
  src.position(5, 30);
  src.option('IMAGE');
  src.option('VIDEO');
  src.option('CAM');
  src.selected('IMAGE');
  src.changed(SourceSelected);
  
  
  //cells = createQuadrille(imageSet);
  cells = createQuadrille(resp);
  
  pSize.push(cSize*31);
  pSize.push(cSize);
  
  mosaico.setUniform('cellSize',cSize);
  mosaico.setUniform('palleteSize',pSize);
  mosaico.setUniform('cols',numImg);
  
  //mosaico.setUniform('img', imgMosaic);
  mosaico.setUniform('img', random(resp));
  //mosaico.setUniform('img', capture);
  
  resolucion = createSlider(5, 100, 1, 1);
  resolucion.position(10, 75);
  resolucion.style('width', '90px');
  resolucion.input(() => mosaico.setUniform('resolucion', resolucion.value()));
  mosaico.setUniform('resolucion', resolucion.value());
  video.loop();
  
  });
}


function draw() {
    background(33);
    cover({ texture: true });
    //cover(true);
}

function Selected() {
  let item = sel.value();
  let val;
  if(item === "LUMA"){
    val = 1;
    PalleteCells(item);
  }else if(item === "AVG"){
    val = 2;
    PalleteCells(item);
  }else{
    val = 3;
  } 
  mosaico.setUniform('option', val);
}

function SourceSelected() {
  let item = src.value();
  if(item === "VIDEO"){
    mosaico.setUniform('img',video);
  }else if(item === "CAM"){
    mosaico.setUniform('img',capture);
  }else{
    mosaico.setUniform('img', random(resp));
  } 
}


function PalleteCells(mode){
  if(mode=="LUMA"){
    cells.sort();
  }else{
    cells.sort({mode:'AVG'});
  }
  pg= createGraphics(cSize*numImg-1,cSize);
  drawQuadrille(cells,{graphics:pg,cellLength: cSize,outlineWeight:0});
  mosaico.setUniform('pallete',pg);
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