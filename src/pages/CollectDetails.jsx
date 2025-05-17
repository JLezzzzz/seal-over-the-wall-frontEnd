import React from "react";
import { Outlet } from "react-router-dom";
import NextStepButton from "../components/createDesignPage/NextStepButton";
import BackButton from "../components/collectDetailsPage/BackButton";
import PriceAndStockTable from "../components/collectDetailsPage/PriceAndStockTable";
import TotalProfitTable from "../components/collectDetailsPage/TotalProfitTable";
import PromotionCampaign from "../components/collectDetailsPage/PromotionCampaign";

function CollectDetails({ createData, onNext, onBack, updateCreateData, step }) {
  const previews = createData?.createdesign?.previewImages || [];

  const [productEntries, setProductEntries] = React.useState(
    previews.map((p) => {
      const typeMatch = ["tshirt", "bags", "cups"].find((type) => p.url.includes(type));
      return {
        type: typeMatch,
        color: p.color,
        url: p.url,
        price: 199,
        quantity: 0
      };
    })
  );

  const buildProductPayload = () => {
    return productEntries.map((entry) => ({
      styleName: "Custommike",
      productType: entry.type,
      price: entry.price,
      sizes: ["S", "M", "L"],
      colors: [entry.color],
      tag: [],
      images: [entry.url],
      description: ""
    }));
  };

  const handleNext = (e) => {
    e.preventDefault();
    const allProducts = buildProductPayload();
    updateCreateData({ collectdetails: { productList: allProducts } });
    onNext();
  };

  return (
    <form>
      <div className="flex flex-col items-center">
        <div className="w-full mb-10 pl-[288px]">
          <h1 className="text-4xl font-bold">Collect Details</h1>
          <p className="text-lg mt-4 mb-6">
            Okay, let's get your product ready to shine! Tell us the price and how many you've got...
          </p>
          <div className="flex justify-end items-center gap-4 pr-[152px] mt-1.5 ">
            <BackButton onBack={onBack} />
            <NextStepButton onNext={handleNext} step={step} />
          </div>
        </div>

        <div className="flex justify-center gap-15 mx-[152px] mt-3.5 p-1.5">
          <PriceAndStockTable entries={productEntries} setEntries={setProductEntries} />
          <TotalProfitTable entries={productEntries} />
        </div>

        <div className="w-full flex justify-center items-center mt-10 mb-10">
          <PromotionCampaign />
        </div>

        <Outlet />
      </div>
    </form>
  );
}

export default CollectDetails;
