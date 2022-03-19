let interestedLocation = localStorage.getItem("interestedLocation");

// document elements
let locationName = document.getElementById("locationName");
let feesAmount = document.getElementById("feesAmount");
let addToCartBtn = document.getElementsByClassName("addToCartBtn");
let videoSrcEle = document.getElementById("videoSrcEle");
let timingsValue = document.getElementById("timingsValue");
let desc = document.getElementById("desc");
let images = document.getElementById("images");
let cartItemsDiv = document.getElementById("cartItemsDiv");
let cartHtml = document.getElementById("cartHtml");

setTimeout(() => {
    cartModal = new bootstrap.Modal(document.getElementById('cartModal'), {
        keyboard: false
    })
}, 100);


// window.addEventListener("load", async ()=>{
// let location;
fetch("./jsonData/locations.json").then((res) => {
    return res.json();
}).then(data => {
    locations = data;
    // console.log(locations);
    // console.log(cartList);
    locations.forEach((locObj, ind) => {
        // console.log(locObj["city"]);
        if (locObj["location"].toLowerCase() === interestedLocation.toLowerCase()) {
            // console.log(locObj);
            videoSrcEle.src = locObj["videoSrc"];
            locationName.innerText = interestedLocation;
            feesAmount.innerText = Object.values(locObj["entryFees"])[0];
            timingsValue.innerText = locObj["timings"];
            desc.innerText = locObj["description"];
            for (let index = 1; index <= locObj["noOfImgs"]; index++) {
                images.innerHTML += `
                    <img src="./locationImg/${locObj["imgSrcName"]}/${locObj["imgSrcName"]}_${index}.jpeg" alt="" class="overviewImg my-3">
                `;
            }
        }

    })
})
// })

document.title = `CityXplore - ${interestedLocation}`;
copyright.innerText = `© ${new Date().getFullYear()} CityXplore`;

updateCart();

function updateCart() {
    let SavedInlocalStorage = localStorage.getItem("cartItems");
    // console.log(SavedInlocalStorage);
    if (SavedInlocalStorage == null) {
        cartList = [];
    }
    else {
        cartList = JSON.parse(SavedInlocalStorage);
    }

    // console.log(cartList.length);

    if (cartList.length === 0) {
        cartHtml.innerHTML = `<p>Your cart is empty !</p>`;
    }
    else {
        let temp = "";
        cartList.forEach(e => {
            temp += `<p>${e}</p>`;
        })
        cartHtml.innerHTML = temp;
    }
}

// console.log(65);
Array.from(addToCartBtn).forEach((btn) => {
    let SavedInlocalStorage = localStorage.getItem("cartItems");
    // console.log(btn);
    if (SavedInlocalStorage == null) {
        cartList = [];
    }
    else {
        cartList = JSON.parse(SavedInlocalStorage);
    }

    let placeToVisit = interestedLocation;
    // console.log(placeToVisit);
    if (!cartList.includes(placeToVisit)) {
        btn.innerHTML = `Add to cart <i class="fa fa-shopping-cart" style="font-size: 16px"></i>`;
    }
    else {
        btn.innerText = "Remove from Cart";
    }

    btn.addEventListener("click", (e) => {
        let placeToVisit = interestedLocation;
        // console.log(placeToVisit);
        // cartItems array stored in localStorage

        if (cartList.includes(placeToVisit)) {
            let ind = cartList.indexOf(placeToVisit);
            cartList.splice(ind, 1);

            // console.log(cartList);
            localStorage.setItem("cartItems", JSON.stringify(cartList));
            e.target.innerHTML = `Add to cart <i class="fa fa-shopping-cart" style="font-size: 16px"></i>`;
        }

        else {
            cartList.push(placeToVisit);
            // console.log(cartList);
            localStorage.setItem("cartItems", JSON.stringify(cartList));
            e.target.innerText = "Remove from Cart";
        }
        updateCart();
    })
})

