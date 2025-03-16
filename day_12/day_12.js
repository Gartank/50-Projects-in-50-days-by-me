'use strict';

const collapserButton = document.querySelectorAll( '.question-button' );


collapserButton.forEach( (button) => {
    button.addEventListener( "click", function( event ){
    
        const question = this.parentNode;

        if( question.classList.contains("question--collapsed") ){
            question.classList.remove("question--collapsed");
            question.classList.add("question--expanded");

            this.classList.remove("button--collapse");
            this.classList.add("button--expand");
        }
        else{
            question.classList.remove("question--expanded");
            question.classList.add("question--collapsed");  
            
            this.classList.remove("button--expand");
            this.classList.add("button--collapse");
        }
    })
})
