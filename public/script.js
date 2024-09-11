// AJAX to replace them with dynamic data from GET https://json-server-ft3qa5--3000.local.webcontainer.io/api/v1/courses 



//const axios = require('axios')

axios.get('../courses')
// fetch('../courses')
  //.then(res => res.json())
  .then(data => {
    data.data.forEach(options => {
      
      var selection = document.getElementById("course");
      
      let option = document.createElement("option");
      
      option.setAttribute('value', options.id);

      let optionText = document.createTextNode(options.display);
      
      option.appendChild(optionText);
      selection.appendChild(option);
    })
  })

//If course ever becomes unselected, don't show the uvu id text input box
const selectElement = document.querySelector("#course");
selectElement.addEventListener("change", (event) => {
  uvu = document.getElementById("studentID");
  uvu.style.display = event.target.value === ""? "none" : "block";
})



//replace them with dynamic data by ajaxing GET https://json-server-ft3qa5--3000.local.webcontainer.io/logs?courseId=<courseID>&uvuId=<uvuID>

document.getElementById('uvuId').addEventListener('input', handleOnChange);

//let isPopulated = false;
function handleOnChange() {
  let str = document.getElementById('uvuId').value;
  //the str must be length 8 put up the log from server
  if (str.length === 8) {
    let listContainer = document.getElementById('unOrdered');
     
    let child = listContainer.lastElementChild;
    while (child){
      listContainer.removeChild(child);
      child = listContainer.lastElementChild;
    }
    axios.get('../logs')
      .then(data => {
        data.data.forEach ( student => {
          if (str === student.uvuId) {
           
            var mainContainer = document.getElementById('uvuIdDisplay');
            mainContainer.innerHTML = 'Student Logs for ' + student.uvuId;
            // creating html tags
            var listContainer = document.getElementById('unOrdered');

            //new tags 
            var childContainer = document.createElement('li');
            var divContainer = document.createElement('div');
            var smallTag = document.createElement('small');
            var preTag = document.createElement('pre');
            var pTag = document.createElement('p');

            // //date info
            var studentInfo = listContainer
              .appendChild(childContainer)
              .appendChild(divContainer)
              .appendChild(smallTag);
            //text info
            var studentText = childContainer
              .appendChild(preTag)
              .appendChild(pTag);
            //date info displayed 
            //text info displayed
            studentInfo.innerHTML = student.date;
            studentText.innerHTML = student.text;
            console.log('reached then()', student.date);
            console.log('dates reached ', student.text);
          }        
        })
      })
      .catch((err) => {
        console.log('error1 ', err);
      })
  }
}

const logs = document.getElementById("unOrdered");
            
logs.addEventListener("click", logItem);

function logItem() {
  const item = document.querySelectorAll("pre");
  const textArray = Array.from(item);
  for(let i =0; i < textArray.length; i++){
    textArray[i].toggleAttribute("hidden");
  }
 
}

//Button should be disabled until the logs, if any, are displayed and there's text in the textarea

document.querySelector('#button').disabled = true;
document.querySelector('textarea').addEventListener("input", disableButton);

function disableButton() {
  const txtArea = document.getElementById('text');
  const button = document.getElementById('button');
  const unOrder = document.getElementById('unOrdered');
  console.log("txtfunc");
  if (txtArea.value === ""  && !unOrder.hasChildNodes()){
    console.log('textArea');
    button.disabled = true;
    //button.reset();
    console.log("disable");
    //document.getElementById("form1").reset();
  } else { // display is not empty button is active and 
    console.log('false');
    button.disabled = false;
    //Button should AJAX PUT the textarea value to json-server which will store it
    let txt = document.querySelector('textarea').value;
    if(txt.endsWith('.')){
      const date = new Date();
      let currentDate = date.toISOString().substring(0,10);

      const dbJson = {
        courseId: document.querySelector("option").value,
        uvuId: document.querySelector("input").value,
        date: currentDate,
        text: document.querySelector("textarea").value
      }
      const requestOptions = {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body:JSON.stringify(dbJson)
      }
      
      fetch('../logs', requestOptions)
      .then(response => response.json())
      .then(data => console.log("testing", data))
      .catch(err => console.log("log error", err))
    }
  } 
}

document.getElementById("DM").addEventListener("button", DarkMode);




function DarkMode() {   
  let element = document.body;
  let img = document.getElementById("Logo");
  img.src = "./UVUMonogramWhite-0007.png";
  element.classList.toggle("dark-mode");

  var theme;

  if( element.classList.contains("dark-mode")){
    console.log("Dark mode");
    theme ="Dark";
    document.getElementById("DM").innerHTML ="Light Mode";
  }else{
    console.log("Light mode");
    theme = "Light"
    document.getElementById("DM").innerHTML ="Dark Mode";
  }
  //save to localStorage
  localStorage.setItem("PageTheme", JSON.stringify(theme));
  //ensure you convert to JSON like 
}

let GetTheme = JSON.parse(localStorage.getItem("PageTheme"));
console.log(GetTheme)

if(GetTheme === "Dark") {
  document.body.classList ="dark-mode";
  document.getElementById('DM').innerHTML = "Light mode"
}