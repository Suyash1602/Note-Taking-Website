// All the console.log are for testing purpose 
//console.log("Connected");
showNotes();

// Date and Time code
let d = new Date();
let month = d.getMonth() + 1;
document.getElementById("todayDate").innerHTML = d.getDate() + "/" + month + "/" + d.getFullYear();

function clock() {

    var hr = new Date().getHours();
    var mi = new Date().getMinutes();
    var sc = new Date().getSeconds();
    var ampm = hr >= 12 ? 'pm' : 'am';
    hr = hr % 12;
    hr = hr < 10 ? '0' + hr : hr;
    mi = mi < 10 ? '0' + mi : mi;
    sc = sc < 10 ? '0' + sc : sc;
    var show = hr + ":" + mi + ":" + sc + " " + ampm;

    document.getElementById("showTime").innerHTML = show;
}
var interval = setInterval(clock, 500);


//if user add a note this will add it into LocalStorage
let addBtn = document.getElementById("addBtn");
addBtn.addEventListener("click", function (e) {

    let addTxt = document.getElementById("addTxt");
    let addTitle = document.getElementById("addTitle");
    let notes = localStorage.getItem("notes");
    var notesObj;
    if (notes == null) {
        notesObj = [];
    }
    else {
        notesObj = JSON.parse(notes);
    }

    let myObj = {
        title: addTitle.value,
        text: addTxt.value
    }

    notesObj.push(myObj);
    localStorage.setItem("notes", JSON.stringify(notesObj));
    addTxt.value = "";
    addTitle.value = "";
    // console.log(notesObj);
    showNotes();
});

// This function is to show elements from the local stroage 
function showNotes() {

    let notes = localStorage.getItem("notes");
    var notesObj;
    if (notes == null) {
        notesObj = [];
    }
    else {
        notesObj = JSON.parse(notes);
    }
    let html = "";
    notesObj.forEach(function (element, index, fullDate) {
        html += `
        <div class="noteCard my-2 mx-2 card" style="width: 18rem;">
                <div class="card-body">
                  <h5 class="card-title"> ${element.title} </h5>
                  <p class="card-text">${element.text}</p>
                  <button id = ${index} onclick="deleteNote(this.id)"  class="btn btn-primary">Delete Note</button>
                </div>
              </div>

        `
    });
    let notesElm = document.getElementById("notes");
    if (notesObj.length != 0) {
        notesElm.innerHTML = html;
    }
    else {
        notesElm.innerHTML = `Nothing to show. Add your notes`;
    }
}

// fucntion to delete a note 
function deleteNote(index) {
    //console.log("i am deleting",index);
    let notes = localStorage.getItem("notes");
    var notesObj;
    if (notes == null) {
        notesObj = [];
    }
    else {
        notesObj = JSON.parse(notes);
    }
    notesObj.splice(index, 1);
    localStorage.setItem("notes", JSON.stringify(notesObj));
    showNotes();
}

//Search button code here

let search = document.getElementById('searchTxt');
search.addEventListener('input', function () {
    let inputval = search.value.toLowerCase();
    //console.log("input Evnet fired");
    let noteCards = document.getElementsByClassName("noteCard");
    Array.from(noteCards).forEach(function (element) {
        let cardTxt = element.getElementsByTagName('p')[0].innerText;
        //console.log(cardTxt);

        if (cardTxt.includes(inputval)) {
            element.style.display = "block";
        }
        else {
            element.style.display = "none";
        }
    })
})
