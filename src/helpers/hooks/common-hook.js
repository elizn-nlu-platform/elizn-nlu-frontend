import React, { useContext } from "react";
import { useLocation } from "react-router";
import { AppContext } from "../../context/app-context";

export function useQuery() {
    const { search } = useLocation();
    return React.useMemo(() => new URLSearchParams(search), [search]);
}

export function useAppContext() {
    const context = useContext(AppContext);
    return context;
}
