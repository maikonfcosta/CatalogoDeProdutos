// cart.js - JavaScript específico para a página do carrinho

// Função para exibir o resumo do carrinho na página do carrinho
function displayCartSummary() {
    const cartSummary = document.getElementById('cartSummary');

    // Recupera o carrinho do localStorage
    const cart = JSON.parse(localStorage.getItem('cart')) || [];

    console.log('Carrinho:', cart); // Verifique o conteúdo do carrinho no console

    // Se o carrinho estiver vazio, exibe uma mensagem
    if (cart.length === 0) {
        cartSummary.innerHTML = '<p>O carrinho está vazio.</p>';
        return;
    }

    // Caso contrário, exibe o resumo do carrinho
    cartSummary.innerHTML = ''; // Limpa o conteúdo anterior

    cart.forEach(product => {
        console.log('Produto:', product); // Verifique o conteúdo de cada produto no console

        const productDiv = document.createElement('div');
        productDiv.classList.add('productSummary');

        const productImage = document.createElement('img');
        productImage.src = product.image;
        productImage.alt = product.name;

        const productName = document.createElement('h2');
        productName.textContent = product.name;

        const productPrice = document.createElement('p');
        productPrice.textContent = `Preço: ${product.price}`;

        const productSize = document.createElement('p');
        productSize.textContent = `Tamanho: ${product.size || 'N/A'}`; // Usando 'N/A' se o tamanho for undefined

        productDiv.appendChild(productImage);
        productDiv.appendChild(productName);
        productDiv.appendChild(productPrice);
        productDiv.appendChild(productSize);

        cartSummary.appendChild(productDiv);
    });
}


// Exibe o resumo do carrinho ao carregar a página
window.onload = displayCartSummary;


// Função para enviar o pedido via WhatsApp
function sendOrder() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];

    const orderNumber = Math.floor(Math.random() * (9999 - 1000 + 1)) + 1000;
    
    let message = `Pedido #${orderNumber}:\n`;
    
    cart.forEach((product, index) => {
        message += `${index + 1}. ${product.name} - Tamanho: ${product.size} - Preço: ${product.price}\n`;
    });

    // Substitua "+5519991729520" pelo seu número de telefone no formato internacional
    const whatsappLink = `https://wa.me/+5519992626621/?text=${encodeURIComponent(message)}`;
    window.open(whatsappLink, '_blank');
}

// Adicione a função para limpar o carrinho
function clearCart() {
    // Limpa o carrinho no localStorage
    localStorage.removeItem('cart');
    
    // Recarrega a página para refletir as alterações (opcional)
    location.reload();
}