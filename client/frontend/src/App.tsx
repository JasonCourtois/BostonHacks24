import Navbar from "./components/SiteNavbar";
import SpacesList from "./components/SpacesList";
import SpaceData from "./components/Spacedata";
import { Container } from "react-bootstrap";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { useSchool } from "./hooks/SchoolContextProvider";

function App() {
  const { selectedSchool } = useSchool();
  return (
    <>
      <Navbar />
      {!selectedSchool && (<div className="text-center flex justify-center items-center">
        <div className="bg-gray-100 shadow-md p-3 rounded-md m-5"><h1>Welcome to Study Spaces</h1>
        <p className="text-lg">Please select a school in the top right to get started.</p></div>
      </div>)}
      {selectedSchool && (
        <Container className="flex">
          <SpacesList />
          <SpaceData />
        </Container>
      )}
    </>
  );
}

export default App;
