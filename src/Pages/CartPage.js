// components/CartPage.js
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

const CartPage = () => {
    const cart = useSelector((state) => state.cart);
    const dispatch = useDispatch();

    const handleCheckout = () => {
        // Implementera logik för utcheckning och betalning här

        const handlePayment = async () => {
            try {
                // Skicka betalningsinformationen till din backend eller betalningstjänst
                const response = await fetch('/api/process-payment', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(paymentInfo),
                });

                // Om betalningen lyckades kan du visa en bekräftelsesida eller göra något annat
                console.log('Betalningsstatus:', response.status);
            } catch (error) {
                console.error('Fel vid behandling av betalning:', error);
            }
        };


        // Detta är en fejkad action för att nollställa kundvagnen
        dispatch({ type: 'CHECKOUT' });
    };

    return (
        <div>
            <h2>Kundvagn</h2>
            <ul>
                {cart.map((item) => (
                    <li key={item.id}>{item.name} - {item.price} kr</li>
                ))}
            </ul>
            <button onClick={handleCheckout}>Gå till kassan</button>
        </div>
    );
};

export default CartPage;