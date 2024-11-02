import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [message, setMessage] = useState("")

  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/test/")
    .then((response) => response.json())
    .then((data) => setMessage(data.message))
    .catch((error) => console.error("Error fetching data: ", error));
  });
  return (
    <>
      <div className="text-center">
        <p>Test! {message}</p>
      </div>
    </>
  );
}

export default App;
