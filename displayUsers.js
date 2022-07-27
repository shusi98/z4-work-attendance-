
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
function selectAllData()
{
    
	  
    auth.onAuthStateChanged((user)=>{

        if(user){
    db.collection("users").where("Status", "==","Employer").get().then((AllRecords)=>{
        const list =document.getElementById("table-info")
        var div ="";
        var html ="";
        console.log("running")
        AllRecords.forEach((currentRecord)=>{

            div =`
			<tr>
			<td>${currentRecord.data().Name}</td>
			<td>${currentRecord.data().Surname}</td>
            <td>${currentRecord.data().SA_ID_Num}</td>
			<td>${currentRecord.data().Role}</td>
            <td>${currentRecord.data().Gender}</td>
            <td>${currentRecord.data().Email}</td>
            <td>${currentRecord.data().Phone_number}</td>
            <td> <button class="btn btn-primary"  data-toggle="modal" data-target="#myModal" onclick="viewEachProduct('${currentRecord.id}')">Edit</button>
			&nbsp;<button class="btn btn-primary" onclick="removeItem('${currentRecord.id}')">Delete</button></td>

		</tr>
       
            `
            html += div
            list.innerHTML =html
        })

    })
}
	})

}
var viewedItem="";
function viewEachProduct(id){

db.collection("users").doc(id).get().then((info)=>{
	// get values from database

    document.getElementById("phone").value = info.data().Phone_number;
	document.getElementById("role").value = info.data().Role;
	
	viewedItem =id
})

}
function updateProduct(){
	//take entered values and update
	var newCellphoneN =  document.getElementById("phone").value; 
	var newRole =document.getElementById("role").value ;
	
		console.log("clicked")
		db.collection("users").doc(viewedItem).update({
			Phone_number:newCellphoneN,
			Role:newRole

		}, merge=true).then(()=>{
			swal("Success!", "Item updated successfully!", "success");
			setTimeout(()=>{
				window.location.reload();
			},2000)
		})

}
function removeItem(id)
{
	
  
		swal({
			title: "Are you sure?",
			text: "Once deleted,the user wont be able to login",
			icon: "warning",
			buttons: true,
			dangerMode: true,
		  })
		  .then((willDelete) => {

			if (willDelete) {
				willDelete=db.collection("users").doc(id).delete();
			  swal("Poof! Item has been deleted!", {
				icon: "success",
			  });
			} else {
			  swal("User is safe!");
			}
		  });


}
function signout()
{
    auth.signOut().then(()=>{
        window.location.href="../index.html";
        
    }).catch(function(error){
        swal("User Login Error", "Could not sign not", "error");
    })

}

selectAllData()
displayAdminInfo()