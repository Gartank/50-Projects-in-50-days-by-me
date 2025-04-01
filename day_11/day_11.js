'use strict';

const keycodeContainer = document.querySelector('.keycode-container');
const keyInput = document.querySelector('.keycode-input');
const clearBufferBtn = document.querySelector('.keycode-clear');
const MAX_BUFFER = 100;

document.addEventListener('keydown', (keyEvent) => {
    keycodeContainer.innerHTML = '';
    
    const codeElem =  document.createElement('div');
    codeElem.classList.add('keycode-box', 'keycode-code');
    codeElem.textContent = keyEvent.code;
    keycodeContainer.appendChild(codeElem);

    const keyElem =  document.createElement('div');
    keyElem.classList.add('keycode-box', 'keycode-key');
    keyElem.textContent = keyEvent.key == ' ' ? 'Space' : keyEvent.key;
    keycodeContainer.appendChild(keyElem);

    if((keyInput.textContent+(keyEvent.key)).length % 42 === 0){
        keyInput.appendChild(document.createTextNode(' '));
    }
    if((keyInput.textContent+(keyEvent.key)).length >= MAX_BUFFER){
        keyInput.textContent = '';
    }
    keyInput.textContent += (keyEvent.key).length === 1 ? keyEvent.key : `<${keyEvent.key}>`;

}); 

clearBufferBtn.addEventListener('click', () => {
    keyInput.textContent = '';
});
