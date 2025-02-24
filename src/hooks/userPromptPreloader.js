/**
 *@copyright 2025 codewithaman
 @license Apache-2.0
 */
/**
 * Node Modules
 */
import { useEffect,useState } from "react";
import { useNavigation } from "react-router-dom";

/**
 * Custom Hook to manage the preloader value for the prompt.
 * 
 * @returns {{usePromptPreloaderValue :string}} An object containing the current propmt preloader value.
 */
const usePromptPreloader = ()=>{
    //Get navigation state
const navigation = useNavigation();
// Initialize preloader value
const [promptPreloaderValue, setPromptPreloaderValue] = useState('');
//Use useEffect to update preloader value based on navigation .formData
useEffect(()=>{
    //If form data exists, get the user prompt and update the preloader value.
    if(navigation.formData) {
        setPromptPreloaderValue(navigation.formData.get('user_prompt'));
    } else{
        //If no form data foud,reset preloader value to empty string.
        setPromptPreloaderValue('');
    }

},[navigation]);//Run effect only when navigation state changes 

return {promptPreloaderValue };
};

export {usePromptPreloader};