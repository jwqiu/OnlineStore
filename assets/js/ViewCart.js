document.addEventListener('DOMContentLoaded', () => {
    const storedCount = localStorage.getItem('cartCount');
    if (storedCount && parseInt(storedCount) > 0) {
        cartCount = parseInt(storedCount); 
        document.getElementById("cart-count").textContent = cartCount;
        document.getElementById("cart-count").classList.remove("hidden");
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

        Items.forEach(item => {

            const card = template.cloneNode(true);
            card.classList.remove("hidden"); 
            card.removeAttribute("id"); 

            card.querySelector(".productName").innerText = item.name;
            card.querySelector(".productDescription").innerText = item.description;
            card.querySelector(".discountPrice").innerText = "$" + item.discountPrice;
            card.querySelector(".originPrice").innerText = "$" + item.originPrice;

            itemslist.appendChild(card);
        });
    }


});

function clearCart(){
    localStorage.clear();
    alert("Cart has been cleared!");
    window.location.reload();
}