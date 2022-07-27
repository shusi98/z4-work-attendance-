function userlogin()
{
    var username = document.getElementById("email").value;
    var password = document.getElementById("password").value;

    auth.signInWithEmailAndPassword(username,password).then(()=>{
        auth.onAuthStateChanged((user)=>{
            if(user){
                db.collection("users").doc(user.uid).get().then((info)=>{
                    if(info.data().Status=="Employer")
                    {
                        window.location.href="employee/dashboard.html";
                    }
                    else
                    {
                        swal("error!", "you are an admin", "error");
                    }
                    
                })
                
               
            }
            
           
        
        })
        
        
    })
    .catch(function(error){
        swal("User Login Error", "Wrong Login Credentials", "error");
    })

            
}

function signup()
{
  //uploading pp
  const storage = firebase.storage().ref("users/")
  const file = document.getElementById("profilepic").files[0];
  const name = new Date() + "-" + file.name;
  const metadata = {contentType: file.type};
  const task = storage.child(name).put(file,metadata);

  task.on("state_changed", function progress(snapshot){
      var percentage = (snapshot.bytesTransferred /snapshot.totalBytes)* 100;
    ;
  })
  task.then((snapshot)=>snapshot.ref.getDownloadURL()).then((URL)=>{
      console.log(URL)

    var username = document.getElementById("email2").value;
    var password = document.getElementById("pword").value;
    var idNum = document.getElementById("idnumber").value;
    var name = document.getElementById("uname").value;
    var lastname = document.getElementById("sname").value;
    var gender = document.getElementById("gender").value;
    var cnumber = document.getElementById("phone").value;
    var role = document.getElementById("role").value;
    
    var status = "Employer";
  

    var validName = /^[A-ZA-z]+$/;
    var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    var phoneno =  /^0(6|7|8){1}[0-9]{1}[0-9]{7}$/;
    var ex = /^(((\d{2}((0[13578]|1[02])(0[1-9]|[12]\d|3[01])|(0[13456789]|1[012])(0[1-9]|[12]\d|30)|02(0[1-9]|1\d|2[0-8])))|([02468][048]|[13579][26])0229))(( |-)(\d{4})( |-)(\d{3})|(\d{7}))/;
    

    let genderVer = idNum.charAt(6);


    
    
    
    if(name!=""&&lastname!=""&&username!=""&&password!=""&&idNum!=""&&gender!=""&&cnumber!="")
    {
      
        if(parseInt(genderVer)<5 && document.getElementById("gender").value=="Male")
        {
            swal("Input Error", "Choose correct gender or recheck your ID", "error");
          
          
        return false;
        }
        if(parseInt(genderVer)>=5 && document.getElementById("gender").value=="Female")
        {
            swal("Input Error", "Choose correct gender or correct your ID number", "error");
          
          
        return false;
        }
     
        if (!validName.test(name))
        {
          swal("Input Error", "Invalid name, ensure the are white spaces and no digits", "error");
          
          
        return false;
  
        }
        if (!cnumber.match(phoneno)) 
        {
          swal("Input Error", "Invalid phone number", "error"); 
          return false;
        }
        if (!validName.test(lastname))
        {
          swal("Input Error", "Invalid Surname, ensure the are white spaces and no digits", "error");
          
          
        return false;
  
        }
        if (!idNum.match(ex)) 
        {
          swal("Input Error", "Invalid SA ID number", "error"); 
          return false;
        }
      
        if (!username.match(mailformat)) 
        {
          swal("Input Error", "Invalid email address", "error"); 
          return false;
        }
        if(password.length<6)
        {
          swal("Input Error", "6 characters or more are required for password", "error"); 
          return false;
        }
      

      else
      {
        {
           
            auth.createUserWithEmailAndPassword(username,password).then(()=>{
                db.collection("users").doc(auth.currentUser.uid).set({
                    Email: username, 
                    Name: name,
                    Surname : lastname,
                    Status: status,
                    Phone_number: cnumber,
                    Gender: gender,
                    SA_ID_Num : idNum,
                    Role : role,
                    Prof_pic : URL,
                    
        
        
        
                },merge=true).then(()=>{
                    swal("Success!", "Welcome To The Z8 Attendance system, Your account is now active", "success")
                    setTimeout(()=>{
                        window.location.reload();
                      },2000)
        
                })
                
            });
        }
        
        
        
        return true;

        
      }
   
}
else
{

 swal("Missing Input","All Fields Are Required", "warning");
 return false;

 
}

})

}


function recoverPw()
{
  var email = document.getElementById("uemail").value;

  auth.sendPasswordResetEmail(email).then(()=>{
      alert("Password Link has been sent succesfully to your email")
  }).catch(function(error){
      alert(error)
  })


}
