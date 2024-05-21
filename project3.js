document.getElementById("restform").addEventListener("submit",function(e){
    e.preventDefault();

    const amount=document.getElementById("amount").value;
    const item = document.getElementById("item").value;
    const table = document.getElementById("table").value;

    const order = {amount, item, table}

    axios.post("https://crudcrud.com/api/75c3688c406944248cff48b67d7aff69/order",
        order
    )
    .then((res)=>{
        displayOrders(res.data);
    })
    .catch((error)=>{
        console.log(error);
    })

    document.getElementById("restform").reset();
});

function displayOrders(order){
    const tableElement = document.getElementById(`orders-table-${order.table.split(' ')[1]}`);

    const li = document.createElement("li");
    li.className="list-group-item"
    li.innerHTML=`
    <span>${order.amount}-${order.item} - ${order.table}</span>`

    const deleteButton = document.createElement("button");
    deleteButton.className="btn btn-danger btn-sm ms-2";
    deleteButton.textContent="Delete";
    deleteButton.addEventListener("click", function(e){
        e.preventDefault();
        axios.delete(`https://crudcrud.com/api/75c3688c406944248cff48b67d7aff69/order/${order._id}`)
        .then((res)=>{
            li.remove();
        })
        .catch((error)=>{
            console.log(error);
        });

    });
    li.appendChild(deleteButton);
    tableElement.appendChild(li);


}

