const gradientBox = document.querySelector('.gradient-box');
const gradientTypeSelect = document.querySelector('.gradient-type-select');
const directionSelect = document.querySelector('.direction-select');
let colorInputs = document.querySelectorAll('.colors input');
const textarea = document.querySelector('textarea');
const refreshBtn = document.querySelector('.refresh');
const shuffleBtn = document.querySelector('.shuffle');
const copyBtn = document.querySelector('.copy');
const addColorBtn = document.querySelector('.add-color');
const colorContainer = document.querySelector('.color-container');
const generatedGradients = new Set();

const getRandomColor = () => {
    const randomColor = Math.floor(Math.random() * 0xffffff)
        .toString(16)
        .padStart(6, '0');
    return `#${randomColor}`;
};

const addColorInput = () => {
    const newInput = document.createElement('input');
    newInput.type = 'color';
    newInput.value = getRandomColor();
    newInput.addEventListener('input', () => generateUniqueGradient(false));
    colorContainer.appendChild(newInput);
    updateColorInputs();
};

const updateColorInputs = () => {
    colorInputs = document.querySelectorAll('.colors input');
    colorInputs.forEach(input => {
        input.addEventListener('input', () => generateUniqueGradient(false));
    });
};

const generateGradientString = () => {
    const gradientType = gradientTypeSelect.value;
    const direction = directionSelect.value;
    const colors = Array.from(colorInputs)
        .map(input => input.value)
        .join(', ');

    if (gradientType === 'linear-gradient') {
        return `${gradientType}(${direction}, ${colors})`;
    } else if (gradientType === 'radial-gradient') {
        return `${gradientType}(${colors})`;
    } else {
        return `${gradientType}(${colors})`;
    }
};

const generateUniqueGradient = () => {
    let gradient;
    do {
        gradient = generateGradientString();
        if (generatedGradients.has(gradient)) {
            colorInputs.forEach(input => {
                input.value = getRandomColor();
            });
        }
    } while (generatedGradients.has(gradient));

    generatedGradients.add(gradient);
    gradientBox.style.background = gradient;
    textarea.value = `background: ${gradient};`;
};

const shuffleGradient = () => {
    const gradientTypes = ['linear-gradient', 'radial-gradient', 'conic-gradient'];
    const randomType = gradientTypes[Math.floor(Math.random() * gradientTypes.length)];
    gradientTypeSelect.value = randomType;

    if (randomType === 'linear-gradient') {
        const directions = [
            'to top', 'to bottom', 'to left', 'to right',
            'to left top', 'to right top', 'to left bottom', 'to right bottom'
        ];
        const randomDirection = directions[Math.floor(Math.random() * directions.length)];
        directionSelect.value = randomDirection;
    }

    colorInputs.forEach(input => {
        input.value = getRandomColor();
    });

    generateUniqueGradient();
};

const copyCode = () => {
    navigator.clipboard.writeText(textarea.value);
    copyBtn.innerText = 'Copied!';
    setTimeout(() => {
        copyBtn.innerText = 'Copy Code';
    }, 2000);
};

gradientTypeSelect.addEventListener('change', generateUniqueGradient);
directionSelect.addEventListener('change', generateUniqueGradient);
refreshBtn.addEventListener('click', generateUniqueGradient);
shuffleBtn.addEventListener('click', shuffleGradient);
copyBtn.addEventListener('click', copyCode);
addColorBtn.addEventListener('click', addColorInput);
generateUniqueGradient();
