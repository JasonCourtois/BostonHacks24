import Navbar from "./components/SiteNavbar";
import SpacesList from "./components/SpacesList";
import SpaceData from "./components/Spacedata";
import { Container } from "react-bootstrap";
import "./App.css";
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <>
      <Navbar />
      <Container className="flex">
        <SpacesList/>
        <SpaceData/>
      </Container>
    </>
  );
}

export default App;
