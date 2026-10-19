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
function changeQuantity(cart, productId, quantity) {
  const index = cart.findIndex((item) => item.id === productId);
  if (index === -1) return cart;

  if (!Number.isInteger(quantity) || quantity < 1) {
    throw new RangeError('Количество должно быть положительным целым числом');
  }

  const item = cart[index];
  if (quantity > item.stock) {
    throw new RangeError('Количество не может превышать остаток на складе');
  }

  if (item.quantity === quantity) return cart;

  return replaceCartItem(cart, index, { ...item, quantity });
}
function removeFromCart(cart, productId) {
  return cart.filter((item) => item.id !== productId);
}
function calculateCartSubtotal(cart) {
  return cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
}
function calculateOrderTotal() { return notImplemented(); }

const cartApi = { addToCart, changeQuantity, removeFromCart, calculateCartSubtotal, calculateOrderTotal };

if (typeof module !== 'undefined') module.exports = cartApi;
if (typeof window !== 'undefined') window.cartApi = cartApi;
