import PropertyCard from "./PropertyCard";

function PropertyList({ properties }) {
  return (
    <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
      {properties && properties.length > 0 ? (
        properties.map((property, index) => (
          <PropertyCard key={index} {...property} />
        ))
      ) : (
        <p className="text-center text-gray-600 col-span-3">
          لا توجد عقارات مطابقة للبحث 🔍
        </p>
      )}
    </div>
  );
}

export default PropertyList;
