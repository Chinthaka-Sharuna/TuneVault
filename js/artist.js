function artistContent(){
    let name=localStorage.getItem('artistNameLocal');
    document.title=name;
    queue=[];
    let artist =document.getElementById('artist-details');
    console.log(artistsData);
    for(let i=0;i<artistsData.length;i++){
        if(name==artistsData[i].name){
            console.log("found");
            let artistDetails = `
                <img src='../icons/Artists/${artistsData[i].name}.webp'>
                <div class="details">
                    <p class="title">${artistsData[i].name}</p>
                    <p class="artist">${artistsData[i].nationality}</p>
                    <p class="description">${artistsData[i].bio}</p>
                </div>
             `
             artist.innerHTML=artistDetails;
            
        }
    }
    for (let i=0;i<songsData.length;i++){
        let temp=(songsData[i].artist.replace(' ft. ',',')).split(',');
            for(let j=0;j<temp.length;j++){
                if(name==temp[j]){
                    queue.push(songsData[i]);
                    break;
                }
            }
    }
    console.log(queue);
    updateContent(queue)
    
}

let artistsData = JSON.parse(localStorage.getItem('artistsDataLocal'));


