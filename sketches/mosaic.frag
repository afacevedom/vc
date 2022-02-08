
precision mediump float;

uniform sampler2D img;

uniform sampler2D pallete;

uniform float resolucion;

uniform float cellSize;

uniform int option;

uniform float cols;

uniform vec2 palleteSize;


varying vec4 vVertexColor;

varying vec2 vTexCoord;


float luma(vec3 color){
  return 0.299*color.r + 0.587*color.g + 0.114*color.b;
}

float avg(vec3 color){
  return 0.333*color.r + 0.333*color.g + 0.333*color.b;
}

vec2 palleteCell(float cellS,float cellPos){
  float col = 1.0/cols;
  return vec2(vTexCoord.x/cellS + col*cellPos,vTexCoord.y);
} 

void main() {

   
  vec2 cPos = vTexCoord * resolucion;

  vec2 texCoord = floor(cPos);//Muestreada

  cPos = cPos - texCoord;//Normalizar 

  texCoord = texCoord/vec2(resolucion);

  vec4 imgTexel = texture2D(img, texCoord);
  
  //vec2 PalCoord = vec2((floor(luma(imgTexel.rgb)*cols)+cPos.s)/cols,cPos.t);
  //vec2 PalCoord = vec2((floor(avg(imgTexel.rgb)*cols)+cPos.s)/cols,cPos.t);
  //vec4 PalTexel = texture2D(pallete,PalCoord);


  //gl_FragColor = texture2D(img, vTexCoord); //Original
  //gl_FragColor = imgTexel; //pixelated
  //gl_FragColor = PalTexel;

  //gl_FragColor = texture2D(img, vTexCoord);
  if(option==2){
    vec2 PalCoord = vec2((floor(avg(imgTexel.rgb)*cols)+cPos.s)/cols,cPos.t);
    vec4 PalTexel = texture2D(pallete,PalCoord);
    gl_FragColor = PalTexel;
  }else if(option==1){
    vec2 PalCoord = vec2((floor(luma(imgTexel.rgb)*cols)+cPos.s)/cols,cPos.t);
    vec4 PalTexel = texture2D(pallete,PalCoord);
    gl_FragColor = PalTexel;
  }else{
    gl_FragColor = texture2D(img, vTexCoord);
  }

  
}
