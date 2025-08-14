function songContent(){
    let songName=localStorage.getItem('songNameLocal');
    let song =document.getElementById('song-details');
    document.title=songName;
    for (let i = 0; i < songsData.length; i++){
        if (songsData[i].title===songName){
            let genreContent='';
            for(let j=0;j<songsData[i].genreArray.length;j++){
                genreContent+=`<button class="music-card-button">${songsData[i].genreArray[j]}</button>`;
            }
            let songDetails = `
                <img src='../icons/Album icons/${songsData[i].title}.webp'>
                <div class="details">
                    <p class="title">${songsData[i].title}</p>
                    <p class="artist">${songsData[i].artist}</p>
                    <div class="genre">
                        ${genreContent}
                    </div>
                    <p class="prize">${songsData[i].price}</p>
                    <p class="description">${songsData[i].description}</p>
                    <div class="buttons">
                        <button>Buy</button>
                        <button onclick="addToCart(event,'${songsData[i].title}')">Add to Cart</button>
                    </div>
                </div>
             `
            song.innerHTML =songDetails;
        }
    }
}
//let songsData = JSON.parse(localStorage.getItem('songsDataLocal'));
window.onload = songContent();


