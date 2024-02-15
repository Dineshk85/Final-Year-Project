//get the product list and elements
const productList = document.getElementById('productList')
const cartItemsElement = document.getElementById('cartItems')
const cartTotalElement = document.getElementById('cartTotal')

//store cartitems in local storage
let cart =JSON.parse(localStorage.getItem("cart")) || [];

//Render products on page
function renderProduct(){
    productList.innerHTML = products.map(
        (product) => `
        <div class="product">
        <img src="${product.image}" alt="" class="product-img">
        <div class="product-info">
         <h2 class="product-title">${product.title}</h2>
         <p class="product-price">${product.price.toFixed(2)}</p>
         <a href="" class="add-to-cart" data-id="${product.id}>Add to cart</a>
        </div>

     </div>
       `
    )
    .join("");
    //Add to cart
    const addToCartButtons = document.getElementsByClassName('add-to-cart');
    for(let i = 0; i < addToCartButtons.length; i++){
        const addToCartButton = addToCartButtons[i];
        addToCartButton.addEventListener("click",addToCart)
    }
}

//add to cart
function addToCart(event){
    const productID = parseInt(event.target.dataset.id);
    const product = products.find((product) =>product.id === productID);

    if (product){
        //if product already in cart
        const exixtingItem = cart.find((item) => item.id === productID);
        if (exixtingItem) {
            exixtingItem.quantity++;
        }else{
            const cartItem = {
                id: product.id,
                title: product.title,
                price: product.price,
                image: product.image,
                quantity: 1,
            };
            cart.push(cartItem);
        }
        //change add to cat text to added
        event.target.textContent = "Added";
        
        saveToLocalStorage();
        renderCartItems();
        calculateCartTotal();

        }
    }
    //remove from cart
function removeFromCart(event) {
    const productID = parseInt(event.target.dataset.id);
    cart = cart.filter((item) => item.id !== productID);
    saveToLocalStorage();
    renderCartItems();
    calculateCartTotal();
}  
//quantitty change
function changeQuantity(event){
    const productID = parseInt(event.target.dataset.id);
    const quantitty = parseInt(event.target.value);

    if (quantity > 0){
        const cartItem = cart.find((item) => item.id === productID);
        if(cartItem){
          cartItem.quantity = quantity;
        saveToLocalStorage();
        calculateCartTotal();
    }
}

//savetolocalstorage
function saveToLocalStorage(){
    localStorage.setItem('cart',JSON.stringify(cart));
}

//render products on cart page
function renderCartItems(){
    cartItemsElement.innerHtml =cart
    .map(
        (item) =>`
        <div id="cartItems">
        <img src="${item.image}" alt="${item.title}">
        <div class="cart-item-info">
          <h2 class="cart-item-title">${item.title}</h2>
          <input
           class="cart-item-quantity"
           type="number"
           name=""
           min="1"
           value="${item.quantity}"
           data-id="${item.id}"
          /> 
        </div>
        <h2 class="cart-item-price">${item.price}</h2>
        <button class="remove-from-cart" data-id="${item.id}">Remove</button>
      </div>
        `
    )
    .join("");
    //remove from cart
    const removeButtons = document.getElementsByClassName('remove-from-cart');
    for(let i = 0; i < removeButtons.length; i++){
        const removeButton = removeButtons[i];
        removeButton.addEventListener("click",removeFromCart)
    }
    //quantity change
    const quantityInputs = document.querySelectorAll(`.cart-item-quantity`)
    quantityInputs.forEach((input => {
        input.addEventListener(`change`,changeQuantity);
    });

}

//calculate total
function calculateCartTotal(){
    const total = cart.reduce((sum,item) => sum + item.price * item.quantity, 0);
    cartTotalElement.textContent = `Total:$${total.toFixed(2)}`;
    }
}
//check if on cart page
if(window.location.pathname.includes("cart.html")){
    renderCartItems();
    calculateCartTotal();
}else{
    renderProducts();
}
//cart icon quantity
const cartIcon = document.getElementsById(`cart-icon`)
function updateCartIcon(){
    const totalQuantity = cart.reduce((sum,item) => sum + item.quantity,0);
    const cartIcon = document.getElementById(`cart-icon`);
    cartIcon.setAttribute("data-quantity",totalQuantity);

}
update
renderProducts();
renderCartItems();
calculateCartTotal();