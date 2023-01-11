import './css/styles.css';
import { fetchCountries } from './fetchCountries.js';
import _ from 'lodash';
import Notiflix from 'notiflix';
const DEBOUNCE_DELAY = 300;
let searchInput = document.querySelector("#search-box");
const listOfCountries = document.querySelector(".country-list");
const countryInfo = document.querySelector(".country-info");

searchInput.addEventListener("input", _.debounce(() => {
    fetchCountries()
    .then((name) => console.log(name))
    .catch((error) => console.log(error));
    }, DEBOUNCE_DELAY)
);