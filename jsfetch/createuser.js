
let route = "https://api.ote.co.ke/api/v1/";

document.getElementById("submit").addEventListener("click",
function fetchprice(event){
    event.preventDefault()
    let url = route+"users"
    let name = document.forms["create"]["name"].value;
    let email = document.forms["create"]["email"].value;
    let phone = document.forms["create"]["phone"].value;
    let role_id = document.forms["create"]["role_id"].value;
    let account_status = document.forms["create"]["account_status"].value
    let password = document.forms["create"]["password"].value   
    let data = {name:name, email:email, phone:phone, role_id:role_id, account_status:account_status, password:password};
    fetch(url, {method:"POST",
    headers:{
        "Content-Type":"application/json",
        "Accept":"application/json"
        
    },
    body:JSON.stringify(data)
    })
    .then ((response)=>response.json())
    .then((data)=> {
        if (data){
            document.getElementById("msg").innerText = data["message"]
            // window.location.replace("create_price.html")
        }
        else{
            window.location.replace("createuser.html")
        }
    })
    .catch(error => console.log('error:', error));

})


