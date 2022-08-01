//Object Destructuring in JavaScript
// const hero = {
//   //llave : valor
//   name: "Batman",
//   realName: "Bruce Wayne",
//   edad: 45,
//   address: {
//     city: "Gotham",
//   },
//   sararincon: 26,
// };

// hero.sararincon;

// const edadUsuario = {
//   "sara rincon": 26,
//   "javier carrion": 26,
//   "gabriel rincon": 25,
// };

// // const name = hero.name
//const realName = hero.realName
// const { name, realName } = hero; //declaro la variable name y la inicializo con hero.name y re
// console.log(name, realName);

// // const adress = hero.address.city;
// const {
//   address: { city },
// } = hero;

// const { city } = hero.address;

// console.log(city);

//Si queremos que el nombre de variable sea diferente a la propiedad
// const { name: nombreSuperHero } = hero;
// console.log(nombreSuperHero);

// //hero.name == hero['name']
// //hero.name == hero[prop]
// const prop = "sara rincon";
// const { [prop]: lala } = edadUsuario;
// console.log(lala);

const myBtn = document.getElementById("button-addon2");

myBtn.addEventListener("click", function () {
  let lista = document.createElement("li");
  lista.className = "list-group-item";
  let valueInput = document.getElementById("input-texto").value;
  var t = document.createTextNode(valueInput);
  lista.appendChild(t);
  if (valueInput === "") {
    alert("You must write something!");
  } else {
    document.getElementById("resultado").appendChild(lista);
  }
  document.getElementById("input-texto").value = "";

  let btnclose = document.createElement("i");

  btnclose.className = "fa-solid fa-trash-can";

  lista.appendChild(btnclose);
  btnclose.addEventListener("click", function () {
    lista.parentNode.removeChild(lista);
  });
});
