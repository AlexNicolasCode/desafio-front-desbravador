import { useContext } from "react";

import { AlertContext } from "../../context";

export const useAlert = () => useContext(AlertContext)