var form = document.querySelector("form");
var input = document.querySelector("input");
var photoWrapper = document.querySelector("ul");
var likedList = document.querySelector(".liked-list")

form.addEventListener("submit", function (evt) {
    photoWrapper.innerHTML = "";
    evt.preventDefault();
    var searchInput = input.value;
    fetch(`https://api.unsplash.com/search/photos?query=${searchInput}&per_page=50&page=4&client_id=aAwi-CRFm7ke1-0p2zb8dhXZ0nnUhMQutigCWWmBcMw`).then(function (res) {

        if (res.status === 200) {
            return res.json();
        }
    }).then(function (data) {
        console.log(data.results)
         var showTodos = function(todoArray){
             console.log(todoArray)
            todoArray.results.forEach(function (imgObj) {
          
                var todoItem = document.createElement("li");
                todoItem.className = "item"
                var todoImg = document.createElement("img");
            
            
                todoImg.src = imgObj.urls.small;
                todoImg.className = "img "
                todoImg.width =  300;
                todoImg.height = 400
     
                var deletePhotoBtn = document.createElement("button");
                deletePhotoBtn.className = "btn btn-outline-danger  delete-btn";
                deletePhotoBtn.textContent = "Delete"
               deletePhotoBtn.dataset.id = imgObj.id
                // var downloadPhoto = document.createElement("button");
                // downloadPhoto.textContent = "Download";
                // downloadPhoto.className = "btn btn-outline-primary like-btn";
              
               
               
             
     
     
               todoItem.addEventListener("click", function(evt){
                   todoItem.innerHTML = ""
                




                   if(evt.target.matches(".delete-btn")){
                     var clickedId = evt.target.dataset.id - 0;
                     var clickedItemIndex = data.results.findIndex(function (todo){
                         return todo.id === clickedId;
                     })
                   }
                   data.results.splice(clickedItemIndex, 1);
                   

                   
                })
     
              
                todoItem.append(todoImg)
                
                todoItem.append(deletePhotoBtn);
            //    todoItem.append(downloadPhoto)
                photoWrapper.append(todoItem)
                
            });
        } 
      
        showTodos(data)
    })

})