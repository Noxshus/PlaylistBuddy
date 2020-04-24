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
    app.get('/login', function(req, res) {
        let scopes = 'user-read-private user-read-email';
        res.redirect('https://accounts.spotify.com/authorize' +
          '?response_type=code' +
          '&client_id=' + my_client_id +
          (scopes ? '&scope=' + encodeURIComponent(scopes) : '') +
          '&redirect_uri=' + encodeURIComponent(redirect_uri));
        });        
}

function RedirectToSpotifyAuth()
{
    let _clientId = "30f17f826d674bb48dcb9ae95ad228c3";
    let _redirectUri = "https://noxshus.github.io/PlaylistBuddy/";
    let _scopes = "user-read-private user-read-email";
    
    window.location.href = "https://accounts.spotify.com/authorize" +
    "?client_id=" + encodeURIComponent(_clientId) +
    "&response_type=token" +
    "&redirect_uri=" + encodeURIComponent(_redirectUri) +
    "&scope=" + encodeURIComponent(_scopes);
}