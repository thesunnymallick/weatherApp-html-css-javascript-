
const tempeature = document.getElementById("temp")
const icon = document.getElementById("icon")
const icon_text = document.getElementById("icon-text")
const cityFiled = document.getElementById("cityFiled")
const date = document.getElementById("date")
const form = document.getElementById("form")
const searchInput = document.getElementById("searchInput")



let target = "kolkata"

const fetchWeather = async (target) => {

    try {
        let url = `https://api.weatherapi.com/v1/current.json?key=ad451647f3ff4ab4af895511231202&q=${target}`
        const response = await fetch(url);
        const data = await response.json()
        console.log(data);

        const {
            current: { temp_c, condition: { icon, text } },
            location: { name, localtime }
        } = data


        updateDom(temp_c, name, icon, text, localtime);

    } catch (error) {
        alert("location Not Found")
    }

}

function updateDom(temp, city, iconImg, iconText, time) {
    tempeature.innerText = temp + "°"
    cityFiled.innerHTML = city;
    icon.src = iconImg;
    icon_text.innerHTML = iconText;
    const exactTime = time.split(" ")[1]
    const exactDate = time.split(" ")[0]
    const exactDay = GetDay(new Date().getDay());

    date.innerHTML = `${exactTime} - ${exactDay} - ${exactDate}`;

}

fetchWeather(target);

const GetDay = (day) => {
    switch (day) {
        case 0:
            return "Sunday"
        case 1:
            return "Monday"
        case 2:
            return "Tuesday"
        case 3:
            return "Wednesday"
        case 4:
            return "Thursday"
        case 5:
            return "Friday"
        case 6:
            return "Saturday"


        default:
            break;
    }



}

const search = (e) => {
    e.preventDefault();

    target = searchInput.value
    fetchWeather(target)
}

form.addEventListener("submit", search)