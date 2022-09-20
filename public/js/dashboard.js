const { moment } = require("moment");
// function onCreateTask() {
//   fetch("http://localhost:3000/dashboard", {
//     method: "post",
//     headers: { Accept: "application/json", "Content-Type": "application/json" },
//   })
//     .then((response) => response.json())
//     .then((data) => console.log(data));
// }

// const createTaksButton = document.querySelector("#createTaksButton");
// createTaksButton.addEventListener("click", onCreateTask);

// const todoContainer = document.querySelector("#todoContainer");
// const todoItem = document.querySelector("#todoItem");

// todoContainer.addEventListener("click", (event) => {
//   console.log(event.target.tagName);
//   if (event.target.tagName === "A") {
//     const a = event.target;
//     const li = a.parentNode.parentNode;
//     const ul = li.parentNode;
//     if (a.textContent === "Editar") {
//       const span = li.firstElementChild;
//       const p = li.firstElementChild[1];
//       const input = document.createElement("input");
//       input.type = "text";
//       input.value = span.textContent;
//       input.classList.add("form-control");
//       li.insertBefore(input, span);
//       li.removeChild(span);
//       a.textContent = "Actualizar";
//     } else if (a.textContent === "Actualizar") {
//       const input = li.firstElementChild;
//       const span = document.createElement("span");
//       span.textContent = input.value;

//       fetch(`/dashboard/edit`, {
//         method: "PUT",
//         body: JSON.stringify({
//           task: span.textContent,
//           id: todoItem.children[1].textContent,
//         }),
//         headers: {
//           "Content-Type": "application/json",
//         },
//       })
//         .then((response) => location.reload())
//         .catch((error) => console.log(error));

//       li.insertBefore(span, input);
//       li.removeChild(input);
//       a.textContent = "Editar";
//     }
//   }
// });

// var e = document.querySelector("#selector");
// function onChange() {
//   var value = e.value;
//   var text = e.options[e.selectedIndex].text;
//   console.log(value, text);
// }
// e.onchange = onChange;
// onChange();

// -----------------
const todoContainer = document.querySelector("#todoContainer");
const todoItem = document.querySelector("#todoItem");
todoContainer.addEventListener("click", (event) => {
  // console.log(event.target.tagName);
  if (event.target.tagName === "A") {
    const a = event.target;
    const li = a.parentNode.parentNode;
    const ul = li.parentNode;
    if (a.textContent === " Editar") {
      const span = li.firstElementChild;
      const p = li.firstElementChild[1];
      console.log("P", p);
      const input = document.createElement("input");
      input.type = "text";
      input.value = span.textContent;
      input.classList.add("form-control");
      li.insertBefore(input, span);
      li.removeChild(span);
      a.textContent = "Actualizar";
    } else if (a.textContent === "Actualizar") {
      const input = li.firstElementChild;
      const span = document.createElement("span");
      span.textContent = input.value;
      fetch("/dashboard/edit", {
        method: "PUT",
        body: JSON.stringify({
          task: span.textContent,
          id: todoItem.children[1].textContent,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((response) => location.reload())
        .catch((error) => console.log(error));
      li.insertBefore(span, input);
      li.removeChild(input);
      a.textContent = "Editar";
    }
  }
});

const due = (expiresdate) => {
  var now = moment(),
    due = moment(expiresdate).format("YYYY-MM-DD"),
    todayMoment = moment().format("YYYY-MM-DD"),
    dueFormatted = moment(expiresdate).format("MMMM Do YYYY"),
    tmrw,
    yest,
    dueInfo = {
      color: "",
      text: "",
    };

  tmrw = moment(now.add("days", 1)).format("MMMM Do YYYY");
  yest = moment(now.subtract("days", 2)).format("MMMM Do YYYY");

  if (todayMoment == due) {
    dueInfo.text = "Due today";
    dueInfo.color = "blue";
  } else {
    if (moment(due).isBefore(todayMoment)) {
      dueInfo.color = "red";
      if (dueFormatted === yest) {
        dueInfo.text = "Due yesterday" + " " + dueFormatted;
      } else {
        dueInfo.text = "Due " + dueFormatted;
      }
    } else {
      dueInfo.color = "blue";
      if (dueFormatted == tmrw) {
        dueInfo.text = "Due tomorrow: " + dueFormatted;
      } else {
        dueInfo.text = "Due on " + dueFormatted;
      }
    }
  }

  return dueInfo;
};
