
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
                    <button  class="btn btn-primary" onclick="edit(${roles[role]["id"]})">Edit</button>
                </td>
                <td onclick="deleteroles(${roles[role].name})" class="btn btn-danger">Delete</td>`
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
        .then((res)=> res.json())
        .then((res)=> {
            window.location.replace("roles.html")
        })
        
    }
}


