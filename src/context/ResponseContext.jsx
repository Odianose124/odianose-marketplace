import {
  createContext,
  useContext,
  useState,
} from "react";

import { getOffers } from "../services/responseService";

const ResponseContext = createContext(null);

export function ResponseProvider({ children }) {

  const [offers, setOffers] = useState([]);

  const [loadingOffers, setLoadingOffers] =
    useState(false);

  const loadOffers = async (requestId) => {

    try {

      setLoadingOffers(true);

      const data = await getOffers(requestId);

      setOffers(data);

    } catch (error) {

      console.error(error);

    } finally {

      setLoadingOffers(false);

    }

  };

  return (

    <ResponseContext.Provider
      value={{
        offers,
        loadingOffers,
        loadOffers,
      }}
    >

      {children}

    </ResponseContext.Provider>

  );

}

export function useResponses() {

  return useContext(ResponseContext);

}