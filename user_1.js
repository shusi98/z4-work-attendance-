
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

function checkIfSignedToday()
{
    var dates = [];
    auth.onAuthStateChanged((user)=>{

        if(user){
        db.collection("users").doc(user.uid).get().then((info)=>{
            var usId = user.uid;
            console.log(usId)
    db.collection('attendance').onSnapshot((AllRecords)=>{
   
        AllRecords.forEach(
            (CurrentRecord)=>
            {
               
    
               if( CurrentRecord.data().IDattendance== usId)
            dates.push(CurrentRecord.data().Clock_In_Date)
  
          })
          
        console.log(dates)
        var isFound=false;
        var count=0;
        for (var x=0;x<dates.length;x++)
        {
            console.log(dates[x])
        if(document.getElementById("tdate").innerHTML==dates[x])
        {
            count++;
            
            
        }
       
    }
    if(count>0)
    isFound=true

    console.log(count)
     
    console.log(isFound)
        
        if(isFound==true)
        {
            
            return false;
        }
        else
        {
            clockIn() 
        }
        })
        
    }
    
         
);
}
        
        })  
    

          
}

function clockIn()
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

    console.log(getWeek)

    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition);
      } else { 
        x.innerHTML = "Geolocation is not supported by this browser.";
      }
    
    
    function showPosition(position) {
      var newlat = position.coords.latitude ;
     var newlong= position.coords.longitude;

     

    var clockintime = document.getElementById("ttime").innerHTML;
    var clockindate = document.getElementById("tdate").innerHTML;

    var today = new Date();
   
    var registeredName ;
    var userName;
    var regEmail;

    var lat = "-25.7478676";
    var long = "28.2292712";
    

    console.log(newlat)
    console.log(newlong)

    console.log(lat)
    console.log(long)
   
    
    if(newlat!=lat || newlong!=long)
    {
       // alert("You are not permitted to sign in from this location")
       // return false
    }
    if(today.getHours()>7)
    {
        alert("You are late, sign the register for late comers")
    }
    
    else
    {

    
    auth.onAuthStateChanged((user)=>{

        if(user){
        db.collection("users").doc(user.uid).get().then((info)=>{

            userName = firebase.auth().currentUser.email;
            registeredName = info.data().Name +" "+ info.data().Surname +" ("+ info.data().SA_ID_Num+")";
            regEmail = info.data().Email;
         db.collection("attendance").add({

            User_Name:userName,
            NameOfEmployee: registeredName,
            RegEmail: regEmail,
            Month:actualMy,
            DayDate:getD,
            WeekDay:day,
            Week:getWeek,
            Clock_In_Time : clockintime,
            Clock_In_Date : clockindate,
            Clock_Out_Time : "N/A",
            Attend : "Late Sign In",
            ClockOutStatus:"N/A",
            IDattendance:user.uid,
            LateComingReason : reason,
            EarlyLeavingReason : "N/A"
         }).then(()=>{
                alert("You have succesfully clocked in for today");          
                
            });
        
        })
        

}
})
}

}
}

function checkIfSignedToday2()
{
    var dates = [];
    auth.onAuthStateChanged((user)=>{

        if(user){
        db.collection("users").doc(user.uid).get().then((info)=>{
            var usId = user.uid;
            console.log(usId)
    db.collection('attendance').onSnapshot((AllRecords)=>{
   
        AllRecords.forEach(
            (CurrentRecord)=>
            {
               
    
               if( CurrentRecord.data().IDattendance== usId)
            dates.push(CurrentRecord.data().Clock_In_Date)
  
          })
          
        console.log(dates)
        var isFound=false;
        var count=0;
        for (var x=0;x<dates.length;x++)
        {
            console.log(dates[x])
        if(document.getElementById("tdate").innerHTML==dates[x])
        {
            count++;
            
            
        }
       
    }
    if(count>0)
    isFound=true

    console.log(count)
     
    console.log(isFound)
        
        if(isFound==true)
        {
            
            return false;
        }
        else
        {
            late() 
        }
        })
        
    }
    
         
);
}
        
        })  
    

          
}


function late()
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
    
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition);
      }
    
    
    function showPosition(position) {
      var newlat = position.coords.latitude ;
     var newlong= position.coords.longitude;

     

    var clockintime = document.getElementById("ttime").innerHTML;
    var clockindate = document.getElementById("tdate").innerHTML;
    var reason = document.getElementById("latereason").value;
 
    var today = new Date();
   
    var registeredName ;
    var userName;
    var regEmail;

    var lat = "-25.7478676";
    var long = "28.2292712";
    

    console.log(newlat)
    console.log(newlong)

    console.log(lat)
    console.log(long)
   
    
    if(newlat!=lat || newlong!=long)
    {
       // alert("You are not permitted to sign in from this location")
       // return false
    }
    if(today.getHours()<8)
    {
        alert("You are early, you cannot sign the register for late comers")
    }
    
    else
    {

    
    auth.onAuthStateChanged((user)=>{

        if(user){
        db.collection("users").doc(user.uid).get().then((info)=>{

            userName = firebase.auth().currentUser.email;
            registeredName = info.data().Name +" "+ info.data().Surname +" ("+ info.data().SA_ID_Num+")";
            regEmail = info.data().Email;
            db.collection("attendance").add({

                User_Name:userName,
                NameOfEmployee: registeredName,
                RegEmail: regEmail,
                Month:actualMy,
                DayDate:getD,
                WeekDay:day,
                Week:getWeek,
                Clock_In_Time : clockintime,
                Clock_In_Date : clockindate,
                Clock_Out_Time : "N/A",
                Attend : "Late Sign In",
                ClockOutStatus:"N/A",
                IDattendance:user.uid,
                LateComingReason : reason,
                EarlyLeavingReason : "N/A"
              
    
             }).then(()=>{
                alert("You have succesfully clocked in for today");          
                
            });
        
        })
        

}
})
}

}
}

function checkIfSignedToday3()
{
    var dates = [];
    auth.onAuthStateChanged((user)=>{

        if(user){
        db.collection("users").doc(user.uid).get().then((info)=>{
            var usId = user.uid;
            console.log(usId)
    db.collection('attendance').onSnapshot((AllRecords)=>{
   
        AllRecords.forEach(
            (CurrentRecord)=>
            {
               
    
               if( CurrentRecord.data().IDattendance== usId)
            dates.push(CurrentRecord.data().Clock_In_Date)
  
          })
          
        console.log(dates)
        var isFound=false;
        var count=0;
        for (var x=0;x<dates.length;x++)
        {
            console.log(dates[x])
        if(document.getElementById("tdate").innerHTML==dates[x])
        {
            count++;
            
            
        }
       
    }
    if(count>0)
    isFound=true

    console.log(count)
     
    console.log(isFound)
        
        if(isFound==true)
        {
            
            return false;
        }
        else
        {
            absent() 
        }
        })
        
    }
    
         
);
}
        
        })  
    

          
}


function absent()
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
    var dateT = new Date;
    var month= ["January","February","March","April","May","June","July",
    "August","September","October","November","December"];

    var SetMonth =month[dateT.getMonth()];

    var timeYear =dateT.getFullYear();
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition);
      }
    
    
    function showPosition(position) {
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
      var newlat = position.coords.latitude ;
     var newlong= position.coords.longitude;

 
    var today = new Date();

    var days = new Array("Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday");
    var months = new Array("January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December");

    
    var date = today.getDate()+'-'+months[today.getMonth()]+'-'+today.getFullYear();
    var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
   
    var registeredName ;
    var userName;
    var regEmail;

    if(today.getHours()>16)
    {

    
    auth.onAuthStateChanged((user)=>{

        if(user){
        db.collection("users").doc(user.uid).get().then((info)=>{

            userName = firebase.auth().currentUser.email;
            registeredName = info.data().Name +" "+ info.data().Surname +" ("+ info.data().SA_ID_Num+")";
            regEmail = info.data().Email;

            db.collection("attendance").add({
                User_Name:userName,
                NameOfEmployee: registeredName,
                RegEmail: regEmail,
                Month:actualMy,
                DayDate:getD,
                WeekDay:day,
                Week:getWeek,
                Clock_In_Time : clockintime,
                Clock_In_Date : clockindate,
                Clock_Out_Time : "N/A",
                Attend : "Late Sign In",
                ClockOutStatus:"N/A",
                IDattendance:user.uid,
                LateComingReason : reason,
                EarlyLeavingReason : "N/A"
        })
        
        })
        

}
})
}

}
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
    
    var input = document.getElementById("getWk").value

console.log(document.getElementById("getWk").value)
    auth.onAuthStateChanged((user)=>{

        if(user){
          db.collection("users").doc(user.uid).get().then((info)=>{

                    db.collection("attendance").where("IDattendance", '==',user.uid).where("Month","==",SetMonth+timeYear).where("Week","==",document.getElementById("getWk").value).get().then((have)=>{
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
            })
        }
       
    })
   
}

function clockout()
{
    var usrid;
    var clockouttime = document.getElementById("ttime").innerHTML;
    var today = new Date();


    if(today.getHours()<16)
    {
        alert("You are not eligible to use the early clock out button at this time")
        return false
    }
    else
    {
    auth.onAuthStateChanged((user)=>{
        if(user){
            db.collection("users").doc(user.uid).get().then((info)=>{
        
                usrid=user.uid;
                console.log(usrid)
        
        //get the exact doc id of the taxi where the number plate on the select box is equal to the one on db 
         db.collection("attendance").where("IDattendance", "==", usrid ,"&&", "Clock_In_Date","==",document.getElementById("tdate").innerHTML)
 .get()
 .then(function(querySnapshot) {
     querySnapshot.forEach(function(doc) {
    
         docuid =doc.id;
 
         db.collection("attendance").doc(user.uid).update({
            Clock_Out_Time: clockouttime,
            ClockOutStatus: "On Time",
       
         }).then(()=>{
            swal("Success","Succesfully Clocked Out ","success")
         })
     });
 })
})
        }  
  })
}
}

function clockout2()
{
    var clockindate = document.getElementById("tdate").innerHTML;
    var usrid;
    var clockouttime = document.getElementById("ttime3").innerHTML;
    var reason = document.getElementById("earlyclock").value;
    var today = new Date();
    console.log(today.getDate())

    if(today.getHours()>15)
    {
        alert("You are not eligible to use the early clock out button at this time")
        return false
    }

    else
    {

   

    
    auth.onAuthStateChanged((user)=>{
        if(user){
            db.collection("users").doc(user.uid).get().then((info)=>{
        
                usrid=user.uid;
                console.log(usrid)
        
        //get the exact doc id of the taxi where the number plate on the select box is equal to the one on db 
         db.collection("attendance").where("IDattendance", "==", usrid ).where("Clock_In_Date","==",document.getElementById("tdate").innerHTML)
 .get()
 .then(function(querySnapshot) {
     querySnapshot.forEach(function(doc) {
    
         docuid =doc.id;
 
         db.collection("attendance").doc(docuid).update({
            Clock_Out_Time: clockouttime,
            EarlyLeavingReason : reason,
            ClockOutStatus:"Early Clockout"
       
         }).then(()=>{
            swal("Success","Succesfully Clocked Out ","success")
         })
     });
 })
})
        }  
  })
}
}


function signout()
{
    auth.signOut().then(()=>{
        window.location.href="../index.html";
        
    }).catch(function(error){
        swal("User Login Error", "Could not sign not", "error");
    })

}

