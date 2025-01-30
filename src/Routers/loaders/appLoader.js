/**
 * @copyright codewithaman
 * @license Apache-2.0
 */
/**
 * Node Modules
 */
import { redirect } from "react-router-dom";
/**
 * Custom MOdules
 */
import { account } from "../../lib/appwrite";

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
  return data;
};

export default appLoader;