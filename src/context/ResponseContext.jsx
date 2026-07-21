import {
  createContext,
  useContext,
  useState,
} from "react";

import {
  getRequestOffers,
} from "../services/responseService";


const ResponseContext = createContext(null);



export function ResponseProvider({ children }) {


  const [offers, setOffers] = useState([]);


  const [loadingOffers, setLoadingOffers] =
    useState(false);





  // ==========================
  // Load Offers For Request
  // ==========================

  const loadOffers = async (requestId) => {


    try {


      setLoadingOffers(true);



      const data =
        await getRequestOffers(
          requestId
        );



      setOffers(data);



    } catch (error) {


      console.error(
        "Response Context Error:",
        error
      );



    } finally {


      setLoadingOffers(false);


    }


  };







  return (

    <ResponseContext.Provider

      value={{

        offers,

        setOffers,

        loadingOffers,

        loadOffers,

      }}

    >

      {children}

    </ResponseContext.Provider>

  );


}






export function useResponses() {


  return useContext(
    ResponseContext
  );


}