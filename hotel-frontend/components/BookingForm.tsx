import { useRouter } from 'next/router';
import React from 'react';
import { FaCalendarAlt } from 'react-icons/fa';

const BookingForm = ({ checkInDate, setCheckInDate, checkOutDate, setCheckOutDate, adults, setAdults, children, setChildren } : any) => {
  const router = useRouter();
  const redirectToForm = () => {
    router.push('/form'); // Navigate to the form page
  };
  return (
    <div className=" px-10 py-8 lg:mt-[540px] md:mt-[370px] text-[#133E87] rounded-lg absolute bg-[#1E1E1E] w-[80%] border-b-4 border-primary">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 ">
      <div className=''>
        <label className="block text-lg text-white font-[sedan]">Check-In :</label>
        <input
            type="date"
            value={checkInDate || '2024-11-15'}
            onChange={(e) => setCheckInDate(e.target.value)}
            className="w-full mt-2 px-4 py-3 bg-transparent border-2 border-gray-600 text-white rounded-md shadow-sm"
        />
        </div>
  
        <div>
          <label className="block text-lg font-[sedan] text-white">Check-Out : </label>
          <input
            type="date"
            value={checkOutDate || '2024-11-17'}
            onChange={(e) => setCheckOutDate(e.target.value)}
            className="w-full mt-2 px-4 py-3 bg-transparent border-2 border-gray-600 text-white rounded-md shadow-sm"
          />
        </div>
        <div>
          <label className="block text-lg font-[sedan] text-white">Adults :</label>
          <input
            type="number"
            min="1"
            value={adults}
            onChange={(e) => setAdults(parseInt(e.target.value))}
            className="w-full mt-2 px-4 py-3 bg-transparent border-2 border-gray-600 text-white rounded-md shadow-sm"
            placeholder="Number of adults"
          />
        </div>
        <div>
          <label className="block text-lg font-[sedan] text-white">Children :</label>
          <input
            type="number"
            min="0"
            value={children}
            onChange={(e) => setChildren(parseInt(e.target.value))}
            className="w-full mt-2 px-4 py-3 bg-transparent border-2 border-gray-600 text-white rounded-md shadow-sm"
            placeholder="Number of children"
          />
        </div>
        <div className="flex flex-col gap-1 md:items-start lg:items-center lg:justify-center md:justify-end">
                  <button
                    onClick={redirectToForm}
                    type="submit"
                    className="lg:w-fit w-full bg-[#BB5323] text-white py-3 font-[sedan] border border-white px-6"
                  >
                    BOOK NOW
                  </button>
                  <p className="border-b w-16"></p>
                </div>
      </div>
      </div>
  );
};

export default BookingForm;
