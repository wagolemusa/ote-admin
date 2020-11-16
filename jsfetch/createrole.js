let route = "https://api.ote.co.ke/api/v1/";

document.getElementById("submit").addEventListener("click",
function fetchprice(event){
    event.preventDefault()
    let url = route+"roles"
    let name = document.forms["create"]["name"].value;
    
    let data = {name:name};
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
            window.location.replace("roles.html")
        }
    })
    .catch(error => console.log('error:', error));

});