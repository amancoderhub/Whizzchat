/**
 * @copyright 2025 codewithaman
 * @license Apache-2.0
 */
/**
 * Node Modules
 */
import {
  useNavigation,
  useNavigate,
  useLoaderData,
} from 'react-router-dom';
import { AnimatePresence } from 'motion/react';
import PropTypes from 'prop-types';
/**
 * Custom modules
 */
import logout from '../utils/logout';
/**
 * Custom hook
 */
import { useToggle } from '../hooks/useToggle';
/**
 * Components
 */
import { IconBtn } from './Button';
import Avatar from './Avatar';
import Menu from './Menu';
import MenuItem from './MenuItem';
import { LinearProgress } from './Progress';
import Logo from './Logo';

const TopAppBar = ({toggleSidebar}) => {
  // useNavigation: Provides navigation state (loading, idle, submitting, etc.)
  const navigation = useNavigation();
  // useNavigate: Function for programmatically navigating between routes.
  const navigate = useNavigate();

  // user: user data for the currently logged-in user.
  const { user } = useLoaderData();

  // use a custom hook to manage the menu's show state
  // 'showMenu' holds the current state,
  // and 'setShowMenu' is a function to toggle the sidebar.
  const [showMenu, setShowMenu] = useToggle();

  // Check if the current navigation state is 'loading' and if there is no form data associated with the navigation.
  // This condition typically signifies a normal page load,
  // where the page is loading for the first time or is being reloaded without submitting a form.
  const isNormalLoad = navigation.state === 'loading' && !navigation.formData;

  return (
    <header className='relative flex justify-between items-center h-16 px-4'>
      <div className='relative flex '>
        <IconBtn
          icon='menu'
          title='Menu'
          classes='lg:hidden'
          onClick={toggleSidebar}
        />
        <Logo classes='lg:hidden' />
      </div>
      <div className='menu-wrapper'>
        <IconBtn onClick={setShowMenu}>
          <Avatar name={user.name} />
        </IconBtn>
        <Menu classes={showMenu ? 'active' : ''}>
          <MenuItem
            labelText='Log out'
            onClick={() => logout(navigate)}
          />
        </Menu>
      </div>
      <AnimatePresence>{isNormalLoad && <LinearProgress />}</AnimatePresence>
    </header>
  );
};

TopAppBar.propTypes ={
  toggleSidebar : PropTypes.func,
};

export default TopAppBar;
