
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
            </tr>
            </tbody></div>`;
        })
            document.getElementById("users").innerHTML = output + '</table>';
        })
        .catch(err => console.log(err));
    })
    