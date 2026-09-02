from fastapi import FastAPI
from pydantic import BaseModel

from concord3 import generate_concordance

app = FastAPI()

class ConcordanceRequest(BaseModel):
    exclusion_words: str
    body_text: str


@app.post("/api/concordance")
def create_concordance(request: ConcordanceRequest):
    exclusion_words = [
        word.strip().lower()
        for word in request.exclusion_words.splitlines()
        if word.strip()
    ]

    body_lines = [
        line.strip()
        for line in request.body_text.splitlines()
        if line.strip()
    ]

    output_lines = generate_concordance(
        body_lines,
        exclusion_words
    )

    return {
        "lines": output_lines,
        "output": "\n".join(output_lines),
    }
