
let cartCount=0;

function addToCart(){
    cartCount=cartCount+1;
    document.getElementById("cart-count").textContent = cartCount;
    document.getElementById("cart-count").classList.remove("hidden");

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
