import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js"
import { getDatabase, ref, push, onValue } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"

const appSettings = {
    databaseURL: //Realtime database URL
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
    let snapshotItems = Object.entries(snapshot.val())
    clearShoppingListEl()

    snapshotItems.forEach((snapshotItem) => {
        let currentItem = snapshotItem
        let currentItemId = currentItem[0]
        let currentItemValue = currentItem[1]

        console.log(currentItemValue)
        addShoppingListEl(currentItem)
        // console.log(currentItem)
    })
})

function clearShoppingListEl() {
    shoppingListElement.innerHTML = ""
}

function clearInputValue() {
    inputFieldElement.value = '';
}

function addShoppingListEl(item) {

    let itemId = item[0]
    let itemValue = item[1]
    // shoppingListElement.innerHTML += `<li>${itemValue}</li>`   
    let newShoppingListElement = document.createElement("li")
    newShoppingListElement.textContent = itemValue
    shoppingListElement.append(newShoppingListElement)
}
