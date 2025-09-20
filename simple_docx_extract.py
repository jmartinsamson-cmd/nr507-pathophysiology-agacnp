import zipfile
import xml.etree.ElementTree as ET
import os
import json
import re

def extract_text_from_docx(docx_path):
    """Extract raw text from docx file using zipfile"""
    try:
        text_content = []

        with zipfile.ZipFile(docx_path, 'r') as zip_file:
            # Extract document.xml which contains the main text
            xml_content = zip_file.read('word/document.xml')

            # Parse XML
            root = ET.fromstring(xml_content)

            # Define namespace
            namespace = {'w': 'http://schemas.openxmlformats.org/wordprocessingml/2006/main'}

            # Extract all text elements
            for text_elem in root.iter():
                if text_elem.tag.endswith('}t'):  # Text elements
                    if text_elem.text:
                        text_content.append(text_elem.text)
                elif text_elem.tag.endswith('}tab'):  # Tab characters
                    text_content.append('\t')
                elif text_elem.tag.endswith('}br'):  # Line breaks
                    text_content.append('\n')

        # Join all text and clean up
        raw_text = ''.join(text_content)

        # Clean up extra whitespace but preserve structure
        lines = raw_text.split('\n')
        cleaned_lines = []
        for line in lines:
            cleaned_line = ' '.join(line.split())  # Remove extra spaces
            if cleaned_line:
                cleaned_lines.append(cleaned_line)

        return '\n'.join(cleaned_lines)

    except Exception as e:
        print(f"Error reading {docx_path}: {str(e)}")
        return ""

def parse_questions_from_text(text, chapter_num):
    """Parse questions from extracted text"""
    questions = []

    # Split text into potential question blocks
    # Look for numbered patterns like "1.", "2.", etc.
    question_blocks = re.split(r'\n(?=\d+\.)', text)

    for block in question_blocks:
        if not block.strip():
            continue

        lines = block.strip().split('\n')
        if not lines:
            continue

        first_line = lines[0].strip()

        # Check if it starts with a number followed by a period
        question_match = re.match(r'^(\d+)\.\s*(.+)', first_line)
        if not question_match:
            continue

        question_num = int(question_match.group(1))
        question_start = question_match.group(2)

        # Collect the full question text and options
        question_text = question_start
        options = []
        correct_answers = []
        rationale = ""

        current_section = "question"

        for line in lines[1:]:
            line = line.strip()
            if not line:
                continue

            # Check for option patterns (A), B), C), D) or A., B., C., D.
            option_match = re.match(r'^([A-D])[\.\)]\s*(.+)', line)
            if option_match:
                current_section = "options"
                options.append(option_match.group(2))
                continue

            # Check for numbered options 1), 2), 3), 4)
            numbered_option_match = re.match(r'^([1-4])[\.\)]\s*(.+)', line)
            if numbered_option_match:
                current_section = "options"
                options.append(numbered_option_match.group(2))
                continue

            # Look for answer indicators
            if any(keyword in line.lower() for keyword in ['answer:', 'correct answer', 'ans:']):
                current_section = "answer"
                # Extract answer letters/numbers
                answer_matches = re.findall(r'[A-D]|[1-4]', line)
                for ans in answer_matches:
                    if ans.isdigit():
                        correct_answers.append(int(ans) - 1)
                    else:
                        correct_answers.append(ord(ans.upper()) - ord('A'))
                continue

            # Look for rationale
            if any(keyword in line.lower() for keyword in ['rationale', 'explanation', 'reason']):
                current_section = "rationale"
                rationale = line
                continue

            # Add to current section
            if current_section == "question":
                question_text += " " + line
            elif current_section == "rationale":
                rationale += " " + line

        # Only add if we have question text and options
        if question_text and options:
            questions.append({
                'question_number': question_num,
                'question_text': question_text.strip(),
                'options': options,
                'correct_answers': correct_answers if correct_answers else [0],
                'rationale': rationale.strip()
            })

    return questions

# Process all chapters
base_path = r"C:\Users\jsamb\OneDrive\Desktop\Exampee"
chapters = [28, 29, 30, 32, 34, 35, 37, 38]

extracted_data = {}

print("Extracting content from docx files...")

for chapter in chapters:
    docx_path = f"{base_path}\\Chapter {chapter}.docx"
    print(f"\nProcessing Chapter {chapter}...")

    if os.path.exists(docx_path):
        # Extract raw text
        raw_text = extract_text_from_docx(docx_path)

        if raw_text:
            # Parse questions
            questions = parse_questions_from_text(raw_text, chapter)

            extracted_data[chapter] = {
                'raw_text': raw_text[:3000],  # First 3000 chars for inspection
                'questions': questions,
                'question_count': len(questions),
                'text_length': len(raw_text)
            }

            print(f"  Extracted text length: {len(raw_text)} characters")
            print(f"  Parsed {len(questions)} questions")
        else:
            extracted_data[chapter] = {
                'raw_text': "",
                'questions': [],
                'question_count': 0,
                'text_length': 0
            }
            print(f"  Failed to extract text")
    else:
        print(f"  File not found: {docx_path}")
        extracted_data[chapter] = {
            'raw_text': "",
            'questions': [],
            'question_count': 0,
            'text_length': 0
        }

# Save extracted data
output_file = f"{base_path}\\docx_extracted_data.json"
with open(output_file, 'w', encoding='utf-8') as f:
    json.dump(extracted_data, f, indent=2, ensure_ascii=False)

print(f"\nExtraction complete. Data saved to: {output_file}")
print("\nSummary:")
for chapter in chapters:
    data = extracted_data[chapter]
    print(f"  Chapter {chapter}: {data['question_count']} questions, {data['text_length']} chars")