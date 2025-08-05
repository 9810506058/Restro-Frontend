import { useCallback, useEffect, useState } from 'react';
import useAuth from '../Hooks/useAuth';

type CategoryItem = {
  id: number;
  name: string;
  description: string;
  sub_description: string;
  image: string;
  publicId: string;
  updated_at: string;
  created_at: string;
};
const Home = () => {
  const [data, setData] = useState<CategoryItem[]>([]);
 

  const getApi = useCallback(async () => {
    try {
      const response = await fetch('http://localhost:5050/api/category');
      const result = await response.json();
      setData(result.data);
      console.log("-------------------",result);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }, [])
const {  isLoggedIn } = useAuth();
  useEffect(() => {
     
    if (isLoggedIn) {
      getApi();
    }
    else{
      console.log("not logged in");
    }
  }, [isLoggedIn, getApi]);

  // if (isLoading) {
  //   return (
  //     <div className="min-h-screen flex items-center justify-center">
  //       {/* <p className="text-xl text-gray-700">Loading...</p> */}
  //     </div>
  //   );
  // }

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-xl text-gray-700">Please log in to view categories.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-yellow-300">
      <div className="flex flex-wrap gap-4 p-4">
        {data.map((d) => (
          
          <div
            key={d.id}
            className="max-w-sm w-full bg-white rounded-lg shadow p-4 space-y-3 flex flex-col items-center justify-center cursor-pointer hover:shadow-lg transition"
          >
            <img
              src={d.image}
              alt={d.name}
              className="w-full h-48 object-cover rounded-md"
            />
            <h2 className="text-xl font-semibold">{d.name}</h2>
            <p className="text-gray-600">{d.description}</p>
            <p className="text-gray-500 text-sm italic">{d.sub_description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};
export default Home