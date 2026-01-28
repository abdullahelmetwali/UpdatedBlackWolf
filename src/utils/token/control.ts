import Cookies from "js-cookie";

type ControlUserTokenFn = {
    action: "save" | "delete",
    token?: string | null,
    reloadAfterAction?: boolean
};

export const controlUserToken = ({ action, token, reloadAfterAction = false }: ControlUserTokenFn) => {
    if (action === "save") {
        if (!token) throw new Error("Token required.");
        Cookies.set("BW_TOKEN", token);
    } else {
        Cookies.remove("BW_TOKEN");
    };
    if (reloadAfterAction) window.location.reload();
};