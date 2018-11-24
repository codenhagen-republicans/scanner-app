import Config from 'react-native-config';
import axios from 'axios';

const footprint = products => products.reduce(
    (sum, product) => sum + (product.footprint || 0),
    0
);

const upload = async products => {
    const backend_products = products.map(product => {
        return {
            ean: product.key,
            price: 0,
            quantity: 1,
            carbon_footprint: product.footprint,
        };
    });

    try {
        const response = await axios.post(`${Config.APP_BACKEND_URL}/baskets`, {
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
