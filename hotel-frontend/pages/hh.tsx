import { useEffect, useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';
import BookingForm from '@/components/BookingForm';
import HotelList from '@/components/HotelLists';

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

  // States for managing filters
  const [destination, setDestination] = useState('');
  const [adults, setAdults] = useState(1);
  const [children, setChildren] = useState(0);
  const [checkInDate, setCheckInDate] = useState('');
  const [checkOutDate, setCheckOutDate] = useState('');
  const [occupancy, setOccupancy] = useState<number | ''>(1);
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(10000);
  const [hotels, setHotels] = useState<Hotel[]>([]);
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
  const [loading, setLoading] = useState<boolean>(false);

  // Fetch hotels when filters change
  useEffect(() => {
    const filterValues = [
      { label: 'Destination', value: destination },
      { label: 'Check-in Date', value: checkInDate },
      { label: 'Check-out Date', value: checkOutDate },
      { label: 'Adults', value: adults },
      { label: 'Children', value: children },
      { label: 'Occupancy', value: occupancy },
      { label: 'Min Price', value: minPrice },
      { label: 'Max Price', value: maxPrice },
      { label: 'Sort Order', value: sortOrder },
    ];

    console.log('Filter Values:', filterValues); // Log filter values every time a change occurs

    fetchHotels();
  }, [destination, adults, children, checkInDate, checkOutDate, occupancy, minPrice, maxPrice, sortOrder]);

  const fetchHotels = async () => {
    setLoading(true); // Set loading to true when the API call starts
    try {
      const response = await axios.get('http://localhost:3001/api/hotels', {
        params: {
          destination,
          adults,
          children,
          checkInDate,
          checkOutDate,
          occupancy,
          minPrice,
          maxPrice,
          sortOrder,
        },
      });

      let filteredHotels = response.data;

      if (destination) {
        filteredHotels = filteredHotels.filter((hotel: Hotel) =>
          hotel.acf.hotel_name.toLowerCase().includes(destination.toLowerCase())
        );
      }

      if (occupancy) {
        filteredHotels = filteredHotels.filter((hotel: Hotel) =>
          hotel.acf.occupancy >= occupancy
        );
      }

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

      setHotels(filteredHotels); // Set the filtered hotels
    } catch (error) {
      console.error('Error fetching hotels:', error);
    } finally {
      setLoading(false); // Set loading to false once the API call is finished
    }
  };

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSortOrder(e.target.value as 'asc' | 'desc');
  };

  const handleHotelClick = (id: number) => {
    router.push(`/hotel/${id}`);
  };

  return (
    <div className="bg-[#CBDCEB]">
      <div className='flex justify-between px-16 py-7 items-center bg-gradient-to-r from-[#133E87] to-[#608BC1]'>
        <h1 className="text-4xl  font-bold text-left text-white font-serif">
          <span className='text-2xl'>Hotel</span> Bookings..
        </h1>
        <div className='flex gap-3 font-semibold '>
          <button className='border-2 text-white border-white px-4 py-2 rounded-full'>Register</button>
          <button className='bg-[#CBDCEB] rounded-full px-4 py-2 text-[#133E87]'>Sign in</button>
        </div>
      </div>

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

      {/* Hotel Listings */}
      <div className='w-full flex gap-5 px-4 pt-6 relative'>
        {/* Filter Section - Fixed/Sticky */}
        <div className='w-[35%] rounded-lg flex flex-col gap-5 bg-white px-12 py-10 h-fit border-2 border-[#133E87] sticky top-6'>
          <h1 className='text-2xl font-semibold text-[#133E87]'>Filters :</h1>
          <div>
            <label className="block text-md font-semibold text-[#133E87]">Destination</label>
            <input
              type="text"
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
              className="w-full mt-2 px-4 py-4 border border-[#133E87] rounded-md shadow-sm"
              placeholder="Enter destination"
            />
          </div>
          <div>
            <label className="block text-md font-semibold text-[#133E87]">Occupancy (Min)</label>
            <input
              type="number"
              min="1"
              value={occupancy}
              onChange={(e) => setOccupancy(parseInt(e.target.value))}
              className="w-full mt-2 px-4 py-4 border border-[#133E87] rounded-md shadow-sm"
              placeholder="Occupancy"
            />
          </div>
          <div className="col-span-1 sm:col-span-1">
            <label className="block text-md font-semibold text-[#133E87]">Price Range</label>
            <div className="flex gap-4 mt-2">
              <input
                type="number"
                value={minPrice}
                onChange={(e) => setMinPrice(parseInt(e.target.value))}
                className="w-1/2 px-4 py-4 border border-[#133E87] rounded-md shadow-sm"
                placeholder="Min"
              />
              <input
                type="number"
                value={maxPrice}
                onChange={(e) => setMaxPrice(parseInt(e.target.value))}
                className="w-1/2 px-4 py-4 border border-[#133E87] rounded-md shadow-sm"
                placeholder="Max"
              />
            </div>
          </div>
          {/* Sort By Price */}
          <div className="mb-4">
            <select
              value={sortOrder}
              onChange={handleSortChange}
              className="w-full px-4 py-4 border border-[#133E87] rounded-md shadow-sm"
            >
              <option value="asc">Sort by Price: Low to High</option>
              <option value="desc">Sort by Price: High to Low</option>
            </select>
          </div>
        </div>

        {/* Hotel List Section - Scrollable */}
        {loading ? (
          <div className="w-full text-center text-4xl pt-36 font-semibold text-[#133E87]">
            <span className="loader-icon">🔄</span> Loading...
          </div>
        ) : hotels.length === 0 ? (
          <div className="w-full text-center text-4xl pt-36 font-semibold text-[#133E87]">
            No Data Available
          </div>
        ) : (
          <HotelList hotels={hotels} handleHotelClick
