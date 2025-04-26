function clearCart(){
    localStorage.clear();
    alert("Cart has been cleared!");
    window.location.reload();
}

// function deleteItem(id) {
//     let updatedItems = Items.filter(item => item.id !== id);
//     localStorage.setItem('cartItems', JSON.stringify(updatedItems));

//     Items = updatedItems;
//     renderProducts();
// }

function renderCartItems(){
    let Items = JSON.parse(localStorage.getItem("cartItems")) || [];
    const itemslist = document.getElementById("Items-list");
    const template = document.getElementById("product-template");
    itemslist.innerHTML = ''; 

    if (Items.length === 0) {
        document.getElementById("Items-list").style.display = "none";
    } else {
        document.getElementById("Items-list").style.display = "block";

        const list = document.getElementById("Items-list");
        list.style.display = "flex"; 
        
        let cartMap = {};
        Items.forEach(item => {
            if (cartMap[item.id]) {
              cartMap[item.id].quantity += 1;
            } else {
              cartMap[item.id] = { ...item, quantity: 1 };
            }
        });

        Object.values(cartMap).forEach(item => {

            const card = template.cloneNode(true);
            card.classList.remove("hidden"); 
            card.removeAttribute("id"); 

            card.querySelector('.productImage').src = item.imageUrl;
            card.querySelector(".productName").innerText = item.name;
            card.querySelector(".productDescription").innerText = item.description;
            card.querySelector(".discountPrice").innerText = "$" + item.discountPrice;
            card.querySelector(".originPrice").innerText = "$" + item.originPrice;
            card.querySelector(".quantity").innerText ="Quantity: x" + item.quantity;

            const deleteButton = card.querySelector('.delete-btn');
            deleteButton.onclick = () => deleteItem(item.id);

            itemslist.appendChild(card);
        });

    }
}

let subTotal=0

function countSubTotal(){
    let Items = JSON.parse(localStorage.getItem("cartItems")) || [];

    let cartMap = {};
        Items.forEach(item => {
            if (cartMap[item.id]) {
              cartMap[item.id].quantity += 1;
            } else {
              cartMap[item.id] = { ...item, quantity: 1 };
            }
        });

    Object.values(cartMap).forEach(item => {
        subTotal += item.discountPrice * item.quantity;
    });

    document.querySelector(".subTotal").innerText = "$"+ subTotal;

}

function initialTotalFee(){
    const selectedRadio = document.querySelector('input[name="delivery"]:checked'); 
    const deliveryDisplay = document.getElementById("delivery-fee");
    const totalPrice = document.getElementById("totalPrice");
    const initialDeliveryFee = selectedRadio ? parseInt(selectedRadio.value) : 0; 
    deliveryDisplay.textContent = `$${initialDeliveryFee}`; 
    totalPrice.textContent = `$${subTotal + initialDeliveryFee}`;
}

function calculateTotalFee(){
    const deliveryRadios = document.querySelectorAll('input[name="delivery"]');
    const deliveryDisplay = document.getElementById("delivery-fee");
    const totalPrice = document.getElementById("totalPrice");
    
    deliveryRadios.forEach(radio => {
        radio.addEventListener('change', () => {
          const deliveryFee = parseInt(radio.value);
          deliveryDisplay.textContent = `$${deliveryFee}`;
          totalPrice.textContent = `$${subTotal + deliveryFee}`;
        });
    });

}

function countTotalItems(){
    loadCartCount()
    document.querySelector(".totalItems").innerText = cartCount;
}

document.addEventListener('DOMContentLoaded', () => {
    // const storedCount = localStorage.getItem('cartCount');
    // if (storedCount && parseInt(storedCount) > 0) {
    //     cartCount = parseInt(storedCount); 
    //     document.getElementById("cart-count").textContent = cartCount;
    //     document.getElementById("cart-count").classList.remove("hidden");
    //     document.querySelector(".totalItems").innerText = cartCount;

    // }
    
    loadCartCount()
    countSubTotal()
    initialTotalFee()
    renderCartItems()
    calculateTotalFee()
    countTotalItems()
    
    }
);

