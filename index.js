let searchbar = document.getElementById("searchbar");
let options = document.getElementById("options");
let maruqeeImgs1 = document.getElementById("maruqeeImgs1");
let maruqeeImgs2 = document.getElementById("maruqeeImgs2");
let listOfCities = document.getElementById("listOfCities");
let copyright = document.getElementById("copyright");
let optionValues = document.getElementsByClassName("optionValues");
let knowMoreBtn = document.getElementsByClassName("knowMoreBtn");
let addToCartBtn = document.getElementsByClassName("addToCartBtn");
let cardItemsArr;
var cartModal;

// console.log(optionValues);

setTimeout(() => {
    cartModal = new bootstrap.Modal(document.getElementById('cartModal'), {
        keyboard: false
    })
}, 100);

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


// console.log(knowMoreBtn);

copyright.innerText = `© ${new Date().getFullYear()} CityXplore`;

maruqeeImgs1.start();
maruqeeImgs2.style.visibility = "hidden";
maruqeeImgs2.stop();

setTimeout(() => {
    maruqeeImgs2.style.visibility = "visible";
    maruqeeImgs2.start();
}, 6000);

searchbar.addEventListener("focus", () => {
    options.style.visibility = "visible";
})

searchbar.addEventListener("blur", () => {
    setTimeout(() => {
        options.style.visibility = "hidden";
    }, 500);
})

searchbar.addEventListener("input", () => {
    Array.from(optionValues).forEach(e => {
        // console.log(e);
        if (!e.innerText.toLowerCase().trim().includes(searchbar.value.toLowerCase().trim())) {
            e.style.display = "none";
        }
        else {
            e.style.display = "block";
        }
    })
})

window.addEventListener("load", async () => {
    let cities;
    let locations;

    await fetch("./jsonData/cities.json").then((res) => {
        return res.json();
    }).then(data => {
        cities = data;
        // console.log(data)
    })

    await fetch("./jsonData/locations.json").then((res) => {
        return res.json();
    }).then(data => {
        locations = data;
        // console.log(locations);
    })

    await cities.forEach((obj, ind) => {
        // console.log(ind)
        listOfCities.innerHTML += `
            <div class="accordion-item">
                <h2 class="accordion-header" id="heading${ind}">
                <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapse${ind}" aria-expanded="false" aria-controls="collapse${ind}">
                    ${obj["city"]}
                </button>
                </h2>
                <div id="collapse${ind}" class="accordion-collapse collapse" aria-labelledby="heading${ind}" data-bs-parent="#listOfCities">
                <div class="accordion-body">
                    <div class="row" id="${obj["city"]}"></div>
                </div>
                </div>
            </div>
        `;
    })

    locations.forEach((locObj, ind) => {
        // console.log(locObj["city"]);
        let city = locObj["city"];
        let ele = document.getElementById(city);
        // console.log(ele);
        ele.innerHTML += `
        <div class="col-md-4 d-flex justify-content-center align-items-center my-3">
            <div class="card" style="width: 100%;">
                <img style="height: 220px" src="./tileImg/${locObj["imgSrcName"]}.jpeg" class="card-img-top" alt="...">
                <div class="card-body">
                    <h5 class="card-title">${locObj["location"]}</h5>
                    <p class="card-text">${locObj["description"].slice(0, 170)}.....</p>
                    <p class="card-text my-0"><small class="text-muted">Timing : ${locObj["timings"]}</small></p>
                    <p class="card-text my-0"><small class="text-muted">Entry Fee : ${Object.values(locObj["entryFees"])[0]}</small></p>
                    <div class="btns d-flex my-3">  
                        <button style="width: 100%" class="btn btn-success mx-1 knowMoreBtn">Know More</button>
                        <button style="width: 100%" class="btn btn-danger addToCartBtn mx-1">Add to cart <i class="fa fa-shopping-cart" style="font-size: 16px"></i></button>
                    </div>
                </div>
            </div>
        </div>
        `;
    })

    Array.from(knowMoreBtn).forEach((btn) => {
        btn.addEventListener("click", (e) => {
            // console.log(e.target.parentNode.parentNode.getElementsByClassName("card-title")[0].innerText);
            let placeToVisit = e.target.parentNode.parentNode.getElementsByClassName("card-title")[0].innerText;
            localStorage.setItem("interestedLocation", placeToVisit);
            location.href = "details.html";
        })
    })
    
    Array.from(addToCartBtn).forEach((btn) => {
        let SavedInlocalStorage = localStorage.getItem("cartItems");

        if (SavedInlocalStorage == null) {
            cartList = [];
        }
        else {
            cartList = JSON.parse(SavedInlocalStorage);
        }

        let placeToVisit = btn.parentNode.parentNode.getElementsByClassName("card-title")[0].innerText;

        if (!cartList.includes(placeToVisit)) {
            btn.innerHTML = `Add to cart <i class="fa fa-shopping-cart" style="font-size: 16px"></i>`;
        }
        else {
            btn.innerText = "Remove from Cart";
        }

        btn.addEventListener("click", (e) => {
            let placeToVisit = e.target.parentNode.parentNode.getElementsByClassName("card-title")[0].innerText;
            // console.log(placeToVisit);
            // cartItems array stored in localStorage
            
            if (cartList.includes(placeToVisit)){
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
   
    function redirect(text){
        console.log("text")
    }
})


Array.from(optionValues).forEach((btn) => {
    // console.log(btn)
    btn.addEventListener("click", (e) => {
        // preventDefault();
        // console.log(e)
        let placeToVisit = e.target.innerText;
        let cuttingIndex = placeToVisit.length - 8;
        placeToVisit = placeToVisit.slice(0, cuttingIndex);
        // console.log(placeToVisit);
        localStorage.setItem("interestedLocation", placeToVisit.trim());
        location.href = "details.html";
    })
})



