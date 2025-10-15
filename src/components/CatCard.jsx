export default function CatCard({ cat, error, loading }) {
  return (
    <div className="bg-gray-100 rounded-lg h-80 flex items-center justify-center overflow-hidden">
      {loading ? (
        <div className="text-gray-500">Loading...</div>
      ) : cat ? (
        <img src={cat.image} alt="cat" className="object-cover w-full h-full" />
      ) : (
        <div className="text-gray-500">No cat yet — click Discover</div>
      )}
      {error && <div className="mt-2 text-sm text-red-600">{error}</div>}
    </div>
  );
}
