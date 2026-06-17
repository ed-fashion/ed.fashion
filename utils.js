// ============================================================
// E'D FASHION — Utilitários Globais
// ============================================================

// Formatar moeda MZN — ex: 1.500,00 MT
function formatMZN(value) {
  return new Intl.NumberFormat('pt-MZ', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  }).format(value) + ' MT';
}

// Formatar data — ex: 17 de Junho de 2026
function formatDate(dateStr) {
  const date = new Date(dateStr);
  return date.toLocaleDateString('pt-MZ', {
    day: '2-digit',
    month: 'long',
    year: 'numeric'
  });
}

// Formatar data curta — ex: 17/06/2026
function formatDateShort(dateStr) {
  const date = new Date(dateStr);
  return date.toLocaleDateString('pt-MZ');
}

// Mostrar mensagem de erro
function showError(elementId, message) {
  const el = document.getElementById(elementId);
  if (el) {
    el.textContent = message;
    el.style.display = 'block';
    el.className = 'msg msg-error';
  }
}

// Mostrar mensagem de sucesso
function showSuccess(elementId, message) {
  const el = document.getElementById(elementId);
  if (el) {
    el.textContent = message;
    el.style.display = 'block';
    el.className = 'msg msg-success';
  }
}

// Limpar mensagem
function clearMsg(elementId) {
  const el = document.getElementById(elementId);
  if (el) {
    el.textContent = '';
    el.style.display = 'none';
  }
}

// Redirecionar após X segundos
function redirectAfter(url, seconds = 2) {
  setTimeout(() => { window.location.href = url; }, seconds * 1000);
}

// Obter parâmetro da URL — ex: ?id=123
function getUrlParam(param) {
  const params = new URLSearchParams(window.location.search);
  return params.get(param);
}

// Truncar texto longo
function truncate(text, maxLength = 80) {
  if (!text) return '';
  return text.length > maxLength ? text.slice(0, maxLength) + '...' : text;
}

// Gerar slug a partir de texto — ex: "Vestido Rosa" → "vestido-rosa"
function toSlug(text) {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-');
}
