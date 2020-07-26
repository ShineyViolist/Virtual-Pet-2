//Create variables here

var dog, normalDog,happyDog, database, foodS, foodStock;

var feed,addFood,fedTime,lastFed,foodObject;

function preload()
{
  //load images here
  
  happyDog = loadImage("images/dogImg.png");

  normalDog = loadImage("images/dogImg1.png");
}

function setup() {
  createCanvas(1200,500);
  
  //foodS = 20;

  database = firebase.database();
  foodStock = database.ref('Food');
  foodStock.on("value", readStock,showError);
  
  dog = createSprite(250,250,20,20);
  dog.addImage(normalDog);
  dog.scale = 0.25;

  feed = createButton("Feed the dog");
  feed.position(700,95);
  feed.mousePressed(feedDog);

  addFood = createButton("Add Food");
  addFood.position(800,95);
  addFood.mousePressed(addFoods);

  foodObject = new Food();
}


function draw() {  
  background(46, 139, 87);

  //console.log(lastFed);

  /*if(keyWentDown(UP_ARROW)){
    writeStock(foodS);
    dog.addImage(happyDog);
  }*/

  foodObject.display();

  drawSprites();
  //add styles here


  //lastFed = foodObject.lastFed;
  fill(255,255,254);
  textSize(15);
  if(foodObject.lastFed >= 12){
    text("Last Feed : " + foodObject.lastFed%12 + "PM", 350,30);
  }else if(foodObject.lastFed == 0){
    text("Last Feed : 12 AM",350,30);
  }else{
    text("Last Feed :" + foodObject.lastFed + "AM",350,30);
  }

  fill("white");
  //text("Note: Press the up arrow to feed the dog milk!",130,20)
  text("Food Remaining: " + foodObject.foodStock,200,150);

}




function feedDog(){
  dog.addImage(happyDog);
  foodObject.deductFood();
  
}

function addFoods(){
  foodObject.foodStock++;
  foodObject.updateFoodStock();
}


function showError(){
  console.log("ERROR");
}

function readStock(){
  foodObject.updateFoodStock();
}