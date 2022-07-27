function addProduct()
{
    
    

    //upload picture
    const storage = firebase.storage().ref("products/")
    const file = document.getElementById("prod_img").files[0];
    
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

        var p_name = document.getElementById("pname").value;
    var description = document.getElementById("description").value
    var category = document.getElementById("category").value;
    var stock = document.getElementById("stock").value;
    var price = document.getElementById("price").value;

    if(description!=""&&p_name!=""&&category!=""&&stock!=""&&price.substring(1, price.length)!="")
    {

    

            if(isNaN(price.substring(1, price.length)))
            {
              swal("Price error","Price needs to be in digits","error")
              return false;

            }
            
            if(description.length ==0) 
            {
              swal("Missing Description","Describe your product","error")
              
              return false;
            }
          
       

          else
          {
              db.collection("products").add({
                  Prod_name: p_name,
                  Prod_price: price,
                  Stock_Unit: stock,
                  Category: category,
                  Description: description,
                  Prod_pic: URL
              }).then(()=>{
                  swal("Product Added","Product has been succesfully added","success")
                  window.location.reload();
              })

            }
            return true;

    }
    

  
    else
    {
    
     swal("Missing Input","All Fields Are Required", "warning");
     return false;
    
     
    }
  
  })
  
  
}

//function to dispalyProducts from database
function displayProduct()
{
   

   db.collection("products").onSnapshot((info)=>{
        var html=""
        var div=""
        const list = document.getElementById("productcont");


        info.forEach(element => {
            
        div=`<div class="product col-lg-4 col-md-4 mb-5">
        <div class="prod_img">
          <img src="${element.data().Prod_pic}" alt="">
        </div>
          <h4> ${element.data().Prod_name}</h4>
          <span>${element.data().Description}</span>
         
          <p> ${element.data().Prod_price}</p>
          <button data-toggle="modal" data-target="#myModal" class="updateProd" onclick="viewEachProduct('${element.id}')">Update</button>
          <button class="deleteProd" onclick="deleteProduct('${element.id}')">Remove</button>
          
      </div>`
        html += div ;
        list.innerHTML=html;

      
           
        });
    })
}

var viewItem =""
function viewEachProduct(id)
{
    db.collection("products").doc(id).get().then((info)=>{
        //get values from database

        document.getElementById("prodnameUpdate").value =info.data().Prod_name;
        document.getElementById("descUpdate").value =info.data().Description;
        document.getElementById("priceUpdate").value =info.data().Prod_price;

        viewItem=id;
    })
}

function updateProduct()
{
    var newPname =  document.getElementById("prodnameUpdate").value;
    var newPdesc = document.getElementById("descUpdate").value;
    var newPprice = document.getElementById("priceUpdate").value;
    
    

    
    db.collection("products").doc(viewItem).update({
        Product_name: newPname,
        Description: newPdesc,
        Prod_price: newPprice,
    }, merge=true).then(()=>{
        swal("Updated","Product details updated","success")
        setTimeout(()=>{
          window.location.reload();
        },2000)
        
    })

}

function deleteProduct(id)
{
    swal({
        title: "Are you sure?",
        text: "Once deleted, customers cannot order it!",
        icon: "warning",
        buttons: true,
        dangerMode: true,
      })
      .then((willDelete) => {

        
        if (willDelete) {
            willDelete=db.collection("products").doc(id).delete()
          swal("Product has been deleted!", {
            icon: "success",
          });
        } else {
          swal("Product not deleted");
        }
      });



 

}