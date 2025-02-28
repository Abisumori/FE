

// Пиксельный редактор
const canvas = document.getElementById('pixelCanvas');
const ctx = canvas.getContext('2d');
const cellSize = 20;
const cols = canvas.width / cellSize;
const rows = canvas.height / cellSize;
let isDrawing = false;
let currentColor = '#000000';

// Цветовая палитра
let colors = [
    '#000000', '#FF0000', '#00FF00', '#0000FF',
    '#FFFF00', '#FF00FF', '#00FFFF', '#FFFFFF',
    '#FFA500', '#800080', '#A52A2A', '#808080'
];

// Инициализация редактора
function initEditor() {
    updateColorPicker();
    drawGrid();
    changeColor('#000000');
}

// Обновление палитры цветов
function updateColorPicker() {
    const colorPicker = document.getElementById('colorPicker');
    colorPicker.innerHTML = '';
    
    colors.forEach(color => {
        const div = document.createElement('div');
        div.className = 'color-item';
        div.style.backgroundColor = color;
        div.addEventListener('click', () => changeColor(color));
        colorPicker.appendChild(div);
    });
}

// Добавление пользовательского цвета
function addCustomColor() {
    const colorInput = document.getElementById('newColor');
    const newColor = colorInput.value.toUpperCase();
    
    if (!colors.includes(newColor)) {
        colors.push(newColor);
        updateColorPicker();
        colorInput.value = '#000000';
    }
}

// Отрисовка сетки
function drawGrid() {
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    ctx.strokeStyle = '#eeeeee';
    for(let x = 0; x <= cols; x++) {
        ctx.beginPath();
        ctx.moveTo(x * cellSize, 0);
        ctx.lineTo(x * cellSize, canvas.height);
        ctx.stroke();
    }
    for(let y = 0; y <= rows; y++) {
        ctx.beginPath();
        ctx.moveTo(0, y * cellSize);
        ctx.lineTo(canvas.width, y * cellSize);
        ctx.stroke();
    }
}

function changeColor(color) {
    currentColor = color;
    document.getElementById('selectedColor').style.backgroundColor = color;
}

function clearCanvas() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawGrid();
}

// Обработчики событий рисования
canvas.addEventListener('mousedown', startDrawing);
canvas.addEventListener('mousemove', draw);
canvas.addEventListener('mouseup', stopDrawing);
canvas.addEventListener('mouseout', stopDrawing);

function startDrawing(e) {
    isDrawing = true;
    draw(e);
}

function draw(e) {
    if(!isDrawing) return;
    
    const rect = canvas.getBoundingClientRect();
    const x = Math.floor((e.clientX - rect.left) / cellSize);
    const y = Math.floor((e.clientY - rect.top) / cellSize);
    
    ctx.fillStyle = currentColor;
    ctx.fillRect(x * cellSize, y * cellSize, cellSize, cellSize);
    ctx.strokeStyle = '#eeeeee';
    ctx.strokeRect(x * cellSize, y * cellSize, cellSize, cellSize);
}

function stopDrawing() {
    isDrawing = false;
}

// Запуск приложения
initEditor();
showSlide(0);
