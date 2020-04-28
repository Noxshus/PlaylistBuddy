var userData = {
  accessToken : "",
  tokenType : "",
  expiresIn : 0,

  userPlaylist: {},
  userPlaylistTracks: {},
}

/*window.addEventListener('locationchange', function(){ //after requesting & receiving authorisation, the url is modified with a hash, which this will detect & pick up the params from it
  GetAuthorisationParameters();
  console.log('New hash!');
})*/

window.onhashchange = function() { 
  GetAuthorisationParameters();
  console.log('New hash!');
}

function GetAuthorisation()
{
  if(window.location.hash) { //if there's already a hash in the URL
    GetAuthorisationParameters();
  } else {
    let _clientId = "30f17f826d674bb48dcb9ae95ad228c3";
    let _redirectUri = "https://noxshus.github.io/PlaylistBuddy/";
    let _scopes = "user-modify-playback-state playlist-read-collaborative playlist-modify-public playlist-modify-private playlist-read-private";

    window.location.href = "https://accounts.spotify.com/authorize" +
    "?client_id=" + encodeURIComponent(_clientId) +
    "&response_type=token" +
    "&redirect_uri=" + encodeURIComponent(_redirectUri) +
    "&scope=" + encodeURIComponent(_scopes);
  }
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
      data: { //this is the body
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
      params: {
          "limit": 50, // this is the maximum value for this. Users with >50 playlists will need extra handling, using the "offset" param: https://developer.spotify.com/documentation/web-api/reference/playlists/get-a-list-of-current-users-playlists/
      }
    })
    .then(function (response) {
      //console.log(response);
      //console.log(response.data);
      userData.userPlaylist = response.data;
      //console.log(userData.userPlayList);
      UpdatePlaylists();
    })
    .catch(function (error) {
      console.log(error);
    });
}

function GetTracks(_playlistId)
{
  axios({
    method: "get",
    url: "https://api.spotify.com/v1/playlists/" + _playlistId + "/tracks",
    headers: {
      "Authorization": "Bearer " + userData.accessToken
    },
    params: {
      "fields": "items(track(name,artists,id))" //https://developer.spotify.com/documentation/web-api/reference/playlists/get-playlists-tracks/
    } //this request supports drilling down and cherry-picking the return values. Since app might be used by people on data, better keep it as light as possible since these values are saved
  })
  .then(function (response) {
    //console.log(response);
    //console.log(response.data);
    userData.userPlaylistTracks = response.data;
    //console.log(userData.userPlaylistTracks);
    UpdateTracks();
  })
  .catch(function (error) {
    console.log(error);
  });
}