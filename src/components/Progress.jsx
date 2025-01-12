/**
 * @copyright 2025 codewithaman
 * @license Apache-2.0
 */

/**
 * Node Modules 
 */
import PropTypes from "prop-types";

/**
 * Circular progress 
 */
const CircularProgress = ({classes = '', size = ''}) =>{
    return(
         <div 
         role='progressbar'
         className= {`circular-progress ${size} ${classes}`}></div>
    );
};

CircularProgress.propTypes = {
    classes: PropTypes.string,
    size: PropTypes.string,
};

export{CircularProgress };

