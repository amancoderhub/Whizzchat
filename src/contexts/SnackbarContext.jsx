/**
 * @copyright code with aman 
 * @license Appache 2.0
 */
/**'
 * Node Module 
 */

import {createContext, useState,useRef,useCallback,useMemo} from 'react';
import PropTypes from 'prop-types';
/**
 * Component
 */
import Snackbar from '../components/Snackbar';

const initialCtxValue = {
    snackbar:{
        open:false,
        message:'',
        type:'info',
    },
    showSnackbar : ({message,type = 'info', timeout = 5000}) => {},
    hideSnackbar : () => {},
};

export const SnackbarContext = createContext(initialCtxValue);

const SnackbarProvider = ({children}) => {

    const [snackbar,setSnackbar] = useState({
        open:false,
        message:'',
        type:'info'
    });
    const timeoutRef = useRef();

    //Show Snackbar
    const showSnackbar = useCallback(({message,type = 'info',timeOut=5000})=>{
         //clear any existing timeout to prevent overlap
         if(timeoutRef.current) clearTimeout(timeoutRef.current);
         //set the new snackbar message and tyoe
         setSnackbar({open:true,message,type});
         //Auto-hide the snackbar message and type
         timeoutRef.current = setTimeout(()=>{
            setSnackbar((prev)=>{
                return {...prev, open:false};
            });
         },timeOut);
    },
    []
);
    //Hide Snackbar Manually (if needed)
    const hideSnackbar = useCallback(()=>{
     //clear any existing timeout to prevent overlap
     if(timeoutRef.current) clearTimeout(timeoutRef.current);
     setSnackbar({open:false,message:'',type:'info'});
    },[]);
    //Memorize the context value to prevent unnecessary re-renders
    const contextValue = useMemo(()=>{
        return {showSnackbar,hideSnackbar}
    },[showSnackbar,hideSnackbar]);
  return (
    <SnackbarContext.Provider value ={contextValue}>
        {children}
        <Snackbar snackbar={snackbar}/>
    </SnackbarContext.Provider>
  );
};

SnackbarProvider.propTypes = {
    children:PropTypes.any,
};

export default SnackbarProvider;