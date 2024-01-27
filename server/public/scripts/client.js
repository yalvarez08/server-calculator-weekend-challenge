function onReady() {
    console.log("client.js is sourced!");
    resultHistory();
  }
  
  onReady();

  function submitCalcInfo(event) {
    event.preventDefault();

    let userInputs = {
        input1: document.getElementById("input_1").value,
        input2: document.getElementById("input_2").value,
        operator:
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
            resultHistory();
        })
        .catch(function (error) {
            alert('Request to POST /calculations failed.');
            console.log("error", error);
          });
  }

  function clearInputs(event) {
    axios({
        method: "POST",
        url: "/clear",
      })
      .then((res) => {
        document.getElementById("resultHistory").innerHTML = "";  
      })
      .catch((error) => console.log("error", error));
  }

  function resultHistory() {
    axios({
        method: "GET",
        url: "/calculations",
    })
      .then (function(response) {
        console.log('request to GET /calculations succeeded.', response.status);






    //make history reflect on DOM
    document.getElementById("resultHistory").innerHTML 

      })
      .catch(function (error) {
        alert('Request to GET /calculations failed.');
        console.log("error", error);
      });
  }