import React, { useState } from "react";
import { IoCloseSharp } from "react-icons/io5";
import { toast } from "react-toastify";
import { API_url } from "../constants";

function ServiceModalComponent({ visible, handleClose }) {
  if (!visible) return null;

  const [FormData, setFormData] = useState({
    name: "",
    description: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => {
      return { ...prev, [name]: value };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (FormData.name.trim() === "" || FormData.description.trim() === "") {
      toast.error("Please Enter All Service Data");
      return;
    }
    try {
      const response = await fetch(`${API_url}/service`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(FormData),
      });

      if (!response.ok) {
        toast.error("Failed To Save New Service");
      } else {
        handleClose();
        toast.success("Service Added");
      }
    } catch (err) {
      toast.error("Please Try Again");
      console.log(err);
    }
  };
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50 ">
      <div className="relative bg-white rounded-lg shadow-lg p-6  w-[30vw]">
        <h1 className="text-xl font-semibold mb-4">Add New Service</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <label htmlFor="name" className="block font-lato font-medium">
            Service Name
          </label>
          <input
            type="text"
            name="name"
            className="border-2 border-gray-400 px-3 py-2 w-full rounded-lg outline-none"
            placeholder="Enter service name"
            onChange={handleChange}
          />
          <label htmlFor="desc" className="block font-lato font-medium">
            Service Description
          </label>
          <textarea
            name="description"
            id="desc"
            rows={4}
            className="w-full border-2 border-gray-400 rounded-lg px-3 py-4 outline-none"
            placeholder="Enter service description"
            onChange={handleChange}
          ></textarea>
          <div className="flex justify-center items-center">
            <button className="bg-blue-500 hover:bg-blue-700 rounded-lg text-white px-4 py-2">
              Save Service
            </button>
          </div>
        </form>
        <IoCloseSharp
          className="absolute top-4 right-4 cursor-pointer"
          size={30}
          onClick={handleClose}
        />
      </div>
    </div>
  );
}

export default ServiceModalComponent;
