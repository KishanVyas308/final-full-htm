import clsx from "clsx";
import { useState } from "react";
import Cookies from "js-cookie";
import { Link } from "react-router-dom";

const className = "my-custom-class";

export const Report = () => {
  const [to, setTo] = useState("");
  const [toError, setToError] = useState(false);

  const [subject, setSubject] = useState("");
  const [subjectError, setSubjectError] = useState(false);

  const [description, setDescription] = useState("");
  const [descriptionError, setDescriptionError] = useState(false);

  const [company, setCompany] = useState("");
  const [companyError, setCompanyError] = useState(false);

  
    function validation() {
      if (!to) {
        setToError(true);
      }

      if (!subject) {
        setSubjectError(true);
      }

      if (!description) {
        setDescriptionError(true);
      }

      if (!company) {
        setCompanyError(true);
      }
    }

   function handleSubmit(e: any) {
    e.preventDefault();

    validation()

    const token = Cookies.get("authToken");
    console.log(to, subject, description, company);
   fetch("http://localhost:5000/api/gov/negativeMint", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, // Send token in Authorization header
      },
      body: JSON.stringify({
        to: to,
        subject: subject,
        description: description,
        company: company,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-zinc-800">
    <div className="absolute top-0 left-0 w-full h-full overflow-clip">
      <svg
        width="100%"
        height="100%"
        viewBox="0 0 82 72"
        fill="none"
        stroke="currentColor"
        stroke-width="6"
        xmlns="http://www.w3.org/2000/svg"
        className={clsx("text-fuchsia-500/10 -rotate-6", className)}
      >
        <path
          d="M3.44337 38.5C2.55021 36.953 2.55021 35.047 3.44338 33.5L20.0566 4.72501C20.9498 3.178 22.6004 2.22501 24.3868 2.22501H57.6132C59.3996 2.22501 61.0502 3.178 61.9434 4.72501L78.5566 33.5C79.4498 35.047 79.4498 36.953 78.5566 38.5L61.9434 67.275C61.0502 68.822 59.3996 69.775 57.6132 69.775H24.3867C22.6004 69.775 20.9498 68.822 20.0566 67.275L3.44337 38.5Z"
          vector-effect="non-scaling-stroke"
        />
      </svg>
    </div>
    <div className="w-full max-w-md p-6 bg-zinc-700 rounded-lg shadow-md z-50">
      <h2 className="text-3xl font-bold text-center text-fuchsia-500 mb-6">
        Report User
      </h2>
      <div className="space-y-6">
        <div>
          <label className="block text-white text-lg">Name</label>
          <input
            value={to}
            onChange={(e) => setTo(e.target.value)}
            className={`text-black w-full p-3 pl-10 border rounded ${toError ? "border-red-500" : "border-zinc-500"}`}
            type="text"
            placeholder="Enter wallet address"
          />
          {toError && (
            <p className="text-red-500 text-xs italic">wallet address is required</p>
          )}
        </div>

        <div>
          <label className="block text-white text-lg">subject</label>
          <input
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            className={`text-black w-full p-3 pl-10 border rounded ${toError ? "border-red-500" : "border-zinc-500"}`}
            type="text"
            placeholder="Enter subject"
          />
          {subjectError && (
            <p className="text-red-500 text-xs italic">
              subject is required
            </p>
          )}
        </div>

        <div>
          <label className="block text-white text-lg">Description</label>
          <input
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          
            className={`text-black w-full p-3 pl-10 border rounded ${descriptionError ? "border-red-500" : "border-zinc-500"}`}
            type="text"
            placeholder="Enter Description"
          />
          {descriptionError && (
            <p className="text-red-500 text-xs italic">
              Description is required
            </p>
          )}
        </div>

        <div>
          <label className="block text-white text-lg">Company name</label>
          <input
            value={company}
            onChange={(e) => setCompany(e.target.value)}
            className={`text-black w-full p-3 pl-10 border rounded ${companyError ? "border-red-500" : "border-zinc-500"}`}
            type="text"
            placeholder="Enter company name"
          />
          {companyError && (
            <p className="text-red-500 text-xs italic">
              company name is required
            </p>
          )}
        </div>

        <button
          onClick={handleSubmit}
          className="w-full mt-6 p-3 bg-fuchsia-700 text-white rounded hover:bg-fuchsia-600"
        >
          Submit
        </button>
        <Link to={"/report"}><p className="text-fuchsia-500 text-center mt-4">Report A User ?</p></Link>

      </div>
    </div>
  </div>
  );
};
