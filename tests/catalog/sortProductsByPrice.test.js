const products = require('../../src/data/products');
const { sortProductsByPrice } = require('../../src/catalog');

const getProductIds = (items) => items.map((product) => product.id);
const findByIds = (order) => order.map((id) => products.find((product) => product.id === id));

describe('sortProductsByPrice', () => {
  test("все товары c 'asc' сортируются как [3, 6, 5, 4, 2, 1]", () => {
    expect(getProductIds(sortProductsByPrice(products, 'asc'))).toEqual([3, 6, 5, 4, 2, 1]);
  });
  test('все товары без направления сортируются как [3, 6, 5, 4, 2, 1]', () => {
    expect(getProductIds(sortProductsByPrice(products))).toEqual([3, 6, 5, 4, 2, 1]);
  });
  test("товары [1, 3, 4] c 'asc' сортируются как [3, 4, 1]", () => {
    expect(getProductIds(sortProductsByPrice(findByIds([1, 3, 4]), 'asc'))).toEqual([3, 4, 1]);
  });
  test("все товары c 'desc' сортируются как [1, 2, 4, 5, 6, 3]", () => {
    expect(getProductIds(sortProductsByPrice(products, 'desc'))).toEqual([1, 2, 4, 5, 6, 3]);
  });
  test("товары [3, 1, 4] c 'desc' сортируются как [1, 4, 3]", () => {
    expect(getProductIds(sortProductsByPrice(findByIds([3, 1, 4]), 'desc'))).toEqual([1, 4, 3]);
  });
  test("товары [5, 2, 6] c 'desc' сортируются как [2, 5, 6]", () => {
    expect(getProductIds(sortProductsByPrice(findByIds([5, 2, 6]), 'desc'))).toEqual([2, 5, 6]);
  });
  test("'asc' не меняет исходный массив [1, 3, 4]", () => {
    sortProductsByPrice(findByIds([1, 3, 4]), 'asc');
    expect(getProductIds(findByIds([1, 3, 4]))).toEqual([1, 3, 4]);
  });
  test("'desc' не меняет исходный массив [1, 3, 4]", () => {
    sortProductsByPrice(findByIds([1, 3, 4]), 'desc');
    expect(getProductIds(findByIds([1, 3, 4]))).toEqual([1, 3, 4]);
  });
  test('направление по умолчанию не меняет исходный массив всех товаров', () => {
    sortProductsByPrice(products);
    expect(getProductIds(products)).toEqual([1, 2, 3, 4, 5, 6]);
  });
});
