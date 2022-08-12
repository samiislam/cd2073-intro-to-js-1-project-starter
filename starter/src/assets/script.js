const products = [];

const cherryProduct = {
  name: "Cherry",
  price: 10,
  quantity: 0,
  productId: 100,
  image: "/images/cherry.jpg",
};

const orangeProduct = {
  name: "Orange",
  price: 20,
  quantity: 0,
  productId: 101,
  image: "/images/orange.jpg",
};

const strawberryProduct = {
  name: "Strawberry",
  price: 30,
  quantity: 0,
  productId: 102,
  image: "/images/strawberry.jpg",
};

products.push(cherryProduct);
products.push(orangeProduct);
products.push(strawberryProduct);

const cart = [];

/**
 * Add product to Cart
 * @param {number} productId - The id of the product to add to cart
 * @return {void} Nothing
 */
function addProductToCart(productId) {
  products.forEach(function (item, index) {
    // Identify the correct product from the list of products
    if (item.productId === productId) {
      // increase the product quantity
      products[index].quantity++;

      // Check if the item is already in the cart
      const indexItemInCart = cart.findIndex(function (itemInCart) {
        return itemInCart.productId === productId;
      });

      if (-1 === indexItemInCart) {
        // Add the item since it is not present in the cart yet
        cart.push(item);
      }
    }
  });
}

/**
 * Increase the product quantity in the cart
 * @param {number} productId - The id of the product to increase the quantity of
 * @return {void} Nothing
 */
function increaseQuantity(productId) {
  products.forEach(function (item, index) {
    // Identify the correct product from the list of products
    if (item.productId === productId) {
      // increase the product quantity
      products[index].quantity++;
    }
  });
}

/**
 * Decrease the product quantity in the cart
 * @param {number} productId - The id of the product to decrease the quantity of
 * @return {void} Nothing
 */
function decreaseQuantity(productId) {
  products.forEach(function (item, index) {
    // Identify the correct product from the list of products
    if (item.productId === productId) {
      // decrease the product quantity
      products[index].quantity--;

      // remove product if quantity is zero
      if (products[index].quantity === 0) {
        removeProductFromCart(productId);
      }
    }
  });
}

/**
 * Remove the product from the cart
 * @param {number} productId - The id of the product to remove
 * @return {void} Nothing
 */
function removeProductFromCart(productId) {
  products.forEach(function (item, index) {
    // Identify the correct product from the list of products
    if (item.productId === productId) {
      // decrease the product quantity
      products[index].quantity = 0;

      // Check if the item is already in the cart
      const indexItemInCart = cart.findIndex(function (itemInCart) {
        return itemInCart.productId === productId;
      });

      if (-1 !== indexItemInCart) {
        // Remove the item from the cart
        cart.splice(indexItemInCart, 1);
      }
    }
  });
}

let totalPaid = 0;

/**
 * The amount of money to pay for all the items in the cart
 * @return {number} - The total amount of money to pay
 */
function cartTotal() {
  let total = 0;
  cart.forEach(function (item) {
    total += item.quantity * item.price;
  });
  return total;
}

/**
 * Empty the cart
 * @return {void} Nothing
 */
function emptyCart() {
  cart.splice(0, cart.length);
}

/**
 * Pay an amount for the products in the cart
 * @return {number} - The difference between amount paid and amount to pay
 */
function pay(amount) {
  totalPaid += amount;
  const moneyToReturn = totalPaid - cartTotal();

  // Ensure that the global variable is reset
  // once everything has been fully paid for
  // so that the next transaction starts from zero
  if (totalPaid >= cartTotal()) {
    totalPaid = 0;
  }

  return moneyToReturn;
}

module.exports = {
  products,
  cart,
  addProductToCart,
  increaseQuantity,
  decreaseQuantity,
  removeProductFromCart,
  cartTotal,
  pay,
  emptyCart,
  /* Uncomment the following line if completing the currency converter bonus */
  // currency
};
