import { useState } from "react";

export default function useCatAPI(banList) {
  const [cat, setCat] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchCat = async () => {
    try {
      setLoading(true);
      setError(null);

      // Fetch a random cat image
      const res = await fetch("https://api.thecatapi.com/v1/images/search");
      if (!res.ok) throw new Error("Failed to fetch cat");

      const data = await res.json();
      const catImage = data[0]?.url;

      // Example static attributes (you can randomize these later)
      const attrs = {
        Color: "Gray",
        Mood: "Playful",
        Pattern: "Striped",
        Size: "Small",
        Fur: "Long",
        Ears: "Pointy",
      };

      // Filter out banned attributes
      const filteredAttrs = Object.fromEntries(
        Object.entries(attrs).filter(
          ([k, v]) => !banList.includes(`${k}:${v}`)
        )
      );

      setCat({ image: catImage, attrs: filteredAttrs });
    } catch (err) {
      console.error(err);
      setError("Failed to fetch cat 😿");
    } finally {
      setLoading(false);
    }
  };

  return { cat, loading, error, fetchCat };
}
