const toastElement = document.getElementById("app-toast");
const toastBody = document.getElementById("toast-body");

let bsToast = null;

if (toastElement && typeof bootstrap !== "undefined") {
    bsToast = new bootstrap.Toast(toastElement, { delay: 3000 });
}

const showToast = (type, message) => {
    if (!toastElement || !bsToast) return;

    if (type === 0) {
        toastElement.classList.remove("text-bg-danger")
        toastElement.classList.add("text-bg-success")
    } else {
        toastElement.classList.remove("text-bg-success")
        toastElement.classList.add("text-bg-danger")
    }

    toastBody.innerHTML = message;
    bsToast.show();
};

const showToastSuccess = (message) => showToast(0, message);
const showToastDanger = (message) => showToast(1, message);