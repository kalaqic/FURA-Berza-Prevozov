/**
 * Phone input component for FURA website
 * Provides country code selection for phone input
 */

// Country codes data with flags
const countryCodes = [
    { code: "+386", country: "Slovenija", flag: "🇸🇮" },
    { code: "+385", country: "Hrvatska", flag: "🇭🇷" },
    { code: "+381", country: "Srbija", flag: "🇷🇸" },
    { code: "+387", country: "Bosna i Hercegovina", flag: "🇧🇦" },
    { code: "+389", country: "Severna Makedonija", flag: "🇲🇰" },
    { code: "+382", country: "Črna Gora", flag: "🇲🇪" },
    { code: "+43", country: "Avstrija", flag: "🇦🇹" },
    { code: "+39", country: "Italija", flag: "🇮🇹" },
    { code: "+36", country: "Madžarska", flag: "🇭🇺" },
    { code: "+49", country: "Nemčija", flag: "🇩🇪" },
    { code: "+33", country: "Francija", flag: "🇫🇷" },
    { code: "+44", country: "Združeno kraljestvo", flag: "🇬🇧" },
    { code: "+34", country: "Španija", flag: "🇪🇸" },
    { code: "+41", country: "Švica", flag: "🇨🇭" },
    { code: "+420", country: "Češka", flag: "🇨🇿" },
    { code: "+421", country: "Slovaška", flag: "🇸🇰" },
    { code: "+48", country: "Poljska", flag: "🇵🇱" },
    { code: "+30", country: "Grčija", flag: "🇬🇷" },
    { code: "+32", country: "Belgija", flag: "🇧🇪" },
    { code: "+31", country: "Nizozemska", flag: "🇳🇱" },
    { code: "+45", country: "Danska", flag: "🇩🇰" },
    { code: "+46", country: "Švedska", flag: "🇸🇪" },
    { code: "+47", country: "Norveška", flag: "🇳🇴" },
    { code: "+358", country: "Finska", flag: "🇫🇮" },
    { code: "+40", country: "Romunija", flag: "🇷🇴" },
    { code: "+359", country: "Bolgarija", flag: "🇧🇬" },
    { code: "+351", country: "Portugalska", flag: "🇵🇹" },
    { code: "+353", country: "Irska", flag: "🇮🇪" },
    { code: "+352", country: "Luksemburg", flag: "🇱🇺" },
    { code: "+355", country: "Albanija", flag: "🇦🇱" },
    { code: "+370", country: "Litva", flag: "🇱🇹" },
    { code: "+371", country: "Latvija", flag: "🇱🇻" },
    { code: "+372", country: "Estonija", flag: "🇪🇪" },
    { code: "+1", country: "ZDA/Kanada", flag: "🇺🇸" }
  ];
  
  // Initialize the country code selector
  function initCountryCodeSelector() {
    const countryCodeSelectors = document.querySelectorAll('.country-code-selector');
    
    countryCodeSelectors.forEach(countryCodeSelector => {
      const selectedCountry = countryCodeSelector.querySelector('.selected-country');
      const countryDropdown = countryCodeSelector.querySelector('.country-dropdown');
      const countryList = countryCodeSelector.querySelector('.country-list');
      const countrySearchInput = countryCodeSelector.querySelector('input[placeholder="Iskanje..."]');
      const phoneNumberInput = countryCodeSelector.closest('.phone-input-container').querySelector('.phone-number');
      const fullPhoneNumberInput = countryCodeSelector.closest('.phone-input-container').querySelector('input[type="hidden"]');
      
      if (!selectedCountry || !countryDropdown || !countryList) {
        console.error('Country selector elements not found');
        return;
      }
      
      // Set initial selected country (Slovenia)
      let currentCountryCode = "+386";
      
      // Populate country list
      function populateCountryList(countries) {
        countryList.innerHTML = '';
        countries.forEach(country => {
          const option = document.createElement('div');
          option.className = 'country-option';
          if (country.code === currentCountryCode) {
            option.classList.add('selected');
          }
          
          option.innerHTML = `
            <span class="country-flag">${country.flag}</span>
            <span class="country-name">${country.country}</span>
            <span class="country-code">${country.code}</span>
          `;
          
          option.addEventListener('click', () => {
            // Update selected country
            currentCountryCode = country.code;
            selectedCountry.querySelector('.country-flag').textContent = country.flag;
            selectedCountry.querySelector('.country-code').textContent = country.code;
            
            // Update full phone number
            updateFullPhoneNumber();
            
            // Close dropdown
            countryDropdown.classList.remove('show');
            selectedCountry.classList.remove('opened');
            
            // Clear search
            if (countrySearchInput) {
              countrySearchInput.value = '';
            }
            
            // Update selected class
            countryList.querySelectorAll('.country-option').forEach(opt => {
              opt.classList.toggle('selected', opt.querySelector('.country-code').textContent === currentCountryCode);
            });
          });
          
          countryList.appendChild(option);
        });
      }
      
      // Initial population
      populateCountryList(countryCodes);
      
      // Toggle dropdown
      selectedCountry.addEventListener('click', () => {
        countryDropdown.classList.toggle('show');
        selectedCountry.classList.toggle('opened');
        
        if (countryDropdown.classList.contains('show') && countrySearchInput) {
          countrySearchInput.focus();
        }
      });
      
      // Close dropdown when clicking outside
      document.addEventListener('click', (event) => {
        if (!countryCodeSelector.contains(event.target)) {
          countryDropdown.classList.remove('show');
          selectedCountry.classList.remove('opened');
        }
      });
      
      // Filter countries on search
      if (countrySearchInput) {
        countrySearchInput.addEventListener('input', () => {
          const searchValue = countrySearchInput.value.toLowerCase();
          const filteredCountries = countryCodes.filter(country => 
            country.country.toLowerCase().includes(searchValue) || 
            country.code.includes(searchValue)
          );
          populateCountryList(filteredCountries);
        });
      }
      
      // Update full phone number when either part changes
      function updateFullPhoneNumber() {
        if (fullPhoneNumberInput && phoneNumberInput) {
          fullPhoneNumberInput.value = currentCountryCode + ' ' + (phoneNumberInput.value || '');
        }
      }
      
      // Listen for phone number changes
      if (phoneNumberInput) {
        // Prevent letters and special characters, allow only numbers, spaces, dashes, parentheses, and plus
        phoneNumberInput.addEventListener('keypress', function(event) {
          const allowedChars = /[0-9\s\-\(\)\+]/;
          const inputChar = String.fromCharCode(event.charCode);
          
          if (!allowedChars.test(inputChar) && event.charCode !== 0) {
            event.preventDefault();
          }
        });
        
        // Handle input events to filter out invalid characters and update phone number
        phoneNumberInput.addEventListener('input', function(event) {
          const value = event.target.value;
          const filteredValue = value.replace(/[^0-9\s\-\(\)\+]/g, '');
          
          if (value !== filteredValue) {
            event.target.value = filteredValue;
          }
          
          updateFullPhoneNumber();
        });
      }
      
      // Initial update
      updateFullPhoneNumber();
    });
  }
  
  // Initialize when DOM is ready
  document.addEventListener('DOMContentLoaded', function() {
    initCountryCodeSelector();
  });