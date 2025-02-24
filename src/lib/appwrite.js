/**
 * @copyright 2025 codewithaman
 * @license Apache-2.0
 */

/**
 * Node Module
 */
import { Client,Account,Avatars,Databases } from 'appwrite';
/**
 * Initial Appwrite
 */

const client = new Client();
client.setProject(import.meta.env.VITE_APPWRITE_PROJECT_ID)
.setEndpoint('https://cloud.appwrite.io/v1');
/**
 * Initial Appwrite Account 
 */
const account = new Account(client);
// const result = await account.get();

/**
 * Initial Appwrite avatars
 */
const avatars = new Avatars(client);

/**
 * Initial Appwrite Databases
 */
 const databases = new Databases(client);

export {account,avatars,databases};