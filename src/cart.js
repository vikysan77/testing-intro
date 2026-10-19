function replaceCartItem(cart, index, item) {
  const nextCart = cart.slice();
  nextCart[index] = item;
  return nextCart;
}
function addToCart(cart, product, quantity) {
  const index = cart.findIndex((item) => item.id === product.id);
  const nextQuantity = (index === -1 ? 0 : cart[index].quantity) + quantity;

  if (!Number.isInteger(quantity) || quantity < 1) {
    throw new RangeError('Количество должно быть положительным целым числом');
  }

  if (nextQuantity > product.stock) {
    throw new RangeError('Нельзя добавить больше товара, чем есть на складе');
  }

  if (index === -1) {
    return [...cart, { ...product, quantity }];
  }

  return replaceCartItem
  (cart, index, { ...cart[index], quantity: nextQuantity });
}
function changeQuantity() { return notImplemented(); }
function removeFromCart() { return notImplemented(); }
function calculateCartSubtotal() { return notImplemented(); }
function calculateOrderTotal() { return notImplemented(); }

const cartApi = { addToCart, changeQuantity, removeFromCart, calculateCartSubtotal, calculateOrderTotal };

if (typeof module !== 'undefined') module.exports = cartApi;
if (typeof window !== 'undefined') window.cartApi = cartApi;
