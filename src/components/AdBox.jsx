import React from 'react'

export default function AdBox() {
  return (
    <div className="flex justify-center mb-[160px]">
        <div className="flex w-[1616px] h-[464px] gap-[14.67px]">
            <div className="relative w-[435.592px] h-[464px]">
                <img src="/assets/images/Galaxie-cometes-Terre.png"/>
                <div className="absolute bottom-4 right-4 w-[175px]">
                    <p>The new design</p>
                    <h3 className="text-[1.5rem] font-bold leading-7">Galaxie, cometes, Terre</h3>
                    <p>499 THB</p>
                    <button className="w-full h-[44px] border-2 rounded-4xl mt-[12px] bg-white hover:scale-105 duration-300 hover:cursor-pointer">Add to Cart</button>
                </div>
            </div>
            <div className="relative w-[309.333px] h-[464px]">
                <img src="/assets/images/you are not immune2.jpg" className="rounded-3xl" />
                <div className="absolute top-4 left-4">
                    <p className="w-full">Limited-edition garments</p>
                    <div className="w-[175px]">
                        <h3 className="text-[1.5rem] font-bold leading-7">you are not immue</h3>
                        <p>499 THB</p>
                    </div>
                </div>
                <div className="absolute bottom-4 right-4">
                    <button className="w-[175px] h-[44px] border-2 rounded-4xl mt-[12px] bg-white hover:scale-105 duration-300 hover:cursor-pointer">Add to Cart</button>
                </div>
            </div>
            <div className="flex flex-col w-[838.82px] gap-[14.67px]">
                <div className="relative w-[839px] h-[216px]">
                    <img src="/assets/images/NewArtist-Collaboration-Collection (1).jpg" className="rounded-3xl" />
                    <div className="absolute top-4 left-4 w-[175px]">
                    <h3 className="text-[1.5rem] font-bold leading-7">New Artist Collaboration Colection</h3>
                    <p className="font-semibold">April 2025</p>
                </div>
                </div>
                <div className="flex relative">
                    <div className="flex rounded-3xl gap-[16px] absolute bg-white">
                        <div className="w-[232px] h-[232px]">
                            <img src="/assets/images/own lane.png" />
                        </div>
                        <div className="w-[232px] h-[232px]">
                            <img src="/assets/images/just keep running.png" className="rounded-3xl"/>
                        </div>
                    </div>
                    <div className="flex flex-col justify-center items-end bg-primary-blue-300 rounded-3xl text-primary-blue-500 w-[839px] h-[232px] pr-[32px]">
                        <div className="flex items-center">
                            <div className="w-[145px] mr-[16px]">
                                <h2 className="text-[2rem] font-bold">Last Day!</h2>
                                <p className="text-xs">New Season, New Styles Online Only!</p>
                            </div>
                            <div className="flex text-center items-center">
                                <h2 className="text-[4.75rem] font-bold ">50</h2>
                                <div className="flex flex-col">
                                    <p className="text-[2rem]">%</p>
                                    <p>OFF</p>
                                </div>
                            </div>
                        </div>
                        <div className="flex w-full justify-end pr-[49px]">
                            <button className="w-[197px] h-[60px] text-[1.25rem] rounded-4xl bg-primary-blue-500 text-white hover:scale-105 duration-300 hover:cursor-pointer">Shop Now</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}
