
fetch("https://api.ote.co.ke/api/v1/orders") 
.then((response) =>{
    response.json().then((items)=>{
        
        items = items["items"]
        console.log(items)
        let output = `
     
            <div class="card-body">
                <table id="bootstrap-data-table-export" class="table table-striped table-bordered">
                    <thead>
                        <tr>
                            <th>Origin</th>
                            <th>Origin Contact</th>
                            <th>Destination</th>
                            <th>Destination Contact</th>
                            <th>Notes</th>
                            <td>Status</td>
                            <th>Actions</th>
                        </tr>
                    </thead>   
        `;
        Object.keys(items).forEach(function(item){

            output +=`
            <tr>
           
                <td>${items[item]["origin"]}</td>
                <td>${items[item]["origin_contact"]}</td>
                <td>${items[item]["destination"]}</td>
                <td>${items[item]["destination_contact"]}</td>
                <td>${items[item]["notes"]}</td>
                <td>${items[item]["status"]}</td
                <td><button  class="btn btn-primary" onclick="edit(${items[item]["id"]})">Edit</button></td>
                <td><button  class="btn btn-danger" onclick="deletecustomer(${items[item]["id"]})">Delete</button></td>`
        })
            document.getElementById("orders").innerHTML = output + '</table>';
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


