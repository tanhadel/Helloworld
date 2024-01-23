// components/CheckoutPage.js
import React, {useContext, useState} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {useHistory} from 'react-router-dom';
import { UserContext } from './path-to-your-user-context';

const CheckoutPage = () => {
    const cart = useSelector((state) => state.cart);
    const dispatch = useDispatch();
    const [paymentError, setPaymentError] = useState(null);
    const history = useHistory();
    const CheckoutComponent = ({ selectedProducts }) => {
        const [paymentInfo, setPaymentInfo] = useState({
            cardNumber: '',
            expiryDate: '',
            cvv: '',
        });

        const handlePayment = async () => {
            try {
                // Skicka betalningsinformationen till din backend
                const response = await fetch('http://localhost:3001/api/process-payment', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(paymentInfo),
                });

                // Visa responsen från servern
                const result = await response.json();
                console.log(result);
            } catch (error) {
                console.error('Fel vid betalning:', error);
            }
        };

        // Funktion för att uppdatera betalningsinformation när användaren ändrar inmatningsfält.
        const handlePaymentInfoChange = (e) => {
            const { name, value } = e.target;
            setPaymentInfo((prevInfo) => ({ ...prevInfo, [name]: value }));
        };

        const handleCheckout = () => {
            // Logik för att skicka betalningsinformation till backend och slutföra köpet
            console.log('Betalningsinformation:', paymentInfo);
        };

        return (
            <div>
                {/* Visa valda produkter */}
                <h2>Varukorg</h2>
                <ul>
                    {selectedProducts.map((product) => (
                        <li key={product.id}>{product.name} - {product.price}</li>
                    ))}
                </ul>

                {/* Betalningsinformation */}
                <h2>Betalning</h2>
                <form>
                    <label>
                        Kortnummer:
                        <input
                            type="text"
                            name="cardNumber"
                            value={paymentInfo.cardNumber}
                            onChange={handlePaymentInfoChange}
                        />
                    </label>

                    <label>
                        Utgångsdatum:
                        <input
                            type="text"
                            name="expiryDate"
                            value={paymentInfo.expiryDate}
                            onChange={handlePaymentInfoChange}
                        />
                    </label>

                    <label>
                        CVV:
                        <input
                            type="text"
                            name="cvv"
                            value={paymentInfo.cvv}
                            onChange={handlePaymentInfoChange}
                        />
                    </label>

                    <button type="button" onClick={handleCheckout}>
                        Slutför betalning
                    </button>
                </form>
            </div>
        );
    };

    const UserProfile = () => {
        const { userData } = useContext(UserContext);


        // Använd userData för att visa eller göra något med användaruppgifterna
        return (
            <div>
                <h2>Användarinformation</h2>
                <p>Namn: {userData.name}</p>
                <p>E-post: {userData.email}</p>
            </div>
        );
    };

    export default UserProfile;
    export default CheckoutComponent;

    const handleCheckout = async () => {
        try {

            //const userInformation  Fyll i användarens information här

                const handleChange = (e) => {
                    const { name, value } = e.target;
                    setUserData((prevData) => ({ ...prevData, [name]: value }));
                };

                const handleSubmit = (e) => {
                    e.preventDefault();
                    // Använd userData för att göra något med användaruppgifterna, t.ex. skicka till backend
                    console.log('Användarinformation:', userData);
                };



            // Skapa ett betalningsobjekt för att skicka till Stripe
            const paymentObject = {
                amount: calculateTotal(cart) * 100, // Multiplicera med 100 eftersom Stripe använder cent
                currency: 'sek',
                source: 'tok_visa', // Testkortnummer för Stripe Mock
                description: 'Köp från Min Webbshop',
            };

            // Skicka betalningsobjektet till Stripe API (detta är där ditt riktiga API-nycklar används i produktion)
            const response = await fetch('/api/payment', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(paymentObject),
            });

            if (response.ok) {
                // Om betalningen lyckades, uppdatera din app-stores status, t.ex. nollställ kundvagnen
                dispatch({ type: 'CHECKOUT' });
            } else {
                const errorData = await response.json();
                setPaymentError(errorData.error.message);
            }
        } catch (error) {
            console.error('Error during checkout:', error);
            setPaymentError('Något gick fel vid betalningen.');
        }
    };

    const calculateTotal = (items) => {
        return items.reduce((total, item) => total + item.price, 0);
    };

    return (
        <div>
            <h2>Utcheckning</h2>
            <ul>
                {cart.map((item) => (
                    <li key={item.id}>{item.name} - {item.price} kr</li>
                ))}
            </ul>
            <p>Totalt: {calculateTotal(cart)} kr</p>
            {paymentError && <p style={{ color: 'red' }}>{paymentError}</p>}
            <button onClick={handleCheckout}>Slutför Betala</button>
        </div>
    );
};



export default CheckoutPage;

