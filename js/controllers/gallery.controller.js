setupListeners()

function setupListeners() {
    const items = document.querySelectorAll('.gallery-item')
    items.forEach((item) => {
        item.addEventListener('click', () => onMemeSelect(item.firstChild.src))
    })
}
