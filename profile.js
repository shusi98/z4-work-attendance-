function displayUsersInfo()
{
    auth.onAuthStateChanged((user)=>{
        if(user){
            db.collection("users").doc(user.uid).get().then((info)=>{
        
                
              //document.getElementById("driveruserame").value=firebase.auth().currentUser.email;
              

                document.getElementById("uEmailUd").value=info.data().Email;
                document.getElementById("uNameUd").value=info.data().Name;
                
                document.getElementById("uPhoneUd").value=info.data().Phone_number;
                
                document.getElementById("uSnameUd").value=info.data().Surname;
                
                document.querySelector(".uname").innerHTML = info.data().Name + " "+info.data().Surname; 
                document.getElementById("role").innerHTML=info.data().Role;
                document.getElementById("prof_pic").src=info.data().Prof_pic;

                document.getElementById("nameAdminP").innerHTML=info.data().Name;
                document.getElementById("surnameAdminP").innerHTML=info.data().Surname;
                document.getElementById("emailAdminP").innerHTML=info.data().Email;
                document.getElementById("phoneAdminP").innerHTML=info.data().Phone_number;



        })
    }
    })
   
    
}

function displayName()
{
    auth.onAuthStateChanged((user)=>{
        if(user){
            db.collection("users").doc(user.uid).get().then((info)=>{
      
                document.querySelector(".nameuser").innerHTML = info.data().Name; 
                document.querySelector("#nametask").innerHTML = info.data().Name;


        })
    }
    })
   
    
}

function updateInfo()
{

     var newPhone = document.getElementById("uPhoneUd").value;
     var newName = document.getElementById("uNameUd").value;
     var newSurname = document.getElementById("uSnameUd").value;
     var newEmail = document.getElementById("uEmailUd").value;

     auth.onAuthStateChanged((user)=>{
        if(user){

     db.collection("users").doc(user.uid).update({

        Name:newName,
        Surname:newSurname,
        Email:newEmail,
        Phone_number:newPhone

     }).then(()=>{

        swal("success","Details Successfully Updated","success");
        setTimeout(() => {
            window.location.reload();
        },3000); 

     })

    }

})
}
function displayInfo()
{
    auth.onAuthStateChanged((user)=>{
        if(user){
            db.collection("users").doc(user.uid).get().then((info)=>{
        
                
              document.querySelector(".nameadmin").innerHTML=info.data().Name;

               document.getElementById("pp").src=info.data().Profilepic;

        })
    }
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

displayName()
displayUsersInfo()
displayInfo()

