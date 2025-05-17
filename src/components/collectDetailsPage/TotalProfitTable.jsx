import React from 'react';
import shortline from "/assets/images/collect-details-pages/short-line.svg";

function TotalProfitTable({ entries }) {
  const productMap = {
    tshirt: { label: 'T-Shirt', baseCost: 150 },
    bags: { label: 'Bag', baseCost: 120 },
    cups: { label: 'Cup', baseCost: 100 },
  };

  const calculateProfit = (type, price) => {
    const base = productMap[type]?.baseCost || 0;
    return price - base;
  };

  const totalProfit = (entries || []).reduce((acc, item) => {
    const profitPerUnit = calculateProfit(item.type, item.price || 0);
    return acc + profitPerUnit * (item.quantity || 0);
  }, 0);

  return (
    <div className='w-[560px] h-[750px] bg-white rounded-lg shadow-xl p-4 items-center'>
      <h1 className='text-xl font-semibold mb-2'>Total Profit</h1>

      <div className='flex flex-col justify-center w-[512px] h-[104px]'>
        <h2 className='text-5xl font-bold text-primary-blue-500 mb-1'>
          {totalProfit.toLocaleString()} THB
        </h2>
        <p className='mt-1'>
          Total Profit from All Items per Campaign
        </p>
      </div>

      <h2 className='font-semibold text-xl my-2'>Profit by Item</h2>

      <div className='flex flex-col justify-center items-center w-[550px] h-[450px] overflow-y-auto'>
        {(entries || []).map((item, index) => {
          const product = productMap[item.type];
          const profitPerUnit = calculateProfit(item.type, item.price || 0);
          const itemTotal = profitPerUnit * (item.quantity || 0);

          return (
            <React.Fragment key={index}>
              <div className='flex justify-between w-[512px] h-[82px] mt-4'>
                <div>
                  <h2 className='font-semibold text-xl'>Custommike?</h2>
                  <p>{product?.label}</p>
                  <p>{item.price || 0} THB</p>
                </div>
                <p>{item.quantity || 0} items</p>
                <p className='font-bold text-xl text-primary-blue-500'>
                  {itemTotal.toLocaleString()} THB
                </p>
              </div>
              <div>
                <img src={shortline} alt="divider" />
              </div>
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
}


TotalProfitTable.defaultProps = {
  entries: [],
};

export default TotalProfitTable;
