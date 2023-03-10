let prepareStockInChart = (stockNameToObjMap) => {
  let stockInChart = [["Symbol", "value"]];
  for (let stockName of stockNameToObjMap.keys()) {
    stockInChart.push([
      stockNameToObjMap.get(stockName).name,
      stockNameToObjMap.get(stockName).subtotalValue,
    ]);
  }
  return stockInChart;
};

// Google Pie Chart
function drawChart(stockInChart) {
  var data = google.visualization.arrayToDataTable(stockInChart);
  var options = {
    height: "356",
    chartArea: { width: "100%", height: "80%" },
    pieHole: 0.5,
    backgroundColor: "#102f45",
    colors: ["#F4B941", "#EC8A33", "#E2C790", "#4C9CB9", "#9AC8E3"],
    legend: {
      position: "bottom",
      textStyle: { color: "#f4fbff", fontSize: 14 },
    },
    pieSliceText: "label",
    pieSliceTextStyle: { fontSize: "10" },
  };

  var chart = new google.visualization.PieChart(
    document.getElementById("donutchart")
  );
  chart.draw(data, options);
}
const loadGoogleChartLibrary = async () => {
  await google.charts.load("upcoming", { packages: ["corechart"] });
};

export { loadGoogleChartLibrary, prepareStockInChart, drawChart };
