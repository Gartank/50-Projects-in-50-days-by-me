'use strict';

const countersContainer = document.querySelector( '.counters' );
const counterArray = [];
const dataDir = './data.json';

class Counter {

    constructor( platform, userName = 'default_user', followers = 20000, logo = '', counterElem = null ){
        
        this.platform = platform;
        this.logo = logo;
        this.userName = userName;
        this.followers = followers;
        
        this.elem = Counter.initElem( platform, userName, counterElem , followers, logo );
    }
    
    delete(){
        this.elem.remove();
        delete this.elem;
        delete this.socialMedia;
        delete this.followers;
        delete this;
    }

    deployElem(){
        countersContainer.appendChild(this.elem);
    }

    static initElem( platform, userName, counterElem , followers, logo ){
        const elem = document.createElement('div');
        elem.classList.add('counter', `counter-${platform}`)
        
        const logoElem = document.createElement('span');
        logoElem.classList.add('counter-logo', `logo-${platform}`);
        logoElem.style.backgroundImage = `url${logo})`;

        const title = document.createElement('h2');
        title.classList.add('counter-user');
        title.innerText = `@${userName}`;

        const number = document.createElement('div');
        number.classList.add('counter-number');
        number.innerText = followers;

        elem.appendChild(logoElem);
        elem.appendChild(title);
        elem.appendChild(number);

        return elem;
    } 
}


async function getData(dir = dataDir){
    const response = await fetch(dir);
    const data = await response.json();
    const mediaAccounts = data["socialMediaAccounts"];

    for( let account in mediaAccounts){
        const accountAux = mediaAccounts[account];
        
        const counterAux = new Counter( accountAux['platformName'], accountAux['username'], accountAux['followerCount'], accountAux['logo']);
        
        counterArray.push(counterAux);
        counterAux.deployElem();
    }
}

getData()