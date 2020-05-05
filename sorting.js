function OfferDanceability(_amount)
{
    let _tracksAboveThreshold = ReturnTracksAboveThreshold("danceability", 0.8);
    let _tracksToDisplay = [];
    let _trackIdsString = ""; //comma delimited string with the song Ids

    if (_tracksAboveThreshold.length > 0)
    {
        _tracksToDisplay = ReturnNRandomIntegers(0, _tracksAboveThreshold.length, 3); //returned N unique ints - these will be used as element identifiers

        for (let i = 0; i < _tracksToDisplay.length; i++)
        {
            _trackIdsString += _tracksAboveThreshold[_tracksToDisplay[i]] + ",";
        }

        GetTracks(_trackIdsString);
    }
    else
    {
        console.log("Too few tracks meet the danceability criteria.");
    }
}

function ReturnTracksAboveThreshold(_criteria, _threshold) //given a specific attribute of the track object, and a threshold, return the ids of the tracks above that threshold
{
    let _tracksAboveThreshold = [];
    for (let i = 0; i < global.userPlaylistTracksAnalysis.audio_features.length; i++)
    {
        if (global.userPlaylistTracksAnalysis.audio_features[i][_criteria] > _threshold)
        {
            _tracksAboveThreshold.push(global.userPlaylistTracksAnalysis.audio_features[i].id);
        }
    }

    if (_tracksAboveThreshold.length < 5) //if found very few tracks, loosen the threshold by -0.1 point
    {
        console.log("Warning: Only " + _tracksAboveThreshold.length + " tracks with " + _criteria + " above " + _threshold + ". Loosening by -0.1 point.");
        _threshold -= 0.1;
        _tracksAboveThreshold.length = 0; //empty the array to avoid duplicates
        for (let i = 0; i < global.userPlaylistTracksAnalysis.audio_features.length; i++)
        {
            if (global.userPlaylistTracksAnalysis.audio_features[i][_criteria] > _threshold)
            {
                _tracksAboveThreshold.push(global.userPlaylistTracksAnalysis.audio_features[i].id);
            }
        }
    }

    if (_tracksAboveThreshold.length < 5) //if still found very few tracks, return whatever we found
    {
        console.log("Warning: Only " + _tracksAboveThreshold.length + " tracks with " + _criteria + " above " + _threshold + ". Threshold was already loosened; Returning...");
    }

    return _tracksAboveThreshold;
}