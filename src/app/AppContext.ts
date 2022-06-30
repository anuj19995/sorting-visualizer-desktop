import { createContext } from "react";
import { AppContextType } from "../types";

const AppContext = createContext({} as AppContextType);
export default AppContext;
