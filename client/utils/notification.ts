export const setNotification = (toShow = false, type = null, message = null) => {
    localStorage.setItem("notifToShow", toShow as unknown as string);
    localStorage.setItem("notifType", type);
    localStorage.setItem("notifMessage", message);
}

export const getNotification = () => {
    return { toShow: localStorage.getItem("notifToShow"), type: localStorage.getItem("notifType"), message: localStorage.getItem("notifMessage") }
}