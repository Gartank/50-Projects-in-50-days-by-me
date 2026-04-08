import { instagramUser, tiktokUser, xUser } from './fetchApis.js';

let active = null;

export function Counter( platform ){
    const counter = {
        platformApi: undefined,
        platform : platform,
        logoUrl : `../assets/${platform}-logo.svg`,
        userName : 'user',
        followers : 676767,
        userPic : "../assets/user_male_circle.svg",
        elem : null
    }

    if(platform == 'instagram'){
        counter.platformApi =  instagramUser;
    }
    else if (platform == 'tiktok'){
        counter.platformApi =  tiktokUser;
    }
    else if (platform == 'x'){
        counter.platformApi = xUser;
    }
    return counter;
}

export function deployElem( counter, countersContainer ){
    countersContainer.appendChild(counter.elem);
}

export function startCounter( counter, actualValue = 0){
    const counterNumber = counter.elem.querySelector('.counter-number');
    if( actualValue < counter.followers ){
        actualValue += Math.ceil(counter.followers / 500);
        counterNumber.innerText = actualValue;
        let counterAddedDelay = 0;
        counterAddedDelay+= actualValue > counter.followers * 0.95 ? 50 : 0;

        setTimeout(() => {
            startCounter(counter, actualValue)
        },counterAddedDelay )
    }
    else{
        counterNumber.innerText = counter.followers;
        return;
    }
}

export function initElem ( counter )  {

    const elem = document.createElement('div');
    elem.classList.add('counter')

    const titleContainer = document.createElement('div');
    titleContainer.classList.add( 'counter-title' )

    const logoElem = document.createElement('img');
    logoElem.classList.add('counter-logo');
    logoElem.src = counter.logoUrl;

    const userPic = document.createElement('img');
    userPic.classList.add('counter-pic');
    userPic.src = counter.userPic;

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

    searchBarBtn.addEventListener( "click", async () => {
        if( searchBar.value == "" ) {
            return;
        }

        const userData = await counter.platformApi.fetchUser( searchBar.value );

        counter.userName = userData.username;
        counter.followers = userData.followerCount;
        counter.userPic = userData.userPic;

        console.info(userData)

        number.innerText = counter.followers;
        userPic.src = counter.userPic;

        startCounter(counter);
    } );
    searchBar.addEventListener( 'focus', () => {
        searchBarContainer.classList.add('searchBar-container--active');
    } );
    searchBar.addEventListener( "blur", () => {
        searchBarContainer.classList.remove('searchBar-container--active');
    })

    return elem;
}