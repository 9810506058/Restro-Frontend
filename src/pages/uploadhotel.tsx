import React, { useState } from 'react';

interface HotelBody {
  name: string;
  geolocation: string;
  is_open: boolean;
  maplink: string;
}

const UploadHotel = () => {
  const [name, setName] = useState('');
  const [geolocation, setGeolocation] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [maplink, setMaplink] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const hotelData: HotelBody = {
      name,
      geolocation,
      is_open: isOpen,
      maplink
    };

    try {
      const res = await fetch('http://localhost:5050/api/hotel/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(hotelData),
      });

      if (res.ok) {
        const data = await res.json();
        console.log('Hotel created:', data);
      } else {
        console.error('Failed to create hotel: ', res.statusText);
      }
    } catch (err) {
      console.error('Failed to create hotel', err);
    }
  };

  return (
    <div className="flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-lg border border-gray-200">
        <h2 className="text-3xl font-bold text-center text-red-700 mb-6">New Hotel</h2>

        <form onSubmit={handleSubmit}>
          {/* Hotel Name */}
          <div className="mb-5">
            <label htmlFor="name" className="block text-gray-700 font-medium mb-1">
              Hotel Name
            </label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-4 py-3 text-gray-800 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              placeholder="Enter hotel name"
              required
            />
          </div>

          {/* Geolocation */}
          <div className="mb-5">
            <label htmlFor="geolocation" className="block text-gray-700 font-medium mb-1">
              Geolocation
            </label>
            <input
              type="text"
              id="geolocation"
              value={geolocation}
              onChange={(e) => setGeolocation(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-4 py-3 text-gray-800 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              placeholder="Enter geolocation"
              required
            />
          </div>

          {/* Is Open */}
          <div className="mb-5">
            <label htmlFor="isOpen" className="block text-gray-700 font-medium mb-1">
              Is Open
            </label>
            <input
              type="checkbox"
              id="isOpen"
              checked={isOpen}
              onChange={(e) => setIsOpen(e.target.checked)}
              className="mr-2"
            />
            <span>{isOpen ? 'Yes' : 'No'}</span>
          </div>

          {/* Map Link */}
          <div className="mb-5">
            <label htmlFor="maplink" className="block text-gray-700 font-medium mb-1">
              Map Link
            </label>
            <input
              type="text"
              id="maplink"
              value={maplink}
              onChange={(e) => setMaplink(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-4 py-3 text-gray-800 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              placeholder="Enter Google Maps link"
              required
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-red-600 text-white py-3 rounded-lg font-semibold hover:bg-red-700 transition"
          >
            Submit Hotel
          </button>
        </form>
      </div>
    </div>
  );
};

export default UploadHotel;
