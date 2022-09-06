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

function run() {
  var GetValue = $(".change").val();
  if (GetValue >= 0 || GetValue <= 100) {
    $(".progress_inner").css("width", GetValue + "%");
  }
}
