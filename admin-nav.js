// Navegação do painel administrativo
// Incluir este ficheiro em todas as páginas admin

function carregarAdminNav(paginaActiva) {
  const nav = `
  <div class="admin-sidebar">
    <div class="admin-logo">
      <img src="logo.png" alt="E'D Fashion" height="45">
      <span>Admin</span>
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

// Verificar se é admin
async function verificarAdmin() {
  const { data: { session } } = await db.auth.getSession();
  if (!session) {
    window.location.replace('login.html');
    return false;
  }
  const { data: perfil } = await db
    .from('profiles')
    .select('role')
    .eq('id', session.user.id)
    .single();

  if (!perfil || !['admin', 'employee'].includes(perfil.role)) {
    window.location.replace('index.html');
    return false;
  }
  return true;
}
