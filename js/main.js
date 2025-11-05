/**
 * Main JavaScript functionality for FURA website
 */

// Initialize all components when page loads
document.addEventListener('DOMContentLoaded', function() {
    // Initialize tabs
    initTabs();
    
    // Initialize toggle options
    initToggleOptions();
    
    // Swap buttons are handled by dropdown-locations.js
    
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
            
            // Apply theme based on selected tab
            const bodyElement = document.body;
            
            // Remove all theme classes first
            bodyElement.classList.remove('looking-mode', 'offering-mode');
            
            // Add appropriate theme class
            if (tabValue === 'looking') {
                bodyElement.classList.add('looking-mode');
            } else if (tabValue === 'offering') {
                bodyElement.classList.add('offering-mode');
            }
            // 'all' tab uses default theme (no additional class)
            
            // Example of how you would update the UI
            if (tabValue === 'all') {
                document.querySelector('.results-count').textContent = window.formatResultsCount ? window.formatResultsCount(5) : 'Prikazujem 5 prevozov';
            } else if (tabValue === 'looking') {
                document.querySelector('.results-count').textContent = window.formatResultsCount ? window.formatResultsCount(2) : 'Prikazujem 2 iskane prevoze';
            } else if (tabValue === 'offering') {
                document.querySelector('.results-count').textContent = window.formatResultsCount ? window.formatResultsCount(3) : 'Prikazujem 3 ponujene prevoze';
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

// Swap locations functionality is handled by dropdown-locations.js

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