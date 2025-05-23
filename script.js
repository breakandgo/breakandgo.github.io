const nav = document.querySelector("#nav");
const abrir = document.querySelector("#abrir");
const cerrar = document.querySelector("#cerrar");

abrir.addEventListener("click", () => {
    nav.classList.add("visible");
});

cerrar.addEventListener("click", () => {
    nav.classList.remove("visible");
});




// Selecciona el boton que activa el carrito y el contenedor de productos del carrito
const btnCart = document.querySelector('.container-cart-icon')
const containterCartProducts = document.querySelector('.container-cart-products')

// Añade un evento de clic al boton
btnCart.addEventListener('click', () => {
    // Alterna la clase 'hidden-cart' en el contenedor de productos del carrito
    containterCartProducts.classList.toggle('hidden-cart')
})

/*-------------*/

const cartInfo = document.querySelector('.cart-product')
// Selecciona el contenedor de productos del carrito
const rowProduct = document.querySelector('.row-product')

// Selecciona el contenedor principal de productos en la pagina
const productsList = document.querySelector('.container-items')

// Variable de arreglos de productos
let allProducts = []


const valorTotal = document.querySelector('.total-pagar')

const countProducts = document.querySelector('#contador-productos')

// Añade un evento de click al contenedor de productos
productsList.addEventListener('click', e => {
    if(e.target.classList.contains('btn-add-cart')) { 
        const product = e.target.parentElement // En la variable 'product' guardo el padre del boton 'btn-add-cart' (--> <div class="info-product">) y su contenido 
        console.log(product)
        
        const infoProduct = {                // Diccionario conteniendo el titulo del producto (h3) y el precio (p)
            quantity: 1,
            title: product.querySelector('h2').textContent,
            price: product.querySelector('p').textContent,
        }
        
        // Comprueba si el producto ya esta en el carrito
        const exits = allProducts.some(product => product.title === infoProduct.title)
        console.log(exits)
        
        // Si el producto ya esta en el carrito, actualiza la cantidad; de lo contrario, agrega el producto al arreglo.
        if (exits){
            const products = allProducts.map(product => {
                if(product.title === infoProduct.title){        
                    product.quantity++;
                    return product;
                } else {
                    return product;
                }
            })
            allProducts = [...products];
        } else {
            allProducts = [...allProducts, infoProduct]
        }

        // Actualiza la visualizacion del carrito
        showHTML();

    }

    console.log(allProducts)
});

// Añade un evento de clic al contenedor de productos del carrito
rowProduct.addEventListener('click', e => {
    if(e.target.classList.contains('icon-close')){
        // Obtiene el padre del elemento 'icon-close' (div con la clase 'cart-product').
        const product = e.target.parentElement;
        const title = product.querySelector('p').textContent;
        
        // Filtra el arreglo para eliminar el producto con el título correspondiente.
        allProducts = allProducts.filter(
            product => product.title !== title
        );

        console.log(allProducts)
        // Actualiza la visualizacion del carrito
        showHTML()
    }
})

const showHTML = () => {        // Función para actualizar la visualizacion del carrito

    // Limpia el contenido HTML del contenedor de productos del carrito
    rowProduct.innerHTML = '';

    // Suma total y suma numero carrito
    let total = 0; //<-- Total dinero a pagar
    let totalOfProducts = 0; //<-- Total productos en el carrito

    // Itera sobre todos los productos en el carrito
    allProducts.forEach(product => {
        // Crea un elemento HTML para cada producto
        const containerProduct = document.createElement('div')
        containerProduct.classList.add('cart-product')

        containerProduct.innerHTML = `
            <div class="info-cart-product">
                <span class="cantidad-producto-carrito">${product.quantity}</span> 
                <p class="titulo-producto-carrito">${product.title}</p>
                <span class="precio-producto-carrito">${product.price}</span>
            </div>
            <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class="icon-close"
            >
                <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                />
            </svg>
        `;

        // Añade el producto al contenedor de productos del carrito
        rowProduct.append(containerProduct);
    
    // Actualiza el total a pagar y el número de productos en el carrito
    total = total + parseInt(product.quantity * product.price.slice(1)); 
    totalOfProducts = totalOfProducts + product.quantity;

    });

    // Actualiza los elementos en la página con los nuevos valores
    valorTotal.innerText = `$${total}`
    countProducts.innerText = totalOfProducts;

    const cartEmpty = document.querySelector('.cart-empty');
    if (allProducts.length == 0) {
        cartEmpty.classList.remove('hidden');
    } else {
        cartEmpty.classList.add('hidden');
    }
}
