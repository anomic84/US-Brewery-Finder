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





// ---------------------------MapQuest Fetch and Api----------------------------//
L.mapquest.key = 'T0AABSUg4vasWZxGxVRqmARpHR0d3wJc';

// 'map' refers to a <div> element with the ID map
L.mapquest.map('map', {
    center: [37.7749, -122.4194],
    layers: L.mapquest.tileLayer('map'),
    zoom: 12
});
// continuous test, need to recode to make it availbe on click, according to which city user searches
const testCall = async function () {
    var data = await fetch(`https://www.mapquestapi.com/staticmap/v5/map?locations=${input}&size=@2x&defaultMarker=marker-md-3B5998-22407F&key=T0AABSUg4vasWZxGxVRqmARpHR0d3wJc`);
    console.log(data)
}

// Async Funtion given by Bing, Casey (TA) explained how these work and says its ok to use
async function fetchData(url) {

    const response = await fetch(url);

    if (!response.ok) {
        const message = `An error has occured: ${response.status}`;
        throw new Error(message);
    }

    const json = await response.json();
    return json;
}

testCall()




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

            for (let i = 0; i < data.length; i++) {
                const brewery = document.createElement("li");
                brewery.classList.add("brewerylistitem")
                brewery.textContent = (data[i].name)
                brewery.setAttribute("data-address", data[i].street + " " + data[i].city + " " + data[i].state)
                // data.street + data.city + data.state.setattribute()
                storeList.append(brewery)

                storeList.onclick = showInfo
            }

        });

}
function showInfo(event) { }

// console.log("info shown")



//---------------------------Return List of names--------------------------//




// ---------------------------------Buttons---------------------------------//
// Search button
search.addEventListener("click", function () {
    // sets the city variable to whatever the person puts in the input ("city-input") defined at top
    var city = input.value
    console.log("works")
    fetchBreweries(city)
    // --------if statement to disallow duplicates--------//
    if (searchHistory.indexOf(city.toLowerCase()) !== -1) {
        return
    }
    searchHistory.push(city.toLowerCase())
    localStorage.setItem("search", JSON.stringify(searchHistory))
})


