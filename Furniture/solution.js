function solve() {
  const tbody = document.querySelector("tbody");
  const [generateBtn, buyBtn] = Array.from(
    document.getElementsByTagName("button")
  );

  const [inputTextArea, outputTextArea] = Array.from(
    document.querySelectorAll("textarea")
  );
  generateBtn.addEventListener("click", generate);
  buyBtn.addEventListener("click", buy);

  const items = [];

  function generate() {
    const arrayOfObj = JSON.parse(inputTextArea.value);

    for (const obj of arrayOfObj) {
      let tableRow = document.createElement("tr");

      let tableCol1 = createColumns("img", obj.img);
      tableRow.appendChild(tableCol1);

      let tableCol2 = createColumns("p", obj.name);
      tableRow.appendChild(tableCol2);

      let tableCol3 = createColumns("p", obj.price);
      tableRow.appendChild(tableCol3);

      let tableCol4 = createColumns("p", obj.decFactor);
      tableRow.appendChild(tableCol4);

      let tableCol5 = document.createElement("td");
      let input = document.createElement("input");
      input.type = "checkbox";
      tableCol5.appendChild(input);
      tableRow.appendChild(tableCol5);

      tbody.appendChild(tableRow);

      items.push({
        ...obj,
        isChecked,
      });

      function isChecked() {
        return input.checked;
      }
    }
  }

  function buy() {
    let listOfProducts = [];
    let totalPrice = 0;
    let decFactor = 0;

    const bought = items.filter((object) => object.isChecked());

    for (let itemObj of bought) {
      listOfProducts.push(itemObj.name);
      totalPrice += Number(itemObj.price);
      decFactor += Number(itemObj.decFactor);
    }
    decFactor /= bought.length;

    outputTextArea.value = [
      `Bought furniture:  ${listOfProducts.join(", ")}`,
      `Total price: ${totalPrice.toFixed(2)}`,
      `Average decoration factor: ${decFactor.toFixed(2)}`,
    ].join('\n');
  }

  function createColumns(type, content) {
    let td = document.createElement("td");
    let inner;
    if (type == "img") {
      inner = document.createElement("img");
      inner.src = content;
    } else {
      inner = document.createElement("p");
      inner.textContent = content;
    }
    td.appendChild(inner);

    return td;
  }
}
