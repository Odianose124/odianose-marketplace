import { useEffect, useState } from "react";

import {
  collection,
  getDocs,
} from "firebase/firestore";

import ProductCard from "../ProductCard";
import { db } from "../../firebase/firebase";

function ProductGrid({ searchTerm }) {

  const [products, setProducts] = useState([]);

  const [filteredProducts, setFilteredProducts] = useState([]);

  const [loading, setLoading] = useState(true);



  useEffect(() => {

    const fetchProducts = async () => {

      try {

        setLoading(true);

        const snapshot = await getDocs(
          collection(db, "products")
        );

        const productList = snapshot.docs.map((doc) => ({

          id: doc.id,

          ...doc.data(),

        }));

        setProducts(productList);

        setFilteredProducts(productList);

      } catch (error) {

        console.log(error);

      } finally {

        setLoading(false);

      }

    };

    fetchProducts();

  }, []);




  useEffect(() => {

    if (!searchTerm?.trim()) {

      setFilteredProducts(products);

      return;

    }

    const search = searchTerm.toLowerCase();
    console.log("Search:", searchTerm);
console.log("Products:", products);

    const results = products.filter((product) => {
      console.log(product.name);
    

      return (

        (product.name || "")
  .toLowerCase()
  .includes(search)

        ||

        (product.category || "")
  .toLowerCase()
  .includes(search)

        ||

        (product.subCategory || "")
  .toLowerCase()
          .includes(search)

        ||

        (product.seller || "")
  .toLowerCase()
  .includes(search)

        ||

        (product.location || "")
  .toLowerCase()
  .includes(search)

        ||

        (product.state || "")
  .toLowerCase()
  .includes(search)

      );

    });
    console.log("Filtered products:", results);
console.log("Filtered count:", results.length);

    setFilteredProducts(results);

  }, [searchTerm, products]);



  if (loading) {

    return (

      <section className="py-20 text-center">

        <h2 className="text-2xl font-semibold">

          Loading Products...

        </h2>

      </section>

    );

  }
    return (

    <section className="py-12">

      <div className="flex justify-between items-center mb-8 flex-wrap gap-4">

        <div>

          <h2 className="text-3xl font-bold">

            Featured Products

          </h2>

          <p className="text-gray-500 mt-2">

            {filteredProducts.length} Product
            {filteredProducts.length !== 1 ? "s" : ""} Found

          </p>

        </div>

        <button className="text-green-700 font-semibold hover:underline">

          View All →

        </button>

      </div>



      {

        products.length === 0

        ?

        (

          <div className="bg-white rounded-3xl shadow-md py-20 text-center">

            <h2 className="text-3xl font-bold">

              No Products Available

            </h2>

            <p className="text-gray-500 mt-3">

              Sellers have not uploaded any products yet.

            </p>

          </div>

        )

        :

        filteredProducts.length === 0

        ?

        (

          <div className="bg-white rounded-3xl shadow-md py-20 text-center">

            <h2 className="text-3xl font-bold">

              No Products Found

            </h2>

            <p className="text-gray-500 mt-3">

              Try searching with another keyword.

            </p>

          </div>

        )

        :

        (

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">

  {

    filteredProducts.map((product) => (

      <ProductCard

        key={product.id}

        id={product.id}

        name={product.name}

        price={product.price}

        oldPrice={
          product.oldPrice ||
          product.price
        }

        seller={
  product.seller ||
  "ODIANOSE Seller"
}

        sellerId={product.sellerId}

        rating={product.rating || 5}

        reviews={product.reviews || 0}

        location={
          product.location ||
          product.state ||
          "Nigeria"
        }

        verified={product.verified ?? false}

        image={
          product.image ||
          "https://via.placeholder.com/500x500?text=No+Image"
        }

        measurement={product.measurement}

        quantityAvailable={
          product.quantityAvailable
        }

        category={product.category}

        subCategory={product.subCategory}

        onlineStatus={product.onlineStatus}

      />

    ))

  }

</div>

        )

      }

    </section>

      );
      
    }

export default ProductGrid;