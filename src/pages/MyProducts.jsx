import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";

import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  query,
  where,
} from "firebase/firestore";

import Navbar from "../components/Navbar";
import { db } from "../firebase/firebase";
import { useAuth } from "../context/AuthContext";

function MyProducts() {
  const { currentUser } = useAuth();

  const [products, setProducts] = useState([]);

  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");

  useEffect(() => {
    if (!currentUser) return;

    const fetchProducts = async () => {
      try {
        setLoading(true);

        const q = query(
          collection(db, "products"),
          where("sellerId", "==", currentUser.uid)
        );

        const snapshot = await getDocs(q);

        const productList = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        setProducts(productList);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [currentUser]);

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const keyword = search.toLowerCase();

      return (
        product.productName
          ?.toLowerCase()
          .includes(keyword) ||

        product.category
          ?.toLowerCase()
          .includes(keyword) ||

        product.subCategory
          ?.toLowerCase()
          .includes(keyword)
      );
    });
  }, [products, search]);

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Delete this product?"
    );

    if (!confirmDelete) return;

    try {
      await deleteDoc(doc(db, "products", id));

      setProducts((prev) =>
        prev.filter(
          (product) => product.id !== id
        )
      );

      alert("Product deleted successfully.");
    } catch (error) {
      console.log(error);

      alert("Unable to delete product.");
    }
  };

  const getStockStatus = (qty) => {
    if (qty <= 0) {
      return {
        text: "Out of Stock",
        color:
          "bg-red-100 text-red-700",
      };
    }

    if (qty <= 5) {
      return {
        text: "Low Stock",
        color:
          "bg-yellow-100 text-yellow-700",
      };
    }

    return {
      text: "In Stock",
      color:
        "bg-green-100 text-green-700",
    };
  };
    return (
    <>
      <Navbar />

      <main className="min-h-screen bg-gray-100 py-10 px-6">

        <div className="max-w-7xl mx-auto">

          {/* Header */}

          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-5">

            <div>

              <h1 className="text-4xl font-bold text-green-700">
                My Products
              </h1>

              <p className="text-gray-500 mt-2">
                Manage all your marketplace products.
              </p>

            </div>

            <Link
              to="/add-product"
              className="bg-green-700 hover:bg-green-800 text-white px-6 py-4 rounded-xl font-semibold"
            >
              + Add Product
            </Link>

          </div>

          {/* Search */}

          <div className="mt-8">

            <input
              type="text"
              placeholder="Search products..."
              value={search}
              onChange={(e)=>setSearch(e.target.value)}
              className="w-full bg-white border rounded-xl p-4 outline-none focus:ring-2 focus:ring-green-600"
            />

          </div>

          {/* Loading */}

          {

            loading

            ?

            <div className="text-center py-20">

              <h2 className="text-2xl font-semibold">
                Loading products...
              </h2>

            </div>

            :

            filteredProducts.length === 0

            ?

            <div className="bg-white rounded-3xl shadow-md mt-10 py-20 text-center">

              <h2 className="text-3xl font-bold">
                No Products Found
              </h2>

              <p className="text-gray-500 mt-3">
                Start selling by uploading your first product.
              </p>

              <Link
                to="/add-product"
                className="inline-block mt-6 bg-green-700 text-white px-8 py-4 rounded-xl"
              >
                Upload Product
              </Link>

            </div>

            :

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mt-10">

              {

                filteredProducts.map((product)=>{

                  const stock =
                    getStockStatus(
                      product.quantityAvailable || 0
                    );

                  return(

                    <div
                      key={product.id}
                      className="bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-xl transition"
                    >

                      <img
                        src={
                          product.image ||
                          "https://via.placeholder.com/600x400?text=No+Image"
                        }
                        alt={product.productName}
                        className="w-full h-56 object-cover"
                      />

                      <div className="p-6">

                        <h2 className="text-2xl font-bold">

                          {product.productName}

                        </h2>

                        <p className="text-gray-500 mt-2">

                          {product.category}

                        </p>

                        <p className="text-gray-500">

                          {product.subCategory}

                        </p>

                        <div className="flex justify-between items-center mt-5">

                          <h3 className="text-3xl font-bold text-green-700">

                            ₦{product.price?.toLocaleString()}

                          </h3>

                          <span
                            className={`px-3 py-1 rounded-full text-sm font-semibold ${stock.color}`}
                          >

                            {stock.text}

                          </span>

                        </div>

                        <div className="mt-5 space-y-2 text-gray-600">

                          <p>

                            <strong>Measurement:</strong>{" "}

                            {product.measurement}

                          </p>

                          <p>

                            <strong>Stock:</strong>{" "}

                            {product.quantityAvailable}

                          </p>

                          <p>

                            <strong>Location:</strong>{" "}

                            {product.location}

                          </p>

                        </div>

                        <div className="grid grid-cols-3 gap-3 mt-8">

                          <Link
                            to={`/marketplace/product/${product.id}`}
                          >

                            <button className="w-full bg-green-700 text-white py-3 rounded-xl hover:bg-green-800">

                              View

                            </button>

                          </Link>

                          <Link
                            to={`/edit-product/${product.id}`}
                          >

                            <button className="w-full bg-blue-600 text-white py-3 rounded-xl hover:bg-blue-700">

                              Edit

                            </button>

                          </Link>

                          <button
                            onClick={()=>handleDelete(product.id)}
                            className="bg-red-600 text-white py-3 rounded-xl hover:bg-red-700"
                          >

                            Delete

                          </button>

                        </div>

                      </div>

                    </div>

                  )

                })

              }

            </div>

          }

        </div>

      </main>

    </>
  );

}

export default MyProducts;