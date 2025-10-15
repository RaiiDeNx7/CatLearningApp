import { useState } from "react";

export default function useCatAPI(banList) {
  const [cat, setCat] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const randomFrom = (arr) => arr[Math.floor(Math.random() * arr.length)];

  const fetchCat = async (attempt = 1) => {
    try {
      setLoading(true);
      setError(null);

      // Get a random cat image from the API
      const res = await fetch("https://api.thecatapi.com/v1/images/search", {
        headers: {
          "x-api-key": "live_SR1Z9CoBAEEFq3TsRk52vXXVRTJ4FPKb1Mj8qVviYUqco7sY7INLDQghtzDBE9zQ",
        },
      });

      if (!res.ok) throw new Error("Failed to fetch cat");
      const data = await res.json();
      const catImage = data[0]?.url;

      // Randomized attributes
      const attrs = {
        Color: randomFrom(["Gray", "White", "Black", "Orange", "Cream", "Brown"]),
        Mood: randomFrom(["Playful", "Grumpy", "Sleepy", "Curious", "Happy"]),
        Pattern: randomFrom(["Striped", "Solid", "Spotted", "Bicolor"]),
        Size: randomFrom(["Small", "Medium", "Large"]),
        Fur: randomFrom(["Short", "Medium", "Long"]),
        Ears: randomFrom(["Pointy", "Folded", "Rounded"]),
      };

      // Check if any of these attrs are banned
      const violatesBan = Object.entries(attrs).some(([k, v]) =>
        banList.includes(`${k}:${v}`)
      );

      if (violatesBan) {
        console.log(`Attempt ${attempt}: Banned trait found — refetching...`);
        // Try again up to a limit
        if (attempt < 5) {
          return fetchCat(attempt + 1);
        } else {
          throw new Error("Couldn't find a cat that fits your bans 😿");
        }
      }

      // If safe, update cat
      setCat({ image: catImage, attrs });
    } catch (err) {
      console.error(err);
      setError(err.message || "Failed to fetch cat 😿");
    } finally {
      setLoading(false);
    }
  };

  return { cat, loading, error, fetchCat };
}
