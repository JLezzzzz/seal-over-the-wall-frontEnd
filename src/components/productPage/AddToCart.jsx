
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { OctagonAlert } from "lucide-react";
const AddToCart = ({ item, addItemToCart, random }) => {

  const handleAddToCart = (e) => {
    e.stopPropagation();
    e.preventDefault();
    addItemToCart({
      productId: item._id,
      name: item.title,
      unitPrice: item.price,
      selectedColor: item.colors[random],
      selectedSize: item.sizes[0],
      selectedImage: item.images[random],
      image: item.images?.[random], // Assuming the first image is the main one
      quantity: 1,
    });
  };

  return (
    <div>
      <AlertDialog >
        <AlertDialogTrigger asChild>
          <Button className="px-5 py-2 rounded-full border-1 bg-white hover:bg-primary-blue-500 hover:text-white cursor-pointer" onClick={handleAddToCart}>Add to cart</Button>
        </AlertDialogTrigger>
        <AlertDialogContent className="bg-white">
          <AlertDialogHeader className="items-center">
            <AlertDialogTitle>
              <div className="mb-2 mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-destructive/10">
                <OctagonAlert className="h-7 w-7 text-destructive" />
              </div>
              Product added to your cart?
            </AlertDialogTitle>
            <AlertDialogDescription className="text-[15px] text-center">
              Do you want to go to your cart or continue shopping?
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter className="mt-2 sm:justify-center">
            <AlertDialogCancel className="px-4 py-2 bg-primary-blue-500 text-white rounded-full hover:bg-primary-blue-700">Continue Shopping</AlertDialogCancel>
            <AlertDialogAction
              className="px-4 py-2 bg-white text-black border-1 rounded-full hover:bg-primary-blue-700  hover:text-white"
            >
              Go to Cart
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}
export default AddToCart