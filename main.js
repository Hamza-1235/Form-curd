const registrationform = document.getElementById("registrationform");
const nameField = document.getElementById("name");
const emailField = document.getElementById("email");
const ResultDisplay = document.getElementById("displayresults");
const EditIndex = document.getElementById("editIndex");
let savedData = JSON.parse(localStorage.getItem("registrationData")) || [];

document.addEventListener("DOMContentLoaded", function () {
    showRecords();
    registrationform.addEventListener("submit", SubmitData);
});

function showRecords() {
    ResultDisplay.innerHTML = "<h2>Registration Results</h2>";
    savedData.forEach(function (data, index) {
        const recordContainer = document.createElement("div");
        recordContainer.className = "record-container";

        const newRecord = document.createElement("div");
        newRecord.className = "record";
        newRecord.innerHTML = "<h1>" + data.name + "</h1><p>" + data.email + "</p>";

        const editButton =   createEditButton(data, index);
        const deleteButton = createDeleteButton(index);

        recordContainer.appendChild(newRecord);
        recordContainer.appendChild(editButton);
        recordContainer.appendChild(deleteButton);
        ResultDisplay.appendChild(recordContainer);
    });
}
function createEditButton(data,index){
    const editButton=document.createElement("button");
    editButton.innerHTML="Edit";
    editButton.style.backgroundColor = "black";  
    editButton.style.color = "white"; 
    editButton.style.padding = "10px 20px";  
    editButton.style.margin="10px"
    editButton.style.borderRadius = "5px";  
    editButton.style.cursor = "pointer";  

    editButton.addEventListener("click" , function(){
        nameField.value=data.name;
        emailField.value=data.email;
        EditIndex.value=index;
    });
    return editButton;
}
function createDeleteButton(index){
    const deleteButton= document.createElement("button");
    deleteButton.innerHTML="Delete";

    deleteButton.style.backgroundColor = "black";  
    deleteButton.style.color = "white"; 
    deleteButton.style.padding = "10px 20px";  
    deleteButton.style.margin="10px"
    deleteButton.style.borderRadius = "5px";  
    deleteButton.style.cursor = "pointer";  



    deleteButton.addEventListener("click" , function(){
        savedData.splice(index,1);
        localStorage.setItem("registrationData" , JSON.stringify(savedData));
        showRecords();
    })
    return deleteButton;
}


function SubmitData(event){
    event.preventDefault();
    const name=nameField.value.trim();
    const email=emailField.value.trim();

    if(name === "" || email === ""){
        if(name === "")
        {
            document.getElementById("nError").textContent="Name is Required";

        }
        if(email=== "")
        {
            document.getElementById("eError").textContent="Email is Required";
        }
        return;
    }

    const index=EditIndex.value;
    if(index=== "-1"){
        savedData.push({name:name, email:email});
    } 
    else{
        savedData[index]={name:name , email:email};
        EditIndex.value= "-1";
    }

    localStorage.setItem("registrationData" , JSON.stringify(savedData));
    showRecords();

    registrationform.reset();

}
