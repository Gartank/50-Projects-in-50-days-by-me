'use strict';

const dadJokeContainer = document.querySelector('.dad_joke-container');
const changeJokeButton = document.querySelector(".btn-change");
const dadJokeElem = document.querySelector('#dad_joke');
const prevJokeButton = document.querySelector(".btn-prev");
const nextJokeButton = document.querySelector(".btn-next");

const jokesHistory = [];
let actualJoke = 0;
const HISTORY_LIMIT = 50;

function changeJoke( joke ){
    dadJokeElem.textContent = joke;
}

function prevJoke(){
    
    if ( actualJoke+1 <= jokesHistory.length-1){
        const prev = jokesHistory[++actualJoke];
        changeJoke(prev);
        
        if( actualJoke == jokesHistory.length-1){
            prevJokeButton.classList.add('btn--off');
        }
        if (nextJokeButton.classList.contains('btn--off')){
            nextJokeButton.classList.remove('btn--off');
        }
    }
    console.log(actualJoke)
}

function nextJoke(){
    
    if( actualJoke-1 >= 0){
        const next = jokesHistory[--actualJoke];
        changeJoke(next);
        
        if (actualJoke == 0) {
            nextJokeButton.classList.add('btn--off');
        }
        if (prevJokeButton.classList.contains('btn--off')){
            prevJokeButton.classList.remove('btn--off');
        }
    }
    console.log(actualJoke)
}

function generateJoke(){

    const config = {
        headers: {
            Accept: 'application/json'
        }
    }
    
    const dadJokesReq = fetch( 'https://icanhazdadjoke.com/', config);
    
    dadJokesReq
        .then( (response) => { return response.json() })
        .then(
            (dataJSON) => {
                    const dadJoke = dataJSON.joke;
                    changeJoke(dadJoke);
                    jokesHistory.unshift(dadJoke);

                    actualJoke = 0;
                    nextJokeButton.classList.add('btn--off');
                }
            )
            .catch( (error) => {
                console.error("Theres's an error in the request: ", error);
            });
            
    if(prevJokeButton.classList.contains('btn--off') && jokesHistory.length > 1){
        prevJokeButton.classList.remove('btn--off');
    }
}

generateJoke();

changeJokeButton.addEventListener('click', generateJoke);
prevJokeButton.addEventListener('click', prevJoke);
nextJokeButton.addEventListener('click', nextJoke);
