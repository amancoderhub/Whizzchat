/**
 * @copyright 2024 codewitaman
 * @license Apache-2.0
 */
/**
 * Node
 */
import PropTypes from "prop-types";

const Snackbar = ({snackbar})=>{
    return(
        <>
            {snackbar.open &&(
               <div className={`snackbar ${snackbar.type}`}>
                 <span>{snackbar.message}</span>
                </div>
            )}
        </>
    );
};
Snackbar.propTypes = {
    snackbar:PropTypes.object,
};

export default Snackbar;