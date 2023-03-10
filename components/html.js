const printDataToHtml = (stockNameToObjMap) => {
  let stockHtml = `
    <tr>
        <th>Symbol</th>
        <th>Price</th>
        <th>Change %</th>
        <th colspan="2">Quantity</th>
        <th>Value</th>
        <th></th>
      </tr>
    `;

  for (let stockName of stockNameToObjMap.keys()) {
    const data = stockNameToObjMap.get(stockName);
    stockHtml += `
      <tr id='${data.name}'>
        <td>${data.name}</td>
        <td>${data.currentPrice}</td>
        <td class="${data.change > 0 ? "green" : "red"}">${data.change}</td>
        <td class='quantityCell'> <input type='text' class='input' value = ${
          data.quantity
        } id='${data.name}-quantity' disabled></input> </td>
        <td class='editIcon'>
          <button id='btn-edit-${
            data.name
          }'><i class="fa-regular fa-pen-to-square"></i></button>
        </td>
        <td id='${data.name}-subtotalValue'>${data.subtotalValue}</td>
        <td>
          <button id='btn-delete-${
            data.name
          }'><i class="far fa-trash-alt"></i></button>
        </td>
      </tr>
      `;
  }

  document.getElementById("table-data").innerHTML = stockHtml;
};

export default printDataToHtml;
