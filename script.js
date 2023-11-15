// Exemplo de dados de produtos (pode ser obtido de um servidor ou outra fonte de dados)
const products = [
    { name: 'Produto 1', price: 'R$ 50,00', size: 'M', description: 'Descrição do Produto 1', image: 'product1.jpg' },
    { name: 'Produto 2', price: 'R$ 35,00', size: 'L', description: 'Descrição do Produto 2', image: 'product2.jpg' },
    // Adicione mais produtos conforme necessário
];

// Função para exibir produtos no catálogo
function displayProducts() {
    const catalog = document.getElementById('productCatalog');

    products.forEach(product => {
        const productDiv = document.createElement('div');
        productDiv.classList.add('product');

        const productImage = document.createElement('img');
        productImage.src = product.image;
        productImage.alt = product.name;

        const productName = document.createElement('h2');
        productName.textContent = product.name;

        const productPrice = document.createElement('p');
        productPrice.textContent = `Preço: ${product.price}`;

        const productSize = document.createElement('p');
        productSize.textContent = `Tamanho: ${product.size}`;

        const productDescription = document.createElement('p');
        productDescription.textContent = product.description;

        productDiv.appendChild(productImage);
        productDiv.appendChild(productName);
        productDiv.appendChild(productPrice);
        productDiv.appendChild(productSize);
        productDiv.appendChild(productDescription);

        catalog.appendChild(productDiv);
    });
}

// Função para pesquisar produtos
function searchProduct() {
    const searchTerm = document.getElementById('searchInput').value.toLowerCase();
    const filteredProducts = products.filter(product => product.name.toLowerCase().includes(searchTerm));

    const catalog = document.getElementById('productCatalog');
    catalog.innerHTML = ''; // Limpar catálogo antes de exibir os resultados da pesquisa

    filteredProducts.forEach(product => {
        const productDiv = document.createElement('div');
        productDiv.classList.add('product');

        const productName = document.createElement('h2');
        productName.textContent = product.name;

        const productPrice = document.createElement('p');
        productPrice.textContent = `Preço: ${product.price}`;

        const productSize = document.createElement('p');
        productSize.textContent = `Tamanho: ${product.size}`;

        const productDescription = document.createElement('p');
        productDescription.textContent = product.description;

        productDiv.appendChild(productName);
        productDiv.appendChild(productPrice);
        productDiv.appendChild(productSize);
        productDiv.appendChild(productDescription);

        catalog.appendChild(productDiv);
    });
}

// Exibir produtos ao carregar a página
window.onload = displayProducts;


// Modifique a função addToCart para adicionar produtos a um carrinho no localStorage e atualizar o contador
function addToCart(button) {
    // Acesse os atributos de dados do elemento pai (div.product)
    const productName = button.parentNode.dataset.name || 'Nome do Produto';
    const productPrice = button.parentNode.dataset.price || 'R$ 0,00'; // Valor padrão se não estiver definido
    const productSize = button.parentNode.dataset.size || 'N/A';
    const productImage = button.parentNode.dataset.image || 'caminho/para/imagem_padrao.jpg';

    let cart = JSON.parse(localStorage.getItem('cart')) || [];

    // Adiciona o produto ao carrinho
    const product = { name: productName, price: productPrice, size: productSize, image: productImage };
    cart.push(product);

    // Salva o carrinho de volta no localStorage
    localStorage.setItem('cart', JSON.stringify(cart));

    // Atualiza o contador de itens no carrinho
    updateCartCounter();
}

// Limpa o carrinho ao carregar a página inicial
window.onload = function() {
    localStorage.removeItem('cart');
    displayProducts(); // Exibe os produtos na página inicial
    updateCartCounter(); // Atualiza o contador de itens no carrinho
}


// Função para atualizar o contador de itens no carrinho
function updateCartCounter() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const cartButton = document.getElementById('cartButton');
    const cartBadge = document.getElementById('cartBadge');

    // Exibe ou oculta o balão de notificação com base no número de itens no carrinho
    if (cartBadge) {
        if (cart.length > 0) {
            cartBadge.style.display = 'block';
            cartBadge.textContent = cart.length;
        } else {
            cartBadge.style.display = 'none';
        }
    }
}

// Exibe produtos na página inicial
function displayProducts() {
    const catalog = document.getElementById('productCatalog');

    products.forEach(product => {
        // ... (mesmo código para exibir produtos)
    });
    
    // Atualiza o contador de itens no carrinho
    updateCartCounter();
}

// Adicione a função para limpar o carrinho
function clearCart() {
    // Limpa o carrinho no localStorage
    localStorage.removeItem('cart');
    
    // Atualiza o contador de itens no carrinho
    updateCartCounter();

    // Recarrega a página para refletir as alterações (opcional)
    location.reload();
}