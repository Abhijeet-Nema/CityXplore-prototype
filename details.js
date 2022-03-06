let interestedLocation = localStorage.getItem("interestedLocation");

document.title = `CityXplore - ${interestedLocation}`;

document.body.innerText = interestedLocation;