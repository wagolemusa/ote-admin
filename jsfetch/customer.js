
fetch("https://api.ote.co.ke/api/v1/customers") 
.then((response) =>{
    response.json().then((items)=>{
        
        items = items["items"]
        console.log(items)
        let output = `
            <div class="card-header">
                <strong class="card-title">All Customers</strong>
            </div>
            <div class="card-body">
                <table id="bootstrap-data-table-export" class="table table-striped table-bordered">
                    <thead>
                        <tr>
                            <th>Names</th>
                            <th>Phone</th>
                            <th>Email</th>
                            <th>Address</th>
                            <th>Status</th>
                            <th>Actions</th>
                        </tr>
                    </thead>   
        `;
        Object.keys(items).forEach(function(item){

            output +=`
            <tr>
           
                <td>${items[item]["name"]}</td>
                <td>${items[item]["phone"]}</td>
                <td>${items[item]["email"]}</td>
                <td>${items[item]["address"]}</td>
                <td>${items[item]["status"]}</td>
                <td><button  class="btn btn-primary" onclick="edit(${items[item]["id"]})">Edit</button></td>
                <td><button  class="btn btn-danger" onclick="deletecustomer(${items[item]["id"]})">Delete</button></td>`
        })
            document.getElementById("users").innerHTML = output + '</table>';
        })
        .catch(err => console.log(err));
})


// Delete Customers
function deletecustomer(id){
    console.log(id)
    let url = "https://api.ote.co.ke/api/v1/customers/"+id;
    if  (window.confirm("Are you sure, you want to delete?")){
        fetch(url, {
            method:"DELETE",
            headers:{"Content-Type":"application/json"}
        })
        .then((res)=> res.json())
        .then((res)=> {
            window.location.replace("customers.html")
        })
        
    }
}



