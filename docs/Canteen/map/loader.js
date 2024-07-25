function fetchData() {
    alert("IMPORTANT INFORMATION: Please allow location access if prompted for.");
    setTitle();
    setMapHeight();
    setMap();
}

if (!navigator.geolocation) {
    alert("Location service is not available!!");
}

window.addEventListener('resize', setMapHeight);
let route; // Route on the map
let map;

function setTitle(){
    // Set Page Title
    document.getElementById("Pagetitle").innerHTML = sessionStorage.getItem("title") //information[0];
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
        document.getElementById("btn3").className = "button is-rounded is-small";
    } else {
        document.getElementById("btn1").className = "button is-rounded";
        document.getElementById("btn2").className = "button is-rounded";
        document.getElementById("btn3").className = "button is-rounded";
    }
}


function setMap() {
    // Create a Map and set view to Amrita
    map = L.map("map");
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { maxZoom: 19, attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors' }).addTo(map);
    map.setView([10.903538, 76.899816], 16);

    const marker = new L.Marker([parseFloat(sessionStorage.getItem("lat")), parseFloat(sessionStorage.getItem("long"))]);
    marker.bindPopup(sessionStorage.getItem("title"));
    marker.addTo(map);
}

function error() {
    alert("Unable to fetch your location. Please make sure that location access is allowed for this site.");
}

function success(position) {
    try{
        // Removes old path if one already exists
        map.removeControl(route);
    } catch (e) {
        console.log(e);
    }

    route = L.Routing.control( {
        waypoints: [
            L.latLng(position.coords.latitude, position.coords.longitude),
            L.latLng(parseFloat(sessionStorage.getItem("lat")), parseFloat(sessionStorage.getItem("long")))
        ],
        routeWhileDragging: false
    });

    route.addTo(map);
}

function getRoute() {
    navigator.geolocation.getCurrentPosition(success, error);
}