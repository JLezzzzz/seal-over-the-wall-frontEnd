import { useState } from "react";
import { Link } from "react-router";
import { useAuth } from "../../context/AuthContext";
import AddToCart from "../productPage/AddToCart";
import FavoriteMenu from "../productPage/FavoriteMenu";

const ProductRelateCard = ({ item }) => {
  const minRating = 3;
  const maxRating = 5;
  const ratingSteps = (maxRating - minRating) / 0.5 + 1;
  const [randomReviewCount] = useState(Math.floor(Math.random() * 400));
  const [itemRating] = useState(() => {
    const randomStep = Math.floor(Math.random() * ratingSteps);
    return minRating + randomStep * 0.5;
  });
  const [randomIndex] = useState(Math.floor(Math.random() * (item.images?.length || 1)));
  const { addItemToCart } = useAuth();
  return (
    <Link to={`/shop/${item._id}`}>
      <div class="w-full h-auto bg-[#F4F4F5]">
        <div className="relative overflow-hidden ">
          <img
            src={`${item.images?.[randomIndex]}`}
            alt={item.name}
            className="w-full h-auto object-cover"
          />
          <div className="absolute top-2 right-2  z-10 ">
            <FavoriteMenu />
          </div>

        </div>
        <div class="p-4">


          <h6 class="text-2xl">{item.title}</h6>
          <p class="text-xl">{item.price}</p>
          <div class="flex justify-between items-center">
            <div className="flex gap-2  items-center mb-2  justify-center">
              <div className="flex items-center gap-1 text-xs  ">
                {[...Array(5)].map((_, i) => (
                  <i
                    key={i}
                    className={`${i + 1 <= Math.floor(itemRating) // Full star if current star number is less than or equal to the integer part of itemRating
                      ? "fa-solid fa-star text-[#334DD8]"
                      : i < itemRating // Half star if current star index is less than itemRating (and it's not a full star)
                        ? "fa-solid fa-star-half-stroke text-[#334DD8]"
                        : "fa-regular fa-star text-gray-300"
                      }`}
                  ></i>
                ))}
                {/* <span className="text-sm text-gray-600 ml-2">
                  {item.reviews} / 5
                </span> */}
              </div>
              <p className="">( {randomReviewCount} )</p>
            </div>
            <AddToCart item={item} addItemToCart={addItemToCart} random={randomIndex} />
          </div>
        </div>
      </div>
    </Link>
  );
};
export default ProductRelateCard;
