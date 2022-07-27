function displayAdminInfo()
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

function viewUserDetails()
{
    auth.onAuthStateChanged((user)=>{
        if(user){

            db.collection("users").doc(user.uid).get().then((info)=>{
                document.getElementById("nameAdminP").innerHTML=info.data().Name;
                document.getElementById("surnameAdminP").innerHTML=info.data().Surname;
                document.getElementById("emailAdminP").innerHTML=info.data().Email;
                document.getElementById("phoneAdminP").innerHTML=info.data().Phone_number
                
            })



        }
    
    })

}

function reviewDetais()
{

    auth.onAuthStateChanged((user)=>{
        if(user){
            db.collection("users").doc(user.uid).onSnapshot((info)=>{
                // get values from database
               document.getElementById("uNameUd").value = info.data().Name;
                document.getElementById("uSnameUd").value = info.data().Surname;
               document.getElementById("uEmailUd").value = info.data().Email;
                document.getElementById("uPhoneUd").value = info.data().Phone_number;
				
               
				
            })     
        } else{
            console.log("user logged out")
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

function signout()
{
    auth.signOut().then(()=>{
        window.location.href="../index.html";
        
    }).catch(function(error){
        swal("User Login Error", "Could not sign not", "error");
    })

}


viewUserDetails()
displayAdminInfo()