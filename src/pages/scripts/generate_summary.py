import sys
import os
import json
from dotenv import load_dotenv
import google.generativeai as genai
from youtube_transcript_api import YouTubeTranscriptApi

# Load environment variables
load_dotenv()
GOOGLE_API_KEY = os.getenv("GOOGLE_API_KEY")

def extract_transcript_details(youtube_video_url):
    try:
        video_id = youtube_video_url.split("=")[1]
        transcript_text = YouTubeTranscriptApi.get_transcript(video_id)
        transcript = " ".join([i["text"] for i in transcript_text])
        return transcript
    except Exception as e:
        raise RuntimeError(f"Error extracting transcript: {e}")

def generate_gemini_content(transcript_text, prompt):
    try:
        genai.configure(api_key=GOOGLE_API_KEY)
        model = genai.GenerativeModel("gemini-pro")
        response = model.generate_content(prompt + transcript_text)
        return response.text
    except Exception as e:
        raise RuntimeError(f"Error generating content: {e}")

def format_summary(summary_text):
    # Example to format the summary as structured JSON
    # Customize this to match the format and details you want
    return {
        "summary": {
            "title": "Video Summary",
            "description": "Here is a summary of the YouTube video:",
            "details": summary_text.strip()  # Use the raw summary text for now
        }
    }

if __name__ == "__main__":
    if len(sys.argv) != 2:
        print("Usage: python generate_summary.py <youtube_link>")
        sys.exit(1)
    
    youtube_link = sys.argv[1]
    prompt = """You are a YouTube video summarizer and notes provider. You will be taking the transcript text
    and summarizing and giving the notes of the entire video and providing the important summary in points
    within 1000 words. Please provide the notes of the text given here:  """

    try:
        transcript_text = extract_transcript_details(youtube_link)
        summary_text = generate_gemini_content(transcript_text, prompt)
        # Format the summary into a more structured JSON
        summary_json = format_summary(summary_text)
        print(json.dumps(summary_json, indent=4))
    except Exception as e:
        print(f"Error: {e}")
        sys.exit(1)
