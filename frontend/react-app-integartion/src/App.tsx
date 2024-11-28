import { useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";

function App() {
  const [count, setCount] = useState(0);

  const fetchData = async () => {
    try {
      // Make the API request with 'credentials: include' to send cookies
      const response = await fetch("http://localhost:3000/set-cookie", {
        method: "GET",
        credentials: "include", // Ensure cookies are included in the request
      });

      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }

      // Get the response data
      const data = await response.text(); // Assuming the API returns text data
      console.log(data); // Set the value in state
    } catch (err) {
      console.log("Error:", err); // Handle any errors
    }
  };

  // Fetch cookie or data from the API on component mount
  // useEffect(() => {
  //   fetchData();
  // }, []);

  return (
    <>
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  );
}

export default App;
