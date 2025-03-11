'use strict';

const dadJokeContainer = document.querySelector('.dad_joke-container');
const changeJokeButton = document.querySelector(".btn-change");
const prevJokeButton = document.querySelector(".btn-prev");
const nextJokeButton = document.querySelector(".btn-next");

const jokesHistory = [];
let actualJoke = 0;
const HISTORY_LIMIT = 50;

function prevJoke(){
    
    const prev = jokesHistory[actualJoke+1];
    
    dadJokeContainer.removeChild(jokesHistory[actualJoke]);
    dadJokeContainer.appendChild(prev)
    
    if ( actualJoke+1 == jokesHistory.length-1){
        prevJokeButton.classList.add('btn--off');
    }
    if (nextJokeButton.classList.contains('btn--off')){
        nextJokeButton.classList.remove('btn--off');
    }
    console.log(jokeIndex)
}
function nextJoke(){

    const next = jokesHistory[actualJoke-1];
    
    dadJokeContainer.removeChild(jokesHistory[actualJoke]);
    dadJokeContainer.appendChild(next)
    
    if( actualJoke-1 == 0){
        prevJokeButton.classList.add('btn--off');
    }
    if (prevJokeButton.classList.contains('btn--off')){
        prevJokeButton.classList.remove('btn--off');
    }
}

function generateJoke(){

    const config = {
        headers: {
            Accept: 'application/json'
        }
    }
    
    const dadJokesReq = fetch( 'https://icanhazdadjoke.com/', config);
    
    if(dadJokeContainer.hasChildNodes()){
        dadJokeContainer.innerHTML = '';
    }
    
    dadJokesReq
        .then( (response) => { return response.json() })
        .then(
            (dataJSON) => {
                    const dadJokeElem = document.createElement('article');
                    dadJokeElem.id = 'dadJoke';
                    dadJokeElem.className = 'dad_joke';
                    dadJokeElem.textContent = dataJSON.joke;
                    dadJokeContainer.appendChild(dadJokeElem);

                    jokesHistory.unshift(dadJokeElem);
                }
        );
    
    if(prevJokeButton.classList.contains('btn--off')){
        prevJokeButton.classList.remove('btn--off');
    }
    
    actualJoke += (actualJoke != 0);
}

generateJoke();

changeJokeButton.addEventListener('click', generateJoke);
prevJokeButton.addEventListener('click', prevJoke);
nextJokeButton.addEventListener('click', nextJoke);
