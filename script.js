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

    // Navigation: Next to Screen 2
    nextToScreen2Btn.addEventListener('click', function
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

    // Navigation: Next to Screen 2
    nextToScreen2Btn.addEventListener('click', function() {
        if (validateScreen1()) {
            showScreen(2);
        }
    });

    // Navigation: Back to Screen 1
    backToScreen1Btn.addEventListener('click', function() {
        showScreen(1);
    });

    // Handle form submission
    submitFormBtn.addEventListener('click', function() {
        const formData = collectFormData();
        console.log('Form submitted:', formData);
        
        // Show success message
        showMessage('Form submitted successfully!', 'success');
        
        // Optional: Reset form after submission
        // setTimeout(() => {
        //     resetForm();
        //     showScreen(1);
        // }, 3000);
        
        // You can add code here to:
        // - Send data to server
        // - Generate PDF
        // - Send email
        // - etc.
    });

    // Handle "Other" responder selection
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

    // Form validation for screen 1
    function validateScreen1() {
        const requiredFields = ['fullName', 'phone', 'email', 'jobTitle', 'supervisor', 'employmentStatus'];
        let isValid = true;

        requiredFields.forEach(fieldId => {
            const field = document.getElementById(fieldId);
            if (!field.value.trim()) {
                field.classList.add('error');
                isValid = false;
            } else {
                field.classList.remove('error');
            }
        });

        if (!isValid) {
            showMessage('Please fill in all required fields.', 'error');
        }

        return isValid;
    }

    // Screen navigation
    function showScreen(screenNumber) {
        // Hide all screens
        document.querySelectorAll('.form-screen').forEach(screen => {
            screen.style.display = 'none';
        });
        
        // Show selected screen
        document.getElementById(`screen-${screenNumber}`).style.display = 'block';
        
        // Clear messages when changing screens
        clearMessage();
        
        // Scroll to top
        window.scrollTo(0, 0);
    }

    // Collect all form data
    function collectFormData() {
        return {
            // Employee information
            fullName: document.getElementById('fullName').value,
            phone: document.getElementById('phone').value,
            age: document.getElementById('age').value,
            email: document.getElementById('email').value,
            jobTitle: document.getElementById('jobTitle').value,
            lengthOfEmployment: document.getElementById('lengthOfEmployment').value,
            supervisor: document.getElementById('supervisor').value,
            employmentStatus: document.getElementById('employmentStatus').value,
            
            // First responder information
            responder: document.getElementById('responder').value,
            otherResponder: document.getElementById('otherResponder').value,
            responderName: document.getElementById('responderName').value,
            policeReportFiled: document.getElementById('policeReportF        
                // Collect all form data
    function collectFormData() {
        return {
            // Employee information
            fullName: document.getElementById('fullName').value,
            phone: document.getElementById('phone').value,
            age: document.getElementById('age').value,
            email: document.getElementById('email').value,
            jobTitle: document.getElementById('jobTitle').value,
            lengthOfEmployment: document.getElementById('lengthOfEmployment').value,
            supervisor: document.getElementById('supervisor').value,
            employmentStatus: document.getElementById('employmentStatus').value,
            
            // First responder information
            responder: document.getElementById('responder').value,
            otherResponder: document.getElementById('otherResponder').value,
            responderName: document.getElementById('responderName').value,
            policeReportFiled: document.getElementById('policeReportFiled').checked,
            policeReportNumber: document.getElementById('policeReportNumber').value,
            witnesses: document.getElementById('witnesses').value
        };
    }

    // Reset form to initial state
    function resetForm() {
        document.querySelectorAll('input, select, textarea').forEach(field => {
            if (field.type === 'checkbox') {
                field.checked = false;
            } else {
                field.value = '';
            }
            field.classList.remove('error');
        });
        
        // Hide other responder group
        otherResponderGroup.style.display = 'none';
        document.getElementById('otherResponder').required = false;
    }

    // Message display functions
    function showMessage(message, type) {
        if (messageDiv) {
            messageDiv.textContent = message;
            messageDiv.className = `message ${type}`;
            messageDiv.style.display = 'block';
            
            // Auto-hide success messages after 5 seconds
            if (type === 'success') {
                setTimeout(() => {
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

    // Phone number formatting (optional)
    const phoneInput = document.getElementById('phone');
    phoneInput.addEventListener('input', function(e) {
        let value = e.target.value.replace(/\D/g, '');
        if (value.length >= 6) {
            value = value.replace(/(\d{3})(\d{3})(\d{4})/, '($1) $2-$3');
        } else if (value.length >= 3) {
            value = value.replace(/(\d{3})(\d{0,3})/, '($1) $2');
        }
        e.target.value = value;
    });

    // Add real-time validation for required fields
    const requiredFields = ['fullName', 'phone', 'email', 'jobTitle', 'supervisor', 'employmentStatus'];
    requiredFields.forEach(fieldId => {
        const field = document.getElementById(fieldId);
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
    });

    // Email validation on blur
    document.getElementById('email').addEventListener('blur', function() {
        if (this.value && !isValidEmail(this.value)) {
            this.classList.add('error');
            showMessage('Please enter a valid email address', 'error');
        }
    });

        // Development helper
    if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
        console.log('Development mode - Form is ready');
        
        // Optional: Pre-fill form for testing
        // document.getElementById('fullName').value = 'John Doe';
        // document.getElementById('email').value = 'john.doe@shifttransit.net';
    }
});
                                         
