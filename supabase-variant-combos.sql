-- ============================================================
-- Tabela de combinações Cor × Tamanho com preço próprio
-- Permite definir preços diferentes por combinação
-- Ex: Damasco + S = 1800 MT, Damasco + M = 1950 MT
-- Executar no Supabase → SQL Editor
-- ============================================================

CREATE TABLE IF NOT EXISTS product_variant_combos (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  product_id  UUID NOT NULL REFERENCES products(id) ON DELETE CASCADE,
  cor         TEXT NOT NULL,          -- Ex: 'Damasco', 'Borgonha'
  tamanho     TEXT NOT NULL,          -- Ex: 'S', 'M', 'L', 'XL'
  preco       NUMERIC(10,2) DEFAULT 0, -- Preço desta combinação em MT (0 = usa preço base)
  stock       INT DEFAULT 0,
  sort_order  INT DEFAULT 0,
  created_at  TIMESTAMPTZ DEFAULT NOW()
);

-- Índice para pesquisa rápida por produto
CREATE INDEX IF NOT EXISTS idx_combos_product ON product_variant_combos(product_id);
-- Combinação única por produto
CREATE UNIQUE INDEX IF NOT EXISTS idx_combos_unique ON product_variant_combos(product_id, cor, tamanho);

-- RLS: leitura pública, escrita apenas autenticados
ALTER TABLE product_variant_combos ENABLE ROW LEVEL SECURITY;

CREATE POLICY "combos_leitura_publica" ON product_variant_combos
  FOR SELECT USING (true);

CREATE POLICY "combos_escrita_admin" ON product_variant_combos
  FOR ALL USING (auth.role() = 'authenticated');
