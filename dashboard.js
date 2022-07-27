function addTasks()
{
    var task = document.getElementById("taskbrief").value;
    var ttime = document.getElementById("tasktime").value;
    var date = document.getElementById("tdate").innerHTML;
     
            if(task.length ==0) 
            {
              swal("Missing Task Description","Describe your task","error")
              
              return false;
            }
         
          else
          {
            auth.onAuthStateChanged((user)=>{
             if(user){
        db.collection("users").doc(user.uid).get().then((info)=>{

            console.log(user.uid)

              db.collection("tasks").add({
                  taskname: task,
                  tasktime: ttime,
                  taskID : user.uid,
                  taskDate : date,
                  
              }).then(()=>{
                  alert("Task has been succesfully added")
                  
                });
        
            })
            
        
    }
})
    }

}

function displayMyTasks()
{
      
    auth.onAuthStateChanged((user)=>{

        if(user){
          db.collection("users").doc(user.uid).get().then((info)=>{

                    db.collection("tasks").where("taskID", '==',user.uid).onSnapshot((have)=>{
                        const list =document.getElementById("tasks")
                        var div ="";
                        var html ="";

                        have.forEach((currentRecord)=>{

                            div=`
                            <li><span">${currentRecord.data().taskname}</span><br><strong><span>${currentRecord.data().tasktime}</span></strong></li>
       
                      `     
                      
                            html += div
                         
                              list.innerHTML =html
                        
		            })
                

	            })
            })
        }
       
    })
  
}

function deleteOldTasks()
{
  
    var days = new Array("Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday");
    var months = new Array("January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December");

    var today = new Date();
    var date = today.getDate()+' '+months[today.getMonth()]+' '+today.getFullYear();

    db.collection('tasks').onSnapshot((AllRecords)=>{
        console.log("ruuni")
          AllRecords.forEach(
              (CurrentRecord)=>
              {
                if(!(CurrentRecord.data().taskDate==date))
                {
    
                    db.collection("tasks").doc(CurrentRecord.id).delete()
                    console.log(CurrentRecord.id)
                    console.log("ruuni")
          
            }
              }
    
          );
         
    
      });
     
}
