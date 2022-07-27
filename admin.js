function addAdmin()
{
    
    

  //uploading pp
   const storage = firebase.storage().ref("users/")
    const file = document.getElementById("prof_img").files[0];
    const name = new Date() + "-" + file.name;
    const metadata = {contentType: file.type};
    const task = storage.child(name).put(file,metadata);

    task.on("state_changed", function progress(snapshot){
        var percentage = (snapshot.bytesTransferred /snapshot.totalBytes)* 100;
        document.getElementById("progStatus").value=percentage;
        document.getElementById("upProgress").innerHTML="Upload " + percentage+"%";
    })
    task.then((snapshot)=>snapshot.ref.getDownloadURL()).then((URL)=>{
        console.log(URL)

        var username = document.getElementById("email").value;
    var password = document.getElementById("pw").value;
    var password2 = document.getElementById("pw2").value;
    var name = document.getElementById("name").value;
    var lastname = document.getElementById("sname").value;
    var gender = document.getElementById("gender").value;
    var cnumber = document.getElementById("phone").value;
    
    var status = "Admin";



        auth.createUserWithEmailAndPassword(username,password).then(()=>{
        db.collection("users").doc(auth.currentUser.uid).set({
            Email: username, 
            Name: name,
            Surname : lastname,
            Status: status,
            Phone_number: cnumber,
            Gender: gender,
            Profilepic: URL



        },merge=true).then(()=>{
            swal("Success!", "New Admin has been added", "success")
            setTimeout(()=>{
                window.location.reload();
              },2000)

        })
        
    });

    })

    
    
    
}



function selectAdmins()
{
  db.collection('users').onSnapshot((AllRecords)=>{
      
      
      const list = document.getElementById("tbody_admins")
      var div =""
      var html =""
      
      AllRecords.forEach(
          (CurrentRecord)=>
          {
              if(CurrentRecord.data().Status=="Admin")
          {

              div =`
              <tr>
<td>${CurrentRecord.data().Name}</td>
<td>${CurrentRecord.data().Gender}</td>
<td>${CurrentRecord.data().Email}</td>
<td>${CurrentRecord.data().Phone_number}</td>


<td><a href="#" class="btn" onclick="deleteAdmin('${CurrentRecord.id}')">Delete</a></td>

</tr>
              `
             html+=div
             list.innerHTML=html
          }
        }

      );

  });
}






function adminsignout()
{
    auth.signOut().then(()=>{
        window.location.href="../login.html";
        
    }).catch(function(error){
        swal("User Login Error", "Could not sign not", "error");
    })

}
function deleteAdmin(id)
{
    swal({
        title: "Are you sure?",
        text: "Once deleted, admin will not be able to log in!",
        icon: "warning",
        buttons: true,
        dangerMode: true,
      })
      .then((willDelete) => {

        
        if (willDelete) {
            willDelete=db.collection("admins").doc(id).delete()
          swal("Admin has been deleted!", {
            icon: "success",
          });
        } else {
          swal("Admin not deleted");
        }
      });

      

    

  
}

function displayAdminInfo()
{
    auth.onAuthStateChanged((user)=>{
        if(user){
            db.collection("users").doc(user.uid).get().then((info)=>{
        
                
              document.querySelector(".nameadmin").innerHTML=info.data().Name;

              document.querySelector("#nameAdminP").innerHTML=info.data().Name;
              document.querySelector("#surnameAdminP").innerHTML=info.data().Surname;
              document.querySelector("#emailAdminP").innerHTML=info.data().Email;
              document.querySelector("#phoneAdminP").innerHTML=info.data().Phone_number;

            

               

        })
    }
    })
   
}

function fetchAdminInfo()
{
    auth.onAuthStateChanged((user)=>{
        if(user){
            db.collection("users").doc(user.uid).get().then((info)=>{
        
                
              document.querySelector(".uname").innerHTML=info.data().Name;

                document.getElementById("adminNameUd").value=info.data().Name;
                document.getElementById("adminSnameUd").value=info.data().Surname;
                
                
                
                document.getElementById("adminEmailUd").value=info.data().Email;
                document.getElementById("adminPhoneUd").value=info.data().Phone_number;

                

               document.getElementById("prof_pic").src=info.data().Profilepic;

        })
    }
    })
   
}
function updateAdetails()
{
    var newName =  document.getElementById("adminNameUd").value;
    var newSname =  document.getElementById("adminSnameUd").value;
    
    var newEmail = document.getElementById("adminEmailUd").value;
    var newPhone = document.getElementById("adminPhoneUd").value;
    
    

    
    db.collection("users").doc(auth.currentUser.uid).update({
        Name: newName,
        Surname: newSname,
        Email: newEmail,
        Phone_number: newPhone,
    }, merge=true).then(()=>{
        swal("Updated","User details updated","success")
        setTimeout(()=>{
          window.location.reload();
        },2000)
        
    })
}

function resetPw()
{
    var email = document.getElementById("uemail").value;

    auth.sendPasswordResetEmail(email).then(()=>{
        alert("Password Link has been sent succesfully to your email")
    }).catch(function(error){
        alert(error)
    })
   
}
function signout()
{
    auth.signOut().then(()=>{
        window.location.href="../index.html";
        
    }).catch(function(error){
        swal("User Login Error", "Could not sign not", "error");
    })

}
