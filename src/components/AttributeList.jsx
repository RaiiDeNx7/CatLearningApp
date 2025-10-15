// src/components/AttributeList.jsx
export default function AttributeList({ cat, banList, toggleBan }) {
  if (!cat)
    return (
      <div className="text-sm text-gray-400">
        Attributes will appear here after you Discover a cat.
      </div>
    );

  const attrKey = (k, v) => `${k}:${v}`;

  return (
    <div className="attr-buttons">
      {Object.entries(cat.attrs).map(([k, v]) => {
        const key = attrKey(k, v);
        const blocked = banList.includes(key);

        return (
          <button
            key={k}
            onClick={() => toggleBan(k, v)}
            className={`attr-btn ${blocked ? "banned" : ""}`}
          >
            {k}: {v}
          </button>
        );
      })}
    </div>
  );
}
