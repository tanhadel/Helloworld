
import React, { useState } from 'react';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';

const CheckoutForm = () => {
    const stripe = useStripe();
    const elements = useElements();
    const [paymentError, setPaymentError] = useState(null);

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!stripe || !elements) {
            return;
        }

        const cardElement = elements.getElement(CardElement);

        const { token, error } = await stripe.createToken(cardElement);

        if (error) {
            setPaymentError(error.message);
        } else {
            // Skicka tokenen till din backend för att hantera betalningen
            console.log(token);
            setPaymentError(null);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <CardElement />
            {paymentError && <div style={{ color: 'red' }}>{paymentError}</div>}
            <button type="submit" disabled={!stripe}>
                Betala
            </button>
        </form>
    );
};

export default CheckoutForm;
