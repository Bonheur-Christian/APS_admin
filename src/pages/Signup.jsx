import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { API_url } from "../constants";

function SignUp() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => {
      return { ...prev, [name]: value };
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${API_url}/admin`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      if (!response.ok) {
        throw new Error("failed to login");
      }
      navigate("/dashboard");
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div>
      <div className="flex flex-row-reverse">
        <div className="bg-[url('images/form.png')] bg-no-repeat bg-cover w-[70vw] h-screen">
          <div className="bg-white/30 text-white px-12 py-12 rounded-xl fixed bottom-16 mx-12 space-y-6">
            <h1 className="text-4xl font-semibold font-serif">
              System Admnistration
            </h1>
            <p className="text-xl">
              Welcome back! This is the Part for the Admin to interact with. Aps
              Admin part is dedicated to help in performing varoius tasks. The
              task which can be performed using Admin part Include: Adding
              Performed Project, changing the address and Others...
            </p>
          </div>
        </div>
        <div className="flex px-12 items-center">
          <form className="space-y-12" onSubmit={handleSubmit}>
            <div className="space-y-6">
              <h1 className="font-bold text-4xl font-montserrat">Aps Ltd</h1>
              <p className="font-lato tracking-wider text-xl">
                Curious! Learn Application Admin Panel
              </p>
            </div>
            <div className="w-[30vw] space-y-12">
              <div className="space-y-4">
                <label htmlFor="" className="block text-xl font-montserrat">
                  Name
                </label>
                <input
                  type="text"
                  className="border-2 border-[#DDDDDD2] outline-none px-2 py-4 rounded-xl text-xl text-gray-400 w-[80%]"
                  name="name"
                  onChange={handleChange}
                />
              </div>
              <div className="space-y-4">
                <label htmlFor="" className="block text-xl font-montserrat">
                  Email Address
                </label>
                <input
                  type="email"
                  className="border-2 border-[#DDDDDD2] outline-none px-2 py-4 rounded-xl text-xl text-gray-400 w-[80%]"
                  name="email"
                  onChange={handleChange}
                />
              </div>
              <div className="space-y-4">
                <label htmlFor="" className="block text-xl font-montserrat">
                  Password
                </label>
                <input
                  type="password"
                  className="border-2 border-[#DDDDDD2] outline-none px-2 py-4 rounded-xl text-xl text-gray-500 w-[80%]"
                  name="password"
                  onChange={handleChange}
                />
              </div>
              <button className="bg-[#4327F4] hover:bg-blue-800 px-6 py-6 rounded-xl text-white font-medium text-xl tracking-wider w-[80%]">
                SignUp  
              </button>
            </div>
            <div className="flex items-center gap-4 fixed bottom-0 pb-4 hover:underline">
              <a href="aps.rw" className="text-xl">
                Back To Website
              </a>
              <img src="/svg/upwardArrow.svg" alt="back to website" />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default SignUp;
