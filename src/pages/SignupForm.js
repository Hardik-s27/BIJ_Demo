import React, { useState } from 'react';
import './SignupForm.css'; // Keep this if you have additional custom styles

const SignupForm = () => {
    const [formData, setFormData] = useState({
        contactInfo: '',
        password: '',
        confirmPassword: '',
    });

    const [errors, setErrors] = useState({});
    const [successMessage, setSuccessMessage] = useState('');

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const validateForm = () => {
        const newErrors = {};
        if (!formData.contactInfo) {
            newErrors.contactInfo = 'Email or phone number is required';
        }
        if (!formData.password) {
            newErrors.password = 'Password is required';
        } else if (formData.password.length < 6) {
            newErrors.password = 'Password must be at least 6 characters';
        }
        if (formData.password !== formData.confirmPassword) {
            newErrors.confirmPassword = 'Passwords do not match';
        }
        return newErrors;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const validationErrors = validateForm();
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
        } else {
            try {
                const response = await fetch('http://127.0.0.1:8000/api/create-profile/', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        contact_info: formData.contactInfo,
                        password: formData.password,
                    }),
                });

                if (response.ok) {
                    const data = await response.json();
                    console.log('Form data submitted:', data);
                    setSuccessMessage('Signup successful!');
                    // Clear the form
                    setFormData({
                        contactInfo: '',
                        password: '',
                        confirmPassword: '',
                    });
                    setErrors({});
                } else {
                    const errorData = await response.json();
                    setErrors({ apiError: errorData.message || 'An error occurred' });
                }
            } catch (error) {
                setErrors({ apiError: 'An error occurred. Please try again.' });
            }
        }
    };

    return (
        <form className="signup-form container mt-5" onSubmit={handleSubmit}>
            <h1 className="text-center">Signup Form</h1>
            <div className="mb-3">
                <label htmlFor="contactInfo" className="form-label">Email or Phone Number:</label>
                <input
                    type="text"
                    id="contactInfo"
                    name="contactInfo"
                    className="form-control"
                    value={formData.contactInfo}
                    onChange={handleChange}
                />
                {errors.contactInfo && <p className="text-danger">{errors.contactInfo}</p>}
            </div>
            <div className="mb-3">
                <label htmlFor="password" className="form-label">Password:</label>
                <input
                    type="password"
                    id="password"
                    name="password"
                    className="form-control"
                    value={formData.password}
                    onChange={handleChange}
                />
                {errors.password && <p className="text-danger">{errors.password}</p>}
            </div>
            <div className="mb-3">
                <label htmlFor="confirmPassword" className="form-label">Confirm Password:</label>
                <input
                    type="password"
                    id="confirmPassword"
                    name="confirmPassword"
                    className="form-control"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                />
                {errors.confirmPassword && <p className="text-danger">{errors.confirmPassword}</p>}
            </div>
            {errors.apiError && <p className="text-danger">{errors.apiError}</p>}
            {successMessage && <p className="text-success">{successMessage}</p>}
            <button type="submit" className="btn btn-primary w-100">Sign Up</button>
        </form>
    );
};

export default SignupForm;
