import React, { useEffect, useState } from "react";
import { useSchool } from "../hooks/SchoolContextProvider";
import { Nav, NavDropdown, Navbar, Container, Image } from "react-bootstrap";

const SiteNavbar: React.FC = () => {
  const { selectedSchool, setSelectedSchool, selectedColors, setSelectedColors } = useSchool();
  const [logoURL, setLogoURL] = useState("");
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
        setLogoURL(
       `http://127.0.0.1:8000${data.logo_url}`
        );
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
    <Navbar expand="lg" className="color-transition" style={{ backgroundColor: selectedColors?.accent, color: selectedColors?.text }}>
      <Container className="d-flex justify-content-between align-items-center">
        <Navbar.Brand href="/" className="text-left" style={{ color: selectedColors?.text }}>
          Study Spaces
        </Navbar.Brand>
        
        {logoURL && (
          <Image src={logoURL} alt="School Logo" width={"150px"} className="mx-auto" />
        )}
        
        <Nav>
          <NavDropdown title="Select School" id="basic-nav-dropdown" align="end">
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
      </Container>
    </Navbar>
  );
};

export default SiteNavbar;
