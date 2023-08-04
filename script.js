const defaultColor = 'black';
let currentColor = defaultColor;

const slider = document.querySelector('.size-slider')
let sizeValue = 50;

let mouseDown = false;
document.body.onmousedown = () => mouseDown=true;
document.body.onmouseup = () => mouseDown=false;

const createGrid = () => {  
  let totalHtml = '';
  let html = '';
  const size = 550/sizeValue;
  for (let i = 1; i <= sizeValue; i++) {
    html += `<div class='pixel' 
    style=" 
    height: ${size}px;
    width: ${size}px;
    "></div>`
  }
  for (let j = 1; j <= sizeValue; j++){
    totalHtml += `<div class='column'>${html}</div>`
  }
  document.querySelector('.drawing-board').innerHTML = `${totalHtml}`;
  enablePixelsChangeColor();
}
createGrid();
enablePixelsChangeColor();


slider.addEventListener("input", (event) => {
  sizeValue = event.target.value
  document.querySelector('.size-number').innerText = `${sizeValue}x${sizeValue}`;
  createGrid();
})


const options = document.querySelectorAll('.tool')
options.forEach(btn => {
  btn.addEventListener('click', () => {
    const activeOption = document.querySelector('.options .active');
    if (activeOption) {
      activeOption.classList.remove('active');
    }
    btn.classList.add('active');
  })
})


function changeColor(e) {
  if (e.type === 'mouseover' && !mouseDown) return;
  if (document.querySelector('.options .active')?.id === 'brush'){
    e.target.style.backgroundColor = currentColor;
  }
  else if (document.querySelector('.options .active')?.id === 'eraser'){
    e.target.style.backgroundColor = 'white';
  }
}

function enablePixelsChangeColor() {
  const pixels = document.querySelectorAll('.pixel');
  pixels.forEach((pixel) => {
    pixel.addEventListener("mouseover", changeColor);
    pixel.addEventListener("mousedown", changeColor);
  })
}

function clearCanvas() {
  createGrid();
}

const clearCanvasButton = document.querySelector('.clear-canvas');
clearCanvasButton.addEventListener("click", () => clearCanvas())

const colorChoices = document.querySelectorAll('.colors .option');
colorChoices.forEach((colorChoice) => {
  colorChoice.addEventListener("click", () => {
    if (document.querySelector('.colors .selected')){
      document.querySelector('.colors .selected').classList.remove('selected');
    }
    colorChoice.classList.add('selected');
    if (colorChoice.id !== 'others'){
      setColor(colorChoice.id);
    }
  })
})
const colorPicker = document.getElementById('color-picker')
colorPicker.addEventListener("input", (e) => {
  document.querySelector('.multiple-color').style.backgroundColor = e.target.value;
  setColor(e.target.value)
}, false)

function setColor(color) {
  currentColor = color;
}