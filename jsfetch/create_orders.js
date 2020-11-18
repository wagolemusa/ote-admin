let route = "https://api.ote.co.ke/api/v1/";

document.getElementById("submit").addEventListener("click",
function fetchprice(event){
    event.preventDefault()
    let url = route+"orders"
    let customer_id = document.forms["create"]["customer_id"].value;
    let rider_id = document.forms["create"]["rider_id"].value;
    let origin = document.forms["create"]["origin"].value;
    let origin_contact = document.forms["create"]["origin_contact"].value;
    let destination = document.forms["create"]["destination"].value;
    let destination_contact = document.forms["create"]["destination_contact"].value;
    let notes = document.forms["create"]["notes"].value
    let status = document.forms["create"]["status"].value
    let data = {customer_id:customer_id, rider_id:rider_id, origin:origin, origin_contact:origin_contact, destination:destination, destination_contact:destination_contact, notes:notes, status:status};
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
            window.location.replace("create_orders.html")
        }
    })
    .catch(error => console.log('error:', error));

})


