/* eslint-disable no-console */
/**
 * Seed script — `npm run seed`.
 * Creates the admin account, a demo customer, and 8 premium products.
 * WARNING: clears users, products and orders first.
 */
import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import 'dotenv/config';

if (!process.env.MONGODB_URI || !process.env.DB_NAME) {
  console.error('Missing MONGODB_URI or DB_NAME — copy .env.example to .env first.');
  process.exit(1);
}

const model = (name, collection) =>
  mongoose.model(name, new mongoose.Schema({}, { strict: false, timestamps: true }), collection);

const User = model('User', 'users');
const Product = model('Product', 'products');
const Order = model('Order', 'orders');

// Real product photography from Unsplash's free CDN (all URLs verified live).
const img = (id) => `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=600&q=80`;

async function main() {
  await mongoose.connect(`${process.env.MONGODB_URI}/${process.env.DB_NAME}`);
  console.log('Connected. Clearing collections…');
  await Promise.all([User.deleteMany({}), Product.deleteMany({}), Order.deleteMany({})]);

  console.log('Creating users…');
  await User.create([
    {
      name: 'PremiumBD Admin',
      email: 'admin@premiumbd.com',
      password: bcrypt.hashSync('Admin@123', 12),
      role: 'admin',
    },
    {
      name: 'Demo Customer',
      email: 'customer@premiumbd.com',
      password: bcrypt.hashSync('Customer@123', 12),
      role: 'customer',
    },
  ]);

  console.log('Creating products…');
  const products = await Product.create([
    // ---- Fragrance ----
    { name: 'Chanel No.5 Eau de Parfum 100ml', description: 'The timeless floral-aldehyde fragrance in its most iconic form. Sealed, authentic, imported from France.', price: 24500, category: 'Fragrance', brand: 'Chanel', origin: 'France', image: img('1541643600914-78b084683601'), stock: 6, rating: 5, reviews: 18 },
    { name: 'Versace Eros Eau de Toilette 100ml', description: 'Fresh, woody and intensely masculine — mint, green apple and tonka bean.', price: 9800, category: 'Fragrance', brand: 'Versace', origin: 'Italy', image: img('1523293182086-7651a899d37f'), stock: 14, rating: 4.7, reviews: 31 },
    { name: 'Jo Malone Wood Sage & Sea Salt Cologne 100ml', description: 'Escape the everyday with the windswept freshness of the British coast.', price: 13500, category: 'Fragrance', brand: 'Jo Malone London', origin: 'UK', image: img('1585386959984-a4155224a1ad'), stock: 8, rating: 4.8, reviews: 12 },

    // ---- Skincare ----
    { name: 'Estée Lauder Advanced Night Repair 50ml', description: 'The #1 repair serum — reduces the look of multiple signs of ageing overnight.', price: 12500, category: 'Skincare', brand: 'Estée Lauder', origin: 'USA', image: img('1620916566398-39f1143ab7be'), stock: 10, rating: 4.9, reviews: 41 },
    { name: 'La Mer The Moisturizing Soft Cream 30ml', description: 'Legendary Miracle Broth™ hydration in a soft, fast-absorbing cream.', price: 32000, category: 'Skincare', brand: 'La Mer', origin: 'USA', image: img('1611080626919-7cf5a9dbab5b'), stock: 4, rating: 4.9, reviews: 8 },
    { name: 'The Ordinary Niacinamide 10% + Zinc 1%', description: 'High-strength blemish and congestion formula, fragrance free.', price: 1850, category: 'Skincare', brand: 'The Ordinary', origin: 'UK', image: img('1571781926291-c477ebfd024b'), stock: 40, rating: 4.5, reviews: 57 },
    { name: 'CeraVe Foaming Facial Cleanser 236ml', description: 'Gentle gel cleanser with ceramides and hyaluronic acid for normal to oily skin.', price: 2200, category: 'Skincare', brand: 'CeraVe', origin: 'USA', image: img('1556228720-195a672e8a03'), stock: 25, rating: 4.6, reviews: 48 },

    // ---- Cosmetics ----
    { name: 'Dior Rouge Lipstick — 999 Velvet', description: 'Iconic couture red lipstick with 16h comfort wear and floral-infused care.', price: 6500, category: 'Cosmetics', brand: 'Dior', origin: 'France', image: img('1586769852836-bc069f19e1b6'), stock: 15, rating: 4.8, reviews: 24 },
    { name: 'Charlotte Tilbury Pillow Talk Makeup Set', description: 'The award-winning Pillow Talk look — lipstick, liner and blush in one set.', price: 8900, category: 'Cosmetics', brand: 'Charlotte Tilbury', origin: 'UK', image: img('1596462502278-27bfdc403348'), stock: 9, rating: 4.7, reviews: 19 },
    { name: 'MAC Studio Fix Fluid Foundation NC42', description: 'Medium-to-full buildable coverage with a natural matte finish, SPF 15.', price: 4800, category: 'Cosmetics', brand: 'MAC', origin: 'USA', image: img('1631730359585-38a4935cbec4'), stock: 22, rating: 4.6, reviews: 33 },
    { name: 'Real Techniques Everyday Essentials Brush Set', description: 'Five pro-quality brushes + sponge for base, blush and eyes.', price: 3400, category: 'Cosmetics', brand: 'Real Techniques', origin: 'UK', image: img('1522335789203-aabd1fc54bc9'), stock: 18, rating: 4.4, reviews: 26 },
    { name: 'OPI Nail Lacquer — Big Apple Red', description: 'The classic pure red with OPI’s chip-resistant, high-shine formula.', price: 1600, category: 'Cosmetics', brand: 'OPI', origin: 'USA', image: img('1522337660859-02fbefca4702'), stock: 30, rating: 4.5, reviews: 22 },

    // ---- Fashion ----
    { name: 'Ray-Ban Aviator Classic Gold', description: 'The original pilot sunglasses with G-15 green lenses and gold frame.', price: 16800, category: 'Fashion', brand: 'Ray-Ban', origin: 'Italy', image: img('1572635196237-14b3f281503f'), stock: 12, rating: 4.8, reviews: 27 },
    { name: 'Michael Kors Runway Chronograph Watch', description: 'Gold-tone stainless steel chronograph — the New York power look.', price: 28500, category: 'Fashion', brand: 'Michael Kors', origin: 'USA', image: img('1524592094714-0f0654e20314'), stock: 7, rating: 4.6, reviews: 11 },
    { name: 'Gucci GG Marmont Shoulder Bag', description: 'Matelassé chevron leather with the antique double G — made in Italy.', price: 145000, category: 'Fashion', brand: 'Gucci', origin: 'Italy', image: img('1584917865442-de89df76afd3'), stock: 2, rating: 4.9, reviews: 5 },
    { name: 'Nike Air Max 270 — Triple Black', description: 'Max Air cushioning with a sleek all-black knit upper, imported US release.', price: 14500, category: 'Fashion', brand: 'Nike', origin: 'USA', image: img('1542291026-7eec264c27ff'), stock: 16, rating: 4.7, reviews: 38 },
    { name: 'Zara Floral Midi Dress', description: 'Flowing floral-print midi with V-neck and ruffled hem — European summer line.', price: 5600, category: 'Fashion', brand: 'Zara', origin: 'Europe', image: img('1595777457583-95e059d581b8'), stock: 11, rating: 4.3, reviews: 16 },
    { name: 'Swarovski Crystal Drop Earrings', description: 'Rhodium-plated drop earrings with signature clear Swarovski crystals.', price: 11200, category: 'Fashion', brand: 'Swarovski', origin: 'Europe', image: img('1535632066927-ab7c9ab60908'), stock: 3, rating: 4.8, reviews: 7 },
  ]);

  console.log('\n✅ Seed complete!');
  console.log('  Admin     admin@premiumbd.com    / Admin@123');
  console.log('  Customer  customer@premiumbd.com / Customer@123');
  console.log(`  ${products.length} products created with real photos.`);
  await mongoose.disconnect();
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
