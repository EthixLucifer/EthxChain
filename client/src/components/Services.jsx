import { BsShieldFillCheck } from 'react-icons/bs';
import { BiAccessibility, BiSearchAlt } from "react-icons/bi";
import { Ri24HoursFill, Ri4KFill, RiArrowUpLine, RiHeart2Fill } from "react-icons/ri";
const ServiceCard = ({ color, title, icon, subtitle }) => (
    <div className='flex flex-row justify-start items-center white-glassmorphism p-3 m-2 cursor-pointer hover:shadow-xl mt-5'>
        <div className={`w-10 h-10 rounded-full flex justify-center items-center ${color} `}>
            {icon}
        </div>
        <div className='ml-5 flex flex-col flex-1 '>
            <h1 className='mt-2 text-white text-lg'>{title}</h1>
            <p className='mt-2 text-white text-sm md:w-9/12'>{subtitle}</p>
        </div>
    </div>
);
const Services = () => {
    return (
        <div className='flex flex-col  md:flex-row w-full justify-center items-center gradient-bg-services'>
            <div className='flex mf:flex-row flex-col items-center justify-between md:p-20 py-12 px-4'>

                <div className='flex-1 flex flex-col justify-start items-start'>

                    <h1 className='text-white text-3xl sm:text-5xl py-2 '> Services that We
                        <br />
                        Continue to Improve
                    </h1>
                </div>

            </div>
            <div className='flex-1 flex-col justify-start items-center sm:mt-2 md:mt-3 mt-5'>
                <ServiceCard
                    color="bg-[#2952e3]"
                    title=" Security"
                    icon={<BsShieldFillCheck fontSize={21} className="text-white"
                    />}
                        subtitle=" Security is  Our Priority"
                />
                <ServiceCard
                    color="bg-[#8945F8]"
                    title=" Exchange Rates"
                    icon={<BiSearchAlt fontSize={21} className="text-white"
                    />}
                        subtitle="Get Compelling Exchange Rates with EthxChain"
                />
                <ServiceCard
                    color="bg-[#F84550]"
                    title=" Speed"
                    icon={<RiHeart2Fill fontSize={21} className="text-white"
                    />}
                        subtitle="Execute Transactions at a Faster Pace"
                />
            </div>
        </div >
    );
}

export default Services;