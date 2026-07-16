import { useState, useEffect } from "react";
import { collection, getDocs } from "firebase/firestore";

import Navbar from "../components/navigation/Navbar";
import Hero from "../components/Hero";
import SearchBar from "../components/SearchBar";
import ServiceCard from "../components/ServiceCard";
import ProviderCard from "../components/ProviderCard";
import ProductCard from "../components/ProductCard";

import Container from "../components/UI/Container";
import Section from "../components/UI/Section";
import Heading from "../components/UI/Heading";
import Button from "../components/UI/Button";

import services from "../data/services";
import providers from "../data/providers";

import { db } from "../firebase/firebase";

function Home() {
  const [search, setSearch] = useState("");
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const snapshot = await getDocs(collection(db, "products"));

        const productList = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        setProducts(productList);
      } catch (error) {
        console.error(error);
      }
    };

    fetchProducts();
  }, []);

  return (
    <>
      <Navbar />

      <Hero />

      <SearchBar
        search={search}
        setSearch={setSearch}
      />

      {/* Popular Services */}
      <Section>
        <Container>
          <Heading>
            Popular Services
          </Heading>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {services.map((service) => (
              <ServiceCard
                key={service.id}
                icon={service.icon}
                name={service.name}
              />
            ))}
          </div>
        </Container>
      </Section>

      {/* Top Rated Professionals */}
      <Section background="gray">
        <Container>
          <Heading>
            Top Rated Professionals
          </Heading>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {providers.map((provider) => (
              <ProviderCard
                key={provider.id}
                name={provider.name}
                profession={provider.profession}
                location={provider.location}
                rating={provider.rating}
                price={provider.price}
                status={provider.status}
                image={provider.image}
              />
            ))}
          </div>
        </Container>
      </Section>

      {/* Marketplace Preview */}
      <Section>
        <Container>
          <div className="flex justify-between items-center mb-10">
            <Heading align="left" className="mb-0">
              Featured Products
            </Heading>

            <Button variant="ghost">
              View All →
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {products.map((product) => (
              <ProductCard
                key={product.id}
                id={product.id}
                name={product.name}
                price={product.price}
                oldPrice={product.oldPrice || product.price}
                seller={product.seller}
                sellerId={product.sellerId}
                rating={product.rating || 5}
                reviews={product.reviews || 0}
                location={product.location}
                verified={product.verified}
                image={product.image}
              />
            ))}
          </div>
        </Container>
      </Section>
    </>
  );
}

export default Home;