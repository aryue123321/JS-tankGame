const btnStart = document.querySelector('.btnStart');
const gameOverEle = document.getElementById('gameOverEle');
const container = document.getElementById('container');
const box = document.querySelector('.box');
const statusBar = document.getElementById('statusBar');
const boxCenter = [box.offsetLeft + box.offsetWidth/2, box.offsetTop + box.offsetHeight/2];
const icons = ['angry', 'basketball-ball', 'baseball-ball','accessible-icon','ambulance','centos'];
const border = {
  top: statusBar.offsetHeight,
  right: container.offsetWidth,
  bottom : container.offsetHeight-statusBar.offsetHeight,
  left: 0
}

let player;
let gamePlay = false;
let animateGame;

btnStart.addEventListener('click', startGame);

container.addEventListener('mousedown', mouseDown);
container.addEventListener('mousemove', mouseMove);

function mouseMove(e){
  let deg = calcAngleDegrees(e);
  box.style.transform = `rotate(${deg}deg)`;
  box.style.webkitTransform = `rotate(${deg}deg)`;
  box.style.mozTransform = `rotate(${deg}deg)`;
  box.style.msTransform = `rotate(${deg}deg)`;
  box.style.oTransform = `rotate(${deg}deg)`;
  box.style.transform = `rotate(${deg}deg)`;
}

function calcAngleDegrees(e) {
  return Math.atan2(e.clientX - boxCenter[0], -e.clientY + boxCenter[1]) * 180 / Math.PI;
}

function mouseDown(e){
  if (gamePlay){
    div = document.createElement('div');
    div.classList.add('fireme');
    let radian = calcAngleDegrees(e) * Math.PI / 180;
    div.style.left = `${boxCenter[0]-5}px`;
    div.style.top = `${boxCenter[1]-5}px`;
    div.rx = 5 * Math.sin(radian); 
    div.ry = -5 * Math.cos(radian);
    // div.style.width = '10px';
    // div.style.height = '10px';
    container.appendChild(div);
  }
}

function randomInt(range){
  return Math.floor(Math.random()*range);
}

function isCollide(a, b){
  let aRect = a.getBoudingClientRect();
  let bRect = a.getBoudingClientRect();
  return !((aRect.bottom < bRect.top) || (aRect.top > bRect.bottom) || (aRect.right < bRect.left) || (aRect.left > bRect.right));
}

function makeOneBadGuy(){
  const div = document.createElement('div');
  div.classList.add('baddy');
  div.innerHTML = `<i class="fas fa-${icons[randomInt(icons.length)]}"></i>`;
  
  switch(randomInt(4)){
    case 0:
      div.style.left = -20 +'px';
      div.style.top = statusBar.offsetHeight+20+randomInt(container.offsetHeight-statusBar.offsetHeight-50) +'px';
      div.rx = 4 + randomInt(3);
      div.ry = 4 + randomInt(3);
      break;
    case 1:
      div.style.left = randomInt(container.offsetWidth) +'px';
      div.style.top = statusBar.offsetHeight +'px';
      div.rx = 4 + randomInt(3);
      div.ry = 4 + randomInt(3);
      break;
    case 2:
      div.style.left = container.offsetWidth +'px';
      div.style.top = statusBar.offsetHeight+20+randomInt(container.offsetHeight-statusBar.offsetHeight-50) +'px';
      div.rx = (4 + randomInt(3))*-1;
      div.ry = 4 + randomInt(3);
      break;
    case 3:
      div.style.left = randomInt(container.offsetWidth) +'px';
      div.style.top = container.offsetHeight-15 +'px';
      div.rx = 4 + randomInt(3);
      div.ry = (4 + randomInt(3))*-1;
      break;
      
  }
  console.log(typeof div.rx + ' ' + typeof div.ry);
  container.appendChild(div);
}

function generateBadGuys(num){
  for (let i = 0; i < num; i++){
    makeOneBadGuy();
  }
}

function startGame(){
  console.log(isCollide(box, container));
  gamePlay = true;
  gameOverEle.style.display = 'none';
  player = {
    score : 0,
    lives : 100,
    barWidth: 100
  }
  generateBadGuys(10);
  animateGame = requestAnimationFrame(playGame);
}




function moveShots(){
  let shots = document.querySelectorAll('.fireme');
  shots.forEach(x => {
    if (x.offsetTop > border.bottom || x.offsetTop < border.top || x.offsetLeft < border.left || x.offsetLeft > border.right){
      x.remove();
    }else{
      x.style.left = `${x.offsetLeft + x.rx}px`;
      x.style.top = `${x.offsetTop + x.ry}px`;
    }
  });
}

function moveEnemies(){
  let enemies = document.querySelectorAll('.baddy');
  enemies.forEach(x => {
    if (x.offsetTop > border.bottom || x.offsetTop < border.top || x.offsetLeft < border.left || x.offsetLeft > border.right){
      x.remove();
    }else{
      x.style.left = `${x.offsetLeft + x.rx}px`;
      x.style.top = `${x.offsetTop + x.ry}px`;
    }
  });
}

function playGame(){
  if (gamePlay){
    moveShots();
    moveEnemies();
    animateGame = requestAnimationFrame(playGame);
  }
}
