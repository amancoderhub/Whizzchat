/**
 * @copyright 2025 codewithaman
 * @license Apache-2.0
*/
/**
 * Node Modules
 */
import { useRouteError,Link,useNavigation } from "react-router-dom";
/**
 * Component
 */
import { LinearProgress } from "../components/Progress";

const RootError = () => {

    //Reterive the error objet associated with the current route, if any .
   
    const error = useRouteError();
    //Access the navigation state.
    const navigation = useNavigation();
  return (
    <>       
    <div className="h-dvh grid grid-cols-1 justify-items-center content-center">
        <p className="text-displayLarge">
            {error.status}
        </p>
        <p className="text-light-onSurfaceVariant
        dark:text-dark-onSurfaceVariant mt-1 mb-4">
            We couldn&aops;t find the page you&aops;re looking for.
        </p>

        <Link 
        className="btn filled primary"
        to='/'
        >
            <div className="state-layer"></div>
            Back to home
        </Link>
       </div>
       {navigation.state ==='loading' && (
        <LinearProgress classes="fixed top-0 left-0 right-0"/>
       )}
    </>
       
  );
};

export default RootError;