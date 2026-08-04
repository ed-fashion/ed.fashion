-- ============================================================
-- Adicionar colunas produto_id_3 e produto_id_4 à tabela banners
-- Executar no Supabase → SQL Editor
-- ============================================================

ALTER TABLE banners
  ADD COLUMN IF NOT EXISTS produto_id_3 UUID REFERENCES products(id) ON DELETE SET NULL,
  ADD COLUMN IF NOT EXISTS produto_id_4 UUID REFERENCES products(id) ON DELETE SET NULL;
