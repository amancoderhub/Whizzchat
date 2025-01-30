import PropTypes from "prop-types";
/**
 * Custom modules 
 */
import { avatars } from "../lib/appwrite";

const Avatar = ({ name }) => {
  const initials = avatars.getInitials(name, 48, 48);

  return (
    <figure className="avatar">
      {initials ? (
        <img 
          src={initials} 
          alt={name} 
          width={48}
          height={48}
        />
      ) : (
        <span>{name}</span>
      )}
    </figure>
  );
};

Avatar.propTypes = {
  name: PropTypes.string.isRequired,
};

export default Avatar;
