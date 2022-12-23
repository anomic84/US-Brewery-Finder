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





// ---------------------------BING Fetch and Api----------------------------//
const bingMapApi = "Al7OdiPyzEykkQtq9N0tfF2-85LosZCbAMvSxWxZ0nREKBqTififdRTwb_Zai0pK"
// continuous test, need to recode to make it availbe on click, according to which city user searches
const testCall = async function () {
    var data = await fetchData('http://dev.virtualearth.net/REST/v1/Locations/1%20Microsoft%20Way%20Redmond%20WA%2098052?o=json&key=Al7OdiPyzEykkQtq9N0tfF2-85LosZCbAMvSxWxZ0nREKBqTififdRTwb_Zai0pK');
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
function showInfo(event) {

    // console.log("info shown")

}


//---------------------------Return List of names--------------------------//



// 



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

