
import React from 'react';
import { useDispatch } from 'react-redux';

const ProductPage = ({ match }) => {
    const productId = match.params.productId;

    const handleAddToCart = () => {
        // Hämta produktinformation från CMS eller API baserat på productId
        const product = {
            id: productId,
            name: 'Produktnamn', // Hämta riktig produktinformation här
            price: 19.99,
        };

        // Skicka ett action för att lägga till produkten i kundvagnen
        dispatch({ type: 'ADD_TO_CART', payload: product });
    };

    return (
        <div>
            <h2>Produktsida</h2>
            <button onClick={handleAddToCart}>Lägg till i kundvagnen</button>
            {/* Visa produktinformation här */}
        </div>
    );
};

export default ProductPage;
