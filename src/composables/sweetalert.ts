import Swal from "sweetalert2";

type sweetalertIcon = 'success' | 'error' | 'warning' | 'info' | 'question'

export const Alert = async (type: sweetalertIcon, title: string, message: string) => {
    Swal.fire({
        icon: type,
        title: title,
        text: message,
        padding: '2em',
        customClass: { popup: 'sweet-alerts' },
    });
}

export const Notification = async(msg: string, type: sweetalertIcon = 'info') => {
    const toast = Swal.mixin({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 3000,
        showCloseButton: true,
        customClass: {
            popup: `color-${type}`
        },
        target: document.getElementById(type + '-toast')
    });
    toast.fire({
        title: msg,
    });
}