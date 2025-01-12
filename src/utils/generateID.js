/**
 * @copyright 2024 codewithsadee
 * @license Apache-2.0
 */
/**
 * 
 * @returns {string} A unique identifiers string.
 */

export default function generateID() {
    return Math.random().toString(36).slice(2)+Date.now().toString(36);
}