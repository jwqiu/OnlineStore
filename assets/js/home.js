let products = [
    {
      id: 1,
      name: 'Orange Juice',
      description: '100% pure orange juice, no added sugar',
      discountPrice: 10,
      originPrice: 20,
      imageUrl: '/assets/images/1655187299_5e7330f63c595a614199.avif'
    },
    {
      id: 2,
      name: 'Ceramic Dinner Plate',
      description: 'Classic white 10-inch ceramic plate, microwave and dishwasher safe.',
      discountPrice: 20,
      originPrice: 25,
      imageUrl: '/assets/images/18641_Image1.jpg.webp'
    },
    {
      id: 3,
      name: 'Pacific Queen Apple',
      description: 'Crisp, sweet, and juicy New Zealand red apple — perfect for a healthy snack.',
      discountPrice: 5,
      originPrice: 20,
      imageUrl: '/assets/images/a_pacificqueen.png'
    },
    {
      id: 4,
      name: 'iPhone 15 Pro',
      description: '256GB, A17 Pro chip, titanium body — stunning design and top-tier performance.',
      discountPrice: 100,
      originPrice: 200,
      imageUrl: '/assets/images/images-2.jpeg'
    }
  ];
  
let cartCount = 0;

function renderProducts() {
    const container = document.getElementById('product-list');
    const template = document.getElementById('product-template');

    container.innerHTML = '';

    products.forEach(product => {
        const card = template.cloneNode(true); 
        card.classList.remove('hidden');
        card.removeAttribute('id');
    
        card.querySelector('.productImage').src = product.imageUrl;
        // card.querySelector('.product-image').alt = product.name;
        card.querySelector('.productName').textContent = product.name;
        card.querySelector('.productDescription').textContent = product.description;
        card.querySelector('.discountPrice').textContent = `$${product.discountPrice}`;
        card.querySelector('.originPrice').textContent = `$${product.originPrice}`;
    
        const button = card.querySelector('.add-btn');
        button.onclick = () => addToCart(product.id);
    
        container.appendChild(card);
      });

}

function addToCart(id){
    // document.getElementById("cart-count").textContent = cartCount;
    // document.getElementById("cart-count").classList.remove("hidden");
    incrementCartCount()

    const product = products.find(product => product.id === id);
    let cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
    cartItems.push(product);
    localStorage.setItem("cartItems", JSON.stringify(cartItems));    

    alert("Successfully added to your cart");

}

function loadCartCount(){
    const storedCount = localStorage.getItem('cartCount');
    if (storedCount && parseInt(storedCount) > 0) {
        cartCount = parseInt(storedCount); 
        document.getElementById("cart-count").textContent = cartCount;
        document.getElementById("cart-count").classList.remove("hidden");
    }
    else{
        document.getElementById("cart-count").classList.add("hidden");
    }
    cartCount = storedCount;
    return cartCount;
}

function incrementCartCount(){
    const storedCount = localStorage.getItem('cartCount');
    if (storedCount && parseInt(storedCount) > 0) {
        cartCount = parseInt(storedCount); 
        cartCount=cartCount+1;
        document.getElementById("cart-count").textContent = cartCount;
        document.getElementById("cart-count").classList.remove("hidden");
    }
    else{
        cartCount=1;
        document.getElementById("cart-count").textContent = cartCount;
        document.getElementById("cart-count").classList.remove("hidden");
    }

    localStorage.setItem('cartCount', cartCount);

}


function search() {
    const keyword = document.getElementById("searchInput").value.toLowerCase();
    const cards = document.querySelectorAll(".product-card");
    const resultDisplay = document.getElementById("search-result");

    let matchCount = 0;

    cards.forEach(card => {
        const title = card.querySelector(".productName").textContent.toLowerCase();
        const description = card.querySelector(".productDescription").textContent.toLowerCase();                    
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

document.addEventListener('DOMContentLoaded', () => {
    loadCartCount()
    renderProducts();
});






