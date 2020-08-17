function searchingSong(){
    const searchingTextArea = document.getElementById('song-search').value;
    console.log(searchingTextArea);
    fetch(`https://api.lyrics.ovh/suggest/${searchingTextArea}`)
    .then(response=>response.json())
    .then( x => displayTitle(x.data));
}

function displayTitle(title){
    console.log(title);
    const songTitle = title.map(song=>song.title);
    const songArtist = title.map(songs=>songs.artist.name);

    let assignResult=document.getElementById('showing-result');

    for (let i = 0; i < 10; i++) {
        const title = songTitle[i];
        const artistTitle = songArtist[i];
        const Items = document.createElement('div');
        Items.innerHTML=`<div class="single-result row align-items-center my-3 p-3">
                            <div class="col-md-9">
                                <h3 class="lyrics-name" id="title">${title}</h3>
                                <p class="author lead">Album by <span id="artist">${artistTitle}</span></p>
                            </div>
                            <div class="col-md-3 text-md-right text-center">
                                <button class="btn btn-success" onclick="displayLyrics('${title}','${artistTitle}')">Get Lyrics</button>
                            </div>
                        </div>`;
        assignResult.appendChild(Items);
    }
}

function displayLyrics(titleOfSong,titleOfArtist)
{
        fetch(`https://api.lyrics.ovh/v1/${titleOfArtist}/${titleOfSong}`)
        .then(response=>response.json())
        .then(data=>{const addLyrics = document.getElementById('lyrics');
        if(data.lyrics != undefined){ 
        addLyrics.innerHTML=data.lyrics;}
        else{addLyrics.innerHTML='Lyrics Not Found :('}//if lyrics not found 

});
    document.getElementById('song-title').innerText=titleOfSong;
}