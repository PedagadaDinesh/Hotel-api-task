import { useEffect, useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';
import BookingForm from '@/components/BookingForm';
import HotelList from '@/components/HotelLists';
import throttle from 'lodash/throttle';
import { PublicLayout } from '@/layouts';

interface Hotel {
  id: number;
  acf: {
    hotel_name: string;
    hotel_address: string;
    hotel_rating: number;
    nightly_rate: number;
    hotel_gallery: string[];
    hotel_description: string;
    meal_paln: string;
    highlight_1: string[];
    highlight_2: string[];
    hotel_amenities: string[];
    occupancy: number;
    "rate-per-night": number;
  };
}

const Home = () => {
  const router = useRouter();

  const [destination, setDestination] = useState('');
  const [adults, setAdults] = useState(1);
  const [children, setChildren] = useState(0);
  const [checkInDate, setCheckInDate] = useState('');
  const [checkOutDate, setCheckOutDate] = useState('');
  const [occupancy, setOccupancy] = useState<number>(1);
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(10000);
  const [hotels, setHotels] = useState<Hotel[]>([]);
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
  const [loading, setLoading] = useState<boolean>(false);
  const [filteredHots, setFileredHots] = useState<Hotel[]>([])
  const [isScrolled, setIsScrolled] = useState(false);

  // useEffect(() => {
  //   const handleScroll = throttle(() => {
  //     setIsScrolled(window.scrollY > 50); // Adjust threshold as needed
  //   }, 100); // Adjust throttle delay as needed (e.g., 100ms)

  //   window.addEventListener('scroll', handleScroll);
  //   return () => window.removeEventListener('scroll', handleScroll);
  // }, []);

 
  useEffect(() => {
    fetchHotels();
  }, [ adults, children, checkInDate, checkOutDate, occupancy, minPrice, maxPrice, sortOrder]);

  const fetchHotels = async () => {
    setLoading(true); 
    try {

      const body = {
        destination,
        adults,
        children,
        checkInDate,
        checkOutDate,
        occupancy:occupancy>0?occupancy:1,
        minPrice,
        maxPrice,
        sortOrder,
      }

      const response = await axios.get('http://localhost:3001/api/hotels', {
        params: body,
      });

      let filteredHotels = response.data;

      if (minPrice || maxPrice) {
        filteredHotels = filteredHotels.filter((hotel: Hotel) =>
          hotel.acf["rate-per-night"] >= minPrice && hotel.acf["rate-per-night"] <= maxPrice
        );
      }

      if (sortOrder === 'asc') {
        filteredHotels = filteredHotels.sort((a: Hotel, b: Hotel) =>
          a.acf["rate-per-night"] - b.acf["rate-per-night"]
        );
      } else if (sortOrder === 'desc') {
        filteredHotels = filteredHotels.sort((a: Hotel, b: Hotel) =>
          b.acf["rate-per-night"] - a.acf["rate-per-night"]
        );
      }

      setHotels(filteredHotels);
      setFileredHots(filteredHotels)
    } catch (error) {
      console.error('Error fetching hotels:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
if(destination?.length>0){
setFileredHots(hotels.filter((hotel:Hotel) => hotel.acf?.hotel_address?.toLocaleLowerCase()?.includes(destination.toLocaleLowerCase())))
}else {
  setFileredHots(hotels)
}
  }, [destination])

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSortOrder(e.target.value as 'asc' | 'desc');
  };

  const handleHotelClick = (id: number) => {
    router.push(`/hotel/${id}`);
  };

  return (
   <PublicLayout>
     <div className="">
       <div className="flex justify-center items-center">
          <img
            src="/home.jpg"
            alt=""
            className="h-[700px] 2xl:h-92 w-full"
          />
          
      {/* Booking Form */}
       <BookingForm
        checkInDate={checkInDate}
        setCheckInDate={setCheckInDate}
        checkOutDate={checkOutDate}
        setCheckOutDate={setCheckOutDate}
        adults={adults}
        setAdults={setAdults}
        children={children}
        setChildren={setChildren}
      />
        </div>
     

      {/* Hotel Listings */}
      <div className='w-full '>
      <div className="relative flex flex-col justify-center items-center py-10">
        <h1 className="sedan-regular text-[3rem] md:text-[5rem] text-center 2xl:text-[6rem] opacity-5 font-bold uppercase">
          Awesome Rooms
        </h1>
        <div className="flex flex-col items-center absolute top-21">
          <p className="text-lg md:text-xl 2xl:text-[1.7rem] sedan-regular-italic text-primary font-semibold text-[#BB5323] ">
            Extraordinary Accommodations
          </p>
        </div>
      </div>
        {/* Filter Section */}
       <div className='lg:flex md:flex-col main-container gap-10'>
       <div className='lg:w-[25%] md:w-full rounded-lg flex flex-col gap-5 bg-white'>
          <h1 className='text-2xl font-bold font-[sedan] text-primary'>FILTERS :</h1>
          <div>
            <label className="block text-md font-semibold text-primary font-[poppins]">Destination</label>
            <input
              type="text"
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
              className="w-full mt-2 px-4 py-4 border border-black rounded-md shadow-sm"
              placeholder="Enter destination"
            />
          </div>
          {/* Other filters */}
          <div>
            <label className="block text-md font-semibold text-primary font-[poppins]">Occupancy (Min)</label>
            <input
              type="number"
              min={1}
              value={occupancy}
              onChange={(e) => setOccupancy(parseInt(e.target.value))}
              className="w-full mt-2 px-4 py-4 border border-black rounded-md shadow-sm"
              placeholder="Occupancy"
            />
          </div>
          <div className="col-span-1 sm:col-span-1">
            <label className="block text-md font-semibold text-primary font-[poppins]">Price Range</label>
            <div className="flex gap-4 mt-2">
              <input
                type="number"
                value={minPrice}
                onChange={(e) => setMinPrice(parseInt(e.target.value))}
                className="w-1/2 px-4 py-4 border border-black rounded-md shadow-sm"
                placeholder="Min"
              />
              <input
                type="number"
                value={maxPrice}
                onChange={(e) => setMaxPrice(parseInt(e.target.value))}
                className="w-1/2 px-4 py-4 border border-black rounded-md shadow-sm"
                placeholder="Max"
              />
            </div>
          </div>
          {/* Sort By Price */}
          <div className="">
            <select
              value={sortOrder}
              onChange={handleSortChange}
              className="w-full px-4 py-4 border border-[#133E87] rounded-md shadow-sm font-[poppins]"
            >
              <option value="asc">Sort by Price: Low to High</option>
              <option value="desc">Sort by Price: High to Low</option>
            </select>
          </div>
        </div>

        {/* Hotel List Section */}
        {loading ? (
          <div className="text-center text-4xl pt-44 pl-80 font-semibold text-primary">
            Data Loading...
          </div>
        ) : hotels.length === 0 ? (
          <div className="text-center text-4xl pt-44 pl-80 font-semibold text-primary">
            No Data Available
          </div>
        ) : (
          <HotelList hotels={filteredHots} handleHotelClick={handleHotelClick} />
       )} 
       </div>
      </div>
    </div>
   </PublicLayout>
  );
};

export default Home;
