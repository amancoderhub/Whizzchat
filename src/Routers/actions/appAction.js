/**
 * @copyright 2025 codewithaman
 * @license Apache-2.0
 */
/**
 * Node Modules
 */
import { redirect } from "react-router-dom";
/**
 * Custom modules
 */
import { account, databases } from "../../lib/appwrite";
import { getConversationTitle, getAiResponse } from "../../api/googleAi";
import generateID from "../../utils/generateID";

/**
 * Handles the user prompt action, creating a conversation and storing both 
 * the user's prompt and the AI-generated response.
 *
 * @async
 * @function userPromptAction
 * @param {FormData} formData - The form data containing the user's prompt.
 * @returns {Promise<void>} Redirects the user to the newly created conversation page.
 */
const userPromptAction = async (formData) => {
  const userPrompt = formData.get("user_prompt");

  // Get current user info
  const user = await account.get();

  // Get a conversation title based on user prompt
  const conversationTitle = await getConversationTitle(userPrompt);

  let conversation = null;

  try {
    // Create a new conversation document in the Appwrite database
    conversation = await databases.createDocument(
      import.meta.env.VITE_APPWRITE_DATABASE_ID,
      "conversation",
      generateID(),
      {
        title: conversationTitle,
        user_id: user.$id,
      },
    );
  } catch (err) {
    console.error(`Error creating conversation: ${err.message}`);
    return null;
  }

  // Generate an AI response based on the user's prompt
  const aiResponse = await getAiResponse(userPrompt);

  try {
    // Create a new chat document in the 'chats' collection
    await databases.createDocument(
      import.meta.env.VITE_APPWRITE_DATABASE_ID,
      "chats",
      generateID(),
      {
        user_prompt: userPrompt,
        ai_response: aiResponse,
        conversation: conversation.$id,
      }
    );
  } catch (err) {
    console.log(`Error creating chat: ${err.message}`);
  }

  return redirect(`/${conversation.$id}`);
};

/**
 * Deletes a conversation document form the database and returns the conversation title.
 * 
 * @async
 * @function conversationAction
 * @param {formData} formData -The form data containing the conversation details.
 * @returns {Promise<object>} Returns an object containing the conversation title after deletion.
 * @throws Will throw an error if the deletionprocess fails.
 */

const conversationAction = async(formData)=>{
const conversationId = formData.get('conversation_id');
const conversationTitle = formData.get('conversation_title');

try{
  await databases.deleteDocument(
  import.meta.env.VITE_APPWRITE_DATABASE_ID,
  'conversation',
   conversationId
  );

  return{ conversationTitle}
}catch(err){
   console.log(`Error in deleting conversation: ${err.message}`)
}
}

/**
 * Handles incoming requests based on the 'request_type' from form data.
 *
 * @async
 * @function appAction
 * @param {object} request - The incoming request object containing the form data.
 * @returns {Promise<*>} Returns the result of the action based on the 'request_type'.
 */
const appAction = async ({ request }) => {
  const formData = await request.formData();
  const requestType = formData.get("request_type");

  if (requestType === "user_prompt") {
    return await userPromptAction(formData);
  }

  if(requestType==='delete_conversation'){
    return await conversationAction(formData);
  }
};


export default appAction;
