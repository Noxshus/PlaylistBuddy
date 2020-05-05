window.onload = function() {
    Load(); //load user data, if it exists

    if (CheckIfUrlHasChanged() == true)
    {
        console.log("URL has changed. User is visiting the page again, or has been redirected by authorisation.");
        userData.url = window.location.href; //set the saved url to the new one
        GetAuthorisationParameters(); //attempt to get auth parameters in the url, if there are any & if current ones have expired. Will save the URL change as part-of it.
    }

    //console.log(userData.url);
}

function Save() 
{
    localStorage.setItem("playlistbuddy", JSON.stringify(userData));
}

function Load() 
{
    let _checkSave = JSON.parse(localStorage.getItem("playlistbuddy"));
    if (_checkSave != null) {
        userData = _checkSave;
    }
}

function SetTokenExpiry() //set the token expiry time to one hour from now
{
    userData.tokenExpiryTime = new Date();
    userData.tokenExpiryTime.setHours(userData.tokenExpiryTime.getHours() + 1);
}

function CheckIfTokenHasExpired() //access tokens only have a lifetime of 60 mins. After that point, user must re-auth and get a new one
{
    _timeNow = new Date();
    console.log("Token Created on: " + _timeNow + " Expires: " + userData.tokenExpiryTime);
    if (_timeNow.getTime() > new Date(userData.tokenExpiryTime).getTime()) //converted again to date objects because, for some reason, tokenExpiryTime becomes a string at runtime
    {
        return true; //has expired
    }
    else
    {
        return false; //hasn't expired
    }
}

function CheckIfUrlHasChanged() //simply returns true if the saved variable for the url is different from the current url
{
    if (userData.url != window.location.href)
    {
        return true; //url has changed
    }
    else
    {
        return false;
    }
}