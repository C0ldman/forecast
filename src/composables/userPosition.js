import {
  ref
} from "vue";

let lat = 0;
let lon = 0;

export const useUserPosition = () => {
  const apikey = import.meta.env.VITE_LOCATION_API_KEY;

    return fetch(`https://api.geoapify.com/v1/ipinfo?&apiKey=${apikey}`, )
    .then(response => response.json())
    .catch(error => console.log('error', error));
}