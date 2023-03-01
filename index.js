import stockNameQtyArr from "./database.js";
import printDataToHtml from "./components/html.js";
import { fetchSingleStock } from "./components/fetchStock.js";
import {
  loadGoogleChartLibrary,
  prepareStockInChart,
  drawChart,
} from "./components/drawChart.js";
import {
  deleteStock,
  quantityEdit,
  saveQtyChange,
} from "./components/Stock.js";

const stockNameToObjMap = new Map();
const getAllCurrentStock = async (stockName, quantity) => {
  let stock = await fetchSingleStock(stockName, quantity);
  stockNameToObjMap.set(stockName, stock);
  console.log(stockNameToObjMap, stockNameToObjMap.get(stockName));
  printDataToHtml(stockNameToObjMap);
  addEventListener(stockNameToObjMap);
};

const main = async () => {
  //   let stockNameQtyArr = [
  //     { stockName: "amd", quantity: 10 },
  //     { stockName: "amzn", quantity: 15 },
  //   ];

  //   ?????
  await Promise.all(
    stockNameQtyArr.map((s) => getAllCurrentStock(s.stockName, s.quantity))
  );
  await loadGoogleChartLibrary();
  drawChart(prepareStockInChart(stockNameToObjMap));
};

/* Add Stock */
const inputAdd = document.getElementById("input-add");
const btnAdd = document.getElementById("btn-add");
btnAdd.addEventListener("click", () => {
  modal.style.display = "flex";
  inputAdd.focus();
});

document.getElementById("btn-cancel-stock").addEventListener("click", () => {
  inputAdd.value = "";
  modal.style.display = "none";
});

document.getElementById("btn-add-stock").addEventListener("click", async () => {
  const newStockName = inputAdd.value.toUpperCase();
  await getAllCurrentStock(newStockName, 0);
  inputAdd.value = "";
  modal.style.display = "none";
  drawChart(prepareStockInChart(stockNameToObjMap));
});

const addEventListener = (stockNameToObjMap) => {
  [...stockNameToObjMap.keys()].map((stockName) => {
    // Delete Stock
    document
      .getElementById(`btn-delete-${stockName}`)
      .addEventListener("click", () => {
        deleteStock(stockName, stockNameToObjMap);
      });

    // Edit & Save Quantity
    document
      .getElementById(`btn-edit-${stockName}`)
      .addEventListener("click", () => {
        quantityEdit(stockName);
      });
    document
      .getElementById(`${stockName}-quantity`)
      .addEventListener("change", () => {
        saveQtyChange(stockName, stockNameToObjMap);
      });
  });
};

main();
