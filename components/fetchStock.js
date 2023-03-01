const getChange = (currentPrice, prevDayClosePrice) => {
  return (((currentPrice - prevDayClosePrice) / currentPrice) * 100).toFixed(2);
};
const getSubtotalValue = (currentPrice, quantity) => {
  return (currentPrice * quantity).toFixed(2);
};

const fetchSingleStock = async (stockName, quantity, mockMode = false) => {
  const api = "https://api.twelvedata.com/";
  const apikey = "apikey=8ed8002e5c534c129cbae9ffc63d7501";

  const [priceFetchRes, timeSeriesFetchRes] = await Promise.all([
    fetch(`${api}price?symbol=${stockName}&${apikey}`),
    fetch(`${api}time_series?symbol=${stockName}&interval=1day&${apikey}`),
  ]);
  const priceJsonRes = await priceFetchRes.json();
  const timeSeriesJsonRes = await timeSeriesFetchRes.json();

  let stock = {};
  stock.name = stockName;
  stock.quantity = quantity;
  stock.currentPrice = mockMode
    ? 400
    : parseFloat(priceJsonRes.price).toFixed(2);
  stock.prevDayClosePrice = mockMode
    ? 360
    : parseFloat(timeSeriesJsonRes.values[1].close).toFixed(2);
  stock.change = getChange(stock.currentPrice, stock.prevDayClosePrice);
  stock.subtotalValue = getSubtotalValue(stock.currentPrice, stock.quantity);

  return stock;
  //   console.log(stock);
};

export { fetchSingleStock, getSubtotalValue };
