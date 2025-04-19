import FavoriteMenu from "./FavoriteMenu";

const ProductCard = ({ item }) => {
  return (
    <>
      <div className="relative w-[248px] h-auto bg-white hover:shadow-lg hover:scale-105 hover:transition duration-300 cursor-pointer ">
        <div className="relative overflow-hidden ">
          <img
            src={item.imageSource}
            alt={item.name}
            className="w-full h-auto object-cover"
          />
<FavoriteMenu className="absolute top-2 right-2 h-8 w-8 z-10" />
        </div>
        <div className="p-4 text-center">
          <h6 className="text-2xl mb-2">{item.name}</h6>
          <p className="text-xl mb-2">{item.price}</p>

          <div className="flex gap-2  items-center mb-2  justify-center">
            <div className="flex items-center gap-1 text-xs  ">
              {[...Array(5)].map((_, i) => (
                <i
                  key={i}
                  className={`${
                    i + 1 <= Math.floor(item.reviews)
                      ? "fa-solid fa-star text-[#334DD8]"
                      : i < item.reviews
                      ? "fa-solid fa-star-half-stroke text-[#334DD8]"
                      : "fa-regular fa-star text-gray-300"
                  }`}
                ></i>
              ))}
              {/* <span className="text-sm text-gray-600 ml-2">
                  {item.reviews} / 5
                </span> */}
            </div>
            <p className="">( {item.reviewCount} )</p>
          </div>

          <button className="px-5 py-2 rounded-full border-1 bg-white hover:bg-[#334DD8] hover:text-white cursor-pointer">
            Add to cart
          </button>
          
        </div>
        
      </div>
    </>
  );
};
export default ProductCard;
