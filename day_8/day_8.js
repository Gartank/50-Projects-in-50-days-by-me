const inputText = document.querySelectorAll('.form-label > .input-text');
const inputs = document.querySelectorAll('.form-input');

let passwordLetters = [];
let emailLetters = [];

function sectionText( text ){
    const textLetters = text.innerText.split('');
    const saveOn = (text.innerText == 'Password') ? passwordLetters : emailLetters;
    
    text.innerHTML = '';
    
    textLetters.forEach( ( letter ) => {
        let letterElem = document.createElement('span');
    
        letterElem.classList.add('letter');
        letterElem.id = `letter-${letter}`;
        letterElem.innerText = letter;
        letterElem.style = `transition-delay: ${25*textLetters.indexOf(letter)}ms` 

        text.appendChild(letterElem);
        saveOn.push(letterElem);
    });
}

inputText.forEach( ( text ) => {

    sectionText(text);
});

function lettersUp(e){
    if( this.id.includes( 'password' ) ){
        passwordLetters.forEach( (letter) => {
            letter.classList.add('letter--up')
        });
    }
    else if( this.id.includes( 'email' ) ){
        emailLetters.forEach( (letter) => {
            letter.classList.add('letter--up')
        });
    }
}

function lettersDown(e) {
    if( this.id.includes( 'password' ) ){
        if(this.value.length == 0){
            passwordLetters.forEach( (letter) => {
                letter.classList.remove('letter--up')
            });
        }
    }
    else if( this.id.includes( 'email' ) ){
        if(this.value.length == 0){
            emailLetters.forEach( (letter) => {
                letter.classList.remove('letter--up')
            });
        }
    }
}

inputs.forEach( (input) => {
    input.addEventListener( 'focus' , lettersUp);
    input.addEventListener( 'blur' , lettersDown);
});
