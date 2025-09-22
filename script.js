document.addEventListener('DOMContentLoaded', function() {
    // Get DOM elements
    const screen1 = document.getElementById('screen-1');
    const screen2 = document.getElementById('screen-2');
    const screen3 = document.getElementById('screen-3');
    const screen4 = document.getElementById('screen-4');
    const screen5 = document.getElementById('screen-5');
    const nextToScreen2Btn = document.getElementById('next-to-screen-2');
    const nextToScreen3Btn = document.getElementById('next-to-screen-3');
    const nextToScreen4Btn = document.getElementById('next-to-screen-4');
    const nextToScreen5Btn = document.getElementById('next-to-screen-5');
    const backToScreen1Btn = document.getElementById('back-to-screen-1');
    const backToScreen2Btn = document.getElementById('back-to-screen-2');
    const backToScreen3Btn = document.getElementById('back-to-screen-3');
    const backToScreen4Btn = document.getElementById('back-to-screen-4');
    const submitFormFinalBtn = document.getElementById('submit-form-final');
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

    // Navigation: Next to Screen 4
    if (nextToScreen4Btn) {
        nextToScreen4Btn.addEventListener('click', function() {
            console.log('Next to Screen 4 clicked');
            if (validateScreen3()) {
                showScreen(4);
            }
        });
    }

    // Navigation: Next to Screen 5
    if (nextToScreen5Btn) {
        nextToScreen5Btn.addEventListener('click', function() {
            console.log('Next to Screen 5 clicked');
            showScreen(5);
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

    // Navigation: Back to Screen 3
    if (backToScreen3Btn) {
        backToScreen3Btn.addEventListener('click', function() {
            console.log('Back to Screen 3 clicked');
            showScreen(3);
        });
    }

    // Navigation: Back to Screen 4
    if (backToScreen4Btn) {
        backToScreen4Btn.addEventListener('click', function() {
            console.log('Back to Screen 4 clicked');
            showScreen(4);
        });
    }

    // Handle final form submission
    if (submitFormFinalBtn) {
        submitFormFinalBtn.addEventListener('click', function() {
            console.log('Final Submit button clicked');
            if (validateScreen5()) {
                const formData = collectFormData();
                console.log('Form submitted:', formData);
                showMessage('Form submitted successfully!', 'success');
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

    // Workday Part Conditional Field
    const workdayPartSelect = document.getElementById('workdayPart');
    const otherWorkdayGroup = document.getElementById('other-workday-group');

    if (workdayPartSelect && otherWorkdayGroup) {
        workdayPartSelect.addEventListener('change', function() {
            if (this.value === 'other') {
                otherWorkdayGroup.style.display = 'block';
                const otherField = document.getElementById('otherWorkdayPart');
                if (otherField) {
                    otherField.required = true;
                }
            } else {
                otherWorkdayGroup.style.display = 'none';
                const otherField = document.getElementById('otherWorkdayPart');
                if (otherField) {
                    otherField.required = false;
                    otherField.value = '';
                }
            }
        });
    }

    // Previous Injury Conditional Field
    const bodyPartHurtRadios = document.querySelectorAll('input[name="bodyPartHurtBefore"]');
    const previousInjuryGroup = document.getElementById('previous-injury-group');

    bodyPartHurtRadios.forEach(radio => {
        radio.addEventListener('change', function() {
            if (this.value === 'yes') {
                if (previousInjuryGroup) {
                    previousInjuryGroup.style.display = 'block';
                    const previousDetails = document.getElementById('previousInjuryDetails');
                    if (previousDetails) {
                        previousDetails.required = true;
                    }
                }
            } else {
                if (previousInjuryGroup) {
                    previousInjuryGroup.style.display = 'none';
                    const previousDetails = document.getElementById('previousInjuryDetails');
                    if (previousDetails) {
                        previousDetails.required = false;
                        previousDetails.value = '';
                    }
                }
            }
        });
    });

    // Property Damage Conditional Field
    const propertyDamageRadios = document.querySelectorAll('input[name="propertyDamage"]');
    const propertyDamageGroup = document.getElementById('property-damage-group');

    propertyDamageRadios.forEach(radio => {
        radio.addEventListener('change', function() {
            if (this.value === 'yes') {
                if (propertyDamageGroup) {
                    propertyDamageGroup.style.display = 'block';
                    const propertyDetails = document.getElementById('propertyDamageDetails');
                    if (propertyDetails) {
                        propertyDetails.required = true;
                    }
                }
            } else {
                if (propertyDamageGroup) {
                    propertyDamageGroup.style.display = 'none';
                    const propertyDetails = document.getElementById('propertyDamageDetails');
                    if (propertyDetails) {
                        propertyDetails.required = false;
                        propertyDetails.value = '';
                    }
                }
            }
        });
    });
