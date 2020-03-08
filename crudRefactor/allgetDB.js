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
