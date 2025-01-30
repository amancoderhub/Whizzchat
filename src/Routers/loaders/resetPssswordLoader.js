/**
 * @copyright 2025 codewithaman
 * @license Apache-2.0
 */
/**
 * Node Modules 
 */
import { redirect } from "react-router-dom";

import { account } from "../../lib/appwrite";

const resetPasswordLoader = async ({request}) =>{
    const url = new URL(request.url);
  try{
 //Attempt to retrieve the user's account information 
  await account.get();
   //if account reteerivel is successful, redirect the usser to the home page ('/')
    return redirect('/');
  }catch(err){
    console.log(`Error getting usersession: ${err.message}
    `);
  }
  if(!url.searchParams.get('userId')&& !url.searchParams.get('secret')){
    return redirect('/reset-link');
  }

  return null;
};

export default resetPasswordLoader;