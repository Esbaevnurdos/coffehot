document
  .getElementById("login-form")
  .addEventListener("submit", function (event) {
    event.preventDefault();

    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    const correctUsername = "demo1";
    const correctPassword = "skills2023d1";

    const correctUsername2 = "demo2";
    const correctPassword2 = "skills2023d2";

    if (username === correctUsername && password === correctPassword) {
      window.location.href = "/index.html";
    } else if (username === correctUsername2 && password === correctPassword2) {
      window.location.href = "/index copy.html";
    } else {
      document.getElementById("error-message").innerText =
        "Invalid username or password";
    }
  });

// hello
const APP = {
  data: [],
  init() {
    APP.addListeners();
  },
  addListeners() {
    const form = document.querySelector(".login-container #login-form");
    form.addEventListener("submit", APP.saveData);

    document
      .getElementById("btnExport")
      .addEventListener("click", APP.exportData);

    document
      .querySelector("table tbody")
      .addEventListener("dblclick", APP.editCell);
  },
  saveData(ev) {
    ev.preventDefault();
    const form = ev.target;
    const formdata = new FormData(form);
    //save the data in APP.data
    APP.cacheData(formdata);
    //build a row in the table
    APP.buildRow(formdata);
    //clear the form
    form.reset();
    //focus on first name
    document.getElementById("fname").focus();
  },
  cacheData(formdata) {
    //extract the data from the FormData object and update APP.data
    APP.data.push(Array.from(formdata.values()));
    console.table(APP.data);
  },
  buildRow(formdata) {
    const tbody = document.querySelector("#display > table > tbody");
    const tr = document.createElement("tr");
    tr.innerHTML = "";
    tr.setAttribute("data-row", document.querySelectorAll("tbody tr").length);
    let col = 0;
    //loop through the FormData object entries and build a row with
    for (let entry of formdata.entries()) {
      tr.innerHTML += `<td data-col="${col}" data-name="${entry[0]}">${entry[1]}</td>`;
      col++;
    }
    tbody.append(tr);
    //data references for later editing
  },
  exportData() {
    //insert the header row
    APP.data.unshift(["Username", "Password"]);
    //convert array to a string with \n at the end
    let str = "";
    APP.data.forEach((row) => {
      str += row
        .map((col) => JSON.stringify(col))
        .join(",")
        .concat("\n");
    });

    //create the file
    let filename = `dataexport.${Date.now()}.csv`;
    let file = new File([str], filename, { type: "text/csv" });

    //create an anchor tag with "download" attribute
    let a = document.createElement("a");
    a.href = URL.createObjectURL(file);
    a.download = filename;
    a.click();
    //and click the anchor
  },
  editCell(ev) {
    let cell = ev.target.closest("td");
    if (cell) {
      let row = +cell.parentElement.getAttribute("data-row");
      let col = +cell.getAttribute("data-col");
      //a td was clicked so make it editable
      cell.contentEditable = true;
      cell.focus();
      let txt = cell.textContent;
      cell.addEventListener("keydown", function save(ev) {
        if (ev.key === "Enter" || ev.code === "Enter") {
          cell.contentEditable = false;
          cell.removeEventListener("keydown", save);
          APP.data[row][col] = cell.textContent;
          console.table(APP.data);
        }
      });
      //listen for the enter key to end the editing
      //update the APP.data
    }
  },
};

document.addEventListener("DOMContentLoaded", APP.init);
