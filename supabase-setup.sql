-- =============================================
-- PAG Store - Supabase Database Setup
-- Run this in your Supabase SQL Editor
-- =============================================

-- 1. Create products table
CREATE TABLE IF NOT EXISTS products (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  handle TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  category TEXT DEFAULT '',
  price NUMERIC(10, 2) DEFAULT 0,
  stock INTEGER DEFAULT 0,
  discontinued BOOLEAN DEFAULT FALSE,  -- true = ยกเลิกจำหน่าย
  image_url TEXT DEFAULT '',
  description TEXT DEFAULT '',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. Enable Row Level Security
ALTER TABLE products ENABLE ROW LEVEL SECURITY;

-- 3. Public can read products (no auth needed for customers)
CREATE POLICY "Public can read products"
  ON products FOR SELECT
  USING (true);

-- 4. Only authenticated users (admins) can modify
CREATE POLICY "Admins can update products"
  ON products FOR UPDATE
  TO authenticated
  USING (true);

CREATE POLICY "Admins can insert products"
  ON products FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Admins can delete products"
  ON products FOR DELETE
  TO authenticated
  USING (true);

-- 5. Enable Realtime for products table
ALTER PUBLICATION supabase_realtime ADD TABLE products;

-- 6. Auto-update updated_at
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER products_updated_at
  BEFORE UPDATE ON products
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

-- 7. Seed initial data from CSV
INSERT INTO products (handle, name, category, price, stock) VALUES
  ('rme-lni-2-dc',         'RME LNI-2 DC',           'Accessory',       24990.00, 3),
  ('rme-arc-usb',          'RME ARC USB',             'Accessory',        5990.00, 5),
  ('ups-2',                'RME DPS-2',               'Accessory',       44990.00, 2),
  ('madiface-xt-ii',       'RME MADIface XT II',      'Audio Interface', 99990.00, 1),
  ('rme-digiface-usb',     'RME Digiface USB',        'Audio Interface', 27990.00, 4),
  ('adi-2-4-pro-se',       'RME ADI 2/4 Pro SE',      'Converter',       99990.00, 2),
  ('rme-adi-2-pro-fs-r-be','RME ADI-2 Pro FS R BE',   'Converter',       79990.00, 3),
  ('rme-madiface-usb',     'RME MADIface USB',        'Audio Interface', 36990.00, 2),
  ('rme-12-mic',           'RME 12 Mic',              'Mic-Preamp',     119990.00, 1),
  ('rme-12-mic-d',         'RME 12 Mic-D',            'Mic-Preamp',     139990.00, 1),
  ('rme-digiface-dante',   'RME Digiface Dante',      'Audio Interface', 65990.00, 2),
  ('rme-hdspe-madi-fx',    'RME HDSPe MADI FX',       'Audio Interface', 72990.00, 1),
  ('rme-hdspe-aox-m',      'RME HDSPe AoX-M',         'Audio Interface', 55990.00, 2),
  ('rme-digiface-avb',     'RME Digiface AVB',        'Audio Interface', 42990.00, 3),
  ('rme-adi-2-dac-fs',     'RME ADI-2 Dac FS',        'Converter',       54990.00, 4),
  ('rme-ucx-ii',           'RME Fireface UCX II',     'Audio Interface', 54990.00, 3),
  ('rme-babyface-pro-fs',  'RME Babyface Pro FS',     'Audio Interface', 31990.00, 5),
  ('rme-fireface-ufx-iii', 'RME Fireface UFX III',    'Audio Interface',119990.00, 1),
  ('rme-fireface-802-fs',  'RME Fireface 802 FS',     'Audio Interface', 77990.00, 2),
  ('rme-fireface-ufx-ii',  'RME Fireface UFX II',     'Audio Interface', 97990.00, 1)
ON CONFLICT (handle) DO NOTHING;
