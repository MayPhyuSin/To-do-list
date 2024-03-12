const inputBox = document.getElementById("input-box");
const listContainer = document.getElementById("todo-container");

let data= getData();
data.map(item=>createItem(item.text,item.done));

function getData(){
    return JSON.parse(localStorage.getItem("data"))||[];
}
function saveData(text){
    let data= getData();
    data.push({text,done:false});
    localStorage.setItem("data", JSON.stringify(data));
}
function removeData(text){
    let data=getData();
    let result=data.filter(item=>item.text!=text);
    localStorage.setItem("data",JSON.stringify(result));
}
function checkData(text){
    let data=getData();
    let result=data.map(item=>{
        if(item.text===text)item.done=true;
        return item;
    });
    localStorage.setItem("data",JSON.stringify(result));
}
function clearData(){
  let data=getData();
  let result=data.filter(item=>!item.done);
  localStorage.setItem("data",JSON.stringify(result));
}
function getCount(){
  let itemCount = document.querySelectorAll("#todo-container li").length;
  return JSON.parse(localStorage.getItem("itemCount")) || 0;
}
function updateCount(){
  let itemCount = getCount();
  let badge = document.querySelector(".badge");
  badge.textContent = getCount();
}
function setCount(){
  let itemCount = document.querySelectorAll("#todo-container li").length;
  localStorage.setItem("itemCount", JSON.stringify(itemCount));
  updateCount();
}


function addTask(){
  let text = document.querySelector("input").value;
  if(text == '')return false;
  createItem(text, false);
  updateCount();
  saveData(text);
  setCount();

  document.querySelector("input").value = "";
  document.querySelector("input").focus();
}

document.querySelector("input").onkeydown = function(e){
  if(e.key == "Enter"){
    document.querySelector("button").onclick();
  }
}

function createItem(text, done){
   let li = document.createElement("li");
   li.classList.add("list-group-item");

   let check = document.createElement("input");
   check.classList.add("form-check-input", "me-2");
   check.type = "checkbox";
   check.checked = done;
   
   let label = document.createElement("label");
   label.classList.add("form-check-label");
   label.textContent = text;
  
   let del = document.createElement("a");
    del.setAttribute("href", "#");
    del.classList.add( "fa-solid", "fa-trash", "text-danger", "float-end", "mt-1");
    del.onclick = function(){
      li.remove();
      removeData(text);
      setCount();
    }


   li.appendChild(check);
   li.appendChild(label);
   li.appendChild(del);
   if (done) {
      li.classList.add("list-group-item", "opacity-50");
      document.querySelector("#done").appendChild(li);
      } else {
          listContainer.appendChild(li);
    }
 
   

   check.addEventListener("change", function(){
      if(check.checked){
        li.classList.add("list-group-item", "opacity-50");
        document.querySelector("#done").appendChild(li);
        checkData(text);
        setCount();
      }
      else{
          li.classList.remove("list-group-item", "opacity-50");
          li.classList.add("list-group-item")
          listContainer.appendChild(li);
          checkData(text);  
          setCount();
      }  
   })
  
   let clear = document.querySelector("#clear");
   clear.onclick = function(){
        document.querySelectorAll("#done li").forEach(list => list.remove());
        clearData();
        updateCount();
   }

}
updateCount();

    
  

  