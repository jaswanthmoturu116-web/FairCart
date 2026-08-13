/* =====================================================
   FAIR CART - ECOMMERCE + ANTIDARK SHIELD
===================================================== */


/* =====================================================
   PRODUCT DATABASE
===================================================== */

const products = [

    {
        id: 1,
        name: "Pro Runner Sneakers",
        category: "sports",
        emoji: "👟",
        price: 3999,
        rating: 4.8,
        reviews: 328,
        description: "Lightweight everyday running shoes.",
        badge: "POPULAR"
    },

    {
        id: 2,
        name: "AirBeat Headphones",
        category: "electronics",
        emoji: "🎧",
        price: 2499,
        rating: 4.6,
        reviews: 214,
        description: "Wireless sound with deep bass.",
        badge: "TRENDING"
    },

    {
        id: 3,
        name: "Classic Edge Watch",
        category: "accessories",
        emoji: "⌚",
        price: 4999,
        rating: 4.7,
        reviews: 187,
        description: "Minimal design for everyday style.",
        badge: "NEW"
    },

    {
        id: 4,
        name: "Urban Travel Backpack",
        category: "fashion",
        emoji: "🎒",
        price: 1899,
        rating: 4.8,
        reviews: 402,
        description: "Comfortable everyday travel backpack.",
        badge: "BESTSELLER"
    },

    {
        id: 5,
        name: "CloudSoft Hoodie",
        category: "fashion",
        emoji: "🧥",
        price: 1599,
        rating: 4.5,
        reviews: 163,
        description: "Soft premium cotton hoodie.",
        badge: "POPULAR"
    },

    {
        id: 6,
        name: "Smart Desk Lamp",
        category: "home",
        emoji: "💡",
        price: 1299,
        rating: 4.4,
        reviews: 96,
        description: "Warm adjustable lighting for your desk.",
        badge: "SMART"
    },

    {
        id: 7,
        name: "Fitness Smart Band",
        category: "electronics",
        emoji: "⌚",
        price: 2999,
        rating: 4.6,
        reviews: 251,
        description: "Track your everyday activity.",
        badge: "POPULAR"
    },

    {
        id: 8,
        name: "Everyday Sports Bottle",
        category: "sports",
        emoji: "🥤",
        price: 799,
        rating: 4.7,
        reviews: 143,
        description: "Reusable insulated sports bottle.",
        badge: "ECO"
    }

];


/* =====================================================
   STATE
===================================================== */

let cart = [];

let currentCategory = "all";

let shieldOn = false;

let quantity = 1;

let minutes = 1;

let seconds = 59;


/* =====================================================
   ELEMENTS
===================================================== */

const productGrid =
    document.getElementById("productGrid");

const searchInput =
    document.getElementById("searchInput");

const clearSearch =
    document.getElementById("clearSearch");

const productCount =
    document.getElementById("productCount");

const noResults =
    document.getElementById("noResults");

const cartButton =
    document.getElementById("cartButton");

const cartDrawer =
    document.getElementById("cartDrawer");

const cartOverlay =
    document.getElementById("cartOverlay");

const closeCart =
    document.getElementById("closeCart");

const cartItems =
    document.getElementById("cartItems");

const emptyCart =
    document.getElementById("emptyCart");

const cartTotal =
    document.getElementById("cartTotal");

const cartCount =
    document.getElementById("cartCount");

const goCheckout =
    document.getElementById("goCheckout");

const homePage =
    document.getElementById("homePage");

const checkoutPage =
    document.getElementById("checkoutPage");

const backToShop =
    document.getElementById("backToShop");

const checkoutItems =
    document.getElementById("checkoutItems");

const checkoutItemCount =
    document.getElementById("checkoutItemCount");

const subtotal =
    document.getElementById("subtotal");

const total =
    document.getElementById("total");

const protectionCheckbox =
    document.getElementById("protectionCheckbox");

const protectionFeeRow =
    document.getElementById("protectionFeeRow");

const timer =
    document.getElementById("timer");

const peopleCount =
    document.getElementById("peopleCount");

const whyAddon =
    document.getElementById("whyAddon");

const addonExplanation =
    document.getElementById("addonExplanation");

const shieldToggle =
    document.getElementById("shieldToggle");

const shieldStatus =
    document.getElementById("shieldStatus");

const shieldReport =
    document.getElementById("shieldReport");

const scanOverlay =
    document.getElementById("scanOverlay");

const scanText =
    document.getElementById("scanText");

const progressBar =
    document.getElementById("progressBar");

const progressText =
    document.getElementById("progressText");

const toast =
    document.getElementById("toast");

const checkoutBtn =
    document.getElementById("checkoutBtn");


/* =====================================================
   FORMAT MONEY
===================================================== */

function money(value) {

    return "₹" +
        value.toLocaleString("en-IN");

}


/* =====================================================
   RENDER PRODUCTS
===================================================== */

function renderProducts() {

    const search =
        searchInput.value
            .trim()
            .toLowerCase();


    const filtered =
        products.filter(product => {

            const matchesCategory =
                currentCategory === "all" ||
                product.category === currentCategory;


            const matchesSearch =
                product.name
                    .toLowerCase()
                    .includes(search) ||

                product.category
                    .toLowerCase()
                    .includes(search) ||

                product.description
                    .toLowerCase()
                    .includes(search);


            return (
                matchesCategory &&
                matchesSearch
            );

        });


    productGrid.innerHTML = "";


    productCount.textContent =
        `${filtered.length} products`;


    if (filtered.length === 0) {

        noResults.classList.remove(
            "hidden"
        );

        return;

    }


    noResults.classList.add(
        "hidden"
    );


    filtered.forEach(
        (product, index) => {

            const card =
                document.createElement("article");


            card.className =
                "product-card";


            card.style.animationDelay =
                `${index * 0.05}s`;


            card.innerHTML = `

                <div class="product-image">

                    <span class="product-badge">
                        ${product.badge}
                    </span>

                    <div class="product-emoji">
                        ${product.emoji}
                    </div>

                </div>


                <div class="product-info">

                    <div class="product-category">
                        ${product.category.toUpperCase()}
                    </div>

                    <h3 class="product-name">
                        ${product.name}
                    </h3>

                    <p class="product-description">
                        ${product.description}
                    </p>

                    <div class="product-rating">

                        ★★★★★

                        <span>
                            ${product.rating}
                            · ${product.reviews}
                        </span>

                    </div>


                    <div class="product-bottom">

                        <strong class="product-price">
                            ${money(product.price)}
                        </strong>

                        <button
                            class="add-cart"
                            data-id="${product.id}"
                        >
                            + Add
                        </button>

                    </div>

                </div>

            `;


            productGrid.appendChild(card);

        }
    );


    document
        .querySelectorAll(".add-cart")
        .forEach(button => {

            button.addEventListener(
                "click",
                () => {

                    addToCart(
                        Number(
                            button.dataset.id
                        )
                    );

                }
            );

        });

}


/* =====================================================
   SEARCH
===================================================== */

searchInput.addEventListener(
    "input",
    renderProducts
);


clearSearch.addEventListener(
    "click",
    () => {

        searchInput.value = "";

        currentCategory = "all";

        document
            .querySelectorAll(".category")
            .forEach(button => {

                button.classList.remove(
                    "active"
                );

            });

        document
            .querySelector(
                '.category[data-category="all"]'
            )
            .classList.add("active");


        renderProducts();

    }
);


/* =====================================================
   CATEGORIES
===================================================== */

document
    .querySelectorAll(".category")
    .forEach(button => {

        button.addEventListener(
            "click",
            () => {

                document
                    .querySelectorAll(".category")
                    .forEach(btn => {

                        btn.classList.remove(
                            "active"
                        );

                    });


                button.classList.add(
                    "active"
                );


                currentCategory =
                    button.dataset.category;


                renderProducts();

            }
        );

    });


/* =====================================================
   ADD TO CART
===================================================== */

function addToCart(productId) {

    const product =
        products.find(
            item => item.id === productId
        );


    const existing =
        cart.find(
            item => item.id === productId
        );


    if (existing) {

        existing.quantity++;

    } else {

        cart.push({

            ...product,

            quantity: 1

        });

    }


    renderCart();


    openCart();


    showToast(
        `${product.name} added to cart`
    );

}


/* =====================================================
   RENDER CART
===================================================== */

function renderCart() {

    cartItems.innerHTML = "";


    let totalItems = 0;

    let totalPrice = 0;


    cart.forEach(item => {

        totalItems +=
            item.quantity;


        totalPrice +=
            item.price *
            item.quantity;


        const element =
            document.createElement("div");


        element.className =
            "cart-item";


        element.innerHTML = `

            <div class="cart-item-image">
                ${item.emoji}
            </div>


            <div class="cart-item-details">

                <strong>
                    ${item.name}
                </strong>

                <small>
                    ${money(item.price)}
                </small>


                <div class="cart-item-controls">

                    <button
                        data-action="minus"
                        data-id="${item.id}"
                    >
                        −
                    </button>

                    <span>
                        ${item.quantity}
                    </span>

                    <button
                        data-action="plus"
                        data-id="${item.id}"
                    >
                        +
                    </button>

                </div>

            </div>


            <span class="cart-item-price">

                ${money(
                    item.price *
                    item.quantity
                )}

            </span>

        `;


        cartItems.appendChild(
            element
        );

    });


    cartCount.textContent =
        totalItems;


    cartTotal.textContent =
        money(totalPrice);


    if (cart.length === 0) {

        emptyCart.classList.remove(
            "hidden"
        );

        goCheckout.disabled = true;

        goCheckout.style.opacity = ".5";

    } else {

        emptyCart.classList.add(
            "hidden"
        );

        goCheckout.disabled = false;

        goCheckout.style.opacity = "1";

    }


    document
        .querySelectorAll(
            ".cart-item-controls button"
        )
        .forEach(button => {

            button.addEventListener(
                "click",
                () => {

                    const id =
                        Number(
                            button.dataset.id
                        );


                    if (
                        button.dataset.action
                        === "plus"
                    ) {

                        changeCartQuantity(
                            id,
                            1
                        );

                    } else {

                        changeCartQuantity(
                            id,
                            -1
                        );

                    }

                }
            );

        });

}


/* =====================================================
   CHANGE CART QUANTITY
===================================================== */

function changeCartQuantity(
    id,
    amount
) {

    const item =
        cart.find(
            product =>
                product.id === id
        );


    if (!item) return;


    item.quantity += amount;


    if (item.quantity <= 0) {

        cart =
            cart.filter(
                product =>
                    product.id !== id
            );

    }


    renderCart();

}


/* =====================================================
   CART DRAWER
===================================================== */

function openCart() {

    cartDrawer.classList.add(
        "open"
    );

    cartOverlay.classList.remove(
        "hidden"
    );

}


function closeCartDrawer() {

    cartDrawer.classList.remove(
        "open"
    );

    cartOverlay.classList.add(
        "hidden"
    );

}


cartButton.addEventListener(
    "click",
    openCart
);


closeCart.addEventListener(
    "click",
    closeCartDrawer
);


cartOverlay.addEventListener(
    "click",
    closeCartDrawer
);


/* =====================================================
   CHECKOUT
===================================================== */

goCheckout.addEventListener(
    "click",
    () => {

        if (cart.length === 0) {

            return;

        }


        closeCartDrawer();


        homePage.classList.add(
            "hidden"
        );

        checkoutPage.classList.remove(
            "hidden"
        );


        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });


        renderCheckout();

    }
);


/* =====================================================
   BACK TO SHOP
===================================================== */

backToShop.addEventListener(
    "click",
    () => {

        checkoutPage.classList.add(
            "hidden"
        );

        homePage.classList.remove(
            "hidden"
        );

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });

    }
);


/* =====================================================
   RENDER CHECKOUT
===================================================== */

function renderCheckout() {

    checkoutItems.innerHTML = "";


    let itemCount = 0;

    let subtotalValue = 0;


    cart.forEach(item => {

        itemCount +=
            item.quantity;


        subtotalValue +=
            item.price *
            item.quantity;


        const element =
            document.createElement("div");


        element.className =
            "checkout-item";


        element.innerHTML = `

            <div class="checkout-item-image">
                ${item.emoji}
            </div>


            <div class="checkout-item-info">

                <strong>
                    ${item.name}
                </strong>

                <small>
                    ${item.category}
                </small>

            </div>


            <div class="checkout-qty">

                <button
                    data-action="minus"
                    data-id="${item.id}"
                >
                    −
                </button>

                <span>
                    ${item.quantity}
                </span>

                <button
                    data-action="plus"
                    data-id="${item.id}"
                >
                    +
                </button>

            </div>


            <div class="checkout-item-price">

                ${money(
                    item.price *
                    item.quantity
                )}

            </div>

        `;


        checkoutItems.appendChild(
            element
        );

    });


    checkoutItemCount.textContent =
        `${itemCount} ${
            itemCount === 1
            ? "item"
            : "items"
        }`;


    subtotal.textContent =
        money(subtotalValue);


    updateCheckoutTotal();


    document
        .querySelectorAll(
            ".checkout-qty button"
        )
        .forEach(button => {

            button.addEventListener(
                "click",
                () => {

                    const id =
                        Number(
                            button.dataset.id
                        );


                    changeCartQuantity(
                        id,
                        button.dataset.action
                        === "plus"
                        ? 1
                        : -1
                    );


                    renderCheckout();

                }
            );

        });

}


/* =====================================================
   CHECKOUT TOTAL
===================================================== */

function updateCheckoutTotal() {

    let value = 0;


    cart.forEach(item => {

        value +=
            item.price *
            item.quantity;

    });


    const protection =
        protectionCheckbox.checked
        ? 499
        : 0;


    total.textContent =
        money(
            value +
            protection
        );


    protectionFeeRow.style.display =
        protectionCheckbox.checked
        ? "flex"
        : "none";

}


protectionCheckbox.addEventListener(
    "change",
    updateCheckoutTotal
);


/* =====================================================
   COUNTDOWN
===================================================== */

function updateTimer() {

    if (shieldOn) return;


    seconds--;


    if (seconds < 0) {

        seconds = 59;

        minutes--;

    }


    if (minutes < 0) {

        /*
            Deliberately reset.
            This simulates suspicious
            scarcity behavior for the
            AntiDark Shield demo.
        */

        minutes = 1;

        seconds = 59;

    }


    timer.textContent =
        String(minutes).padStart(2, "0")
        + ":" +
        String(seconds).padStart(2, "0");

}


setInterval(
    updateTimer,
    1000
);


/* =====================================================
   SOCIAL PROOF
===================================================== */

setInterval(
    () => {

        if (
            !shieldOn &&
            !checkoutPage.classList.contains(
                "hidden"
            )
        ) {

            let current =
                parseInt(
                    peopleCount.textContent
                );


            current +=
                Math.floor(
                    Math.random() * 11
                ) - 5;


            if (current < 120) {

                current = 120;

            }


            peopleCount.textContent =
                current;

        }

    },
    3000
);


/* =====================================================
   EXPLANATION
===================================================== */

whyAddon.addEventListener(
    "click",
    () => {

        addonExplanation.classList.toggle(
            "show"
        );

    }
);


/* =====================================================
   FAIR CART SHIELD
===================================================== */

shieldToggle.addEventListener(
    "click",
    activateShield
);


function activateShield() {

    if (shieldOn) {

        deactivateShield();

        return;

    }


    /*
        Shield only makes sense
        during checkout.
    */

    if (
        checkoutPage.classList.contains(
            "hidden"
        )
    ) {

        showToast(
            "Add a product and open checkout first."
        );

        return;

    }


    scanOverlay.classList.remove(
        "hidden"
    );


    let progress = 0;


    const messages = [

        "Checking urgency patterns...",

        "Analyzing optional charges...",

        "Checking social-proof claims...",

        "Preparing transparent checkout..."

    ];


    let messageIndex = 0;


    const scan =
        setInterval(
            () => {

                progress += 5;


                progressBar.style.width =
                    `${progress}%`;


                progressText.textContent =
                    `${progress}%`;


                if (
                    progress % 25 === 0 &&
                    messageIndex <
                        messages.length
                ) {

                    scanText.textContent =
                        messages[
                            messageIndex
                        ];

                    messageIndex++;

                }


                if (progress >= 100) {

                    clearInterval(
                        scan
                    );


                    setTimeout(
                        finishShield,
                        500
                    );

                }

            },
            90
        );

}


/* =====================================================
   FINISH SHIELD
===================================================== */

function finishShield() {

    shieldOn = true;


    scanOverlay.classList.add(
        "hidden"
    );


    shieldToggle.classList.add(
        "active"
    );


    shieldStatus.textContent =
        "Protection ACTIVE";


    document.body.classList.add(
        "shield-active"
    );


    /*
        Remove pre-selected
        optional charge.
    */

    protectionCheckbox.checked =
        false;


    updateCheckoutTotal();


    /*
        Neutralize countdown.
    */

    timer.textContent =
        "NEUTRALIZED";


    /*
        Show report.
    */

    shieldReport.classList.remove(
        "hidden"
    );


    /*
        Show toast.
    */

    showToast(
        "Your checkout has been protected."
    );

}


/* =====================================================
   TURN SHIELD OFF
===================================================== */

function deactivateShield() {

    shieldOn = false;


    shieldToggle.classList.remove(
        "active"
    );


    shieldStatus.textContent =
        "Protection OFF";


    document.body.classList.remove(
        "shield-active"
    );


    protectionCheckbox.checked =
        true;


    updateCheckoutTotal();


    timer.textContent =
        "01:59";


    shieldReport.classList.add(
        "hidden"
    );

}


/* =====================================================
   TOAST
===================================================== */

function showToast(message) {

    toast.querySelector("strong")
        .textContent =
        "FairCart";

    toast.querySelector("small")
        .textContent =
        message;


    toast.classList.remove(
        "hidden"
    );


    setTimeout(
        () => {

            toast.classList.add(
                "hidden"
            );

        },
        3000
    );

}


/* =====================================================
   CHECKOUT BUTTON
===================================================== */

checkoutBtn.addEventListener(
    "click",
    () => {

        if (shieldOn) {

            alert(
                "🛡️ FairCart:\n\n" +
                "Order placed with transparent checkout.\n\n" +
                "This is a Design Thinking prototype."
            );

        } else {

            alert(
                "Order placed!\n\n" +
                "This is a FairCart prototype."
            );

        }

    }
);


/* =====================================================
   EXPLORE BUTTON
===================================================== */

document
    .getElementById("exploreButton")
    .addEventListener(
        "click",
        () => {

            document
                .getElementById(
                    "productsSection"
                )
                .scrollIntoView({
                    behavior: "smooth"
                });

        }
    );


/* =====================================================
   INITIALIZE
===================================================== */

renderProducts();

renderCart();