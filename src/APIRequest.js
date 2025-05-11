const apiRequest=async (url='',optionsObj=null,errMsg=null)=>{
      try{
         const response=await fetch(url,optionsObj);
         if (!response.ok){
            throw Error("Please reload the application");
         }


      }
      catch(err){
          errMsg=err.Message;
      }
      finally{
        return errMsg;
      }
      


}
export default apiRequest;