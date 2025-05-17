import React, { useState } from 'react';
import ProductPrintAreaSelector from './ProductPrintAreaSelector';

function ColorSelection({ productType = 'tshirt', selectedColors, setSelectedColors }) {
  const [selectedAreas, setSelectedAreas] = useState(['frontprint']);

  const colors = [
    { name: 'black', className: 'bg-primary-black transition-all duration-300 ease-in-out hover:scale-110' },
    { name: 'blue', className: 'bg-primary-blue-500 transition-all duration-300 ease-in-out hover:scale-110' },
    { name: 'gray', className: 'bg-secondary-light-gray-500 transition-all duration-300 ease-in-out hover:scale-110' },
    { name: 'white', className: 'bg-primary-white transition-all duration-300 ease-in-out hover:scale-110' },
  ];

  const toggleColor = (colorName) => {
    setSelectedColors((prev) =>
      prev.includes(colorName)
        ? prev.filter((c) => c !== colorName)
        : [...prev, colorName]
    );
  };

  return (
    <div>
      <h2 className="font-semibold text-xl mb-4">Colors</h2>

      <div className="step-4 flex gap-4 mb-6">
        {colors.map((color) => (
          <button
            key={color.name}
            onClick={() => toggleColor(color.name)}
            className={`
              ${color.className}
              rounded-full
              size-[40px]
              cursor-pointer
              transition-all
              duration-300
              ${color.name === 'white' ? 'border border-black' : ''}
              ${selectedColors.includes(color.name) ? 'ring-4 ring-primary-blue-500 ring-offset-2' : ''}
            `}
          />
        ))}
      </div>

      <div className='step-3 mt-[56px]'>
        <ProductPrintAreaSelector
          productType={productType}
          selected={selectedAreas}
          setSelected={setSelectedAreas}
        />
      </div>
    </div>
  );
}


export default ColorSelection;
