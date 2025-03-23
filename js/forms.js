/**
 * Form validation and handling for FURA website
 */

// Initialize form validation when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Add event listeners to all forms
    const forms = document.querySelectorAll('form');
    forms.forEach(form => {
        form.addEventListener('submit', validateForm);
    });
});

// Validate a form before submission
function validateForm(event) {
    // Prevent default form submission
    event.preventDefault();
    
    // Get all required inputs
    const requiredInputs = this.querySelectorAll('[required]');
    let valid = true;
    
    // Check each required input
    requiredInputs.forEach(input => {
        if (!input.value.trim()) {
            valid = false;
            highlightInvalidInput(input);
        } else {
            removeInvalidHighlight(input);
        }
    });
    
    // If passwords are present, check if they match
    const password = this.querySelector('input[type="password"]');
    const confirmPassword = this.querySelector('input[name="confirm_password"]');
    if (password && confirmPassword) {
        if (password.value !== confirmPassword.value) {
            valid = false;
            highlightInvalidInput(confirmPassword);
            alert('Gesli se ne ujemata!');
        }
    }
    
    // If form is valid, submit it
    if (valid) {
        // In a real app, you would handle form submission here
        // For demo purposes, we'll just show a success message
        alert('Obrazec uspešno oddan!');
        this.reset();
    }
}

// Highlight an invalid input
function highlightInvalidInput(input) {
    input.style.borderColor = 'red';
    input.classList.add('invalid');
    
    // Add error message if not already present
    if (!input.nextElementSibling || !input.nextElementSibling.classList.contains('error-message')) {
        const errorMessage = document.createElement('div');
        errorMessage.classList.add('error-message');
        errorMessage.style.color = 'red';
        errorMessage.style.fontSize = '0.8rem';
        errorMessage.style.marginTop = '5px';
        errorMessage.textContent = 'To polje je obvezno!';
        
        input.parentNode.insertBefore(errorMessage, input.nextSibling);
    }
}

// Remove invalid highlight from an input
function removeInvalidHighlight(input) {
    input.style.borderColor = '';
    input.classList.remove('invalid');
    
    // Remove error message if present
    if (input.nextElementSibling && input.nextElementSibling.classList.contains('error-message')) {
        input.parentNode.removeChild(input.nextElementSibling);
    }
}

// Function to validate email format
function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
}

// Function to validate phone number
function validatePhone(phone) {
    // Basic phone validation (allows different formats)
    const re = /^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/;
    return re.test(String(phone));
}