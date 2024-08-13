let shift;
const inputArea = document.getElementById('inputText');
const outputArea = document.getElementById('output');
const inputKey = document.getElementById('input-key');
const errorP = document.getElementById('key-range-error')

function handleTextInput() {
	if (shift != '') {
		const input = inputArea.value;
		const shiftedText = shiftLetters(input, shift);
		outputArea.textContent = shiftedText;
		errorP.textContent = '';
	} else {
		errorP.textContent = 'Key must be in the range 1-25';
		outputArea.textContent = '';
	}
}
function handleKeyInput() {
	shift = parseInt(inputKey.value, 10);
	
	if (isNaN(shift) || shift < 1 || shift > 25) {
		shift = '';
    }
    if (inputArea.placeholder != "enter plaintext") {
		shift *= -1;
	}
	handleTextInput();
}
handleKeyInput();

inputArea.addEventListener('input', handleTextInput);
inputKey.addEventListener('input', handleKeyInput);

function shiftLetters(text, shift) {
    return text.split('').map(char => {
        const code = char.charCodeAt(0);
        if (char >= 'a' && char <= 'z') {
            return String.fromCharCode(((code - 97 + shift + 26) % 26) + 97);
        } else if (char >= 'A' && char <= 'Z') {
            return String.fromCharCode(((code - 65 + shift + 26) % 26) + 65);
        } else {
            return char;
        }
    }).join('');
}

function switchTexts() {
    shift *= -1;
    if (inputArea.placeholder == "enter plaintext") {
        inputArea.placeholder = "enter ciphertext";
		document.getElementById('input-head').textContent = 'Cipher';
		document.getElementById('output-head').textContent = 'Plain';
    } else {
        inputArea.placeholder = "enter plaintext";
		document.getElementById('input-head').textContent = 'Plain';
		document.getElementById('output-head').textContent = 'Cipher';
    }
	inputArea.value = outputArea.textContent;
    handleTextInput();
}

function copyOutput() {
	let copiedText = outputArea.innerText;
	navigator.clipboard.writeText(copiedText).then(() => {
		// Change button text to indicate success
		const button = document.getElementById('copy-button');
		button.innerHTML = 'copied';
		setTimeout(() => {
			button.innerHTML = '<img src="copy button.png" alt="copy" width="20px" height="24px">';
		}, 1000);
	}).catch(err => {
		console.error('Error copying text: ', err);
	});
}

function clearTexts() {
	inputArea.value = ''
	outputArea.textContent = ''
}