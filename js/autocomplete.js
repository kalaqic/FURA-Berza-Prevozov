/**
 * Autocomplete functionality for FURA website
 */

// Lista svih dostupnih država
const countries = [
    'Slovenija',
    'Hrvatska',
    'Srbija',
    'Bosna i Hercegovina',
    'Crna Gora',
    'Sjeverna Makedonija',
    'Albanija',
    'Austrija',
    'Italija',
    'Mađarska',
    'Njemačka',
    'Francuska',
    'Švicarska',
    'Španjolska',
    'Portugal',
    'Belgija',
    'Nizozemska',
    'Češka',
    'Slovačka',
    'Poljska',
    'Švedska',
    'Norveška',
    'Finska',
    'Danska',
    'Grčka',
    'Rumunjska',
    'Bugarska',
    'Turska',
    'Ukrajina',
    'Rusija'
];

/**
 * Cities data by country
 */
const citiesByCountry = {
    'Slovenija': [
        'Ljubljana', 'Maribor', 'Celje', 'Kranj', 'Koper', 'Novo Mesto', 
        'Velenje', 'Nova Gorica', 'Ptuj', 'Murska Sobota', 'Domžale', 
        'Škofja Loka', 'Kamnik', 'Jesenice', 'Trbovlje', 'Izola', 
        'Krško', 'Portorož', 'Bled', 'Postojna', 'Brežice', 'Idrija', 
        'Ilirska Bistrica', 'Lendava', 'Radovljica', 'Ajdovščina', 
        'Kočevje', 'Slovenska Bistrica', 'Tržič', 'Grosuplje'
    ],
    'Srbija': [
        'Beograd', 'Novi Sad', 'Niš', 'Kragujevac', 'Subotica', 
        'Pančevo', 'Zrenjanin', 'Šabac', 'Čačak', 'Smederevo', 
        'Novi Pazar', 'Leskovac', 'Užice', 'Kruševac', 'Vranje', 
        'Sombor', 'Valjevo', 'Sremska Mitrovica', 'Jagodina', 
        'Loznica', 'Požarevac', 'Pirot', 'Kikinda', 'Vršac', 
        'Zaječar', 'Kraljevo', 'Bor', 'Prijepolje', 'Kopaonik', 
        'Zlatibor', 'Tara'
    ],
    'Bosna i Hercegovina': [
        'Sarajevo', 'Banja Luka', 'Tuzla', 'Zenica', 'Mostar', 
        'Prijedor', 'Bijeljina', 'Brčko', 'Doboj', 'Bihać', 
        'Trebinje', 'Travnik', 'Cazin', 'Livno', 'Gradiška', 
        'Foča', 'Goražde', 'Srebrenica', 'Bugojno', 'Višegrad', 
        'Konjic', 'Ljubuški', 'Jablanica', 'Gacko', 'Mrkonjić Grad', 
        'Neum', 'Zvornik', 'Sanski Most', 'Velika Kladuša', 'Jajce'
    ]
};

// Default cities for when a country is not found
const defaultCities = [
    'London', 'Paris', 'Berlin', 'Madrid', 'Rome', 'Vienna', 
    'Amsterdam', 'Brussels', 'Prague', 'Warsaw', 'Budapest', 
    'Stockholm', 'Copenhagen', 'Oslo', 'Helsinki', 'Athens', 
    'Lisbon', 'Dublin', 'Zurich', 'Zagreb', 'Skopje', 'Podgorica', 
    'Tirana', 'Bucharest', 'Sofia', 'Istanbul', 'Kiev', 'Moscow'
];

// Function to normalize text (remove diacritics)
function normalizeText(text) {
    // Convert to lowercase
    text = text.toLowerCase();
    
    // Replace diacritics with base characters
    const diacriticsMap = {
        'č': 'c', 'ć': 'c', 'đ': 'd', 'š': 's', 'ž': 'z',
        'ä': 'a', 'á': 'a', 'à': 'a', 'ă': 'a', 'â': 'a',
        'é': 'e', 'è': 'e', 'ê': 'e', 'ë': 'e',
        'í': 'i', 'ì': 'i', 'î': 'i', 'ï': 'i',
        'ö': 'o', 'ó': 'o', 'ò': 'o', 'ô': 'o',
        'ü': 'u', 'ú': 'u', 'ù': 'u', 'û': 'u',
        'ñ': 'n', 'ß': 'ss'
    };
    
    return text.replace(/[čćđšžäáàâăéèêëíìîïöóòôüúùûñß]/g, letter => diacriticsMap[letter] || letter);
}

// Initialize autocomplete when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize autocomplete for country inputs
    const fromCountryInput = document.getElementById('fromCountry');
    const toCountryInput = document.getElementById('toCountry');
    const fromCountryDropdown = document.getElementById('fromCountryDropdown');
    const toCountryDropdown = document.getElementById('toCountryDropdown');
    
    if (fromCountryInput && fromCountryDropdown) {
        setupAutocomplete(fromCountryInput, fromCountryDropdown, countries);
    }
    
    if (toCountryInput && toCountryDropdown) {
        setupAutocomplete(toCountryInput, toCountryDropdown, countries);
    }
    
    // City autocomplete
    const fromCityInput = document.getElementById('fromCity');
    const toCityInput = document.getElementById('toCity');
    const fromCityDropdown = document.getElementById('fromCityDropdown');
    const toCityDropdown = document.getElementById('toCityDropdown');
    
    if (fromCityInput && fromCityDropdown && fromCountryInput) {
        // Initial cities based on default country
        const initialFromCountry = fromCountryInput.value;
        const initialFromCities = citiesByCountry[initialFromCountry] || defaultCities;
        
        setupCityAutocomplete(fromCityInput, fromCityDropdown, initialFromCities);
        
        // Update cities when country changes
        fromCountryInput.addEventListener('change', function() {
            const selectedCountry = this.value;
            const cities = citiesByCountry[selectedCountry] || defaultCities;
            setupCityAutocomplete(fromCityInput, fromCityDropdown, cities);
        });
    }
    
    if (toCityInput && toCityDropdown && toCountryInput) {
        // Initial cities based on default country
        const initialToCountry = toCountryInput.value;
        const initialToCities = citiesByCountry[initialToCountry] || defaultCities;
        
        setupCityAutocomplete(toCityInput, toCityDropdown, initialToCities);
        
        // Update cities when country changes
        toCountryInput.addEventListener('change', function() {
            const selectedCountry = this.value;
            const cities = citiesByCountry[selectedCountry] || defaultCities;
            setupCityAutocomplete(toCityInput, toCityDropdown, cities);
        });
    }
});

// Set up autocomplete for an input
function setupAutocomplete(input, dropdown, options) {
    // Add event listener for input changes
    input.addEventListener('input', function() {
        const inputValue = this.value;
        showDropdown(dropdown, filterOptions(options, inputValue), input);
    });
    
    // Add event listener for focus
    input.addEventListener('focus', function() {
        if (this.value.length > 0) {
            showDropdown(dropdown, filterOptions(options, this.value), input);
        }
    });
    
    // Close dropdown when clicking outside
    document.addEventListener('click', function(event) {
        if (!input.contains(event.target) && !dropdown.contains(event.target)) {
            dropdown.style.display = 'none';
        }
    });
    
    // Handle keyboard navigation
    input.addEventListener('keydown', function(e) {
        const activeOption = dropdown.querySelector('.autocomplete-option.active');
        
        if (e.key === 'ArrowDown') {
            e.preventDefault();
            if (!activeOption) {
                const firstOption = dropdown.querySelector('.autocomplete-option');
                if (firstOption) {
                    firstOption.classList.add('active');
                }
            } else {
                const nextOption = activeOption.nextElementSibling;
                if (nextOption) {
                    activeOption.classList.remove('active');
                    nextOption.classList.add('active');
                }
            }
        } else if (e.key === 'ArrowUp') {
            e.preventDefault();
            if (activeOption) {
                const prevOption = activeOption.previousElementSibling;
                if (prevOption) {
                    activeOption.classList.remove('active');
                    prevOption.classList.add('active');
                }
            }
        } else if (e.key === 'Enter') {
            if (activeOption) {
                e.preventDefault();
                input.value = activeOption.textContent;
                dropdown.style.display = 'none';
                
                // If this is a country input, update city options
                if (input.id === 'fromCountry') {
                    const cityInput = document.getElementById('fromCity');
                    const cityDropdown = document.getElementById('fromCityDropdown');
                    if (cityInput && cityDropdown) {
                        const cities = citiesByCountry[activeOption.textContent] || defaultCities;
                        setupCityAutocomplete(cityInput, cityDropdown, cities);
                    }
                } else if (input.id === 'toCountry') {
                    const cityInput = document.getElementById('toCity');
                    const cityDropdown = document.getElementById('toCityDropdown');
                    if (cityInput && cityDropdown) {
                        const cities = citiesByCountry[activeOption.textContent] || defaultCities;
                        setupCityAutocomplete(cityInput, cityDropdown, cities);
                    }
                }
                
                // Dispatch change event
                const event = new Event('change');
                input.dispatchEvent(event);
            }
        } else if (e.key === 'Escape') {
            dropdown.style.display = 'none';
        }
    });
}

// Set up city autocomplete

function setupCityAutocomplete(input, dropdown, cities) {
    // Check if input exists and has a parent node
    if (!input || !input.parentNode) {
        console.error('City input element or its parent not found:', input);
        return;
    }
    
    // Check if dropdown exists
    if (!dropdown) {
        console.error('City dropdown element not found');
        return;
    }
    
    // Check if cities array is valid
    if (!Array.isArray(cities) || cities.length === 0) {
        console.error('Invalid cities data:', cities);
        cities = []; // Use empty array as fallback
    }
    
    // Remove existing event listeners by cloning
    const newInput = input.cloneNode(true);
    input.parentNode.replaceChild(newInput, input);
    
    // Add event listener for input changes
    newInput.addEventListener('input', function() {
        const inputValue = this.value;
        showDropdown(dropdown, filterOptions(cities, inputValue), newInput);
    });
    
    // Add event listener for focus
    newInput.addEventListener('focus', function() {
        if (this.value.length > 0) {
            showDropdown(dropdown, filterOptions(cities, this.value), newInput);
        }
    });
    
    // Close dropdown when clicking outside
    document.addEventListener('click', function(event) {
        if (!newInput.contains(event.target) && !dropdown.contains(event.target)) {
            dropdown.style.display = 'none';
        }
    });
    
    // Handle keyboard navigation
    newInput.addEventListener('keydown', function(e) {
        const activeOption = dropdown.querySelector('.autocomplete-option.active');
        
        if (e.key === 'ArrowDown') {
            e.preventDefault();
            if (!activeOption) {
                const firstOption = dropdown.querySelector('.autocomplete-option');
                if (firstOption) {
                    firstOption.classList.add('active');
                }
            } else {
                const nextOption = activeOption.nextElementSibling;
                if (nextOption) {
                    activeOption.classList.remove('active');
                    nextOption.classList.add('active');
                }
            }
        } else if (e.key === 'ArrowUp') {
            e.preventDefault();
            if (activeOption) {
                const prevOption = activeOption.previousElementSibling;
                if (prevOption) {
                    activeOption.classList.remove('active');
                    prevOption.classList.add('active');
                }
            }
        } else if (e.key === 'Enter') {
            if (activeOption) {
                e.preventDefault();
                newInput.value = activeOption.textContent;
                dropdown.style.display = 'none';
            }
        } else if (e.key === 'Escape') {
            dropdown.style.display = 'none';
        }
    });
}



// Filter options based on input
function filterOptions(options, inputValue) {
    if (!inputValue || inputValue === '') {
        return options;
    }
    
    // Normalize the input value (remove diacritics)
    const normalizedInputValue = normalizeText(inputValue);
    
    // Return items that match with or without diacritics
    return options.filter(option => {
        const normalizedOption = normalizeText(option);
        return normalizedOption.includes(normalizedInputValue);
    });
}

// Show dropdown with filtered options
function showDropdown(dropdown, filteredOptions, input) {
    // Clear previous options
    dropdown.innerHTML = '';
    
    if (filteredOptions.length === 0) {
        dropdown.style.display = 'none';
        return;
    }
    
    // Add new options
    filteredOptions.forEach(option => {
        const optionElement = document.createElement('div');
        optionElement.className = 'autocomplete-option';
        optionElement.textContent = option;
        
        // Highlight if matches current input value (case insensitive)
        if (normalizeText(option) === normalizeText(input.value)) {
            optionElement.classList.add('selected');
        }
        
        // Add click event
        optionElement.addEventListener('click', function() {
            input.value = option;
            dropdown.style.display = 'none';
            
            // If this is a country input, update city options
            if (input.id === 'fromCountry') {
                const cityInput = document.getElementById('fromCity');
                const cityDropdown = document.getElementById('fromCityDropdown');
                if (cityInput && cityDropdown) {
                    const cities = citiesByCountry[option] || defaultCities;
                    setupCityAutocomplete(cityInput, cityDropdown, cities);
                }
            } else if (input.id === 'toCountry') {
                const cityInput = document.getElementById('toCity');
                const cityDropdown = document.getElementById('toCityDropdown');
                if (cityInput && cityDropdown) {
                    const cities = citiesByCountry[option] || defaultCities;
                    setupCityAutocomplete(cityInput, cityDropdown, cities);
                }
            }
            
            // Dispatch change event to trigger any listeners
            const event = new Event('change');
            input.dispatchEvent(event);
        });
        
        dropdown.appendChild(optionElement);
    });
    
    // Show dropdown
    dropdown.style.display = 'block';
}