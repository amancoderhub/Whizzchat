/**
 * @copyright 2025 codewithaman
 * @license Apache-2.0
 */
/**
 * Node modules
 */
import { motion } from "motion/react";
import { useEffect,useRef } from "react";
import { Outlet,useParams,useNavigation,useActionData } from "react-router-dom";

/**
 * Custom hooks
 */
import { useToggle } from "./hooks/useToggle";
import { useSnackbar } from "./hooks/useSnackbar";
import { usePromptPreloader } from "./hooks/userPromptPreloader";

/**
 * Components
 */
import PageTitle from "./components/PageTitle";
import TopAppBar from "./components/TopAppBar";
import Sidebar from "./components/Sidebar";
import Greetings from "./pages/Greetings";
import PromptField from "./components/PromptField";

const App = () => {
  //Get the URL parameters.
  const params = useParams();

  //Access the nevigation state.
  const navigation = useNavigation();

  //Get the data passed from a from action.
  const actionData = useActionData();

  /**
   * Create a reference to an HTML element,
   * likely used to interact with the chat history.
   */
    const chatHistoryRef = useRef();

  /**
   * Use a custom hook to manage the sidebar's open state. 
   * 'isSidebarOpen' holds the current state, 
   * and 'toggleSidebar' is a function to toggle the sidebar.
   */
  const [isSidebarOpen, toggleSidebar] = useToggle();

  /**
   * Access the prompt preloader state,
   * particularly the value for prompt preloading
   */
  const {promptPreloaderValue}= usePromptPreloader();

  const {showSnackbar } =useSnackbar();

/**
 * This useEffect hook is triggered whenever the `promptPreloaderVlaue`
 or `chatHistoryRef` changes.
 *Inside the hook , we get the current HTML element referenced  by `chatHistoryRef`.
 *Then, we check if `promptPreloaderValue` is true,
 indicating that a new message is being loaded .
 *If it's true, we smoothly scroll the chat history to the bottom.
 *This ensures that the latest message is always visible after loading new content.
 */
  useEffect(()=>{
    const chatHistory = chatHistoryRef.current;
    if(promptPreloaderValue){
      chatHistory.scroll({
        top:chatHistory.scrollHeight - chatHistory.
        clientHeight,
        behavior:'smooth'
      });
    }
  },[chatHistoryRef, promptPreloaderValue]);
  
  //Show snackbar after deleting a conversation 
  useEffect(()=>{
    if(actionData ?.conversationTitle) {
      showSnackbar({
        message:`Deleted '${actionData.conversationTitle}'
        conversation.`
      });
    }
  },[actionData, showSnackbar]);

  /**
   * Check is the current navigation state is 'loading' and if there is no form data associated with the navigation .
   * This condition typically signifies a normal page load,
   * where the page is loading for the first time or is being reloaded without submitting a form.
   */
   const isNormalLoad = navigation.state === 'loading'&& !navigation.formData;

  return (
    <>
      {/* Meta title */}
      <PageTitle title="Whizzchat - Chat to supercharge your ideas" />

      <div className="flex h-dvh overflow-hidden">
        {/* Sidebar */}
        <Sidebar isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />

        <div className="flex flex-col flex-1 h-full">
          {/* Top app bar */}
          <TopAppBar toggleSidebar={toggleSidebar} />

          {/* Main Content */}
          <main ref={chatHistoryRef} className="flex-1 flex  justify-center p-4 overflow-auto">
            <div className=" text-base font-medium max-w-[830px] w-full mx-grow">
              {isNormalLoad ? null : params.conversationId ? (
                  <Outlet /> //Conversation 
              ):(
                <Greetings />
              )}
            </div>
          </main>

          {/* Prompt field */}
          <footer className="px-5 py-5 text-sm
          bg-light-background
          dark:bg-dark-background ">
            <div className="max-w-[870px] px-5  mx-auto">
            <PromptField />

            <motion.p 
            intial={{oapcity:0, translateY:'-4px'}}
            animate = {{opacity:1, translateY:0}}
            transition={{duration:0.2, delay:0.8 ,ease:'easeOut'}}
            className="text-bodySmall text-center
            text-light-onSurfaceVariant
            dark:text-dark-onSurfaceVariant p-3">
              Whizzchat may display inaccurate info, including about people, so double-check its responses.
              <a
                href="https://support.google.com/gemini?p=privacy_notice"
                target="_blank"
                // rel="noopener noreferrer"
                className="inline underline ms-1"
              >
                Your privacy & Gemini Apps 
              </a>
            </motion.p>
            </div>
          </footer>
        </div>
      </div>
    </>
  );
};

export default App;
