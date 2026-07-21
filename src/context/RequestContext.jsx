import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

import { useAuth } from "./AuthContext";

import {
  getMyRequests,
  getRequest,
} from "../services/requestService";


const RequestContext = createContext(null);



export function RequestProvider({ children }) {


  const { currentUser } = useAuth();



  const [myRequests, setMyRequests] = useState([]);



  const [selectedRequest, setSelectedRequest] =
    useState(null);



  const [loadingRequest, setLoadingRequest] =
    useState(false);



  const [loadingRequests, setLoadingRequests] =
    useState(true);






  // ==========================
  // Load Buyer Requests
  // ==========================

  const loadRequests = async () => {


    if (!currentUser) {

      setMyRequests([]);

      setLoadingRequests(false);

      return;

    }



    try {


      setLoadingRequests(true);



      const requests =
        await getMyRequests(
          currentUser.uid
        );



      setMyRequests(requests);



    } catch(error) {


      console.error(
        "Load Requests Error:",
        error
      );


    } finally {


      setLoadingRequests(false);


    }


  };







  // ==========================
  // Load Single Request
  // ==========================

  const loadRequest = async (requestId) => {


    try {


      setLoadingRequest(true);



      const request =
        await getRequest(
          requestId
        );



      setSelectedRequest(request);



    } catch(error) {


      console.error(
        "Load Single Request Error:",
        error
      );


    } finally {


      setLoadingRequest(false);


    }


  };








  useEffect(() => {


    loadRequests();


  }, [currentUser]);









  return (

    <RequestContext.Provider

      value={{

        myRequests,

        loadingRequests,


        selectedRequest,

        loadingRequest,


        loadRequest,


        refreshRequests:
          loadRequests,


      }}

    >

      {children}


    </RequestContext.Provider>

  );

}





export function useRequests() {


  return useContext(
    RequestContext
  );


}