import { getCurrentUser, logOut } from '../auth.js'

const API_URL = "https://api.escuelajs.co/api/v1/products";
//const API_URL_CLOTHES = "https://api.escuelajs.co/api/v1/products/?limit=50&offset=0";
const API_URL_CLOTHES = "https://api.escuelajs.co/api/v1/products/?categorySlug=clothes&limit=25&offset=0";
const user = getCurrentUser();
const productsSections = document.getElementById("productsSection");

if (!user) {
    alert("No user is currently logged in. Please log in to continue.");
    document.location.href = "../index.html";
}

document.getElementById("userEmail").textContent = `Email: ${user.email}`;
document.getElementById("userName").textContent = `Username: ${user.username}`;

document.getElementById("logOut").addEventListener("click", () => {
    localStorage.removeItem('currentUser');
    alert("You have been logged out.");
    document.location.href = "../index.html";
});

//API STUFF
//function 
const priceRangeForm = document.querySelector("#priceFilterForm");

//when apply is hit, fetch products within the price range and display them
priceRangeForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    let minPrice = Number(document.getElementById("minPriceRange").value);
    let maxPrice = Number(document.getElementById("maxPriceRange").value);

    if (minPrice === null && maxPrice === null) {
        showLoading(true);
        setTimeout(async () => {
            showLoading(false);
            renderProducts(await fetchProducts());
        }, 2000);
        return;
    }
    else if ((minPrice === null || isNaN(Number(minPrice)) || minPrice === "") && maxPrice > 0) {
        minPrice = 1;
    }
    else if (minPrice > maxPrice) {
        alert("Minimum price cannot be greater than maximum price.");
        return;
    }

    const res = await fetch(`${API_URL_CLOTHES}&price_min=${minPrice}&price_max=${maxPrice}`);
    const data = await res.json();

    clearRenderedProducts();
    showLoading(true);
    return setTimeout(async () => {
        showLoading(false);
        renderProducts(data);
    }, 3000);
});

//on init, fetch all products and display them
document.addEventListener("DOMContentLoaded", () => {
    showLoading(true);
    setTimeout(async () => {
        showLoading(false);
        renderProducts(await fetchProducts());
    }, 3000)
});

async function fetchProducts() {

    try {
        const res = await fetch(API_URL_CLOTHES);
        if (!res.ok) throw new Error("Failed to fetch products");
        return await res.json();
    } catch (error) {
        alert(error.message);
        return [];
    }
}


//render products in the products container
function renderProducts(products) {
    clearRenderedProducts();
    products.forEach(product => {
        const productEL = document.createElement("div");
        productEL.classList.add("product-card", "bg-white", "overflow-y-auto", "drop-shadow-lg", "h-120", "w-100", "rounded-lg", "self-center", "flex", "flex-col", "p-4", "gap-2");
        productEL.innerHTML = `
        <img class="w-full h-75 rounded-lg bg-gray-400" src="${product.images}" 
        alt="${product.title}" referrerpolicy="no-referrer"
            crossorigin="anonymous" onerror="this.onerror=null;this.src='${product.category.image}';" />
        <span id="productId" class="hidden" value="${product.id}">${product.id}</span>
        <span id="productTitle" class="text-xl font-mono font-semibold" value="${product.title}">${product.title}</span>
        <span id="productPrice" class="text-xl font-mono font-semibold" value="${product.price}">$${product.price}</span>
        <button id="addBtn" type="button" class="bg-[#579ae8] cursor-pointer border 
        text-white px-8 py-3 text-lg rounded-md 
        hover:bg-[#10cfe0] transition-colors duration-300 self-end font-mono">Add to Cart</button>
    `;
        productsSections.appendChild(productEL);
    });
};


function clearRenderedProducts() {
    productsSections.querySelectorAll(".product-card").forEach((card) => card.remove());
}



//for loadings
function showLoading(isLoading) {
    const loading = document.getElementById("loading");
    if (isLoading) {
        loading.classList.remove("hidden");
    } else {
        loading.classList.add("hidden");
    }
}