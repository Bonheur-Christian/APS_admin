import { useEffect, useState } from "react";
// import ModalComponent from "./ProjectModal";
import ServiceModalComponent from "./ServiceModal";
import { toast, ToastContainer } from "react-toastify";

function ServiceSection({ children }) {
  const [visible, setVisible] = useState(false);
  const [services, setServices] = useState([]);
  const handleOpen = (e) => {
    e.preventDefault();
    setVisible(true);
  };
  const handleClose = () => {
    setVisible(false);
  };

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await fetch("http://localhost:8800/allServices");
        if (!response.ok) {
          toast.error("Error Occured");
        } else {
          const data = await response.json();
          setServices(data);
        }
      } catch (err) {
        toast.error("Error Occured");
      }
    };
    fetchServices();
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
            Add
          </button>
        </div>
      </div>
      <hr className="mt-4" />
      <div className="py-6 space-y-4">
        {services.map((item, index) => (
          <div key={index} className="flex gap-6 ps-6">
            <input type="checkbox" id="project" />
            <p className="text-xl">{item.name}</p>
          </div>
        ))}
      </div>
      <ServiceModalComponent visible={visible} handleClose={handleClose} />
    </div>
  );
}

export default ServiceSection;
