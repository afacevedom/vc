let imageSet=[];
let imgMosaic, numImg=50;
let resolucion,mosaico,cells,sel,pg,video,resp;
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
    //---------------Option selector-------------------
  sel = createSelect();
  sel.position(5, 50);
  sel.option('LUMA');
  sel.option('AVG');
  sel.option('ORIGINAL');
  sel.selected('ORIGINAL');
  sel.changed(Selected);
  

  //cells = createQuadrille(imageSet);
  cells = createQuadrille(resp);
  //cells.sort();//sort luma
  /*cells.sort({mode:'AVG'});
  pg= createGraphics(cSize*numImg,cSize);
  drawQuadrille(cells,{graphics:pg,cellLength: cSize,outlineWeight:0});*/
  pSize.push(cSize*31);
  pSize.push(cSize);
  
  mosaico.setUniform('cellSize',cSize);
  mosaico.setUniform('palleteSize',pSize);
  mosaico.setUniform('cols',numImg);
  
  //mosaico.setUniform('img', imgMosaic);
  mosaico.setUniform('img', random(resp));
  //mosaico.setUniform('img', video);
  
  resolucion = createSlider(5, 100, 1, 1);
  resolucion.position(10, 75);
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


function PalleteCells(mode){
  if(mode=="LUMA"){
    cells.sort();
  }else{
    cells.sort({mode:'AVG'});
  }
  pg= createGraphics(cSize*numImg,cSize);
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