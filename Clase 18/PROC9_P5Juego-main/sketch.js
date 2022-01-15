var Trex
var TrexRun
var TrexRIP
var Suelo
var SueloInvisible
var nubeimg
var marcador=0
var EstadoDelJuego= "PLAY"
var GrupoNubes,GrupoObstaculos
var GameOver
var Reset
var Jump
var Crash
var PuntoR 


function preload() {
  TrexRun=loadAnimation("trex1.png","trex3.png","trex4.png")
  TrexRIP=loadAnimation("trex_collided.png")
  Sueloimg=loadAnimation("ground2.png")
  nubeimg=loadAnimation("cloud.png")
  obstaculo1=loadAnimation("obstacle1.png")
  obstaculo2=loadAnimation("obstacle2.png")
  obstaculo3=loadAnimation("obstacle3.png")
  obstaculo4=loadAnimation("obstacle4.png")
  obstaculo5=loadAnimation("obstacle5.png")
  obstaculo6=loadAnimation("obstacle6.png")
   GameOver=loadAnimation("gameOver.png")
   Reset=loadAnimation("restart.png")
   Jump=loadSound("jump.mp3")
   Crash=loadSound("die.mp3")
   PuntoR=loadSound("checkPoint.mp3")
  //Precarga de animaciones
}

function setup() {
  createCanvas(windowWidth,windowHeight);
  Trex=createSprite (50,height-70,10,10)
  Trex.addAnimation("TrexCorriendo",TrexRun)
  Trex.addAnimation("RIP",TrexRIP)
  Trex.scale=0.4
  Gameover=createSprite (width/2,height-150,10,10)
  Gameover.visible=false
  Gameover.addAnimation("gameOver",GameOver)
  reset=createSprite(width/2,height-80,10,10)
  reset.addAnimation("restart",Reset)
  reset.visible=false
  //Trex.debug=true
  Trex.setCollider("circle",0,0,40)
  Suelo=createSprite (width/2,height-20,width,10)
  Suelo.addAnimation("Suelo",Sueloimg)
SueloInvisible=createSprite (width/2,height-10,width,10)
SueloInvisible.visible=false
GrupoNubes= new Group();
GrupoObstaculos= new Group();



}

function draw() 
{
  background(rgb(240, 128, 128));
drawSprites();
textSize(20)
text("marcador: "+marcador,width -200,20)
Trex.collide(SueloInvisible)

if(EstadoDelJuego === "PLAY"){
  Suelo.velocityX=-7
  if(Suelo.x<0){
  Suelo.x=200
  }
  if(frameCount % 10===0){
 marcador+=1

  }
 if(marcador%100===0 && marcador>0){
   PuntoR.play()
 }
  if(touches.length>0 || keyDown("space") && Trex.y>=height-100  ){
    console.log("posicionDelTrex",Trex.y)
    Jump.play()
    Trex.velocityY=-10
    touches=[]
    }
    Trex.velocityY+=0.5
    obstaculos();
    clouds();

  if (GrupoObstaculos.isTouching(Trex)){
    Crash.play()
   EstadoDelJuego="END"
   
  }
  }

if(EstadoDelJuego === "END"){
  Suelo.velocityX=0
  GrupoNubes.setVelocityXEach(0)
  GrupoObstaculos.setVelocityXEach(0)
  GrupoNubes.setLifetimeEach(-1)
  GrupoObstaculos.setLifetimeEach(-1)
  Trex.changeAnimation("RIP",TrexRIP)
  Trex.velocityY=0
   Gameover.visible=true
  reset.visible=true
  console.log ("antes")
  if(mousePressedOver(reset)){
   console.log ("despues")
    EstadoDelJuego="PLAY"
    Gameover.visible=false
    reset.visible=false
    GrupoObstaculos.destroyEach()
    GrupoNubes.destroyEach()
    Trex.changeAnimation("TrexCorriendo",TrexRun)
   marcador=0
  }
}
}

function clouds(){
if(frameCount % 100===0){
  var nube
  nube=createSprite(width,height-200,20,20) 
  nube.velocityX=-7
 nube.addAnimation("nube",nubeimg)
 nube.y=Math.round(random (height-200,height-900))
   nube.scale=0.9
nube.lifetime=100
//Para evitar el "lag" le dimos un tiempo de vida a la nube 
GrupoNubes.add(nube)
}

}

function obstaculos(){
if(frameCount % 100===0){
 var Obstaculo
 Obstaculo=createSprite(width/2,height-30,10,10)
 Obstaculo.velocityX=-7
 var NumeroAleatorio=Math.round(random(1,6))
 switch(NumeroAleatorio){
   case 1:Obstaculo.addAnimation("bstaculos",obstaculo1)
  break;
  case 2:Obstaculo.addAnimation("bstaculos",obstaculo2)
  break;
  case 3:Obstaculo.addAnimation("bstaculos",obstaculo3)
  break;
  case 4:Obstaculo.addAnimation("bstaculos",obstaculo4)
  break;
  case 5:Obstaculo.addAnimation("bstaculos",obstaculo5)
  break;
  case 6:Obstaculo.addAnimation("bstaculos",obstaculo6)
  break;
 default: break
}
 Obstaculo.scale=0.7
Obstaculo.lifetime=100

GrupoObstaculos.add(Obstaculo)

}




}



