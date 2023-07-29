import { useEffect, useState } from "react";
import { list } from "../apis/store-api";
import SingleStore from "./SingleStore";
import Loading from "../components/Loading";
import hero from "../assets/images/hero_bg.jpg";
import marketplace from "../assets/images/marketplace.jpg";

const Shops = () => {
  const [shops, setShops] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    fetchStore();

    return () => {
      setLoading(false);
    };
  }, []);
  const fetchStore = async () => {
    try {
      const data = await list();
      setShops(data);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };
  if (loading) {
    return <Loading />;
  }

  return (
    <>
      <div className="h-[194px] relative">
        <img className="w-full h-full object-cover object-center" src={hero} />
        <p className="absolute top-1/2 left-1/2 w-full text-center sm:text-2xl md:text-3xl lg:text-4xl transform -translate-x-1/2 -translate-y-1/2 text-white text-xl font-bold">
          Shops
        </p>
      </div>
      <div className="container mx-auto mb-5 mt-12">
        <p className="font-bold text-lg italic mt-[16px] mb-[16px]">
          {shops?.length > 0 && "ALL SHOPS"}
        </p>
        {shops?.length > 0 ? (
          <div className="grid xl:grid-cols-4 gap-2 lg:grid-cols-3 grid-cols-2 ">
            {shops?.map((shop, i) => {
              return <SingleStore shop={shop} key={i} />;
            })}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center">
            <p className="text-2xl font-mono text-red-500">Seller on Aanglo ?</p>
            <div>
              <img
                className="w-full h-full object-cover object-center"
                src={marketplace}
              />
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Shops;
