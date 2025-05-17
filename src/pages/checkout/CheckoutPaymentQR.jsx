import React from 'react'

const CheckoutPaymentQR = ({orderId = "123456789", orderValue=1234}) => {
  return (
    <div>
      <article>
            <div className="flex flex-col justify-center items-center mx-auto">
                <h3 className="text-[2rem] font-semibold text-center">PromtPay QR Code</h3>
                <div className="mt-[51px] mb-[40px] h-[684px] w-[508px] rounded-3xl text-center shadow-xl outline-1 outline-[#A1A1AA]">
                    <img src="/assets/images/ci-qrpayment-img-01 1-01.svg" className="px-[153.5px] py-[8px] bg-[#1A3763] rounded-t-3xl"/>
                    <img src="/assets/images/PromptPay-logo 1-01.svg" className="w-full mt-[24px] mb-[40px] items-center px-[172px]"/>
                    <img src="/assets/images/QR_code.png" className="w-[318px] h-[320px] mx-[95px] shadow-lg mb-[40px]"/>
                    <p className="mb-[8px] text-lg"><span className="font-semibold">Order #</span>{orderId}</p>
                    <p className="font-semibold text-lg">{`${orderValue} THB`}</p>
                </div>
                <div className="mb-[271px] w-[664px]">
                    <h3 className="text-[2rem] font-[700] mb-[24px]">How to pay with QR PromptPay</h3>
                    <div className="flex items-start mb-4">
                      <span className="w-6 text-2xl font-[500]">1.</span>
                      <p className="text-2xl font-[500]">Open your banking application and select the option to scan a QR Code.</p>
                    </div>
                    <div className="flex items-start mb-4">
                      <span className="w-6 text-2xl font-[500]">2.</span>
                      <p className="text-2xl font-[500]">After scanning the QR Code, please verify the payment amount.</p>
                    </div>
                    <div className="flex items-start">
                      <span className="w-6 text-2xl font-[500]">3.</span>
                      <p className="text-2xl font-[500]">Confirm the payment.</p>
                    </div>
                </div>
            </div>
          </article>
    </div>
  )
}

export default CheckoutPaymentQR