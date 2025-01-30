/**
 * @copyright 2025 codewithaman
 * @license Apache-2.0
*/
/**
 * Custom hooks
 */
import { useToggle } from "./hooks/useToggle";
/**
 * Components
 */
import PageTitle from "./components/PageTitle";
import TopAppBar from "./components/TopAppBar";
import Sidebar from "./components/Sidebar";
const App = () => {
  /**
   * Use a custom hook to manage  the sidebar's open state. 
   * 'isSidebarOpen' holds the current state, 
   * and 'toogleSidebar' is a function to toggle the sidebar
   */
  const [isSidebarOpen, toggleSidebar] = useToggle();
  return (
    <>
    {/*Meta title */}
    <PageTitle title='Whizzchat-chat to supercharge your- ideas'/>

    <div className=''>
     {/*Sidebar*/}
     <Sidebar 
     isSidebarOpen={isSidebarOpen}
     toggleSidebar={toggleSidebar}
     />

      <div className=''>
     {/*Top app bar */}
     <TopAppBar toggleSidebar={toggleSidebar}/>

     {/*Main Content */}
     <div className="">
       <div className="">Main Content</div>
     </div>

     {/*Prompt field */}
     <div className="">
      <p className="">
        Whizzchat may display inaccurate info including about people, so double-check its responses.
        <a 
        href="https://support.google.com/gemini?p=privacy_notice"
        target='_blank'
        className=""
        >

        </a>
      </p>
     </div>
      </div>
    </div>
    </>
  );
}

export default App;