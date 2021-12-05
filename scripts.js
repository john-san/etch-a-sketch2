const gridContainer = document.createElement('div');
gridContainer.classList.add('gridContainer');

appendChild(gridContainer, 'body');

function appendChild(el, parentQuery) {
  const parent = document.querySelector(`${parentQuery}`);
  parent.appendChild(el);
}

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
    [...row.children].forEach((cell) => removeClass(cell, 'active'));
  })
}



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

createGrid(16);


gridContainer.addEventListener('mouseover', (e) => {
  if ([...e.target.classList].includes('cell')) {
    addClass(e.target, 'active');
  }
});

const clearBtn = document.getElementById('clearBtn');
clearBtn.addEventListener('click', clearGrid);

