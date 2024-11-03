import React, { useEffect, useState } from "react";
import { useSchool } from "../hooks/SchoolContextProvider";
import { Nav, NavDropdown, Navbar, Container } from "react-bootstrap";

const SiteNavbar: React.FC = () => {
  const { selectedSchool, setSelectedSchool } = useSchool();
  const [accentColor, setAccentColor] = useState("");
  const [textColor, setTextColor] = useState("");
  const [schools, setSchools] = useState<string[]>([]);

  useEffect(() => {
    if (!selectedSchool?.name) {
      return;
    }

    const fetchColors = async () => {
      try {
        const response = await fetch(`http://127.0.0.1:8000/api/schools/${selectedSchool?.name}`);
        const data = await response.json();
        setAccentColor(data.primary_color);
        setTextColor(data.text_color);
      } catch (error) {
        console.error("Error fetching colors:", error);
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
    <Navbar expand="lg" className="color-transition" style={{ backgroundColor: accentColor, color: textColor }}>
      <Container className="justify-between">
        <Navbar.Brand href="/">Study Spaces</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <NavDropdown title="Select School" id="basic-nav-dropdown">
              {schools.map((school, index) => (
                <NavDropdown.Item
                  key={index}
                  onClick={() => setSelectedSchool({ name: school })}
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
