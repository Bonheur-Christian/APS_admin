import { useEffect, useState } from "react";
import AddressModal from "./AddressModal";
import { toast, ToastContainer } from "react-toastify";

function AddressSection({ children }) {
  const [visible, setVisible] = useState(false);
  const [address, setAddress] = useState([]);
  const handleOpen = (e) => {
    e.preventDefault();
    setVisible(true);
  };
  const handleClose = () => {
    setVisible(false);
  };

  useEffect(() => {
    const fetchAddress = async () => {
      try {
        const response = await fetch("http://localhost:8800/allAddress");
        if (!response.ok) {
          toast.error("Error Occured");
        } else {
          const data = await response.json();
          setAddress(data);
        }
      } catch (err) {
        toast.error("Error Occured");
      }
    };

    fetchAddress();
  }, []);
  return (
    <div className="bg-[#F8FBFC] w-[40%] py-12 px-6">
      <div className="flex  justify-between px-6">
        <p className="font-semibold text-xl">{children}</p>
        <div className="flex gap-2">
          <img src="/svg/add.svg" alt="add new item" />
          <button
            className="text-[#4327F4] font-medium text-xl"
            onClick={handleOpen}
          >
            Edit Address
          </button>
        </div>
      </div>
      <hr className="mt-4" />
      <div>
        {address.map((item, index) => (
          <div key={index} className="space-y-2 py-6">
            <div className="flex gap-4">
              <h1 className="text-xl font-medium">Tel: +250</h1>
              <p className="text-xl">{item.tel}</p>
            </div>
            <div className="flex gap-4">
              <h1 className="text-xl font-medium">Email:</h1>
              <p className="text-xl">{item.email}</p>
            </div>
            <div className="flex gap-4">
              <h1 className="text-xl font-medium">Location:</h1>
              <p className="text-xl">{item.location}</p>
            </div>
          </div>
        ))}
      </div>
      <AddressModal visible={visible} handleClose={handleClose} />
    </div>
  );
}

export default AddressSection;
