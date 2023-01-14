import './css/styles.css';
import { fetchCountries } from './fetchCountries.js';
import _ from 'lodash';
import Notiflix from 'notiflix';
const DEBOUNCE_DELAY = 300;
let searchInput = document.querySelector("#search-box");
const listOfCountries = document.querySelector(".country-list");
const countryInfo = document.querySelector(".country-info");

function renederListOfCountry(name) {
    const list = name.map((el, i) => {
        return `<li class="country-item"><img class="country-image" src=${name[i].flags.svg} /><p class="country-name">${name[i].name.official}</p></li>`;
    }).join("");
    listOfCountries.innerHTML = list;
}

function renederInfoOfCountry(name) {
    renederListOfCountry(name);
    const info = name.map((el, i) => {
        return `<p class="country-capital"><b>Capital:</b> ${name[i].capital}</p>
       <p class="country-population"><b>Population:</b> ${name[i].population}</p>
       <p class="country-languages"><b>Languages:</b> ${name[i].languages}</p>`
   }).join("");
   countryInfo.innerHTML = info;
}

const searchCountry = event => {
    let name = event.target.value.trim();
    if (name === "") {
        listOfCountries.innerHTML = "";
        countryInfo.innerHTML = "";
        return;
    }
    fetchCountries(name)
     .then((name) => {
        if (name.length > 10) {
            Notiflix.Notify.info("Too many matches found. Please enter a more specific name."); 
        } else if (name.length >= 2 && name.length <= 10) {
            renederListOfCountry(name);
            countryInfo.innerHTML = "";    
        } else if (name.length = 1) {
            renederInfoOfCountry(name);
        }
    })
     .catch((error) => {
        (Notiflix.Notify.failure("Oops, there is no country with that name"));
     });
}
searchInput.addEventListener("input", _.debounce(searchCountry,DEBOUNCE_DELAY));