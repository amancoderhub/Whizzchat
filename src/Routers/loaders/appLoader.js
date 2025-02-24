/**
 * @copyright codewithaman
 * @license Apache-2.0
 */
/**
 * Node Modules
 */
import { redirect } from "react-router-dom";
import { Query } from "appwrite";
/**
 * Custom MOdules
 */
import { account,databases } from "../../lib/appwrite";

const appLoader = async () =>{
  const data = {};
  try{
  //Atempt to reterieve the user's account information 
  data.user = await account.get();
  }catch(err){
    console.log(`Error getting user session:${err.message}`);
    //Redirect to login page if account retrieval fails 
    return redirect('/login');
  }
  try{
     data.conversations =  await databases.listDocuments(
      import.meta.env.VITE_APPWRITE_DATABASE_ID,
      'conversation',
      [
        Query.select(['$id','title']),
        Query.orderDesc('$createdAt'),
        Query.equal('user_id',data.user.$id),
    ],
     );
      } catch(err){
    console.log(`Error getting conversation : ${err.message}`);
  }

  return data;
};

export default appLoader;