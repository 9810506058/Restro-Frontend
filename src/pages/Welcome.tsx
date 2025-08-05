import { useSession } from "../auth";
import { useEffect } from "react";
import { useNavigate } from "react-router";

const Welcome = () => {
  const { data, isPending } = useSession();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isPending && !data) {
      navigate("/");
    }
  }, [isPending, data, navigate]);

  if (isPending) return <p>Loading...</p>;

  if (!data) return null; 

  return (
    <div>
      <h1>Welcome, {data.user.name}!</h1>
      <p>Email: {data.user.email}</p>
    <img src={data?.user?.image || "/default-avatar.png"} alt="User avatar" />

    </div>
  );
};

export default Welcome;
