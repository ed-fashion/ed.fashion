-- ============================================================
-- Contador de visualizações de produtos
-- Executar no Supabase → SQL Editor
-- ============================================================

-- 1. Adicionar coluna view_count à tabela products
ALTER TABLE products
  ADD COLUMN IF NOT EXISTS view_count INT DEFAULT 0;

-- 2. Função RPC para incrementar atomicamente (segura em concorrência)
CREATE OR REPLACE FUNCTION incrementar_view(produto_id UUID)
RETURNS void
LANGUAGE sql
SECURITY DEFINER
AS $$
  UPDATE products
  SET view_count = COALESCE(view_count, 0) + 1
  WHERE id = produto_id;
$$;

-- Permite chamada anónima (visitantes sem login)
GRANT EXECUTE ON FUNCTION incrementar_view(UUID) TO anon;
GRANT EXECUTE ON FUNCTION incrementar_view(UUID) TO authenticated;
