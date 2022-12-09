// Crée mes constantes
const menu = document.querySelector('.menu')

// Liste de pizzas (object)
const Pizzas = [
    { name:"queen", base: "sauce tomate", ingredients: ["sauce tomate","jambon","champignons", "chèvre"] },
    { name: "cheese", base: "sauce tomate", ingredients: ["sauce tomate","chèvre"]},
    { name: "arpitan", base: "crème fraîche", ingredients: ["crème fraîche","mozzarella","lardons","oignons"]},
    { name: "rustique", base: "crème fraîche", ingredients: ["crème fraîche","mozzarella","chèvre","lardons","champignons","oignons"]},
    { name: "Panda douceur", base: "nutella", ingredients: ["nutella", "sucre glace"]}
  ];

const  price = new Map([ ["pâte", 5], ["sauce tomate", 1], ["crème fraîche", 2], ["jambon", 2.5], ["poivron",2], 
["champignons", 4], ["mozzarella", 3], ["chèvre", 2], ["oignons", 1], ["lardons", 2], ["nutella", 2.5], ["sucre glace", 1]]);

const mapBase = new Map([["sauce tomate", "tomate"], ["crème fraîche", "crème"], ["nutella", "nutella"]])

const listMeats = ["jambon"]

const listIngredients = Array.from(price.keys())

// Rajoute en propriété le prix de la pizza
Pizzas.forEach( pizza => {
  pizza["price"] = pizza.ingredients.map(ingredient => price.get(ingredient)).reduce((acc, cur) => acc + cur) + price.get("pâte")
});


// Trouve les pizzas avec au moins un ingrédient parmi une liste
function HasSomeIng(SearchedIngs) {
  return Pizzas.filter(pizza => SearchedIngs.some(searchedIng => pizza.ingredients.includes(searchedIng)))
}


// Trouve les pizzas avec tous les ingrédients d'une liste
function HasEveryIngs(SearchedIngs) {
  return Pizzas.filter(pizza => SearchedIngs.every(searchedIng => pizza.ingredients.includes(searchedIng)))
}


// Touve les pizzas sans aucun des ingrédients d'une liste
function PizzaWithout(listSearchedIng) {
  return Pizzas.filter(pizza => {
    return listSearchedIng.every(searchedIng => !pizza.ingredients.includes(searchedIng))
  })
}

// Ajoute pour chaque pizza le type (vege/meat)
Pizzas.forEach(pizza => {
  if (listMeats.some(meat => pizza.ingredients.includes(meat))) {pizza.type = "carnivore"}
  else {pizza.type = "veggie"}
})

// Tri par prix les pizzas
Pizzas.sort((a,b) => a.price - b.price)

// Regroupe les pizzas par base
function RegroupeBase() {
  return Pizzas.reduce((a, pizza) => {
    if(!a[pizza.base]) a[pizza.base] = [pizza]
    else {a[pizza.base].push(pizza)}
    return a
  }, {})

}

function Tri() {
  Pizzas.reverse()
  DisplayMenuBase(RegroupeBase())
}

// function DisplayMenuBase(base ou type)

function DisplayMenuBase(obj) {
  while (menu.lastChild) {
    menu.removeChild(menu.lastChild);
  }
  for (const [base, pizza] of Object.entries(obj)) {
    
    // Crée un div avec la class correspondant à la base des pizzas
    const div = document.createElement("div")
    div.classList.add(`${mapBase.get(base)}`)
    // Crée un h1 avec la class : "titre"
    const h1 = document.createElement('h1')
    h1.classList.add("titre")
    
    // Ajoute le h1 aux enfants du div
    div.appendChild(h1);
    // Ajoute du texte dans le h1
    h1.textContent = `Sur base ${base}`
    
    // Crée un ul, une liste qui va contenir les infos sur les pizzas
    const list = document.createElement('ul')

    pizza.forEach(pizza => {
      // Crée un li, un élément d'une liste
      const listItem = document.createElement('li');
      const h2 = `<h2 class="pizzaNom">${pizza.name}<span class="pizzaPrix">${pizza.price + " €"}</span></h2>`;
      const para = `<p class="pizzaIngs">${pizza.ingredients.join(", ")}</p>`;
      
      listItem.insertAdjacentHTML("afterbegin", h2)
      listItem.insertAdjacentHTML("beforeend", para)
      list.appendChild(listItem);
      div.appendChild(list)
      
    })
    
    menu.appendChild(div)
  }
}

DisplayMenuBase(RegroupeBase())