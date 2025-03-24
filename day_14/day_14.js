'use strict'


class menu {
    constructor(nav = document.querySelector('.navbar')){
        
        this.nav = nav;
        this.btn = document.querySelector('.nav-button')
        this.elems = nav.querySelectorAll('.nav-elem');
        this.rotateBtn = nav.querySelector('.nav-rotate')
        this.orientation = 'vertical';
    }
    
    horizontalMenu() {
        
        this.orientation = 'horizontal';
        this.nav.classList.add('navbar--horizontal');
        this.nav.classList.remove('navbar--vertical');
        this.elems.forEach( (elem) => {
            const elemIcon = elem.querySelector('.icon');
            const elemText = elem.querySelector('.text');
            
            elemIcon.classList.remove('icon--vertical')
            elemIcon.classList.add('icon--horizontal')
            
            elemText.classList.remove('text--vertical')
            elemText.classList.add('text--horizontal')
        });
    }
    
    verticalMenu() {
        
        this.nav.classList.remove('navbar--horizontal');
        this.nav.classList.add('navbar--vertical');
        this.elems.forEach( (elem) => {
            const elemIcon = elem.querySelector('.icon');
            const elemText = elem.querySelector('.text');
            
            elemIcon.classList.remove('icon--horizontal')
            elemIcon.classList.add('icon--vertical')
            
            elemText.classList.remove('text--horizontal')
            elemText.classList.add('text--vertical')

            elemIcon.title = elemText.innerText;
        });

        
        this.orientation = 'vertical';    
    }

    initEvents(){
        this.rotateBtn.addEventListener('click', () => { 
            if(this.orientation === 'vertical'){
                this.horizontalMenu();
            } else {
                this.verticalMenu();
            }
        });

        this.btn.addEventListener('click', () => {
            this.nav.classList.toggle('navbar--wrapped');
        });
    }
}


const menuBar = new menu();
menuBar.initEvents();

