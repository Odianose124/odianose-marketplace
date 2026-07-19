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

  const loadRequests = async () => {
    if (!currentUser) return;
};

const loadRequest = async (requestId) => {
  try {
    setLoadingRequest(true);

    const request = await getRequest(requestId);

    setSelectedRequest(request);
  } catch (error) {
    console.error(error);
  } finally {
    setLoadingRequest(false);
  }

    try {
      const requests = await getMyRequests(
        currentUser.uid
      );

      setMyRequests(requests);
    } catch (error) {
      console.error(error);
    } finally {
      setLoadingRequests(false);
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

  refreshRequests: loadRequests,
  loadRequest,
}}
    >
      {children}
    </RequestContext.Provider>
  );
}

export function useRequests() {
  return useContext(RequestContext);
}