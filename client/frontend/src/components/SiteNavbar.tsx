import React, { useEffect, useState } from "react";
import { useSchool } from "../hooks/SchoolContextProvider";
import { Nav, NavDropdown, Navbar, Container, Image } from "react-bootstrap";

const SiteNavbar: React.FC = () => {
  const { selectedSchool, setSelectedSchool, selectedColors, setSelectedColors, setSelectedSpace } = useSchool();
  const [schools, setSchools] = useState<string[]>([]);

  useEffect(() => {
    if (!selectedSchool?.name) {
      return;
    }

    const fetchColors = async () => {
      try {
        const response = await fetch(`http://127.0.0.1:8000/api/schools/${selectedSchool?.name}`);
        const data = await response.json();
        setSelectedColors({accent: data.primary_color, text: data.text_color})
      } catch (error) {
        console.error("Error fetching colors:", error);
      }

      try {
        const response = await fetch(`http://127.0.0.1:8000/api/schools/${selectedSchool.name}/spaces`);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setSelectedSpace({name: data[0]})
      } catch (error) {
        console.error("Error fetching schools:", error);
      }
    };
    fetchColors();
  }, [selectedSchool]);

  useEffect(() => {
    const fetchSchools = async () => {
      try {
        const response = await fetch("http://127.0.0.1:8000/api/schools/");
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setSchools(data);
      } catch (error) {
        console.error("Error fetching schools:", error);
      }
    };

    fetchSchools();
  }, []);

  return (
    <Navbar expand="lg" className="color-transition shadow-md mb-4" style={{ backgroundColor: selectedColors?.accent, color: selectedColors?.text }}>
      <Container>
      <Navbar.Brand href="/"><p className="p-0 m-0 font-semibold">Study Spaces</p></Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <NavDropdown title="Select School" id="basic-nav-dropdown">
              {schools.map((school, index) => (
                <NavDropdown.Item
                  key={index}
                  onClick={() => {setSelectedSchool({ name: school })}}
                >
                  {school}
                </NavDropdown.Item>
              ))}
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default SiteNavbar;
