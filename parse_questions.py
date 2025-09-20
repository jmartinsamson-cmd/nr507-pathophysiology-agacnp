import json
import re

def parse_questions_from_text(text, chapter_num):
    """Parse questions from the specific format found in the docx text"""
    questions = []

    # The text appears to have questions followed by options a., b., c., d., then ANS: X
    # Let's use a more specific pattern for this format

    # Split by question indicators - look for patterns before options
    # Questions seem to start after "MULTIPLE CHOICE" and before the first option

    # First, let's find all question blocks by looking for patterns ending with ANS:
    question_blocks = []

    # Split text by ANS: pattern to separate questions
    parts = re.split(r'ANS:\s*[A-D]', text)

    question_num = 1

    for i, part in enumerate(parts[:-1]):  # Skip the last part as it won't be a complete question
        if not part.strip():
            continue

        # Look for the answer in the next part or at the end of current part
        ans_match = re.search(r'ANS:\s*([A-D])', text[text.find(part):])
        correct_answer = ans_match.group(1) if ans_match else 'A'

        # Extract question and options
        lines = part.strip().split('\n')

        # Find question text - usually the longest meaningful line before options
        question_text = ""
        options = []
        rationale = ""

        collecting_rationale = False

        for line in lines:
            line = line.strip()
            if not line:
                continue

            # Skip chapter titles, page references, etc.
            if any(skip in line.lower() for skip in ['chapter', 'pts:', 'ref:', 'page', 'multiple choice']):
                continue

            # Check for option patterns (a., b., c., d.)
            option_match = re.match(r'^([a-d])\.\s*(.+)', line, re.IGNORECASE)
            if option_match:
                options.append(option_match.group(2).strip())
                continue

            # Check for rationale/explanation (usually after the answer)
            if collecting_rationale or any(keyword in line.lower() for keyword in ['the other options', 'this selection', 'because', 'due to']):
                collecting_rationale = True
                if rationale:
                    rationale += " " + line
                else:
                    rationale = line
                continue

            # If we have options, this might be rationale
            if len(options) >= 4:
                if rationale:
                    rationale += " " + line
                else:
                    rationale = line
                continue

            # This is likely question text if we don't have it yet and it's substantial
            if not question_text and len(line) > 10 and '?' in line:
                question_text = line
            elif question_text and not options and not line.endswith('?'):
                # Might be continuation of question
                question_text += " " + line

        # Only add if we have both question and options
        if question_text and len(options) >= 4:
            # Convert answer letter to index
            correct_index = ord(correct_answer.upper()) - ord('A')

            questions.append({
                'question_number': question_num,
                'question_text': question_text.strip(),
                'options': options[:4],  # Take first 4 options
                'correct_answers': [correct_index],
                'rationale': rationale.strip()
            })
            question_num += 1

    return questions

def improved_parse_questions(raw_text, chapter_num):
    """Improved parsing for the specific format seen in the docx files"""
    questions = []

    # Looking at the pattern, questions seem to be structured as:
    # Question text ending with ?
    # a. option1  b. option2
    # c. option3  d. option4
    # ANS: [letter]
    # Explanation text

    # Split by common separators and clean
    text = raw_text.replace('\n', ' ').replace('\t', ' ')

    # Find question patterns
    # Look for text ending with ? followed by options
    question_pattern = r'([^.]*\?)\s*([a-d]\.\s*[^a-d]*[a-d]\.\s*[^a-d]*[a-d]\.\s*[^a-d]*[a-d]\.\s*[^A]*?)ANS:\s*([A-D])\s*([^A]*?)(?=(?:[^.]*\?)|$)'

    matches = re.findall(question_pattern, text, re.IGNORECASE | re.DOTALL)

    question_num = 1

    for match in matches:
        question_text = match[0].strip()
        options_text = match[1].strip()
        correct_letter = match[2].strip()
        explanation = match[3].strip()

        # Parse options
        option_pattern = r'([a-d])\.\s*([^a-d]*?)(?=[a-d]\.|$)'
        option_matches = re.findall(option_pattern, options_text, re.IGNORECASE)

        options = []
        for opt_match in option_matches:
            option_text = opt_match[1].strip()
            # Clean up option text
            option_text = re.sub(r'\s+', ' ', option_text)
            if option_text:
                options.append(option_text)

        if question_text and len(options) >= 4:
            correct_index = ord(correct_letter.upper()) - ord('A')

            # Clean rationale
            rationale = explanation
            # Remove common prefixes
            rationale = re.sub(r'^[^.]*\.\s*', '', rationale)
            rationale = re.sub(r'PTS:\s*\d+.*', '', rationale)
            rationale = re.sub(r'REF:.*', '', rationale)
            rationale = rationale.strip()

            questions.append({
                'question_number': question_num,
                'question_text': question_text,
                'options': options[:4],
                'correct_answers': [correct_index],
                'rationale': rationale
            })
            question_num += 1

    return questions

# Load the extracted data
base_path = r"C:\Users\jsamb\OneDrive\Desktop\Exampee"
with open(f"{base_path}\\docx_extracted_data.json", 'r', encoding='utf-8') as f:
    extracted_data = json.load(f)

# Parse questions from each chapter
parsed_questions = {}

print("Parsing questions from extracted text...")

for chapter_str, data in extracted_data.items():
    chapter = int(chapter_str)
    raw_text = data.get('raw_text', '') + data.get('text_length', 0) * " "  # Get more text if available

    print(f"\nProcessing Chapter {chapter}...")

    # Try improved parsing
    questions = improved_parse_questions(raw_text, chapter)

    if not questions:
        # Fallback to simpler pattern if no questions found
        questions = parse_questions_from_text(raw_text, chapter)

    parsed_questions[chapter] = {
        'questions': questions,
        'question_count': len(questions),
        'raw_text_sample': raw_text[:1000]  # Sample for inspection
    }

    print(f"  Parsed {len(questions)} questions")

# Save parsed questions
with open(f"{base_path}\\parsed_questions.json", 'w', encoding='utf-8') as f:
    json.dump(parsed_questions, f, indent=2, ensure_ascii=False)

print(f"\nParsing complete. Results saved to parsed_questions.json")
print("\nSummary:")
for chapter in [28, 29, 30, 32, 34, 35, 37, 38]:
    if chapter in parsed_questions:
        count = parsed_questions[chapter]['question_count']
        print(f"  Chapter {chapter}: {count} questions")
    else:
        print(f"  Chapter {chapter}: Not found")