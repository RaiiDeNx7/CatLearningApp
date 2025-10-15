export default function AttributeList({ cat, banList, toggleBan }) {
  if (!cat)
    return <div className="text-sm text-gray-400">Attributes will appear here after you Discover a cat.</div>;

  const attrKey = (k, v) => `${k}:${v}`;

  return (
    <div className="space-y-2">
      {Object.entries(cat.attrs).map(([k, v]) => {
        const key = attrKey(k, v);
        const blocked = banList.includes(key);
        return (
          <div key={k} className="flex items-center justify-between">
            <div>
              <div className="text-sm text-gray-500">{k}</div>
              <button
                onClick={() => toggleBan(k, v)}
                className={`mt-1 px-2 py-1 rounded ${
                  blocked ? "line-through text-gray-400" : "underline text-blue-600"
                }`}
              >
                {v}
              </button>
            </div>
            {blocked && <div className="text-xs text-gray-400">BANNED</div>}
          </div>
        );
      })}
    </div>
  );
}
