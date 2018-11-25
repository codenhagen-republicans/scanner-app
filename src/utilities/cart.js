import Config from 'react-native-config';

const footprint = products => products.reduce(
    (sum, product) => sum + (product.footprint || 0) * (product.quantity || 1),
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

const download = async axios => {
    const response = await axios.get('baskets');
    return response.data.carts.map(cart => {
        return {
            key: cart.id.toString(),
            created_at: new Date(),
            products: cart.items.map(product => {
                return {
                    key: product.ean,
                    name: product.name,
                    quantity: product.quantity,
                    footprint: product.carbon_footprint,
                    status: 'PRODUCT_LOADED'
                };
            }),
        };
    });
};

const del = async (axios, id) => {
    const response = await axios.delete(`baskets/${id}`);
};

export default {
    footprint,
    del,
    download,
    upload,
};
