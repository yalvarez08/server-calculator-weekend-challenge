console.log("client.js is sourced!");
let operator = "";

function onReady() {
    
    retrieveCalculations();
  }
  
  onReady();

//create event handlers for operator btns-onclick 
function operationAdd(event) {
    event.preventDefault();
    operator = "+";
} 
function operationSub(event) {
    event.preventDefault();
    operator = "-";
} 
function operationMult(event) {
    event.preventDefault();
    operator = "*";
} 
function operationDivide(event) {
    event.preventDefault();
    operator = "/";
} 

function retrieveCalculations() {
    axios({
        method: "GET",
        url: "/calculations",
    })
      .then (function(response) {
        console.log('request to GET /calculations succeeded.', response.status);
        console.log(response.data);

    
    let allResults = response.data; //this is an array (calculations array)
    
    //make history reflect on DOM
    document.getElementById("resultHistory").innerHTML = "";
    for (let result of allResults) {
        document.getElementById("resultHistory").innerHTML += `
        
            <li onclick="newCalculation(event, ${result.input1}, ${result.input2}, '${result.operator}')">
            ${result.input1} ${result.operator} ${result.input2} = ${result.result}</li>
        
        `;
    }

    //display most recent calc result on DOM
    if (allResults.length) {
        let currentCalcResult = allResults[allResults.length - 1];
        document.getElementById("recentResult").innerHTML = `<span> ${currentCalcResult.result}</span>`
    }
      })
      .catch(function (error) {
        alert('Request to GET /calculations failed.');
        console.log("error", error);
      });
}

function submitCalcInfo(event) {
    event.preventDefault();
    // objects in array should look like:
//   {
//     input1: 3,
//     input2: 5,
//     operator: '+'
//   }
let input1 = document.getElementById("input_1").value;
let input2 = document.getElementById("input_2").value;

input1 = parseFloat(input1);
input2 = parseFloat(input2);

    let userInputs = {
        input1: input1,
        input2: input2,
        operator: operator,
    };

    axios({  //make POST request to send to server
        method: "POST",
        url: "/calculations",
        data: userInputs,
      })
        .then (function(response) {
            console.log('request to POST /calculations succeeded.', response.status);
            retrieveCalculations();
            document.getElementById("input_1").value = "";
            document.getElementById("input_2").value = "";
            operator = "";
            
        })
        .catch(function (error) {
            alert('Request to POST /calculations failed.');
            console.log("error", error);
          });
  }
 

  function clearInputs(event) {
    event.preventDefault();
        document.getElementById("input_1").value = "";  
        document.getElementById("input_2").value = "";  
        operator = "";
  }

  function clearCalcHistory(event) {
    event.preventDefault();
    axios({
        method: "DELETE",
        url: "/calculations"
    })
    .then (function(response) {
        console.log('request to DELETE /calculations succeeded.', response.status);
        retrieveCalculations();
        document.getElementById("input_1").value = "";  
        document.getElementById("input_2").value = "";  
        operator = "";
        document.getElementById("recentResult").innerHTML = "";
    })
    .catch (function(error) {
        console.log("error", error);
    });
  }

  

  function newCalculation (event, input1, input2, operator) {
    event.preventDefault();
    input1 = parseFloat(input1);
    input2 = parseFloat(input2);
   
    axios({
        method: 'POST',
        url: '/calculations',
        data: {input1: input1, input2: input2, operator: operator}
    })
    .then(function (response) {
        console.log(response.status);
        retrieveCalculations();
        document.getElementById("input_1").value = "";  
        document.getElementById("input_2").value = "";
        operator = "";
    })
    .catch(function (error) {
        console.log("error", error);
      });
  }