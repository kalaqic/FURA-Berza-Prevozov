/**
 * Main JavaScript functionality for FURA website
 */

// Initialize all components when page loads
document.addEventListener('DOMContentLoaded', function() {
    // Initialize tabs
    initTabs();
    
    // Initialize toggle options
    initToggleOptions();
    
    // Initialize swap buttons
    initSwapButtons();
    
    // Close modals when clicking outside
    initModalOutsideClick();
});

// Tab switching functionality
function initTabs() {
    const tabBtns = document.querySelectorAll('.tab-btn');
    
    tabBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            tabBtns.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            // Get the tab value
            const tabValue = this.getAttribute('data-tab');
            
            // In a real app, you would filter the results based on the selected tab
            console.log('Selected tab:', tabValue);
            
            // Example of how you would update the UI
            if (tabValue === 'all') {
                document.querySelector('.results-count').textContent = 'Prikazujem 5 prevozov';
            } else if (tabValue === 'looking') {
                document.querySelector('.results-count').textContent = 'Prikazujem 2 iskane prevoze';
            } else if (tabValue === 'offering') {
                document.querySelector('.results-count').textContent = 'Prikazujem 3 ponujene prevoze';
            }
        });
    });
}

// Toggle options functionality
function initToggleOptions() {
    const toggleOptions = document.querySelectorAll('.toggle-option');
    
    toggleOptions.forEach(option => {
        option.addEventListener('click', function() {
            toggleOptions.forEach(opt => opt.classList.remove('active'));
            this.classList.add('active');
            
            // Get the toggle value
            const toggleValue = this.getAttribute('data-toggle');
            console.log('Selected toggle option:', toggleValue);
            
            // In a real app, you would update the form based on the selected option
        });
    });
}

// Swap locations functionality
function initSwapButtons() {
    const swapBtns = document.querySelectorAll('.swap-btn');
    
    swapBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            // Swap countries
            const fromCountryInput = document.getElementById('fromCountry');
            const toCountryInput = document.getElementById('toCountry');
            
            if (fromCountryInput && toCountryInput) {
                const fromCountry = fromCountryInput.value;
                const toCountry = toCountryInput.value;
                
                fromCountryInput.value = toCountry;
                toCountryInput.value = fromCountry;
            }
            
            // Swap cities
            const fromCityInput = document.getElementById('fromCity');
            const toCityInput = document.getElementById('toCity');
            
            if (fromCityInput && toCityInput) {
                const fromCity = fromCityInput.value;
                const toCity = toCityInput.value;
                
                fromCityInput.value = toCity;
                toCityInput.value = fromCity;
            }
            
            // Trigger change events to update any dependent fields or dropdowns
            if (fromCountryInput) {
                const event = new Event('change');
                fromCountryInput.dispatchEvent(event);
            }
            
            if (toCountryInput) {
                const event = new Event('change');
                toCountryInput.dispatchEvent(event);
            }
        });
    });
}

// Close modals when clicking outside
function initModalOutsideClick() {
    window.addEventListener('click', function(event) {
        const modals = document.querySelectorAll('.modal');
        modals.forEach(modal => {
            if (event.target === modal) {
                window.closeModal(modal.id);
            }
        });
    });
}