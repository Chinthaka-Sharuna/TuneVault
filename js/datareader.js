// scripts.js
function reader(name) {
    fetch('/xml/'+name+'.xml') // Adjust path to your XML file
        .then(response => response.text())
        .then(data => {
            // Parse XML string to DOM
            const parser = new DOMParser();
            const xmlDoc = parser.parseFromString(data, 'application/xml');
            
            if (name=='songs') {
                console.log(xmlDoc);
                const songs = xmlDoc.getElementsByTagName('song');
                //console.log(songs);
                songsData =[];

            // Loop through each song and create HTML
                for (let i = 0; i < songs.length; i++) {
                    let song = songs[i];
                    let title = song.getElementsByTagName('title')[0].textContent;
                    let artist = song.getElementsByTagName('artist')[0].textContent;
                    let genreArray = (song.getElementsByTagName('genre')[0].textContent).split(',');
                    let price = song.getElementsByTagName('price')[0].textContent;
                    let description = song.getElementsByTagName('description')[0].textContent;
                    let tagsArray = (song.getElementsByTagName('tags')[0].textContent).split(' ');
                    songsData.push({ title, artist, genreArray, price, description, tagsArray });
                }
                localStorage.setItem('songsDataLocal',JSON.stringify(songsData));
                let webTitle=document.title;
                if(webTitle=='TuneVault - Categories'){
                    getSelectedValue();
                }else{
                    updateContent(songsData);
                }
            }else if(name='artists'){
                const artists = xmlDoc.getElementsByTagName('artist');
                const artistList = document.getElementById('music-cards');
                artistsData=[];
            
            // Clear existing content
            artistList.innerHTML = '';

            // Loop through each song and create HTML
            for (let i = 0; i < artists.length; i++) {
                let artist = artists[i];
                let name = artist.getElementsByTagName('name')[0].textContent;
                let bio = artist.getElementsByTagName('bio')[0].textContent;
                let genre = artist.getElementsByTagName('genre')[0].textContent;
                let nationality = artist.getElementsByTagName('nationality')[0].textContent;
                artistsData.push({name,bio,genre,nationality})

                // Create song card HTML
                let artistCard = `
                    <div class="music-card" onclick="artistNameSaver('${name}')">
                        <img src="/icons/Artists/${name}.webp" alt="artist-profile">
                        <p class='music-card-title'>${name}</p>
                    </div>
                `;
                artistList.innerHTML += artistCard;
            }
            console.log(artistsData);
            localStorage.setItem('artistsDataLocal',JSON.stringify(artistsData));
            } 
        })
        .catch(error => console.error('Error loading XML:', error));
}
function songNameSaver(songName){
    localStorage.setItem('songNameLocal', songName);
    //console.log(songName);
    window.location.href='song.html';
}

function artistNameSaver(artistName){
    //console.log(artistName);
    localStorage.setItem('artistNameLocal', artistName);
    window.location.href='artist.html';
}

function updateContent(songDataTemp){
    console.log('updateContent');
    const songList=document.getElementById('music-cards');
    songList.innerHTML='';
    let songCards ='';
    for (let i = 0; i < songDataTemp.length; i++){
        let song = songDataTemp[i];
        let genreContent='';
        let tagsContent='';
        for(let j=0;j<song.genreArray.length;j++){
            genreContent+=`<button class="music-card-button">${song.genreArray[j]}</button>`;
        }
        for(let j=0;j<song.tagsArray.length;j++){
            tagsContent+=`<button class="music-card-button">${song.tagsArray[j]}</button>`;
        }
        let songCard = `
            <div class="music-card" onclick="songNameSaver('${song.title}')">
                <img src="/icons/Album icons/${song.title}.webp" alt="thumnail">
                <div class="play-button-continor">
                    <button class="play-button" onclick="playPause(event,'${song.title}');">
                        <img src="/icons/play.png" class="play-icon"  id="${song.title}PlayIconImage" alt="play">
                    </button>
                </div>
                <div class="music-card-details">
                    <p class="music-card-title">${song.title}</p>
                    <p class='artist'>${song.artist}</p>
                    <div class="genres">
                    ${genreContent}
                    </div>
                    <p class="note">${song.description}</p>
                    <div class="prizing">
                        <p class="prize">${song.price}</p>
                        <button class="add-to-cart-button" onclick="addToCart(event,'${song.title}');">
                            <img src="/icons/shopping-cart.svg" alt="shopping cart"></img>
                                Add to Cart
                        </button>
                    </div>
                    <div class="keywords">
                        ${tagsContent}
                    </div>
                </div>
            </div>
        `;
        //console.log(songCard);
        songCards=songCards+songCard;
    }
    songList.innerHTML=songCards;
}