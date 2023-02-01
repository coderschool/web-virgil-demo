import React, { useEffect } from "react";
import apiService from "./app/apiService";

function App() {
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await apiService.post("/api/register", {
          email: "eve.holt@reqres.in",
          // password: "pistol",
        });
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);
  return (
    <div>
      <h1>axios</h1>
    </div>
  );
}

export default App;
