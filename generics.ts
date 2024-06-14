{


      const addID=(obj:object)=>{
            const id=Math.floor(Math.random()*100);
            return {...obj,id}
      }
      
      let user=addID({
            name:"Tofail",
            age:27
      })


      console.log(user)
}