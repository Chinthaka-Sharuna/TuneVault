function cartUpdate(){
    let cartItem = document.getElementById('shoppingCart');
    let cartItemCard='';
    let total=0;
    let discountPrice=0;
    cartItem.innerHTML='';
    for (let i = 0; i < cartItems.length; i++) {
        for (let j = 0; j < songsData.length; j++){
            if(cartItems[i]==songsData[j].title){
                total+=parseInt(songsData[j].price.slice(4))
                console.log(total);
                document.getElementById('totalPrice').innerHTML='LKR.'+total+'.00';
                document.getElementById('discountPrice').innerHTML='LKR.'+discountPrice+'.00';
                document.getElementById('subTotal').innerHTML='LKR.'+(total-discountPrice)+'.00';

                cartItemCard=`
                <div class="cart-item" id="cart-item">
                    <div class="thumnail">
                        <img src="../icons/Album icons/${songsData[j].title}.webp" alt="thumnail">
                    </div>
                    <div class="detalis">
                        <p class="title">${songsData[j].title}</p>
                        <p class="artist">${songsData[j].artist}</p>
                        <p class="prize">${songsData[j].price}</p>
                        <button class="remove-button" onclick="deleteItemfromCart(event,'${songsData[j].title}');cartUpdate();">
                            <img src='../icons/remove-button.png' alt="delete">
                            <p>Remove</p>
                        </button>
                    </div>
                </div>
                `
                cartItem.innerHTML += cartItemCard;
            }

        }
    }
}

window.onload=cartUpdate();

