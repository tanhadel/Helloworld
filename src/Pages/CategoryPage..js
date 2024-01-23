
import React, {useEffect, useState} from 'react';
import { Link } from 'react-router-dom';
const CategoryPage = ({ match }) => {
    const categoryId = match.params.categoryId;
    // Hämta produkter baserat på categoryId från CMS eller API
    const fetchProductsByCategoryId = async (categoryId) => {
        try {
            const response = await fetch(`https://api.example.com/products?categoryId=${categoryId}`);
            if (!response.ok) {
                throw new Error('Problem med att hämta produkter');
            }
            const products = await response.json();
            return products;
        } catch (error) {
            console.error('Fel vid hämtning av produkter:', error);
            return [];
        }
    };
    const ProductList = ({ categoryId }) => {
        const [products, setProducts] = useState([]);

        useEffect(() => {
            const fetchProducts = async () => {
                const fetchedProducts = await fetchProductsByCategoryId(categoryId);
                setProducts(fetchedProducts);
            };

            fetchProducts();
        }, [categoryId]);
        const addToCart = (product) => {
            setCart((prevCart) => [...prevCart, product]);
        };


        return (
            <div>
                <h2>Produkter för categoryId: {categoryId}</h2>
                <ul>
                    {products.map((product) => (
                        <li key={product.id}>
                            {product.name} - {product.price} kr{' '}
                            <button onClick={() => addToCart(product)}>Lägg till i varukorgen</button>
                        </li>
                    ))}
                </ul>
                <h3>Varukorg:</h3>
                <ul>
                    {cart.map((item, index) => (
                        <li key={index}>{item.name}</li>
                    ))}
                </ul>
            </div>
        );
    };


    export default ProductList;


    return (
        <div>
            <h2>Produktkategori {categoryId}</h2>
            <ul>
                { /*Karta genom produkter och rendera varje produkt */ }

                {products.map((product) => (
                    <li key={product.id}>
                        <Link to={`/products/${product.id}`}>{product.name}</Link>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default CategoryPage;
