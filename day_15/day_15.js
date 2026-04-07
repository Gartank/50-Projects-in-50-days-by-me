
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
const searchHistory = {
    limit : 100,
    history : [],
    directory : new Map(),
    data : [],
    addSearch(profileData, username) {
        if( this.history.length >= this.limit ){
            this.history.shift();
        }

        this.history.push( profileData );
        this.directory.set(username, this.history.length - 1);
    },
    query(username) {
        const index = this.directory.get(username);
        return (index != undefined) ? this.history[index] : null;
    }
};
let active = null;

async function fetchUserInstagram( username ){
    const userUrl = instagramUser.url(username);

    const historyRequest = searchHistory.query(username);
    if( historyRequest != null ){
        refreshDataUsers('instagram', historyRequest);
        return;
    }

    try {
        const response = await fetch(userUrl, instagramUser.options);
        const result = await response.json();

        const profileData = {
            'followerCount' : result.followers,
            'username' : result.username,
            'userPic' : result.profile_pic_url
        };

        refreshDataUsers( 'instagram', profileData );
        searchHistory.addSearch( profileData, username );
    }
    catch (error){
        console.error(error);
    }
}

async function fetchUserTiktok(  ){
    undefined;
}

async function fetchUserX(  ){
    undefined;
}

class Counter {
    constructor( platform ){
        this.platform = platform;
        if(platform == 'instagram'){
            this.platformApi =  fetchUserInstagram;
        }
        else if (platform == 'tiktok'){
            this.platformApi =  fetchUserTiktok;
        }
        else if (platform == 'x'){
            this.platformApi = fetchUserX;
        }
        this.logo = `../assets/${platform}-logo.svg`;
        this.userName = 'user';
        this.followers = '676767';
        this.userPic = '../assets/user_male_circle.svg';

        this.elem = Counter.initElem( platform, this.logo, this.userPic );

        this.refreshElem();
    }
    remove(){
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

    static initElem( platform, logoUrl, defaultPic ){
        const elem = document.createElement('div');
        elem.classList.add('counter')

        const titleContainer = document.createElement('div');
        titleContainer.classList.add( 'counter-title' )

        const logoElem = document.createElement('img');
        logoElem.classList.add('counter-logo');
        logoElem.src = `${logoUrl}`

        const userPic = document.createElement('img');
        userPic.classList.add('counter-pic');
        userPic.src = defaultPic;

        const searchBar = document.createElement('input');
        searchBar.className = ('searchBar searchBar-input_user');
        searchBar.type = 'text';
        searchBar.placeholder = 'Username';

        const searchBarBtn = document.createElement('button');
        searchBarBtn.className = 'searchBar searchBar-btn';
        searchBarBtn.innerText = '>';

        const searchBarContainer = document.createElement('div')
        searchBarContainer.className = 'searchBar searchBar-container';
        searchBarContainer.appendChild(searchBar);
        searchBarContainer.appendChild(searchBarBtn);

        titleContainer.append(logoElem, searchBarContainer);

        const number = document.createElement('div');
        number.classList.add('counter-number');
        number.innerText = 0;

        elem.appendChild(userPic);
        elem.appendChild(number);
        elem.appendChild(titleContainer);

        searchBarBtn.addEventListener( "click", () => {
            if( searchBar.value == "" ) {
                return;
            }

            if(platform == 'instagram'){
                fetchUserInstagram( searchBar.value );
            }
            else if (platform == 'tiktok'){
                fetchUserTiktok( searchBar.value );
            }
            else if (platform == 'x'){
                fetchUserX( searchBar.value );
            }
        }, );
        searchBar.addEventListener( 'click', ( event ) => {
            if(active != searchBarContainer && active != null){
                active.classList.remove('searchBar-container--active');
            }
            searchBarContainer.classList.add('searchBar-container--active');

            active = searchBarContainer;
        } )

        return elem;
    }

    async refreshElem(){
        const response = await fetch(dataDir);
        const data = (await response.json())["socialMediaAccounts"];

        const userData = data.filter( user => user.platformName == this.platform )[0];

        this.userName = userData['username'];
        this.followers = userData['followerCount'];
        this.userPic = userData["userPic"];

        this.elem.querySelector(".counter-number").innerText = this.followers;
        this.elem.querySelector(".counter-pic").src = this.userPic;
        this.elem.querySelector(".counter-logo").src = `${this.logo}`;
        this.startCounter();
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

function initCounter( ){
    const igCounter = new Counter("instagram" );
    const tiktokCounter = new Counter("tiktok");
    const XCounter = new Counter("x");

    counterArray.push(igCounter, tiktokCounter, XCounter);
    counterArray.forEach( counter => countersContainer.append(counter.elem) );
}

initCounter();
refreshCounters()