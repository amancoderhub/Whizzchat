/**
 * @copyright 2024 codewitaman
 * @license Apache-2.0
 */
/**
 * Node
 */
import { useContext } from "react";
// /**
//  * Context
//  */
import { SnackbarContext } from "../contexts/SnackbarContext";

export const useSnackbar = () =>useContext(SnackbarContext);