// script.js

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('employee-form');
    const submitBtn = document.getElementById('submit-btn');
    const loadingDiv = document.getElementById('loading');
    const messageDiv = document.getElementById('message');

    // Form submission handler
    form.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        // Show loading state
        showLoading(true);
        clearMessage();
        
        try {
            // Collect form data
            const formData = collectFormData();
            
            // Validate required fields
            if (!validateFormData(formData)) {
                throw new Error('Please fill in all required fields');
            }
            
            // Generate PDF
            const pdfBlob = await generatePDF(formData);
            
            // Send PDF to manager
            await sendPDFToManager(pdfBlob, formData);
            
            // Show success message
            showMessage('Form submitted successfully! PDF has been sent to your manager.', 'success');
            
            // Reset form
            form.reset();
            
        } catch (error) {
            console.error('Error submitting form:', error);
            showMessage(`Error: ${error.message}`, 'error');
        } finally {
            showLoading(false);
        }
    });

    // Collect form data
    function collectFormData() {
        const formData = new FormData(form);
        const data = {};
        
        // Convert FormData to regular object
        for (let [key, value] of formData.entries()) {
            data[key] = value;
        }
        
        // Add timestamp
        data.submissionDate = new Date().toLocaleDateString();
        data.submissionTime = new Date().toLocaleTimeString();
        
        return data;
    }

    // Validate form data
    function validateFormData(data) {
        const requiredFields = ['firstName', 'lastName', 'email', 'department'];
        
        for (let field of requiredFields) {
            if (!data[field] || data[field].trim() === '') {
                return false;
            }
        }
        
        // Validate email format
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(data.email)) {
            throw new Error('Please enter a valid email address');
        }
        
        return true;
    }

    // Generate PDF using jsPDF
    async function generatePDF(data) {
        // Import jsPDF (make sure to include it in your HTML)
        const { jsPDF } = window.jspdf;
        const pdf = new jsPDF();
        
        // PDF styling
        const pageWidth = pdf.internal.pageSize.width;
        const margin = 20;
        let yPosition = 30;
        
        // Title
        pdf.setFontSize(20);
        pdf.setFont(undefined, 'bold');
        pdf.text('Employee Information Form', pageWidth/2, yPosition, { align: 'center' });
        
        yPosition += 20;
        
        // Submission details
        pdf.setFontSize(10);
        pdf.setFont(undefined, 'normal');
        pdf.text(`Submitted: ${data.submissionDate} at ${data.submissionTime}`, pageWidth - margin, yPosition, { align: 'right' });
        
        yPosition += 20;
        
        // Form fields
        pdf.setFontSize(12);
        const fieldMappings = {
            'firstName': 'First Name',
            'lastName': 'Last Name',
            'email': 'Email Address',
            'phone': 'Phone Number',
            'department': 'Department',
            'position': 'Position',
            'startDate': 'Start Date',
            'employeeId': 'Employee ID',
                      'address': 'Address',
            'emergencyContact': 'Emergency Contact',
            'emergencyPhone': 'Emergency Phone',
            'notes': 'Additional Notes'
        };
        
        // Add form data to PDF
        for (let [key, label] of Object.entries(fieldMappings)) {
            if (data[key] && data[key].trim() !== '') {
                pdf.setFont(undefined, 'bold');
                pdf.text(`${label}:`, margin, yPosition);
                pdf.setFont(undefined, 'normal');
                
                // Handle long text (wrap if needed)
                const value = data[key].toString();
                if (value.length > 50) {
                    const splitText = pdf.splitTextToSize(value, pageWidth - margin * 2 - 80);
                    pdf.text(splitText, margin + 80, yPosition);
                    yPosition += splitText.length * 6;
                } else {
                    pdf.text(value, margin + 80, yPosition);
                    yPosition += 8;
                }
                
                yPosition += 4; // Extra spacing between fields
                
                // Check if we need a new page
                if (yPosition > pdf.internal.pageSize.height - 30) {
                    pdf.addPage();
                    yPosition = 30;
                }
            }
        }
        
        // Add signature line
        yPosition += 20;
        pdf.line(margin, yPosition, margin + 100, yPosition);
        pdf.text('Employee Signature', margin, yPosition + 10);
        
        pdf.line(pageWidth - margin - 100, yPosition, pageWidth - margin, yPosition);
        pdf.text('Date', pageWidth - margin - 50, yPosition + 10, { align: 'center' });
        
        // Convert to blob
        const pdfBlob = pdf.output('blob');
        return pdfBlob;
    }

    // Send PDF to manager (multiple options)
    async function sendPDFToManager(pdfBlob, formData) {
        // Option 1: Using EmailJS (recommended for client-side)
        if (typeof emailjs !== 'undefined') {
            await sendViaEmailJS(pdfBlob, formData);
        } 
        // Option 2: Using your own backend API
        else if (window.location.hostname !== 'localhost' && window.location.hostname !== '127.0.0.1') {
            await sendViaAPI(pdfBlob, formData);
        }
        // Option 3: Download PDF locally (fallback for testing)
        else {
            downloadPDF(pdfBlob, formData);
            throw new Error('PDF downloaded locally. Configure email service for production use.');
        }
    }

    // Send via EmailJS
    async function sendViaEmailJS(pdfBlob, formData) {
        // Convert blob to base64
        const base64PDF = await blobToBase64(pdfBlob);
        
        const templateParams = {
            to_email: 'manager@company.com', // Replace with actual manager email
            from_name: `${formData.firstName} ${formData.lastName}`,
            from_email: formData.email,
            subject: `Employee Information Form - ${formData.firstName} ${formData.lastName}`,
            message: `Please find attached the employee information form for ${formData.firstName} ${formData.lastName}.`,
            attachment: base64PDF,
            filename: `employee_form_${formData.firstName}_${formData.lastName}.pdf`
        };
        
        // Replace 'YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', 'YOUR_PUBLIC_KEY' with your EmailJS credentials
        const result = await emailjs.send('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', templateParams, 'YOUR_PUBLIC_KEY');
        
        if (result.status !== 200) {
            throw new Error('Failed to send email');
        }
    }

    // Send via your backend API
    async function sendViaAPI(pdfBlob, formData) {
               const formDataToSend = new FormData();
        formDataToSend.append('pdf', pdfBlob, `employee_form_${formData.firstName}_${formData.lastName}.pdf`);
        formDataToSend.append('employeeData', JSON.stringify(formData));
        formDataToSend.append('managerEmail', 'manager@company.com'); // Replace with actual manager email
        
        const response = await fetch('/api/send-employee-form', {
            method: 'POST',
            body: formDataToSend
        });
        
        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || 'Failed to send form to manager');
        }
        
        return await response.json();
    }

    // Download PDF locally (fallback/testing)
    function downloadPDF(pdfBlob, formData) {
        const url = URL.createObjectURL(pdfBlob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `employee_form_${formData.firstName}_${formData.lastName}.pdf`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    }

    // Convert blob to base64
    function blobToBase64(blob) {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = () => {
                const base64 = reader.result.split(',')[1];
                resolve(base64);
            };
            reader.onerror = reject;
            reader.readAsDataURL(blob);
        });
    }

    // UI helper functions
    function showLoading(show) {
        if (loadingDiv) {
            loadingDiv.style.display = show ? 'block' : 'none';
        }
        if (submitBtn) {
            submitBtn.disabled = show;
            submitBtn.textContent = show ? 'Processing...' : 'Submit Form';
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

    // Form validation helpers (real-time validation)
    const inputs = form.querySelectorAll('input, select, textarea');
    inputs.forEach(input => {
        input.addEventListener('blur', function() {
            validateField(this);
        });
        
        input.addEventListener('input', function() {
            // Clear error state when user starts typing
            this.classList.remove('error');
            const errorMsg = this.parentNode.querySelector('.error-message');
            if (errorMsg) {
                errorMsg.remove();
            }
        });
    });

    function validateField(field) {
        const value = field.value.trim();
        let isValid = true;
        let errorMessage = '';

        // Remove existing error message
        const existingError = field.parentNode.querySelector('.error-message');
        if (existingError) {
            existingError.remove();
        }

        // Check required fields
        if (field.hasAttribute('required') && !value) {
            isValid = false;
            errorMessage = 'This field is required';
        }

        // Email validation
        if (field.type === 'email' && value) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(value)) {
                isValid = false;
                errorMessage = 'Please enter a valid email address';
            }
        }
                    // Phone validation
        if ((field.type === 'tel' || field.name === 'phone' || field.name === 'emergencyPhone') && value) {
            const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
            if (!phoneRegex.test(value.replace(/[\s\-\(\)]/g, ''))) {
                isValid = false;
                errorMessage = 'Please enter a valid phone number';
            }
        }

        // Date validation (not in future for start date)
        if (field.type === 'date' && field.name === 'startDate' && value) {
            const selectedDate = new Date(value);
            const today = new Date();
            today.setHours(0, 0, 0, 0);
            
            if (selectedDate > today) {
                isValid = false;
                errorMessage = 'Start date cannot be in the future';
            }
        }

        // Show error if invalid
        if (!isValid) {
            field.classList.add('error');
            const errorDiv = document.createElement('div');
            errorDiv.className = 'error-message';
            errorDiv.textContent = errorMessage;
            field.parentNode.appendChild(errorDiv);
        } else {
            field.classList.remove('error');
        }

        return isValid;
    }

    // Auto-save draft (optional feature)
    let autoSaveTimeout;
    inputs.forEach(input => {
        input.addEventListener('input', function() {
            clearTimeout(autoSaveTimeout);
            autoSaveTimeout = setTimeout(() => {
                saveDraft();
            }, 1000); // Save after 1 second of no typing
        });
    });

    function saveDraft() {
        const formData = collectFormData();
        localStorage.setItem('employeeFormDraft', JSON.stringify(formData));
    }

    function loadDraft() {
        const draft = localStorage.getItem('employeeFormDraft');
        if (draft) {
            const data = JSON.parse(draft);
            for (let [key, value] of Object.entries(data)) {
                const field = form.querySelector(`[name="${key}"]`);
                if (field && value !== '' && key !== 'submissionDate' && key !== 'submissionTime') {
                    field.value = value;
                }
            }
        }
    }

    function clearDraft() {
        localStorage.removeItem('employeeFormDraft');
    }

    // Load draft on page load
    loadDraft();

    // Clear draft on successful submission
    form.addEventListener('submit', function() {
        setTimeout(clearDraft, 2000); // Clear after successful submission
    });

    // File upload handling (if you have file inputs)
    const fileInputs = form.querySelectorAll('input[type="file"]');
    fileInputs.forEach(input => {
        input.addEventListener('change', function() {
            validateFileUpload(this);
        });
    });

    function validateFileUpload(input) {
        const file = input.files[0];
        if (!file) return true;

        const maxSize = 5 * 1024 * 1024; // 5MB
        const allowedTypes = ['image/jpeg', 'image/png', 'image/jpg', 'application/pdf'];

        if (file.size > maxSize) {
            showMessage('File size must be less than 5MB', 'error');
            input.value = '';
            return false;
        }

        if (!allowedTypes.includes(file.type)) {
            showMessage('Only JPEG, PNG, and PDF files are allowed', 'error');
            input.value = '';
            return false;
        }

        return true;
    }

    // Print functionality (optional)
    window.printForm = function() {
        const formData = collectFormData();
        if (!validateFormData(formData)) {
            showMessage('Please fill in all required fields before printing', 'error');
            return;
        }

        const printWindow = window.open('', '_blank');
        printWindow.document.write(`
                        <html>
                <head>
                    <title>Employee Information Form</title>
                    <style>
                        body { font-family: Arial, sans-serif; margin: 20px; }
                        .header { text-align: center; margin-bottom: 30px; }
                        .field { margin-bottom: 15px; }
                        .label { font-weight: bold; display: inline-block; width: 150px; }
                        .value { display: inline-block; }
                        .signature-section { margin-top: 50px; }
                        .signature-line { border-bottom: 1px solid #000; width: 200px; display: inline-block; }
                        @media print { body { margin: 0; } }
                    </style>
                </head>
                <body>
                    <div class="header">
                        <h1>Employee Information Form</h1>
                        <p>Submitted: ${formData.submissionDate} at ${formData.submissionTime}</p>
                    </div>
                    <div class="content">
                        ${Object.entries(formData)
                            .filter(([key, value]) => value && !key.includes('submission'))
                            .map(([key, value]) => `
                                <div class="field">
                                    <span class="label">${formatFieldName(key)}:</span>
                                    <span class="value">${value}</span>
                                </div>
                            `).join('')}
                    </div>
                    <div class="signature-section">
                        <p>Employee Signature: <span class="signature-line"></span> &nbsp;&nbsp;&nbsp; Date: <span class="signature-line"></span></p>
                    </div>
                </body>
            </html>
        `);
        printWindow.document.close();
        printWindow.print();
    };

    function formatFieldName(fieldName) {
        const fieldMappings = {
            'firstName': 'First Name',
            'lastName': 'Last Name',
            'email': 'Email Address',
            'phone': 'Phone Number',
            'department': 'Department',
            'position': 'Position',
            'startDate': 'Start Date',
            'employeeId': 'Employee ID',
            'address': 'Address',
            'emergencyContact': 'Emergency Contact',
            'emergencyPhone': 'Emergency Phone',
            'notes': 'Additional Notes'
        };
        return fieldMappings[fieldName] || fieldName;
    }

    // Configuration check and warnings
    function checkConfiguration() {
        const warnings = [];
        
        // Check if EmailJS is loaded
        if (typeof emailjs === 'undefined') {
            warnings.push('EmailJS library not loaded. Email functionality will not work.');
        }
        
        // Check if jsPDF is loaded
        if (typeof window.jspdf === 'undefined') {
            warnings.push('jsPDF library not loaded. PDF generation will not work.');
        }
        
        // Check if running on localhost (development mode)
        if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
            warnings.push('Running in development mode. Emails will not be sent.');
        }
        
        if (warnings.length > 0) {
            console.warn('Configuration warnings:', warnings);
        }
    }

    // Run configuration check
    checkConfiguration();

    // Keyboard shortcuts
    document.addEventListener('keydown', function(e) {
        // Ctrl/Cmd + Enter to submit
        if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
            e.preventDefault();
            if (!submitBtn.disabled) {
                form.dispatchEvent(new Event('submit'));
            }
        }
        
        // Escape to clear form (with confirmation)
        if (e.key === 'Escape') {
            if (confirm('Are you sure you want to clear the form? Any unsaved data will be lost.')) {
                form.reset();
                clearDraft();
                                clearMessage();
            }
        }
    });

    // Progress indicator (optional)
    function updateProgress() {
        const totalFields = inputs.length;
        const filledFields = Array.from(inputs).filter(input => {
            return input.value && input.value.trim() !== '';
        }).length;
        
        const progressPercent = Math.round((filledFields / totalFields) * 100);
        const progressBar = document.getElementById('progress-bar');
        const progressText = document.getElementById('progress-text');
        
        if (progressBar) {
            progressBar.style.width = progressPercent + '%';
        }
        
        if (progressText) {
            progressText.textContent = `${progressPercent}% Complete (${filledFields}/${totalFields} fields)`;
        }
    }

    // Update progress on input
    inputs.forEach(input => {
        input.addEventListener('input', updateProgress);
    });

    // Initial progress update
    updateProgress();

    // Form analytics (optional - track completion rates)
    function trackFormEvent(eventType, data = {}) {
        // Only track if analytics is enabled and we're not in development
        if (window.location.hostname !== 'localhost' && window.gtag) {
            window.gtag('event', eventType, {
                event_category: 'employee_form',
                ...data
            });
        }
        
        console.log(`Form Event: ${eventType}`, data);
    }

    // Track form start
    let formStarted = false;
    inputs.forEach(input => {
        input.addEventListener('input', function() {
            if (!formStarted) {
                formStarted = true;
                trackFormEvent('form_start', {
                    timestamp: new Date().toISOString()
                });
            }
        }, { once: true });
    });

    // Track successful submissions
    form.addEventListener('submit', function() {
        trackFormEvent('form_submit_attempt');
    });

    // Accessibility improvements
    function enhanceAccessibility() {
        // Add ARIA labels to required fields
        const requiredFields = form.querySelectorAll('[required]');
        requiredFields.forEach(field => {
            if (!field.getAttribute('aria-label')) {
                const label = form.querySelector(`label[for="${field.id}"]`);
                if (label) {
                    field.setAttribute('aria-describedby', `${field.id}-required`);
                    
                    // Add required indicator if not present
                    if (!label.querySelector('.required-indicator')) {
                        const indicator = document.createElement('span');
                        indicator.className = 'required-indicator';
                        indicator.setAttribute('aria-label', 'required');
                        indicator.textContent = ' *';
                        label.appendChild(indicator);
                    }
                }
            }
        });

        // Add form validation announcements
        const announcer = document.createElement('div');
        announcer.id = 'form-announcer';
        announcer.className = 'sr-only';
        announcer.setAttribute('aria-live', 'polite');
        announcer.setAttribute('aria-atomic', 'true');
        document.body.appendChild(announcer);

        // Announce form errors
        form.addEventListener('submit', function(e) {
            setTimeout(() => {
                const errors = form.querySelectorAll('.error');
                if (errors.length > 0) {
                    announcer.textContent = `Form has ${errors.length} error${errors.length > 1 ? 's' : ''}. Please review and correct.`;
                }
            }, 100);
        });
    }

    // Initialize accessibility enhancements
    enhanceAccessibility();

    // Network status handling
    function handleNetworkStatus() {
        const networkStatus = document.getElementById('network-status') || createNetworkStatusElement();
        
        function updateNetworkStatus() {
            if (navigator.onLine) {
                networkStatus.style.display = 'none';
            } else {
                networkStatus.textContent = 'No internet connection. Form will be saved locally.';
                networkStatus.style.display = 'block';
                              networkStatus.className = 'network-status offline';
            }
        }

        function createNetworkStatusElement() {
            const element = document.createElement('div');
            element.id = 'network-status';
            element.style.cssText = `
                position: fixed;
                top: 0;
                left: 0;
                right: 0;
                background: #ff6b6b;
                color: white;
                text-align: center;
                padding: 10px;
                z-index: 1000;
                display: none;
            `;
            document.body.prepend(element);
            return element;
        }

        window.addEventListener('online', updateNetworkStatus);
        window.addEventListener('offline', updateNetworkStatus);
        
        // Initial check
        updateNetworkStatus();
    }

    // Initialize network status handling
    handleNetworkStatus();

    // Form data encryption (optional, for sensitive data)
    async function encryptFormData(data) {
        // Simple base64 encoding (use proper encryption in production)
        const jsonString = JSON.stringify(data);
        return btoa(jsonString);
    }

    async function decryptFormData(encryptedData) {
        try {
            const jsonString = atob(encryptedData);
            return JSON.parse(jsonString);
        } catch (error) {
            console.error('Failed to decrypt form data:', error);
            return null;
        }
    }

    // Enhanced draft saving with encryption
    async function saveDraftSecure() {
        const formData = collectFormData();
        const encrypted = await encryptFormData(formData);
        localStorage.setItem('employeeFormDraftSecure', encrypted);
        localStorage.setItem('employeeFormDraftTimestamp', Date.now().toString());
    }

    async function loadDraftSecure() {
        const encrypted = localStorage.getItem('employeeFormDraftSecure');
        const timestamp = localStorage.getItem('employeeFormDraftTimestamp');
        
        if (encrypted && timestamp) {
            // Check if draft is less than 24 hours old
            const ageInHours = (Date.now() - parseInt(timestamp)) / (1000 * 60 * 60);
            
            if (ageInHours < 24) {
                const data = await decryptFormData(encrypted);
                if (data) {
                    // Show draft recovery option
                    showDraftRecoveryOption(data);
                }
            } else {
                // Clear old draft
                clearDraft();
            }
        }
    }

    function showDraftRecoveryOption(draftData) {
        const banner = document.createElement('div');
        banner.className = 'draft-recovery-banner';
        banner.innerHTML = `
            <div style="background: #e3f2fd; border: 1px solid #2196f3; padding: 15px; margin-bottom: 20px; border-radius: 4px;">
                <p><strong>Draft Found:</strong> We found a previously saved draft of this form. Would you like to restore it?</p>
                <button type="button" id="restore-draft" style="background: #2196f3; color: white; border: none; padding: 8px 16px; margin-right: 8px; border-radius: 4px; cursor: pointer;">Restore Draft</button>
                <button type="button" id="discard-draft" style="background: #757575; color: white; border: none; padding: 8px 16px; border-radius: 4px; cursor: pointer;">Discard Draft</button>
            </div>
        `;
        
        form.parentNode.insertBefore(banner, form);
        
        document.getElementById('restore-draft').addEventListener('click', function() {
            restoreFormData(draftData);
            banner.remove();
        });
        
        document.getElementById('discard-draft').addEventListener('click', function() {
            clearDraft();
            banner.remove();
        });
    }

    function restoreFormData(data) {
        for (let [key, value] of Object.entries(data)) {
                        const field = form.querySelector(`[name="${key}"]`);
            if (field && value !== '' && key !== 'submissionDate' && key !== 'submissionTime') {
                field.value = value;
                // Trigger change event to update any dependent fields
                field.dispatchEvent(new Event('change', { bubbles: true }));
            }
        }
        updateProgress();
        showMessage('Draft restored successfully!', 'success');
    }

    // Load secure draft on page load
    loadDraftSecure();

    // Add confirmation before leaving page with unsaved changes
    let formModified = false;
    
    inputs.forEach(input => {
        input.addEventListener('change', function() {
            formModified = true;
        });
    });

    window.addEventListener('beforeunload', function(e) {
        if (formModified) {
            const message = 'You have unsaved changes. Are you sure you want to leave?';
            e.returnValue = message;
            return message;
        }
    });

    // Clear modification flag on successful submission
    form.addEventListener('submit', function() {
        setTimeout(() => {
            formModified = false;
        }, 1000);
    });

    // Add form field dependencies (example: show additional fields based on selection)
    function handleFieldDependencies() {
        const departmentField = form.querySelector('[name="department"]');
        const positionField = form.querySelector('[name="position"]');
        
        if (departmentField && positionField) {
            departmentField.addEventListener('change', function() {
                updatePositionOptions(this.value);
            });
        }
        
        // Example: Show additional fields for managers
        const roleField = form.querySelector('[name="role"]') || form.querySelector('[name="position"]');
        const managerFields = document.getElementById('manager-fields');
        
        if (roleField && managerFields) {
            roleField.addEventListener('change', function() {
                if (this.value.toLowerCase().includes('manager') || this.value.toLowerCase().includes('supervisor')) {
                    managerFields.style.display = 'block';
                    // Make manager-specific fields required
                    managerFields.querySelectorAll('input, select').forEach(field => {
                        field.required = true;
                    });
                } else {
                    managerFields.style.display = 'none';
                    // Remove required attribute
                    managerFields.querySelectorAll('input, select').forEach(field => {
                        field.required = false;
                    });
                }
            });
        }
    }

    function updatePositionOptions(department) {
        const positionField = form.querySelector('[name="position"]');
        if (!positionField) return;
        
        const positions = {
            'IT': ['Software Developer', 'System Administrator', 'IT Manager', 'DevOps Engineer'],
            'HR': ['HR Specialist', 'Recruiter', 'HR Manager', 'Training Coordinator'],
            'Sales': ['Sales Representative', 'Account Manager', 'Sales Manager', 'Business Development'],
            'Marketing': ['Marketing Specialist', 'Content Creator', 'Marketing Manager', 'SEO Specialist'],
            'Finance': ['Accountant', 'Financial Analyst', 'Finance Manager', 'Bookkeeper']
        };
        
        const currentValue = positionField.value;
        positionField.innerHTML = '<option value="">Select Position</option>';
        
        if (positions[department]) {
            positions[department].forEach(position => {
                const option = document.createElement('option');
                option.value = position;
                option.textContent = position;
                if (position === currentValue) {
                    option.selected = true;
                }
                positionField.appendChild(option);
            });
        }
    }

    // Initialize field dependencies
    handleFieldDependencies();

    // Add form completion tracking
    let completionStartTime = Date.now();
    
    form.addEventListener('submit', function() {
        const completionTime = Math.round((Date.now() - completionStartTime) / 1000);
        trackFormEvent('form_completed', {
                      completion_time_seconds: completionTime,
            form_fields_count: inputs.length,
            timestamp: new Date().toISOString()
        });
    });

    // Responsive form behavior
    function handleResponsiveForm() {
        function checkFormLayout() {
            const formWidth = form.offsetWidth;
            
            if (formWidth < 600) {
                form.classList.add('mobile-layout');
                // Stack fields vertically on mobile
                form.querySelectorAll('.form-row').forEach(row => {
                    row.style.flexDirection = 'column';
                });
            } else {
                form.classList.remove('mobile-layout');
                form.querySelectorAll('.form-row').forEach(row => {
                    row.style.flexDirection = 'row';
                });
            }
        }
        
        window.addEventListener('resize', checkFormLayout);
        checkFormLayout(); // Initial check
    }

    handleResponsiveForm();

    // Export form data functionality
    window.exportFormData = function() {
        const formData = collectFormData();
        if (Object.keys(formData).length === 0) {
            showMessage('No form data to export', 'error');
            return;
        }
        
        const dataStr = JSON.stringify(formData, null, 2);
        const dataBlob = new Blob([dataStr], { type: 'application/json' });
        
        const url = URL.createObjectURL(dataBlob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `form_data_${new Date().toISOString().split('T')[0]}.json`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
        
        showMessage('Form data exported successfully', 'success');
    };

    // Import form data functionality
    window.importFormData = function() {
        const input = document.createElement('input');
        input.type = 'file';
        input.accept = '.json';
        
        input.onchange = function(event) {
            const file = event.target.files[0];
            if (!file) return;
            
            const reader = new FileReader();
            reader.onload = function(e) {
                try {
                    const data = JSON.parse(e.target.result);
                    restoreFormData(data);
                    showMessage('Form data imported successfully', 'success');
                } catch (error) {
                    showMessage('Invalid file format', 'error');
                }
            };
            reader.readAsText(file);
        };
        
        input.click();
    };

    // Form reset with confirmation
    const resetBtn = document.getElementById('reset-btn');
    if (resetBtn) {
        resetBtn.addEventListener('click', function(e) {
            e.preventDefault();
            
            if (confirm('Are you sure you want to reset the form? All data will be lost.')) {
                form.reset();
                clearDraft();
                clearMessage();
                formModified = false;
                updateProgress();
                showMessage('Form has been reset', 'success');
                
                // Reset any dependent fields
                handleFieldDependencies();
                
                trackFormEvent('form_reset');
            }
        });
    }

    // Add tooltips for help text
    function addTooltips() {
        const fieldsWithHelp = {
            'employeeId': 'Your unique employee identifier (if known)',
            'startDate': 'Your official start date with the company',
            'emergencyContact': 'Name of person to contact in case of emergency',
            'emergencyPhone': 'Phone number for emergency contact'
        };
        
        Object.entries(fieldsWithHelp).forEach(([fieldName, helpText]) => {
            const field = form.querySelector(`[name="${fieldName}"]`);
            if (field) {
                const helpIcon = document.createElement('span');
                helpIcon.className = 'help-icon';
                helpIcon.innerHTML = '?';
                                helpIcon.title = helpText;
                helpIcon.style.cssText = `
                    display: inline-block;
                    width: 18px;
                    height: 18px;
                    border-radius: 50%;
                    background: #2196f3;
                    color: white;
                    text-align: center;
                    font-size: 12px;
                    line-height: 18px;
                    margin-left: 5px;
                    cursor: help;
                `;
                
                const label = form.querySelector(`label[for="${field.id}"]`);
                if (label) {
                    label.appendChild(helpIcon);
                }
            }
        });
    }

    addTooltips();

    // Add character counter for textarea fields
    function addCharacterCounters() {
        const textareas = form.querySelectorAll('textarea');
        
        textareas.forEach(textarea => {
            const maxLength = textarea.getAttribute('maxlength');
            if (maxLength) {
                const counter = document.createElement('div');
                counter.className = 'character-counter';
                counter.style.cssText = `
                    font-size: 12px;
                    color: #666;
                    text-align: right;
                    margin-top: 2px;
                `;
                
                function updateCounter() {
                    const remaining = maxLength - textarea.value.length;
                    counter.textContent = `${remaining} characters remaining`;
                    counter.style.color = remaining < 20 ? '#f44336' : '#666';
                }
                
                textarea.addEventListener('input', updateCounter);
                textarea.parentNode.appendChild(counter);
                updateCounter(); // Initial count
            }
        });
    }

    addCharacterCounters();

    // Initialize all systems
    console.log('Employee Form System Initialized Successfully');
    
    // Development helpers (only in development)
    if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
        window.fillSampleData = function() {
            const sampleData = {
                firstName: 'John',
                lastName: 'Doe',
                email: 'john.doe@company.com',
                phone: '+1-555-123-4567',
                department: 'IT',
                position: 'Software Developer',
                startDate: new Date().toISOString().split('T')[0],
                employeeId: 'EMP001',
                address: '123 Main St, City, State 12345',
                emergencyContact: 'Jane Doe',
                emergencyPhone: '+1-555-987-6543',
                notes: 'Sample employee data for testing purposes.'
            };
            
            restoreFormData(sampleData);
            console.log('Sample data filled');
        };
        
        // Add development console commands
        console.log('Development mode active. Available commands:');
        console.log('- fillSampleData(): Fill form with sample data');
        console.log('- exportFormData(): Export current form data');
        console.log('- importFormData(): Import form data from file');
        console.log('- printForm(): Print current form data');
    }

});

// Global error handler
window.addEventListener('error', function(event) {
    console.error('Form Error:', event.error);
    
    const messageDiv = document.getElementById('message');
    if (messageDiv) {
        messageDiv.textContent = 'An unexpected error occurred. Please try refreshing the page.';
        messageDiv.className = 'message error';
        messageDiv.style.display = 'block';
    }
});

// Service Worker registration for offline support (optional)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', function() {
        navigator.serviceWorker.register('/sw.js').then(function(registration) {
            console.log('ServiceWorker registration successful');
        }).catch(function(err) {
            console.log('ServiceWorker registration failed: ', err);
        });
    });
}
