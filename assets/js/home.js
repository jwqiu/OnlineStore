let product={
    name:'orange',
    description:'100% pure orange juice, no added sugar',
    discountPrice:30,
    originPrice:20
}

let cartCount=0;

document.addEventListener('DOMContentLoaded', () => {
    const storedCount = localStorage.getItem('cartCount');
    if (storedCount && parseInt(storedCount) > 0) {
        cartCount = parseInt(storedCount); 
        document.getElementById("cart-count").textContent = cartCount;
        document.getElementById("cart-count").classList.remove("hidden");
    }

    document.getElementById("productName").innerText = product.name;
    document.getElementById("productDescription").innerText = product.description;
    document.getElementById("discountPrice").innerText = "$" + product.discountPrice;
    document.getElementById("originPrice").innerText = "$" + product.originPrice;

});

function addToCart(){
    cartCount=cartCount+1;
    document.getElementById("cart-count").textContent = cartCount;
    document.getElementById("cart-count").classList.remove("hidden");
    localStorage.setItem('cartCount', cartCount);
    let currentCart = JSON.parse(localStorage.getItem("cart-list")) || [];
    currentCart.push(product); 
    localStorage.setItem("cart-list", JSON.stringify(currentCart));

    let cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
    cartItems.push(product);
    localStorage.setItem("cartItems", JSON.stringify(cartItems));    
    alert("Successfully added to your cart");

}

function search() {
    const keyword = document.getElementById("searchInput").value.toLowerCase();
    const cards = document.querySelectorAll(".product-card");
    const resultDisplay = document.getElementById("search-result");

    let matchCount = 0;

    cards.forEach(card => {
        const title = card.querySelector("h5").textContent.toLowerCase();
        const description = card.querySelector("p").textContent.toLowerCase();                    
        const match = title.includes(keyword) || description.includes(keyword);
        card.style.display = match ? "block" : "none";

        if (match){matchCount=matchCount+1}

    });

    if (keyword === "") {
        resultDisplay.textContent = "";
    } 
    else if (matchCount > 0) {
        resultDisplay.innerHTML = `Found <span class="text-blue-600 font-bold">${matchCount} result${matchCount > 1 ? "s" : ""}</span>`;
    } 
    else {
        resultDisplay.textContent = "No results found";
    }

}


