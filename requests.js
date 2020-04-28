var userData = {
    accessToken : "",
    tokenType : "",
    expiresIn : 0,

    userPlaylist: {},
    userPlaylistTracks: {},
}

function GetAuthorisation()
{
    let _clientId = "30f17f826d674bb48dcb9ae95ad228c3";
    let _redirectUri = "https://noxshus.github.io/PlaylistBuddy/";
    let _scopes = "user-modify-playback-state playlist-read-collaborative playlist-modify-public playlist-modify-private playlist-read-private";
    
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
    console.log(response.data);
    userData.userPlaylistTracks = response.data;
    console.log(userData.userPlaylistTracks);
    UpdateTracks();
  })
  .catch(function (error) {
    console.log(error);
  });
}

//------

function UpdatePlaylists()
{
    for (let i = 0; i < userData.userPlaylist.items.length; i++)
    {    
      let _node = document.createElement("LI");
      _node.setAttribute("id", "playlist" + i);
      let _textNode = document.createTextNode(userData.userPlaylist.items[i].name);
      _node.appendChild(_textNode);
      document.getElementById("playlists").appendChild(_node);

      
    }

    for (let i = 0; i < userData.userPlaylist.items.length; i++)
    {
      BuildButton("playlistbutton" + i, "GetTracks('" + userData.userPlaylist.items[i].id + "')", "Get Tracks", "playlist" + i);
    }
}

function UpdateTracks()
{
  for (let i = 0; i < userData.userPlaylistTracks.items.length; i++)
  {
    let _node = document.createElement("LI");
    _node.setAttribute("id", "track" + i);
    let _textNode = document.createTextNode(userData.userPlaylistTracks.items[i].track.name);
    _node.appendChild(_textNode);
    document.getElementById("tracks").appendChild(_node);
  }
}

//---------------------------

function BuildButton(_id, _buttonOnClickFunction, _buttonText, _nodeId)
{
    let _button = document.createElement("BUTTON");
    _button.setAttribute("id", _id);
    _button.setAttribute("onclick",_buttonOnClickFunction);
    _button.innerHTML = _buttonText;
    
    document.getElementById(_nodeId).appendChild(_button);
}