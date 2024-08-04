import { useEffect, useState } from "react";
import ModalComponent from "./ProjectModal";
import { toast, ToastContainer } from "react-toastify";
import NewsModal from "./NewsModal";

function NewsSection({ children }) {
  const [visible, setVisible] = useState(false);
  const [completedProjects, setCompletedProjects] = useState([]);
  const handleOpen = (e) => {
    e.preventDefault();
    setVisible(true);
  };
  const handleClose = () => {
    setVisible(false);
  };

  useEffect(() => {
    const fetchCompletedProjects = async () => {
      try {
        const response = await fetch("http://localhost:8800/completedProjects");
        if (!response.ok) {
          toast.error("Error Occurred");
        } else {
          const data = await response.json();
          const formattedData = data.map((project) => {
            const isoDate = project.date;
            const date = new Date(isoDate);
            const year = date.getUTCFullYear();
            const month = ("0" + (date.getUTCMonth() + 1)).slice(-2);
            const day = ("0" + date.getUTCDate()).slice(-2);
            const formattedDate = `${year}-${month}-${day}`;
            return { ...project, formattedDate };
          });
          setCompletedProjects(formattedData);
        }
      } catch (error) {
        toast.error("Error Occurred");
      }
    };
    fetchCompletedProjects();
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
        {completedProjects.map((item, index) => (
          <div
            key={index}
            className="ps-6 flex items-center justify-between "
          >
            <p className="text-xl">{item.name}</p>
            <p className="text-xl">{item.formattedDate}</p>
          </div>
        ))}
      </div>
      <NewsModal visible={visible} handleClose={handleClose} />
    </div>
  );
}

export default NewsSection;
