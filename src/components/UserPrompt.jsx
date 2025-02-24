/**
 * @copyright 2025 codewithaman
 * @license Apache-2.0
 */

/**
 * Node Modules
 */
import PropTypes from "prop-types";
import { useLoaderData } from "react-router-dom";
import { useRef, useState, useEffect } from "react";
/**
 * Custom Modules
 */
import { useToggle } from "../hooks/useToggle";
/**
 * Components
 */
import Avatar from './Avatar';
import { IconBtn } from "./Button";

const UserPrompt = ({ text }) => {
    // Retrieve the user data from the loader using the useLoader hook.
    const { user } = useLoaderData();
    // Use the useToggle hook to manage the expanded state of the user prompt text.
    const [isExpanded, toggleExpanded] = useToggle();
    // Create a ref to access the text box element in the DOM.
    const textBoxRef = useRef();

    // Initialize the hasMoreContent state, indicating whether the content exceeds the visible height of the text box.
    const [hasMoreContent, setMoreContent] = useState(false);

    /**
     * Use useEffect to update the hasMoreContent state whenever the text box ref changes 
     * This ensures that the state is updated correctly if the text box content changes 
     */
    useEffect(() => {
        if (textBoxRef.current) {
            setMoreContent(
                textBoxRef.current.scrollHeight > textBoxRef.current.clientHeight,
            );
        }
    }, [textBoxRef]);

    return (
        <div className="grid items-start gap-1 py-4 md:grid-cols-[max-content,minmax(0,1fr),max-content] md:gap-5">
            <Avatar name={user?.name} />

            <p
                className={`text-bodyLarge pt-2 whitespace-pre-wrap ${!isExpanded ? 'line-clamp-2' : ''}`}
                ref={textBoxRef}
            >
                {text}
            </p>

            {hasMoreContent && (
                <IconBtn
                    icon={isExpanded ? 'keyboard_arrow_up' : 'keyboard_arrow_down'}
                    onClick={toggleExpanded}
                    title={isExpanded ? 'Collapse text' : 'Expand text'}
                />
            )}
        </div>
    );
};

UserPrompt.propTypes = {
    text: PropTypes.string,
};

export default UserPrompt;