let route; // Global Variable for route
let map; // Global Variable for map

function fetchData() {
    alert("IMPORTANT INFORMATION: Please allow location access if prompted for.");
    setTitle();
    setMapHeight();
    setMap();
    addPlacesDropDown();
}

if (!navigator.geolocation) {
    alert("Location service is not available!!");
}

function error() {
    // Will be called if an error occurs when displaying route
    alert("Unable to fetch your location. Please make sure that location access is allowed for this site.");
}

function success(position) {
    // Will be called to show route
    try{
        // Removes old path if one already exists
        map.removeControl(route);
    } catch (e) {
        console.log(e);
    }

    let lat;
    let long;

    for(i = 1; i < places.length; i++) {
        if (places[i]["name"] == sessionStorage.getItem("target")) {
            lat = parseFloat(places[i]['latitude']);
            long = parseFloat(places[i]['longitude']);
            break;
        }
    }

    route = L.Routing.control( {
        waypoints: [
            L.latLng(position.coords.latitude, position.coords.longitude),
            L.latLng(lat, long)
        ],
        routeWhileDragging: false
    });

    route.addTo(map);
}

window.addEventListener('resize', setMapHeight);
let showdropdown = false;

document.getElementById("showPlaces").addEventListener("click", _ => {
    showdropdown = !showdropdown;
    if(showdropdown) {
        document.getElementById("dropdownBtn").className = "dropdown is-active";
    } else {
        document.getElementById("dropdownBtn").className = "dropdown";
    }
});


function setTitle(){
    // Set Page Title
    document.getElementById("Pagetitle").innerHTML = places[0] //information[0];
}


function setMapHeight() {
    // Resize the Map based on available space to occupy full window space
    let hero = document.getElementById("heroSec");
    let _ = getComputedStyle(hero);
    let heightOccupied = _.getPropertyValue('height');
    document.getElementById("map").style.height = `calc(100vh - ${heightOccupied})`;

    let widthOccupied = hero.offsetWidth;
    if (widthOccupied <= 762) {
        document.getElementById("btn1").className = "button is-rounded is-small";
        document.getElementById("btn2").className = "button is-rounded is-small";
        document.getElementById("showPlaces").className = "button is-rounded is-small";
    } else {
        document.getElementById("btn1").className = "button is-rounded";
        document.getElementById("btn2").className = "button is-rounded";
        document.getElementById("showPlaces").className = "button is-rounded";
    }
}


function setMap() {
    // Create a Map and set view to Amrita
    map = L.map("map");
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { maxZoom: 19, attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors' }).addTo(map);
    map.setView([10.903538, 76.899816], 16);

    for(i = 1; i < places.length; i++) {
        new L.Marker([parseFloat(places[i]["latitude"]), parseFloat(places[i]["longitude"])]).addTo(map).bindPopup(places[i]["name"]);
    }
}

function addPlacesDropDown() {
    for(i = 1; i < places.length; i++) {
        let a = document.createElement("a");
        a.className = "dropdown-item";
        a.innerHTML = places[i]["name"];
        a.onclick = function () {
            sessionStorage.setItem("target", a.innerHTML);
            navigator.geolocation.getCurrentPosition(success, error);
        };
        document.getElementById("dropdown-content").appendChild(a);
    }
}