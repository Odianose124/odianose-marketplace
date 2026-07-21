import {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
} from "react";

import { useAuth } from "./AuthContext";

import { getSellerProfile } from "../services/sellerService";


const SellerContext = createContext(null);



export function SellerProvider({ children }) {

  const { currentUser } = useAuth();


  const [sellerProfile, setSellerProfile] = useState(null);

  const [loadingSeller, setLoadingSeller] = useState(true);



  const loadSeller = useCallback(async () => {


    if (!currentUser) {

      setSellerProfile(null);

      setLoadingSeller(false);

      return;

    }



    try {


      const seller =
        await getSellerProfile(
          currentUser.uid
        );


      setSellerProfile(seller);



    } catch (error) {


      console.error(
        "Seller Context Error:",
        error
      );


    } finally {


      setLoadingSeller(false);


    }


  }, [currentUser]);





  useEffect(() => {

    loadSeller();

  }, [loadSeller]);





  return (

    <SellerContext.Provider

      value={{

        sellerProfile,

        setSellerProfile,

        loadingSeller,

        refreshSeller: loadSeller,

      }}

    >

      {children}

    </SellerContext.Provider>

  );

}





export function useSeller() {

  return useContext(
    SellerContext
  );

}