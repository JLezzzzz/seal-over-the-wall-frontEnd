import React from "react";
import { Outlet } from "react-router-dom";
import NextStepButton from "../components/createDesignPage/NextStepButton";
import BackButton from "../components/collectDetailsPage/BackButton";
import iconArrowLeft from "/assets/images/expressAndPublish/iconArrowLeft.png";
import iconArrowRight from "/assets/images/preview/iconArrowRight.png";
import logoCustommike from "/assets/images/preview/custommike-navbar-logo.svg";
import logoResponsible from "/assets/images/preview/Responsible.svg";
import logoEco from "/assets/images/preview/ECO.svg";
import logoOrganic from "/assets/images/preview/Organic.svg";
import iconIg from "/assets/images/preview/icon-ig.svg";
import iconX from "/assets/images/preview/icon-x.svg";
import iconFb from "/assets/images/preview/icon-fb.svg";
import uploadProduct from "../services/product";


const Preview = ({ onNext, onBack, createData, step }) => {
  const products = Array.isArray(createData?.expressandpublish) ? createData.expressandpublish : [];
  const productList = Array.isArray(createData?.collectdetails?.productList) ? createData.collectdetails.productList : [];
  const artistName = createData?.collectdetails?.artistName || "Unknown Artist";
  const collectionTags = createData?.collectdetails?.tags || [];

  const pricesByType = productList.reduce((acc, item) => {
    acc[item.productType] = item.price;
    return acc;
  }, {});

  const firstProduct = products[0] || {};
  const price = pricesByType[firstProduct.type] || "N/A";

  const handleNext = async () => {
    const payload = {
      styleName: firstProduct.productName || "Untitled",
      productType: firstProduct.type || "unknown",
      description: firstProduct.concept || "No concept provided",
      price,
      sizes: ['S', 'M', 'L'],
      colors: ['#ffffff', '#5A5959', '#202020', '#334DD8'],
      tag: collectionTags,
      images: firstProduct.images?.map(img => img.url) || []
    };

    try {
      const response = await uploadProduct(payload);

      onNext();
    } catch (err) {
      console.error("❌ Error submitting product:", err.response?.data || err.message);
      alert("Product submission failed. Check console.");
    }
  };

  return (
    <div className="flex flex-col items-center">
      <div className="w-full mb-10 pl-[288px]">
        <h1 className="text-4xl font-bold">Preview</h1>
        <p className="text-lg mt-4 mb-6">
          Preview your design before publishing.
          <br />
          This page will display the image, color, size, product type, and description you provided earlier.
        </p>
        <div className="flex justify-end items-center gap-4 pr-[128px] mt-1.5 ">
          <BackButton onBack={onBack} />
          <NextStepButton onNext={handleNext} step={step} />
        </div>
      </div>

      {/* Display preview and metadata */}
      <div className="w-full px-[152px]">
        <div className="mb-33">
          <div className="mt-2 flex items-center">
            <div className="flex flex-col gap-4 ml-34 mr-72" />
            <img src={firstProduct.images?.[0]?.url} alt={firstProduct.productName} className="w-185 h-185" />
          </div>

          <div className="mt-4 flex flex-row overflow-x-auto items-center">
            <div className="gap-4 flex flex-row">
              {firstProduct.images?.slice(0, 4).map((img, idx) => (
                <div key={idx} className="bg-white w-97 h-58 rounded-lg border border-[#DBDBDC] shadow-md flex items-center justify-center relative">
                  {idx === 0 && (
                    <img src={iconArrowLeft} alt="arrow left" className="h-6 w-3 absolute left-4 top-1/2 transform -translate-y-1/2" />
                  )}
                  <button className="h-full w-full flex items-center justify-center cursor-pointer">
                    <img src={img.url} alt="Preview" className="h-full max-w-full object-contain" />
                  </button>
                  {idx === 3 && (
                    <img src={iconArrowRight} alt="arrow right" className="h-6 w-3 absolute right-4 top-1/2 transform -translate-y-1/2" />
                  )}
                </div>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-8 pb-8 pt-12 border-b-1 border-gray-200">
            <div className="flex flex-col">
              <img src={logoCustommike} alt="Custommike logo" className="w-[272px]" />
              <p className="text-xl font-semibold">Create Collect and Express</p>
            </div>
            <div className="flex gap-4">
              <img src={logoResponsible} alt="Responsible" className="h-[56px]" />
              <img src={logoEco} alt="Eco" className="h-[56px]" />
              <img src={logoOrganic} alt="Organic" className="h-[56px]" />
            </div>
          </div>

          <div className="flex justify-between items-center p-4 border-b-1 border-gray-200">
            <div className="flex items-center">
              <div className="w-14 h-14 bg-[#334DD8] rounded-full text-white flex items-center justify-center text-2xl font-semibold">
                {artistName.substring(0, 2).toUpperCase()}
              </div>
              <p className="pl-4 text-2xl font-semibold">{artistName}</p>
              <button className="bg-[#334DD8] px-12 py-2 rounded-full text-white ml-20">Follow</button>
            </div>

            <div className="w-1/2">
              <p className="text-xl mt-6 w-190 wrap-text">
                {firstProduct.concept || "No concept description provided."}
              </p>
              <div className="flex gap-5 mt-4 text-xl font-semibold">
                <p className="flex items-center gap-2">
                  <img src={iconIg} alt="Instagram Icon" /> {artistName}
                </p>
                <p className="flex items-center gap-2">
                  <img src={iconX} alt="X Icon" /> {artistName}
                </p>
                <p className="flex items-center gap-2">
                  <img src={iconFb} alt="Facebook Icon" /> {artistName}
                </p>
              </div>
            </div>
          </div>

          <div className="flex justify-between py-8">
            <div>
              <h5 className="text-[40px] font-semibold">{firstProduct.productName}</h5>
              <p className="text-4xl font-bold mt-4">{price} THB</p>
              <div className="flex gap-4 mt-6">
                <p className="text-2xl font-semibold">Sizes</p>
                <button className="underline">View size chart</button>
              </div>
              <div className="flex gap-4 mt-4">
                <button className="w-12 h-10 rounded-md flex items-center justify-center border-2 text-xl font-semibold">S</button>
                <button className="w-12 h-10 rounded-md flex items-center justify-center border-2 text-xl font-semibold">M</button>
                <button className="w-12 h-10 rounded-md flex items-center justify-center border-2 text-xl font-semibold">L</button>
              </div>
              <p className="text-2xl font-semibold mt-6">Colors</p>
              <div className="flex gap-4 mt-4">
                <button className="w-10 h-10 rounded-full border-1 bg-[#ffffff]"></button>
                <button className="w-10 h-10 rounded-full bg-[#5A5959]"></button>
                <button className="w-10 h-10 rounded-full bg-black"></button>
                <button className="w-10 h-10 rounded-full bg-[#334DD8]"></button>
              </div>
            </div>

            <div className="w-1/2">
              <h5 className="text-2xl font-semibold">Print areas</h5>
              <div className="flex flex-wrap gap-4 mt-6">
                {collectionTags.map((tag, idx) => (
                  <button
                    key={idx}
                    className="bg-[#E1E1E4] text-[#202020] text-xl font-medium px-2 py-2 rounded-sm"
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <Outlet />
    </div>
  );
};

export default Preview;
