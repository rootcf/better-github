window.onload = function(){
setInterval(function() {

if (!document.getElementById("bettergithub-follows-you")){


var login_username = String(document.querySelector('meta[name="user-login"]').getAttribute("content"));
var user_username =  String(document.querySelector('meta[name="octolytics-dimension-user_login"]').getAttribute("content"));
const followingLink = document.querySelectorAll('.Link--secondary.no-underline.no-wrap'); 
 const perPage = 100;
let page = 1;
let users = [];

const getFollowings = async (username) => {
  let followingURL = `https://api.github.com/users/${username}/following`;
 
  let followings = [];

  while (followingURL) {
    const response = await fetch(followingURL);
    const data = await response.json();
    followings = followings.concat(data);
    // sonraki sayfaya ait bağlantıyı al
    const linkHeader = response.headers.get('Link');
    if (linkHeader) {
      const nextLink = linkHeader.split(',').find(link => link.includes('rel="next"'));
      if (nextLink) {
        followingURL = nextLink.split(';')[0].trim().slice(1, -1);
} else {
followingURL = null;
}
} else {
followingURL = null;
}
}
return followings;
};



const myPromise = new Promise((resolve, reject) => {
const followings = getFollowings(String(user_username));
    resolve(followings);
 
});

 myPromise.then((result) => {

 for (const following of result) {
  if (following.login === login_username) {
if (!document.getElementById("bettergithub-follows-you")){
   followingLink[1].insertAdjacentHTML('afterend', '<br><p id="bettergithub-follows-you">Follows you</p>');
      break;
}
else{
return;
}
  }
}
}).catch((error) => {
  // Handle error
});
}
else{
return;

 
}
},200);
};
