import { Counter, initElem, deployElem, startCounter } from './counter.js';

const countersContainer = document.querySelector( '.counters' );
const counterArray = [];
const searchHistory = {
    limit : 100,
    history : [],
    directory : new Map(),
    data : [],
    addSearch(profileData, username) {
        if( this.history.length >= counter.limit ){
            this.history.shift();
        }

        console.log(profileData);

        this.history.push( profileData );
        this.directory.set(username, this.history.length - 1);
    },
    query(username) {
        const index = this.directory.get(username);
        return (index != undefined) ? this.history[index] && console.log(this.history[index]) : null;
    }
};

function initCounter( ){
    const igCounter = Counter("instagram" );
    const tiktokCounter = Counter("tiktok");
    const xCounter = Counter("x");

    igCounter.elem = initElem(igCounter);
    tiktokCounter.elem = initElem(tiktokCounter);
    xCounter.elem = initElem(xCounter);

    counterArray.push(igCounter, tiktokCounter, xCounter);
    counterArray.forEach( counter => deployElem(counter, countersContainer) );
}

function activateCountUp(){
    counterArray.forEach( (counter) => {
        startCounter(counter);
    })
}

initCounter();
activateCountUp()
