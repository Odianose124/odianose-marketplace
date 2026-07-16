import CategoryCard from "./CategoryCard";
import categories from "../../data/categories";

function CategoryGrid() {
  return (
    <section className="py-10">

      <div className="flex justify-between items-center mb-8">

        <h2 className="text-3xl font-bold">
          Shop by Category
        </h2>

        <button className="text-green-700 font-semibold hover:underline">
          View All →
        </button>

      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-4 gap-6">

        {categories.map((category) => (

          <CategoryCard
            key={category.id}
            icon={category.icon}
            name={category.name}
          />

        ))}

      </div>

    </section>
  );
}

export default CategoryGrid;