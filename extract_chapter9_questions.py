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

def parse_chapter9_questions(text_elements):
    """Parse questions from Chapter 9 with multiple choice format"""
    questions = []
    i = 0

    while i < len(text_elements):
        text = text_elements[i].strip()

        # Skip headers, empty lines, and navigation elements
        if not text or any(skip_word in text.lower() for skip_word in
                          ['chapter', 'multiple choice', 'test bank', 'page', 'mccance']):
            i += 1
            continue

        # Look for questions - they typically end with : or ? and are substantial text
        if ((text.endswith(':') or text.endswith('?')) and len(text) > 30 and
            not re.match(r'^ANS:', text) and not re.match(r'^[A-Z]+:', text)):
            current_question = {
                'id': len(questions) + 1,
                'text': text,
                'options': [],
                'correct': [],
                'rationale': ''
            }

            i += 1
            options_collected = 0

            # Collect options - look for patterns like "option c. option" or just plain text
            while i < len(text_elements) and options_collected < 6:
                next_text = text_elements[i].strip()

                if not next_text:
                    i += 1
                    continue

                # Check for answer indicator
                if re.match(r'^ANS:\s*[A-F]', next_text, re.IGNORECASE):
                    answer_match = re.search(r'ANS:\s*([A-F])', next_text, re.IGNORECASE)
                    if answer_match:
                        answer_letter = answer_match.group(1).upper()
                        current_question['correct'] = [ord(answer_letter) - ord('A')]
                    i += 1

                    # Look for rationale (next substantial text)
                    if i < len(text_elements):
                        potential_rationale = text_elements[i].strip()
                        if (potential_rationale and
                            not re.match(r'^(PTS:|REF:|DIF:|OBJ:|TOP:|MSC:|KEY:|ANS:)', potential_rationale) and
                            len(potential_rationale) > 20):
                            current_question['rationale'] = potential_rationale
                    break

                # Check for next question (ends with :)
                elif next_text.endswith(':') and len(next_text) > 30:
                    # This is the next question, back up
                    i -= 1
                    break

                # Skip reference/metadata lines
                elif re.match(r'^(PTS:|REF:|DIF:|OBJ:|TOP:|MSC:|KEY:)', next_text):
                    i += 1
                    continue

                # This should be an option
                elif len(next_text) > 5 and not next_text.startswith('ANS:'):
                    # Handle options that might be split across lines with "c." pattern
                    if re.search(r'\s[a-d]\.\s', next_text.lower()):
                        # Split on the pattern like "option c. option"
                        parts = re.split(r'\s[a-d]\.\s', next_text)
                        if len(parts) >= 2:
                            # Add the first part
                            if parts[0].strip():
                                current_question['options'].append(parts[0].strip())
                                options_collected += 1
                            # Add the second part
                            if parts[1].strip():
                                current_question['options'].append(parts[1].strip())
                                options_collected += 1
                    else:
                        current_question['options'].append(next_text)
                        options_collected += 1

                i += 1

            # Only add questions with at least 2 options
            if len(current_question['options']) >= 2:
                questions.append(current_question)
                print(f"Added question {len(questions)}: {current_question['text'][:60]}...")
        else:
            i += 1

    return questions

def find_additional_answers(text_elements, questions):
    """Look for answer patterns that might have been missed"""
    answer_patterns = []

    for i, text in enumerate(text_elements):
        # Look for standalone answer indicators
        if re.match(r'^[A-F]$', text.strip()) or re.match(r'^Answer:\s*[A-F]', text.strip(), re.IGNORECASE):
            answer_patterns.append((i, text.strip()))

    return answer_patterns

# Main execution
if __name__ == "__main__":
    print("Extracting text from Chapter 9.docx...")
    text_elements = extract_text_from_docx('Chapter 9.docx')
    print(f"Found {len(text_elements)} text elements")

    if text_elements:
        # Show first few elements for debugging
        print("\nFirst 10 text elements:")
        for i, elem in enumerate(text_elements[:10]):
            print(f"{i}: {elem[:100]}...")

    print("\nParsing questions...")
    questions = parse_chapter9_questions(text_elements)
    print(f"Extracted {len(questions)} questions")

    # Look for additional answer patterns
    answer_patterns = find_additional_answers(text_elements, questions)
    if answer_patterns:
        print(f"Found {len(answer_patterns)} additional answer patterns")

    # Save to JSON file
    output_file = 'chapter_9_questions.json'
    with open(output_file, 'w', encoding='utf-8') as f:
        json.dump(questions, f, indent=2, ensure_ascii=False)

    print(f"Questions saved to {output_file}")

    # Show detailed sample of extracted questions
    if questions:
        print(f"\n=== SAMPLE QUESTIONS ===")
        for i, q in enumerate(questions[:3]):  # Show first 3 questions
            print(f"\nQuestion {i+1}:")
            print(f"Text: {q['text']}")
            print(f"Options ({len(q['options'])}):")
            for j, opt in enumerate(q['options']):
                print(f"  {chr(ord('A') + j)}) {opt}")
            print(f"Correct: {q['correct']}")
            if q['rationale']:
                print(f"Rationale: {q['rationale'][:100]}...")

    # Save raw text elements for debugging
    with open('chapter_9_raw_text.txt', 'w', encoding='utf-8') as f:
        for i, elem in enumerate(text_elements):
            f.write(f"{i}: {elem}\n\n")
    print("Raw text saved to chapter_9_raw_text.txt for debugging")