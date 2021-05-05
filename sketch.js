var dog,sadDog,happyDog, database,canvas;
var foodS,foodStock;
var addFood;
var foodObj;

//create feed and lastFed variable here
var feedDog, lastFed;


function preload(){
sadDog=loadImage("Dog.png");
happyDog=loadImage("happy dog.png");
}

function setup() {
  canvas = createCanvas(displayWidth - 20, displayHeight-30)
  database=firebase.database();
  createCanvas(1000,400);

  foodObj = new Food();

  foodStock=database.ref('Food');
  foodStock.on("value",readStock);
  
  dog=createSprite(800,200,150,150);
  dog.addImage(sadDog);
  dog.scale=0.15;

  //create feed the dog button here

  addFood=createButton("Add Food");
  addFood.position(900,95);
  addFood.mousePressed(addFoods);

  feedTheDog=createButton("Feed the Dog");
  feedTheDog.position(800,95);
  feedTheDog.mousePressed(feedDog);

}

function draw() {
  background(46,139,87);
  foodObj.display();

  //write code to read fedtime value from the database 
  
 
  //write code to display text lastFed time here
  if(lastFed>=12){ 
    text("Last Feed : "+ lastFed%12 + " PM", 350,30); 
  }else if(lastFed==0){ text("Last Feed : 12 AM",350,30); 
  }else{ text("Last Feed : "+ lastFed + " AM", 350,30); 
  }
 
  drawSprites();
}

//function to read food Stock
function readStock(data){
  foodS=data.val();
  foodObj.updateFoodStock(foodS);
}


function feedDog(){
  dog.addImage(happyDog);
  feedTheDog.mousePressed(()=>{
  foodObj.deductFood();
  //var hour=hour();
  })
  database.ref('/').update({
    Food:foodS
  })

  //write code here to update food stock and last fed time
  if(lastFed>=12){
    text("Last feed:" + hour + "PM",350,30);
  }else if(lastFed==0){
     text("Last feed:12AM",350,30);
  }else{
    text("Last feed:" + hour + "AM",350,30);
  }
}

//function to add food in stock
function addFoods(){
  foodS++;
  database.ref('/').update({
    Food:foodS
  })
}
//if(food_stock_val <= 0){ foodObj.updateFoodStock(food_stock_val *0); }else{ foodObj.updateFoodStock(food_stock_val -1); }