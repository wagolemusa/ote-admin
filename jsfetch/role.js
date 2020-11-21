
fetch("https://api.ote.co.ke/api/v1/roles") 
.then((response) =>{
    response.json().then((items)=>{
        
        roles = items["items"]
        console.log(roles)
        let output = `

            <div class="card-body">
                <table id="bootstrap-data-table-export" class="table table-striped table-bordered">
                    <thead>
                        <tr>
                            <th>Role ID</th>
                            <th>Name</th>
                            <th>Edit</th>
                            <th>Delete</th>
                        </tr>
                    </thead>   
        `;
        Object.keys(roles).forEach(function(role){

            output +=`
            <tr>
                <td>${roles[role].id}</td>
                <td>${roles[role].name}</td>
                <td>
                    <button  class="btn btn-primary" data-toggle="modal" data-target="#smallmodal" onclick="edit('${roles[role]["id"]}','${roles[role]["name"]}')">Edit</button>
                </td>
                <td onclick="deleteroles('${roles[role]["id"]}')" class="btn btn-danger">Delete</td>`
        })
            document.getElementById("roles").innerHTML = output + '</table>';
        })
        .catch(err => console.log(err));
})


// Delete Roles
function deleteroles(id){
    console.log(id)
    let url = "https://api.ote.co.ke/api/v1/roles/"+id;
    if  (window.confirm("Are you sure, you want to delete?")){
        fetch(url, {
            method:"DELETE",
            headers:{"Content-Type":"application/json"}
        })
        .then((res)=> {
            window.location.replace("roles.html")
        })
        
    }
}


function edit(id, name){
    document.getElementById("names").innerText = "";
    document.getElementById("name").innerText = "";
    document.getElementById("editor").innerHTML =`

    <form name="modify" id="id">
    <textarea type='date' maxlength="20" rows ="2" cols = "28" name="name">${name}</textarea><br><br>    
      <button type='submit' class="btn btn-primary" id="submit">Submit Changes</button>
      <button type="button" class="btn btn-secondary" data-dismiss="modal">Cancel</button>
    </form>
    <br/>

    `;

    document.getElementById("submit").addEventListener("click",
    function modify(event){
        event.preventDefault();
        let url = "https://api.ote.co.ke/api/v1/roles/"+id
            let name = document.forms["modify"]["name"].value;
            let data = {name:name}
            console.log(data)
            fetch(`${url}`, {
                method:"PUT", 
                headers: {
                    "Content-Type": "application/json"
                },
                body:JSON.stringify(data) 
            })
            // .then(response =>response.json())
            // .then(data =>{
            //  console.log(data)
            let message = "Sucessful saved Press F5"
            document.getElementById("change").innerText = message
            // window.location.reload().delay(5000);
            // window.location.replace("roles.html")

            // })
            // .catch(error=>{
                // console.error('Error:', error);
            // })
    });
}

