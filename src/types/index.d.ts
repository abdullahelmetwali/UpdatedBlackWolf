import { UseMutationResult } from "@tanstack/react-query";

export type GETFUNC = {
    url: string;
    context?: "website" | "profile" | "dashboard" | "special",
    searchParams?: Record<string, string>,
    revalidate?: number,
};

export type UseGet = {
    url: string,
    context?: "website" | "dashboard",
    headers?: HeadersInit,
    props?: Omit<UseQueryOptions<any, Error>, 'queryKey' | 'queryFn'>
};

export type CartTypo = {
    cart: ProductTypo[],

    addingItemID: string | null,
    removingItemID: string | null,

    fetchingLoading: boolean,
    addingLoading: boolean,
    removingLoading: boolean,

    fetch: () => Promise<void>
    adding: (id: string) => Promise<void>,
    removing: (id: string) => Promise<void>
};

export interface SpecificTable {
    data: any,
};

export interface PageTypo {
    searchParams?: Promise<Record<string, string>>,
    params?: Promise<Record<any, string>>
};

export type DataTableTypo = {
    data: any[],
    columns: any,
    role: string,

    tableOptions?: Partial<TableOptions<any>>,

    allowedTo: {
        index?: boolean,
        show?: boolean,
        add: boolean,
        multiActions: boolean,
        delete: boolean,
        forceDelete: boolean,
        update: boolean,
        restore: boolean,
    },

    disabled?: {
        search?: boolean,
        reset?: boolean,
        refresh?: boolean,

        download?: boolean,
        downloadPDF?: boolean,
        downloadCSV?: boolean,

        multiAction?: boolean,
        columns?: boolean,
        rows?: boolean,
        add?: boolean,
        contextMenu?: boolean
    }

    hidden?: {
        search?: boolean,
        reset?: boolean,
        refresh?: boolean,
        download?: boolean,

        multiAction?: boolean,
        columns?: boolean,
        rows?: boolean,
        add?: boolean,

        contextMenu?: {
            create?: boolean
            update?: boolean
            show?: boolean
            download?: boolean
            indexPage?: boolean
            deletedPage?: boolean,
            activate?: boolean,
            unactivate?: boolean,
            deleteAction?: boolean,
            forceDeleteAction?: boolean,
            restoreAction?: boolean
        }
    },

    replace?: {
        search?: React.ReactNode,
        reset?: React.ReactNode,
        refresh?: React.ReactNode,
        download?: React.ReactNode,

        multiAction?: React.ReactNode,
        columns?: React.ReactNode,
        rows?: React.ReactNode,
        add?: React.ReactNode,

    },

    createButton?: React.ReactNode, // make it as a dialog or a link 
    filter?: React.ReactNode,
    contextMenuAdditions?: React.ReactNode
};

export type Config = {
    role: string,
    table: any,

    allowedTo: DataTableTypo["allowedTo"]
    disabled?: DataTableTypo["disabled"]
    hidden?: DataTableTypo["hidden"]
    isDeletedRoute: boolean,

    replace?: {
        search?: React.ReactNode,
        reset?: React.ReactNode,
        refresh?: React.ReactNode,
        download?: React.ReactNode,

        multiAction?: React.ReactNode,
        columns?: React.ReactNode,
        rows?: React.ReactNode,
        add?: React.ReactNode,

        contextMenu?: {
            deleteAction?: () => void,
            forceDeleteAction?: () => void,
            restoreAction?: () => void,
            multiAction?: () => void,
        }
    },

    createButton?: DataTableTypo["createButton"], // make it as a dialog or a link 
    filter: DataTableTypo["filter"]

    updatePageSize: (size: number) => void,
    onReset: () => void,
    exportToCSV: () => void,
    refreshTable: UseMutationResult,
};

export type States = {
    dataState: any[],
    setDataState: Dispatch<SetStateAction<any[]>>

    sorting: any[],
    setSorting: Dispatch<SetStateAction<any[]>>

    columnFilters: any[],
    setColumnFilters: Dispatch<SetStateAction<any[]>>

    columnVisibility: {},
    setColumnVisibility: Dispatch<SetStateAction<{}>>

    rowSelection: {},
    setRowSelection: Dispatch<SetStateAction<{}>>

    globalFilter: string,
    setGlobalFilter: Dispatch<SetStateAction<string>>

    pagination: { pageIndex: number, pageSize: number },
    setPagination: Dispatch<SetStateAction<{ pageIndex: number, pageSize: number }>>
};

export type MultiAction = {
    actionType: "delete" | "force-delete" | "status_active" | "status_inactive" | "restore",
    ids: string[],
    children: React.ReactNode,
    message: string,
    role: string,
};

export type ManualErr = {
    errors?: Record<string, string>,
    status?: number,
    statusText?: string
};

export interface UseFromSubmissionType {
    endPoint?: string,
    method: "POST" | "PUT" | "PATCH" | "DELETE",

    beforeRun?: () => void,
    beforeSuccess?: (
        data?: any,
        variables?: any,
        context?: unknown
    ) => void | Promise<void>,

    onSuccess?: (
        data?: any,
        variables?: any,
        context?: unknown
    ) => void | Promise<void>,

    onError?: (err: ManualErr) => void | { handled?: boolean },
    setError?: (field: string, { type, message }: Record<string, string>) => void | any,
    clearErrors?: () => void,
};

export interface TextField extends React.ComponentProps<"input"> {
    label?: string,

    value?: string,
    className?: string,
    type?: string | "text",

    registerFor?: string,
    register?: UseFormRegister<T>,
    errors?: FieldErrors<FieldValues>,
    errorMessage?: string,

    tooltip?: string,
    textarea?: boolean,
    toggleSeePassword?: boolean
};

export interface PickerTypo extends React.ComponentProps<"button"> {
    label?: string,
    placeHolder: string,
    className?: string,
    required?: boolean,

    value: string | any[],
    setValue?: UseFormSetValue | Dispatch<SetStateAction<any>>,
    setValueFor?: string,
    errors?: FieldErrors<FieldValues>,

    onReset?: () => void,

    items: any[],
    itemLabel?: string | "name",
    itemValue?: string | "id",

    isLoading?: boolean | undefined | null,
    error?: Error | undefined | null,
    searchMode?: boolean | true,

    maxChoosed?: number,
    variant?: "dropdown" | "container",
};

export interface FileUploadTypo extends React.ComponentProps<"input"> {
    onChange: (file: File | null) => void
    className?: string

    name?: string,
    value: File | string | null,

    label?: string
    icon?: any
    errors?: FieldErrors<FieldValues>,
    errorMessage?: string
    type?: string,

    props?: any
};