import React from "react";
import { Outlet } from "react-router-dom";
import NextStepButton from "../components/createDesignPage/NextStepButton";
import BackButton from "../components/collectDetailsPage/BackButton";
import PriceAndStockTable from "../components/collectDetailsPage/PriceAndStockTable";
import TotalProfitTable from "../components/collectDetailsPage/TotalProfitTable";
import PromotionCampaign from "../components/collectDetailsPage/PromotionCampaign";


const CreateDesignLayout = () => {
  return (
    <div className="w-full flex flex-col items-center">



        {/* Placeholder for the stepper */}
        <div className="w-full font-semibold flex justify-center items-center h-16 bg-gray-200 mb-7 text-xl">
            Stepper Placeholder
        </div>
            <div className="w-full mb-10 pl-[288px]">
                <h1 className="text-4xl font-bold">Collect Details</h1>
                <p className="text-lg mt-4 mb-6">
                    Okay, let's get your product ready to shine! Tell us the price and how many you've got. Wanna do a sale? Set it up here! We'll even show your potential
                     <br/>profit per item and the total after our small fee and your costs. Go ahead and fill it in!
                 </p>
                <div className="flex justify-end items-center gap-4 pr-[152px] mt-1.5 ">
                <button>
                <BackButton />
                </button>

                <button >
                <NextStepButton />
                </button>
                </div>
        </div>
        <dev className="flex justify-center gap-15 mx-[152px] mt-3.5 p-1.5">
            <PriceAndStockTable />
            <TotalProfitTable />
        </dev>
        <div className="w-full flex justify-center items-center mt-10 mb-10">
          <PromotionCampaign />
        </div>
      <Outlet />
    </div>
  );
};

export default CreateDesignLayout;
