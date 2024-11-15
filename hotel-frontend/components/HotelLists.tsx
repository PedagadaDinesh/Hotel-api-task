import React, { useState } from 'react';
import { IoArrowBack, IoArrowForward } from 'react-icons/io5';
import { MdFastfood } from 'react-icons/md';
import { PiPersonFill } from 'react-icons/pi';

const HotelList = ({ hotels, handleHotelClick }: any) => {
  const [currentPage, setCurrentPage] = useState(1); // Current page state
  const hotelsPerPage = 5; // Number of hotels per page

  // Calculate total number of pages
  const totalPages = Math.ceil(hotels.length / hotelsPerPage);

  // Slice hotels based on the current page
  const paginatedHotels = hotels
    .filter((hotel: any) => hotel.acf?.hotel_name)
    .slice((currentPage - 1) * hotelsPerPage, currentPage * hotelsPerPage);

  // Handle page change
  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  return (
    <div className="w-[75%]">
      <ul className="space-y-6">
        {paginatedHotels.map((hotel: any) => (
          <li
            key={hotel.id}
            className="bg-white shadow-md rounded-lg border-2 px-12 py-10 flex flex-col gap-5 shadow-xl"
            // onClick={() => handleHotelClick(hotel.id)}
          >
            <div className="flex justify-between border-b-2 pb-2 border-primary">
              <div className="flex flex-col gap-1">
                <h2 className="text-2xl uppercase font-bold text-primary rounded-t-md font-[sedan]">
                  {hotel.acf.hotel_name}
                </h2>
                <p className="text-gray-600 text-sm font-[poppins]">{hotel.acf.hotel_address}</p>
              </div>
              <p className="text-white px-2 py-2 rounded-t-lg rounded-br-lg shadow-xl h-fit text-white font-semibold bg-primary">
                {hotel.acf.hotel_rating}.0
              </p>
            </div>
            <p className="text-gray-600 font-[poppins]">
              Description: {hotel.acf.hotel_description.length > 100
                ? `${hotel.acf.hotel_description.slice(0, 500)}...`
                : hotel.acf.hotel_description}
            </p>
            <div className="flex justify-between items-center">
              <div className="rounded-xl pl-4 text-[#133E87] flex flex-col gap-1 font-semibold">
                <p className="text-gray-600 flex gap-2 text-center font-[poppins]">
                  <MdFastfood className="text-primary h-5 w-5" /> {hotel.acf.meal_paln}
                </p>
                <p className="text-gray-600 flex gap-2 text-center font-[poppins]">
                  <PiPersonFill className="text-primary h-5 w-5" /> {hotel.acf.occupancy}
                </p>
              </div>
              <p className="text-black text-[#31511E] rounded-md text-3xl font-[railway]">
                ₹ {hotel.acf['rate-per-night']}{' '}
                <span className="text-sm"> / night + taxes & charges</span>
              </p>
              <div className="flex flex-col gap-1">
                <button
                  className="text-white bg-primary font-semibold text-right cursor-pointer px-6 py-2 rounded-t-lg rounded-br-lg"
                  onClick={() => handleHotelClick(hotel.id)} // Redirect on click
                >
                  Book Now
                </button>
                <p className="border-b-2 border-primary w-16"></p>
              </div>
            </div>
          </li>
        ))}
      </ul>

      {/* Pagination Controls */}
      <div className="flex justify-center gap-10 mt-10">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="bg-primary text-white px-4 py-2 flex gap-2 rounded-full font-semibold"
        >
          <IoArrowBack className='mt-1'/> Previous
        </button>
        <span className="text-lg font-semibold text-center">
          Page {currentPage} of {totalPages}
        </span>
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="bg-primary text-white px-4 flex gap-2 py-2 rounded-full font-semibold"
        >
          Next <IoArrowForward className="mt-1"/>
        </button>
      </div>
    </div>
  );
};

export default HotelList;
