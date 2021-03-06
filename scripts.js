// Helpers
function addClass(el, ...classNames) {
  classNames.forEach((className) => {
    el.classList.add(className)
  });
}

function removeClass(el, ...classNames) {
  classNames.forEach((className) => {
    el.classList.remove(className)
  });
}

function appendChild(el, parentQuery) {
  const parent = document.querySelector(`${parentQuery}`);
  parent.appendChild(el);
}

function setBgColor(el, color) {
  el.setAttribute('style', `background-color: ${color}`);
}

function randomNumber(min, max) { 
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
} 

function getRandomColor() {
  return `rgb(${randomNumber(0,255)}, ${randomNumber(0,255)}, ${randomNumber(0,255)})`;
}


// Grid creation
const gridContainer = document.createElement('div');
gridContainer.classList.add('gridContainer');

appendChild(gridContainer, '.flexContainer');


function createCell() {
  const cell = document.createElement('div');
  addClass(cell, 'cell');
  return cell;
}

function createRow(length) {
  const rowContainer = document.createElement('div');
  addClass(rowContainer, 'row');
  for (j = 0; j < length; j++) {
    const cell = createCell();
    rowContainer.appendChild(cell);
  }
  
  appendChild(rowContainer, '.gridContainer');
}

function createGrid(size) {
  for (i = 0; i < size; i++) {
    createRow(size);
  }
}

function removeGrid() {
  gridContainer.replaceChildren();
}

function clearGrid() {
  [...gridContainer.children].forEach((row) => {
    [...row.children].forEach((cell) => setBgColor(cell, 'none'));
  })
}

function newGrid() {
  removeGrid();
  createGrid(gridRngSlider.value);
}

// Initialize grid
createGrid(16);

let mouseDown = false;

gridContainer.addEventListener('touchstart', (e) => {
  e.preventDefault();
  // console.log('touch down');
  mouseDown = true;
});

gridContainer.addEventListener('touchend', (e) => {
  // console.log('touch up');
  mouseDown = false;
});

gridContainer.addEventListener('touchmove', (e) => { 
  // console.log('touchmove');
  if (mouseDown) {
    let x = e.targetTouches[0].clientX;
    let y = e.targetTouches[0].clientY;
    const cell = document.elementFromPoint(x,y);
    if (cell && hoveredOverCell(cell)) {
      if (state.mode == 'Color') {
        resetOpacity(cell);
        setBgColor(cell, state.color);
      } else if (state.mode == 'Erase') {
        resetOpacity(cell);
        setBgColor(cell, 'none');
      } else if (state.mode == 'Rainbow') {
        resetOpacity(cell);
        const randomColor = getRandomColor();
        setBgColor(cell, randomColor);
      } else if (state.mode == 'Gray Scale') {
        setBgColorToBlack(cell);
        increaseOpacity(cell);
      }
    }
  }

});

gridContainer.addEventListener('touchmove', (e) => { });

gridContainer.addEventListener('mousedown', (e) => {
  console.log('mouse down');
  mouseDown = true;
});
gridContainer.addEventListener('mouseup', (e) => {
  console.log('mouse up');
  mouseDown = false;
});



gridContainer.addEventListener('mouseover', (e) => {
  if (mouseDown) {
    const cell = e.target;
    console.log(cell);
    if (hoveredOverCell(cell)) {
      if (state.mode == 'Color') {
        resetOpacity(cell);
        setBgColor(cell, state.color);
      } else if (state.mode == 'Erase') {
        resetOpacity(cell);
        setBgColor(cell, 'none');
      } else if (state.mode == 'Rainbow') {
        resetOpacity(cell);
        const randomColor = getRandomColor();
        setBgColor(cell, randomColor);
      } else if (state.mode == 'Gray Scale') {
        setBgColorToBlack(cell);
        increaseOpacity(cell);
      }
    }
  }
});

function hoveredOverCell(cell) {
  return [...cell.classList].includes('cell');
}

function resetOpacity(el) {
  el.style.opacity = '';
}

function increaseOpacity(el) {
  if (el.style.opacity === '') {
    el.style.opacity = 0.1;
  } else if (parseFloat(el.style.opacity) < 1.0) {
    el.style.opacity = parseFloat(el.style.opacity) + 0.1;
  } 
}

function setBgColorToBlack(el) {
  if (el.style.backgroundColor != 'black') {
    setBgColor(el, 'black');
  }
}

// State
let state = {
  mode: 'Color',
  color: ''
}

function updateState(prop, val) {
  state[prop] = val;
  console.log(state);
}



// Buttons
const clearBtn = document.getElementById('clearBtn');
clearBtn.addEventListener('click', clearGrid);


const buttons = [...document.querySelectorAll('button')];
buttons.forEach((button, idx) => {
  if (notTheLastBtn(idx)) {
    button.addEventListener('click', (e) => {
      removeActiveBtns();
      e.target.classList.toggle('btn-active');
      updateState('mode', e.target.textContent);
    });
  }
  
});

function notTheLastBtn(idx) {
  return idx + 1 != buttons.length;
}

function removeActiveBtns() {
  buttons.forEach((button) => {
    removeClass(button, 'btn-active');
  })
}

// Slider
const rngContainer = document.querySelector('.rngContainer');
const gridRngSlider = document.getElementById('gridRngSlider');
const rngDescription = document.createElement('p');
rngDescription.textContent = `${gridRngSlider.value} x ${gridRngSlider.value}`;
rngContainer.prepend(rngDescription);

function updateRngDescription() {
  rngDescription.textContent = `${gridRngSlider.value} x ${gridRngSlider.value}`;
}

gridRngSlider.addEventListener('input', () => {
  updateRngDescription();
});

gridRngSlider.addEventListener('mouseup', () => {
  newGrid();
});

// ColorPicker
const colorPicker = document.getElementById('colorPicker');
function updateColor() {
  updateState('color', colorPicker.value);
}


colorPicker.addEventListener('change', updateColor);


// Initialize color state
updateColor();