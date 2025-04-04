'use strict';

const fillOptions = document.querySelectorAll('.glass_portion');
const body = document.querySelector('body');
const glassCounter = {
    count: 0,
    elem: document.querySelector('.glass-counter'),
    maxWater: 0
}

class DrinkGlass{

    #hip;
    #topSpace;

    constructor ( glassElem, base = 15, consumed = 0, limit = 4000 ) {

        this.glassElem = glassElem;
        this.consumed = consumed;
        this.consumedElem = this.glassElem.querySelector('.glass-quantity');
        this.base = base
        this.limit = limit;
        this.#hip = Math.sqrt(this.base**2 + 97**2) ;
        this.#topSpace = 0;
    }
    
    addWater( quantity ){
        
        this.changeConsumed( quantity );
        let height = 97 * this.consumed / this.limit;
        const isFull = this.consumed > this.limit;
        if( isFull ){
            height = height % 97;
            glassCounter.count++;
            glassCounter.elem.childNodes[2].innerText = glassCounter.count;
            this.consumed = this.consumed % this.limit; 
        }
        const slope = this.calcSlope( height );
        this.#topSpace =  slope === 0 ? 0 : this.base - slope;
    
        const waterElem = this.glassElem.querySelector('.glass-water')
        waterElem.style['clipPath'] = `polygon(${this.#topSpace}% 0%, ${97-this.#topSpace}% 0%, ${97-this.base}% 97%, ${this.base}% 97%)`;
        waterElem.style.height = `${height}%`
        this.glassElem.childNodes[1].style.bottom = `${height-1}%`;
        

        glassCounter.maxWater += quantity;
        glassCounter.elem.childNodes[4].innerText = glassCounter.maxWater;
    }

    changeConsumed( quantity ){

        this.consumed += quantity;
        this.consumedElem.querySelector( '.quantity-num' ).innerText = `${this.consumed}`;
    }

    calcSlope( finalHeight ){

        const finalHip = this.#hip*finalHeight/97;
        const baseHip = (Math.sqrt(finalHip**2 - finalHeight**2));

        return baseHip;
    }

    static calcSlope( finalHeight, hip ){

        const finalHip = hip*finalHeight/97;
        const baseHip = Math.sqrt(finalHip**2 - finalHeight**2);
        
        return baseHip;
    }
}

function initOption(  option, base = 15  ){
    const quantity = parseInt(option.querySelector( '.option-quantity' ).innerText);
    const height = 97 * quantity / 4000;
    const hip = Math.sqrt(base**2 + 97**2);

    const slope = DrinkGlass.calcSlope( height, hip );
    const topSpace =  slope === 0 ? 0 : base - slope;
    
    const waterElem = option.querySelector('.glass-water');
    waterElem.style.clipPath = `polygon(${topSpace}% 0%, ${97-topSpace}% 0%, ${97-base}% 97%, ${base}% 97%)`;
    waterElem.style.height = `${height}%`;
}

const waterConsumed =  document.querySelector('.consumed-glass');

const glass = new DrinkGlass( waterConsumed);

console.log(waterConsumed, glass);


fillOptions.forEach( ( option ) => {
    
    initOption(option);

    option.addEventListener('click', ( e ) => { 
        glass.addWater(parseInt(option.innerText.slice(0, -2)))
    })
})
