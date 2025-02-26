const boxes = document.querySelectorAll(".elem-animation");


window.addEventListener('scroll', checkBoxes)

checkBoxes();

function checkBoxes() {
    const windowStartTrigger = (window.innerHeight / 2) -  window.innerHeight*0.15;
    const windowEndTrigger = (window.innerHeight / 2) + window.innerHeight*0.15;
    // const debugLineStart = document.querySelector("#start");
    // const debugLineEnd = document.querySelector("#end");
    
    debugLineEnd.style.top = `${windowEndTrigger}px`;
    debugLineStart.style.top = `${windowStartTrigger}px`;
    
    boxes.forEach( (box) => {
        let boxPosition = box.getBoundingClientRect();

        if(boxPosition.top > windowEndTrigger){
            box.classList.remove(box.classList[1]);
            box.classList.add(`${box.classList[0]}__out`)
        }
        else if(boxPosition.top < windowStartTrigger){
                box.classList.remove(box.classList[1]);
                box.classList.add(`${box.classList[0]}__in`)
        }
        else{
            box.classList.remove(box.classList[1]);
        }
    });
}

