const form = $("#todo-form");
const listE = $("#product-list");
const inputName = $("#product-name");
const inputQty = $("#product-qty");
const shareInput = $("input[name='share']");

const btnConfig = $("button[translate='configuration']");
const btnShare = $("button[translate='share']");
const btnCopy = $("button[translate='copy']");

let products = [];

const save = () => {
    localStorage.setItem("products", JSON.stringify(products));

    if (typeof language !== "undefined") {
        localStorage.setItem("language", language);
    }
};

const getShareLink = () => {
    const jsonStr = JSON.stringify(products);
    return `${window.location.origin}${window.location.pathname}?data=${toBase64(jsonStr)}`;
};

const share = () => {
    navigate("share");
    if (shareInput) {
        shareInput.value = getShareLink();
    }
};

const copy = async () => {
    if (!navigator.clipboard) return;

    try {
        await navigator.clipboard.writeText(getShareLink());
        showToastSuccess(`<i class="bi bi-check-lg"></i><span>${traductions[language]["copiedSuccessfully"]}</span>`)
        navigate("/")
    } catch (err) {
        console.error("Error al copiar al portapapeles:", err);
    }
};

const render = () => {
    if (!listE) return;

    if (products.length === 0) {
        listE.innerHTML = `<li class="list-group-item text-center text-muted py-3">${traductions[language]["noProducts"]}</li>`;
        btnShare.classList.add("disabled")
        return;
    }

    btnShare.classList.remove("disabled")

    listE.innerHTML = products.map((product, index) => `
        <li class="list-group-item d-flex justify-content-between align-items-center gap-2">
            <span class="flex-grow-1 ${product.completed ? "completed text-decoration-line-through opacity-50" : ""}">
                ${escapeHtml(product.name)} (x${product.quantity})
            </span>
            <div class="d-flex gap-2">
                <button data-action="toggle" data-index="${index}" class="btn btn-sm ${product.completed ? "btn-secondary" : "btn-success"}"><i class="bi bi-check-lg"></i></button>
                <button data-action="delete" data-index="${index}" class="btn btn-danger btn-sm"><i class="bi bi-x-lg"></i></button>
            </div>
        </li>
    `).join("");
};



const addProduct = (e) => {
    e.preventDefault();

    if (!form.checkValidity()) {
        e.stopPropagation();
        form.classList.add("was-validated"); 
        return;
    }

    const name = inputName.value.trim();
    const quantity = parseInt(inputQty.value, 10);

    products.unshift({ name, quantity, completed: false });
    save();
    render();

    inputName.value = "";
    inputQty.value = "1";
    form.classList.remove("was-validated");
    inputName.focus();
};

const handleListClick = (e) => {
    const button = e.target.closest("button[data-action]");
    if (!button) return;

    const index = parseInt(button.dataset.index, 10);
    const action = button.dataset.action;

    if (action === "toggle") {
        products[index].completed = !products[index].completed;
    } else if (action === "delete") {
        products.splice(index, 1);
    }

    save();
    render();
};

const load = () => {
    const urlParams = new URLSearchParams(window.location.search);
    const encodedData = urlParams.get("data");

    if (!encodedData) {
        products = JSON.parse(localStorage.getItem("products")) || [];
        return;
    }

    try {

        const decoded = fromBase64(encodedData);
        products = JSON.parse(decoded);
        save();
        window.history.replaceState({}, document.title, window.location.pathname);

    } catch (err) {
        console.error("Error al importar datos de la URL:", err);
    }
};

const initialize = () => {
    load();

    if (form) form.addEventListener("submit", addProduct);
    if (listE) listE.addEventListener("click", handleListClick);



    if (btnConfig) btnConfig.addEventListener("click", () => navigate("settings"));
    if (btnShare) btnShare.addEventListener("click", share);
    if (btnCopy) btnCopy.addEventListener("click", copy);

    inputName.focus();
    translate();
    render();
};

initialize();