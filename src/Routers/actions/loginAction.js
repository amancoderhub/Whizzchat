/**
 * @copyright 2025 codewithsadee
 * @license Apache-2.0
 */
/**
 * Node Modules 
 */
import { redirect } from "react-router-dom";

/**
 * Custom modules
 */
import { account } from "../../lib/appwrite";
/**
 * Handle the  login Action
 */

const loginAction = async ({request})=>{
//Retrieve the form data from incoming request 
const formData = await request.formData();

try{
    //Attemp to create a session using email and password from data 
    await account.createEmailPasswordSession(
        formData.get('email'),
        formData.get('password')
    );
//on successful login, redirect the user to the homepage
 return redirect('/');
} catch(err){
   //Return an error response with a error message 
   return {
    message :err.message,
   };
}
};

export default loginAction;