-- ============================================================
-- Adicionar campo color_tag à tabela product_media
-- Permite associar imagens a cores de variantes
-- Executar no Supabase → SQL Editor
-- ============================================================

ALTER TABLE product_media
  ADD COLUMN IF NOT EXISTS color_tag TEXT DEFAULT NULL;

-- color_tag deve corresponder ao valor exacto da variante de cor
-- Ex: 'Castanho', 'Azul', 'Roxo', 'Preto', etc.
-- Se NULL, a imagem aparece sempre (independente da cor seleccionada)
