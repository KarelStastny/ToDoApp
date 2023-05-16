// vytvoření pole v local storage a ošetření když tam už je a vytáhne z ní data
const getSavedTask = () =>{
    let myTasks = localStorage.getItem("task")
    
    //pokud pole existuje vrať úkoly, pokud ne vytvoř pole
    if(myTasks !== null){
        return JSON.parse(myTasks)
    } else{
        return []
    }
}
//spuštění funkce
const task = getSavedTask()


let myForm = document.querySelector("#to-do-form")
let taskList = document.querySelector(".task-list")

//odeslání dat do local storage
myForm.addEventListener("submit", (e) =>{
    e.preventDefault()

    if(e.target.elements.newTask.value == ""){
        alert("Write something")
    }

    //přidání id a názvu úkolu
    task.push({
        id: uuidv4(),
        task: e.target.elements.newTask.value
    })

    e.target.elements.newTask.value = ""

    //poslání dat do funkce která převede do Local storage
    saveTask(task)
  
    //při odeslání dat znova vyrendrovat stránku 
    toListAgain()
})

//struktura co se přidá na stránku po odeslání
const htmlStructure = (writeTask) => {
    let newDiv = document.createElement("div")
        newDiv.classList.add("result-div")
    let newOdstavec = document.createElement("p")
    let newButton = document.createElement("button")

    newOdstavec.textContent=writeTask.task
    newDiv.appendChild(newOdstavec)

    newButton.textContent = "Done"
    newDiv.appendChild(newButton)

    //Nastavení mazacího tlačítka
    newButton.addEventListener("click", () =>{

        //smažené jeden řádek podle id
        removeTask(task, writeTask.id)
        //zbylé pole znovu uloží
        saveTask(task)
        //Znovu vypíše do stránky
        toListAgain()
    })  

    //v divu vráti všechnoy hondoty
    return newDiv
}

//==========Funkce=============================================================================================================================================================================


//Uložení dat do local storage
const saveTask = (oneTask) => {
    localStorage.setItem("task", JSON.stringify(oneTask))
}


//Funkce pro obnovu výpis dat z Local storage
const toListAgain = () => {
    taskList.innerHTML = ""

    //do proměné uloží všechny data z Localu
    let newData = getSavedTask()


    //Cyklem vypíše všechny data
    newData.forEach( (newTask) => {
        const dataLoad = htmlStructure(newTask)
        taskList.appendChild(dataLoad)

    })

}
//spustí funkci aby data při obnově stránky se vypsali
toListAgain()


//Funkce mazání podle ID
const removeTask = (ourTask, id) =>{
    const index = ourTask.findIndex( (checkTask) =>{
        return checkTask.id === id
    })

    if (index > -1){
        ourTask.splice(index, 1)
    }
}

