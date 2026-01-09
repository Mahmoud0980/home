import { useParams, Link } from "react-router-dom";

const properties = [
  {
    id: 1,
    title: "Luxury Apartment",
    location: "New York, NY",
    price: 1200,
    type: "Rent",
    image: "https://via.placeholder.com/600x400",
    description:
      "A beautiful apartment with 2 bedrooms, 1 bathroom, and modern amenities.",
  },
  {
    id: 2,
    title: "Cozy House",
    location: "Los Angeles, CA",
    price: 350000,
    type: "Sale",
    image: "https://via.placeholder.com/600x400",
    description:
      "A cozy house in a friendly neighborhood with 3 bedrooms and a garden.",
  },
  {
    id: 3,
    title: "Modern Condo",
    location: "Miami, FL",
    price: 900,
    type: "Rent",
    image: "https://via.placeholder.com/600x400",
    description:
      "Modern condo with pool access, 1 bedroom, and gym facilities.",
  },
];

function PropertyDetails() {
  const { id } = useParams();
  const property = properties.find((p) => p.id === parseInt(id));

  if (!property) return <p className="p-6">Property not found.</p>;

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <img
        src={property.image}
        alt={property.title}
        className="w-full h-96 object-cover rounded-lg mb-6"
      />
      <h2 className="text-3xl font-bold mb-2">{property.title}</h2>
      <p className="text-gray-600 mb-2">{property.location}</p>
      <p className="text-blue-600 font-semibold mb-4">${property.price}</p>
      <p className="text-gray-500 mb-6">{property.type}</p>
      <p className="text-gray-700">{property.description}</p>
      <Link
        to="/"
        className="inline-block mt-6 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
      >
        Back to Home
      </Link>
    </div>
  );
}

export default PropertyDetails;
