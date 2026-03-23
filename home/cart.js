import { getCurrentUser } from '../auth.js'

const sidebar = document.getElementById("default-sidebar");
const openBtn = document.getElementById("openSidebar");
const closeBtn = document.getElementById("closeSidebar");
const itemList = document.getElementById("itemList");
const cartTotal = document.getElementById("cartTotal");
const itemModal = document.getElementById("itemModal");
const modalItemTitle = document.getElementById("modalItemTitle");
const addQtyBtn = document.getElementById("addQtyBtn");
const removeQtyBtn = document.getElementById("removeQtyBtn");
const removeItemBtn = document.getElementById("removeItemBtn");
const closeModalBtn = document.getElementById("closeModalBtn");

let selectedItemId = null;
//animations
openBtn.addEventListener("click", () => {
    sidebar.classList.remove("translate-x-full");
    setTimeout(() => {
        openBtn.style.opacity = "0";
        openBtn.style.pointerEvents = "none";
    }, 300);
});

closeBtn.addEventListener("click", () => {
    sidebar.classList.add("translate-x-full");
    openBtn.style.opacity = "1";
    openBtn.style.pointerEvents = "auto";
});

//cart state management
let state = {
    cart: [],
    //total cart
    total: 0,
    totalPrice: 0
}

const setState = (newState) => {
    state = { ...state, ...newState };
}

const getState = () => state;

const handleAddToCart = (addBtn) => {
    const id = addBtn.parentElement.querySelector("#productId").textContent;
    const title = addBtn.parentElement.querySelector("#productTitle").textContent;
    const price = addBtn.parentElement.querySelector("#productPrice").textContent;

    // Check if item already exists in cart
    const existingItem = state.cart.find(item => item.id === id);

    if (existingItem) {
        // Update quantity if item exists
        existingItem.quantity += 1;
    } else {
        // Add new item if it doesn't exist
        const product = { id, title, price, quantity: 1 };
        state.cart.push(product);
    }

    state.total += 1;
    state.totalPrice += Number(price.replace("$", ""));
    setState({ cart: [...state.cart], total: state.total, totalPrice: state.totalPrice });
};

const updateCartDisplay = () => {
    const cartItems = document.getElementById("cartItems");
    if (cartItems) {
        cartItems.textContent = getState().total;
        itemList.innerHTML = `<option value="" disabled selected>view items</option>`;
        getState().cart.forEach(item => {
            const option = document.createElement("option");
            option.value = item.id;
            option.textContent = `${item.title} - ${item.price} - Quantity: ${item.quantity}`;
            itemList.appendChild(option);
        });
        cartTotal.textContent = `$${getState().totalPrice.toFixed(2)}`;
    }
};

const openItemModal = (itemId) => {
    selectedItemId = itemId;
    const item = state.cart.find(i => i.id === itemId);
    if (item) {
        modalItemTitle.textContent = `${item.title} (Qty: ${item.quantity})`;
        itemModal.classList.remove("hidden");
    }
};

const closeItemModal = () => {
    itemModal.classList.add("hidden");
    itemList.value = "";
    selectedItemId = null;
};

const handleAddQuantity = () => {
    if (!selectedItemId) return;
    const item = state.cart.find(i => i.id === selectedItemId);
    if (item) {
        item.quantity += 1;
        state.total += 1;
        state.totalPrice += Number(item.price.replace("$", ""));
        setState({ cart: [...state.cart], total: state.total, totalPrice: state.totalPrice });
        modalItemTitle.textContent = `${item.title} (Qty: ${item.quantity})`;
        updateCartDisplay();
    }
};

const handleRemoveQuantity = () => {
    if (!selectedItemId) return;
    const item = state.cart.find(i => i.id === selectedItemId); //find id in cart where i.id = selectedItemId to check if it exists in the cart
    if (item) {
        item.quantity -= 1;
        state.total -= 1;
        state.totalPrice -= Number(item.price.replace("$", ""));

        if (item.quantity === 0) {
            state.cart = state.cart.filter(i => i.id !== selectedItemId); //automatically remove 0 qty items
            setState({ cart: [...state.cart], total: state.total, totalPrice: state.totalPrice });
            updateCartDisplay();
            closeItemModal();
        } else {
            modalItemTitle.textContent = `${item.title} (Qty: ${item.quantity})`;
            setState({ cart: [...state.cart], total: state.total, totalPrice: state.totalPrice });
            updateCartDisplay();
        }
    }
};

const handleRemoveItem = () => {
    if (!selectedItemId) return;
    const item = state.cart.find(i => i.id === selectedItemId);
    if (item) {
        state.total -= item.quantity;
        state.totalPrice -= Number(item.price.replace("$", "")) * item.quantity;
        state.cart = state.cart.filter(i => i.id !== selectedItemId);
        setState({ cart: [...state.cart], total: state.total, totalPrice: state.totalPrice });
        updateCartDisplay();
        //closeItemModal();
    }
};

// Use event delegation to catch all dynamically created addBtn clicks
document.addEventListener("click", (e) => {
    if (e.target.id === "addBtn") {
        handleAddToCart(e.target);
        updateCartDisplay();
    }
});

// Handle item list selection
itemList.addEventListener("change", (e) => {
    if (e.target.value) {
        openItemModal(e.target.value);
    }
});

// Modal button listeners
addQtyBtn.addEventListener("click", handleAddQuantity);
removeQtyBtn.addEventListener("click", handleRemoveQuantity);
removeItemBtn.addEventListener("click", handleRemoveItem);
closeModalBtn.addEventListener("click", closeItemModal);
itemModal.addEventListener("click", (e) => {
    if (e.target === itemModal) {
        closeItemModal();
    }
});

// const userEmail = localStorage.getItem("loggedInUser");
// const customerData = {
//     userInfo: userEmail,
//     cart: getState().cart,
//     total: getState().total,
//     totalPrice: getState().totalPrice
// }

// localStorage.setItem("customerData", JSON.stringify(customerData));

//checkout
const checkoutBtn = document.getElementById("checkoutBtn");
checkoutBtn.addEventListener("click", () => {
    if (state.cart.length === 0) {
        alert("Your cart is empty!");
        return;
    }
    const userEmail = getCurrentUser().email;
    const customerData = {
        userInfo: userEmail,
        cart: getState().cart,
        total: getState().total,
        totalPrice: getState().totalPrice
    }
    showLoading(true);
    try {
        setTimeout(() => {
            localStorage.setItem("customerData", JSON.stringify(customerData));
            showLoading(false);
            alert("Checkout successful! Your order has been placed.");
            //clear cart
            setState({ cart: [], total: 0, totalPrice: 0 });
            updateCartDisplay();
        }, 3000);
    }
    catch (error) {
        alert("An error occurred during checkout. Please try again.");
        showLoading(false);
    }
});

//for loadings
function showLoading(isLoading) {
    checkoutBtn.innerHTML = isLoading ? "Processing..." : "Checkout";
}

// logInForm.addEventListener('submit', (e) => {
//     e.preventDefault();
//     const email = logInForm.email.value;
//     const password = logInForm.password.value;

//     const user = logIn(email, password);

//     if(user !== null){
//         alert("Log in successful!");
//         document.location.href = "../home/index.html";
//     } else {
//         alert("Invalid email or password.");
//     }

// });