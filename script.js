// script.js
document.addEventListener('DOMContentLoaded', function() {
    const screen1 = document.getElementById('screen-1');
    const screen2 = document.getElementById('screen-2');
    const lookupBtn = document.getElementById('lookup-btn');
    const nextToScreen2Btn = document.getElementById('next-to-screen-2');
    const backToScreen1Btn = document.getElementById('back-to-screen-1');
    const employeeEmailInput = document.getElementById('employeeEmail');
    const employeeSelection = document.getElementById('employee-selection');
    const selectedEmployeeDropdown = document.getElementById('selectedEmployee');
    const loadingDiv = document.getElementById('loading');
    const messageDiv = document.getElementById('message');
    const screen3 = document.getElementById('screen-3');
    const nextToScreen3Btn = document.getElementById('next-to-screen-3');
    const backToScreen2Btn = document.getElementById('back-to-screen-2');
    const responderDropdown = document.getElementById('responder');
    const otherResponderGroup = document.getElementById('other-responder-group');

    // Test data (replace with actual BambooHR API later)
    const testEmployeeData = {
        'cstainton@shifttransit.net': {
            fullName: 'Colin Stainton',
            phone: '999-999-1423',
            age: '55',
            email: 'cstainton@shifttransit.net',
            jobTitle: 'Marketing Manager',
            lengthOfEmployment: '2.8 years',
            supervisor: 'Dan T',
            employmentStatus: 'Regular Full Time'
        }
        // Add more test employees here as needed
    };

    let currentEmployeeData = null;

    // Lookup employee button click
    lookupBtn.addEventListener('click', async function() {
        const email = employeeEmailInput.value.trim();
        
        if (!email) {
            showMessage('Please enter your email address', 'error');
            return;
        }

        if (!isValidEmail(email)) {
            showMessage('Please enter a valid email address', 'error');
            return;
        }

        showLoading(true);
        
        try {
            // Simulate API call delay
            await new Promise(resolve => setTimeout(resolve, 1500));
            
            // Check if employee exists in test data
            if (testEmployeeData[email]) {
                currentEmployeeData = testEmployeeData[email];
                
                // Populate dropdown with found employee
                selectedEmployeeDropdown.innerHTML = `
                    <option value="">Choose your profile...</option>
                    <option value="${email}">${testEmployeeData[email].fullName} (${email})</option>
                `;
                
                employeeSelection.style.display = 'block';
                showMessage('Employee found! Please confirm your profile below.', 'success');
            } else {
                showMessage('Employee not found. Please check your email address or contact HR.', 'error');
                employeeSelection.style.display = 'none';
            }
            
        } catch (error) {
                        showMessage('Error looking up employee information. Please try again.', 'error');
        } finally {
            showLoading(false);
        }
    });

    // Employee selection change
    selectedEmployeeDropdown.addEventListener('change', function() {
        if (this.value) {
            nextTo2Btn.disabled = false;
            showMessage('Profile confirmed! Click "Next Page" to continue.', 'success');
        } else {
            nextTo2Btn.disabled = true;
        }
    });

    // Next to Screen 2 button
    nextToScreen2Btn.addEventListener('click', function() {
        if (currentEmployeeData) {
            fillEmployeeInformation(currentEmployeeData);
            showScreen(2);
        }
    });

    // Back to Screen 1 button
    backToScreen1Btn.addEventListener('click', function() {
        showScreen(1);
    });

    // Next to Screen 3 button
nextToScreen3Btn.addEventListener('click', function() {
    showScreen(3);
});

// Back to Screen 2 button
backToScreen2Btn.addEventListener('click', function() {
    showScreen(2);
});

    // Handle "Other" responder selection
responderDropdown.addEventListener('change', function() {
    if (this.value === 'other') {
        otherResponderGroup.style.display = 'block';
        document.getElementById('otherResponder').required = true;
    } else {
        otherResponderGroup.style.display = 'none';
                document.getElementById('otherResponder').required = false;
        document.getElementById('otherResponder').value = ''; // Clear the field when hidden
    }
});

// Update your existing showScreen function to handle screen 3
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

    // Fill employee information on screen 2
    function fillEmployeeInformation(data) {
        document.getElementById('fullName').value = data.fullName;
        document.getElementById('phone').value = data.phone;
        document.getElementById('age').value = data.age;
        document.getElementById('email').value = data.email;
        document.getElementById('jobTitle').value = data.jobTitle;
        document.getElementById('lengthOfEmployment').value = data.lengthOfEmployment;
        document.getElementById('supervisor').value = data.supervisor;
        document.getElementById('employmentStatus').value = data.employmentStatus;
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

    // Email validation
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    // UI helper functions
    function showLoading(show) {
        if (loadingDiv) {
            loadingDiv.style.display = show ? 'block' : 'none';
        }
        if (lookupBtn) {
            lookupBtn.disabled = show;
            lookupBtn.textContent = show ? 'Looking up...' : 'Lookup Employee';
        }
    }

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

    // Allow Enter key to trigger lookup
    employeeEmailInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            e.preventDefault();
            lookupBtn.click();
        }
    });

    // Development helper (remove in production)
    if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
        console.log('Development mode - Available test email: cstainton@shifttransit.net');
        
        // Optional: Pre-fill email for testing
        // employeeEmailInput.value = 'cstainton@shifttransit.net';
    }
});
