export const instagramUser = {
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
    },
    fetchUser : async ( username ) => {
        const userUrl = instagramUser.url(username);

        try {
            const response = await fetch(userUrl, instagramUser.options);
            const result = await response.json();

            const profileData = {
                "platformName": "instagram",
                'username' : result.username,
                'followerCount' : result.followers,
                "logo": "../assets/instagram-logo.svg",
                'userPic' : result.profile_pic_url
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
    undefined
}