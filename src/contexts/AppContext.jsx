import { createContext, useEffect, useState } from "react";

export const AppContext = createContext();
function AppProvider({ children }) {
  const [isLoading, setIsLoading] = useState(false);
  const [cities, setCities] = useState([]);

  useEffect(
    function () {
      setIsLoading(true);
      async function getdata() {
        const res = await fetch(`http://localhost:9100/cities`);
        const data = await res.json();
        setCities(data);
        setIsLoading(false);
      }
      getdata();
    },
    [setIsLoading, setCities]
  );

  return (
    <AppContext.Provider value={{ cities, setCities, isLoading, setIsLoading }}>
      {children}
    </AppContext.Provider>
  );
}

export default AppProvider;
