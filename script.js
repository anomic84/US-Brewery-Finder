// Consts
const input = document.getElementById("city-input");
const search = document.getElementById("search-button");
// add a clear history button here after we get MVP



var mapKey = "T0AABSUg4vasWZxGxVRqmARpHR0d3wJc"


function map(input) {
     input = $('#city_input').val().trim();
     var queryURL="https://www.mapquestapi.com/search/v4/place?sort=distance&feedback=false&key=T0AABSUg4vasWZxGxVRqmARpHR0d3wJc";
   
     fetch(queryURL)
       .then(function (response) {
         return response.json();
       })
       .then(function (data) {
         console.log(data);
        
          $("#map").append(input);
   });

}
search.addEventListener("click", map);
//Yelp Fusion API

// API Key =
// XrJ9PFPKIcRiTDcpixQl8_Kw3v00qbkA0sq9CUoJWDymks3sdpATOA9X7Kk2vrx-rlpPg9iEsiwQmaiBTb-HwAyHV8gfTOTzyu_0DHSuqnmVhRCC83MM_ZZ82vebY3Yx

// curl --request GET \
//      --url https://api.yelp.com/v3/events/awesome-event \
//      --header 'Authorization: Bearer API_KEY' \
//      --header 'accept: application/json'





//Bing maps



//Al7OdiPyzEykkQtq9N0tfF2-85LosZCbAMvSxWxZ0nREKBqTififdRTwb_Zai0pK

https://spatial.virtualearth.net/REST/v1/data/a1b18b9f4d024416afd5643c2e1f6d4e/Bing/FourthCoffeeShops	