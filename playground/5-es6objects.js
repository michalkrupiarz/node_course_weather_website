const name = 'Michal';
const userAge = 38;

const user = {
    name,
    age: userAge,
    location: 'Wroclaw'
}
console.log(user)

const product = {
    label: 'red notebook',
    price: 3,
    stock: 201,
    salePrice: undefined,
    rating: 3
}

// const {label: productLabeel, stock, rating = 5} = product;
// console.log(productLabeel)
// console.log(stock)
// console.log(rating)

const transaction = (type, {label, stock}) => {
    console.log(type, label, stock)
};

transaction('order', product)