import React, { useContext } from "react";
import { RiH3 } from "react-icons/ri";
import { shortenAddress } from "../utils/shortenAddress";
import TransactionContext from '../context/TransactionContext';
import dummyData from '../utils/dummyData.js';
import useFetch from "../hooks/useFetch";

const TransactionCard = ({ addressTo, addressFrom, timestamp, message, keyword, amount, url }) => {
    const GifUrl = useFetch({ keyword });
    return (
        <div className="bg-[#12101d] m-4 flex flex-1 
     2xl:min-w-[450p]
     2xl:max-w-[500p]
     sm:min-w-[270p]
     sm:max-w-[300p]
     flex-col p-3 rounded-md hover:shadow-2xl
     ">

            <div className="flex flex-col items-center w-full mt-3">
                <div className=" w-full mb-6 p-2">

                    <div className="hover:bg-[#23155a] rounded-md "> {/* div created for onhover effect */}
                        <a href={`https://ropsten.etherscan.io/address/${addressFrom}`} target="_blank" rel="noopener noreferrer">

                            <p className="text-white text-base px-10"> Sender: {shortenAddress(addressFrom)}</p>
                        </a>
                    </div>

                    <div className="hover:bg-[#23155a] rounded-md "> {/* div created for onhover effect */}
                        <a href={`https://ropsten.etherscan.io/address/${addressTo}`} target="_blank" rel="noopener noreferrer">
                            <p className="text-white text-base px-10"> Reciever: {shortenAddress(addressTo)}</p>
                        </a>
                    </div>
                    <p className="text-white text-base px-10">Amount : {amount} ETH</p>
                    {
                        message && (
                            <>
                                <br />
                                <p className="text-white text-base">Message: {message}</p>
                            </>
                        )
                    }

                </div>
                <img src={GifUrl || url} alt="Gif" className='w-full h-64 2xl:h-96 rounded-md shadow-lg object-cover' />

                <div className="bg-black p-3  px-5 w-max rounded-3xl -mt-5 shadow-2xl">
                    <p className="text-[#37828b] font-bold">{timestamp}</p>
                </div>

            </div>

        </div>
    )
}

const Transactions = () => {
    const { currentAccount, transactions } = useContext(TransactionContext);

    return (
        <div className="flex w-full justify-center items-center 2xl:px-20 gradient-bg-transactions">
            <div className="flex flex-col md:p-12 py-12 px-4">
                {currentAccount ? (
                    <h3 className="text-white text-3xl text-center my-2">
                        Latest Transactions
                    </h3>
                ) : (
                    <h3 className="text-white text-3xl text-center my-2">
                        Connect Wallet to Veiw Latest Transactions
                    </h3>)}
                <div className="flex flex-wrap justify-center items-center mt-10">
                    {transactions.reverse().map((transaction, i) => (
                        <TransactionCard key={i} {...transaction} />
                    ))}
                </div>
            </div>
        </div>
    );
}

export default Transactions;