document.addEventListener('DOMContentLoaded', function() {
    // Get DOM elements
    const screen1 = document.getElementById('screen-1');
    const screen2 = document.getElementById('screen-2');
    const nextToScreen2Btn = document.getElementById('next-to-screen-2');
    const backToScreen1Btn = document.getElementById('back-to-screen-1');
    const submitFormBtn = document.getElementById('submit-form');
    const responderDropdown = document.getElementById('responder');
    const otherResponderGroup = document.getElementById('other-responder-group');
    const messageDiv = document.getElementById('message');

    console.log('JavaScript loaded successfully');

    // Navigation: Next to Screen 2
    if (nextToScreen2Btn) {
        nextToScreen2Btn.addEventListener('click', function() {
            console.log('Next button clicked');
            if (validateScreen1()) {
                console.log('Validation passed, showing screen 2');
                showScreen(2);
            } else {
                console.log('Validation failed');
            }
        });
    }

    // Navigation: Back to Screen 1
    if (backToScreen1Btn) {
        backToScreen1Btn.addEventListener('click', function() {
            console.log('Back button clicked');
            showScreen(1);
        });
    }

    // Handle form submission
    if (submitFormBtn) {
        submitFormBtn.addEventListener('click', function() {
            console.log('Submit button clicked');
            const formData = collectFormData();
            console.log('Form submitted:', formData);
            showMessage('Form submitted successfully!', 'success');
        });
    }

    // Handle "Other" responder selection
    if (responderDropdown) {
        responderDropdown.addEventListener('change', function() {
            if (this.value === 'other') {
                otherResponderGroup.style.display = 'block';
                document.getElementById('otherResponder').required = true;
            } else {
                otherResponderGroup.style.display = 'none';
                document.getElementById('otherResponder').required = false;
                document.getElementById('otherResponder').value = '';
            }
        });
    }

    // Form validation for screen 1
    function validateScreen1() {
        const requiredFields = ['fullName', 'phone', 'email', 'jobTitle', 'supervisor', 'employmentStatus'];
        let isValid = true;
        let missingFields = [];

        requiredFields.forEach(function(fieldId) {
            const field = document.getElementById(fieldId);
            if (!field || !field.value.trim()) {
                if (field) {
                    field.classList.add('error');
                }
                missingFields.push(fieldId);
                isValid = false;
            } else {
                if (field) {
                    field.classList.remove('error');
                }
            }
        });

        if (!isValid) {
            showMessage('Please fill in all required fields.', 'error');
        }

        return isValid;
    }

        // Screen navigation
    function showScreen(screenNumber) {
        console.log('Showing screen:', screenNumber);
        
        // Hide all screens
        const screens = document.querySelectorAll('.form-screen');
        screens.forEach(function(screen) {
            screen.style.display = 'none';
        });
        
        // Show selected screen
        const targetScreen = document.getElementById('screen-' + screenNumber);
        if (targetScreen) {
            targetScreen.style.display = 'block';
            console.log('Screen ' + screenNumber + ' is now visible');
        } else {
            console.error('Screen ' + screenNumber + ' not found');
        }
        
        // Clear messages when changing screens
        clearMessage();
        
        // Scroll to top
        window.scrollTo(0, 0);
    }

    // Collect all form data
    function collectFormData() {
        return {
            // Employee information
            fullName: getValue('fullName'),
            phone: getValue('phone'),
            age: getValue('age'),
            email: getValue('email'),
            jobTitle: getValue('jobTitle'),
            lengthOfEmployment: getValue('lengthOfEmployment'),
            supervisor: getValue('supervisor'),
            employmentStatus: getValue('employmentStatus'),
            
            // First responder information
            responder: getValue('responder'),
            otherResponder: getValue('otherResponder'),
            responderName: getValue('responderName'),
            policeReportFiled: getChecked('policeReportFiled'),
            policeReportNumber: getValue('policeReportNumber'),
            witnesses: getValue('witnesses')
        };
    }

    // Helper function to safely get element values
    function getValue(elementId) {
        const element = document.getElementById(elementId);
        return element ? element.value : '';
    }

    // Helper function to safely get checkbox values
    function getChecked(elementId) {
        const element = document.getElementById(elementId);
        return element ? element.checked : false;
    }

    // Reset form to initial state
    function resetForm() {
        const inputs = document.querySelectorAll('input, select, textarea');
        inputs.forEach(function(field) {
            if (field.type === 'checkbox') {
                field.checked = false;
            } else {
                field.value = '';
            }
            field.classList.remove('error');
        });
        
        // Hide other responder group
        if (otherResponderGroup) {
            otherResponderGroup.style.display = 'none';
        }
        const otherResponder = document.getElementById('otherResponder');
        if (otherResponder) {
            otherResponder.required = false;
        }
    }

    // Message display functions
    function showMessage(message, type) {
        if (messageDiv) {
            messageDiv.textContent = message;
            messageDiv.className = 'message ' + type;
            messageDiv.style.display = 'block';
            
            // Auto-hide success messages after 5 seconds
            if (type === 'success') {
                setTimeout(function() {
                    messageDiv.style.display = 'none';
                }, 5000);
            }
        }
    }

    function clearMessage() {
        if (messageDiv) {
            messageDiv.style.display = 'none';
        }
    }

    // Email validation
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

        // Phone number formatting
    const phoneInput = document.getElementById('phone');
    if (phoneInput) {
        phoneInput.addEventListener('input', function(e) {
            let value = e.target.value.replace(/\D/g, '');
            if (value.length >= 6) {
                value = value.replace(/(\d{3})(\d{3})(\d{4})/, '($1) $2-$3');
            } else if (value.length >= 3) {
                value = value.replace(/(\d{3})(\d{0,3})/, '($1) $2');
            }
            e.target.value = value;
        });
    }

    // Add real-time validation for required fields
    const requiredFieldIds = ['fullName', 'phone', 'email', 'jobTitle', 'supervisor', 'employmentStatus'];
    requiredFieldIds.forEach(function(fieldId) {
        const field = document.getElementById(fieldId);
        if (field) {
            field.addEventListener('blur', function() {
                if (!this.value.trim()) {
                    this.classList.add('error');
                } else {
                    this.classList.remove('error');
                }
            });

            field.addEventListener('input', function() {
                if (this.value.trim()) {
                    this.classList.remove('error');
                }
            });
        }
    });

    // Email validation on blur
    const emailInput = document.getElementById('email');
    if (emailInput) {
        emailInput.addEventListener('blur', function() {
            if (this.value && !isValidEmail(this.value)) {
                this.classList.add('error');
                showMessage('Please enter a valid email address', 'error');
            }
        });
    }

    // Development helper
    if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
        console.log('Development mode - Form is ready');
    }

    // Debug: Log all elements found
    console.log('Elements found:');
    console.log('Screen 1:', screen1);
    console.log('Screen 2:', screen2);
    console.log('Next button:', nextToScreen2Btn);
    console.log('Back button:', backToScreen1Btn);
    console.log('Submit button:', submitFormBtn);
});
