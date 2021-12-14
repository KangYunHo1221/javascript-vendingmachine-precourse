import {
  getProductsFromLocalStorage,
  saveCoinsToLocalStorage,
  getCoinsFromLocalStorage,
  saveMoneyToLocalStorage,
  getMoneyFromLocalStorage,
  saveProductToLocalStorage,
  saveProductsToLocalStorage,
} from '../utilsLocalStorage.js';

export const initPurchaseMenu = () => {
  const chargeButton = document.getElementById('charge-button');
  const returnButton = document.getElementById('coin-return-button');
  chargeButton.addEventListener('click', () => chargeMoney());
  returnButton.addEventListener('click', () => returnMoney());

  initMoney();
  initProductTable();
};

const initMoney = () => {
  const money = getMoneyFromLocalStorage('money');
  document.getElementById('charge-amount').innerText = Number(money);
};

const chargeMoney = () => {
  const chargeInput = document.getElementById('charge-input').value;
  const money = getMoneyFromLocalStorage('money');
  if (isChargeInputValid(chargeInput)) {
    document.getElementById('charge-amount').innerText = Number(money) + Number(chargeInput);
    saveMoneyToLocalStorage('money', Number(money) + Number(chargeInput));
  }
};

const isChargeInputValid = (chargeInput) => {
  if (chargeInput % 10 !== 0) {
    alert('invalid chargeInput');
    return false;
  }
  return true;
};

const initProductTable = () => {
  const products = getProductsFromLocalStorage('product');
  const table = document.getElementById('product-purchase-table');
  for (let product of products) {
    table.insertAdjacentHTML('beforeend', productTableRow(product));
  }
  initPurchaseButtons();
};

const productTableRow = (product) => `
  <tr class = 'product-purchase-item'>
      <td class = 'product-purchase-name' data-product-name = ${product.name}> ${product.name}</td>
      <td class = 'product-purchase-price' data-product-price = ${product.price}> ${product.price}</td>
      <td class = 'product-purchase-quantity' data-product-quantity = ${product.quantity}> ${product.quantity}</td>
      <td class = 'purchase-button'><button id = 'purchase-button'> 구매하기</button></td>
  </tr>
  `;

const initPurchaseButtons = () => {
  const purchaseButtons = document.getElementsByClassName('purchase-button');
  for (let button of purchaseButtons) {
    button.addEventListener('click', () => purchaseProduct(button.parentElement));
  }
};

const purchaseProduct = (element) => {
  const products = getProductsFromLocalStorage('product');
  const name = element.childNodes[1].innerText;
  const index = findProductIndex(products, name);

  const product = products[index];
  const price = product.price;
  const quantity = product.quantity;

  const money = getMoneyFromLocalStorage('money');
  const moneyAfterBuy = Number(money) - Number(price);

  if (isMoneyEnough(moneyAfterBuy)) {
    if (isQuantityEnough(quantity)) {
      document.getElementById('charge-amount').innerText = moneyAfterBuy;
      saveMoneyToLocalStorage('money', Number(money) - Number(price));
      product.quantity = quantity - 1;
      element.childNodes[5].innerText -= 1;
      saveProductsToLocalStorage('product', products);
    }
  }
};

const findProductIndex = (products, name) => {
  for (let i = 0; i < products.length; i++) {
    if (products[i].name === name) {
      return i;
    }
  }
};

const isMoneyEnough = (money) => {
  if (money < 0) {
    alert('not enough moeny');
    return false;
  }
  return true;
};

const isQuantityEnough = (quantity) => {
  if (quantity - 1 < 0) {
    alert('not enough quantity');
    return false;
  }
  return true;
};
