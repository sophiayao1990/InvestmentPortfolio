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

const getAllCurrentStock = async (stockName, quantity, stockNameToObjMap) => {
  let { stock, apiSuccess, priceJsonResCode } = await fetchSingleStock(
    stockName,
    quantity
  );
  if (!apiSuccess) {
    if (priceJsonResCode === 400) {
      console.log(priceJsonResCode);
      alert("stock doesn't exist");
      return;
    } else if (priceJsonResCode === 429) {
      console.log(priceJsonResCode);
      alert("API Error: call API too often");
      return;
    }
  }
  stockNameToObjMap.set(stockName.toUpperCase(), stock);
  printDataToHtml(stockNameToObjMap);
  addEventListener(stockNameToObjMap);
};

const main = async () => {
  // HTML & Pie Chart of all stocks from database
  let stockNameToObjMap = new Map();
  await Promise.all(
    stockNameQtyArr.map((s) =>
      getAllCurrentStock(s.stockName, s.quantity, stockNameToObjMap)
    )
  );
  await loadGoogleChartLibrary();
  drawChart(prepareStockInChart(stockNameToObjMap));

  /* Add new Stock */
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

  document
    .getElementById("btn-add-stock")
    .addEventListener("click", async () => {
      const newStockName = inputAdd.value.toUpperCase();
      if (stockNameToObjMap.has(newStockName)) {
        alert(`${newStockName} already exist in your portfolio`);
        inputAdd.value = "";
        modal.style.display = "none";
        return;
      }
      await getAllCurrentStock(newStockName, 10, stockNameToObjMap);
      inputAdd.value = "";
      modal.style.display = "none";
      drawChart(prepareStockInChart(stockNameToObjMap));
    });
};

/* Delete & Edit Stock */
const addEventListener = (stockNameToObjMap) => {
  for (let stockName of stockNameToObjMap.keys()) {
    //   [...stockNameToObjMap.keys()].map((stockName) => {
    document
      .getElementById(`btn-delete-${stockName.toUpperCase()}`)
      .addEventListener("click", () => {
        deleteStock(stockName, stockNameToObjMap);
      });

    document
      .getElementById(`btn-edit-${stockName.toUpperCase()}`)
      .addEventListener("click", () => {
        quantityEdit(stockName);
      });
    document
      .getElementById(`${stockName.toUpperCase()}-quantity`)
      .addEventListener("change", () => {
        saveQtyChange(stockName, stockNameToObjMap);
      });
  }
};

main();
