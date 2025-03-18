'use strict';

const addChoiceBtn = document.querySelector(".choice-add");
const choicesContainer = document.querySelector(".choices-container");
const choicesArr = [];

function activateChoice(choice, choiceOptions){

    choice.addEventListener( 'click', (event) => {
        choice.classList.contains('choice--active') ?
        choice.classList.remove('choice--active') :
        choice.classList.add('choice--active');
    })
    choiceOptions.forEach(option => {
        option.addEventListener( 'click', (event) => {
            console.log(option);
            console.log(option.classList.contains('option-remove'));
            if(option.classList.contains('option-remove')){  
                choicesContainer.removeChild(choice);
                choicesArr.splice(choicesArr.indexOf(choice), 1);
            }
            else if(option.classList.contains('option-edit')){ 
                const previousText = choice.innerText;
                const inputChoice = document.createElement('input');

                inputChoice.type = 'text';
                inputChoice.value = previousText;
                inputChoice.classList.add('choice-input');

                choice.appendChild(inputChoice);
                
                option.children[0].innerText = 'check';
            }
            if( option.classList.contains('option-confirm') ){
                
            }
        });
    });
}

addChoiceBtn.addEventListener("click", () => {
    const newChoice = document.createElement("div");
    newChoice.classList.add("choice");
    newChoice.innerHTML = 
    '<button type="button" class="choice-option option-remove"><span class="material-symbols-outlined">close</span></button>' +
    '<button type="button" class="choice-option option-edit"><span class="material-symbols-outlined">edit</span></button>';
    const choiceOptions = newChoice.querySelectorAll('.choice-option');

    choicesArr.push(newChoice);
    choicesContainer.appendChild(newChoice);

    activateChoice(newChoice, choiceOptions);
});


