#!/usr/bin/env python3
"""Extract text from docx files for question analysis"""

import os
import sys
from docx import Document
import json

def extract_docx_text(docx_path):
    """Extract all text from a docx file"""
    if not os.path.exists(docx_path):
        print(f"File does not exist: {docx_path}")
        return ""

    doc = Document(docx_path)

    # Extract all text from the document
    full_text = []
    for paragraph in doc.paragraphs:
        if paragraph.text.strip():  # Only add non-empty paragraphs
            full_text.append(paragraph.text.strip())

    return '\n'.join(full_text)

def main():
    if len(sys.argv) != 2:
        print("Usage: python extract_docx.py <docx_file_path>")
        sys.exit(1)

    docx_path = sys.argv[1]
    text = extract_docx_text(docx_path)

    print(f"Extracted {len(text)} characters from {docx_path}")
    print("="*50)
    print(text)

if __name__ == "__main__":
    main()