document.addEventListener('DOMContentLoaded', () => {
    const storedCount = localStorage.getItem('cartCount');
    if (storedCount && parseInt(storedCount) > 0) {
        cartCount = parseInt(storedCount); 
        document.getElementById("cart-count").textContent = cartCount;
        document.getElementById("cart-count").classList.remove("hidden");
        document.querySelector(".totalItems").innerText = cartCount;

    }
    
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
        
        let subTotal=0

        Items.forEach(item => {

            const card = template.cloneNode(true);
            card.classList.remove("hidden"); 
            card.removeAttribute("id"); 

            card.querySelector(".productName").innerText = item.name;
            card.querySelector(".productDescription").innerText = item.description;
            card.querySelector(".discountPrice").innerText = "$" + item.discountPrice;
            card.querySelector(".originPrice").innerText = "$" + item.originPrice;
            subTotal=subTotal+item.discountPrice
            document.querySelector(".subTotal").innerText = "$"+ subTotal;

            itemslist.appendChild(card);
        });

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
        const selectedRadio = document.querySelector('input[name="delivery"]:checked'); 
        const initialDeliveryFee = selectedRadio ? parseInt(selectedRadio.value) : 0; 
        deliveryDisplay.textContent = `$${initialDeliveryFee}`; 
        totalPrice.textContent = `$${subTotal + initialDeliveryFee}`;
    }
});

function clearCart(){
    localStorage.clear();
    alert("Cart has been cleared!");
    window.location.reload();
}