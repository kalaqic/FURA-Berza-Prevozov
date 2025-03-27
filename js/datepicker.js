/**
 * Date and time picker functionality for FURA website
 */

// Initialize the date time picker when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    const dateTimePickerButton = document.getElementById('dateTimePicker');
    const dateOnlyCheckbox = document.getElementById('dateOnlyCheckbox');
    let enableTimeSelection = true;
    
    if (dateTimePickerButton) {
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
                console.log('Selected date and time:', dateStr);
                
                // Update button text to show selected date and time if needed
                if (dateStr) {
                    const originalHtml = `
                        <span class="calendar-icon">
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                                <line x1="16" y1="2" x2="16" y2="6"></line>
                                <line x1="8" y1="2" x2="8" y2="6"></line>
                                <line x1="3" y1="10" x2="21" y2="10"></line>
                            </svg>
                        </span>
                        ${dateStr}
                    `;
                    dateTimePickerButton.innerHTML = originalHtml;
                }
            },
            // When picker is closed without selection
            onClose: function(selectedDates, dateStr, instance) {
                if (!dateStr) {
                    // Reset to original text if no date selected
                    const originalHtml = `
                        <span class="calendar-icon">
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                                <line x1="16" y1="2" x2="16" y2="6"></line>
                                <line x1="8" y1="2" x2="8" y2="6"></line>
                                <line x1="3" y1="10" x2="21" y2="10"></line>
                            </svg>
                        </span>
                        Datum in ura
                    `;
                    dateTimePickerButton.innerHTML = originalHtml;
                }
            }
        });
        
        // Handle date-only checkbox
        if (dateOnlyCheckbox) {
            dateOnlyCheckbox.addEventListener('change', function() {
                enableTimeSelection = !this.checked;
                
                // Destroy current picker
                picker.destroy();
                
                // Reset button text
                const originalHtml = `
                    <span class="calendar-icon">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                            <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                            <line x1="16" y1="2" x2="16" y2="6"></line>
                            <line x1="8" y1="2" x2="8" y2="6"></line>
                            <line x1="3" y1="10" x2="21" y2="10"></line>
                        </svg>
                    </span>
                    ${this.checked ? 'Datum' : 'Datum in ura'}
                `;
                dateTimePickerButton.innerHTML = originalHtml;
                
                // Re-initialize with new settings
                flatpickr(dateTimePickerButton, {
                    enableTime: enableTimeSelection,
                    dateFormat: enableTimeSelection ? "d.m.Y H:i" : "d.m.Y",
                    time_24hr: true,
                    locale: "sl",
                    minuteIncrement: 15,
                    allowInput: false,
                    static: true,
                    onChange: function(selectedDates, dateStr, instance) {
                        if (dateStr) {
                            const newHtml = `
                                <span class="calendar-icon">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                        <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                                        <line x1="16" y1="2" x2="16" y2="6"></line>
                                        <line x1="8" y1="2" x2="8" y2="6"></line>
                                        <line x1="3" y1="10" x2="21" y2="10"></line>
                                    </svg>
                                </span>
                                ${dateStr}
                            `;
                            dateTimePickerButton.innerHTML = newHtml;
                        }
                    },
                    onClose: function(selectedDates, dateStr, instance) {
                        if (!dateStr) {
                            const resetHtml = `
                                <span class="calendar-icon">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                        <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                                        <line x1="16" y1="2" x2="16" y2="6"></line>
                                        <line x1="8" y1="2" x2="8" y2="6"></line>
                                        <line x1="3" y1="10" x2="21" y2="10"></line>
                                    </svg>
                                </span>
                                ${dateOnlyCheckbox.checked ? 'Datum' : 'Datum in ura'}
                            `;
                            dateTimePickerButton.innerHTML = resetHtml;
                        }
                    }
                });
            });
        }
    }
});
