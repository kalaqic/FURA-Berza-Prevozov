/**
 * Date and time picker functionality for FURA website
 * Rješenje za mobilne uređaje
 */

document.addEventListener('DOMContentLoaded', function() {
    // Pronađi elemente date pickera
    const datePickerButton = document.getElementById('dateTimePicker');
    const dateOnlyCheckbox = document.getElementById('dateOnlyCheckbox');
    let fpInstance = null;
    
    console.log('DOM loaded, finding date picker elements');
    
    if (!datePickerButton) {
        console.error('Date picker button not found!');
        return;
    }
    
    if (!dateOnlyCheckbox) {
        console.error('Date only checkbox not found!');
    }
    
    console.log('Initializing date picker for element:', datePickerButton);
    
    // Inicijalizacija flatpickr
    fpInstance = flatpickr(datePickerButton, {
        enableTime: true,
        dateFormat: "d.m.Y H:i",
        time_24hr: true,
        locale: "sl",
        minuteIncrement: 15,
        allowInput: false,
        static: true,
        disableMobile: true,  // Isključi mobilni prikaz
        onChange: function(selectedDates, dateStr, instance) {
            console.log('Date selected:', dateStr);
            
            // Ažuriraj tekst gumba
            const textElement = datePickerButton.querySelector('.date-text');
            if (textElement) {
                textElement.textContent = dateStr;
            }
        }
    });
    
    // Osiguraj da se kalendar otvori na klik
    datePickerButton.addEventListener('click', function(e) {
        console.log('Date picker button clicked');
        e.preventDefault();
        e.stopPropagation();
        if (fpInstance) {
            fpInstance.open();
        } else {
            console.error('FlatPickr instance is null!');
        }
    });
    
    // Upravljanje checkboxom za prikaz samo datuma
    if (dateOnlyCheckbox) {
        dateOnlyCheckbox.addEventListener('change', function() {
            console.log('Checkbox changed, checked:', this.checked);
            
            // Uništi postojeću instancu
            if (fpInstance) {
                fpInstance.destroy();
            }
            
            const enableTime = !this.checked;
            
            // Postavi odgovarajući tekst
            const textElement = datePickerButton.querySelector('.date-text');
            if (textElement) {
                textElement.textContent = this.checked ? 'Datum' : 'Datum in ura';
            }
            
            // Kreiraj novu instancu s odgovarajućim postavkama
            fpInstance = flatpickr(datePickerButton, {
                enableTime: enableTime,
                dateFormat: enableTime ? "d.m.Y H:i" : "d.m.Y",
                time_24hr: true,
                locale: "sl",
                minuteIncrement: 15,
                allowInput: false,
                static: true,
                disableMobile: true,
                onChange: function(selectedDates, dateStr, instance) {
                    console.log('Date selected after checkbox change:', dateStr);
                    
                    // Ažuriraj tekst gumba
                    const textElement = datePickerButton.querySelector('.date-text');
                    if (textElement) {
                        textElement.textContent = dateStr;
                    }
                }
            });
            
            // Ponovo dodaj event listener za klik
            datePickerButton.addEventListener('click', function(e) {
                e.preventDefault();
                e.stopPropagation();
                if (fpInstance) {
                    fpInstance.open();
                }
            });
        });
    }
    
    // Ukloni skrivene input elemente
    setTimeout(function() {
        const hiddenInputs = document.querySelectorAll('input.flatpickr-input[readonly], input.flatpickr-mobile');
        hiddenInputs.forEach(function(input) {
            input.style.position = 'absolute';
            input.style.opacity = '0';
            input.style.pointerEvents = 'none';
            input.style.height = '0';
            input.style.width = '0';
            console.log('Hidden input styled:', input);
        });
    }, 500);
});