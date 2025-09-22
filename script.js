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

        // Validation for Screen 5
function validateScreen5() {
    let isValid = true;
    
    // Check if third party is involved
    const thirdPartyInvolved = document.querySelector('input[name="thirdPartyInvolved"]:checked');
    if (thirdPartyInvolved && thirdPartyInvolved.value === 'yes') {
        // Validate required third party fields
        const requiredFields =
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
        injuryLocations: getValue('injuryLocations'),
        bodyPartHurtBefore: getRadioValue('bodyPartHurtBefore'),
        previousInjuryDetails: getValue('previousInjuryDetails'),
        propertyDamage: getRadioValue('propertyDamage'),
        propertyDamageDetails: getValue('propertyDamageDetails'),
        incidentDescription: getValue('incidentDescription'),
        preventionMeasures: getValue('preventionMeasures'), // Updated field name
        
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

    // Company vehicle conditional field
const companyVehicleRadios = document.querySelectorAll('input[name="companyVehicleInvolved"]');
const companyVehicleGroup = document.getElementById('company-vehicle-group');

companyVehicleRadios.forEach(radio => {
    radio.addEventListener('change', function() {
        if (this.value === 'yes') {
            companyVehicleGroup.style.display = 'block';
            document.getElementById('companyVehiclePlate').required = true;
        } else {
            companyVehicleGroup.style.display = 'none';
            document.getElementById('companyVehiclePlate').required = false;
            document.getElementById('companyVehiclePlate').value = '';
        }
    });
});

// Third party conditional field
const thirdPartyRadios = document.querySelectorAll('input[name="thirdPartyInvolved"]');
const thirdPartyDetails = document.getElementById('third-party-details');

thirdPartyRadios.forEach(radio => {
    radio.addEventListener('change', function() {
        if (this.value === 'yes') {
            thirdPartyDetails.style.display = 'block';
            // Make third party fields required when shown
            document.getElementById('thirdPartyName').required = true;
            document.getElementById('thirdPartyContact').required = true;
        } else {
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
    });
});
