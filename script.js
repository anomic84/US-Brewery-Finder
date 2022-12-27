// ---------------------------Psuedo Code for MVP---------------------------//
// Yelp api []
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
let BrewApiData = [];
let coord = '';





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
// ---------------------------Eventbrite Fetch and Api----------------------------//

EBKey = "TME6JCRRODRLCGDTOGD4"
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
    //    return
    //}
    //searchHistory.push(city.toLowerCase())
    //localStorage.setItem("search", JSON.stringify(searchHistory))
});
