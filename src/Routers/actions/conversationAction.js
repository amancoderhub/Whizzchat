/**
 * @copyright 2025 codewithaman
 * @license Apache-2.0
 */

/**
 * Custom modules
 */
import { databases } from "../../lib/appwrite";
import { getAiResponse } from "../../api/googleAi";
import generateID from "../../utils/generateID";
import { param } from "motion/react-client";
import { use } from "motion/react-m";
import Conversation from "../../pages/Conversation";

/**
 * Handle the conversation action, processing the user's prompt and storing the AI respose in the database.
 * 
 * @async
 * @param {object} context-The context object containing the request and params .
 * @param {object} request-The context object containing form data from the client.
 * @param {object} param - The route parameters.
 * @returns {Promise<null>} Return null after processing and stiring data.
 * 
 * @throw Will log an error message to the console if storing data fails.
 */

const conversationAction = async ({request, params})=>{
    const {conversationId} = params;
    const formData = await request.formData();
    const userPrompt = formData.get('user_prompt');

    let chatHistory = [];
    let aiResponse = '';

    try{
      const {chats} = await databases.getDocument(
        import.meta.env.VITE_APPWRITE_DATABASE_ID,
        'conversation',
        conversationId
      );
      chatHistory = chats.map(({user_prompt, ai_response }) =>{
        return { user_prompt, ai_response};
      });
    }catch(err){
         console.log(`Error getting chat: ${err.message}`);
    }

    try{
       aiResponse = await getAiResponse(userPrompt, chatHistory);
    }catch(err){
       console.log(`Error getting Gemini response
        : ${err.message}`);
    }

    try{
       await databases.createDocument(
        import.meta.env.VITE_APPWRITE_DATABASE_ID,
        'chats',
        generateID(),
        {
            user_prompt:userPrompt,
            ai_response:aiResponse,
            conversation :conversationId ,
        }
       )
    }catch(err){
        console.log(`Error_storing chats : ${err.message}`);
    }

    return null;
}

export default conversationAction;