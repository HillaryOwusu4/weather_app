let api = {
    key: "06866ab63c1f22fa974cd153a07099ee",
    base: "https://api.openweathermap.org/data/2.5/",
    lon: 0.0,
    lat: 0.0
}

navigator.geolocation.getCurrentPosition(({ coords }) => {
    api = {...api, lon: coords.longitude, lat: coords.latitude }
})

const searchbox = document.getElementById('search-box');

// let datalist = document.createElement(`datalist`);
// convertToSimpleCities().forEach(city => {
//     let aNode = document.createElement('option').value = city
//     datalist.append(aNode)
// })

// searchbox.append(datalist)

searchbox.addEventListener('keypress', setQuery);

// optionNode.addEventListener('onclick', setQuery);

function setQuery(evt) {
    if (evt.charCode == 13) {
        getResults(searchbox.value);
        // console.log(searchbox.value)
    }
}

function getResults(query) {
    fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)
        .then(weather => {
            return weather.json();
        }).then(displayResults).catch(display_404);
}

function displayResults(weather) {
    let location1 = document.querySelector('.current');
    let current1 = document.querySelector('.location');
    let city = document.querySelector('.location .city');
    let date = document.querySelector('.location .date');
    let temp = document.querySelector('.current .temp');
    let weather_el = document.querySelector('.current .weather');
    let hilow = document.querySelector('.hi-low');
    let not_found = document.querySelector('.current .notFound');
    try {
        location1.style.visibility = 'visible';
        current1.style.visibility = 'visible';
        not_found.style.visibility = 'hidden';
        city.innerText = `${weather.name}, ${weather.sys.country}`;

        let now = new Date();
        date.innerText = dateBuilder(now);
        temp.innerHTML = `${Math.round(weather.main.temp)}<span>°C</span>`;
        weather_el.innerText = weather.weather[0].main;
        hilow.innerText = `${Math.round( weather.main.temp_min)}°C/${Math.round(weather.main.temp_max)}°C`

    } catch (err) {
        console.log(err);
        not_found.innerHTML = 'Please area inputed is not right'
        location1.style.visibility = 'hidden';
        current1.style.visibility = 'hidden';
        not_found.style.visibility = 'visible';

    }
}

function display_404(error) {
    console.log(error)
}

function dateBuilder(d) {
    let months = [
        'January',
        'February',
        'March',
        'April',
        'May',
        'June',
        'July',
        'August',
        'September',
        'October',
        'November',
        'December'
    ];
    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear()

    return `${day} ${date} ${month} ${year}`;

}

// function cities() {
//     return convertToSimpleCities()
// }