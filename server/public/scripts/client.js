function onReady() {
    console.log("client.js is sourced!");
    resultHistory();
  }
  
  onReady();

  function submitCalcInfo(event) {
    event.preventDefault();

    let userInputs = {
        input1 = document.getElementById("input_1").value,
        input2 = document.getElementById("input_2").value

    };
    axios({
        method: "POST",
        url: "/calculations",
        data: userInputs,
      })
        .then
  }