import {
    appendCarousel,
    clear,
    createCarouselItem,
    start,
} from "./Carousel.js";

// import axios from "axios";

// The breed selection input element.
const breedSelect = document.getElementById("breedSelect");
// The information section div element.
const infoDump = document.getElementById("infoDump");
// The progress bar div element.
const progressBar = document.getElementById("progressBar");
// The get favourites button element.
const getFavouritesBtn = document.getElementById("getFavouritesBtn");

// Step 0: Store your API key here for reference and easy access.
const API_KEY =
    "live_oYy2dWvJzmU1YEKnTOcf707nAjtTTrqmWZNMdcTmbFZDH1CMBDOsdhVYbxMsXcsX";

/**
 * 1. Create an async function "initialLoad" that does the following:
 * - Retrieve a list of breeds from the cat API using fetch().
 * - Create new <options> for each of these breeds, and append them to breedSelect.
 *  - Each option should have a value attribute equal to the id of the breed.
 *  - Each option should display text equal to the name of the breed.
 * This function should execute immediately.
 */

const headers = new Headers({
    "Content-Type": "application/json",
    "x-api-key": API_KEY,
});

const requestOptions = {
    method: "GET",
    headers: headers,
    redirect: "follow",
};

// .then(response => response.text())
// .then(result => console.log(result))
// .catch(error => console.log('error', error));

initialLoad();

async function initialLoad() {
    try {
        const response = await fetch(
            "https://api.thecatapi.com/v1/images/search?size=med&mime_types=jpg&format=json&has_breeds=true&order=RANDOM&page=0&limit=5",
            requestOptions
        );

        // const response = await axios.get("https://api.thecatapi.com/v1/images/search?size=med&mime_types=jpg&format=json&has_breeds=true&order=RANDOM&page=0&limit=5")
        console.log(response)
        if (!response.ok) {
            throw `Response status: ${response.status}`;
        }
        const result = await response.json();
        console.log(result);

        result.forEach((element) => {
            const option = breedSelect.appendChild(
                document.createElement("option")
            );
            option.value = element.breeds[0].id;
            option.textContent = element.breeds[0].name;
        });

        carouselChange(breedSelect.value);

        console.log(breedSelect);
    } catch (error) {
        console.log(error);
    }
}