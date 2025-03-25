'use strict'

const body = document.querySelector('body');

class menu {
    constructor(nav = document.querySelector('.navbar')){
        
        this.nav = nav;
        this.btn = document.querySelector('.nav-button')
        this.elems = nav.querySelectorAll('.nav-elem');
        this.rotateBtn = nav.querySelector('.btn-rotate')
        this.orientation = 'vertical';
    }
    
    horizontalMenu() {
        
        this.orientation = 'horizontal';
        this.nav.classList.add('navbar--horizontal');
        this.nav.classList.remove('navbar--vertical');
        this.btn.classList.add('button--horizontal');
        this.btn.classList.remove('button--vertical');
        
        this.elems.forEach( (elem) => {
            elem.classList.add('elem--horizontal');
            elem.classList.remove('elem--vertical');
            
            const elemIcon = elem.querySelector('.icon');
            const elemText = elem.querySelector('.text');
            
            elemIcon.classList.remove('icon--vertical')
            elemIcon.classList.add('icon--horizontal')
            
            elemText.classList.remove('text--vertical')
            elemText.classList.add('text--horizontal')
        });
        
        body.classList.remove("body--vertical")
        body.classList.add("body--horizontal")
        
        this.orientation = 'horizontal';
    }
    
    verticalMenu() {
        
        this.nav.classList.remove('navbar--horizontal');
        this.nav.classList.add('navbar--vertical');
        this.btn.classList.add('button--vertical');
        this.btn.classList.remove('button--horizontal');
        
        this.elems.forEach( (elem) => {
            elem.classList.add('elem--vertical');
            elem.classList.remove('elem--horizontal');

            const elemIcon = elem.querySelector('.icon');
            const elemText = elem.querySelector('.text');
            
            elemIcon.classList.remove('icon--horizontal')
            elemIcon.classList.add('icon--vertical')
            
            elemText.classList.remove('text--horizontal')
            elemText.classList.add('text--vertical')
            
            elemIcon.title = elemText.innerText;
        });

        body.classList.add("body--vertical")
        body.classList.remove("body--horizontal")
        
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
            this.btn.classList.toggle('wrapped');
            this.nav.classList.toggle('navbar--wrapped');
        });
    }
}


const menuBar = new menu();
menuBar.initEvents();

