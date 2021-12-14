import { Product } from '../Class/Product.js';
import { saveProductToLocalStorage, getProductsFromLocalStorage } from '../utilsLocalStorage.js';

export const initProductTable = () => {
  const productAddButton = document.getElementById('product-add-button');
  productAddButton.addEventListener('click', () => addNewProductTableRow());

  const table = document.getElementById('product-table');
  const products = getProductsFromLocalStorage('product');
  for (let product of products) {
    table.insertAdjacentHTML('beforeend', productTableRow(product));
  }
};

const addNewProductTableRow = () => {
  const productName = document.getElementById('product-name-input').value;
  const productNumber = document.getElementById('product-price-input').value;
  const productQuantity = document.getElementById('product-quantity-input').value;
  const table = document.getElementById('product-table');
  const product = new Product(productName, productNumber, productQuantity);

  if (isInputValid(product)) {
    table.insertAdjacentHTML('beforeend', productTableRow(product));
    saveProductToLocalStorage('product', product);
  }
};

const productTableRow = (product) => `
  <tr class = 'product-manage-item'>
      <td class = 'product-manage-name'> ${product.name}</td>
      <td class = 'product-manage-price'> ${product.price}</td>
      <td class = 'product-manage-quantity'> ${product.quantity}</td>
  </tr>
  `;

const isInputValid = (product) => {
  if (!productNameValid(product.name)) {
    alert('input right product Name');
    return false;
  }
  if (!productPriceValid(product.price)) {
    alert('input right product price');
    return false;
  }
  if (!productQuantityValid(product.quantity)) {
    alert('input right product quantity');
    return false;
  }
  return true;
};

const productNameValid = (name) => {
  const productsExist = getProductsFromLocalStorage('product');
  for (let product of productsExist) {
    if (name === product.name) {
      return false;
    }
  }
  return true;
};

const productPriceValid = (price) => {
  if (price <= 100) {
    return false;
  }
  if (price % 10 !== 0) {
    return false;
  }
  return true;
};

const productQuantityValid = (quantity) => {
  if (quantity <= 0) {
    return false;
  }
  return true;
};
