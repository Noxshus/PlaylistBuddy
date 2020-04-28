window.onload = function() {
    Load(); //load user data, if it exists
}

function Save() 
{
    localStorage.setItem("playlistbuddy", JSON.stringify(userData));
}

function Load() 
{
    let _checkSave = JSON.parse(localStorage.getItem("playlistbuddy"));
    if (_checkSave !== null) {
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
    if (_timeNow > userData.tokenExpiryTime)
    {
        console.log("Curr: " + _timeNow + " Expiry: " + userData.tokenExpiryTime)
        return true; //has expired
    }
    else 
    {
        console.log("Curr: " + _timeNow + " Expiry: " + userData.tokenExpiryTime)
        return false; //hasn't expired
    }
}