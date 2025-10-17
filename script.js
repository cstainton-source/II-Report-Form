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

    // Body Diagram Interaction
document.addEventListener('DOMContentLoaded', function() {
    const bodyParts = document.querySelectorAll('.body-part');
    const selectedInjuriesDiv = document.getElementById('selectedInjuries');
    const injuryLocationsInput = document.getElementById('injuryLocations');
    let selectedParts = [];

    // Add click event to each body part
    bodyParts.forEach(part => {
        part.addEventListener('click', function() {
            const partName = this.getAttribute('data-part');
            
            // Toggle selection
            if (this.classList.contains('selected')) {
                // Deselect
                this.classList.remove('selected');
                removeInjuryTag(partName);
            } else {
                // Select
                this.classList.add('selected');
                addInjuryTag(partName);
            }
            
            updateHiddenInput();
        });
    });

    

    // Add injury tag to display
    function addInjuryTag(partName) {
        if (!selectedParts.includes(partName)) {
            selectedParts.push(partName);
            
            const tag = document.createElement('div');
            tag.className = 'injury-tag';
            tag.setAttribute('data-part', partName);
            tag.innerHTML = `
                <span>${partName}</span>
                <button type="button" class="remove-btn" onclick="removeInjuryByClick('${partName}')">×</button>
            `;
            
            selectedInjuriesDiv.appendChild(tag);
        }
    }

    // Remove injury tag from display
    function removeInjuryTag(partName) {
        selectedParts = selectedParts.filter(part => part !== partName);
        
        const tag = selectedInjuriesDiv.querySelector(`[data-part="${partName}"]`);
        if (tag) {
            tag.remove();
        }
    }

    // Update hidden input with selected parts
    function updateHiddenInput() {
        injuryLocationsInput.value = selectedParts.join(', ');
    }

    // Global function to remove injury by clicking the X button
    window.removeInjuryByClick = function(partName) {
        // Remove from selected parts
        removeInjuryTag(partName);
        
        // Deselect from SVG
        const bodyPart = document.querySelector(`.body-part[data-part="${partName}"]`);
        if (bodyPart) {
            bodyPart.classList.remove('selected');
        }
        
        updateHiddenInput();
    };
});

// Body Diagram Elements
    const bodyParts = document.querySelectorAll('.body-part');
    const selectedInjuriesDiv = document.getElementById('selectedInjuries');
    const injuryLocationsInput = document.getElementById('injuryLocations');
    let selectedParts = [];

    console.log('Body parts found:', bodyParts.length);
    console.log('Selected injuries div exists:', !!selectedInjuriesDiv);
    console.log('Hidden input exists:', !!injuryLocationsInput);

    // Initialize body diagram if elements exist
    if (bodyParts.length > 0 && selectedInjuriesDiv && injuryLocationsInput) {
        console.log('Initializing body diagram...');
        
        // Add click handlers to body parts
        bodyParts.forEach(part => {
            part.style.cursor = 'pointer';
            
            part.addEventListener('click', function(e) {
                e.preventDefault();
                const partName = this.getAttribute('data-part');
                console.log('Body part clicked:', partName);
                
                // Toggle selection
                if (this.classList.contains('selected')) {
                    this.classList.remove('selected');
                    removeInjuryTag(partName);
                    console.log('Deselected:', partName);
                } else {
                    this.classList.add('selected');
                    addInjuryTag(partName);
                    console.log('Selected:', partName);
                }
                
                updateInjuryInput();
            });
        });
        
        // Add injury tag
        function addInjuryTag(partName) {
            if (selectedParts.includes(partName)) {
                console.log('Part already selected:', partName);
                return;
            }
            
            selectedParts.push(partName);
            console.log('Adding tag for:', partName);
            
            const tag = document.createElement('div');
            tag.className = 'injury-tag';
            tag.setAttribute('data-part', partName);
            tag.innerHTML = `
                <span>${partName}</span>
                <button type="button" class="remove-btn">×</button>
            `;
            
            // Add remove button handler
            const removeBtn = tag.querySelector('.remove-btn');
            removeBtn.addEventListener('click', function(e) {
                e.stopPropagation();
                removeInjuryComplete(partName);
            });
            
            selectedInjuriesDiv.appendChild(tag);
            console.log('Tag added successfully');
        }
        
        // Remove injury tag
        function removeInjuryTag(partName) {
            selectedParts = selectedParts.filter(part => part !== partName);
            console.log('Removed from array:', partName);
            
            const tag = selectedInjuriesDiv.querySelector(`[data-part="${partName}"]`);
            if (tag) {
                tag.remove();
                console.log('Tag removed from DOM');
            }
        }
        
        // Remove injury completely (from both display and SVG)
        function removeInjuryComplete(partName) {
            console.log('Complete removal for:', partName);
            
            // Remove tag
            removeInjuryTag(partName);
            
            // Deselect from SVG
            const bodyPart = document.querySelector(`.body-part[data-part="${partName}"]`);
            if (bodyPart) {
                bodyPart.classList.remove('selected');
                console.log('SVG element deselected');
            }
            
            updateInjuryInput();
        }
        
        // Update hidden input
        function updateInjuryInput() {
            const value = selectedParts.join(', ');
            injuryLocationsInput.value = value;
            console.log('Hidden input updated:', value);
        }
        
        console.log('Body diagram initialized successfully!');
    } else {
        console.error('Body diagram elements not found!');
        if (bodyParts.length === 0) console.error('- No .body-part elements');
        if (!selectedInjuriesDiv) console.error('- #selectedInjuries not found');
        if (!injuryLocationsInput) console.error('- #injuryLocations not found');
    }
        
    // Helper function to get input value safely
function getValue(id) {
    const element = document.getElementById(id);
    return element ? element.value.trim() : '';
}

// Helper function to get radio button value
function getRadioValue(name) {
    const radio = document.querySelector(`input[name="${name}"]:checked`);
    return radio ? radio.value : '';
}

// Helper function to get all checked checkbox values (as comma-separated string)
function getCheckedValues(name) {
    const checkboxes = document.querySelectorAll(`input[name="${name}"]:checked`);
    const values = Array.from(checkboxes).map(cb => cb.value);
    return values.length > 0 ? values.join(', ') : '';
}

// Helper function to get checkbox label text instead of values
function getCheckedLabels(name) {
    const checkboxes = document.querySelectorAll(`input[name="${name}"]:checked`);
    const labels = Array.from(checkboxes).map(cb => {
        const label = cb.closest('label');
        return label ? label.textContent.trim() : cb.value;
    });
    return labels.length > 0 ? labels.join(', ') : '';
}

    function showScreen(screenNumber) {
        // Hide all screens
        [screen1, screen2, screen3, screen4, screen5].forEach(screen => {
            if (screen) screen.style.display = 'none';
        });

        // Show target screen
        const targetScreen = document.getElementById(`screen-${screenNumber}`);
        if (targetScreen) {
            targetScreen.style.display = 'block';
            console.log(`Showing screen ${screenNumber}`);
        }
    }

    function showMessage(message, type = 'info') {
        if (messageDiv) {
            messageDiv.textContent = message;
            messageDiv.className = `message ${type}`;
            messageDiv.style.display = 'block';
            
            // Auto-hide after 5 seconds
            setTimeout(() => {
                messageDiv.style.display = 'none';
            }, 5000);
        }
    }

    // Validation functions
    function validateScreen1() {
        const requiredFields = ['fullName', 'phone', 'age', 'email', 'jobTitle', 'supervisor'];
        let isValid = true;

        requiredFields.forEach(fieldId => {
            const field = document.getElementById(fieldId);
            if (!field || !field.value.trim()) {
                isValid = false;
                if (field) {
                    field.style.borderColor = 'red';
                    showMessage(`Please fill in the ${fieldId.replace(/([A-Z])/g, ' $1').toLowerCase()} field.`, 'error');
                }
            } else if (field) {
                field.style.borderColor = '';
            }
        });

        // Validate employment duration
        const years = getValue('employmentYears');
        const months = getValue('employmentMonths');
        if ((!years || parseInt(years) === 0) && (!months || parseInt(months) === 0)) {
            isValid = false;
            showMessage('Please specify employment duration (years and/or months).', 'error');
        }

        return isValid;
    }

        function validateScreen3() {
    const requiredFields = ['incidentDate', 'incidentTime', 'incidentLocation', 'workdayPart', 'bodyPart', 'incidentDescription'];
    let isValid = true;

    requiredFields.forEach(fieldId => {
        const field = document.getElementById(fieldId);
        if (!field || !field.value.trim()) {
            isValid = false;
            if (field) {
                field.style.borderColor = 'red';
                showMessage(`Please fill in the ${fieldId.replace(/([A-Z])/g, ' $1').toLowerCase()} field.`, 'error');
            }
        } else if (field) {
            field.style.borderColor = '';
        }
    });

    // Check if "other" workday part is selected and validate
    const workdayPart = getValue('workdayPart');
    if (workdayPart === 'other' && !getValue('otherWorkdayPart')) {
        isValid = false;
        showMessage('Please specify the other workday part.', 'error');
    }
    
    return isValid;
} // ← Close validateScreen3 here

function validateScreen4() { // ← Start validateScreen4 as separate function
    let isValid = true;
    
    // Check required radio buttons
    const sawDoctor = document.querySelector('input[name="sawDoctor"]:checked');
    if (!sawDoctor) {
        isValid = false;
        showMessage('Please indicate if you saw a doctor.', 'error');
    }
    
    const willSeeDoctor = document.querySelector('input[name="willSeeDoctor"]:checked');
    if (!willSeeDoctor) {
        isValid = false;
        showMessage('Please indicate if you will see a doctor.', 'error');
    }
    
    const companyVehicle = document.querySelector('input[name="companyVehicleInvolved"]:checked');
    if (!companyVehicle) {
        isValid = false;
        showMessage('Please indicate if a company vehicle was involved.', 'error');
    } else if (companyVehicle.value === 'yes' && !getValue('companyVehiclePlate')) {
        isValid = false;
        showMessage('Please provide the company vehicle license plate.', 'error');
    }
    
    return isValid;
}

    function validateScreen5() {
        let isValid = true;
        
        // Check if third party is involved
        const thirdPartyInvolved = document.querySelector('input[name="thirdPartyInvolved"]:checked');
        if (!thirdPartyInvolved) {
            isValid = false;
            showMessage('Please indicate if a third party was involved.', 'error');
            return isValid;
        }

        if (thirdPartyInvolved.value === 'yes') {
            // Validate required third party fields
            const requiredFields = ['thirdPartyName', 'thirdPartyContact'];
            
            requiredFields.forEach(fieldId => {
                const field = document.getElementById(fieldId);
                if (!field || !field.value.trim()) {
                    isValid = false;
                    if (field) {
                        field.style.borderColor = 'red';
                        showMessage(`Please fill in the ${fieldId.replace(/([A-Z])/g, ' $1').toLowerCase()} field.`, 'error');
                    }
                } else if (field) {
                    field.style.borderColor = '';
                }
            });
        }

        return isValid;
    }

// Update the showScreen function to include progress
function showScreen(screenNumber) {
    // Hide all screens
    [screen1, screen2, screen3, screen4, screen5].forEach(screen => {
        if (screen) screen.style.display = 'none';
    });

    // Show target screen
    const targetScreen = document.getElementById(`screen-${screenNumber}`);
    if (targetScreen) {
        targetScreen.style.display = 'block';
        updateProgress(screenNumber);
        console.log(`Showing screen ${screenNumber}`);
        
        // Scroll to top
        window.scrollTo(0, 0);
    }
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
            policeReportFiled: getCheckedValues('policeReportFiled'),
            policeReportNumber: getValue('policeReportNumber'),
            witnesses: getValue('witnesses'),
            
            // Incident/Injury details
            incidentDate: getValue('incidentDate'),
            incidentTime: getValue('incidentTime'),
            incidentLocation: getValue('incidentLocation'),
            workdayPart: getValue('workdayPart'),
            otherWorkdayPart: getValue('otherWorkdayPart'),
            bodyPart: getValue('bodyPart'),
            injuryLocations: getValue('injuryLocations'),
            typeofinjury: getCheckedValues('injury'),
            otherInjuryDescription: getValue('other-description'),
            bodyPartHurtBefore: getRadioValue('bodyPartHurtBefore'),
            previousInjuryDetails: getValue('previousInjuryDetails'),
            propertyDamage: getRadioValue('propertyDamage'),
            propertyDamageDetails: getValue('propertyDamageDetails'),
            incidentDescription: getValue('incidentDescription'),
            preventionMeasures: getValue('preventionMeasures'),
            
            // Medical and vehicle details (Screen 4)
            sawDoctor: getRadioValue('sawDoctor'),
            willSeeDoctor: getRadioValue('willSeeDoctor'),
            doctorHospitalName: getValue('doctorHospitalName'),
            companyVehicleInvolved: getRadioValue('companyVehicleInvolved'),
            companyVehiclePlate: getValue('companyVehiclePlate'),
            
            // Third party information (Screen 5)
            thirdPartyInvolved: getRadioValue('thirdPartyInvolved'),
            thirdPartyName: getValue('thirdPartyName'),
            thirdPartyLicense: getValue('thirdPartyLicense'),
            thirdPartyContact: getValue('thirdPartyContact'),
            thirdPartyVehiclePlate: getValue('thirdPartyVehiclePlate'),
            thirdPartyInsurance: getValue('thirdPartyInsurance'),
            otherInfoExchanged: getValue('otherInfoExchanged')
        };
    }

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
        // Temporarily bypass validation
        showScreen(4);
        
        // Original code:
        // if (validateScreen3()) {
        //     showScreen(4);
        // }
    });
}

        // Navigation: Next to Screen 5
    if (nextToScreen5Btn) {
    nextToScreen5Btn.addEventListener('click', function() {
        console.log('Next to Screen 5 clicked');
        if (validateScreen4()) { // Add screen 4 validation
            showScreen(5);
        }
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
    submitFormFinalBtn.addEventListener('click', async function(e) {
        e.preventDefault(); // Prevent default form behavior
        console.log('Final Submit button clicked');
        
        if (validateScreen5()) {
            // Disable button to prevent double submission
            this.disabled = true;
            const originalText = this.textContent;
            this.textContent = 'Submitting...';
            
            try {
                const formData = collectFormData();
                console.log('Form data collected:', formData);
                
                // *** THIS IS THE KEY PART - SEND TO GOOGLE SCRIPT ***
                const result = await submitToGoogleScript(formData);
                console.log('Submission result:', result);
                
                // Show success message
                showMessage('Form submitted successfully! Check your email for confirmation.', 'success');
                
                // Optional: Reset form after 2 seconds
                setTimeout(() => {
                    document.getElementById('incidentForm').reset();
                    showScreen(1); // Go back to first screen
                }, 2000);
                
            } catch (error) {
                console.error('Submission error:', error);
                showMessage('Error submitting form. Please try again or contact support.', 'error');
                
                // Re-enable button
                this.disabled = false;
                this.textContent = originalText;
            }
        }
    });
}

    // Configuration - UPDATE THIS URL!
const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbxktVPfUgwuJmTm3m1NKjBuGb3FxpMRb9Z6jbAXZgL0Rk4vXbnOs0DHLT_YPmwenyw_ug/exec';

// Function to submit data to Google Apps Script
async function submitToGoogleScript(formData) {
    console.log('Sending to Google Script:', GOOGLE_SCRIPT_URL);
    console.log('Data being sent:', formData);
    
    try {
        const response = await fetch(GOOGLE_SCRIPT_URL, {
            method: 'POST',
            mode: 'no-cors', // Required for Google Apps Script
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData)
        });
        
        // Note: With 'no-cors', we can't read the actual response
        // But if we get here without error, the submission worked
        console.log('Data sent successfully');
        return { success: true };
        
    } catch (error) {
        console.error('Error sending to Google Script:', error);
        throw error;
    }
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

    // Company vehicle conditional field
    const companyVehicleRadios = document.querySelectorAll('input[name="companyVehicleInvolved"]');
    const companyVehicleGroup = document.getElementById('company-vehicle-group');

    companyVehicleRadios.forEach(radio => {
        radio.addEventListener('change', function() {
            if (this.value === 'yes') {
                if (companyVehicleGroup) {
                    companyVehicleGroup.style.display = 'block';
                    const plateField = document.getElementById('companyVehiclePlate');
                    if (plateField) {
                        plateField.required = true;
                    }
                }
            } else {
                if (companyVehicleGroup) {
                    companyVehicleGroup.style.display = 'none';
                    const plateField = document.getElementById('companyVehiclePlate');
                    if (plateField) {
                        plateField.required = false;
                        plateField.value = '';
                    }
                }
            }
        });
    });

    // Third party conditional field
    const thirdPartyRadios = document.querySelectorAll('input[name="thirdPartyInvolved"]');
    const thirdPartyDetails = document.getElementById('third-party-details');

    thirdPartyRadios.forEach(radio => {
        radio.addEventListener('change', function() {
            if (this.value === 'yes') {
                if (thirdPartyDetails) {
                    thirdPartyDetails.style.display = 'block';
                    // Make third party fields required when shown
                    const nameField = document.getElementById('thirdPartyName');
                    const contactField = document.getElementById('thirdPartyContact');
                    if (nameField) nameField.required = true;
                    if (contactField) contactField.required = true;
                }
            } else {
                if (thirdPartyDetails) {
                    thirdPartyDetails.style.display = 'none';
                    // Remove required and clear values when hidden
                    const thirdPartyFields = ['thirdPartyName', 'thirdPartyLicense', 'thirdPartyContact', 
                                             'thirdPartyVehiclePlate', 'thirdPartyInsurance', 'otherInfoExchanged'];
                    thirdPartyFields.forEach(fieldId => {
                        const field = document.getElementById(fieldId);
                        if (field) {
                            field.required = false;
                            field.value = '';
                        }
                    });
                }
            }
        });
    });

        function updateProgress(screenNumber) {
        const progressFill = document.getElementById('progress-fill');
        const progressText = document.getElementById('progress-text');
        
        const steps = [
            { text: "Employee Information", width: "20%" },
            { text: "First Responder Information", width: "40%" },
            { text: "Incident/Injury Details", width: "60%" },
            { text: "Medical and Vehicle Details", width: "80%" },
            { text: "Third Party Information", width: "100%" }
        ];
        
        if (progressFill && progressText && steps[screenNumber - 1]) {
            progressFill.style.width = steps[screenNumber - 1].width;
            progressText.textContent = `Step ${screenNumber} of 5: ${steps[screenNumber - 1].text}`;
        }
    }

    // Development mode logging
    if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
        console.log('Development mode - Form is ready');
        console.log('All screens found:');
        console.log('Screen 1:', screen1);
        console.log('Screen 2:', screen2);
        console.log('Screen 3:', screen3);
        console.log('Screen 4:', screen4);
        console.log('Screen 5:', screen5);
    }

    // Initialize - Show first screen
    showScreen(1);
});
