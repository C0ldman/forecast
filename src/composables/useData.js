import {
  ref
} from "vue";

export default function useData() {
  const apikey = import.meta.env.VITE_WEATHER_API_KEY;
  const language = navigator.language || 'en';

  const isForecastLoading = ref(false);
  const isSuggestionLoading = ref(false);

  const getForecastByPosition = async function (latitude, longitude) {
    isForecastLoading.value=true;
    return fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&lang=${language.value}&units=metric&appid=${apikey}`)
    .then((res) => res.json())
    .catch((err) => console.log(err))
    .finally(() => isForecastLoading.value=false);
  }

  const updateSuggestions = async function (value) {
    if (!value.length) return;
    const city = value[0].toUpperCase() + value.slice(1);
    isSuggestionLoading.value=true;
    return fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=40&appid=${apikey}`)
    .then((res) => res.json())
    .catch((err) => {
      console.log(err);
    })
    .finally(() => isSuggestionLoading.value=false);
  }

  const cityByCoords = async function (latitude, longitude) {
    return fetch(`http://api.openweathermap.org/geo/1.0/reverse?lat=${latitude}&lon=${longitude}&appid=${apikey}`)
    .then((res) => res.json());
  }

  const hourlyTemperatureForecast = async function (latitude, longitude) {
    return fetch(`http://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&units=metric&appid=${apikey}`)
    .then((res) => res.json());
  }
  return {
    getForecastByPosition,
    isForecastLoading,
    updateSuggestions,
    isSuggestionLoading,
    cityByCoords,
    hourlyTemperatureForecast
  }
}
