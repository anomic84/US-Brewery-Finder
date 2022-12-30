// ---------------------------Psuedo Code for MVP---------------------------//
// Brewery api [x]
// Bing Api [x]
// Search Button [x]

// Yelp API gives back list of bakeries in searched city by radius of 5mi

// We use data to get addresses
// We give ordered list property to addresses to assign them numbers
// Send addresses as perameter to bing API
// Return addresses to map with numbers to match the list (numbers appear on map)

// We use data from yelp to display [name, address] by using .append and .createElement in JS
// We might want to think about also affecting the CSS (either vanilla or tailwind) here





// ----------------------------Consts, Vars, Lets---------------------------//
const input = document.getElementById("city-input");
const search = document.getElementById("search-button");
// add a clear history button here after we get MVP
const storeList = document.getElementById("store-list")
const info = document.getElementById("store-info")
// Brewery Fetch API saved into code to access whenever
let BrewApiData = []





// ---------------------------MapQuest Fetch and Api----------------------------//
function mapSearch(lat, lon) {
    L.mapquest.key = 'T0AABSUg4vasWZxGxVRqmARpHR0d3wJc';

    // 'map' refers to a <div> element with the ID map
    L.mapquest.map('map', {
        center: [lat, lon],
        layers: L.mapquest.tileLayer('map'),
        zoom: 12
    });
}
// mapSearch(47.6062, -122.3321)


function mapDots() {
    L.mapquest.key = 'ck2OXUAJsF0iz999XGQ62jyXo8AXOVp7';
    var baseLayer = L.mapquest.tileLayer('map');

    var map = L.mapquest.map('map', {
      center: L.latLng(-37.82, 175.24),
      layers: baseLayer,
      zoom: 13
    });

    var addressPoints = [];

    var markers = L.markerClusterGroup();

    for (var i = 0; i < addressPoints.length; i++) {
      var addressPoint = addressPoints[i];
      var title = addressPoint[2];
      var marker = L.marker(new L.LatLng(addressPoint[0], addressPoint[1]), {
        title: title,
        icon: L.mapquest.icons.marker()
      });
      marker.bindPopup(title);
      markers.addLayer(marker);
    }

    map.addLayer(markers);
}
// if(data.resourceSets && data.resourceSets.length > 0 && data.resourceSets[0].resources && data.resourceSets[0].resources.length > 0){
//     var firstResult =  data.resourceSets[0].resources[0];
//     var latitude = firstResult.point.coordinates[0];
//     var longitude = firstResult.point.coordinates[1];



// ----------------------------Brewery API Fetch---------------------------- //
function fetchBreweries(city) {
    fetch('https://api.openbrewerydb.org/breweries?by_city=' + city, {
        method: 'GET',
    })
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            console.log(data);
            BrewApiData = data;

            for (let i = 0; i < data.length; i++) {
                const brewery = document.createElement("li");
                brewery.classList.add("brewerylistitem")
                brewery.textContent = (data[i].name)
                // brewery.setAttribute("data-address", data[i].street + " " + data[i].city + " " + data[i].state)
                brewery.setAttribute('data-index', i)
                // data.street + data.city + data.state.setattribute()
                storeList.append(brewery)
                storeList.onclick = showInfo
            }

        });

}
function showInfo(event) {
    //clears the info section before putting in the new address when clicked.
    info.innerHTML = "";

    const breweryIndex = event.target.getAttribute('data-index')
    // This line sets a number for array, now we call this instead of response
    const breweryNum = BrewApiData[breweryIndex]

    //Name
    var breweryName = document.createElement("h1")
    breweryName.innerHTML = breweryNum.name
    info.append(breweryName)
    //Address
    var breweryAddy = document.createElement("h4")
    breweryAddy.innerHTML = breweryNum.street + " " + breweryNum.city + ", " + breweryNum.state
    info.append(breweryAddy)
    //phone number
    var breweryPhone = document.createElement("h4")
    breweryPhone.innerHTML = breweryNum.phone
    info.append(breweryPhone)
    // console.log(breweryIndex)
    // console.log(BrewApiData[breweryIndex])
    mapSearch(breweryNum.latitude, breweryNum.longitude)
}
 
// console.log("info shown")



//---------------------------Return List of names--------------------------//




// ---------------------------------Buttons---------------------------------//
// Search button
search.addEventListener("click", function () {
    // sets the city variable to whatever the person puts in the input ("city-input") defined at top
    var city = input.value
    console.log("search button works")
    fetchBreweries(city)
    // --------if statement to disallow duplicates--------//
    // if (searchHistory.indexOf(city.toLowerCase()) !== -1) {
    //     return
    // }
    // searchHistory.push(city.toLowerCase())
    // localStorage.setItem("search", JSON.stringify(searchHistory))
})


// defaultMarker=marker-md-3B5998-22407F&










// continuous test, need to recode to make it availbe on click, according to which city user searches
// const testCall = async function () {
//     coord = "40.039401,-76.307078"
//     var data = await fetch(`https://www.mapquestapi.com/staticmap/v5/map?locations=${coord}&defaultMarker=marker-md-3B5998-22407F&size=@2x&key=T0AABSUg4vasWZxGxVRqmARpHR0d3wJc`);
//     console.log(data)
// }

// // Async Funtion given by Bing, Casey (TA) explained how these work and says its ok to use
// async function fetchData(url) {

//     const response = await fetch(url);

//     if (!response.ok) {
//         const message = `An error has occured: ${response.status}`;
//         throw new Error(message);
//     }

//     const json = await response.json();
//     return json;
// }

// testCall()
