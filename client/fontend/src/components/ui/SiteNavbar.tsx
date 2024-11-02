import { useSchool } from "../../hooks/SchoolContextProvider";
import { Nav, NavDropdown, Navbar } from "react-bootstrap";

// TODO: use above navbar import
const SiteNavbar: React.FC = () => {
  const { setSelectedSchool } = useSchool();

  return (
    <>
      <div className="w-full bg-blue-400 px-5 py-2">
        <p className="font-semibold text-xl">Study Spaces</p>
        <p onClick={() => {setSelectedSchool({"name": "1"})}}>Test 1</p>
        <p onClick={() => {setSelectedSchool({"name": "2"})}}>Test 2</p>
      </div>
    </>
  );
};

export default SiteNavbar;
