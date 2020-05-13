function UpdateClearCards() //clears all the contents of the cards, to be replaced by something else
{
    for (let i = 0; i < 6; i++) //6 is the number of cards that can be on screen at once (0 - 5)
    {
        console.log(i);
        let _card = document.getElementById(i + "card");
        _card.onclick = ""; //remove any onclick functions
        if (_card.classList.contains("clickable") == true)
        {
            _card.classList.remove("clickable"); //clickable is custom css - makes the mousepointer show up
        }

        let _cardImg = document.getElementById("card" + i + "img");
        _cardImg.src = ""; //clear the img
        _cardImg.alt = ""; //clear the alt text

        document.getElementById("card" + i + "title").innerHTML = ""; //clear the card title
        document.getElementById("card" + i + "text").innerHTML = ""; //clear the card text
    }
}

function UpdateMainMenu() //displays main menu options
{
    UpdateClearCards(); //clears the previous content in preparation to display new content

    UpdateCard("1", "GetPlaylists()", "Party Mode", "Recommend & play songs from playlists according to given criteria.");
}

function UpdateCard(_cardNumber, _link, _title, _text) 
{ //scalable function for update card contents
    if (_link != "") //if there's going to be an onclick function, then...
    {
        let _card = document.getElementById(_cardNumber + "card");
        _card.onclick = _link;
        _card.classList.add("clickable");
    }

    if (_title != "")
    {
        document.getElementById("card" + _cardNumber + "title").innerHTML = _title;
    }

    if (_text != "")
    {
        document.getElementById("card" + _cardNumber + "text").innerHTML = _text;
    }
}


//Test update functions - will not be used going forward

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
