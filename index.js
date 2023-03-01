import printDataToHtml from "./components/html.js";
import fetchSingleStock from "./components/fetchStock.js";
// import drawPieChart from "./components/drawChart.js";
import {
  loadGoogleChartLibrary,
  prepareStockInChart,
  drawChart,
} from "./components/drawChart.js";

const stockNameToObjMap = new Map();
const getAllCurrentStock = async (stockName, quantity) => {
  let stock = await fetchSingleStock(stockName, quantity);
  stockNameToObjMap.set(stockName, stock);
  console.log(stockNameToObjMap.get(stockName));
  printDataToHtml(stockNameToObjMap.get(stockName));
};

const main = async () => {
  let stockNameQtyArr = [
    { stockName: "amd", quantity: 10 },
    { stockName: "amzn", quantity: 15 },
  ];

  //   ?????
  await Promise.all(
    stockNameQtyArr.map((s) => getAllCurrentStock(s.stockName, s.quantity))
  );
  await loadGoogleChartLibrary();
  drawChart(prepareStockInChart(stockNameToObjMap));
};

main();

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
  await getAllCurrentStock(newStockName, 10);
  inputAdd.value = "";
  modal.style.display = "none";
  drawChart(prepareStockInChart(stockNameToObjMap));
});
