var userData = {
    accessToken : "",
    tokenType : "",
    expiresIn : 0,

    userPlayList: {},
}

function GetAuthorisation()
{
    let _clientId = "30f17f826d674bb48dcb9ae95ad228c3";
    let _redirectUri = "https://noxshus.github.io/PlaylistBuddy/";
    let _scopes = "user-modify-playback-state playlist-read-collaborative playlist-modify-public playlist-modify-private";
    
    window.location.href = "https://accounts.spotify.com/authorize" +
    "?client_id=" + encodeURIComponent(_clientId) +
    "&response_type=token" +
    "&redirect_uri=" + encodeURIComponent(_redirectUri) +
    "&scope=" + encodeURIComponent(_scopes);
}

function GetAuthorisationParameters()
{
    const _urlParams = new URLSearchParams(window.location.hash);
    userData.accessToken = _urlParams.get('#access_token');
    userData.tokenType = _urlParams.get('token_type');
    userData.expiresIn = _urlParams.get('expires_in');

    console.log(window.location.hash);
    console.log("Access Token: " + userData.accessToken + " Token Type: " + userData.tokenType + " Expires In: " + userData.expiresIn);
}

function PlayTrack()
{
    axios({
        method: "put",
        url: "https://api.spotify.com/v1/me/player/play",
        headers: {
          "Authorization": "Bearer " + userData.accessToken
        },
        userData: { //this is the body
            "uris": ["spotify:track:4uLU6hMCjMI75M1A2tKUQC"]
        }
      })
}

function GetPlaylists()
{
    axios({
        method: "get",
        url: "https://api.spotify.com/v1/me/playlists",
        headers: {
          "Authorization": "Bearer " + userData.accessToken
        },
      })
      .then(function (response) {
        console.log(response);
        console.log(response.data);
        userData.userPlayList = response.data;
        console.log(userData.userPlayList);
        console.log(userData.userPlayList.items[0].name);
      })
      .catch(function (error) {
        console.log(error);
      });
}