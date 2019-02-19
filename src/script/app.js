console.log('Welcome there! ✌✌');

let countryHolder;
const localKey = 'travel-planner';



const addLocalCountry = (key) => { // void / (true || false.)?
    
};

const hasLocalCountry = (key) => { //true false

};

const removeLocalCountries = (key) => { // void / (true || false)?

};

const countCountries = () => { // -> 0 ... 250

};

const addEventListenersToCountries = (classSelector) => {
    const countries = document.querySelectorAll(classSelector);
    for (const country of countries) {
        country.addEventListener('click', function(){
            console.log('you clicked me ✌', this);
            addLocalCountry();
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
            <input type="checkbox" class="o-hide c-country-input" name="" id="${country.alpha2Code}">
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

    //Always start with Europe.
    fetchCountries('europe');
};

const enableCounter = () => {
    const counterLabel = document.querySelector('.js-amount');
    counterLabel.innerHTML = 0;
}

const init = () => {
    console.log('de DOM is geladen 👌')
    enableListeners();
    getLocalCountries();
};

document.addEventListener('DOMContentLoaded', init);