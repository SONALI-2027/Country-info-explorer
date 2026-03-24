const searchBtn = document.getElementById("searchBtn")
const searchInput = document.getElementById("searchInput")

const result = document.getElementById("result")
const loading = document.getElementById("loading")
const error = document.getElementById("error")

searchBtn.addEventListener("click", searchCountry)

searchInput.addEventListener("keypress", function(e){
if(e.key === "Enter"){
searchCountry()
}
})

async function searchCountry(){

const country = searchInput.value.trim()

if(!country){
showError("Please enter a country name")
return
}

loading.classList.remove("hidden")
result.classList.add("hidden")
error.classList.add("hidden")

try{


const res = await fetch(
`https://restcountries.com/v3.1/name/${country}?fullText=true`
)

const data = await res.json()

const c = data[0]


document.getElementById("countryName").innerText = c.name.common
document.getElementById("flag").src = c.flags.png
document.getElementById("capital").innerText = c.capital[0]
document.getElementById("population").innerText = 
c.population.toLocaleString('en-IN')

document.getElementById("region").innerText =
`${c.region} / ${c.subregion}`

document.getElementById("languages").innerText =
Object.values(c.languages).join(", ")

document.getElementById("timezone").innerText =
c.timezones[0].toLocaleTimeString()





setCulturalInfo(c.name.common)

getWeather(c.latlng[0], c.latlng[1])

loading.classList.add("hidden")
result.classList.remove("hidden")

}catch{
showError("Country not found")
}

}



function showError(msg){
loading.classList.add("hidden")
error.innerText = msg
error.classList.remove("hidden")
}


function setCulturalInfo(country){

const culture = {

India:{
food:"Biryani, Butter Chicken, Dosa",
clothing:"Saree, Kurta Pajama, Sherwani"
},

Japan:{
food:"Sushi, Ramen, Tempura",
clothing:"Kimono, Yukata"
},

France:{
food:"Croissant, Baguette, Ratatouille",
clothing:"Beret, Breton stripes"
},

USA:{
food:"Burger, Hot Dog, BBQ",
clothing:"Jeans, T-shirt, Cowboy outfit"
},

Italy:{
food:"Pizza, Pasta, Risotto",
clothing:"Tailored suits, dresses"
},

China:{
food:"Dumplings, Peking Duck, Fried Rice",
clothing:"Cheongsam, Hanfu"
},

Mexico:{
food:"Tacos, Burritos, Enchiladas",
clothing:"Sombrero, Huipil, Poncho"
},

Spain:{
food:"Paella, Tapas, Tortilla Española",
clothing:"Flamenco dress, Matador suit"
},

Germany:{
food:"Sausage, Schnitzel, Pretzel",
clothing:"Lederhosen, Dirndl"
},

Korea:{
food:"Kimchi, Bibimbap, Bulgogi",
clothing:"Hanbok"
},

Thailand:{
food:"Pad Thai, Green Curry, Tom Yum",
clothing:"Chut Thai"
},

Turkey:{
food:"Kebab, Baklava, Meze",
clothing:"Kaftan, Şalvar"
},

Brazil:{
food:"Feijoada, Brigadeiro, Pão de queijo",
clothing:"Carnival costume, Sundress"
},

UK:{
food:"Fish and Chips, Roast Beef, Pie",
clothing:"Suit, Trench coat"
},

Russia:{
food:"Borscht, Pelmeni, Blini",
clothing:"Sarafan, Ushanka"
},

Greece:{
food:"Moussaka, Souvlaki, Greek Salad",
clothing:"Fustanella, Folk dress"
},

Australia:{
food:"Meat Pie, Lamington, BBQ",
clothing:"Outback hat, Casual wear"
},

Canada:{
food:"Poutine, Pancakes, Salmon",
clothing:"Flannel shirt, Parka"
},

UAE:{
food:"Shawarma, Machboos, Luqaimat",
clothing:"Kandura, Abaya"
},

Pakistan:{
food:"Biryani, Nihari, Haleem",
clothing:"Shalwar Kameez"
},

Bangladesh:{
food:"Hilsa Curry, Biryani, Pitha",
clothing:"Saree, Panjabi"
},

Nepal:{
food:"Momo, Dal Bhat, Gundruk",
clothing:"Daura Suruwal"
}

}

if(culture[country]){
document.getElementById("food").innerText =
culture[country].food

document.getElementById("clothing").innerText =
culture[country].clothing
}else{
document.getElementById("food").innerText =
"Popular local dishes"

document.getElementById("clothing").innerText =
"Traditional national clothing"
}

}





if(culture[country]){
document.getElementById("food").innerText =
culture[country].food

document.getElementById("clothing").innerText =
culture[country].clothing
}




async function getWeather(lat,lng){

try{

const res = await fetch(
`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lng}&current_weather=true`
)

const data = await res.json()
const c=data.current_weather
document.getElementById("weather").innerText = `The temperature is ${c.temperature} and windspeed: ${c.windspeed}`

}catch{
document.getElementById("weather").innerText =
"Weather not available"
}

}