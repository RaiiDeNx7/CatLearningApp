export default function BanList({ banList, removeBan }) {
  return (
    <div className="flex gap-3 items-center mb-4 flex-wrap">
      <div className="text-sm text-gray-700">Ban list:</div>
      {banList.length === 0 ? (
        <div className="text-xs text-gray-400">(none)</div>
      ) : (
        banList.map((b) => (
          <button
            key={b}
            onClick={() => removeBan(b)}
            className="px-2 py-1 text-xs border rounded-full bg-red-50 border-red-200"
          >
            {b}
          </button>
        ))
      )}
    </div>
  );
}
