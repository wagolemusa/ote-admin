
fetch("https://api.ote.co.ke/api/v1/users",{
}) 
.then((response) =>{
    response.json().then((items)=>{
        
        data = items["items"]
        console.log(data)
        let output = `
            <div class="card-header">
                <strong class="card-title">Data Table</strong>
            </div>
            <div class="card-body">
                <table id="bootstrap-data-table-export" class="table table-striped table-bordered">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Phone</th>
                            <th>Role</th>
                            <th>Status</th>
                        </tr>
                    </thead>   
        `;
        Object.keys(data).forEach(function(items){

            output +=`
            <tr>
                <td>${data[items]["name"]}</td>
                <td>${data[items]["email"]}</td>
                <td>${data[items]["phone"]}</td>  
                <td>${data[items]["account_status"]}</td>
                <td><button  class="btn btn-primary" data-toggle="modal" data-target="#smallmodal" onclick="edit('${data[items]["id"]}','${data[items]["name"]}', '${data[items]["email"]}','${data[items]["phone"]}','${data[items]["account_status"]}','${data[items]["password"]}')">Edit</button></td>
                <td><button  class="btn btn-danger" onclick="deletecustomer('${data[items]["id"]}')">Delete</button></td>
            </tr>
            </tbody></div>`;
        })
            document.getElementById("users").innerHTML = output + '</table>';
        })
        .catch(err => console.log(err));
    })
    
// Delete Customers
function deletecustomer(id){
    console.log(id)
    let url = "https://api.ote.co.ke/api/v1/users/"+id;
    if  (window.confirm("Are you sure, you want to delete?")){
        fetch(url, {
            method:"DELETE",
            headers:{"Content-Type":"application/json"}
        })
     
        .then((res)=> {
            window.location.replace("users.html")
        })
        
    }
}



function edit(id, name, phone, email, account_status){
    document.getElementById("names").innerText = "";
    document.getElementById("name").innerText = "";
    document.getElementById("phones").innerText = "";
    document.getElementById("phone").innerText = "";
    document.getElementById("emails").innerText = "";
    document.getElementById("email").innerText = "";
    document.getElementById("account").innerText = "";
    document.getElementById("account_status").innerText = "";
 

    document.getElementById("editor").innerHTML =`

    <form name="modify" id="id">
    <textarea type='date' maxlength="20" rows ="2" cols = "28" name="name">${name}</textarea><br><br>
    <textarea type='date' maxlength="20" rows ="2" cols = "28" name="phone">${phone}</textarea><br><br>
    <textarea maxlength="20" rows ="2" cols = "28" name="email">${email}</textarea><br><br>
    
    <textarea maxlength="20" rows ="2" cols = "28" name="account_status">${account_status}</textarea><br><br>
      <button type='submit' class="btn btn-primary" id="submit">Submit Changes</button>
      <button type="button" class="btn btn-secondary" data-dismiss="modal">Cancel</button>
    </form>
    <br/>

    `;

    document.getElementById("submit").addEventListener("click",
    function modifyEntry(event){
        event.preventDefault();
        let url = "https://api.ote.co.ke/api/v1/users/"+id

            let name = document.forms["modify"]["name"].value;
            let phone = document.forms["modify"]["phone"].value;
            let email = document.forms["modify"]["email"].value;
            let account_status = document.forms["modify"]["account_status"].value;
           
            
            let data = {name:name, phone:phone, email:email, account_status:account_status}
            console.log(data)
            fetch(`${url}`, {
                method:"PUT", headers: {"Contant-Type":"application/json", "Accept":"application/json"},
                body:JSON.stringify(data)
               
            })
            .then(response =>response.json())
            .then(data =>{
                console.log(data)
            document.getElementById("change").innerText = data["message"]
            // window.location.replace("customers.html")

            })
            .catch(error=>{
                console.error('Error:', error);
            })
    });
}

