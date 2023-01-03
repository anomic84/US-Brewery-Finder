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
const storeList = document.getElementById("store-list");
const info = document.getElementById("store-info");
// Brewery Fetch API saved into code to access whenever
// let coord = "";
var BrewApiData = [];

// ----------------------------Brewery API Fetch---------------------------- //
function fetchBreweries(city) {
  fetch("https://api.openbrewerydb.org/breweries?by_city=" + city, {
    method: "GET",
  })
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data);
      BrewApiData = data;

      L.mapquest.key = "ck2OXUAJsF0iz999XGQ62jyXo8AXOVp7";
      var baseLayer = L.mapquest.tileLayer("map");

      var map = L.mapquest.map("map", {
        center: L.latLng(data[0].latitude, data[0].longitude),
        layers: baseLayer,
        zoom: 13,
      });

      /* var addressPoints = data.map((brewery) => [
        brewery.latitude,
        brewery.longitude,
        brewery.name,
      ]); */

      var addressPoints = [];

      for(let i = 0; i < data.length; i++){
        addressPoints.push([data[i].latitude,  data[0].longitude,  data[0].name])
      }

      var markers = L.markerClusterGroup();

      for (var i = 0; i < addressPoints.length; i++) {
        var addressPoint = addressPoints[i];
        var title = addressPoint[2];
        var marker = L.marker(new L.LatLng(addressPoint[0], addressPoint[1]), {
          title: title,
          icon: L.mapquest.icons.marker(),
        });
        marker.bindPopup(title);
        markers.addLayer(marker);
      }

      map.addLayer(markers);
      console.log(addressPoints);

      for (let i = 0; i < data.length; i++) {
        const brewery = document.createElement("li");
        brewery.classList.add("brewerylistitem");
        brewery.textContent = data[i].name;
        // brewery.setAttribute("data-address", data[i].street + " " + data[i].city + " " + data[i].state)
        brewery.setAttribute("data-index", i);
        // data.street + data.city + data.state.setattribute()
        storeList.append(brewery);
        storeList.onclick = showInfo;
      }
    });
}
function showInfo(event) {
  //clears the info section before putting in the new address when clicked.
  info.innerHTML = "";

  const breweryIndex = event.target.getAttribute("data-index");
  // This line sets a number for array, now we call this instead of response
  const breweryNum = BrewApiData[breweryIndex];

  //Name
  var breweryName = document.createElement("h1");
  breweryName.innerHTML = breweryNum.name;
  info.append(breweryName);
  //Address
  var breweryAddy = document.createElement("p");
  breweryAddy.innerHTML =
    breweryNum.street + " " + breweryNum.city + ", " + breweryNum.state;
  info.append(breweryAddy);
  //phone number
  var breweryPhone = document.createElement("p");
  breweryPhone.innerHTML = breweryNum.phone;
  info.append(breweryPhone);
}

// console.log("info shown")

//---------------------------Return List of names--------------------------//

// ---------------------------------Buttons---------------------------------//
// Search button
search.addEventListener("click", function () {
  // sets the city variable to whatever the person puts in the input ("city-input") defined at top
  var city = input.value;
//   console.log("search button works");
  fetchBreweries(city);
  // --------if statement to disallow duplicates--------//
  // if (searchHistory.indexOf(city.toLowerCase()) !== -1) {
  //     return
  // }
  // searchHistory.push(city.toLowerCase())
  // localStorage.setItem("search", JSON.stringify(searchHistory))
});
