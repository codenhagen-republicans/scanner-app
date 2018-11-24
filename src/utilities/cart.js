
const footprint = products => products.reduce(
    (sum, product) => sum + (product.footprint || 0),
    0
);

export default {
    footprint,
};
