import { dom } from './dom.js';

//destructuring of dom object
let { description, container,todoBtn } = dom;

//global declaration
let isEditing = false;
let editValue;
let updated;

//adding button
todoBtn.addEventListener('click', todoTask);


//todoTask function
'use strict';
let fetchData = JSON.parse(localStorage.getItem('tasks')) || [];
document.addEventListener('DOMContentLoaded', function (){
showData(fetchData)
})

function todoTask(e) {
  e.preventDefault();
  container.innerHTML = ""
  let taskValue = description.value.trim();
  ;
  if(isEditing){
    const editId = editValue.id
   fetchData = fetchData.map(data=> data.id===editId ? {...data, description: taskValue} : data )
   localStorage.setItem('tasks', JSON.stringify(fetchData))
   showData(fetchData)
   alert("updated successfully")
   todoBtn.textContent = 'ADD';
   isEditing = false

  } else {
    if(!taskValue){
      alert("Plese provide todo");
      return;
    } else {
      fetchData.push({description: taskValue, id: Date.now()});
        localStorage.setItem('tasks', JSON.stringify(fetchData))
        showData(fetchData);
        alert("added to successfully")
      
    }
  }


  

  description.value = ""
  
}


function showData  (items) {
    items.forEach((data)=> {
    const list = document.createElement('li');
    list.innerHTML += `
        <p>${data.description}</p>
        <div class="flex flex-col md:flex-row gap-1 md:gap-2">
        <button class=" text-[#16a34a]  rounded-full py-1 px-2 md:text-lg text-sm cursor-pointer hover:opacity-[0.8] " id="edit" data-edit=${data.id}><ion-icon name="create"></ion-icon></button>
        <button id="delete" class=" text-[#dc2626] rounded-full py-1 px-2 md:text-lg text-sm   cursor-pointer hover:opacity-[0.8]"  data-delete=${data.id} ><ion-icon name="trash-outline"></ion-icon></button>
        </div>
    `
    list.classList.add(
      "flex", "gap-2", "p-4", "border-b-2", "border-stone-400", "justify-between" );
    //edit function
    container.appendChild(list);
    const edit = document.querySelectorAll('#edit');
    edit.forEach(edit => {
      edit.addEventListener('click', (e)=>{
        const editId = +(edit.dataset.edit);
        editValue = fetchData.find(data=> data.id === editId);
        console.log(editValue)
        description.value = editValue.description
          isEditing = true;
          todoBtn.textContent = "UPDATE"
        

      })
        //delete
      const del = document.querySelectorAll("#delete");
      del.forEach(item=> {
        item.addEventListener('click', (e)=> {
          console.log(fetchData);
          const id = +(item.dataset.delete);
       fetchData = fetchData.filter(item=> item.id !== id)
        localStorage.setItem('tasks', JSON.stringify(fetchData));
        location.reload()
        })
      })

    })


  })
}

export { todoTask };