// Мой API ключ
const API_KEY = "11c5bb34404731231ac094ed2f7c612f";

// Прочие переменный
var selected_city = undefined;
var now_date = new Date();

// Переменные значений погоды
var city = undefined;
var temp = undefined;
var weather = undefined;
var weather_icon = undefined;
var date = undefined;

// Отслеживаем отправку запроса от пользователя
addEventListener("keydown", function (e) {
    if(e.which === "13"){ select_city(); }
})
// Функция выполнения запроса от пользователя
function select_city(){
    selected_city = document.querySelector('.form__input').value;
    // Проверяем не отправил ли пользователь пустую строку
    if(selected_city === ""){
        document.querySelector(".error").innerHTML = "Сначала введите имя города"
        return;
    }
    // Отправляем запрос на файл с погодой
    fetch("https://api.openweathermap.org/data/2.5/weather?q=" + selected_city + "&APPID=" + API_KEY)
    .then(function(resp){
        return resp.json();
    })
    .then(function (data) {
        // Проверка на наличие введенного пользователем города
        if(data.cod === 404){
            document.querySelector(".error").innerHTML = "Такой город не найден. Попробуйте снова";
            return;
        }
        else{
            document.querySelector(".error").innerHTML = "";
        }
        // Устанавливаем значения для переменных погоды
        city = data.name + ", " + data.sys.country;
        temp = Math.round(data.main.temp - 273,15) + "°";
        weather = data.weather[0].description;
        weather_icon = '<img src="http://openweathermap.org/img/wn/' + data.weather[0].icon + '@2x.png" alt="" class="weather-info__icon"/>';
        date = "Сейчас";
        submit();
    })
}

// Функция отправки данных на сайт
function submit() {
    // Получаем переменные блоков в которые нужно вставить информацию
    var city_block = document.getElementById("city");
    var temp_block = document.getElementById("temp");
    var weather_block = document.getElementById("weather");
    var date_block = document.getElementById("date");
    // Отправляем информацию на сайт
    city_block.innerHTML = city;
    temp_block.innerHTML = temp;
    weather_block.innerHTML = weather + weather_icon;
    date_block.innerHTML = date;
}

select_city();