/**
 * @copyright 2025 codewithaman
 * @license Apache-2.0
 */
/**
 * Node Modules 
 */
import { redirect } from "react-router-dom";

import { account } from "../../lib/appwrite";

const registerLoader = async () =>{
  try{
 //Attempt to retrieve the user's account information 
  await account.get();
  }catch(err){
    console.log(`Error getting usersession: ${err.message}
    `);
    return null;
  }
  //if account reteerivel is successful, redirect the usser to the home page ('/')
  return redirect('/');
};

export default registerLoader;