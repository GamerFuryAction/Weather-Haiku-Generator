const haikuLibrary = {
    sunny: [
        "Golden beams of light,\nShadows dance upon the grass,\nWarmth hugs everything.",
        "Sunlight drinks the dew,\nBright blue sky without a care,\nSummer whispers close."
    ],
    rainy: [
        "Gray clouds heavy now,\nTears of sky fall on the glass,\nQuiet, dripping world.",
        "Puddles catch the sky,\nSoft rhythm on the rooftop,\nBlanket, tea, and rest."
    ],
    cloudy: [
        "Blanket made of gray,\nSun is hiding out of sight,\nSoft light fills the day.",
        "Silver overhead,\nWhispering of hidden light,\nCool winds start to blow."
    ],
    snowy: [
        "White dust falls so soft,\nWorld is wearing a cold coat,\nSilence everywhere.",
        "Ice stars from the sky,\nBreathing crystals in the air,\nFireplace calls me home."
    ],
    default: [
        "The sky does its thing,\nChanges mind from hour to hour,\nBeautiful always."
    ]
};

const weatherDescriptions = {
    0: "Clear",
    1: "Mainly clear",
    2: "Partly cloudy",
    3: "Overcast",
    45: "Foggy",
    48: "Rime fog",
    51: "Light drizzle",
    53: "Moderate drizzle",
    55: "Dense drizzle",
    56: "Freezing drizzle",
    57: "Freezing drizzle",
    61: "Light rain",
    63: "Moderate rain",
    65: "Heavy rain",
    66: "Freezing rain",
    67: "Freezing rain",
    71: "Light snow",
    73: "Moderate snow",
    75: "Heavy snow",
    77: "Snow grains",
    80: "Rain showers",
    81: "Heavy showers",
    82: "Violent showers",
    85: "Snow showers",
    86: "Heavy snow showers",
    95: "Thunderstorm",
    96: "Stormy",
    99: "Stormy"
};

function getRandomHaiku(weatherType) {
    const list = haikuLibrary[weatherType] || haikuLibrary.default;
    const randomIndex = Math.floor(Math.random() * list.length);
    return list[randomIndex];
}

function degToCompass(deg) {
    const directions = ["N", "NE", "E", "SE", "S", "SW", "W", "NW"];
    return directions[Math.round(deg / 45) % 8];
}

function interpretWeather(code) {
    let type = 'default';
    let bgGradient = "linear-gradient(to bottom, #e0eafc, #cfdef3)";
    let mood = "Mysterious Sky";

    if (code === 0 || code === 1) {
        type = 'sunny';
        bgGradient = "linear-gradient(to bottom, #fff200, #ff6f61)";
        mood = "Sunshine Mode";
    } else if (code === 2 || code === 3) {
        type = 'cloudy';
        bgGradient = "linear-gradient(to bottom, #98a8c4, #4f5d75)";
        mood = "Cloudy Vibes";
    } else if (code >= 51 && code <= 67) {
        type = 'rainy';
        bgGradient = "linear-gradient(to bottom, #6db4ff, #2a4d69)";
        mood = "Rainy Mood";
    } else if (code >= 71 && code <= 86) {
        type = 'snowy';
        bgGradient = "linear-gradient(to bottom, #dbe7ff, #4d648d)";
        mood = "Snowflake Time";
    }

    return { type, bgGradient, mood };
}

function updateWeatherUI(weather) {
    const desc = weatherDescriptions[weather.weathercode] || 'Mystery Weather';
    const details = interpretWeather(weather.weathercode);
    document.body.style.background = details.bgGradient;
    document.getElementById('location-text').innerText = `${desc} · ${details.mood}`;
    document.getElementById('haiku-text').innerText = getRandomHaiku(details.type);
    document.getElementById('temp-val').innerText = `${Math.round(weather.temperature)}°C`;
    document.getElementById('wind-val').innerText = `${Math.round(weather.windspeed)} km/h ${degToCompass(weather.winddirection)}`;
    document.getElementById('desc-val').innerText = desc;
    document.getElementById('weather-info').style.display = 'grid';
}

function getWeather() {
    document.getElementById('location-text').innerText = 'Looking up your sky...';
    document.getElementById('haiku-text').innerText = 'Wait up, chill weather is loading...';
    document.getElementById('weather-info').style.display = 'none';

    if (!navigator.geolocation) {
        document.getElementById('location-text').innerText = 'Geolocation not ready';
        document.getElementById('haiku-text').innerText = 'No location access, so no sky show.';
        return;
    }

    navigator.geolocation.getCurrentPosition((position) => {
        const lat = position.coords.latitude;
        const lon = position.coords.longitude;

        fetch(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true`)
            .then(response => response.json())
            .then(data => {
                updateWeatherUI(data.current_weather);
            })
            .catch(() => {
                document.getElementById('location-text').innerText = 'Data glitch';
                document.getElementById('haiku-text').innerText = 'The weather API is on break. Try again soon.';
            });
    }, () => {
        document.getElementById('location-text').innerText = 'Location Denied';
        document.getElementById('haiku-text').innerText = 'Can’t see your location, but good vibes still count.';
    });
}

document.getElementById('refresh-btn').addEventListener('click', getWeather);
getWeather();