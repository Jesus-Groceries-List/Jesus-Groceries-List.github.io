const toogleSection = () => {
    let arrowDown = $(".bi-chevron-down");
    let arrowUp = $(".bi-chevron-up");

    if (arrowDown.style.display === "none") {
        arrowDown.style.display = "block";
        arrowUp.style.display = "none";
    } else {
        arrowDown.style.display = "none";
        arrowUp.style.display = "block";
    }
}

const saveConfiguration = () => {
    
    Object.keys(languageInputs).forEach(tag => {
        let el = languageInputs[tag];
        if (el.checked) translate(tag);
    })

    toogleSection()
    navigate("/")
    showToastSuccess(`<i class="bi bi-check-lg"></i><span>${traductions[language]["savedSuccessfully"]}</span>`)
}