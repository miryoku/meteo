let toggle = document.querySelector("#toggle")
let option = document.querySelector('#option')
const key = "9dcc3d3dfebeb90adb26b7c0fd7126de"
let town = "maurage"
const url = "https://api.openweathermap.org/data/2.5/weather?q=" + town + "&appid=" + key + "&units=metric"

const city = document.getElementById("city");
city.addEventListener("click", (e) => {

	if (document.getElementById("cityValue").value != "") {
		const urlButton = "https://api.openweathermap.org/data/2.5/weather?q=" + document.getElementById("cityValue").value + "&appid=" + key + "&units=metric"
		AppeleAsync(urlButton, mapData)
		toggles()
	}

})




function meteo(parent, meteo) {
	const element = document.createElement("div")
	element.className = meteo;
	parent.append(element);
}

function meteoDetail(parent, meteo, meteoChild) {
	const element = document.createElement("div")
	element.className = meteo;
	parent.append(element);
	const parent2 = document.querySelector("." + meteo)
	const parent3 = document.querySelector("." + meteo)
	const elementChild = document.createElement("div");
	elementChild.className = meteoChild;
	const elementChild2 = document.createElement("div");
	elementChild2.className = meteoChild;
	parent2.append(elementChild)
	parent3.append(elementChild2)
}


navigator.geolocation.getCurrentPosition(function (position) {

	const urlCoord = "https://api.openweathermap.org/data/2.5/find?lat=" + position.coords.latitude + "&lon=" + position.coords.longitude + "&cnt=1&appid=" + key + "&units=metric"
	//AppeleAsync(urlCoord,createIconMeteo)
	const urlWeather = "https://api.openweathermap.org/data/2.5/weather?lat=" + position.coords.latitude + "&lon=" + position.coords.longitude + "&appid=" + key + "&units=metric"
	AppeleAsync(urlWeather, mapData)
});

function AppeleAsync(ressource, callback, data) {
	var xhr = new XMLHttpRequest();
	Async(xhr, callback)
	xhr.open("GET", ressource, true);
	xhr.responseType = "json"
	xhr.send(data);
}

function Async(xhr, callback) {
	xhr.onreadystatechange = function () {

		if (this.readyState == 4 && this.status == 200) {
			var res = this.response;

			if (res) {
				delElement();
				callback(res)
			}
			else {
				console.log(res.msg);
			}
		}
		else if (this.response) {
			console.log("une erreur est survenue ...");


		}
	};
}
function mapData(data) {

	var meteo = {
		weatherMain: data.weather[0].main,
		weatherDescription: data.weather[0].description,
		name: data.name,
		country: data.sys.country,
		temp: data.main.temp,
		tempMax: data.main.temp_max,
		tempMin: data.main.temp_min,
		windSpeed: data.wind.speed,
		sunrise: data.sys.sunrise,
		sunset: data.sys.sunset,
		datetime: data.dt,
	}
	document.title=meteo.name
	
	createIconMeteo(meteo)

}

function delElement() {

	const body = document.querySelector(".containerMain").childNodes;
	const tab = []
	body.forEach(element => {
		tab.push(element)
	});
	for (let i = 0; i < tab.length; i++) {
		tab[i].remove()
	}

}

function createIconMeteo(data) {
	console.log(data)
	const body = document.querySelector(".containerMain");
	const div = document.createElement("div");
	div.className = "el"
	body.append(div)
	const divContainer = document.createElement("div");
	divContainer.className = "container2";
	div.append(divContainer)

	const h1 = document.createElement("h1");
	h1.innerText = data.temp
	h1.className = "containerItem"
	divContainer.append(h1)
	const p1 = document.createElement("p");
	p1.innerText = "Min/Max : " + data.tempMin + "/" + data.tempMax
	p1.className = "containerItem"
	divContainer.append(p1)




	switchMeteo(data.weatherMain)
	const p = document.createElement("p");
	p.innerText = data.weatherDescription
	div.append(p)



	const divContainer2 = document.createElement("div");
	divContainer2.className = "container2"
	div.append(divContainer2)
	const pTown = document.createElement("p");
	pTown.className = "containerItem"
	pTown.innerText = data.name + " ," + data.country
	divContainer2.append(pTown)
	const phour = document.createElement("p");
	phour.className = "containerItem"
	const date = new Date(data.datetime * 1000)
	phour.innerText = date.getHours() + " : " + date.getMinutes()
	divContainer2.append(phour)
	const pSunrise = document.createElement("p");
	pSunrise.className = "containerItem"
	const sunrise = new Date(data.sunrise * 1000)
	pSunrise.innerText = "Sunrise : " + sunrise.getHours() + " : " + sunrise.getMinutes()
	divContainer2.append(pSunrise)
	const pSunset = document.createElement("p");
	pSunset.className = "containerItem"
	const sunset = new Date(data.sunset * 1000)
	pSunset.innerText = "Sunset : " + sunset.getHours() + " : " + sunset.getMinutes()
	divContainer2.append(pSunset)


}

function switchMeteo(name) {
	const containers = document.querySelectorAll(".el");
	const container = containers[containers.length - 1]
	const div = document.createElement("div");
	div.className = "icon";
	container.append(div);
	const icons = document.querySelectorAll(".icon")
	const icon = icons[icons.length - 1]
	switch (name.toUpperCase()) {
		case "RAIN":
		case "DRIZZLE":
			meteo(icon, "cloud")
			meteo(icon, "rain")
			break;
		case "CLOUDS":
			meteo(icon, "cloud");
			meteoDetail(icon, "sun", "rays")
			break;
			break;
		case "MIST":
		case "HAZE":
		case "FOG":
		case "SAND":
		case "DUST":
		case "SMOKE":
			meteo(icon, "cloud")
			meteo(icon, "cloud")
			break;
		case "CLEAR":
			meteoDetail(icon, "sun", "rays")
			break;
		case "SNOW":
			meteo(icon, "cloud")
			meteoDetail(icon, "snow", "flake")
			break;
		case "THUNDERSTORM":
			meteo(icon, "cloud")
			meteoDetail(icon, "lightning", "bolt")
			break;
		default:
			/*animation a ajoute*/
			console.log("s")
			break;
	}
}


toggle.addEventListener('click', () => {
	toggles()
})

function toggles() {
	if (toggle.className === "") {
		toggle.className = "on"
		option.style.display = "block"
		option.className = "on"
	} else {
		toggle.className = ""
		option.style.display = "none"
		option.className = ""

	}
}
