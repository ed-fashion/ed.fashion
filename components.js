// Navbar principal (loja)
function carregarNavbar() {
  const navbar = `
  <nav class="navbar">
    <div class="navbar-container">
      <a href="/index.html" class="navbar-logo">
        <img src="logo.png" alt="E'D Fashion" height="50">
      </a>
      <div class="navbar-search">
        <input type="text" id="searchInput" placeholder="Pesquisar produtos...">
        <button onclick="pesquisar()">🔍</button>
      </div>
      <div class="navbar-icons">
        <a href="/favoritos.html" title="Favoritos">♡</a>
        <a href="/carrinho.html" title="Carrinho">
          🛒 <span id="carrinhoCount" class="badge">0</span>
        </a>
        <a href="/perfil.html" id="navPerfil" title="Conta">👤</a>
      </div>
    </div>
    <div class="navbar-categorias">
      <a href="/index.html?cat=feminino">Feminino</a>
      <a href="/index.html?cat=masculino">Masculino</a>
      <a href="/index.html?cat=crianca">Criança</a>
      <a href="/index.html?cat=calcado">Calçado</a>
      <a href="/index.html?cat=acessorios">Acessórios</a>
      <a href="/encomenda.html">📦 Por Encomenda</a>
    </div>
  </nav>`;
  document.getElementById('navbar').innerHTML = navbar;
  atualizarContadorCarrinho();
}

// Footer principal
function carregarFooter() {
  const footer = `
  <footer class="footer">
    <div class="footer-container">
      <div class="footer-col">
        <img src="logo.png" alt="E'D Fashion" height="60">
        <p>Moda para todos, com estilo e elegância.</p>
      </div>
      <div class="footer-col">
        <h4>Loja</h4>
        <a href="/index.html">Produtos</a>
        <a href="/encomenda.html">Por Encomenda</a>
        <a href="/favoritos.html">Favoritos</a>
      </div>
      <div class="footer-col">
        <h4>Conta</h4>
        <a href="/perfil.html">Meu Perfil</a>
        <a href="/encomendas.html">Minhas Encomendas</a>
        <a href="/login.html">Login / Registo</a>
      </div>
      <div class="footer-col">
        <h4>Contacto</h4>
        <p>📱 WhatsApp: <a href="https://wa.me/258XXXXXXXXX" target="_blank">+258 XX XXX XXXX</a></p>
        <p>📍 Beira, Moçambique</p>
      </div>
    </div>
    <div class="footer-bottom">
      <p>© 2026 E'D Fashion. Todos os direitos reservados.</p>
    </div>
  </footer>`;
  document.getElementById('footer').innerHTML = footer;
}

// Contador do carrinho
function atualizarContadorCarrinho() {
  const carrinho = JSON.parse(localStorage.getItem('ed_carrinho') || '[]');
  const total = carrinho.reduce((sum, item) => sum + item.quantidade, 0);
  const badge = document.getElementById('carrinhoCount');
  if (badge) badge.textContent = total;
}

// Pesquisa
function pesquisar() {
  const termo = document.getElementById('searchInput')?.value?.trim();
  if (termo) window.location.href = `/index.html?search=${encodeURIComponent(termo)}`;
}
