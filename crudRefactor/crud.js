"use strict";
let textId = document.getElementById("id");
let textFName = document.getElementById("fname");
let textLName = document.getElementById("lname");
let textAge = document.getElementById("age");
let textEmail = document.getElementById("email");
let textPhone = document.getElementById("phone");

let mId;
let mFName;
let mLName;
let mAge;
let mEmail;
let mPhone;
let persons = [];
let personsList = []; // массив персон для localStorage
function Person(mId, mFName, mLName, mAge, mEmail, mPhone) {
  this.mId = mId;
  this.mFName = mFName;
  this.mLName = mLName;
  this.mAge = mAge;
  this.mEmail = mEmail;
  this.mPhone = mPhone;
}

textId.addEventListener("change", function(e) {
  ShowId(e.target.value);
});

textFName.addEventListener("change", function(e) {
  ShowFname(e.target.value);
});
textLName.addEventListener("change", function(e) {
  ShowLname(e.target.value);
});
textAge.addEventListener("change", function(e) {
  ShowAge(e.target.value);
});
textEmail.addEventListener("change", function(e) {
  ShowEmail(e.target.value);
});
textPhone.addEventListener("change", function(e) {
  ShowPhone(e.target.value);
});

//кнопки
let buttonCreate = document.getElementById("create");
buttonCreate.addEventListener("click", function(e) {
  createTable(e.target.value);
});

let buttonUpdate = document.getElementById("update");
buttonUpdate.addEventListener("click", function(e) {
  updateElement(e.target.value);
});

let buttonDelete = document.getElementById("delete");
buttonDelete.addEventListener("click", function(e) {
  deliteElementId(e.target.value);
});

let buttonRead = document.getElementById("read");
buttonRead.addEventListener("click", function(e) {
  readTable(e.target.value);
});
// кнопки радио
let buttonLS = document.getElementById("ls");
buttonLS.addEventListener("change", function(e) {
  workLS(e.target.value);
});

let buttonDB=document.getElementById("db");
buttonDB.addEventListener("change",function(e){
  workDB(e.target.value);
});

let buttonServer=document.getElementById("server");
buttonServer.addEventListener("change", function(e){
  workServer(e.target.value);
});
//переменная блока вывода
let root = document.getElementById("root");
// функции
function createTable() {
  if (persons.includes(mId) == true) {
    alert("This Id is not create");

    myClear();
    return;
  }
  let localPerson = new Person(mId, mFName, mLName, mAge, mEmail, mPhone);
  let divA = document.createElement("div");
  divA.id = mId;

  let divN1 = document.createElement("div");
  divN1.className = "info1";
  divN1.innerHTML = mId;
  divA.append(divN1);
  textId.value = "";

  let divN2 = document.createElement("div");
  divN2.className = "info2";
  divN2.innerHTML = mFName;
  divA.append(divN2);
  textFName.value = "";

  let divN3 = document.createElement("div");
  divN3.className = "info3";
  divN3.innerHTML = mLName;
  divA.append(divN3);
  textLName.value = "";

  let divN4 = document.createElement("div");
  divN4.className = "info4";
  divN4.innerHTML = mAge;
  divA.append(divN4);
  textAge.value = "";

  let divN5 = document.createElement("div");
  divN5.className = "info5";
  divN5.innerHTML = mEmail;
  divA.append(divN5);
  textEmail.value = "";

  let divN6 = document.createElement("div");
  divN6.className = "info6";
  divN6.innerHTML = mPhone;
  divA.append(divN6);
  textPhone.value = "";

  let pipl = mId;

  persons.push(pipl);
  // добавление
  personsList.push(localPerson);
  // localStorage.setItem("persons", JSON.stringify(personsList));
  localStr(personsList);

  root.append(divA);
}
function updateElement() {
  if (persons.includes(mId) == false) {
    alert("Not update method this Id");
    
    myClear();
    return;
  } else {
    let updateA = document.getElementById(mId);
    let childF = updateA.children;
    childF[0].innerHTML = mId;
    childF[1].innerHTML = mFName;
    childF[2].innerHTML = mLName;
    childF[3].innerHTML = mAge;
    childF[4].innerHTML = mEmail;
    childF[5].innerHTML = mPhone;
    // перезапись
    let localPerson1 = new Person(mId, mFName, mLName, mAge, mEmail, mPhone);
    for (let i = 0; i < personsList.length; i++) {
      if (personsList[i].mId === mId) {
        personsList[i] = localPerson1;
      }
    }
    // personsList.push(localPerson1);
    // localStorage.setItem("persons", JSON.stringify(personsList));
    localStr(personsList);
    myClear();
    
  }
}

function deliteElementId() {
  if (persons.includes(mId) == false) {
    alert("Not delite method this Id");
   
    myClear();
    return;
  } else {
    let deliteA = document.getElementById(mId);
    let p1 = mId;
    let ind = persons.indexOf(p1);
    deliteA.remove();
    delete persons[ind];
    // удаление
    for (let i = 0; i < personsList.length; i++) {
      if (personsList[i].mId == p1) {
        personsList.splice(i, 1);
      }
    }
    // localStorage.setItem("persons", JSON.stringify(personsList));
    localStr(personsList);

    myClear();
  }
}

function localStr(personsList) {
  localStorage.setItem("persons", JSON.stringify(personsList));
  return localStorage.getItem("persons");
}

/////////////////////////////
function readTable() {
  if (persons.length != 0) {
    return;
  }
  let date = JSON.parse(localStorage.getItem("persons"));
  // let date=JSON.parse(localStr(personsList));

  for (let i = 0; i < date.length; i++) {
    let divA = document.createElement("div");
    divA.id = date[i].mId;

    let divN1 = document.createElement("div");
    divN1.className = "info1";
    divN1.innerHTML = date[i].mId;
    divA.append(divN1);
    textId.value = "";

    let divN2 = document.createElement("div");
    divN2.className = "info2";
    divN2.innerHTML = date[i].mFName;
    divA.append(divN2);
    textFName.value = "";

    let divN3 = document.createElement("div");
    divN3.className = "info3";
    divN3.innerHTML = date[i].mLName;
    divA.append(divN3);
    textLName.value = "";

    let divN4 = document.createElement("div");
    divN4.className = "info4";
    divN4.innerHTML = date[i].mAge;
    divA.append(divN4);
    textAge.value = "";

    let divN5 = document.createElement("div");
    divN5.className = "info5";
    divN5.innerHTML = date[i].mEmail;
    divA.append(divN5);
    textEmail.value = "";

    let divN6 = document.createElement("div");
    divN6.className = "info6";
    divN6.innerHTML = date[i].mPhone;
    divA.append(divN6);
    textPhone.value = "";

    let pipl = date[i].mId;

    persons.push(pipl);
    // добавление
    let localPerson2 = new Person(
      date[i].mId,
      date[i].mFName,
      date[i].mLName,
      date[i].mAge,
      date[i].mEmail,
      date[i].mPhone
    );

    personsList.push(localPerson2);

    root.append(divA);
  }
  localStr(personsList);
}
function workLS(){
  readTable();
}

function workDB(){}
function workServer(){}
///////////////////////////////

function ShowId(dif) {
  mId = dif;
}
function ShowFname(dif) {
  mFName = dif;
}
function ShowLname(dif) {
  mLName = dif;
}
function ShowAge(dif) {
  mAge = dif;
}
function ShowPhone(dif) {
  mPhone = dif;
}
function ShowEmail(dif) {
  mEmail = dif;
}

function myClear() {
  textId.value = "";
  textFName.value = "";
  textLName.value = "";
  textAge.value = "";
  textEmail.value = "";
  textPhone.value = "";
}
// localStorage.clear();
