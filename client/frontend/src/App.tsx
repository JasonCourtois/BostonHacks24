import { useEffect, useState } from "react";
import { useSchool } from "./hooks/SchoolContextProvider";
import Navbar from "./components/SiteNavbar";
import SpacesList from "./components/SpacesList";
import { Container } from "react-bootstrap";
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
      <Container className="flex">
        <SpacesList/>
        <div>
          <p>Test</p>
        </div>
      </Container>
    </>
  );
}

export default App;
