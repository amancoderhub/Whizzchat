/**
 * @copyright 2025 codewithaman
 * @license Apache-2.0
 */
import PropTypes from "prop-types";

const Button =({
    classes='',
    varient ='filled',
    color='primary',
    children,
    ...rest

}) =>{
    return  (
        <button className={`btn ${varient} ${color} ${classes}`}{...rest}>
            {children}
            <div className="state-layer"></div>
        </button>
    );
};

Button.propTypes = {
    classes: PropTypes.string,
    varient: PropTypes.string,
    color:PropTypes.string,
    children:PropTypes.any,
};

export {Button};