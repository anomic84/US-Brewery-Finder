// Consts
const input = document.getElementById("city-input");
const search = document.getElementById("search-button");
// add a clear history button here after we get MVP





//Bing maps
const bingMapApi = "Al7OdiPyzEykkQtq9N0tfF2-85LosZCbAMvSxWxZ0nREKBqTififdRTwb_Zai0pK"
const testCall = async function () {
    var data = await fetchData('http://dev.virtualearth.net/REST/v1/Locations/1%20Microsoft%20Way%20Redmond%20WA%2098052?o=json&key=Al7OdiPyzEykkQtq9N0tfF2-85LosZCbAMvSxWxZ0nREKBqTififdRTwb_Zai0pK');
    console.log(data)
}

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

// search.addEventListener("click", url);
Yelp Fusion API

API Key =
    XrJ9PFPKIcRiTDcpixQl8_Kw3v00qbkA0sq9CUoJWDymks3sdpATOA9X7Kk2vrx - rlpPg9iEsiwQmaiBTb - HwAyHV8gfTOTzyu_0DHSuqnmVhRCC83MM_ZZ82vebY3Yx

curl--request GET \
--url https://api.yelp.com/v3/events/awesome-event \
--header 'Authorization: Bearer XrJ9PFPKIcRiTDcpixQl8_Kw3v00qbkA0sq9CUoJWDymks3sdpATOA9X7Kk2vrx-rlpPg9iEsiwQmaiBTb-HwAyHV8gfTOTzyu_0DHSuqnmVhRCC83MM_ZZ82vebY3Yx' \
--header 'accept: application/json'

// this *should* be the right search. I've got bakeries set in the call, and than the +city, where city = what user types in search ("catagories" might need to be "term" )
fetch("https://api.yelp.com/v3/businesses/search?catagories=bakeries&location=" + city)
.then(response => response.json())
.then(response => console.log(response))
.catch(err => console.error(err));










// --------------------Fetch response as written by Yelp--------------------//
// const options = {
//     method: 'POST',
//     headers: {accept: 'application/json', 'content-type': 'application/json'}
//   };
  
//   fetch('https://partner-api.yelp.com/v1/ingest/create', options)
//     .then(response => response.json())
//     .then(response => console.log(response))
//     .catch(err => console.error(err));