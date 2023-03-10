const getChange = (currentPrice, prevDayClosePrice) => {
  return (
    ((currentPrice - prevDayClosePrice) / prevDayClosePrice) *
    100
  ).toFixed(2);
};

const getSubtotalValue = (currentPrice, quantity) => {
  return (currentPrice * quantity).toFixed(2);
};

const prepareStockObj = (
  stockName,
  quantity,
  priceJsonRes,
  timeSeriesJsonRes
) => {
  let stock = {};
  stock.name = stockName.toUpperCase();
  stock.quantity = quantity;
  stock.currentPrice = parseFloat(priceJsonRes.price).toFixed(2);
  stock.prevDayClosePrice = parseFloat(
    timeSeriesJsonRes.values[1].close
  ).toFixed(2);
  stock.change = getChange(stock.currentPrice, stock.prevDayClosePrice);
  stock.subtotalValue = getSubtotalValue(stock.currentPrice, stock.quantity);

  return stock;
};

const fetchSingleStock = async (stockName, quantity) => {
  let stock = {};

  const api = "https://api.twelvedata.com/";
  const apikey = "apikey=8ed8002e5c534c129cbae9ffc63d7501";

  const [priceFetchRes, timeSeriesFetchRes] = await Promise.all([
    fetch(`${api}price?symbol=${stockName}&${apikey}`),
    fetch(`${api}time_series?symbol=${stockName}&interval=1day&${apikey}`),
  ]);

  let priceJsonRes = await priceFetchRes.json();
  let timeSeriesJsonRes = await timeSeriesFetchRes.json();
  let apiSuccess =
    priceJsonRes.status !== "error" && timeSeriesJsonRes.status !== "error";

  if (apiSuccess) {
    stock = prepareStockObj(
      stockName,
      quantity,
      priceJsonRes,
      timeSeriesJsonRes
    );
  }

  return {
    stock: stock,
    apiSuccess: apiSuccess,
    priceJsonResCode: priceJsonRes.code,
  };
};

export { getChange, getSubtotalValue, fetchSingleStock };
