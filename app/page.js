import Header from "@/components/Header";
import Featured from "@/components/Featured";
import { Product } from "@/models/Product";
import dbConnect from "@/lib/dbConnect";
import NewProducts from "@/components/NewProducts";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default async function Home() {
  const productsData = await fetchProducts();
  return (
    <main className="w-full bg-gray-100">
      <Header />
      {/* <div className="pt-[10rem] bg-black"></div> */}
      <Featured product={productsData.featuredProduct} />
      <NewProducts products={productsData.newProducts} />
      <ToastContainer position="top-center" autoClose={3000} />
    </main>
  );
}

export async function fetchProducts() {
  const featuredProductId = '66915c66d7b59c933f7e3407';
  await dbConnect();
  const featuredProduct = await Product.findById(featuredProductId).lean();
  const newProducts = await Product.find({}, null, { sort: { '_id': -1 }, limit: 10 }).lean();

  // Convert ObjectId to string
  featuredProduct._id = featuredProduct._id.toString();

  // Remove any complex fields or convert them to plain objects
  const sanitizedFeaturedProduct = JSON.parse(JSON.stringify(featuredProduct));
  const sanitizedNewProducts = newProducts.map(product => {
    product._id = product._id.toString();
    return JSON.parse(JSON.stringify(product));
  });

  return {
    featuredProduct: sanitizedFeaturedProduct,
    newProducts: sanitizedNewProducts
  };
}
