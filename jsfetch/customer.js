
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
                            <th>Type</th>
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
                <td>${items[item]["type"]}</td>
                <td><button  class="btn btn-primary" data-toggle="modal" data-target="#smallmodal" onclick="edit('${items[item]["id"]}','${items[item]["name"]}', '${items[item]["phone"]}','${items[item]["email"]}', '${items[item]["address"]}','${items[item]["status"]}','${items[item]["type"]}','${items[item]["push_notification_id"]}')">Edit</button></td>
                <td><button  class="btn btn-danger" onclick="deletecustomer('${items[item]["id"]}')">Delete</button></td>`
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
     
        .then((res)=> {
            window.location.replace("customers.html")
        })
        
    }
}



function edit(id, name, phone, email, address, status, type, push_notification_id){
    document.getElementById("names").innerText = "";
    document.getElementById("name").innerText = "";
    document.getElementById("phones").innerText = "";
    document.getElementById("phone").innerText = "";
    document.getElementById("emails").innerText = "";
    document.getElementById("email").innerText = "";
    document.getElementById("addresses").innerText = "";
    document.getElementById("address").innerText = "";
    document.getElementById("statuse").innerText = "";
    document.getElementById("status").innerText = "";
    document.getElementById("types").innerText = "";
    document.getElementById("type").innerText = "";
    document.getElementById("push").innerText = "";
    document.getElementById("push_notification_id").innerText = "";
    document.getElementById("editor").innerHTML =`

    <form name="modify" id="id">
    <textarea type='date' maxlength="20" rows ="2" cols = "28" name="name">${name}</textarea><br><br>
    <textarea type='date' maxlength="20" rows ="2" cols = "28" name="phone">${phone}</textarea><br><br>
    <textarea maxlength="20" rows ="2" cols = "28" name="email">${email}</textarea><br><br>
    <textarea maxlength="20" rows ="2" cols = "28" name="address">${address}</textarea><br><br>
    <textarea maxlength="20" rows ="2" cols = "28" name="status">${status}</textarea><br><br>
    <textarea maxlength="20" rows ="2" cols = "28" name="type">${type}</textarea><br><br>
    <textarea maxlength="20" rows ="2" cols = "28" name="push_notification_id">${push_notification_id}</textarea><br><br>
      <button type='submit' class="btn btn-primary" id="submit">Submit Changes</button>
      <button type="button" class="btn btn-secondary" data-dismiss="modal">Cancel</button>
    </form>
    <br/>

    `;

    document.getElementById("submit").addEventListener("click",
    function modifyEntry(event){
        event.preventDefault();
        let url = "https://api.ote.co.ke/api/v1/customers/"+id

            let name = document.forms["modify"]["name"].value;
            let phone = document.forms["modify"]["phone"].value;
            let email = document.forms["modify"]["email"].value;
            let address = document.forms["modify"]["address"].value;
            let status = document.forms["modify"]["status"].value;
            let type = document.forms["modify"]["type"].value;
            let push_notification_id = document.forms["modify"]["push_notification_id"].value;
            let data = {name:name, phone:phone, email:email, address:address, status:status, type:type, push_notification_id:push_notification_id}
            console.log(data)
            fetch(`${url}`, {
                method:"PUT",
                 headers: {
                     "Content-Type": "application/json",
                },
                body:JSON.stringify(data)
               
            })
            let message = "Sucessful saved Press F5"
            document.getElementById("change").innerText = message
    });
}

