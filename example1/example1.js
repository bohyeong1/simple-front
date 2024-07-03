document.addEventListener('click', function(event) {
    const dropdowns = document.querySelectorAll('select')
    dropdowns.forEach(dropdown => {
        if (!dropdown.contains(event.target)) {
            dropdown.blur()
        }
    })
})