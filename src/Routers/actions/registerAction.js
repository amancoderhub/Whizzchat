
/**
 * @copyright 2025 codewithaman
 * @license Apache-2.0
 */

import {redirect} from 'react-router-dom';
/**
 * Custom modules
 */
import {account} from "../../lib/appwrite";
import generateID from "../../utils/generateID";
/**
 * handles user registration
 */
const registerAction = async({request}) =>{
    //retrieve the from data form the incoming request
  const formData = await request.formData();
  
  try{
    //create a new user account using the provided email,password and name
    await account.create(
        generateID(),//Generate unique Id for the user 
        formData.get('email'),//Retrieve email from form 
        formData.get('password'),//Retrieve password from from
        formData.get('name'),//retrieve name from the from
    );
  } catch(err){
  //return an error object if account creation  fails 
   return {
    message: err.message,//error message from the caught error
   };
  }
//After succesfully account create,login the user and redirect to homepage 
  try{
    //create a session for the new user with the provided email and password 
   await account.createEmailPasswordSession(
    formData.get('email'),
    formData.get('password'),
   );
  } catch(err){
    //Logs any error encountered during session creation and redirect to login page 
    console.log( `Error creating email session: ${err.message}`);
    return redirect('/login');
  }
  //Redirect the user to the home page upon succesful registration and login of Whizzchat application

  return redirect('/');
};
export default registerAction;