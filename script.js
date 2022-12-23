/ ---------------------------Psuedo Code for MVP---------------------------//
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
var search = document.getElementById("search-button");
// add a clear history button here after we get MVP





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

// --------------------Fetch response as written by Yelp--------------------//
const yelpApiKey = "Bearer XrJ9PFPKIcRiTDcpixQl8_Kw3v00qbkA0sq9CUoJWDymks3sdpATOA9X7Kk2vrx-rlpPg9iEsiwQmaiBTb-HwAyHV8gfTOTzyu_0DHSuqnmVhRCC83MM_ZZ82vebY3Yx"
const options = {
    method: 'GET',
    headers: {
        accept: 'application/json',
        Authorization: yelpApiKey,
    }
}

function testYelp() {
    var data = getYelpApiData('https://api.yelp.com/v3/businesses/search?sort_by=best_match&limit=20&catagories=bakeries&radius=8050&location=Seattle')
    console.log(data)
}

// fetch is set to sort by best match, limit 20, search bakeries, radius of 5 miles, and location seattle (for now)
function getYelpApiData() {
    fetch('https://api.yelp.com/v3/businesses/search?sort_by=best_match&limit=20&catagories=bakeries&radius=8050&location=Seattle', options)
        .then(function (response) {
          return response.json()
        }) 
        .then(function (data) {
          console.log(response)
        })
        .catch(err => console.error(err));
}
testYelp()

// ---------------------------------Buttons---------------------------------//
// Search button
//search.addEventListener("click", function () {
    // sets the city variable to whatever the person puts in the input ("city-input") defined at top
    //var city = input.value
    // getYelpApiData(city)
    // fetchData(city)
    // --------if statement to disallow duplicates--------//
    //if (searchHistory.indexOf(city.toLowerCase()) !== -1) {
    //    return
    //}
    searchHistory.push(city.toLowerCase())
    localStorage.setItem("search", JSON.stringify(searchHistory))



