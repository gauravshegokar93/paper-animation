// import { useState } from "react";

// export default function Home() {
//   const [selectedFile, setSelectedFile] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const [videoUrl, setVideoUrl] = useState(null);

//   const handleFileChange = (e) => {
//     setSelectedFile(e.target.files[0]);
//   };

//   const handleUpload = async () => {
//     if (!selectedFile) {
//       alert("Please select an image first!");
//       return;
//     }

//     setLoading(true);
//     setVideoUrl(null);

//     const formData = new FormData();
//     formData.append("file", selectedFile);

//     try {
//       const response = await fetch("http://127.0.0.1:8000/upload", {
//         method: "POST",
//         body: formData,
//       });

//       const data = await response.json();
//       const downloadUrl = `http://127.0.0.1:8000${data.video_url}`;

//       setVideoUrl(downloadUrl);
//     } catch (error) {
//       console.error("Upload failed:", error);
//       alert("Something went wrong. Check your backend.");
//     }

//     setLoading(false);
//   };

//   return (
//     <div style={{ padding: "20px", maxWidth: "500px", margin: "auto", textAlign: "center" }}>
//       <h1>Paper Animation Generator</h1>

//       <input
//         type="file"
//         accept="image/*"
//         onChange={handleFileChange}
//         style={{ margin: "20px 0" }}
//       />

//       <button
//         onClick={handleUpload}
//         disabled={loading}
//         style={{
//           padding: "10px 20px",
//           background: loading ? "#888" : "#0070f3",
//           color: "white",
//           border: "none",
//           cursor: loading ? "not-allowed" : "pointer",
//         }}
//       >
//         {loading ? "Processing..." : "Upload & Generate"}
//       </button>

//       {videoUrl && (
//         <div style={{ marginTop: "20px" }}>
//           <a
//             href={videoUrl}
//             download
//             style={{
//               display: "inline-block",
//               padding: "10px 20px",
//               background: "#28a745",
//               color: "white",
//               textDecoration: "none",
//             }}
//           >
//             Download Your Video
//           </a>
//         </div>
//       )}
//     </div>
//   );
// }
