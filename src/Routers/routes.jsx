/**
 * @copyright 2025 codewithaman
 * @license Apache-2.0
 */

/**
 * Node modules
 */

import { createBrowserRouter } from 'react-router-dom';

/**
 * Components
 */
import App from '../App.jsx';
import Register from '../pages/Register.jsx';
import Login from '../pages/Login.jsx';
import ResetLink from '../pages/ResetLink.jsx';
import Conversation from '../pages/Conversation.jsx';
import ConversationError from '../pages/ConversationError.jsx';

/**
 * loaders 
 */
import registerLoader from './loaders/registerLoader.js';
import loginLoader from './loaders/loginLoader.js';
import resetLinkLoader from './loaders/resetLinkLoader.js';
import resetPasswordLoader from './loaders/resetPssswordLoader.js';
import conversationLoader from './loaders/conversationLoader.js';
import RootError from '../pages/RootError.jsx';
/**
 * Actions
 */
import registerAction from './actions/registerAction.js';
import loginAction from './actions/loginAction.js';
import resetLinkAction from './actions/resetLinkAction.js';
import ResetPassword from '../pages/ResetPassword.jsx';
import resetPasswordAction from './actions/resetPasswordAction.js';
import appLoader from './loaders/appLoader.js';
import appAction from './actions/appAction.js';
import conversationAction from './actions/conversationAction.js';
/**
 * Crerate Router
 */
const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    loader:appLoader,
    action:appAction,
    errorElement:<RootError />,
    children:[
      {
        path : '/:conversationId',
        element:<Conversation />,
        loader:conversationLoader,
        action: conversationAction,
        errorElement:<ConversationError/>,
      },
    ],
  },
  {
    path: '/register',
    element: <Register />,
    loader:registerLoader,
    action: registerAction,
  },
  {
      path: '/login',
      element: <Login />,
      loader: loginLoader,
      action:loginAction,
    },
    {
      path:'/reset-link',
      element:<ResetLink />,
      loader:resetLinkLoader,
      action:resetLinkAction,
    },
    {
      path:'/reset-password',
      element:<ResetPassword />,
      loader: resetPasswordLoader,
      action:resetPasswordAction,
    },

]);

export default router;
