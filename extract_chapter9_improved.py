import zipfile
import xml.etree.ElementTree as ET
import json
import re

def extract_text_from_docx(docx_path):
    """Extract text from docx file by parsing the XML directly"""
    try:
        with zipfile.ZipFile(docx_path, 'r') as zip_file:
            xml_content = zip_file.read('word/document.xml')

        root = ET.fromstring(xml_content)
        namespace = {'w': 'http://schemas.openxmlformats.org/wordprocessingml/2006/main'}

        text_elements = []
        for paragraph in root.findall('.//w:p', namespace):
            paragraph_text = ""
            for text_elem in paragraph.findall('.//w:t', namespace):
                if text_elem.text:
                    paragraph_text += text_elem.text
            if paragraph_text.strip():
                text_elements.append(paragraph_text.strip())

        return text_elements

    except Exception as e:
        print(f"Error extracting from docx: {e}")
        return []

def is_question(text):
    """Determine if a line of text is likely a question"""
    # Remove leading numbers if present
    clean_text = re.sub(r'^\d+\.\s*', '', text)

    # Check if it looks like a question
    return (
        (clean_text.endswith(':') or clean_text.endswith('?')) and
        len(clean_text) > 25 and
        not re.match(r'^(ANS|PTS|REF|DIF|OBJ|TOP|MSC|KEY):', text) and
        not text.lower().startswith('chapter') and
        not text.lower().startswith('multiple choice')
    )

def is_option(text):
    """Determine if a line of text is likely an answer option"""
    # Check for various option patterns
    patterns = [
        r'^[a-d][.\)]\s*',  # a. or a)
        r'^[A-D][.\)]\s*',  # A. or A)
        r'^\s*[a-d]\.\s*',  # spaced a.
        r'^\s*[A-D]\.\s*',  # spaced A.
    ]

    for pattern in patterns:
        if re.match(pattern, text, re.IGNORECASE):
            return True

    return False

def clean_option_text(text):
    """Remove option prefixes from text"""
    # Remove various option prefixes
    patterns = [
        r'^[a-dA-D][.\)]\s*',
        r'^\s*[a-dA-D]\.\s*',
    ]

    cleaned = text
    for pattern in patterns:
        cleaned = re.sub(pattern, '', cleaned)

    return cleaned.strip()

def parse_chapter9_questions_improved(text_elements):
    """Improved parsing for Chapter 9 questions"""
    questions = []
    i = 0

    while i < len(text_elements):
        text = text_elements[i].strip()

        if not text:
            i += 1
            continue

        # Check if this is a question
        if is_question(text):
            current_question = {
                'id': len(questions) + 1,
                'text': text,
                'options': [],
                'correct': [],
                'rationale': ''
            }

            i += 1

            # Collect options
            while i < len(text_elements):
                next_text = text_elements[i].strip()

                if not next_text:
                    i += 1
                    continue

                # Check for answer
                if re.match(r'^ANS:\s*[A-F]', next_text, re.IGNORECASE):
                    answer_match = re.search(r'ANS:\s*([A-F])', next_text, re.IGNORECASE)
                    if answer_match:
                        answer_letter = answer_match.group(1).upper()
                        current_question['correct'] = [ord(answer_letter) - ord('A')]
                    i += 1

                    # Look for rationale
                    if i < len(text_elements):
                        potential_rationale = text_elements[i].strip()
                        if (potential_rationale and
                            not re.match(r'^(PTS:|REF:|DIF:|OBJ:|TOP:|MSC:|KEY:|ANS:)', potential_rationale) and
                            len(potential_rationale) > 15 and
                            not is_question(potential_rationale)):
                            current_question['rationale'] = potential_rationale
                    break

                # Check if this is the start of the next question
                elif is_question(next_text):
                    i -= 1  # Back up to process this question next
                    break

                # Skip metadata lines
                elif re.match(r'^(PTS:|REF:|DIF:|OBJ:|TOP:|MSC:|KEY:)', next_text):
                    i += 1
                    continue

                # This should be an option
                else:
                    # Handle special case where multiple options are on one line
                    if re.search(r'\s+[a-d]\.\s+', next_text.lower()):
                        # Split the line on option patterns
                        parts = re.split(r'\s+([a-d]\.)\s+', next_text, flags=re.IGNORECASE)
                        for j in range(0, len(parts), 2):  # Take every other part (the actual text)
                            if parts[j].strip():
                                current_question['options'].append(clean_option_text(parts[j]))
                    else:
                        # Single option
                        option_text = clean_option_text(next_text)
                        if option_text and len(option_text) > 2:
                            current_question['options'].append(option_text)

                i += 1

            # Only add questions with reasonable number of options
            if len(current_question['options']) >= 2 and len(current_question['options']) <= 6:
                questions.append(current_question)
                print(f"Added question {len(questions)}: {current_question['text'][:60]}...")

        else:
            i += 1

    return questions

# Main execution
if __name__ == "__main__":
    print("Extracting text from Chapter 9.docx...")
    text_elements = extract_text_from_docx('Chapter 9.docx')
    print(f"Found {len(text_elements)} text elements")

    print("\nParsing questions...")
    questions = parse_chapter9_questions_improved(text_elements)
    print(f"Extracted {len(questions)} questions")

    # Save to JSON file
    output_file = 'chapter_9_questions_improved.json'
    with open(output_file, 'w', encoding='utf-8') as f:
        json.dump(questions, f, indent=2, ensure_ascii=False)

    print(f"Questions saved to {output_file}")

    # Show detailed sample of extracted questions
    if questions:
        print(f"\n=== SAMPLE QUESTIONS ===")
        for i, q in enumerate(questions[:5]):  # Show first 5 questions
            print(f"\nQuestion {i+1}:")
            print(f"ID: {q['id']}")
            print(f"Text: {q['text']}")
            print(f"Options ({len(q['options'])}):")
            for j, opt in enumerate(q['options']):
                marker = "*" if j in q['correct'] else " "
                print(f"  {marker} {chr(ord('A') + j)}) {opt}")
            print(f"Correct: {q['correct']} ({chr(ord('A') + q['correct'][0]) if q['correct'] else 'None'})")
            if q['rationale']:
                print(f"Rationale: {q['rationale'][:150]}...")

    print(f"\nTotal questions extracted: {len(questions)}")

    # Show statistics
    with_rationale = sum(1 for q in questions if q['rationale'])
    with_correct = sum(1 for q in questions if q['correct'])

    print(f"Questions with rationale: {with_rationale}")
    print(f"Questions with correct answer: {with_correct}")