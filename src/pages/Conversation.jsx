/**
 * @copyright 2025 codewithaman
 * @license Apache-2.0
 */ 
/** 
 * Node Mpdules
 */
import { motion } from "motion/react";
import { useLoaderData, useLocation } from "react-router-dom";
/**
 * Custom Hooks
 */
import { usePromptPreloader } from "../hooks/userPromptPreloader";

/**
 * Componenets 
 */
import PageTitle from "../components/PageTitle";
import UserPrompt from "../components/UserPrompt";
import AiResponse from "../components/AiResponse";
import PromptPreloader from "../components/PromptPreloader";

const Conversation = () => {
/**
 * Extract the conversation data (title and chats) from the loader data,
 * handling potential undefined values using optional chaining.
 */

    const { conversation : {title, chats},
} = useLoaderData()||{};
const {promptPreloaderValue} = usePromptPreloader();

 //obtain the current URL location information using the useLocation hook.
    const location = useLocation();
  return (
    <>
    {/*Meta title*/}
    <PageTitle title={`${title} | Whizzchat`}/>

       <motion.div className="max-w-[700px] mx-auto !will-change-auto" 
       initial ={!location.state?._isRedirect && {opacity:0}}
       animate ={{opacity:1}}
       transition={{duration:0.2,  delay:0.05, ease:'easeOut'}}
       >
        {chats.map((chat)=>(
         <div key={chat.$id}>
            {/*User Prompt*/}
           <UserPrompt text = {chat.user_prompt}/>

          {/*Ai Response */}
          <AiResponse aiResponse={chat.ai_response}/>
         </div>
        ))}
       </motion.div>

       {promptPreloaderValue && (
          <PromptPreloader promptValue={promptPreloaderValue}/>
      ) }
     

    </>
  );
};

export default Conversation;