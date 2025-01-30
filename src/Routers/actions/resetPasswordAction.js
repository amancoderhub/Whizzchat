/**
 * @copyright 2025 codewithaman
 * @license Apache-2.0
 */
/**
 * Node Module
 */
import { redirect } from "react-router-dom";
/**
 * Custom module 
 */
import { account } from "../../lib/appwrite";
const resetPasswordAction = async ({request})=>{
const formData = await request.formData();
const url = new URL (request.url);
try{
    await account.updateRecovery(
        url.searchParams.get('userId'),
        url.searchParams.get('secret'),
        formData.get('password')
    );
}catch(err){
    console.log(`Error updating pasword : ${err.message}`);

    return{
        message:err.message,
    };
}
};

export default resetPasswordAction;