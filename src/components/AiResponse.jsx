/**
 * @copyright 2025 codewithaman
 * @license Apache-2.0
 */ 

/**
 * Node Modules
 */

import PropTypes from "prop-types";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { hopscotch, coy } from "react-syntax-highlighter/dist/esm/styles/prism";
import { useState, useEffect,useCallback } from "react";
/**
 * Custom Modules
 */
import toTitleCase from "../utils/toTitleCase";
/**
 * Custom Hooks
 */
import {useSnackbar} from '../hooks/useSnackbar';
/**
 * Components
 */
import { IconBtn } from "./Button";

/**
 * Assets
 */
import { iconLogo } from "../assets/assets";
import { isMotionComponent } from "motion/react";

const AiResponse = ({aiResponse, children}) => {
    //Initialize the codeTheme satate to an empty string, this will be used to store the selected code theme.
    const [codeTheme, setCodeTheme] = useState('');

    const {showSnackbar, hideSnackbar } = useSnackbar();

    //Use useEffect to detect changes in the user's preferred color scheme 
    useEffect(()=>{
      // Create a media querry to detect the user's preferred color scheme.
      const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)'); 

      //Initially set the codeTheme based on the current media query result.
      setCodeTheme(mediaQuery.matches ? hopscotch : coy);

      //Create an event listner to handle changes in the preferred color scheme .
      const themeListner = mediaQuery.addEventListener('change',(event)=>{
        setCodeTheme(mediaQuery.matches ?hopscotch : coy);
      } );
    },[]);
   
    const handleCopy = useCallback(async (text)=>{
        hideSnackbar();
        try{
           await navigator.clipboard.writeText(text);
           showSnackbar({
            message: 'Copied to clipboard',
            timeout:2500
           });
        } catch(err){
            showSnackbar({
                message:err.message,
            });
           console.log(`Error copying text to clipboard: ${err.message}`);
        }
    },[showSnackbar, hideSnackbar],
);
     //This function will execute for every code tag 
     const code = ({children, className, ...rest}) =>{
            const match = className?.match(/language-(\w+)/);

            return match ? (
                <>
                  <div className="code-block">
                    <div className="p-4 pb-0 font-sans">{toTitleCase(match[1])}</div>

                    <SyntaxHighlighter 
                    {...rest}
                    PreTag='div'
                    language={match[1]}
                    style={codeTheme}
                    customStyle={{
                        marginBlock: '0',
                        padding: '2px',
                    }}
                    codeTagProps={{
                        style:{
                            padding: '14px',
                            fontWeight:'600',
                        },
                    }}
                    >
                        {children}
                    </SyntaxHighlighter>
                  </div>

                  <div className='bg-light-surfaceContainer
                  dark:bg-dark-surfaceContainer rounded-t-extrasmall rounded-b-medium flex justify-between items-center h-11
                  font-sans text-bodyMedium ps-4 pe-2
                  '>
                  <p>
                    Use Code
                    <a 
                    className="link ms-2"
                     href="https://gemini.google.com/faq#coding"
                     target="_blank"
                     
                     >with caution.</a>
                  </p>
                
                <IconBtn 
                   icon='content_copy'
                   size='small'
                   title='Copy code'
                   onClick={handleCopy.bind(null,children)}
                />
                  </div>
                </>
            ) : (
               <code className={className}>{children}</code>
            );
     };

  return(
     <div className='grid grid-cols-1 items-start gap-1 py-4 md:grid-cols-[max-content,minmax(0,1fr)] md:gap-5'>
        <figure className='w-8 h-8 grid place-items-center'>
            <img src={iconLogo}
            width={32}
            height={32}
             alt="whizzchat logo" />
        </figure>

        {children}

        {aiResponse &&  (
          <div className="markdown-content">
                      <Markdown rehypePlugins={[remarkGfm]} components={{code}}>
                      {aiResponse}
                      </Markdown>
                  </div>
        )}

        
     </div>
  );
};

AiResponse.propTypes = {
    aiResponse : PropTypes.string,
    children:PropTypes.any,
};

export default AiResponse;