function clearCart(){
    localStorage.clear();
    alert("Cart has been cleared!");
    window.location.reload();
}

function deleteItem(id) {
    let Items = JSON.parse(localStorage.getItem("cartItems")) || [];
    let updatedItems = Items.filter(item => item.id !== id);
    localStorage.setItem('cartItems', JSON.stringify(updatedItems));
    let cartCount = updatedItems.length;  
    localStorage.setItem('cartCount', cartCount);
    loadCartCount()
    countTotalItems()
    countSubTotal()
    initialTotalFee()
    // Items = updatedItems;
    // countSubTotal()
    // countTotalItems()
    renderCartItems();
    // loadCartCount();
    // calculateTotalFee();
    
}

function renderCartItems(){
    let Items = JSON.parse(localStorage.getItem("cartItems")) || [];
    const itemslist = document.getElementById("Items-list");
    const template = document.getElementById("product-template");
    itemslist.innerHTML = ''; 

    if (Items.length === 0) {
        document.getElementById("Items-list").style.display = "block";
        const emptyMessage = document.createElement('div');
        emptyMessage.className = "text-gray-500 flex flex-col items-center justify-center py-8 shadow h-64 bg-white rounded-lg"; 
        emptyMessage.innerHTML = `
        <div class='block'><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-16 mb-4">
            <path stroke-linecap="round" stroke-linejoin="round"
                d="M9 3.75H6.912a2.25 2.25 0 0 0-2.15 1.588L2.35 13.177a2.25 2.25 0 0 0-.1.661V18a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18v-4.162c0-.224-.034-.447-.1-.661L19.24 5.338a2.25 2.25 0 0 0-2.15-1.588H15M2.25 13.5h3.86a2.25 2.25 0 0 1 2.012 1.244l.256.512a2.25 2.25 0 0 0 2.013 1.244h3.218a2.25 2.25 0 0 0 2.013-1.244l.256-.512a2.25 2.25 0 0 1 2.013-1.244h3.859M12 3v8.25m0 0-3-3m3 3 3-3" />
        </svg></div>
        <div class="text-lg mt-2">Oops! Your cart is empty. Let's fill it up!</div>
    `;
        itemslist.appendChild(emptyMessage);

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

// let subTotal=0

function countSubTotal(){
    let Items = JSON.parse(localStorage.getItem("cartItems")) || [];
    let subTotal=0
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
    return subTotal;

}

function initialTotalFee(){
    const selectedRadio = document.querySelector('input[name="delivery"]:checked'); 
    const deliveryDisplay = document.getElementById("delivery-fee");
    const totalPrice = document.getElementById("totalPrice");
    const initialDeliveryFee = selectedRadio ? parseInt(selectedRadio.value) : 0; 
    deliveryDisplay.textContent = `$${initialDeliveryFee}`; 
    const subTotal=countSubTotal();
    totalPrice.textContent = `$${subTotal + initialDeliveryFee}`;
}

function calculateTotalFee(){
    const deliveryRadios = document.querySelectorAll('input[name="delivery"]');
    const deliveryDisplay = document.getElementById("delivery-fee");
    const totalPrice = document.getElementById("totalPrice");
    
    deliveryRadios.forEach(radio => {
        radio.addEventListener('change', () => {
            const subTotal=countSubTotal();
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

