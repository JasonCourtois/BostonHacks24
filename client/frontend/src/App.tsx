import { useEffect, useState } from "react";
import { useSchool } from "./hooks/SchoolContextProvider";
import Navbar from "./components/SiteNavbar";
import "./App.css";
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  const [message, setMessage] = useState("");
  const { selectedSchool } = useSchool();

  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/test/")
      .then((response) => response.json())
      .then((data) => setMessage(data.message))
      .catch((error) => console.error("Error fetching data: ", error));
  });

  return (
    <>
      <Navbar />
      <div className="text-center">
        <p>Test! {message}</p>
        <p>Current School : {selectedSchool?.name}</p>
      </div>
    </>
  );
}

export default App;
