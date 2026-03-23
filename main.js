const loadBtn = document.getElementById('loadBtn')
const sortBtn = document.getElementById('sortBtn')
const search = document.getElementById('search')
const productsDiv = document.getElementById('products')
const message = document.getElementById('message')

let products = []

const loadProducts = async () => {
    try {
        message.textContent = 'Загрузка...'

        const res = await fetch('https://fakestoreapi.com/products')
        const data = await res.json()

        products = data
        render(products)

        message.textContent = ''

    } catch (e) {
        message.textContent = 'Ошибка загрузки'
    }
}

const render = (data) => {
    productsDiv.innerHTML = ''

    data.forEach(p => {
        const div = document.createElement('div')
        div.className = 'card'

        div.innerHTML = `
            <img src="${p.image}">
            <h3>${p.title}</h3>
            <p>${p.price} $</p>
        `

        productsDiv.appendChild(div)
    })
}

search.addEventListener('input', () => {
    const value = search.value.toLowerCase()

    const filtered = products.filter(p =>
        p.title.toLowerCase().includes(value)
    )

    render(filtered)
})

sortBtn.onclick = () => {
    const sorted = [...products].sort((a, b) => a.price - b.price)
    render(sorted)
}

loadBtn.onclick = loadProducts