import React, { useEffect, useState } from 'react';
type hotel ={
    id: number,
    name: string,
    price: number

}

const Resturantpage = () => {
  const [data, setData] = useState<hotel[]>([]);

  const getHotel = async () => {
    try {
      const response = await fetch("http://localhost:5050/api/hotel");
      const result = await response.json();
      setData(result.data);
      console.log("Fetched data:", result.data);
    } catch (e) {
      console.error("Fetch error:", e);
    }
  };

  useEffect(() => {
    getHotel();
  }, []);

  return (
    <div>
      <h1>Restaurant Page</h1>
     {data.map((d) => (
          
          <div
            key={d.id}
            className="max-w-sm w-full bg-white rounded-lg shadow p-4 space-y-3 flex flex-col items-center justify-center cursor-pointer hover:shadow-lg transition"
          >
            
            <h2 className="text-xl font-semibold">{d.name}</h2>
        
            <p className="text-gray-500 text-sm italic">{d.price}</p>
          </div>
        ))}
      </div>

  );


      

};

export default Resturantpage;
