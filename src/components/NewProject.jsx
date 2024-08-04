import { useEffect, useState } from "react";
import ModalComponent from "./ProjectModal";
import { toast, ToastContainer } from "react-toastify";

function ProjectSection({ children }) {
  const [visible, setVisible] = useState(false);
  const [projects, setProjects] = useState([]);
  const handleOpen = (e) => {
    e.preventDefault();
    setVisible(true);
  };
  const handleClose = () => {
    setVisible(false);
  };

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await fetch("http://localhost:8800/allProjects");
        if (!response.ok) {
          toast.error("Error Occurred");
        } else {
          const data = await response.json();
          setProjects(data);
        }
      } catch (error) {
        toast.error("Error Occurred");
      }
    };
    fetchProjects();
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
        {projects.map((item, index) => (
          <div className="flex gap-6 ps-6">
            <input type="checkbox" id="project" />
            <div key={index}>
              <p className="text-xl">{item.name}</p>
            </div>
          </div>
        ))}
      </div>
      <ModalComponent visible={visible} handleClose={handleClose} />
    </div>
  );
}

export default ProjectSection;
