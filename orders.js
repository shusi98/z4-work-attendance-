function SelectAllData()
{
  db.collection('orders').get().then((AllRecords)=>{
      const list = document.getElementById("tbody_orders")
      var div =""
      var html =""
     // var line1 = '<div style="position:relative ;display: flex;height: 30px;width: 30px; cursor:pointer;pointer-events:none;"> <img id="changeStatus" src="images/icon/update.png" alt="" data-toggle="modal" data-target="#myModal" onclick="viewEachOrder("${CurrentRecord.id}")"></div>'
     var line1 = '<div style="position:relative ;display: flex;height: 30px;width: 30px; cursor:pointer;"> <img  src="images/icon/update.png" alt="" onclick="errorMsg()"></div>'
      var line2 = '<div style="position:relative ;display: flex;height: 30px;width: 30px; cursor:pointer;"> <img  src="images/icon/update.png" alt="" data-toggle="modal" data-target="#myModal" onclick="viewEachOrder("${CurrentRecord.id}")"></div>'
      var rightline = line1;
      var count=1;
      AllRecords.forEach(
          (CurrentRecord)=>
          { 
              if(CurrentRecord.data().Status=="Cancelled")
              {
                  rightline = line1

              }
              if(CurrentRecord.data().Status!="Cancelled")
              {
                  rightline = line2

              }
              
           

              div =`
                    <tr>
                    <td>${count++}</td>
                    <td>${CurrentRecord.data().AmountPaid}</td>
                    <td>${CurrentRecord.data().Products}</td>
                    <td>${CurrentRecord.data().Name}</td>

                    <td>${CurrentRecord.data().Phone_number}</td>                   
                    <td>${rightline}</td>
                    <td id="currtatus">${CurrentRecord.data().Status}</td>
                    <td>${CurrentRecord.data().PaymentDate}</td>
                    <td>${CurrentRecord.data().Reference}</td>

                    </tr>


              `
              
              
             html+=div
             list.innerHTML=html

             

             
             
          }
          
          

      );
      var table = document.getElementById("tbody_orders");
      var totalRowCount = table.rows.length; 

            document.getElementById("numOrders").innerText=totalRowCount;

  });
  
}

function errorMsg()
{
    swal("Error","No Action Permitted, This Order Has Been Cancelled","error")
}

var viewItem =""
function viewEachOrder(id)
{
    db.collection("orders").doc(id).get().then((info)=>{
        //get values from database

        document.getElementById("name").value =info.data().Name;
        document.getElementById("phone").value =info.data().Phone_number;
        

        viewItem=id;
    })
}

function updateOrder()
{
    var newName =  document.getElementById("name").value;
   
    var newPhone = document.getElementById("phone").value;
    var status = document.getElementById("orderStatus").value
    
    

    
    db.collection("orders").doc(viewItem).update({
        Name: newName,
        Phone_number: newPhone,
        Status: status,
    }, merge=true).then(()=>{
        swal("Updated","Order details updated","success")
        setTimeout(()=>{
          window.location.reload();
        },2000)
        
    })
}

function yesnoCheck() {
  if (document.getElementById('yesCheck').checked) {
      document.getElementById('ifYes').style.visibility = 'visible';
  } else {
      document.getElementById('ifYes').style.visibility = 'hidden';
  }
}

/*

function updateStatus(id)
{
    var status =  document.getElementById("action").value;
    
    
    db.collection("orders").doc(id).get().then((info)=>{
      //get values from database
      


     db.collection("orders").doc(id).update({
        Status: status,
        
    }, merge=true).then(()=>{
        swal("Updated","Order details updated","success")
        setTimeout(()=>{
          window.location.reload();
        },2000)
        
    })
      

      
  })

    
    
}*/

