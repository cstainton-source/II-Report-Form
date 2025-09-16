document.addEventListener('DOMContentLoaded', function() {
    // Get DOM elements
    const screen1 = document.getElementById('screen-1');
    const screen2 = document.getElementById('screen-2');
    const screen3 = document.getElementById('screen-3');
    const nextToScreen2Btn = document.getElementById('next-to-screen-2');
    const nextToScreen3Btn = document.getElementById('next-to-screen-3');
    const backToScreen1Btn = document.getElementById('back-to-screen-1');
    const backToScreen2Btn = document.getElementById('back-to-screen-2');
    const submitFormBtn = document.getElementById('submit-form');
    const responderDropdown = document.getElementById('responder');
    const otherResponderGroup = document.getElementById('other-responder-group');
    const messageDiv = document.getElementById('message');

    console.log('JavaScript loaded successfully');

    // Navigation: Next to Screen 2
    if (nextToScreen2Btn) {
        nextToScreen2Btn.addEventListener('click', function() {
            console.log('Next to Screen 2 clicked');
            if (validateScreen1()) {
                console.log('Validation passed, showing screen 2');
                showScreen(2);
            } else {
                console.log('Validation failed');
            }
        });
    }

    // Navigation: Next to Screen 3
    if (nextToScreen3Btn) {
        nextToScreen3Btn.addEventListener('click', function() {
            console.log('Next to Screen 3 clicked');
            showScreen(3);
        });
    }

    // Navigation: Back to Screen 1
    if (backToScreen1Btn) {
        backToScreen1Btn.addEventListener('click', function() {
            console.log('Back to Screen 1 clicked');
            showScreen(1);
        });
    }

    // Navigation: Back to Screen 2
    if (backToScreen2Btn) {
        backToScreen2Btn.addEventListener('click', function() {
            console.log('Back to Screen 2 clicked');
            showScreen(2);
        });
    }

        // Handle form submission
    if (submitFormBtn) {
        submitFormBtn.addEventListener('click', function() {
            console.log('Submit button clicked');
            if (validateScreen3()) {
                const formData = collectFormData();
                console.log('Form submitted:', formData);
                showMessage('Form submitted successfully!', 'success');
            } else {
                console.log('Screen 3 validation failed');
            }
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

    // Update validateScreen3 function
function validateScreen3() {
    const requiredFields = ['incidentDate', 'incidentLocation', 'workdayPart', 'incidentDescription'];
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

    // Check conditional required fields
    if (document.getElementById('workdayPart').value === 'other') {
        const otherWorkday = document.getElementById('otherWorkdayPart');
        if (!otherWorkday.value.trim()) {
            otherWorkday.classList.add('error');
            isValid = false;
        }
    }

    if (document.querySelector('input[name="bodyPartHurtBefore"]:checked').value === 'yes') {
        const previousDetails = document.getElementById('previousInjuryDetails');
        if (!previousDetails.value.trim()) {
            previousDetails.classList.add('error');
            isValid = false;
        }
    }

    if (document.querySelector('input[name="propertyDamage"]:checked').value === 'yes') {
        const propertyDetails = document.getElementById('propertyDamageDetails');
        if (!propertyDetails.value.trim()) {
            propertyDetails.classList.add('error');
            isValid = false;
        }
    }

    if (!isValid) {
        showMessage('Please fill in all required fields on this page.', 'error');
    }

    return isValid;
}

    // Screen navigation with smooth scrolling
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
            
            // Smooth scroll to top of the form
            const container = document.querySelector('.container');
            if (container) {
                container.scrollIntoView({ 
                    behavior: 'smooth', 
                    block: 'start' 
                });
            }
        } else {
            console.error('Screen ' + screenNumber + ' not found');
        }
        
        // Clear messages when changing screens
        clearMessage();
    }

        function collectFormData() {
    // Helper function to create employment length string
    function getEmploymentLength() {
        const years = getValue('employmentYears') || '0';
        const months = getValue('employmentMonths') || '0';
        let result = '';
        
        if (parseInt(years) > 0) {
            result += years + ' year' + (parseInt(years) !== 1 ? 's' : '');
        }
        
        if (parseInt(months) > 0) {
            if (result) result += ', ';
            result += months + ' month' + (parseInt(months) !== 1 ? 's' : '');
        }
        
        return result || '0 months';
    }

    // Helper function to get radio button values
    function getRadioValue(name) {
        const radio = document.querySelector(`input[name="${name}"]:checked`);
        return radio ? radio.value : '';
    }

    return {
        // Employee information
        fullName: getValue('fullName'),
        phone: getValue('phone'),
        age: getValue('age'),
        email: getValue('email'),
        jobTitle: getValue('jobTitle'),
        employmentYears: getValue('employmentYears'),
        employmentMonths: getValue('employmentMonths'),
        employmentLength: getEmploymentLength(),
        supervisor: getValue('supervisor'),
        employmentStatus: getValue('employmentStatus'),
        
        // First responder information
        responder: getValue('responder'),
        otherResponder: getValue('otherResponder'),
        responderName: getValue('responderName'),
        policeReportFiled: getChecked('policeReportFiled'),
        policeReportNumber: getValue('policeReportNumber'),
        witnesses: getValue('witnesses'),
        
        // Incident/Injury details
        incidentDate: getValue('incidentDate'),
        incidentTime: getValue('incidentTime'),
        incidentLocation: getValue('incidentLocation'),
        workdayPart: getValue('workdayPart'),
        otherWorkdayPart: getValue('otherWorkdayPart'),
        bodyPart: getValue('bodyPart'),
        injuryLocations: getValue('injuryLocations'), // From body diagram
        bodyPartHurtBefore: getRadioValue('bodyPartHurtBefore'),
        previousInjuryDetails: getValue('previousInjuryDetails'),
        propertyDamage: getRadioValue('propertyDamage'),
        propertyDamageDetails: getValue('propertyDamageDetails'),
        incidentDescription: getValue('incidentDescription'),
        medicalAttentionRequired: getChecked('medicalAttentionRequired'),
        immediateActions: getValue('immediateActions')
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

    // Add real-time validation for required fields (Screen 1)
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

    // Add real-time validation for required fields (Screen 3)
    const screen3RequiredFields = ['incidentDate', 'incidentLocation', 'incidentType', 'incidentDescription'];
    screen3RequiredFields.forEach(function(fieldId) {
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

    // Set max date for incident date to today
    const incidentDateInput = document.getElementById('incidentDate');
    if (incidentDateInput) {
        const today = new Date().toISOString().split('T')[0];
        incidentDateInput.setAttribute('max', today);
    }

    // Limit employment years and months input
    const employmentYearsInput = document.getElementById('employmentYears');
    const employmentMonthsInput = document.getElementById('employmentMonths');
    
    if (employmentMonthsInput) {
        employmentMonthsInput.addEventListener('input', function() {
            if (parseInt(this.value) > 11) {
                this.value = '11';
            }
        });
    }

    if (employmentYearsInput) {
        employmentYearsInput.addEventListener('input', function() {
            if (parseInt(this.value) > 50) {
                this.value = '50';
            }
        });
    }

    // Development helper
    if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
        console.log('Development mode - Form is ready');
        console.log('All screens found:');
        console.log('Screen 1:', screen1);
        console.log('Screen 2:', screen2);
        console.log('Screen 3:', screen3);
    }

    // 1. Body Diagram Interactions
    const bodyParts = document.querySelectorAll('.body-part');
    const selectedInjuriesDiv = document.getElementById('selectedInjuries');
    const injuryLocationsInput = document.getElementById('injuryLocations');
    let selectedBodyParts = [];

    bodyParts.forEach(part => {
        part.addEventListener('click', function() {
            // ... body diagram code
        });
    });

    // 2. Workday Part Conditional Field
    const workdayPartSelect = document.getElementById('workdayPart');
    const otherWorkdayGroup = document.getElementById('other-workday-group');
    
    if (workdayPartSelect) {
        // ... workday part code
    }

    // 3. Previous Injury Conditional Field
    const bodyPartHurtRadios = document.querySelectorAll('input[name="bodyPartHurtBefore"]');
const previousInjuryGroup = document.getElementById('previous-injury-group');

bodyPartHurtRadios.forEach(radio => {
    radio.addEventListener('change', function() {
        if (this.value === 'yes') {
            previousInjuryGroup.style.display = 'block';
            document.getElementById('previousInjuryDetails').required = true;
        } else {
            previousInjuryGroup.style.display = 'none';
            document.getElementById('previousInjuryDetails').required = false;
            document.getElementById('previousInjuryDetails').value = '';
        }
    });
});

    // 4. Property Damage Conditional Field
    const propertyDamageRadios = document.querySelectorAll('input[name="propertyDamage"]');
const propertyDamageGroup = document.getElementById('property-damage-group');

propertyDamageRadios.forEach(radio => {
    radio.addEventListener('change', function() {
        if (this.value === 'yes') {
            propertyDamageGroup.style.display = 'block';
            document.getElementById('propertyDamageDetails').required = true;
        } else {
            propertyDamageGroup.style.display = 'none';
            document.getElementById('propertyDamageDetails').required = false;
            document.getElementById('propertyDamageDetails').value = '';
        }
    });
});
});
