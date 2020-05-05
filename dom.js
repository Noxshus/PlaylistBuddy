function UpdatePlaylists()
{
  Update("playlists", ""); //clear the previous contents
  for (let i = 0; i < global.userPlaylist.items.length; i++)
  {    
    let _node = document.createElement("LI");
    _node.setAttribute("id", "playlist" + i);
    let _textNode = document.createTextNode(global.userPlaylist.items[i].name);
    _node.appendChild(_textNode);
    document.getElementById("playlists").appendChild(_node);

    
  }

  for (let i = 0; i < global.userPlaylist.items.length; i++)
  {
    BuildButton("playlistbutton" + i, "GetTracksFromPlaylist('" + global.userPlaylist.items[i].id + "')", "Get Tracks", "playlist" + i);
  }
}

function UpdateTracks()
{
  Update("tracks", ""); //clear the previous contents
  for (let i = 0; i < global.userPlaylistTracks.items.length; i++)
  {
    let _node = document.createElement("LI");
    _node.setAttribute("id", "track" + i);
    let _textNode = document.createTextNode(global.userPlaylistTracks.items[i].track.name);
    _node.appendChild(_textNode);
    document.getElementById("tracks").appendChild(_node);
  }
}

function UpdateUserTrackDisplay() //displays whatever is in the userTrackDisplay object
{
    Update("usertrack", ""); //clear the previous contents
    for (let i = 0; i < global.userTrackDisplay.tracks.length; i++)
    {
        let _node = document.createElement("LI");
        _node.setAttribute("id", "usertrack" + i);
        let _textNode = document.createTextNode(global.userTrackDisplay.tracks[i].name);
        _node.appendChild(_textNode);
        document.getElementById("usertrack").appendChild(_node);
    }
}

function Update(_id, _content) 
{
  document.getElementById(_id).innerHTML = _content;
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
