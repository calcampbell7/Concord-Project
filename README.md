# Concordance Generator

The Concordance Generator formats a body of text as a Key Word in Context
(KWIC) concordance.

A concordance highlights keywords and displays their surrounding context,
making text easier to search, scan, and index. Users can paste text into the
web interface, provide words to exclude, and generate a formatted concordance.

## Technologies

- **Frontend:** JavaScript, React, and Vite
- **Backend:** Python and FastAPI
- **Concordance logic:** Python, implemented in `concord3.py`
- **Deployment:** Vercel

## Project Background

This project began as an assignment for a second-year Software Development
Methods course. The original command-line program accepted a file path as
input and did not include a frontend. That version can be found in
`concord_cpy.py`.

I later extended the project by adding the web interface, API, and deployed
site.
