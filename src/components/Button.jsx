/**
 * @copyright 2025 codewithaman
 * @license Apache-2.0
 */
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
const Button = ({
  classes = '',
  variant = 'filled',
  color = 'primary',
  children,
  ...rest
}) => {
  return (
    <button
      className={`btn ${variant} ${color} ${classes}`}
      {...rest}
    >
      {children}
      <div className='state-layer'></div>
    </button>
  );
};

Button.propTypes = {
  classes: PropTypes.string,
  variant: PropTypes.string,
  color: PropTypes.string,
  children: PropTypes.any,
};

/**
 * Icon Button
 */
const IconBtn = ({ classes = '', icon, size = '', children, ...rest }) => {
  return (
    <button
      className={`icon-btn ${size} ${classes}`}
      {...rest}
    >
      {children}
      {!children && (
        <span className='material-symbols-rounded icon'>{icon}</span>
      )}
      <div className='state-layer'></div>
    </button>
  );
};

IconBtn.propTypes = {
  classes: PropTypes.string,
  icon: PropTypes.string,
  size: PropTypes.string,
  children: PropTypes.any,
};
/**
 * Extended fab
 */
const ExtendedFab = ({herf,text,classes='',...rest})=>{
  return (
  <Link 
  to={herf}
  className={`extended-fab ${classes} flex px-3 py-4`}
  {...rest}
  >
    <span className="material-symbols-rounded">add</span>
    <span className="turncate flex px-6">{text}</span>
    <span className="state-layer"></span>
  </Link>
  );
};

ExtendedFab.propTypes={
  herf:PropTypes.string,
  text:PropTypes.string,
  classes:PropTypes.string,
};
export { Button, IconBtn,ExtendedFab };