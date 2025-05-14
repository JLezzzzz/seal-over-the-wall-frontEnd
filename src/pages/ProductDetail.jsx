import { useEffect, useState } from "react";
import { RiArrowRightSLine } from "react-icons/ri";
import { useParams } from "react-router-dom";
import logoBackShirt from "../assets/images/productDetail/back.svg";
import fast from "../assets/images/productDetail/fast.svg";
import logoFrontShirt from "../assets/images/productDetail/front.svg";
import park from "../assets/images/productDetail/park.svg";
import thaiFlag from "../assets/images/productDetail/thai-flag.svg";
import wash from "../assets/images/productDetail/Wash.svg";
import BreadcrumbTop from "../components/mainMenu/BreadcrumbTop";
import Creator from "../components/ProductDetailPage/creator";
import ProductPreview from "../components/ProductDetailPage/ProductPreview";
import ProductRelate from "../components/ProductDetailPage/ProductRelate";
import SizeSelector from "../components/ProductDetailPage/SizeSelector";
import FavoriteMenu from "../components/productPage/FavoriteMenu";
import { Skeleton } from "../components/ui/skeleton"; // Corrected import path and removed extra text
import { useAuth } from "../context/AuthContext"; // Import useAuth
import { getProductById } from "../services/product";

const ProductDetail = () => {
  const { productId } = useParams();
  const [selectedSize, setSelectedSize] = useState(null); // Initialize selectedSize to null
  const [selectedColor, setSelectedColor] = useState(null); // Add state for selected color
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const { addItemToCart } = useAuth(); // Get addItemToCart from useAuth

  const fetchProductById = async () => {
    setLoading(true)
    setError(null);
    try {
      const product = await getProductById(productId);
      console.log(product);
      setProduct(product);
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchProductById();
  }, [productId])


  return (
    <>
      <div className="mt-25 mb-4 pl-10">
        <BreadcrumbTop />
      </div>

      {/* ถ้าโหลดของอยู่ให้โชว์ Skeleton loading ขึ้นมา */}
      {loading ? (
        <div className="flex mx-auto w-full flex-col items-center justify-center py-4">
          <div className="w-[15rem] max-w-[400px] mx-auto mb-4">
            <Skeleton className="h-[15rem] w-full rounded-lg" />
          </div>

          <div className="mt-4 w-full max-w-[400px] mx-auto">
            <div className="flex gap-2 my-1">
              {Array.from({ length: 5 }).map((_, index) => (
                <Skeleton key={index} className="flex-1 h-[11rem] rounded-lg" />
              ))}
            </div>
          </div>
        </div>
      ) : <ProductPreview images={product.images} />}

      <section className="w-400 mx-auto">
        <Creator />

        <div className="flex justify-between py-8">
          <div>
            <h5 className="text-[40px] font-semibold">{product.title}</h5>
            <p className="text-2xl mt-4">{product.price} THB</p>
            <div className="flex gap-4 mt-6">
              <p className="text-2xl font-semibold">Sizes</p>
              <p className="underline">View size chart</p>
            </div>
            <div className="flex gap-4 mt-4">
              {product?.sizes?.map((size) => ( // Dynamically render sizes
                <SizeSelector key={size} size={size} className={`${selectedSize === size ? 'border-blue-500' : 'border-gray-300'}`} onClick={() => setSelectedSize(size)} />
              ))}
            </div>
            <p className="text-2xl font-semibold mt-6">Colors</p>
            <div className="flex gap-4 mt-4">
              {product?.colors?.map((color) => ( // Dynamically render colors
                <div
                  key={color}
                  className={`w-10 h-10 rounded-full cursor-pointer ${selectedColor === color ? 'border-3 border-blue-500' : 'border-1'}`} // Add selection styling
                  style={{ backgroundColor: color }} // Use color from data
                  onClick={() => setSelectedColor(color)} // Update selected color on click
                ></div>
              ))}
            </div>
          </div>

          <div className="w-1/2">
            <h5 className="text-2xl font-semibold">Print areas</h5>
            <div className="flex gap-8">
              <img
                src={logoFrontShirt}
                alt=""
                className="h-[72px] w-auto"
              />
              <img
                src={logoBackShirt}
                alt=""
                className="h-[72px] w-auto"
              />
            </div>
            <p className="text-xl mt-6">
              30% of the money made from this campaign will be donated to Shelter,
              a TH based housing charity. Designed by @Artists Lalala on
              instagram.
            </p>
            <button className="p-2 rounded-md border-1 border-gray-200 mt-2">
              Read More
            </button>
            <div className="flex gap-4 mt-6">
              <button className="p-2 rounded-md bg-gray-300 text-xl">custom</button>
              <button className="p-2 rounded-md bg-gray-300 text-xl">t-shirt</button>
              <button className="p-2 rounded-md bg-gray-300 text-xl">
                collection
              </button>
              <button className="p-2 rounded-md bg-gray-300 text-xl">
                Artists Lalala
              </button>
            </div>
            <div className="flex gap-4 justify-end mt-12">
              <button
                // className="bg-[#334DD8] px-12 py-2 rounded-full text-white"
                className="bg-primary-blue-500 hover:bg-primary-blue-700 px-12 py-2 rounded-full text-white cursor-pointer active:bg-primary-blue-500"
                onClick={() => { // Add onClick handler
                  if (!selectedSize || !selectedColor) {
                    alert('Please select a size and color.'); // Alert if size or color is not selected
                    return;
                  }

                  const item = { // Construct item object
                    productId: product._id,
                    unitPrice: product.price,
                    selectedImage: product.images[0],
                    selectedSize: selectedSize,
                    selectedColor: selectedColor,
                    quantity: 1, // Default quantity to 1
                  };

                  addItemToCart(item); // Call addItemToCart
                  alert('Item added to cart!'); // Alert on success
                }}
              >
                Add to cart
              </button>
              < FavoriteMenu />
            </div>
          </div>
        </div>

        <div className="flex p-4 border-1 rounded-2xl">
          <div className="w-2/5 px-10 border-r-1">
            <img src={wash} alt="" className="inline w-12" />
            <h6 className="inline text-2xl font-semibold">Garment care</h6>
            <p className="text-xl">
              Love your garment and it will love you back. Being gentle is easy
              and better for the planet, it also protects the print and helps
              maintain shape and colour for longer.
            </p>
            <ul className="mt-2 ">
              <li className=" flex item-center" >
                <span className=" text-xl align-middle"><RiArrowRightSLine /></span>
                Wash garment inside out</li>
              <li className=" flex item-center">
                <span className=" text-xl align-middle"><RiArrowRightSLine /></span> Only wash your garment on a cold cycle</li>
              <li className=" flex item-center">
                <span className=" text-xl align-middle"><RiArrowRightSLine /></span> Do not tumble dry (it’s the worst)</li>
              <li className=" flex item-center">
                <span className=" text-xl align-middle"><RiArrowRightSLine /></span> Iron your garment inside out</li>
            </ul>
          </div>
          <div className="w-3/5 pl-20 pr-10">
            <div className="flex gap-8 border-b-1 pb-4">
              <div>
                <img src={park} alt="" className="inline w-12" />
                <h6 className="inline text-2xl font-semibold">
                  Most shipping options
                </h6>
                <p className="text-xl">
                  From <strong className="text-2xl font-semibold">60 THB</strong>
                </p>
                <p>Choose from our Economy or Standard shipping</p>
              </div>
              <div>
                <img src={fast} alt="" className="inline w-12" />
                <h6 className="inline text-2xl font-semibold">Fastest Delivery</h6>
                <p className="text-xl">1 day!</p>
                <p>
                  Order optimized based on customer location<br />
                  (for Bangkok orders only)
                </p>
              </div>
            </div>
            <div className="mt-4">
              <h6 className="text-xl">Location</h6>
              <div className="flex gap-2 items-center">
                <img
                  src={thaiFlag}
                  alt=""
                  className="w-6 h-auto mt-2"
                />
                <p>Thailand</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <ProductRelate />

    </>
  )
}
export default ProductDetail