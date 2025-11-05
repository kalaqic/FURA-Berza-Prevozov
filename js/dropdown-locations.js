/**
 * Dropdown location selector for FURA website
 * Replaces autocomplete with select dropdowns
 */

document.addEventListener('DOMContentLoaded', function() {
    // Wait for translations to be available
    function initializeDropdowns() {
        // Use location data from the global window.locationData
        const countries = window.locationData ? window.locationData.countries : [];
        const citiesByCountry = window.locationData ? window.locationData.citiesByCountry : {};
    
    // Initialize country dropdowns
    const fromCountrySelect = document.getElementById('fromCountry');
    const toCountrySelect = document.getElementById('toCountry');
    const fromCitySelect = document.getElementById('fromCity');
    const toCitySelect = document.getElementById('toCity');
    
    // Initially disable city dropdowns
    if (fromCitySelect) fromCitySelect.disabled = true;
    if (toCitySelect) toCitySelect.disabled = true;
    
    // Populate country dropdowns
    if (fromCountrySelect) {
        populateCountryDropdown(fromCountrySelect, countries);
        fromCountrySelect.addEventListener('change', function() {
            updateCityDropdown(fromCitySelect, this.value, citiesByCountry);
        });
    }
    
    if (toCountrySelect) {
        populateCountryDropdown(toCountrySelect, countries);
        toCountrySelect.addEventListener('change', function() {
            updateCityDropdown(toCitySelect, this.value, citiesByCountry);
        });
    }
    
    // Function to populate country dropdown
    function populateCountryDropdown(selectElement, countries) {
        // Clear existing options except the first one
        while (selectElement.children.length > 1) {
            selectElement.removeChild(selectElement.lastChild);
        }
        
        // Add country options with translation
        countries.forEach(country => {
            const option = document.createElement('option');
            option.value = country;
            // Store original country name and translate display text
            option.setAttribute('data-original', country);
            option.textContent = translateCountry ? translateCountry(country) : country;
            selectElement.appendChild(option);
        });
    }
    
    // Function to update city dropdown based on selected country
    function updateCityDropdown(citySelectElement, selectedCountry, citiesByCountry) {
        // Clear existing options except the first one
        while (citySelectElement.children.length > 1) {
            citySelectElement.removeChild(citySelectElement.lastChild);
        }
        
        // Reset city selection
        citySelectElement.value = '';
        
        if (selectedCountry && citiesByCountry[selectedCountry]) {
            // Enable city dropdown and populate with cities
            citySelectElement.disabled = false;
            const cities = citiesByCountry[selectedCountry];
            cities.forEach(city => {
                const option = document.createElement('option');
                option.value = city;
                option.textContent = city;
                citySelectElement.appendChild(option);
            });
        } else {
            // Disable city dropdown if no country selected
            citySelectElement.disabled = true;
        }
    }
    
    // Add swap functionality
    const swapButton = document.getElementById('swapLocationsBtn');
    if (swapButton) {
        swapButton.addEventListener('click', function() {
            const fromCountry = document.getElementById('fromCountry');
            const toCountry = document.getElementById('toCountry');
            const fromCity = document.getElementById('fromCity');
            const toCity = document.getElementById('toCity');
            
            if (fromCountry && toCountry && fromCity && toCity) {
                // Store current values
                const tempFromCountry = fromCountry.value;
                const tempFromCity = fromCity.value;
                const tempToCountry = toCountry.value;
                const tempToCity = toCity.value;
                
                // Swap countries
                fromCountry.value = tempToCountry;
                toCountry.value = tempFromCountry;
                
                // Trigger change events to update city dropdowns
                fromCountry.dispatchEvent(new Event('change'));
                toCountry.dispatchEvent(new Event('change'));
                
                // Wait for city dropdowns to be populated, then swap cities
                setTimeout(() => {
                    fromCity.value = tempToCity;
                    toCity.value = tempFromCity;
                }, 50);
            }
        });
    }
    
    // Function to retranslate all dropdowns when language changes
    function retranslateDropdowns() {
        // Update country dropdown placeholder texts
        const countrySelects = document.querySelectorAll('.country-select');
        countrySelects.forEach(select => {
            const firstOption = select.querySelector('option[value=""]');
            if (firstOption && typeof t === 'function') {
                firstOption.textContent = t('selectCountry');
            }
            
            // Retranslate country options
            const options = select.querySelectorAll('option[data-original]');
            options.forEach(option => {
                const originalCountry = option.getAttribute('data-original');
                if (originalCountry && typeof translateCountry === 'function') {
                    option.textContent = translateCountry(originalCountry);
                }
            });
        });
        
        // Update city dropdown placeholder texts
        const citySelects = document.querySelectorAll('.city-select');
        citySelects.forEach(select => {
            const firstOption = select.querySelector('option[value=""]');
            if (firstOption && typeof t === 'function') {
                firstOption.textContent = t('selectCity');
            }
        });
    }
    
    // Make functions available globally for external use
    window.populateCountryDropdown = populateCountryDropdown;
    window.updateCityDropdown = updateCityDropdown;
    window.retranslateDropdowns = retranslateDropdowns;
    }
    
    // Initialize immediately or wait for translations
    if (typeof window.translateCountry === 'function') {
        initializeDropdowns();
    } else {
        // Wait a bit for translations to load
        setTimeout(initializeDropdowns, 100);
    }
});