
// ContactForm.js
import React, { useState } from 'react';

const ContactForm = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Här kan du skicka formulärdata till en server, skicka e-post, eller göra något annat med den

        // Exempel: Logga formulärdata till konsolen
        console.log('Formulärdata:', formData);

        // Återställ formuläret efter skickad information
        setFormData({ name: '', email: '', message: '' });
    };

    return (
        <form onSubmit={handleSubmit}>
            <label>
                Namn:
                <input type="text" name="name" value={formData.name} onChange={handleChange} />
            </label>
            <label>
                E-post:
                <input type="email" name="email" value={formData.email} onChange={handleChange} />
            </label>
            <label>
                Meddelande:
                <textarea name="message" value={formData.message} onChange={handleChange} />
            </label>
            <button type="submit">Skicka</button>
        </form>
    );
};

export default ContactForm;


