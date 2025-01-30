/**
 * @copyright 2024 codewithaman
 * @license apache-2.0
 */
/**
 * Custom module
 */
import { account } from "../lib/appwrite";

/**
 * Logs out the current user by deleting their session and navigates to the login page.
 * 
 * @async
 * @function logout
 * @param {Function} navigate -The navigation function to redirect the user after logout.
 * @returns {Promise<void>}-Returns a promise that resolve once the session is deleted and navigation occurs.
 * @throws{Error} If there is an issue deleting the user session, the error will be logged to the console.
 */
const logout = async (navigate)=>{
  try{
   await account.deleteSession('current');
   }catch(err){
      return console.log(`Error deleting user session:${err.message}`);
   }
   return navigate('/login');
};
export default logout;