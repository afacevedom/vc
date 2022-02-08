# Fotomosaico software
## Bio
WEBCRAWLER
<--->
{{< p5-global-iframe id="breath" width="800" height="800" >}}

let url = "https://www.googleapis.com/customsearch/v1?";
 // register: https://developers.google.com/custom-search/json-api/v1/overview
let apikey = "AIzaSyAGPjCqQzzIbJLjVYAHIiKwCHFr5woQ5K8";
//get the searchengine ID: https://cse.google.com/all (make sure image is on)
let engineID = "35e9d86ebb01dfc12";
//check other parameters: https://tinyurl.com/googleapiCSE
let searchType = "image";
let imgSize ="medium";
let request; //full API
let getImg;
let loc;
let img_x, img_y;
let frameBorder = 25; //each side
let imgLoaded = false;

function setup() {
createCanvas(windowWidth,windowHeight);
background(255);
frameRate(10);
  
input = createInput();
input.position(20, 45);
  
button = createButton('Buscar');
button.position(input.x + input.width, 45);
button.mousePressed(fetchImage);  

}

function fetchImage() {
let query = input.value();
request = url + "key=" + apikey + "&cx=" + engineID + "&imgSize=" + imgSize +"&q=" + query + "&searchType=" + searchType;
console.log(request);
loadJSON(request, gotData); //this is the key syntax to make API request
}

function gotData(data) {
getImg = data.items[0].image.thumbnailLink;
console.log(getImg);
}
function draw() {
if (getImg){ //takes time to retrieve the API data
loadImage(getImg, img=> { //callback function
//draw the frame + image
push();
translate(width/2-img.width-frameBorder, height/2-img.height-frameBorder);
scale(2);
if (!imgLoaded) {
noStroke();
fill(220);
rect(0, 0, img.width+frameBorder*2, img.height+frameBorder*2);
image(img,frameBorder, frameBorder);
imgLoaded = true;
}else{
//draw lines
img.loadPixels();
img_x = floor(random(0, img.width));
img_y = floor(random(0, img.height));
loc = (img_x+img_y * img.width)*4;
strokeWeight(0.7);
//rgb values
stroke(color(img.pixels[loc], img.pixels[loc + 1], img.pixels[loc+2]));
line(frameBorder+img_x, frameBorder+img_y,
frameBorder+img_x, frameBorder+img.height);
}
pop();
});
}
}


{{< /p5-global-iframe >}}