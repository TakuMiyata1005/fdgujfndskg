const colors = ["green","red","yellow","blue"];
let gamePattern = [];
let userPattern = [];
let level = 0;

const levelText = document.getElementById("level");

document
.getElementById("startBtn")
.addEventListener("click", startGame);

function startGame(){

    level = 0;
    gamePattern = [];

    nextSequence();
}

function nextSequence(){

    userPattern = [];

    level++;

    levelText.textContent =
        "LEVEL " + level;

    const randomNumber =
        Math.floor(Math.random()*4);

    const randomColor =
       colors[randomNumber];

    gamePattern.push(randomColor);

    playSequence();
}

function playSequence(){

    let i = 0;

    const interval = setInterval(() => {

        
        flashButton(gamePattern[i]);
playSound(gamePattern[i]);

        i++;

        if(i >= gamePattern.length){
            clearInterval(interval);
        }

    }, 700);

}

function playSound(name) {

    const sound = new Audio("audio/" + name + ".mp3");

    sound.play();
}

function flashButton(color){

    const btn =
        document.getElementById(color);

    btn.classList.add("flash");

    setTimeout(() => {

        btn.classList.remove("flash");

    }, 300);

}

colors.forEach(color => {

    document
        .getElementById(color)
        .addEventListener("click", () => {

    userPattern.push(color);

    flashButton(color);

    playSound(color);

    checkAnswer(userPattern.length - 1);
});

});

function checkAnswer(index){

  if(userPattern[index] === gamePattern[index]){

        if(userPattern.length === gamePattern.length){
            setTimeout(()=>{

              nextSequence();

           },1000);
        }

    }else{

    if(level > highScore){
        highScore = level;
    }

    document.getElementById("score").textContent =
        "High Score : " + highScore;

    levelText.textContent = "GAME OVER";
    playSound("wrong");

    alert("ゲームオーバー\nレベル：" + level);
    }
}    

function playSound(name){

    const sound =
        new Audio("audio/" + name + ".mp3");

    sound.play();
}

let highScore = 0;
if(level > highScore){
    highScore = level;
}
document.getElementById("score")
.textContent =
"High Score : " + highScore;