var userData = { //saved between sessions to keep track of the token
    url : window.location.href, //the current url

    accessToken : "",
    tokenType : "",
    expiresIn : 0,

    tokenExpiryTime : new Date(), //time the token will expire - defaults to the time right now (which would be the same as having an expired token)

    signIn: false, //keeps track of whether the user is meant to be signed in, or not
}

var global = {
    userPlaylist: {},
    userPlaylistTracks: {},
    userPlaylistTracksAnalysis: {},
}

function GetAuthorisation()
{
    if(CheckIfTokenHasExpired() == false) 
    { //token hasn't expired yet, so no need for a new one
        console.log("No need for a new token; previous one hasn't expired.");
    } 
    else 
    { //we need to get a new token
        const _clientId = "30f17f826d674bb48dcb9ae95ad228c3";
        const _redirectUri = "https://noxshus.github.io/PlaylistBuddy/";
        const _scopes = "user-modify-playback-state playlist-read-collaborative playlist-modify-public playlist-modify-private playlist-read-private";

        window.location.href = "https://accounts.spotify.com/authorize" +
        "?client_id=" + encodeURIComponent(_clientId) +
        "&response_type=token" +
        "&redirect_uri=" + encodeURIComponent(_redirectUri) +
        "&scope=" + encodeURIComponent(_scopes);

        userData.signIn = true; //user has signed in
        Save(); //save the state as we're about to be redirected
    }
}

function GetAuthorisationParameters()
{
    if (window.location.hash != "") //check there's a hash before trying to retrieve it
    {
        if (CheckIfTokenHasExpired() == true) //If token has expired, collect the one in the hash
        {
            const _urlParams = new URLSearchParams(window.location.hash);
            userData.accessToken = _urlParams.get("#access_token");
            userData.tokenType = _urlParams.get("token_type");
            userData.expiresIn = _urlParams.get("expires_in");

            SetTokenExpiry(); //set the time the token is expected to expire at
            Save(); //save it to local storage

            console.log("Acquired new token!");
            console.log("Access Token: " + userData.accessToken);
        }
        else
        {
            console.log("URL has changed, but the previous token isn't expired yet. Shouldn't be able to reach this path!");
        }
    }
    else
    {
        console.log("No hash in the URL - user likely hasn't signed in, or has reloaded the page");
    }
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
        global.userPlaylist = response.data;
        //console.log(global.userPlayList);
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
        global.userPlaylistTracks = response.data;
        //console.log(global.userPlaylistTracks);
        UpdateTracks();
    })
    .catch(function (error) {
        console.log(error);
    });
}

function GetAudioFeatures() //get the audio features for the contents of userPlaylistTracks
{
    let _trackIdsString = "";
    for (let i = 0; i < global.userPlaylistTracks.items.length; i++)
    {
        _trackIdsString += global.userPlaylistTracks.items[i].track.id  + ",";
    }
    axios({
        method: "get",
        url: "https://api.spotify.com/v1/audio-features",
        headers: {
            "Authorization": "Bearer " + userData.accessToken
        },
        params: {
            "ids": _trackIdsString //https://developer.spotify.com/documentation/web-api/reference/tracks/get-several-audio-features/
        }
    })
    .then(function (response) {
        //console.log(response);
        //console.log(response.data);
        global.userPlaylistTracksAnalysis = response.data;
        console.log(global.userPlaylistTracksAnalysis);
    })
    .catch(function (error) {
        console.log(error);
    });
}