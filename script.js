// --------------------Consts, Vars, Lets--------------------//
const input = document.getElementById("city-input");
const search = document.getElementById("search-button");
// add a clear history button here after we get MVP





// --------------------BING Fetch and Api--------------------//
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


// --------------------Yelp Fetch and API--------------------//
// search.addEventListener("click", url)

// API Key =
//     XrJ9PFPKIcRiTDcpixQl8_Kw3v00qbkA0sq9CUoJWDymks3sdpATOA9X7Kk2vrx - rlpPg9iEsiwQmaiBTb - HwAyHV8gfTOTzyu_0DHSuqnmVhRCC83MM_ZZ82vebY3Yx

// curl--request GET \
// --url https://api.yelp.com/v3/events/awesome-event \
// --header 'Authorization: Bearer XrJ9PFPKIcRiTDcpixQl8_Kw3v00qbkA0sq9CUoJWDymks3sdpATOA9X7Kk2vrx-rlpPg9iEsiwQmaiBTb-HwAyHV8gfTOTzyu_0DHSuqnmVhRCC83MM_ZZ82vebY3Yx' 
// --header 'accept: application/json'


// const aconfig = {
//     method: "fetch",
//     url: `https://api.yelp.com/v3/businesses/search?catagories=bakeries&radius=8050&location=seattle`
//     header: 'Authorization: Bearer XrJ9PFPKIcRiTDcpixQl8_Kw3v00qbkA0sq9CUoJWDymks3sdpATOA9X7Kk2vrx-rlpPg9iEsiwQmaiBTb-HwAyHV8gfTOTzyu_0DHSuqnmVhRCC83MM_ZZ82vebY3Yx'
// }
// // this *should* be the right search. I've got bakeries set in the call, ~5 mile radius, and than the +city, where city = what user types in search ("catagories" might need to be "term" )
// fetch(aconfig)
// .then(response => response.json())
// .then(response => console.log(response))
// .catch(err => console.error(err));


https://api.yelp.com/v3/businesses/search?catagories=bakeries&radius=8050&location=" + city







// --------------------Fetch response as written by Yelp--------------------//
const yelpApiKey = "XrJ9PFPKIcRiTDcpixQl8_Kw3v00qbkA0sq9CUoJWDymks3sdpATOA9X7Kk2vrx-rlpPg9iEsiwQmaiBTb-HwAyHV8gfTOTzyu_0DHSuqnmVhRCC83MM_ZZ82vebY3Yx"
const options = {
    method: 'GET', 
    headers: { 
        accept: 'application/json', 
        Authorization: 'Bearer' + yelpApiKey }
}
// fetch is set to sort by best match, limit 20, search bakeries, radius of 5 miles, and location seattle (for now)
    fetch('https://api.yelp.com/v3/businesses/search?sort_by=best_match&limit=20&catagories=bakeries&radius=8050&location=seattle', options)
    .then(response => response.json())
        .then(response => console.log(response))
        .catch(err => console.error(err));