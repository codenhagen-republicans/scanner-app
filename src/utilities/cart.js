import Config from 'react-native-config';

const footprint = products => products.reduce(
    (sum, product) => sum + (product.footprint || 0),
    0
);

const upload = async (axios, products) => {
    const backend_products = products.map(product => {
        return {
            carbon_footprint: product.footprint,
            ean: product.key,
            name: product.name,
            quantity: product.quantity,
            price: 0,
        };
    });

    try {
        const response = await axios.post('baskets', {
            items: backend_products,
        });

    } catch (e) {
        console.log(`An error occurred: ${ e.toString() }`);
    }
}

export default {
    footprint,
    upload
};
