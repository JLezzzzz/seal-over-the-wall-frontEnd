import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// Mockup images
import shirtblack from "/assets/images/Products/shirt/empty/empty-shirt-black-front.png";
import shirtwhite from "/assets/images/Products/shirt/empty/empty-shirt-white-front.png";
import shirtblue from "/assets/images/Products/shirt/empty/empty-shirt-blue-front.png";
import shirtgray from "/assets/images/Products/shirt/empty/empty-shirt-gray-front.png";

import bagblack from "/assets/images/Products/bag/empty/empty-bag-black-front.png";
import bagwhite from "/assets/images/Products/bag/empty/empty-bag-white-front.png";
import bagblue from "/assets/images/Products/bag/empty/empty-bag-blue-front.png";
import baggray from "/assets/images/Products/bag/empty/empty-bag-gray-front.png";

import cupblack from "/assets/images/Products/cup/empty/empty-cup-black-front.png";
import cupwhite from "/assets/images/Products/cup/empty/empty-cup-white-front.png";
import cupblue from "/assets/images/Products/cup/empty/empty-cup-blue-front.png";
import cupgray from "/assets/images/Products/cup/empty/empty-cup-gray-front.png";

// Print area positions
const printAreas = {
  tshirt: { top: '32%', left: '20%', width: '60%', height: '40%' },
  bags: {
    top: '55.76%',
    left: '25.34%',
    width: '45.57%',
    height: '35.97%',
  },
  cups: { top: '40%', left: '29%', width: '40%', height: '30%', transform: 'rotate(-20deg)' },
};


// Product mockup map
const productMockups = {
  tshirt: [
    { color: 'black', src: shirtblack },
    { color: 'blue', src: shirtblue },
    { color: 'gray', src: shirtgray },
    { color: 'white', src: shirtwhite },
  ],
  bags: [
    { color: 'black', src: bagblack },
    { color: 'blue', src: bagblue },
    { color: 'gray', src: baggray },
    { color: 'white', src: bagwhite },
  ],
  cups: [
    { color: 'black', src: cupblack },
    { color: 'blue', src: cupblue },
    { color: 'gray', src: cupgray },
    { color: 'white', src: cupwhite },
  ],
};

function SelectedProduct({ selectedProduct, selectedColors, uploadedImage }) {
  const allMockups = productMockups[selectedProduct] || [];

  const mockups = allMockups.filter((mockup) =>
    selectedColors.includes(mockup.color.toLowerCase())
  );

  return (
    <div className='flex flex-col items-center justify-center w-[1344px] mt-8'>
      <h2 className='font-semibold text-xl capitalize'>
        {selectedProduct} Preview
      </h2>

      <AnimatePresence mode="wait">
        <motion.div
          key={selectedProduct}
          className='flex gap-12 flex-wrap justify-center mt-10'
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -30 }}
          transition={{ duration: 0.4 }}
        >
          {mockups.map(({ color, src }) => (
            <motion.div
              key={color}
              data-color={color}
              className='preview-to-capture relative w-[280px] h-[280px]'
              style={{ aspectRatio: selectedProduct === 'bags' ? '3/4' : '1' }}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.3 }}
              layout

            >
              <img
                src={src}
                alt={`${color} ${selectedProduct}`}
                className='absolute inset-0 w-full h-full object-contain'
              />

              {uploadedImage && (
                <motion.div
                  key={uploadedImage}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 0.85 }}
                  transition={{ duration: 0.4 }}
                  style={{
                    position: 'absolute',
                    zIndex: 5,
                    pointerEvents: 'none',
                    ...printAreas[selectedProduct],
                  }}
                >
                  <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <img
                      src={uploadedImage}
                      alt="Design Overlay"
                      style={{
                        maxWidth: '100%',
                        maxHeight: '100%',
                        objectFit: 'contain',
                        filter: 'contrast(1.2) brightness(0.95)',
                        mixBlendMode: 'multiply',
                      }}
                    />
                  </div>
                </motion.div>
              )}
            </motion.div>
          ))}

          {mockups.length === 0 && (
            <p className="text-gray-500 italic mt-4">
              Please select at least one color
            </p>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

export default SelectedProduct;


