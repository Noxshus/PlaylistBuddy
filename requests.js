var userData = {
    accessToken : "",
    tokenType : "",
    expiresIn : 0,
}


const createLi = (user) => {
    const li = document.createElement('li');
    // add user details to `li`
    li.textContent = `${user.id}: ${user.first_name} ${user.last_name}`;
    return li;
};

const appendToDOM = (users) => {
    const ul = document.querySelector('ul');
    //iterate over all users
    users.map(user => {
        ul.appendChild(createLi(user));
    });
};

const fetchUsers = () => {
    axios.get('https://reqres.in/api/users')
        .then(response => {
            const users = response.data.data;
            console.log(`GET list users`, users);
            // append to DOM
            appendToDOM(users);
        })
        .catch(error => console.error(error));
};

fetchUsers();

function GetAuthorisation()
{
    let _clientId = "30f17f826d674bb48dcb9ae95ad228c3";
    let _redirectUri = "https://noxshus.github.io/PlaylistBuddy/";
    let _scopes = "user-modify-playback-state";
    
    window.location.href = "https://accounts.spotify.com/authorize" +
    "?client_id=" + encodeURIComponent(_clientId) +
    "&response_type=token" +
    "&redirect_uri=" + encodeURIComponent(_redirectUri) +
    "&scope=" + encodeURIComponent(_scopes);
}

function GetAuthorisationParameters()
{
    const _urlParams = new URLSearchParams(window.location.hash);
    accessToken = _urlParams.get('#access_token');
    tokenType = _urlParams.get('token_type');
    expiresIn = _urlParams.get('expires_in');

    console.log(window.location.hash);
    console.log("Access Token: " + accessToken + " Token Type: " + tokenType + " Expires In: " + expiresIn);
}

function PlayTrack()
{
    axios({
        method: "put",
        url: "https://api.spotify.com/v1/me/player/play",
        headers: {
          "Authorization": "Bearer " + accessToken
        },
        data: { //this is the body
            "context_uri": "spotify:track:4uLU6hMCjMI75M1A2tKUQC"
        }
      })
}