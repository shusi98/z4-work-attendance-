function SelectAllData()
{
  db.collection('users').onSnapshot((AllRecords)=>{
      const list = document.getElementById("tbody_users")
      var div =""
      var html =""
      AllRecords.forEach(
          (CurrentRecord)=>
          {
            if(CurrentRecord.data().Status=="Customer")
          {

              div =`
              <tr>
<td>${CurrentRecord.data().Name}</td>
<td>${CurrentRecord.data().Status}</td>
<td>${CurrentRecord.data().Gender}</td>
<td>${CurrentRecord.data().Email}</td>
<td>${CurrentRecord.data().Phone_number}</td>
<td><button class="btnUpdate" data-toggle="modal" data-target="#myModal" onclick="viewEachUser('${CurrentRecord.id}')">Update</button></td>

<td><a href="#" class="btn" onclick="deleteUser('${CurrentRecord.id}')">Delete</a></td>

</tr>
              `
             html+=div
             list.innerHTML=html
          }
        }

      );

  });
}

var viewItem =""
function viewEachUser(id)
{
    db.collection("users").doc(id).get().then((info)=>{
        //get values from database

        document.getElementById("name").value =info.data().Name;
        document.getElementById("email").value =info.data().Email;
        document.getElementById("phone").value =info.data().Phone_number;

        viewItem=id;
    })
}

function updateUser1()
{
    var newName =  document.getElementById("name").value;
    var newEmail = document.getElementById("email").value;
    var newPhone = document.getElementById("phone").value;
    
    

    
    db.collection("users").doc(viewItem).update({
        Name: newName,
        Email: newEmail,
        Phone_number: newPhone,
    }, merge=true).then(()=>{
        swal("Updated","User details updated","success")
        setTimeout(()=>{
          window.location.reload();
        },2000)
        
    })
}

function deleteUser(id)
{
    swal({
        title: "Are you sure?",
        text: "Once deleted, user will not be able to log in!",
        icon: "warning",
        buttons: true,
        dangerMode: true,
      })
      .then((willDelete) => {

        
        if (willDelete) {
            willDelete=db.collection("users").doc(id).delete()
          swal("User has been deleted!", {
            icon: "success",
          });
        } else {
          swal("User not deleted");
        }
      });

      

    

  
}