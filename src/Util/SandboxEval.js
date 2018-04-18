

const sandBoxEval = (strCode, index, blnExecOnly) => {
  return new Promise((resolve, reject) => {
    function work() { // this code runs in the worker, providing a safe one-time custom JS enviroment
      delete Function.prototype.constructor; 	// blocks Function access via any.constructor
      delete Object.getOwnPropertyNames; 	// prevents environment sniffing

      // black-list (potentially) unsafe globals to prevent access from user-provided code via formal parameters on a wrapper function:
      function privacy(self, XMLHttpRequest, importScripts, Function, Worker, WebSocket, MessageChannel, __proto__, __defineGetter__,
                       IDBDatabase, setTimeout, setInterval, EventSource, onmessage, onerror, console) {
        "use strict"; // makes "eval" keyword even safer by keeping this from execution aliases

        postMessage(/0/);

      }

      /* end privacy() */

      setTimeout(privacy.bind(null), 0); // block 'this' in user-provided code and execute

    }

    /* end work() */

    if (typeof strCode === "function") {
      strCode = " (" + strCode + ").call()";
    } else {
      if (blnExecOnly) {
        strCode = "true);" + strCode + ";void(0";
      } else {
        strCode = "eval(" + JSON.stringify(strCode.trim()) + ")";
      }
    }

    var code = String(work).trim().split("{").slice(1).join("{").slice(0, -1).trim().replace("/0/", strCode), // inline the user code
        worker = new Worker(URL.createObjectURL(new Blob([code]))); // create a new worker loaded with the user-provided code in the wrapper

    worker.onmessage = function (e) { // code evaluated, results arriving
      // cb(e.data, e, code, worker); // invoke callback with result and some extra arguments for routing
      resolve({data: e.data, index: index});
      worker.terminate();
    };

    worker.onerror = function (e) { // code evaluated, results arriving
      var m = e.message;
      e = {
        toString: function () {
          return m + "\n" + Object.keys(e.e).map(function (a) {
            if (this[a] == null || typeof this[a] === "object") return;
            return a + ": \t" + this[a]
          }, e.e).filter(Boolean).join("\n");
        }, e: e
      };
      // cb(e, null, code, worker); // invoke callback with result, null as the event object to indicate errror, and some extra arguments for routing
      reject(e.e);
      worker.terminate();
    };

    return worker;
  });
};

export default sandBoxEval;