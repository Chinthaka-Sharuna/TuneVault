function playPause(event,name) {
    event.stopPropagation();
    if (!songName){
        song.src = `../songs/${name}.mp3`;
        song.load();
        song.play();
        document.getElementById(`${name}PlayIconImage`).src = "../icons/pause.png";
        setAutoPause(song, `${name}PlayIconImage`);
    }else if (songName === name) {
        if (song.paused) {
            song.play();
            setAutoPause(song, `${name}PlayIconImage`);
        }else {
            song.pause();
            document.getElementById(`${songName}PlayIconImage`).src = "../icons/play.png";
    }
    }else{
        song.src = `../songs/${name}.mp3`;
        song.load();
        song.play();
        document.getElementById(`${songName}PlayIconImage`).src = "../icons/play.png";
        document.getElementById(`${name}PlayIconImage`).src = "../icons/pause.png";
        setAutoPause(song, `${name}PlayIconImage`);
    }
    songName = name;
}

function setAutoPause(songElement, iconId) {
    // Clear any existing pause timer
    if (pauseTimer) {
        clearTimeout(pauseTimer);
    }

    // Set a new 15-second timer
    pauseTimer = setTimeout(() => {
        songElement.pause();
        document.getElementById(iconId).src = "../icons/play.png";
        console.log("Song auto-paused after 15 seconds.");
    }, 20000);
}

function cartCountUpdate() {
    let cartCount =document.getElementById("item-count");
    cartCount.innerText = cartItems.length;
}

function addToCart(event,itemName){
    event.stopPropagation();
    for (let i=0;i<cartItems.length;i++){
        if(cartItems[i]==itemName){
            return 1;
        }
    }
    cartItems.push(itemName);
    localStorage.setItem('cartItemsLocal',JSON.stringify(cartItems));
    cartCountUpdate();
    makeShortChart();
}

function deleteItemfromCart(event,name){
    event.stopPropagation();
    for (let i = 0; i < cartItems.length; i++) {
        //console.log(i);
        if (cartItems[i]==name){
            cartItems.splice(i,1);
            //console.log(name);
        }
    }
    localStorage.setItem('cartItemsLocal',JSON.stringify(cartItems));
    makeShortChart();
}
function makeShortChart(){
    let webTitle=document.title;
    if(webTitle=='TuneVault - Shopping Cart'){
        //console.log(webTitle);
        return;
    }
    let ShortMenu=document.getElementById('cartItemShortMenu');
    let ShortMenuContent='';
    ShortMenu.innerHTML='';
    for (let i = 0; i < cartItems.length; i++) {
        ShortMenuContent=`
        <div class="cart-item-short-menu-item">
            <img src="../icons/Album icons/${cartItems[i]}.webp" class="cart-item-short-menu-item-thumnail" alt="song-image">
            <p>${cartItems[i]}</p>
            <button class="cart-item-short-menu-item-remove" onclick="deleteItemfromCart(event,'${cartItems[i]}');">
                <img src="../icons/remove.png" alt="delete">
            </button>
        </div>
        `
        ShortMenu.innerHTML += ShortMenuContent;
    }
    cartCountUpdate();
}
function getSelectedValue(){
    queue=[];
    tempQueue=[];
    let genre = document.getElementById("genre").value;
    let allArtists = document.getElementById("allArtists").value;
    let sortBy = document.getElementById("sortBy").value;
    if(genre!='all genres'){
        for (let i = 0; i < songsData.length; i++) {
            for (let j = 0; j < songsData[i].genreArray.length; j++){
                console.log(songsData[i].genreArray[j]);
                if(genre==songsData[i].genreArray[j]){
                    queue.push(songsData[i]);
                }
            }
        }
    }else{
        queue=songsData;
    }
    tempQueue=queue;
    if(allArtists!='all artists'){
         queue=[];
        for (let i = 0; i < tempQueue.length; i++) {
            let temp=(tempQueue[i].artist.replace(' ft. ',',')).split(',');
            for(let j=0;j<temp.length;j++){
                console.log(j+' '+temp[j]);
                if(allArtists==temp[j]){
                    queue.push(tempQueue[i]);
                    //console.log(queue);
                    break;
                }
            }
        }
    }
    if(sortBy=='price-high-low'){
        queue.sort((a, b) => {
        const priceA = parseFloat(a.price.replace('LKR.', ''));
        const priceB = parseFloat(b.price.replace('LKR.', ''));
        return priceA - priceB;})
    }else if(sortBy=='title-a-z'){
        queue.sort((a, b) => a.title.localeCompare(b.title));
    }else if(sortBy=='title-z-a'){
        queue.sort((a, b) => b.title.localeCompare(a.title));
    }else{
        queue.sort((a, b) => {
        const priceA = parseFloat(a.price.replace('LKR.', ''));
        const priceB = parseFloat(b.price.replace('LKR.', ''));
        return priceB - priceA;})
    }
    updateContent(queue);
}

let song=new Audio();
let songName = '';
let pauseTimer = null;
let cartItems = JSON.parse(localStorage.getItem('cartItemsLocal')) || [];
cartCountUpdate();
makeShortChart()


let songsData = JSON.parse(localStorage.getItem('songsDataLocal'));


let suggestions = songsData.map(item => item.title); //create a array with object's names
let searchInput = document.getElementById('search');
let suggestionsList = document.getElementById('suggestions');
console.log(suggestions);

searchInput.addEventListener('input', () => {
    let query = searchInput.value.toLowerCase();
    suggestionsList.innerHTML='';
    //console.log(query);
    if(query==''){
        return;
    }
    console.log(songsData.length);
    let filtered = suggestions.filter(item => item.toLowerCase().includes(query));
    console.log(filtered);
    filtered.forEach(name=>{
        let li=document.createElement('li');
        li.textContent=name;
        li.addEventListener('click', () => {
        searchInput.value = name;
        console.log(name);
        songNameSaver(name);
        suggestionsList.innerHTML = '';
        });
        suggestionsList.appendChild(li);
    })
});

document.addEventListener('click', (e) => {
  if (!searchInput.contains(e.target) && !suggestionsList.contains(e.target)) {
    suggestionsList.innerHTML = '';
  }
});


