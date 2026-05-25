// 1. Haiku Data
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

function getRandomHaiku(weatherType) {
    const list = haikuLibrary[weatherType] || haikuLibrary.default;
    const randomIndex = Math.floor(Math.random() * list.length);
    return list[randomIndex];
}

// 2. Fetching Data
function getWeather() {
    document.getElementById('haiku-text').innerText = "Consulting the stars...\n(via npm & Vite!)";
    
    navigator.geolocation.getCurrentPosition(
        (position) => {
            const lat = position.coords.latitude;
            const lon = position.coords.longitude;
            
            fetch(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true`)
                .then(response => response.json())
                .then(data => {
                    interpretWeather(data.current_weather.weathercode);
                })
                .catch(() => {
                    document.getElementById('haiku-text').innerText = "The clouds blocked the data.\nTry refreshing again!";
                });
        },
        () => {
            document.getElementById('location-text').innerText = "Location Denied";
            document.getElementById('haiku-text').innerText = "Can't see your code,\nTell me where you are living,\nOr enjoy this prompt.";
        }
    );
}

// 3. Update the UI
function interpretWeather(code) {
    let type = 'default';
    let bgGradient = "linear-gradient(to bottom, #e0eafc, #cfdef3)";
    
    if (code === 0 || code === 1) {
        type = 'sunny';
        bgGradient = "linear-gradient(to bottom, #fffc00, #ff851b)";
        document.getElementById('location-text').innerText = "Bright Skies";
    } else if (code === 2 || code === 3) {
        type = 'cloudy';
        bgGradient = "linear-gradient(to bottom, #bdc3c7, #2c3e50)";
        document.getElementById('location-text').innerText = "Overcast Sky";
    } else if (code >= 51 && code <= 67) {
        type = 'rainy';
        bgGradient = "linear-gradient(to bottom, #61a0a3, #3b5998)";
        document.getElementById('location-text').innerText = "Rain Falling";
    } else if (code >= 71 && code <= 86) {
        type = 'snowy';
        bgGradient = "linear-gradient(to bottom, #e6dada, #274046)";
        document.getElementById('location-text').innerText = "Frozen Sky";
    } else {
        type = 'default';
        document.getElementById('location-text').innerText = "Mysterious Weather";
    }

    document.body.style.background = bgGradient;
    document.getElementById('haiku-text').innerText = getRandomHaiku(type);
}

// 4. Setup Event Listeners
document.getElementById('refresh-btn').addEventListener('click', getWeather);

// Run automatically on load
getWeather();