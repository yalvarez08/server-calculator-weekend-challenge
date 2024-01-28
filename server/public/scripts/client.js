console.log("client.js is sourced!");

function onReady() {
    
    retrieveCalculations();
  }
  
  onReady();

  function submitCalcInfo(event) {
    event.preventDefault();
    // objects in array should look like:
//  [
//   {
//     input1: 3,
//     input2: 5,
//     operator: '+'
//   }
//  ]

    let userInputs = {
        input1: document.getElementById("input_1").value,
        input2: document.getElementById("input_2").value,
        operator: document.querySelector(".operator").value,
    };
    axios({  //make POST request to send to server
        method: "POST",
        url: "/calculations",
        data: userInputs,
      })
        .then (function(response) {
            console.log('request to POST /calculations succeeded.', response.status);
            document.getElementById("input_1").value = "";
            document.getElementById("input_2").value = "";
            document.querySelector(".operator").value = "";
            
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
        document.querySelector(".operator").innerHTML = "";
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
        document.querySelector(".operator").innerHTML = "";
        document.getElementById("recentResult").value = "";
    })
    .catch (function(error) {
        console.log("error", error);
    });
  }

let calculatorDiv = document.getElementById("calculator_div");
  function retrieveCalculations() {
    axios({
        method: "GET",
        url: "/calculations",
    })
      .then (function(response) {
        console.log('request to GET /calculations succeeded.', response.status);
        console.log(response.data);

    // const operatorAction = document.querySelector('data-action');
    // if (
    //     operatorAction === "add" ||
    //     operatorAction === "subtract" ||
    //     operatorAction === "multiply" ||
    //     operatorAction === "divide"
    //     ) {
    //         calculatorDiv.dataset.operator = action;
    //     }
    
    let allResults = response.data; //this is an array (calculations array)
    
    //make history reflect on DOM
    document.getElementById("resultHistory").innerHTML = "";
    for (let result of allResults) {
        document.getElementById("resultHistory").innerHTML += `
        
            <li>${result.input1}, ${result.operator}, ${result.input2}</li>
        
        `;

    let recentInput = allResults[allResults.length - 1]; //this is most recent object (from calc array)

    //display most recent calc result on DOM
    if (recentInput) {
        document.getElementById("recentResult").innerHTML = `<span> ${recentInput.result}</span>`
    }
        let input1 = recentInput.calculations.input1;
        let input2 = recentInput.calculations.input2;
        let operator = recentInput.calculations.operator;
    
        input1 = Number(input1);
        input2 = Number(input2);
    
    }
      })
      .catch(function (error) {
        alert('Request to GET /calculations failed.');
        console.log("error", error);
      });
  }