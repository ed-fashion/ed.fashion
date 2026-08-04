// Navegação do painel administrativo
// Incluir este ficheiro em todas as páginas admin

function carregarAdminNav(paginaActiva) {
  const nav = `
  <div class="admin-sidebar">
    <div class="admin-logo">
      <img src="logo.png" alt="E'D Fashion" height="45">
      <span>Admin</span>
    </div>

    <!-- Avatar do utilizador -->
    <div id="adminUserInfo" style="
      display:flex; align-items:center; gap:10px;
      padding:12px 16px; margin:8px 12px;
      background:rgba(255,255,255,0.08); border-radius:10px;
      text-decoration:none; cursor:pointer;
    " onclick="window.location.href='perfil.html'">
      <div id="adminAvatar" style="
        width:36px; height:36px; border-radius:50%;
        background:var(--rosa-claro); border:2px solid var(--rosa);
        display:flex; align-items:center; justify-content:center;
        font-size:16px; font-weight:800; color:var(--rosa);
        flex-shrink:0; overflow:hidden;
      ">👤</div>
      <div style="min-width:0;">
        <div id="adminUserNome" style="font-size:13px; font-weight:700; color:var(--preto); white-space:nowrap; overflow:hidden; text-overflow:ellipsis;">A carregar...</div>
        <div style="font-size:11px; color:var(--cinza);">Ver perfil →</div>
      </div>
    </div>

    <nav class="admin-menu">
      <a href="admin.html" class="admin-menu-item ${paginaActiva === 'dashboard' ? 'active' : ''}">
        <span class="admin-menu-icone">📊</span>
        <span>Dashboard</span>
      </a>
      <a href="admin-produtos.html" class="admin-menu-item ${paginaActiva === 'produtos' ? 'active' : ''}">
        <span class="admin-menu-icone">👗</span>
        <span>Produtos</span>
      </a>
      <a href="admin-stock.html" class="admin-menu-item ${paginaActiva === 'stock' ? 'active' : ''}">
        <span class="admin-menu-icone">📦</span>
        <span>Stock</span>
      </a>
      <a href="admin-encomendas.html" class="admin-menu-item ${paginaActiva === 'encomendas' ? 'active' : ''}">
        <span class="admin-menu-icone">🛒</span>
        <span>Encomendas</span>
      </a>
      <a href="admin-clientes.html" class="admin-menu-item ${paginaActiva === 'clientes' ? 'active' : ''}">
        <span class="admin-menu-icone">👥</span>
        <span>Clientes</span>
      </a>
      <a href="admin-fornecedores.html" class="admin-menu-item ${paginaActiva === 'fornecedores' ? 'active' : ''}">
        <span class="admin-menu-icone">🏭</span>
        <span>Fornecedores</span>
      </a>
      <a href="admin-promocoes.html" class="admin-menu-item ${paginaActiva === 'promocoes' ? 'active' : ''}">
        <span class="admin-menu-icone">🏷️</span>
        <span>Promoções</span>
      </a>
      <a href="admin-colecoes.html" class="admin-menu-item ${paginaActiva === 'colecoes' ? 'active' : ''}">
  <span class="admin-menu-icone">🪩</span>
  <span>Colecções</span>
</a>
      <a href="admin-banners.html" class="admin-menu-item ${paginaActiva === 'banners' ? 'active' : ''}">
  <span class="admin-menu-icone">🖼️</span>
  <span>Banners</span>
</a>
      <a href="admin-relatorios.html" class="admin-menu-item ${paginaActiva === 'relatorios' ? 'active' : ''}">
        <span class="admin-menu-icone">📈</span>
        <span>Relatórios</span>
      </a>
    </nav>

    <div class="admin-menu-footer">
      <a href="index.html" class="admin-menu-item">
        <span class="admin-menu-icone">🏠</span>
        <span>Ver Loja</span>
      </a>
      <a href="#" onclick="adminLogout()" class="admin-menu-item admin-logout">
        <span class="admin-menu-icone">🚪</span>
        <span>Sair</span>
      </a>
    </div>
  </div>

  <!-- Topbar mobile -->
  <div class="admin-topbar">
    <button class="admin-menu-toggle" onclick="toggleAdminMenu()">☰</button>
    <span class="admin-topbar-titulo">${getTituloAdmin(paginaActiva)}</span>
    <a href="index.html" style="font-size:20px; text-decoration:none;">🏠</a>
  </div>

  <!-- Overlay mobile -->
  <div class="admin-overlay" id="adminOverlay" onclick="fecharAdminMenu()"></div>
  `;

  document.getElementById('adminNav').innerHTML = nav;
}

function getTituloAdmin(pagina) {
  const titulos = {
    dashboard: 'Dashboard',
    produtos: 'Produtos',
    stock: 'Stock',
    encomendas: 'Encomendas',
    clientes: 'Clientes',
    fornecedores: 'Fornecedores',
    promocoes: 'Promoções',
    colecoes: 'Colecções',
    banners: 'Banners',
    relatorios: 'Relatórios'
  };
  return titulos[pagina] || 'Admin';
}

function toggleAdminMenu() {
  document.querySelector('.admin-sidebar').classList.toggle('aberto');
  document.getElementById('adminOverlay').classList.toggle('visivel');
}

function fecharAdminMenu() {
  document.querySelector('.admin-sidebar').classList.remove('aberto');
  document.getElementById('adminOverlay').classList.remove('visivel');
}

async function adminLogout() {
  await db.auth.signOut();
  window.location.href = 'login.html';
}

async function verificarAdmin() {
  const { data: { session } } = await db.auth.getSession();
  if (!session) {
    window.location.replace('login.html');
    return false;
  }
  const { data: perfil } = await db
    .from('profiles')
    .select('role, full_name, avatar_url')
    .eq('id', session.user.id)
    .single();

  if (!perfil || !['admin', 'employee'].includes(perfil.role)) {
    window.location.replace('index.html');
    return false;
  }

  // Preencher avatar e nome na sidebar
  const nomeEl = document.getElementById('adminUserNome');
  const avatarEl = document.getElementById('adminAvatar');
  if (nomeEl) nomeEl.textContent = perfil.full_name || session.user.email || 'Admin';
  if (avatarEl) {
    if (perfil.avatar_url) {
      avatarEl.innerHTML = `<img src="${perfil.avatar_url}" style="width:100%;height:100%;object-fit:cover;border-radius:50%;">`;
    } else {
      // Tentar Gravatar
      const email = session.user.email || '';
      avatarEl.innerHTML = `<img src="https://www.gravatar.com/avatar/${await md5Hex(email)}?s=72&d=404"
        style="width:100%;height:100%;object-fit:cover;border-radius:50%;"
        onerror="this.parentElement.textContent='${(perfil.full_name || 'A').charAt(0).toUpperCase()}'">`;
    }
  }

  return true;
}

// MD5 simples via SubtleCrypto para Gravatar
async function md5Hex(str) {
  try {
    const msgBuffer = new TextEncoder().encode(str.trim().toLowerCase());
    const hashBuffer = await crypto.subtle.digest('MD5', msgBuffer);
    return Array.from(new Uint8Array(hashBuffer)).map(b => b.toString(16).padStart(2,'0')).join('');
  } catch {
    // MD5 não é suportado pelo SubtleCrypto — usar hash simples
    return str.trim().toLowerCase().split('').reduce((a, c) => (a * 31 + c.charCodeAt(0)) & 0xFFFFFFFF, 0).toString(16);
  }
}
