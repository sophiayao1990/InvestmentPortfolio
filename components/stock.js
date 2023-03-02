import { prepareStockInChart, drawChart } from "./drawChart.js";
import { getSubtotalValue } from "./fetchStock.js";

/* Delete Stock */
function deleteStock(stockName, stockNameToObjMap) {
  if (!confirm(`Are you sure you want to delete?`)) {
    return;
  }
  if (stockNameToObjMap.has(stockName)) {
    stockNameToObjMap.delete(stockName);
  }
  document.getElementById(stockName).remove();
  drawChart(prepareStockInChart(stockNameToObjMap));
}

/* Edit & Save Stock Quantity */
function quantityEdit(stockName) {
  const stockQuantity = document.getElementById(`${stockName}-quantity`);
  stockQuantity.disabled = false;
  stockQuantity.focus();
  stockQuantity.select();
}
function saveQtyChange(stockName, stockNameToObjMap) {
  const stockQuantity = document.getElementById(`${stockName}-quantity`);

  if (stockNameToObjMap.has(stockName)) {
    const stockObj = stockNameToObjMap.get(stockName);
    stockObj.quantity = parseInt(stockQuantity.value);
    stockObj.subtotalValue = getSubtotalValue(
      stockObj.currentPrice,
      stockObj.quantity
    );

    document.getElementById(`${stockName}-subtotalValue`).textContent =
      stockObj.subtotalValue;

    stockNameToObjMap.set(stockName, stockObj);

    drawChart(prepareStockInChart(stockNameToObjMap));
    stockQuantity.disabled = true;
  }
}

export { deleteStock, quantityEdit, saveQtyChange };
