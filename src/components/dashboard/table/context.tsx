"use client";
import { Config, States } from "@/types";
import { createContext, useContext } from "react";

export const TableConfigContext = createContext<Config | null>(null);
export const TableConfigProvider = ({
    children,
    value,
}: {
    children: React.ReactNode;
    value: Config;
}) => {
    return (
        <TableConfigContext.Provider value={value}>
            {children}
        </TableConfigContext.Provider>
    )
};

export const TableStateContext = createContext<States | null>(null);
export const TableStateProvider = ({
    children,
    value,
}: {
    children: React.ReactNode;
    value: States;
}) => {
    return (
        <TableStateContext.Provider value={value}>
            {children}
        </TableStateContext.Provider>
    )
};

export const useTableConfig = () => {
    const context = useContext(TableConfigContext);
    if (context === null) {
        throw new Error("useTableConfig must be used within a TableConfigProvider");
    }
    return context;
};

export const useTableState = () => {
    const context = useContext(TableStateContext);
    if (context === null) {
        throw new Error("useTableState must be used within a TableStateProvider");
    }
    return context;
};