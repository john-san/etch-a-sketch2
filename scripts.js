const container = document.createElement('div');
container.classList.add('container');

appendChild(container, 'body');

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
  
  appendChild(rowContainer, '.container');
}

function createGrid(size) {
  for (i = 0; i < size; i++) {
    createRow(size);
  }
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