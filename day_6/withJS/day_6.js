const boxes = document.querySelectorAll(".elem-animation");

const windowStartTrigger = (window.innerHeight / 2) -  window.innerHeight*0.15;
const windowEndTrigger = (window.innerHeight / 2) + window.innerHeight*0.20;
const debugLineStart = document.querySelector("#start");
const debugLineEnd = document.querySelector("#end");
const debugButton = document.querySelector('.checkbox-slider--ball')

window.addEventListener('scroll', checkBoxes);
debugButton.addEventListener('click', debugSwitch);

checkBoxes();

function checkBoxes() {
    
    boxes.forEach( (box) => {
        let boxPosition = box.getBoundingClientRect();
        
        if(boxPosition.top > windowEndTrigger ){
            box.classList.remove(box.classList[1]);
            box.classList.add(`${box.classList[0]}__out`);
        }
        else if(boxPosition.top < windowStartTrigger){
            box.classList.remove(box.classList[1]);
            box.classList.add(`${box.classList[0]}__in`);
        }
        else{
            box.classList.remove(box.classList[1]);
        }
        
    });
}

function debugSwitch(  ){
    if( debugButton.classList.length > 1 ){
        debugButton.classList.remove("checkbox-slider--ball-active");
        debugLineEnd.style.display = 'none';
        debugLineStart.style.display = 'none';
    }
    else{
        debugButton.classList.add("checkbox-slider--ball-active")
        debugLineEnd.style.top = `${windowEndTrigger}px`;
        debugLineStart.style.top = `${windowStartTrigger}px`;
        debugLineEnd.style.display = 'block';
        debugLineStart.style.display = 'block';
    }
}

