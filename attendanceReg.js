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




function displayEmployees()
{
    var all =[];
    var select =document.getElementById("getNames");
console.log("running")
    db.collection("users").get().then((AllRecords)=>{

      AllRecords.forEach((currentRecord)=>{


        all.push(currentRecord.data().Name +" "+currentRecord.data().Surname +" ("+currentRecord.data().SA_ID_Num+")")
      
      })
      console.log(all)
     
      for (let x= 0; x < all.length; x++) {
        
        select.options[select.options.length] =new Option(all[x], all[x]);
      }
     

    })



}
function selectAllMyAtts()
{
    var getWeek ="";
    var date = new Date;
    var month= ["January","February","March","April","May","June","July",
    "August","September","October","November","December"];
    const weekday = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
    let day = weekday[date.getDay()]; //get weeday monday

    let getD = date.getDate(); //gate date 18
    
    var SetMonth =month[date.getMonth()];// get month july

    var timeYear =date.getFullYear();// get year 2022

    var actualMy= SetMonth+timeYear;
     
    if( getD < 8)
    {
        getWeek = "week1";
    }
    if( getD >= 8 && getD < 15)
    {
        getWeek = "week2";
    }
    if( getD >= 15 && getD < 22)
    {
        getWeek = "week3";
    }
    if( getD >= 22 && getD < 32)
    {
        getWeek = "week4";
    }
    
   var getEmpName=document.getElementById("getNames").value



                    db.collection("attendance").where("NameOfEmployee", '==',getEmpName).where("Month","==",SetMonth+timeYear).where("Week","==",document.getElementById("getWk").value).get().then((have)=>{
                        const list =document.getElementById("tbody_att")
                        var div ="";
                        var html ="";

                        have.forEach((currentRecord)=>{
                       
                            div=`
                            <tr>
                          <td>${currentRecord.data().NameOfEmployee}</td> 
                          <td>${currentRecord.data().RegEmail}</td>
                          <td>${currentRecord.data().Clock_In_Date}</td>
                          <td>${currentRecord.data().WeekDay}</td>
                          <td>${currentRecord.data().Clock_In_Time}</td>                          
                          <td>${currentRecord.data().Clock_Out_Time}</td>
                          <td>${currentRecord.data().Attend}</td>                         
                           <td>${currentRecord.data().LateComingReason}</td>
                           <td>${currentRecord.data().ClockOutStatus}</td>                          
                           <td>${currentRecord.data().EarlyLeavingReason}</td>
                           </tr>
                      `     
                      
                            html += div
                         
                              list.innerHTML =html
                        
                      
		            })
                

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
function generatePDF() {
      

    const element = document.getElementById('tableh');
        
    html2pdf().from(element).save().then(()=>{
        window.location.reload();
    })

      
}
displayEmployees()