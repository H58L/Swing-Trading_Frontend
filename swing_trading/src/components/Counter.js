import React, { useState } from "react";

function Counter() {
  // Initialize count state
  const [count, setCount] = useState(0);

  // Function to handle increment
  const incrementCount = async () => {
    const newCount = count + 1;
    setCount(newCount);

    // Send the updated count to the backend
    try {
      const response = await fetch(
        "https://swing-trading-backend-java-production.up.railway.app/api/count",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ count: newCount }),
        }
      );
      if (!response.ok) {
        console.error("Failed to update count on the backend");
      }
    } catch (error) {
      console.error("Error sending count to backend:", error);
    }
  };

  return (
    <div>
      <h1>Counter</h1>
      <p>Current Count: {count}</p>
      <button onClick={incrementCount}>Increment</button>
    </div>
  );
}

export default Counter;
