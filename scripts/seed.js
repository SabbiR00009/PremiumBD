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

const img = (bg, text) =>
  `https://placehold.co/600x600/${bg}/ffffff.png?text=${encodeURIComponent(text)}`;

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
  await Product.create([
    { name: 'Dior Rouge Lipstick — 999 Velvet', description: 'Iconic couture red lipstick with 16h comfort wear and floral-infused care.', price: 6500, category: 'Cosmetics', brand: 'Dior', origin: 'France', image: img('9f1239', 'Dior Rouge 999'), stock: 15, rating: 4.8, reviews: 24 },
    { name: 'Estée Lauder Advanced Night Repair 50ml', description: 'The #1 repair serum — reduces the look of multiple signs of ageing overnight.', price: 12500, category: 'Skincare', brand: 'Estée Lauder', origin: 'USA', image: img('6b21a8', 'Night Repair'), stock: 10, rating: 4.9, reviews: 41 },
    { name: 'Chanel No.5 Eau de Parfum 100ml', description: 'The timeless floral-aldehyde fragrance in its most iconic form.', price: 24500, category: 'Fragrance', brand: 'Chanel', origin: 'France', image: img('92400e', 'Chanel No.5'), stock: 6, rating: 5, reviews: 18 },
    { name: 'MAC Studio Fix Fluid Foundation NC42', description: 'Medium-to-full buildable coverage with a natural matte finish, SPF 15.', price: 4800, category: 'Cosmetics', brand: 'MAC', origin: 'USA', image: img('1c1917', 'Studio Fix'), stock: 22, rating: 4.6, reviews: 33 },
    { name: 'The Ordinary Niacinamide 10% + Zinc 1%', description: 'High-strength blemish and congestion formula, fragrance free.', price: 1850, category: 'Skincare', brand: 'The Ordinary', origin: 'UK', image: img('374151', 'Niacinamide'), stock: 40, rating: 4.5, reviews: 57 },
    { name: 'Gucci GG Marmont Leather Belt', description: 'Genuine leather belt with the double G buckle — made in Italy.', price: 38500, category: 'Fashion', brand: 'Gucci', origin: 'Italy', image: img('166534', 'GG Belt'), stock: 4, rating: 4.7, reviews: 9 },
    { name: 'Ray-Ban Aviator Classic Gold', description: 'The original pilot sunglasses with G-15 green lenses and gold frame.', price: 16800, category: 'Fashion', brand: 'Ray-Ban', origin: 'Italy', image: img('a16207', 'Aviator'), stock: 12, rating: 4.8, reviews: 27 },
    { name: 'Nivea Soft Moisturising Cream 200ml (German)', description: 'Original German formula with jojoba oil and vitamin E for face, body and hands.', price: 1200, category: 'Skincare', brand: 'Nivea', origin: 'Germany', image: img('1d4ed8', 'Nivea Soft'), stock: 3, rating: 4.4, reviews: 62 },
  ]);

  console.log('\n✅ Seed complete!');
  console.log('  Admin     admin@premiumbd.com    / Admin@123');
  console.log('  Customer  customer@premiumbd.com / Customer@123');
  console.log('  8 products created.');
  await mongoose.disconnect();
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
