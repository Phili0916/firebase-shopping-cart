import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js"
import { getDatabase, ref, push, onValue } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"

const appSettings = {
    databaseURL: //Realtime databaseURL
}

const app = initializeApp(appSettings)
const database = getDatabase(app)
const shoppingListInDB = ref(database, "shoppingList")

const inputFieldElement = document.getElementById("input-field")
const addButtonElement = document.getElementById("add-button")
const shoppingListElement = document.getElementById("shopping-list") 

addButtonElement.addEventListener("click", function() {
    let inputValue = inputFieldElement.value
    
    push(shoppingListInDB, inputValue)

    clearInputValue()
        
})

onValue(shoppingListInDB, function(snapshot) {
    let snapshotItems = Object.values(snapshot.val())
    clearShoppingListEl()

    snapshotItems.forEach((item) => {
        addShoppingListEl(item)
        console.log(item)
    })
})

function clearShoppingListEl() {
    shoppingListElement.innerHTML = ""
}

function clearInputValue() {
    inputFieldElement.value = '';
}

function addShoppingListEl(itemValue) {
    shoppingListElement.innerHTML += `<li>${itemValue}</li>`   
}
