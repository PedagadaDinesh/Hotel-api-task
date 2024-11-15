import { PublicLayout } from '@/layouts';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { PiPersonFill } from 'react-icons/pi';
import { MdBedroomParent } from 'react-icons/md';
import { GoDotFill } from 'react-icons/go';
import { FaSwimmingPool, FaWifi, FaParking, FaUtensils, FaSpa, FaDumbbell, FaConciergeBell, FaCoffee, FaTv, FaSnowflake } from 'react-icons/fa';
import Modal from 'react-modal';
import Lightbox from 'react-image-lightbox'; // Import Lightbox package
import 'react-image-lightbox/style.css'; // Import Lightbox styles

const HotelDetails = () => {
  const router = useRouter();
  const { id } = router.query; // Get hotel ID from URL
  const [hotelData, setHotelData] = useState<any>(null); // State to hold the hotel details
  const [loading, setLoading] = useState<boolean>(true); // Loading state
  const [error, setError] = useState<string>(''); // Error state
  const [attachmentData, setAttachmentData] = useState<any[]>([]);
  const [attachmentSourceUrls, setAttachmentSourceUrls] = useState<string[]>([]);


  // Fetch hotel details on ID change
  useEffect(() => {
    if (!id) return;

    const fetchHotelDetails = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`https://api.elixirtrips.com/wp-json/wp/v2/hotels/${id}`);
        setHotelData(response.data);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch hotel details');
        setLoading(false);
      }
    };

    fetchHotelDetails();
  }, [id]);

  useEffect(() => {
    if (!hotelData || !hotelData._links || !hotelData._links['acf:attachment']) return;

    const attachments = hotelData._links['acf:attachment'];

    const fetchAttachmentData = async () => {
      try {
        const fetchedSourceUrls = await Promise.all(
          attachments.map((attachment: any) =>
            axios
              .get(attachment.href)
              .then((res) => res.data.source_url) // Extract `source_url` from each response
          )
        );
        setAttachmentSourceUrls(fetchedSourceUrls);
      } catch (err) {
        console.error('Error fetching attachment data:', err);
      }
    };

    fetchAttachmentData();
  }, [hotelData]);

  console.log(attachmentSourceUrls);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  if (!hotelData) {
    return <div>No hotel data available</div>;
  }


  const amenities = [
    { icon: <FaSwimmingPool className="text-2xl" />, text: "Swimming Pool" },
    { icon: <FaWifi className="text-2xl" />, text: "Free Wi-Fi" },
    { icon: <FaParking className="text-2xl" />, text: "Free Parking" },
    { icon: <FaUtensils className="text-2xl" />, text: "Restaurant" },
    { icon: <FaSpa className="text-2xl" />, text: "Spa & Wellness" },
    { icon: <FaDumbbell className="text-2xl" />, text: "Fitness Center" },
    { icon: <FaConciergeBell className="text-2xl" />, text: "Room Service" },
    { icon: <FaTv className="text-2xl" />, text: "Flat-Screen TV" },
    { icon: <FaSnowflake className="text-2xl" />, text: "Air Conditioning" },
  ];

  const redirectToForm = () => {
    router.push('/form'); // Navigate to the form page
  };

  return (
    <PublicLayout>
      <div className="main-container mt-10 flex gap-10">
        <div className="flex flex-col gap-2 w-[70%]">
          <div className="flex justify-between">
            <h1 className="text-4xl font-bold text-primary font-[sedan]">{hotelData.acf.hotel_name}</h1>
            <h2 className="text-2xl font-semibold bg-primary px-2 py-2 text-white rounded-xl h-fit">
              {hotelData.acf.hotel_rating}.0
            </h2>
          </div>
          <p className="text-lg font-[poppins]">{hotelData.acf.hotel_address}</p>
         
          <p className="text-gray-600 mt-4 font-[poppins] border-b-2 border-primary pb-5">{hotelData.acf.hotel_description}</p>
          <div className="grid grid-cols-3 gap-4 pt-3">
          {attachmentSourceUrls.map((src, index) => (
            <div
              key={index}
              className="w-[330px] h-[170px] overflow-hidden"
            >
              <img
                src={src}
                alt={`Gallery Image ${index + 1}`}
                className="w-full h-full object-cover rounded"
              />
            </div>
          ))}
        </div>
         
          </div>
        <div className='w-[30%] flex flex-col gap-5'>
        <div className=' flex flex-col border-2 rounded-2xl p-5 gap-3 h-fit shadow-xl'>
        <div className='flex justify-between'>
          <p className="text-xl font-semibold font-[poppins] flex gap-2"><MdBedroomParent  className='h-6 w-6'/>{hotelData.acf.highlight_1} Room</p>
          <p className=" font-[poppins] flex gap-2 text-center font-[poppins] text-lg"><PiPersonFill className='h-6 w-6'/>{hotelData.acf.occupancy}</p>
        </div>
        <div>
           <p className='flex gap-2 items-center text-green-600'><GoDotFill />Free Breakfast</p>
            <p className='flex gap-2 items-center text-green-600'><GoDotFill />Breakfast Inclusive Rate</p>
            <p className='flex gap-2 items-center text-green-600'><GoDotFill />Non-Refundable</p>
            <p className='flex gap-2 items-center text-green-600'><GoDotFill /> {hotelData.acf.highlight_2}</p>
        </div>

          <div className='flex items-center gap-2'>
          <p className='font-[poppins]'>Per Night :</p>
          <p className="text-2xl font-[poppins]">₹{hotelData.acf["rate-per-night"]} <span className='text-sm'>+ taxes & charges</span></p>
          </div>
          <button
            onClick={redirectToForm}
            className="font-[poppins] text-lg bg-primary text-white py-2 rounded-xl"
          >
            Book Now
          </button>
        </div>
        <h1 className="font-[sedan] text-3xl pt-3 font-semibold text-primary">Amenities</h1>
         <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-2 gap-7 mt-6">

              {amenities.map((amenity, index) => (
                <div key={index} className="flex items-center justify-center bg-white p-4 shadow-lg rounded-md border border-primary">
                  <div className="flex flex-col items-center">
                    <div className="bg-orange-200 p-3 rounded-full mb-2">
                      {amenity.icon}
                    </div>
                    <p className="text-sm text-gray-600 font-[poppins]">{amenity.text}</p>
                  </div>
                </div>
              ))}
            </div>
        </div>
      </div>
    </PublicLayout>
  );
};

export default HotelDetails;
