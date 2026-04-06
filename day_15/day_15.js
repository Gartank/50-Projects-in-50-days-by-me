
const instagramUser = {
    url : (user) => {
        return `https://instagram-profile1.p.rapidapi.com/getprofile/${user}`
    },
    options :  {
        method: 'GET',
        headers: {
            'x-rapidapi-key': 'e4e22290afmshbe440e3822173cbp1bdef3jsn478dc373a896',
            'x-rapidapi-host': 'instagram-profile1.p.rapidapi.com',
            'Content-Type': 'application/json'
        }
    }
}
const tiktokUser = {
    undefined
}
const xUser = {
    undefined
}


const countersContainer = document.querySelector( '.counters' );
const counterArray = [];
const dataDir = './user-data.json';


class Counter {

    constructor( platform ){
        this.platform = platform;
        if(platform == 'instagram'){
            this.platformApi =  instagramUser;
        }
        else if (platform == 'tiktok'){
            this.platformApi =  tiktokUser;
        }
        else if (platform == 'x'){
            this.platformApi = xUser;
        }
        this.logo = `../assets/${platform}-logo.svg`;
        this.userName = 'user';
        this.followers = '676767';
        this.userPic = '../assets/user_male_circle.svg';

        this.elem = Counter.initElem( this.logo );

        this.refreshElem();
    }
    delete(){
        this.elem.remove();
        delete this;
    }

    deployElem(){
        countersContainer.appendChild(this.elem);
    }

    startCounter(actualValue = 0){
        const counter = this.elem.querySelector('.counter-number');
        if( actualValue < this.followers ){
            actualValue += Math.ceil(this.followers / 500);
            counter.innerText = actualValue;
            let counterAddedDelay = 0;
            counterAddedDelay+= actualValue > this.followers * 0.95 ? 50 : 0;

            setTimeout(() => {
                this.startCounter(actualValue)
            },counterAddedDelay )
        }
        else{
            counter.innerText = this.followers;
            return;
        }
    }

    static initElem( logoUrl ){
        const elem = document.createElement('div');
        elem.classList.add('counter')

        const titleContainer = document.createElement('div');
        titleContainer.classList.add( 'counter-title' )

        const logoElem = document.createElement('img');
        logoElem.classList.add('counter-logo');
        logoElem.src = `${logoUrl}`

        const title = document.createElement('h2');
        title.classList.add('counter-user');
        title.innerText = `@${this.userName}`;

        titleContainer.append(logoElem, title);

        const userPic = document.createElement('img');
        userPic.classList.add('counter-pic');
        userPic.src = `${this.userPic}`;

        const searchBar = document.createElement('input');
        searchBar.className = ('searchBar searchBar-input');
        searchBar.type = 'text';
        searchBar.placeholder = 'Username';

        const searchBarBtn = document.createElement('button');
        searchBarBtn.className = 'searchBar searchBar-btn';
        searchBarBtn.innerText = '>';

        const searchBarContainer = document.createElement('span')
        searchBarContainer.className = 'searchBar searchBar-container';
        searchBarContainer.appendChild(searchBar);
        searchBarContainer.appendChild(searchBarBtn);

        const number = document.createElement('div');
        number.classList.add('counter-number');
        number.innerText = 0;

        elem.appendChild(userPic);
        elem.appendChild(number);
        elem.appendChild(titleContainer);
        elem.appendChild(searchBarContainer);

        counterArray.forEach(counter => {
            const searchBarbtn = counter.querySelector('.searchBar-btn');
            const searchBarcontent = counter.querySelector('searchBar-input');

            searchBarbtn.addEventListener('click', ev => {
            console.log('yeah, it works');
            })
        });

        return elem;
    }

    async refreshElem(){
        const response = await fetch(dataDir);
        const data = (await response.json())["socialMediaAccounts"];

        const userData = data.filter( user => user.platformName == this.platform )[0];

        this.userName = userData['username'];
        this.followers = userData['followerCount'];
        this.userPic = userData["userPic"];

        this.elem.querySelector(".counter-user").innerText = this.userName;
        this.elem.querySelector(".counter-number").innerText = this.followers;
        this.elem.querySelector(".counter-pic").src = this.userPic;
        this.elem.querySelector(".counter-logo").src = `${this.logo}`;
    }
}


async function refreshCounters(dir = dataDir){

    counterArray.forEach(counter => {
        counter.refreshElem()
    });
}

async function refreshDataUsers ( platform, object ) {
    const response = await fetch(dataDir);
    const data = (await response.json())["socialMediaAccounts"];

    const userData = Object.entries(data).filter( ([key, value]) => key == 'platfotmName' && value == platform )

    Object.keys(object).forEach( key => userData[key] = object[key] );
}

async function fetchUserInstagram( username ){
    const userUrl = instagramUser.url(username);

    try {
        const response = await fetch(userUrl, instagramUser.options);
        const result = await response.json();

        const profileData = {
            'followerCount' : result.followers,
            'username' : result.username,
            'userPic' : result.profile_pic_url
        };

        refreshDataUsers('instagram', profileData);
    }
    catch (error){
        console.error(error);
    }
}

async function fetchUserTiktok(  ){
    undefined;
}

function initCounter( ){
    const igCounter = new Counter("instagram" );
    const tiktokCounter = new Counter("tiktok");
    const XCounter = new Counter("x");

    counterArray.push(igCounter, tiktokCounter, XCounter);
    counterArray.forEach( counter => countersContainer.append(counter.elem) );
}




initCounter();
refreshCounters()