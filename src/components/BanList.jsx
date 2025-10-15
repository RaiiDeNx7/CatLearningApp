export default function BanList({ banList, removeBan }) {
  return (
    <div className="ban-list">
      <div className="text-sm text-gray-300 mb-2">Ban list:</div>
      {banList.length === 0 ? (
        <div className="text-xs text-gray-500">(none)</div>
      ) : (
        <div className="flex flex-wrap gap-2 justify-center">
          {banList.map((b) => (
            <button
              key={b}
              onClick={() => removeBan(b)}
              className="px-3 py-1 text-xs font-semibold rounded-full bg-[#d9b15f] text-black hover:bg-[#eac875] transition"
              title="Click to remove from ban list"
            >
              {b}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
