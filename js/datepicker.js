/**
 * Date and time picker functionality for FURA website
 */

// Initialize the date time picker when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    console.log('Initializing datepicker...');
    const dateTimePickerButton = document.getElementById('dateTimePicker');
    const dateOnlyCheckbox = document.getElementById('dateOnlyCheckbox');
    let enableTimeSelection = true;
    
    if (dateTimePickerButton) {
        console.log('Found datepicker button element');
        
        // Add a span for the text to make it easier to extract later
        dateTimePickerButton.innerHTML = `
            <span class="calendar-icon">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                    <line x1="16" y1="2" x2="16" y2="6"></line>
                    <line x1="8" y1="2" x2="8" y2="6"></line>
                    <line x1="3" y1="10" x2="21" y2="10"></line>
                </svg>
            </span>
            <span class="date-text" data-translate="dateTime">Datum in ura</span>
        `;
        
        // Store the selected date value in a data attribute for easy access
        dateTimePickerButton.setAttribute('data-selected-date', '');
        
        console.log('Initializing flatpickr with enable time:', enableTimeSelection);
        
        // Initialize flatpickr on the button
        const picker = flatpickr(dateTimePickerButton, {
            enableTime: enableTimeSelection,
            dateFormat: enableTimeSelection ? "d.m.Y H:i" : "d.m.Y",
            time_24hr: true,
            locale: "sl",
            minuteIncrement: 15,
            allowInput: false,
            static: true,
            // When date is selected
            onChange: function(selectedDates, dateStr, instance) {
                console.log('Flatpickr onChange triggered with:', dateStr);
                
                // Store the selected date in a data attribute
                dateTimePickerButton.setAttribute('data-selected-date', dateStr);
                console.log('Data attribute set to:', dateStr);
                
                // Update button text to show selected date and time
                if (dateStr) {
                    const dateTextElement = dateTimePickerButton.querySelector('.date-text');
                    if (dateTextElement) {
                        dateTextElement.textContent = dateStr;
                        console.log('Updated date text element to:', dateStr);
                    } else {
                        console.log('Date text element not found, updating entire button HTML');
                        // Fallback if the element doesn't exist
                        dateTimePickerButton.innerHTML = `
                            <span class="calendar-icon">
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                    <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                                    <line x1="16" y1="2" x2="16" y2="6"></line>
                                    <line x1="8" y1="2" x2="8" y2="6"></line>
                                    <line x1="3" y1="10" x2="21" y2="10"></line>
                                </svg>
                            </span>
                            <span class="date-text">${dateStr}</span>
                        `;
                    }
                }
                
                // Double check that date is set and retrievable
                console.log('After update, data attribute:', dateTimePickerButton.getAttribute('data-selected-date'));
                const updatedDateText = dateTimePickerButton.querySelector('.date-text');
                console.log('After update, text content:', updatedDateText ? updatedDateText.textContent : 'not found');
                
                // Trigger a custom event that search.js can listen for
                const dateSelectedEvent = new CustomEvent('dateSelected', { 
                    detail: { date: dateStr }
                });
                dateTimePickerButton.dispatchEvent(dateSelectedEvent);
            },
            // When picker is closed without selection
            onClose: function(selectedDates, dateStr, instance) {
                console.log('Flatpickr onClose triggered with:', dateStr);
                
                if (!dateStr) {
                    console.log('No date selected, resetting');
                    // Reset data attribute
                    dateTimePickerButton.setAttribute('data-selected-date', '');
                    
                    // Reset text to default
                    const dateTextElement = dateTimePickerButton.querySelector('.date-text');
                    if (dateTextElement) {
                        dateTextElement.textContent = enableTimeSelection ? (window.t ? window.t('dateTime') : 'Datum in ura') : (window.t ? window.t('date') : 'Datum');
                    } else {
                        // Fallback
                        dateTimePickerButton.innerHTML = `
                            <span class="calendar-icon">
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                    <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                                    <line x1="16" y1="2" x2="16" y2="6"></line>
                                    <line x1="8" y1="2" x2="8" y2="6"></line>
                                    <line x1="3" y1="10" x2="21" y2="10"></line>
                                </svg>
                            </span>
                            <span class="date-text">${enableTimeSelection ? (window.t ? window.t('dateTime') : 'Datum in ura') : (window.t ? window.t('date') : 'Datum')}</span>
                        `;
                    }
                }
            }
        });
        
        // Store the picker instance for global access
        window.datePicker = picker;
        console.log('Flatpickr initialized and stored in window.datePicker');
        
        // Handle date-only checkbox
        if (dateOnlyCheckbox) {
            console.log('Found date-only checkbox');
            
            dateOnlyCheckbox.addEventListener('change', function() {
                console.log('Date-only checkbox changed, checked:', this.checked);
                enableTimeSelection = !this.checked;
                
                // Preserve selected date if there is one
                const currentSelectedDate = dateTimePickerButton.getAttribute('data-selected-date');
                
                // Destroy current picker
                picker.destroy();
                console.log('Destroyed previous flatpickr instance');
                
                // Reset button text while keeping any previously selected date
                const dateTextElement = dateTimePickerButton.querySelector('.date-text');
                if (dateTextElement) {
                    if (currentSelectedDate && currentSelectedDate !== '') {
                        dateTextElement.textContent = currentSelectedDate;
                    } else {
                        dateTextElement.textContent = this.checked ? (window.t ? window.t('date') : 'Datum') : (window.t ? window.t('dateTime') : 'Datum in ura');
                    }
                } else {
                    if (currentSelectedDate && currentSelectedDate !== '') {
                        dateTimePickerButton.innerHTML = `
                            <span class="calendar-icon">
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                    <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                                    <line x1="16" y1="2" x2="16" y2="6"></line>
                                    <line x1="8" y1="2" x2="8" y2="6"></line>
                                    <line x1="3" y1="10" x2="21" y2="10"></line>
                                </svg>
                            </span>
                            <span class="date-text">${currentSelectedDate}</span>
                        `;
                    } else {
                        dateTimePickerButton.innerHTML = `
                            <span class="calendar-icon">
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                    <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                                    <line x1="16" y1="2" x2="16" y2="6"></line>
                                    <line x1="8" y1="2" x2="8" y2="6"></line>
                                    <line x1="3" y1="10" x2="21" y2="10"></line>
                                </svg>
                            </span>
                            <span class="date-text">${this.checked ? (window.t ? window.t('date') : 'Datum') : (window.t ? window.t('dateTime') : 'Datum in ura')}</span>
                        `;
                    }
                }
                
                console.log('Re-initializing flatpickr with enable time:', enableTimeSelection);
                
                // Re-initialize with new settings
                const newPicker = flatpickr(dateTimePickerButton, {
                    enableTime: enableTimeSelection,
                    dateFormat: enableTimeSelection ? "d.m.Y H:i" : "d.m.Y",
                    time_24hr: true,
                    locale: "sl",
                    minuteIncrement: 15,
                    allowInput: false,
                    static: true,
                    defaultDate: currentSelectedDate || undefined,
                    onChange: function(selectedDates, dateStr, instance) {
                        console.log('New picker onChange with:', dateStr);
                        // Store the selected date
                        dateTimePickerButton.setAttribute('data-selected-date', dateStr);
                        
                        if (dateStr) {
                            const dateTextElement = dateTimePickerButton.querySelector('.date-text');
                            if (dateTextElement) {
                                dateTextElement.textContent = dateStr;
                            } else {
                                dateTimePickerButton.innerHTML = `
                                    <span class="calendar-icon">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                            <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                                            <line x1="16" y1="2" x2="16" y2="6"></line>
                                            <line x1="8" y1="2" x2="8" y2="6"></line>
                                            <line x1="3" y1="10" x2="21" y2="10"></line>
                                        </svg>
                                    </span>
                                    <span class="date-text">${dateStr}</span>
                                `;
                            }
                        }
                        
                        // Double check retrieval
                        console.log('After new picker update, data attribute:', 
                            dateTimePickerButton.getAttribute('data-selected-date'));
                            
                        // Trigger a custom event that search.js can listen for
                        const dateSelectedEvent = new CustomEvent('dateSelected', { 
                            detail: { date: dateStr }
                        });
                        dateTimePickerButton.dispatchEvent(dateSelectedEvent);
                    },
                    onClose: function(selectedDates, dateStr, instance) {
                        console.log('New picker onClose with:', dateStr);
                        if (!dateStr) {
                            // Reset data attribute
                            dateTimePickerButton.setAttribute('data-selected-date', '');
                            
                            const dateTextElement = dateTimePickerButton.querySelector('.date-text');
                            if (dateTextElement) {
                                dateTextElement.textContent = dateOnlyCheckbox.checked ? (window.t ? window.t('date') : 'Datum') : (window.t ? window.t('dateTime') : 'Datum in ura');
                            } else {
                                dateTimePickerButton.innerHTML = `
                                    <span class="calendar-icon">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                            <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                                            <line x1="16" y1="2" x2="16" y2="6"></line>
                                            <line x1="8" y1="2" x2="8" y2="6"></line>
                                            <line x1="3" y1="10" x2="21" y2="10"></line>
                                        </svg>
                                    </span>
                                    <span class="date-text">${dateOnlyCheckbox.checked ? (window.t ? window.t('date') : 'Datum') : (window.t ? window.t('dateTime') : 'Datum in ura')}</span>
                                `;
                            }
                        }
                    }
                });
                
                // Update the global reference
                window.datePicker = newPicker;
                console.log('New flatpickr instance initialized and stored');
            });
        }
    } else {
        console.error('Datepicker button element not found!');
    }
});

// Add this to the end of your datepicker.js file, outside the DOMContentLoaded event

// Function to reset the date picker mode (for external calls)
window.resetDateTimePickerMode = function() {
    console.log('Resetting date picker mode to default (with time)');
    const dateTimePickerButton = document.getElementById('dateTimePicker');
    
    if (dateTimePickerButton && window.datePicker) {
        // Clear any selected date
        window.datePicker.clear();
        
        // Update the configuration to show time
        window.datePicker.set('enableTime', true);
        window.datePicker.set('dateFormat', 'd.m.Y H:i');
        
        // Reset the button text
        const dateTextElement = dateTimePickerButton.querySelector('.date-text');
        if (dateTextElement) {
            dateTextElement.textContent = window.t ? window.t('dateTime') : 'Datum in ura';
        } else {
            dateTimePickerButton.innerHTML = `
                <span class="calendar-icon">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                        <line x1="16" y1="2" x2="16" y2="6"></line>
                        <line x1="8" y1="2" x2="8" y2="6"></line>
                        <line x1="3" y1="10" x2="21" y2="10"></line>
                    </svg>
                </span>
                <span class="date-text">${window.t ? window.t('dateTime') : 'Datum in ura'}</span>
            `;
        }
        
        // Clear the data attribute
        dateTimePickerButton.setAttribute('data-selected-date', '');
    }
};