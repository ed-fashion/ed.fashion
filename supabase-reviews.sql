-- ============================================================
-- Tabela: product_reviews
-- Executar no Supabase → SQL Editor
-- ============================================================

CREATE TABLE IF NOT EXISTS product_reviews (
  id            UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  product_id    UUID NOT NULL REFERENCES products(id) ON DELETE CASCADE,
  user_id       UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  rating        SMALLINT NOT NULL CHECK (rating BETWEEN 1 AND 5),
  comment       TEXT,
  is_approved   BOOLEAN NOT NULL DEFAULT true,
  created_at    TIMESTAMPTZ DEFAULT NOW(),
  updated_at    TIMESTAMPTZ DEFAULT NOW(),

  -- Um utilizador só pode avaliar cada produto uma vez
  UNIQUE (product_id, user_id)
);

-- Índices para performance
CREATE INDEX IF NOT EXISTS idx_reviews_product ON product_reviews(product_id);
CREATE INDEX IF NOT EXISTS idx_reviews_user    ON product_reviews(user_id);
CREATE INDEX IF NOT EXISTS idx_reviews_approved ON product_reviews(product_id, is_approved);

-- ============================================================
-- Row Level Security (RLS)
-- ============================================================

ALTER TABLE product_reviews ENABLE ROW LEVEL SECURITY;

-- Qualquer pessoa pode ler avaliações aprovadas
CREATE POLICY "reviews_select_public"
  ON product_reviews FOR SELECT
  USING (is_approved = true);

-- Utilizador autenticado pode inserir a sua própria avaliação
CREATE POLICY "reviews_insert_own"
  ON product_reviews FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

-- Utilizador pode actualizar a sua própria avaliação
CREATE POLICY "reviews_update_own"
  ON product_reviews FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id);

-- Utilizador pode apagar a sua própria avaliação
CREATE POLICY "reviews_delete_own"
  ON product_reviews FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);

-- ============================================================
-- Vista pública com nome do utilizador (via profiles)
-- Nota: requer que a tabela "profiles" tenha "full_name"
-- ============================================================

-- Já funciona via JOIN no select:
-- .select('*, profiles(full_name)')
-- desde que profiles tenha RLS que permita leitura pública
-- ============================================================
