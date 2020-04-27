var userData = {
    accessToken : "",
    tokenType : "",
    expiresIn : 0,
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
    data.accessToken = _urlParams.get('#access_token');
    data.tokenType = _urlParams.get('token_type');
    data.expiresIn = _urlParams.get('expires_in');

    console.log(window.location.hash);
    console.log("Access Token: " + data.accessToken + " Token Type: " + data.tokenType + " Expires In: " + data.expiresIn);
}

function PlayTrack()
{
    axios({
        method: "put",
        url: "https://api.spotify.com/v1/me/player/play",
        headers: {
          "Authorization": "Bearer " + data.accessToken
        },
        data: { //this is the body
            "uris": ["spotify:track:4uLU6hMCjMI75M1A2tKUQC"]
        }
      })
}

function GetPlaylists()
{
    axios({
        method: "get",
        url: "https://api.spotify.com/v1/v1/me/playlists ",
        headers: {
          "Authorization": "Bearer " + data.accessToken
        },
      })
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
}