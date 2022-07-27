function filterBookings()
{
  db.collection('appointment').onSnapshot((AllRecords)=>{
      const list = document.getElementById("tbody_book")
      var div =""
      var html =""
      AllRecords.forEach(
          (CurrentRecord)=>
          {
            if(CurrentRecord.data().Status==document.getElementById("selectField").value)
            {
            

              div =`
              <tr>
              <td class="name">${CurrentRecord.data().Name}</td>
<td >${CurrentRecord.data().Email_address}</td>
<td >${CurrentRecord.data().Phone_number}</td>
<td >${CurrentRecord.data().Appointment_Date}</td>
<td >${CurrentRecord.data().Hairdresser_name}</td>



<td ><i class="fa fa-envelope-o" title="View Message" data-toggle="modal" data-target="#myModal" onclick="viewEachMessage('${CurrentRecord.id}')" style="cursor: pointer;"></i></td>
<td > <div style="position:relative ;display: flex;height: 30px;width: 30px; cursor:pointer;">
<img src="images/icon/confirm.png" title="Confirm" alt="" onclick="loadCurClientandConfirm('${CurrentRecord.id}')">
<img src="images/icon/reschedule.png" title="Reschedule" data-toggle="modal" data-target="#schedulemodal" onclick="viewEachSchedule('${CurrentRecord.id}')" alt="" style="position: relative; left: 100%;">
</div></td>
<td>${CurrentRecord.data().Status}</td>
<td class="ref">${CurrentRecord.data().Reference}</td>



</tr>
              `
             html+=div
             list.innerHTML=html
          }
          
        }
      );

  });
}
function SelectAllBookings()
{
    var count=1;
  db.collection('appointment').onSnapshot((AllRecords)=>{
      const list = document.getElementById("tbody_book")
      var div =""
      var html =""
      AllRecords.forEach(
          (CurrentRecord)=>
          {
            
            

              div =`
              <tr>
              <td>${count++}</td>
              <td class="name">${CurrentRecord.data().Name}</td>
<td >${CurrentRecord.data().Email_address}</td>
<td >${CurrentRecord.data().Phone_number}</td>
<td >${CurrentRecord.data().Appointment_Date}</td>
<td >${CurrentRecord.data().Hairdresser_name}</td>



<td ><i class="fa fa-envelope-o" title="View Message" data-toggle="modal" data-target="#myModal" onclick="viewEachMessage('${CurrentRecord.id}')" style="cursor: pointer;"></i></td>
<td > <div style="position:relative ;display: flex;height: 30px;width: 30px; cursor:pointer;">
<img src="images/icon/confirm.png" title="Confirm" alt="" onclick="loadCurClientandConfirm('${CurrentRecord.id}')">
<img src="images/icon/reschedule.png" title="Reschedule" data-toggle="modal" data-target="#schedulemodal" onclick="viewEachSchedule('${CurrentRecord.id}')" alt="" style="position: relative; left: 100%;">
</div></td>
<td>${CurrentRecord.data().Status}</td>
<td class="ref">${CurrentRecord.data().Reference}</td>



</tr>
              `
             html+=div
             list.innerHTML=html
          }
          
        
      );
                var table = document.getElementById("tbody_book");
                var totalRowCount = table.rows.length; 

            document.getElementById("numBook").innerText=totalRowCount;

  });
}


//function to viewe message from client

var viewItem =""
function viewEachMessage(id)
{
    db.collection("appointment").doc(id).get().then((info)=>{
        //get values from database

        document.getElementById("message").innerHTML =info.data().Message;
        document.getElementById("name").innerHTML =info.data().Name;
        

        viewItem=id;
    })
}

function viewEachSchedule(id)
{
    db.collection("appointment").doc(id).get().then((info)=>{
        //get values from database
        document.getElementById("names").innerHTML =info.data().Name;

        
        

        viewItem=id;
    })

}
function changeDate()
{
    var newDate =  document.getElementById("getnewdate").value;

    
    db.collection("appointment").doc(viewItem).update({
        Appointment_Date: newDate,
        Status:"Scheduled"
        
    }, merge=true).then(()=>{
        swal("Updated","A new date has been set for the booking","success")
        setTimeout(()=>{
          window.location.reload();
        },2000)
        
    })

}



// function to load data from db
var viewItem =""

//function to load client status and confirm/update their status
function loadCurClientandConfirm(id)
{
    var status = "Confirmed";
    var curStatus;

    db.collection("appointment").doc(id).get().then((info)=>{
        //get values from database
         curStatus = info.data().Status;
        viewItem=id;
    })


    swal({
        
        
        title: "Are you sure?",
        text: "By Clicking OK, You are confirming the booking!",
        icon: "warning",
        buttons: true,
        dangerMode: true,
      })
      .then((willConfirm) => {

        
        if (willConfirm  )
        {
            db.collection("appointment").doc(viewItem).update({
        
                Status: status,
            }, merge=true).then(()=>{
                swal("Confirmed","Booking Confirmed","success")
                setTimeout(()=>{
                  window.location.reload();
                },2000)
                
           
          });
        } else {
          swal("Booking not Confirmed");
        }
      });



 

}


   



function searchTable() {
    var input, filter, found, table, tr, td, i, j;
    input = document.getElementById("myref");
    filter = input.value.toUpperCase();
    table = document.getElementById("tbody_book");
    tr = table.getElementsByTagName("tr");
    for (i = 0; i < tr.length; i++) {
        td = tr[i].getElementsByTagName("td");
        for (j = 0; j < td.length; j++) {
            if (td[j].innerHTML.toUpperCase().indexOf(filter) > -1) {
                found = true;
            }
        }
        if (found) {
            tr[i].style.display = "";
            found = false;
        } else {
            tr[i].style.display = "none";
        }
    }
}


function filterDdown() {
  
  var input, filter, found, table, tr, td, i, j;
  input = document.getElementById("selectField");
  filter = input.value.toUpperCase();
  table = document.getElementById("tbody_book");
  tr = table.getElementsByTagName("tr");
  for (i = 0; i < tr.length; i++) {
      td = tr[i].getElementsByTagName("td");
      for (j = 0; j < td.length; j++) {
          if (td[j].innerHTML.toUpperCase().indexOf(filter) > -1) {
              found = true;
          }
      }
      if (found) {
          tr[i].style.display = "";
          found = false;
      } else {
          tr[i].style.display = "none";
      }
  }
  }

  function filterBydate()
  {
    var input, filter, found, table, tr, td, i, j;
  input = document.getElementById("dateflt");
  filter = input.value.toUpperCase();
  table = document.getElementById("tbody_book");
  tr = table.getElementsByTagName("tr");
  for (i = 0; i < tr.length; i++) {
      td = tr[i].getElementsByTagName("td");
      for (j = 0; j < td.length; j++) {
          if (td[j].innerHTML.toUpperCase().indexOf(filter) > -1) {
              found = true;
          }
      }
      if (found) {
          tr[i].style.display = "";
          found = false;
      } else {
          tr[i].style.display = "none";
      }
  }

  }

  function PrintTable() {
    var printWindow = window.open('', '', 'height=500,width=800');
    printWindow.document.write('<html><head><title>Table Contents</title>');

    //Print the Table CSS.
    var table_style = document.getElementById("tbody_book").innerHTML;
    printWindow.document.write('<style type = "text/css">');
    printWindow.document.write(table_style);
    printWindow.document.write('</style>');
    printWindow.document.write('</head>');

    //Print the DIV contents i.e. the HTML Table.
    printWindow.document.write('<body>');
    var divContents = document.getElementById("tbody_book").innerHTML;
    printWindow.document.write(divContents);
    printWindow.document.write('</body>');

    printWindow.document.write('</html>');
    printWindow.document.close();
    printWindow.print();

}

