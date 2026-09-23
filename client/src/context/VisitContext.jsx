import { createContext, useContext, useState, useEffect } from "react";

const VisitContext = createContext();

export const VisitProvider = ({ children }) => {
    const [isFirstVisit, setIsFirstVisit] = useState(null);

    useEffect(() => {
        const visited = localStorage.getItem("drawspace_visited");
        setIsFirstVisit(!visited);
    }, []);

    const markVisited = () => {
        localStorage.setItem("drawspace_visited", "true");
        setIsFirstVisit(false);
    };

    return (
        <VisitContext.Provider value={{ isFirstVisit, markVisited }}>
            {children}
        </VisitContext.Provider>
    );
};

export const useVisit = () => useContext(VisitContext);