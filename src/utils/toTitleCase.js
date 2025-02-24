/**
 * @copyright 2025 codewithaman
 * @license apache-2.0
 */

export default function toTitleCase(text) {
    return text
        .split(' ') // Split the string into words
        .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()) // Capitalize first letter of each word
        .join(' '); // Join words back into a single string
}
 