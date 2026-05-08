import { useEffect } from "react";
import { initActivityTracking } from "./utils/activityTracker";

function App() {
  useEffect(() => {
    initActivityTracking();
  }, []);

  return (
    <>
      
    </>
  );
}

export default App;