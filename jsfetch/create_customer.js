
let route = "https://api.ote.co.ke/api/v1/";

document.getElementById("submit").addEventListener("click",
function fetchprice(event){
    event.preventDefault()
    let url = route+"customers"
    let name = document.forms["create"]["name"].value;
    let phone = document.forms["create"]["phone"].value;
    let email = document.forms["create"]["email"].value;
    let address = document.forms["create"]["address"].value;
    let status = document.forms["create"]["status"].value
    let type = document.forms["create"]["type"].value
    let data = {name:name, phone:phone, email:email, address:address, status:status, type:type};
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
            window.location.replace("create_customer.html")
        }
    })
    .catch(error => console.log('error:', error));

})


