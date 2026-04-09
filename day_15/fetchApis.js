export const instagramUser = {
    url : (user) => {
        return `https://instagram-best-experience.p.rapidapi.com/profile?username=${user}`
    },
    options :  {
        method: 'GET',
        headers: {
            'x-rapidapi-key': 'e4e22290afmshbe440e3822173cbp1bdef3jsn478dc373a896',
            'x-rapidapi-host': 'instagram-best-experience.p.rapidapi.com',
            'Content-Type': 'application/json'
        }
    },
    fetchUser : async ( username ) => {
        const userUrl = instagramUser.url(username);

        try {
            const response = await fetch(userUrl, instagramUser.options);

            if (response.status != 200 ) {
                throw new Error("failed query " + response.status);
            }

            const result = await response.json();

            const profileData = {
                "platformName": "instagram",
                'username' : result.username,
                'followerCount' : result.follower_count,
                "logo": "../assets/instagram-logo.svg",
                'userPic' : result.hd_profile_pic_url_info.url
            };

            return profileData;
        }
        catch (error){
            console.error(error);
        }
    }
}
export const tiktokUser = {
    url : (user) => {
        return `https://tiktok-best-experience.p.rapidapi.com/user/${user}`
    },
    options : {
        method: 'GET',
        headers: {
            'x-rapidapi-key': 'e4e22290afmshbe440e3822173cbp1bdef3jsn478dc373a896',
            'x-rapidapi-host': 'tiktok-best-experience.p.rapidapi.com',
            'Content-Type': 'application/json'
        }
    },
    fetchUser: async ( username ) => {
        const userUrl = tiktokUser.url(username);

        try {
            const response = await fetch(userUrl, tiktokUser.options);
            const result = await response.json();

            const profileData = {
                "platformName": "tiktok",
                'username' : result.data.user.nickname ,
                'followerCount' : result.data.user.follower_count,
                "logo": "../assets/tiktok-logo.svg",
                'userPic' : result.data.user.avatar_168x168.url_list[1]
            };
            return profileData;
        }
        catch (err){
            console.log(err);
        }
    }
}
export const xUser = {
    url : (user) => {
        return `https://twitter-x.p.rapidapi.com/user/details?username=${user}`
    },
    options : {
        method: 'GET',
        headers: {
            'x-rapidapi-key': 'e4e22290afmshbe440e3822173cbp1bdef3jsn478dc373a896',
            'x-rapidapi-host': 'twitter-x.p.rapidapi.com',
            'Content-Type': 'application/json'
        }
    },
    fetchUser: async ( username ) => {
        const userUrl = xUser.url(username);

        try {
            const response = await fetch(userUrl, xUser.options);
            const result = await response.json();
            const profileData = {
                "platformName": "x",
                'username' : result.data.user.result.legacy.screen_name,
                'followerCount' : result.data.user.result.legacy.followers_count,
                "logo": "../assets/x-logo.svg",
                'userPic' : result.data.user.result.legacy.profile_image_url_https
            };
            console.log(profileData)
            return profileData;
        }
        catch (err){
            console.log(err);
        }
    }
}