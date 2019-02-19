console.log('Welcome there! ✌✌');

let countryHolder, amountHolder;
const localKey = 'travel-planner';

const getAllItems = () => {
    // if (localStorage.hasLocalCountry()){
    //     return localStorage.getItem(localKey);
    // }
    // else{
    //     return [];
    // }
    return JSON.parse(localStorage.getItem(localKey)) || [];
};

const addLocalCountry = (key) => { // void / (true || false.)?
    let countries = getAllItems();
    countries.push(key);
    localStorage.setItem(localKey, JSON.stringify(countries));
};

const hasLocalCountry = (key) => { //true false
    // return getAllItems().indexOf(key); // -1 -> not found, else position
    return getAllItems().includes(key);
};

const removeLocalCountries = (key) => { // void / (true || false)?
    const index = getAllItems().indexOf(key);
    let savedCountries = getAllItems();
    savedCountries.splice(index, 1);
    localStorage.setItem(localKey, JSON.stringify(savedCountries));
};

const countCountries = () => { // -> 0 ... 250
    return getAllItems().length;
};

const updateCounter = () => {
    amountHolder.innerHTML = countCountries();
}

const addEventListenersToCountries = (classSelector) => {
    const countries = document.querySelectorAll(classSelector);
    for (const country of countries) {
        country.addEventListener('click', function(){
            const countryKey = this.getAttribute('for');
            if (hasLocalCountry(countryKey)){
                removeLocalCountries(countryKey);
            }
            else{
                addLocalCountry(countryKey); //for bevat de correcte en unieke key
            }
            updateCounter();
        });
    }
    
};

const showCountries = data => {
    console.info(data);
    //#1 loop the data
    let countries = '';
    for (const country of data){
        //#2 build an HTML-string for each country
        countries +=
        `
        <article>
            <input type="checkbox" ${hasLocalCountry(country.alpha2Code) ? 'checked="checked"' : ''} class="o-hide c-country-input" name="" id="${country.alpha2Code}">
            <label for="${country.alpha2Code}" class="c-country js-country">
                <div class="c-country-header">
                    <h2 class="c-country-header__name">${country.name}</h2>
                    <img class="c-country-header__flag" src="${country.flag}" alt="The flag of ${country.name}.">
                </div>
                <p class="c-country__native-name">${country.nativeName}</p>
            </label>
        </article>
        `
        countryHolder.innerHTML = countries;
        console.log('Html is loaded');
        addEventListenersToCountries('.js-country');
    }
};

const fetchCountries = region => {
    fetch(`https://restcountries.eu/rest/v2/region/${region}`)
    .then(r => r.json())
    .then(data => showCountries(data))
    .catch(err => console.error(`an error has occured 🤷‍, ${err}`));
    
};

const enableListeners = () => {
    // #1 Get some buttons
    const regionButtons = document.querySelectorAll('.js-region-select');
    // #2 Listen to the clicks
    for (const button of regionButtons){
        button.addEventListener('click', function(){
            // #2.1 Look up the data property
            const region = this.getAttribute('data-region');
            // #2.2 Get data from the API
            fetchCountries(region);
        });
    }
    countryHolder = document.querySelector('.js-country-holder');
    amountHolder = document.querySelector('.js-amount');
    //Always start with Europe.
    fetchCountries('europe');
};

const init = () => {
    console.log('de DOM is geladen 👌')
    enableListeners();
    updateCounter();
};

document.addEventListener('DOMContentLoaded', init);