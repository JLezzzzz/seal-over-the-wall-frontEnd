import React, { useState } from 'react';
import ProductSelection from '../components/createDesignPage/ProductSelection';
import ColorSelection from '../components/createDesignPage/ColorSelection';
import TShirtTemplate from '../components/createDesignPage/TShirtTemplate';
import BagTemplate from '../components/createDesignPage/BagTemplate';
import CupTemplate from '../components/createDesignPage/CupTemplate';
import UploadDesignBox from '../components/createDesignPage/UploadDesignBox';
import SelectedProduct from '../components/createDesignPage/SelectedProduct';
import Walkthrough from '../components/createDesignPage/Walkthrough';
import NextStepButton from '../components/createDesignPage/NextStepButton';
import SaveButton from '../components/createDesignPage/SaveButton';
import { createdProduct } from "../services/created";
import { motion, AnimatePresence } from 'framer-motion';
import html2canvas from 'html2canvas';
import ModalAlert from '../components/createDesignPage/ModalAlert';

function CreateDesign({ onNext, updateCreateData }) {
  const [selectedProduct, setSelectedProduct] = useState('tshirt');
  const [designURL, setDesignURL] = useState('');
  const [uploadedPreviews, setUploadedPreviews] = useState([]);
  const [productTypes, setProductTypes] = useState([]);
  const [selectedColors, setSelectedColors] = useState(['white']);
  const [isSaved, setIsSaved] = useState(false);
  const [modal, setModal] = useState({ open: false, title: '', message: '' });

  const CLOUD_NAME = 'dvpnipb6g';
  const UPLOAD_PRESET = 'upload_designs';

  const showModal = (message) => {
    setModal({ open: true, title: "Alert", message });
  };

  const closeModal = () => {
    setModal({ open: false, title: '', message: '' });
  };

  const handleSaveDesign = async () => {
    if (!designURL || selectedColors.length === 0 || !selectedProduct) {
      showModal("Please complete all steps before saving your design.");
      return;
    }

    const originalElements = document.querySelectorAll('.preview-to-capture');
    if (!originalElements.length) {
      showModal('No previews found.');
      return;
    }

    const upscale = 3;
    const tempContainer = document.createElement('div');
    tempContainer.style.position = 'absolute';
    tempContainer.style.top = '-9999px';
    tempContainer.style.left = '-9999px';
    document.body.appendChild(tempContainer);

    const urls = [];

    for (let i = 0; i < originalElements.length; i++) {
      const el = originalElements[i];
      const color = el.getAttribute('data-color') || `color_${i + 1}`;
      const clone = el.cloneNode(true);
      const origWidth = el.offsetWidth;
      const origHeight = el.offsetHeight;

      clone.style.transform = `scale(${upscale})`;
      clone.style.transformOrigin = 'top left';
      clone.style.width = `${origWidth}px`;
      clone.style.height = `${origHeight}px`;
      tempContainer.appendChild(clone);

      try {
        const canvas = await html2canvas(clone, {
          backgroundColor: null,
          useCORS: true,
          scale: 1,
        });

        const finalCanvas = document.createElement('canvas');
        finalCanvas.width = origWidth * upscale;
        finalCanvas.height = origHeight * upscale;
        const ctx = finalCanvas.getContext('2d');
        ctx.drawImage(canvas, 0, 0);

        const blob = await new Promise((resolve) =>
          finalCanvas.toBlob(resolve, 'image/png')
        );

        const formData = new FormData();
        formData.append('file', blob);
        formData.append('upload_preset', UPLOAD_PRESET);
        formData.append('public_id', `final_preview_${selectedProduct}_${color}_${Date.now()}`);

        const res = await fetch(`https://api.cloudinary.com/v1_1/${CLOUD_NAME}/upload`, {
          method: 'POST',
          body: formData,
        });

        const data = await res.json();
        if (data.secure_url) {
          console.log(`✅ Uploaded ${color}: ${data.secure_url}`);
          urls.push({ color, url: data.secure_url });
        } else {
          console.error(`❌ Failed to upload ${color}`);
        }
      } catch (err) {
        console.error(`Error uploading ${color}:`, err);
      }

      tempContainer.removeChild(clone);
    }

    document.body.removeChild(tempContainer);
    setUploadedPreviews(urls);

    // Save selected product type to the list
    if (!productTypes.includes(selectedProduct)) {
      setProductTypes(prev => [...prev, selectedProduct]);
    }

    showModal("Design saved!");
    setIsSaved(true);
  };

  const handleSave = async () => {
    if (!designURL || selectedColors.length === 0 || !selectedProduct) {
      showModal("Please complete all steps before saving.");
      return;
    }

    try {
      const payload = {
        productTypes,
        selectedColors,
        designUrl: designURL,
        previewImages: uploadedPreviews,
        title: "",
        description: "",
        price: 0,
        isPublished: false,
      };

      const result = await createdProduct(payload);
      showModal("Design saved successfully!");
      setIsSaved(true);

      if (updateCreateData) {
        updateCreateData({ createdesign: payload });
      }

      if (onNext) onNext();
    } catch (error) {
      console.error("Save failed:", error);
      showModal("Failed to save design.");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  const renderProductTemplate = () => {
    let TemplateComponent;
    switch (selectedProduct) {
      case 'bags':
        TemplateComponent = <BagTemplate />;
        break;
      case 'cups':
        TemplateComponent = <CupTemplate />;
        break;
      case 'tshirt':
      default:
        TemplateComponent = <TShirtTemplate />;
    }

    return (
      <AnimatePresence mode="wait">
        <motion.div
          key={selectedProduct}
          initial={{ opacity: 0, x: 0 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, x: -10 }}
          transition={{ duration: 0.2 }}
        >
          {TemplateComponent}
        </motion.div>
      </AnimatePresence>
    );
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="step-1 flex justify-center mb-6">
        <ProductSelection
          selected={selectedProduct}
          setSelected={setSelectedProduct}
        />
      </div>

      <div className="absolute w-[1615px] flex justify-center items-center">
        <div className="w-full flex justify-between items-start pr-[127px]">
          <ColorSelection
            productType={selectedProduct}
            selectedColors={selectedColors}
            setSelectedColors={setSelectedColors}
          />
          <div className="flex justify-end items-center gap-4 mt-6">
            <SaveButton
              onSave={handleSaveDesign}
              disabled={!designURL || selectedColors.length === 0 || !selectedProduct}
            />
            <NextStepButton
              onNext={() => {
                if (!isSaved) {
                  showModal("Please save your design before going to the next step.");
                  return;
                }

                if (updateCreateData) {
                  updateCreateData({
                    createdesign: {
                      productTypes,
                      selectedColors,
                      designUrl: designURL,
                      previewImages: uploadedPreviews,
                    },
                  });
                }

                onNext();
              }}
            />
          </div>
        </div>
      </div>

      <motion.div
        className="w-full flex flex-col items-center gap-8 px-4 my-10"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
      >
        <motion.div
          className="absolute z-10 mt-25"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          <UploadDesignBox onUpload={setDesignURL} />
        </motion.div>

        <div className="relative">{renderProductTemplate()}</div>
      </motion.div>

      <motion.div
        className="flex justify-center mt-10"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.5 }}
      >
        <SelectedProduct
          selectedProduct={selectedProduct}
          selectedColors={selectedColors}
          uploadedImage={designURL}
        />
      </motion.div>

      <ModalAlert
        isOpen={modal.open}
        onClose={closeModal}
        title={modal.title}
        message={modal.message}
      />
      <Walkthrough />
    </form>
  );
}

export default CreateDesign;
