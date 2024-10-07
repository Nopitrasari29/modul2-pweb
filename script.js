// Variabel keranjang, data disimpan di Local Storage
let cart = JSON.parse(localStorage.getItem('cart')) || [];

// Fungsi untuk menampilkan notifikasi
function showNotification() {
    const toast = document.getElementById('toast-notification');
    toast.classList.remove('hidden');
    toast.classList.add('show');

    // Sembunyikan notifikasi setelah 3 detik
    setTimeout(() => {
        toast.classList.remove('show');
        toast.classList.add('hidden');
    }, 3000);
}

// Fungsi untuk menambahkan produk ke keranjang
function addToCart(productName, productPrice) {
    const existingProduct = cart.find(item => item.name === productName);

    if (existingProduct) {
        existingProduct.quantity += 1;  // Jika produk sudah ada di keranjang, tambahkan kuantitas
    } else {
        cart.push({
            name: productName,
            price: productPrice,
            quantity: 1
        });
    }

    updateCart();  // Panggil updateCart untuk memperbarui tampilan keranjang
    showNotification();  // Panggil notifikasi setelah produk ditambahkan
}

// Fungsi untuk memperbarui tampilan keranjang dan Local Storage
function updateCart() {
    const cartItemsDiv = document.getElementById('cart-items');
    const totalPriceElement = document.getElementById('total-price');
    
    let totalPrice = 0;

    // Hapus semua elemen dalam cartItemsDiv sebelum menambahkan item baru
    cartItemsDiv.innerHTML = '';  // Bersihkan konten sebelumnya untuk menghindari duplikasi

    // Perulangan untuk menampilkan item di keranjang
    cart.forEach(item => {
        totalPrice += item.price * item.quantity;

        // Buat elemen HTML untuk produk di keranjang
        const cartItemElement = document.createElement('div');
        cartItemElement.classList.add('cart-item');
        cartItemElement.innerHTML = `
            <h4>${item.name}</h4>
            <p>Harga: Rp${item.price}</p>
            <p>Kuantitas: ${item.quantity}</p>
            <button onclick="removeFromCart('${item.name}')">Hapus</button>
        `;

        // Tambahkan elemen produk ke dalam keranjang
        cartItemsDiv.appendChild(cartItemElement);
    });

    // Perbarui total harga
    if (totalPriceElement) {
        totalPriceElement.textContent = `Rp${totalPrice}`;  // Update total harga
    }

    // Simpan keranjang ke Local Storage
    localStorage.setItem('cart', JSON.stringify(cart));
}

// Fungsi untuk menghapus item dari keranjang
function removeFromCart(productName) {
    cart = cart.filter(item => item.name !== productName);
    updateCart();  // Panggil updateCart setelah item dihapus
}

// Fungsi checkout, reset keranjang
function processCheckout() {
    if (cart.length === 0) {
        alert('Keranjang Anda kosong!');
        return;
    }

    alert('Terima kasih! Pesanan Anda telah dikonfirmasi.');
    cart = [];
    updateCart();  // Kosongkan keranjang setelah checkout
    localStorage.removeItem('cart');  // Hapus data keranjang dari Local Storage
    window.location.href = 'index.html';  // Kembali ke halaman utama
}

// Saat halaman dimuat
window.onload = function () {
    if (window.location.pathname.includes('products.html')) {
        updateCart();  // Update cart di halaman produk
    }

    if (window.location.pathname.includes('checkout.html')) {
        updateCart();  // Update cart di halaman checkout
        document.getElementById('confirm-order').addEventListener('click', processCheckout);
    }
}
