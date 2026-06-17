// ============================================================
// E'D FASHION — Componentes Partilhados
// Navbar e Footer injectados automaticamente em todas as páginas
// ============================================================

// Detectar caminho base (raiz ou subpasta /admin/)
const isAdmin = window.location.pathname.includes('/admin/');
const basePath = isAdmin ? '../' : './';

// ── NAVBAR ──────────────────────────────────────────────────
function renderNavbar() {
  const nav = document.getElementById('navbar');
  if (!nav) return;

  nav.innerHTML = `
    <div class="nav-inner">
      <a href="${basePath}index.html" class="nav-logo">
        <img src="${basePath}assets/logo.png" alt="E'D Fashion" />
      </a>

      <button class="nav-hamburger" id="navToggle" aria-label="Menu">
        <span></span><span></span><span></span>
      </button>

      <ul class="nav-links" id="navLinks">
        <li><a href="${basePath}index.html">Início</a></li>
        <li><a href="${basePath}catalogo.html">Catálogo</a></li>
        <li><a href="${basePath}encomendas.html">Por Encomenda</a></li>
        <li><a href="${basePath}sobre.html">Sobre Nós</a></li>
        <li><a href="${basePath}contacto.html">Contacto</a></li>
      </ul>

      <div class="nav-actions">
        <a href="${basePath}favoritos.html" class="nav-icon" title="Favoritos">
          <svg width="22" height="22" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
          </svg>
        </a>
        <a href="${basePath}carrinho.html" class="nav-icon nav-cart" title="Carrinho">
          <svg width="22" height="22" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
            <circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/>
            <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/>
          </svg>
          <span class="cart-badge" id="cartBadge" style="display:none">0</span>
        </a>
        <div class="nav-user" id="navUser">
          <a href="${basePath}login.html" class="btn-nav-login">Entrar</a>
        </div>
      </div>
    </div>
  `;

  // Hamburger toggle (mobile)
  document.getElementById('navToggle').addEventListener('click', () => {
    document.getElementById('navLinks').classList.toggle('open');
  });

  // Actualizar estado do utilizador na navbar
  updateNavUser();
  updateCartBadge();
}

// Actualizar nome/avatar do utilizador na navbar
async function updateNavUser() {
  const { data: { session } } = await db.auth.getSession();
  const navUser = document.getElementById('navUser');
  if (!navUser) return;

  if (session) {
    const { data: profile } = await db
      .from('profiles')
      .select('full_name, role')
      .eq('id', session.user.id)
      .single();

    const name = profile?.full_name?.split(' ')[0] || 'Conta';
    const role = profile?.role;

    navUser.innerHTML = `
      <div class="nav-user-menu">
        <button class="nav-user-btn" id="userMenuBtn">
          <svg width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
            <circle cx="12" cy="7" r="4"/>
          </svg>
          ${name}
        </button>
        <div class="user-dropdown" id="userDropdown">
          <a href="${basePath}perfil.html">O Meu Perfil</a>
          <a href="${basePath}minhas-encomendas.html">As Minhas Encomendas</a>
          <a href="${basePath}favoritos.html">Favoritos</a>
          ${role === 'admin' || role === 'employee' ? `<a href="${basePath}admin/index.html">Painel Admin</a>` : ''}
          <hr>
          <a href="#" id="logoutBtn">Terminar Sessão</a>
        </div>
      </div>
    `;

    document.getElementById('userMenuBtn').addEventListener('click', () => {
      document.getElementById('userDropdown').classList.toggle('open');
    });

    document.getElementById('logoutBtn').addEventListener('click', async (e) => {
      e.preventDefault();
      await db.auth.signOut();
      window.location.href = `${basePath}index.html`;
    });
  }
}

// Badge do carrinho
function updateCartBadge() {
  const cart = JSON.parse(localStorage.getItem('ed_cart') || '[]');
  const badge = document.getElementById('cartBadge');
  if (!badge) return;
  const total = cart.reduce((sum, item) => sum + item.qty, 0);
  if (total > 0) {
    badge.textContent = total;
    badge.style.display = 'flex';
  }
}

// ── FOOTER ──────────────────────────────────────────────────
function renderFooter() {
  const footer = document.getElementById('footer');
  if (!footer) return;

  footer.innerHTML = `
    <div class="footer-inner">
      <div class="footer-brand">
        <img src="${basePath}assets/logo.png" alt="E'D Fashion" class="footer-logo" />
        <p>Moda para todos.<br>Elegância ao teu alcance.</p>
        <div class="footer-social">
          <a href="#" aria-label="Facebook">
            <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
              <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
            </svg>
          </a>
          <a href="#" aria-label="Instagram">
            <svg width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
              <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
              <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
              <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
            </svg>
          </a>
          <a href="https://wa.me/258000000000" aria-label="WhatsApp">
            <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z"/>
            </svg>
          </a>
        </div>
      </div>

      <div class="footer-links">
        <h4>Loja</h4>
        <a href="${basePath}catalogo.html">Catálogo</a>
        <a href="${basePath}encomendas.html">Por Encomenda</a>
        <a href="${basePath}favoritos.html">Favoritos</a>
        <a href="${basePath}carrinho.html">Carrinho</a>
      </div>

      <div class="footer-links">
        <h4>Ajuda</h4>
        <a href="${basePath}como-comprar.html">Como Comprar</a>
        <a href="${basePath}pagamentos.html">Formas de Pagamento</a>
        <a href="${basePath}entregas.html">Entregas</a>
        <a href="${basePath}trocas.html">Trocas e Devoluções</a>
      </div>

      <div class="footer-links">
        <h4>Empresa</h4>
        <a href="${basePath}sobre.html">Sobre Nós</a>
        <a href="${basePath}contacto.html">Contacto</a>
        <a href="${basePath}privacidade.html">Privacidade</a>
      </div>
    </div>

    <div class="footer-bottom">
      <p>&copy; ${new Date().getFullYear()} E'D Fashion. Todos os direitos reservados.</p>
    </div>
  `;
}

// ── INICIALIZAÇÃO ────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  renderNavbar();
  renderFooter();
});
