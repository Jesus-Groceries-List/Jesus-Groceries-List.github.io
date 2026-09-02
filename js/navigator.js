const sections = {
    main: $('.main-section'),
    settings: $('.settings-section'),
    share: $('.share-section')
}

const navigate = (path) => {
    if (path === 'settings') {
        sections.settings.style.display = "block";
        sections.main.style.display = "none"
        sections.share.style.display = "none"
    } else if (path === 'share') {
        sections.share.style.display = "block";
        sections.main.style.display = "none"
        sections.settings.style.display = "none"
    } else {
        sections.main.style.display = "block";
        sections.settings.style.display = "none";
        sections.share.style.display = "none";
    }
};