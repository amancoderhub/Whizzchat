/**
 * @copyright 2025 codewithaman
 * @license Apache-2.0
 */
/**
 * Node Modules
 */
import { button } from "motion/react-client";
import PropTypes from "prop-types";

const MenuItem = ({classes = '',labelText,...rest}) => {
  return (
    <button className={`menu-item ${classes}`}
    {...rest}
    >
    <span>{labelText}</span>
    <div className="state-layer"></div>
    </button>
  );
};

MenuItem.propTypes = {
    classes:PropTypes.string,
    labelText:PropTypes.string,
};

export default MenuItem;