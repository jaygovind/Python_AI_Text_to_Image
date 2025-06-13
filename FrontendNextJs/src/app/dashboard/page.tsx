'use client';

import { useState } from "react";
import axios from "axios";

export default function Home() {
  const [image, setImage] = useState(null);
const [gifUrl, setGifUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleUpload = async () => {
    debugger
    if (!image) return;

    const formData = new FormData();
    formData.append("image", image);

    setLoading(true);
    const response = await axios.post("http://localhost:5000/generate", formData, {
      responseType: "blob"
    });

    const blob = new Blob([response.data], { type: "image/gif" });
    setGifUrl(URL.createObjectURL(blob));
    setLoading(false);
  };

  return (
    <div style={{ padding: 20 }}>
      <h1>­ЪДа 3D AI Image to Video</h1>
      {/* <input type="file" accept="image/*" onChange={(e) => setImage(e.target?.files[0])} /> */}
      <button onClick={handleUpload} disabled={loading}>
        {loading ? "Generating..." : "Generate 3D GIF"}
      </button>

      {gifUrl && (
        <div style={{ marginTop: 20 }}>
          <h3>Result:</h3>
          <img src={gifUrl} alt="3D Gif" />
          <a href={gifUrl} download="3d.gif">Download GIF</a>
        </div>
      )}
    </div>
  );
}
