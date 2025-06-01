const orderForm = document.getElementById("order-form");
const tableContent = document.getElementById("table-content")
const clearbtn = document.getElementById("clear-button");

clearbtn.addEventListener("click",()=>{
    clearLocalStorage();
})

let orders = [];

function Order(name,price,image){
    this.Name = name;
    this.Price = price;
    this.Image = image;
}

orderForm.addEventListener("submit",()=>{
    //
    const mealName = document.getElementById("meal-Name").value;
    const mealPrice = document.getElementById("meal-Price").value;
    const mealImage = document.getElementById("meal-Image").value;
    let order = new Order(mealName,mealPrice,mealImage);
    CreateOrder(order.Name,order.Price,order.Image);
    orders.push(order)
    setLocalStorage()
})

function CreateOrder(name,price,image){
    
    const listItem = document.createElement("tr")
    listItem.className = "order-item";

    listItem.innerHTML = 
    `
    <td>${name}</td>
    <td>${price}$</td>
    <td><img src="${image}"></td>
    `;
    tableContent.append(listItem)
    
}

function setLocalStorage() {
  localStorage.setItem("table-content", JSON.stringify(orders));
}

function getLocalStorage(){
  const orderlist = localStorage.getItem("table-content")

  if(orderlist){
  orders = JSON.parse(orderlist);
  orders.forEach(order => {
    CreateOrder(order.Name,order.Price,order.Image)
  });
  
  }
}

function clearLocalStorage(){
    localStorage.removeItem("table-content")
    orders=[];
    tableContent.innerHTML =`
                <tr>
                    <th>Meal Name</th>
                    <th>Meal Price</th>
                    <th>Meal Image</th>
                </tr>
    `;
}

getLocalStorage();