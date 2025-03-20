'use strict';

const addChoiceBtn = document.querySelector(".choice-add");
const pickChoiceBtn = document.querySelector(".choice-pick");
const choicesContainer = document.querySelector(".choices-container");
const choicesObjArr = [];
let activeChoice = null;
let pickMode = false;

function isNotActivable(choiceObj){
    return choiceObj.classList.contains('choice--active') && pickMode == false ;
}

function desactivateChoice(choiceObj){
    
    if(activeChoice == null){
        return;
    }

    const choiceOptions = choiceObj.options;

    activateChoice(choiceObj)

    if(choicesObjArr.length != 1){
        choiceObj.choice.classList.remove('choice--active');
        activeChoice = null;
    }
}

function activateChoice(choiceObj){

    const choiceElem = choiceObj.choice;
    const choiceOptions = choiceObj.options;
    
    if( !choiceElem.classList.contains("choice--active") && activeChoice !== choiceObj ){
        
        choiceElem.classList.add("choice--active" );
        
        desactivateChoice(activeChoice);
        activeChoice = choiceObj;
    }
    else{

        choiceOptions.get('option-confirm').classList.remove('option-confirm');
        choiceOptions.get('option-confirm').classList.add('option-edit');
        
        choiceObj.textNode.data = choiceOptions.get("option-input").value;
        choiceObj.choice.appendChild(choiceObj.textNode);
    
        choiceOptions.get('option-input').classList.add('input--disabled');
        choiceOptions.get('option-confirm').childNodes[0].textContent = 'edit';
    }

    if(choicesObjArr.length > 1){
        pickChoiceBtn.disabled = false;
        pickChoiceBtn.classList.remove('btn--disabled');
    }
}

function editChoice( choiceObj ){

    const choiceOptions = choiceObj.options;
    
    choiceOptions.get('option-confirm').classList.remove('option-edit');
    choiceOptions.get('option-confirm').classList.add('option-confirm');
    choiceOptions.get('option-confirm').childNodes[0].innerText = 'check'; 
    
    choiceOptions.get('option-input').classList.remove('input--disabled');
    choiceObj.choice.removeChild(choiceObj.textNode);
    
    choiceOptions.get("option-input").value = choiceObj.textNode.data;
    
    choiceOptions.get('option-input').focus();
    choiceOptions.get('option-input').select();

}

function optionEvents(choiceObj){
    
    const choiceOptions = choiceObj.options;
    choiceOptions.get('option-remove').addEventListener( 'click', (event) => {
        
        if(!isNotActivable(choiceObj.choice)) return;
        if( choiceObj.choice.classList.contains('choice--active') && choiceOptions.get("option-input").value != '' 
        && !choiceOptions.get('option-input').classList.contains('input--disabled') ){
            
            desactivateChoice(choiceObj);
            choiceObj.textNode = choiceOptions.get('option-input').value;
        }else{
            
            choicesContainer.removeChild(choiceObj.choice);
            choicesObjArr.splice(choicesObjArr.indexOf(choiceObj), 1);

            if(choicesObjArr.length <= 1){
                pickChoiceBtn.disabled = true;
                pickChoiceBtn.classList.add('btn--disabled');
            }
        }
    } ) 
    choiceOptions.get('option-confirm').addEventListener( 'click', (event) => {
        if(!isNotActivable(choiceObj.choice)) return;
        if( choiceOptions.get('option-confirm').classList.contains('option-edit') ){
            editChoice(choiceObj);
        }
        else if( choiceOptions.get('option-confirm').classList.contains('option-confirm') ){

            activateChoice(choiceObj)
        }
    } )
    
    choiceOptions.get('option-input').addEventListener( 'keydown', (event) => {
        if(!isNotActivable(choiceObj.choice)) return;
        if(event.key == 'Enter'){
            choiceOptions.get('option-confirm').click();
        }
    } )
    choiceOptions.get('option-input').addEventListener( 'keydown', (event) => {
        if(!isNotActivable(choiceObj.choice)) return;
        if(event.key == 'Escape'){
            choiceOptions.get('option-remove').click();
        }
    } )
}

function choiceEvents(choiceObj){
    
    const choiceElem = choiceObj.choice;
    const choiceOptions = choiceObj.options;
    
    choiceElem.addEventListener( 'click', (event) => {
        if(event.target == choiceElem){
            activateChoice(choiceObj);
        }
    })
    optionEvents(choiceObj);

    document.addEventListener( 'keydown', (event) => {
        if( event.key == 'Escape' ){
            desactivateChoice(choiceObj);
        }
    })
}

addChoiceBtn.addEventListener("click", () => {

    if(pickMode){
        return;
    }

    const newChoice = document.createElement("div");
    newChoice.classList.add("choice");
    
    newChoice.innerHTML = 
    '<button type="button" class="choice-option option-remove"><span class="material-symbols-outlined">close</span></button>' +
    '<button type="button" class="choice-option option-confirm"><span class="material-symbols-outlined">check</span></button>' +
    '<input type="text" class="choice-input option-input" placeholder="Type your choice..."> ';
    
    const textNode = document.createTextNode(`Choice ${choicesObjArr.length + 1}`);
    newChoice.appendChild(textNode);

    const choiceOptions = new Map();
    newChoice.childNodes.forEach( (child) => {
        if(child.nodeType == 1){
            choiceOptions.set(child.classList[1], child);
        }
    });

    const choiceObj = {choice: newChoice, options : choiceOptions, textNode: textNode};

    choicesObjArr.unshift(choiceObj);
    choicesContainer.appendChild(newChoice);
    choiceEvents(choiceObj);
    activateChoice(choiceObj);
    editChoice(choiceObj);
});


pickChoiceBtn.addEventListener("click", () => {

    if(activeChoice != null){
        desactivateChoice(activeChoice)
    }

    pickMode = true;

    let randomChoice = null;
    
    addChoiceBtn.classList.add('btn--disabled');
    let repeats = 0; 
    let chooseInterval = setInterval( () => {
        if(randomChoice) {
            randomChoice.classList.remove('choice--picked');
        }

        if(repeats === choicesObjArr.length-1){
            setTimeout( () => {
                randomChoice.classList.remove('choice--picked');
            }, 2000);
            pickMode = false;
            addChoiceBtn.classList.remove('btn--disabled');
            clearInterval(chooseInterval);
        }
        
        
        const randomChoiceIndex = Math.floor(Math.random() * 100 ) % (choicesObjArr.length-1);
        console.log(randomChoiceIndex);
        randomChoice = choicesObjArr[randomChoiceIndex].choice;
        randomChoice.classList.add('choice--picked');
        
        repeats++;
    }, 2500/choicesObjArr.length)
    
    
});
