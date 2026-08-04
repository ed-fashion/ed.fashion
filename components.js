// Navbar principal (loja)
function carregarNavbar() {
  const navbar = `
  <nav class="navbar">
    <div class="navbar-container">
      <a href="index.html" class="navbar-logo">
        <img src="logo.png" alt="E'D Fashion" height="50">
      </a>
      <div class="navbar-search">
        <input type="text" id="searchInput" placeholder="Pesquisar produtos..."
          onkeydown="if(event.key==='Enter') pesquisar()">
        <button onclick="pesquisar()" title="Pesquisar">🔍</button>
<<<<<<< HEAD
=======
        <button onclick="abrirPesquisaFoto()" title="Pesquisar por foto" style="
          background:none; border:none; cursor:pointer; font-size:18px;
          padding:0 8px; display:flex; align-items:center; color:var(--cinza);
          transition:color 0.2s;
        " onmouseover="this.style.color='var(--rosa)'" onmouseout="this.style.color='var(--cinza)'">📷</button>
>>>>>>> 6143e63a8744bd753198e0191432a065bbcb89c7
      </div>
      <div class="navbar-icons">
        <a href="carrinho.html" title="Carrinho">
          🛒 <span id="carrinhoCount" class="badge">0</span>
        </a>
        <a href="login.html" id="navPerfil" title="Conta">👤</a>
      </div>
    </div>
    <div class="navbar-categorias">
      <a href="catalogo.html?tipo=stock">✅ Disponível Agora</a>
      <a href="catalogo.html?cat=feminino">👗 Feminino</a>
      <a href="catalogo.html?cat=masculino">👔 Masculino</a>
      <a href="catalogo.html?cat=crianca">🧒 Criança</a>
      <a href="catalogo.html?cat=calcado">👠 Calçado</a>
      <a href="catalogo.html?cat=acessorios">👜 Acessórios</a>
      <a href="catalogo.html?cat=cabelos">💇 Cabelos</a>
      <a href="catalogo.html?cat=electronica">📱 Electrónica</a>
      <a href="catalogo.html?cat=desporto">🏃 Desporto</a>
      <a href="catalogo.html?cat=casa">🏠 Casa</a>
      <a href="sobre.html">🏢 Sobre Nós</a>
    </div>
<<<<<<< HEAD
  </nav>`;
=======
  </nav>

  <!-- MODAL PESQUISA POR FOTO -->
  <div id="modalFoto" onclick="if(event.target===this)fecharModalFoto()" style="
    display:none; position:fixed; inset:0; background:rgba(0,0,0,0.55);
    z-index:9999; align-items:center; justify-content:center; padding:20px;
  ">
    <div style="
      background:white; border-radius:20px; padding:28px; max-width:420px;
      width:100%; box-shadow:0 20px 60px rgba(0,0,0,0.25); text-align:center;
    ">
      <div style="font-size:40px; margin-bottom:8px;">📷</div>
      <h3 style="font-size:17px; font-weight:800; color:var(--preto); margin-bottom:6px;">
        Pesquisar por Foto
      </h3>
      <p style="font-size:13px; color:var(--cinza); margin-bottom:20px;">
        Tira uma foto ou carrega uma imagem para encontrar produtos semelhantes.
      </p>

      <!-- Upload de imagem -->
      <div id="fotoPreviewWrap" style="display:none; margin-bottom:16px;">
        <img id="fotoPreview" style="max-width:100%; max-height:200px; border-radius:12px; object-fit:contain;">
      </div>

      <div style="display:flex; flex-direction:column; gap:10px; margin-bottom:20px;">
        <label style="
          display:flex; align-items:center; justify-content:center; gap:10px;
          padding:13px; background:var(--rosa); color:white; border-radius:25px;
          font-size:14px; font-weight:700; cursor:pointer; transition:background 0.2s;
        " onmouseover="this.style.background='#c4186f'" onmouseout="this.style.background='var(--rosa)'">
          📁 Escolher da galeria
          <input type="file" id="inputFotoSearch" accept="image/*" style="display:none"
            onchange="processarFotoSearch(event)">
        </label>

        <label style="
          display:flex; align-items:center; justify-content:center; gap:10px;
          padding:13px; background:var(--preto); color:white; border-radius:25px;
          font-size:14px; font-weight:700; cursor:pointer; transition:background 0.2s;
        " onmouseover="this.style.background='#333'" onmouseout="this.style.background='var(--preto)'">
          📸 Tirar foto (câmara)
          <input type="file" id="inputCameraSearch" accept="image/*" capture="environment" style="display:none"
            onchange="processarFotoSearch(event)">
        </label>
      </div>

      <div id="fotoSearchAcoes" style="display:none; flex-direction:column; gap:8px;">
        <button onclick="pesquisarNoGoogle()" style="
          width:100%; padding:12px; background:#4285F4; color:white; border:none;
          border-radius:25px; font-size:14px; font-weight:700; cursor:pointer;
        ">
          🔍 Pesquisar com Google Lens
        </button>
        <p style="font-size:11px; color:var(--cinza);">
          Abre o Google Lens para encontrar este produto em lojas online.
        </p>
      </div>

      <button onclick="fecharModalFoto()" style="
        width:100%; padding:10px; background:transparent; color:var(--cinza);
        border:1.5px solid #ddd; border-radius:25px; font-size:13px;
        font-weight:600; cursor:pointer; margin-top:8px;
      ">Cancelar</button>
    </div>
  </div>`;
>>>>>>> 6143e63a8744bd753198e0191432a065bbcb89c7

  document.getElementById('navbar').innerHTML = navbar;
  atualizarContadorCarrinho();
  atualizarNavbarSessao();
}

<<<<<<< HEAD
=======
let _fotoSearchFile = null;

function abrirPesquisaFoto() {
  const modal = document.getElementById('modalFoto');
  if (modal) {
    modal.style.display = 'flex';
    // Reset
    document.getElementById('fotoPreviewWrap').style.display = 'none';
    document.getElementById('fotoSearchAcoes').style.display = 'none';
    _fotoSearchFile = null;
  }
}

function fecharModalFoto() {
  const modal = document.getElementById('modalFoto');
  if (modal) modal.style.display = 'none';
}

function processarFotoSearch(event) {
  const file = event.target.files[0];
  if (!file) return;
  _fotoSearchFile = file;

  const reader = new FileReader();
  reader.onload = e => {
    const preview = document.getElementById('fotoPreview');
    const wrap = document.getElementById('fotoPreviewWrap');
    const acoes = document.getElementById('fotoSearchAcoes');
    if (preview) preview.src = e.target.result;
    if (wrap) wrap.style.display = 'block';
    if (acoes) acoes.style.display = 'flex';
  };
  reader.readAsDataURL(file);
}

function pesquisarNoGoogle() {
  window.open('https://lens.google.com', '_blank');
  fecharModalFoto();
}

>>>>>>> 6143e63a8744bd753198e0191432a065bbcb89c7
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
        <a href="sobre.html">Sobre Nós</a>
      </div>
      <div class="footer-col">
        <h4>Conta</h4>
        <a href="perfil.html">Meu Perfil</a>
        <a href="encomendas-cliente.html">Minhas Encomendas</a>
        <a href="login.html">Login / Registo</a>
        <a href="sobre.html#faq">Perguntas Frequentes</a>
        <a href="sobre.html#politicas">Políticas e Termos</a>
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

function atualizarContadorCarrinho() {
  const carrinho = JSON.parse(localStorage.getItem('ed_carrinho') || '[]');
  const total = carrinho.reduce((sum, item) => sum + item.quantidade, 0);
  const badge = document.getElementById('carrinhoCount');
  if (badge) badge.textContent = total;
}

function pesquisar() {
  const termo = document.getElementById('searchInput')?.value?.trim();
  if (termo) window.location.href = `catalogo.html?search=${encodeURIComponent(termo)}`;
}
