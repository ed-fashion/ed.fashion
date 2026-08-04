// Formatar moeda MZN
function formatMZN(valor) {
  if (!valor && valor !== 0) return '0,00 MT';
  return new Intl.NumberFormat('pt-PT', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  }).format(valor) + ' MT';
}

// Formatar data
function formatData(dataISO) {
  return new Date(dataISO).toLocaleDateString('pt-MZ', {
    day: '2-digit', month: '2-digit', year: 'numeric'
  });
}

// Mostrar mensagem de erro
function mostrarErro(elementoId, mensagem) {
  const el = document.getElementById(elementoId);
  if (el) {
    el.textContent = mensagem;
    el.style.display = 'block';
  }
}

// Mostrar mensagem de sucesso
function mostrarSucesso(elementoId, mensagem) {
  const el = document.getElementById(elementoId);
  if (el) {
    el.textContent = mensagem;
    el.style.display = 'block';
  }
}

// Esconder mensagem
function esconderMensagem(elementoId) {
  const el = document.getElementById(elementoId);
  if (el) el.style.display = 'none';
}

// Gerar slug a partir de texto
function gerarSlug(texto) {
  return texto
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .trim();
}
