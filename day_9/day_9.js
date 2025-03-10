"use strict";

const soundButtons = document.querySelectorAll(".sound-button");
const sounds = {};
const soundsUrl = {
    goofyHornCar: {url:"sounds/car-horn-goofy-warning-made-with-Voicemod.mp3", start: 0},
    goofyRunning: {url:"sounds/Goofy-ahhhhh-running-djlunatique.com_.mp3", start: 0},
    bruh: {url:"sounds/IUsN7ld3-Bruh-Sound-Effect.mp3", start: 0},
    bingChiling: {url:"sounds/John-Cena-Bing-Chilling.mp3", start: 0},
    metalPipesFalling: {url:"sounds/Metal20Pipes20Falling20Sound.mp3", start: 0},
    OOOMAGA: {url:"sounds/Ohhh-My-God-Vine-Sound-Effect.mp3", start: 3.3},
    PlanktonAughhhh: {url:"sounds/plankton-aughhhh-meme.mp3", start: 0.5},
    goofySlip: {url:"sounds/slip-goofy-made-with-Voicemod-1.mp3", start: 0},
    bong: {url:"sounds/Taco-Bell-Bong-Sound-Effect.mp3", start: 0},
    BoomSound: {url:"sounds/The-Rock-Boom-Sound-Effect.mp3", start: 0.3}
};

function preloadSounds(){
    for(const sound in soundsUrl){
        sounds[sound] = new Audio(soundsUrl[sound].url);
    }
}

preloadSounds();

soundButtons.forEach( (btn) => {
    btn.addEventListener('click', () => {
        const btnID = btn.id;
        sounds[btnID].currentTime = soundsUrl[btnID].start;
        sounds[btnID].play();
    })
})
