"use strict";
let openBase = indexedDB.open("Person", 2);
function Person(mId, mFName, mLName, mAge, mEmail, mPhone) {
  this.mId = mId;
  this.mFName = mFName;
  this.mLName = mLName;
  this.mAge = mAge;
  this.mEmail = mEmail;
  this.mPhone = mPhone;
}

let personslist = [];
let localPerson = new Person(15, "AA", "BB", 22, "u@a", 123);
let localPerson1 = new Person(21, "AAA", "BBB", 222, "u@@@a", 12333);
let localPerson2 = new Person(33, "ffff", "fffff", 2345, "u@@@a", 10007);
personslist.push(localPerson);
personslist.push(localPerson1);
personslist.push(localPerson2);

let db;

function addDB(personsList) {
  openBase.onupgradeneeded = function(event) {
    let db = event.target.result;

    let objectStorage = db.createObjectStore("persons");

    for (const key in personslist) {
      objectStorage.add(personslist[key], personsList[key].mId);
    }
  };
}
let localPerson3 = new Person(4, "A4", "B4", 233, "u@@3@a", 4433);

function setDB(localPerson, mI) {
  let db;
  let objectStore;
  let mId = mI;
  openBase.onsuccess = function(event) {
    db = event.target.result;
    let transaction = db.transaction(["persons"], "readwrite");
    objectStore = transaction.objectStore("persons");
    let openBasa1 = objectStore.get(mId);
    openBasa1.onsuccess = function(event) {
      let data = event.target.result;
      data = data.notified = localPerson;
      objectStore.put(data, mId).onsuccess = function(event) {};
    };
  };
}

function deleteDB(mid) {
  openBase.onsuccess = function(event) {
    let db = event.target.result;
    db.transaction(["persons"], "readwrite")
      .objectStore("persons")
      .delete(mid);
  };
}

function clearDB() {
  for (const key in personslist) {
    let num = personslist[key].mId;
    deleteDB(num);
  }
}

function dropDB() {
  indexedDB.deleteDatabase("Person", 2);
}

function allGetDB() {
    let db;
    let objectStore;
    let openBasa2;
    let ad = [];
    let rez = [];

  openBase.onsuccess = function(event) {
    db = event.target.result;
    let transaction = db.transaction(["persons"], "readwrite");
    objectStore = transaction.objectStore("persons");
    openBasa2 = objectStore.getAll();
    openBasa2.onsuccess = function(event) {
      // console.log(openBasa2.result);
      rez = event.target.result;
      ad = openBasa2.result;
      console.log(ad);
      console.log(rez);
    };
  };
//   return rez;

}

function listPeople() {
    // ...
      return new Promise(function (resolve, reject) {
        var open = indexedDB.open(("AccordionDatabase",1),
        open.onsuccess) = function() {
          var db = open.result;
          var transaction = db.transaction("PeopleStore", "readwrite");
          var store = transaction.objectStore("PeopleStore");
          var request = store.getAll();
          request.onsuccess = function(event){
            resolve(event.target.result);
          };
    
          request.onerror = function(event) { reject(event) }
    
          // Close the db when the transaction is done
          transaction.oncomplete = function() {
            db.close();
          };
          transaction.onerror = function(event) { reject(event) }
        };
        open.onerror = function(event) { reject(event) }
      })
    }



    function allgetDB1() {
        let db;
        let objectStore;
        let openBasa2;
        let ad = [];
        let rez = [];
      
        return new Promise(function(resolve, reject) {
          openBase.onsuccess = function(event) {
            db = event.target.result;
            let transaction = db.transaction(["persons"], "readwrite");
            objectStore = transaction.objectStore("persons");
            openBasa2 = objectStore.getAll();
            openBasa2.onsuccess = function(event) {
              // rez = event.target.result;
              // ad = openBasa2.result;
              // console.log(ad);
              // console.log(rez);
      
              resolve(event.target.result);
            };
            openBasa2.onerror = function(event) {
              reject(event);
            };
            transaction.oncomplete = function() {
              db.close();
            };
            transaction.onerror = function(event) {
              reject(event);
            };
          };
      
          open.onerror = function(event) {
            reject(event);
          };
        });
      }
      addDB(personslist);
let pipl=allgetDB1();
let mas=[];// воно не бачить
      for (const key in pipl) {
          mas.push(pipl[key].mFName);
      }
      

// setDB(localPerson3, 2);
// deleteDB(4);
// clearDB();
// deleteDB(15);
// deleteDB(21);
// dropDB();
// let allP=allgetDB1();
console.log(mas);
console.log(pipl);


