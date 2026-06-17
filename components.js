// Navbar principal (loja)
function carregarNavbar() {
  const navbar = `
  <nav class="navbar">
    <div class="navbar-container">
      <a href="index.html" class="navbar-logo">
        <img src="logo.png" alt="E'D Fashion" height="50">
      </a>
      <div class="navbar-search">
        <input type="text" id="searchInput" placeholder="Pesquisar produtos...">
        <button onclick="pesquisar()">🔍</button>
      </div>
      <div class="navbar-icons">
        <a href="favoritos.html" title="Favoritos">♡</a>
        <a href="carrinho.html" title="Carrinho">
          🛒 <span id="carrinhoCount" class="badge">0</span>
        </a>
        <a href="login.html" id="navPerfil" title="Conta">👤</a>
      </div>
    </div>
    <div class="navbar-categorias">
      <a href="catalogo.html?cat=feminino">👗 Feminino</a>
      <a href="catalogo.html?cat=masculino">👔 Masculino</a>
      <a href="catalogo.html?cat=crianca">🧒 Criança</a>
      <a href="catalogo.html?cat=calcado">👠 Calçado</a>
      <a href="catalogo.html?cat=acessorios">👜 Acessórios</a>
      <a href="catalogo.html?cat=cabelos">💇 Cabelos</a>
      <a href="catalogo.html?cat=electronica">📱 Electrónica</a>
      <a href="catalogo.html?cat=desporto">🏃 Desporto</a>
      <a href="catalogo.html?cat=casa">🏠 Casa</a>
      <a href="encomenda.html">📦 Por Encomenda</a>
    </div>
  </nav>`;
  document.getElementById('navbar').innerHTML = navbar;
  atualizarContadorCarrinho();
  atualizarNavbarSessao();
}

// Actualizar navbar conforme sessão
async function atualizarNavbarSessao() {
  const { data: { session } } = await db.auth.getSession();
  const navPerfil = document.getElementById('navPerfil');
  if (navPerfil) {
    if (session) {
      navPerfil.href = 'perfil.html';
      navPerfil.title = 'Meu Perfil';
    } else {
      navPerfil.href = 'login.html';
      navPerfil.title = 'Entrar';
    }
  }
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
        <a href="catalogo.html">Produtos</a>
        <a href="encomenda.html">Por Encomenda</a>
        <a href="favoritos.html">Favoritos</a>
      </div>
      <div class="footer-col">
        <h4>Conta</h4>
        <a href="perfil.html">Meu Perfil</a>
        <a href="encomendas-cliente.html">Minhas Encomendas</a>
        <a href="login.html">Login / Registo</a>
      </div>
      <div class="footer-col">
        <h4>Contacto</h4>
        <p>📱 WhatsApp: <a href="https://wa.me/258866464666?text=Olá%20E'D%20Fashion!%20Gostaria%20de%20saber%20mais%20sobre%20os%20vossos%20produtos%20😊" target="_blank">+258 86 646 4666</a></p>
        <p>📍 6º Bairro Esturro — Beira, Moçambique</p>
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
  if (termo) window.location.href = `catalogo.html?search=${encodeURIComponent(termo)}`;
}
