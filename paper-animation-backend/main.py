from fastapi.middleware.cors import CORSMiddleware
from fastapi import FastAPI, UploadFile, File
from fastapi.responses import FileResponse
import shutil
import subprocess
import uuid
import os

app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Agar sirf localhost chahiye, to ["http://localhost:3000"]
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


UPLOAD_FOLDER = "uploads"
OUTPUT_FOLDER = "outputs"

os.makedirs(UPLOAD_FOLDER, exist_ok=True)
os.makedirs(OUTPUT_FOLDER, exist_ok=True)

@app.post("/upload")
async def upload_image(file: UploadFile = File(...)):
    file_id = str(uuid.uuid4())
    input_path = f"{UPLOAD_FOLDER}/{file_id}.png"
    output_path = f"{OUTPUT_FOLDER}/{file_id}.mp4"

    with open(input_path, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)

    # Call FFmpeg function to create animation
    create_paper_animation("green_screen.mp4", input_path, output_path)

    return {"video_url": f"/download/{file_id}"}

@app.get("/download/{file_id}")
async def download_video(file_id: str):
    output_path = f"{OUTPUT_FOLDER}/{file_id}.mp4"
    return FileResponse(output_path, media_type="video/mp4", filename="your_paper_animation.mp4")

def create_paper_animation(green_screen_video, user_image, output_video):
    cmd = [
        "ffmpeg",
        "-i", green_screen_video,
        "-i", user_image,
        "-filter_complex",
        "[0:v]colorkey=0x00FF00:0.3:0.2[ckout];[ckout][1:v]overlay[out]",
        "-map", "[out]",
        "-y",
        output_video
    ]
    subprocess.run(cmd, check=True)
