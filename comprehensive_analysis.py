import json
import re
from difflib import SequenceMatcher

def similarity(a, b):
    """Calculate similarity between two strings"""
    return SequenceMatcher(None, a.lower().strip(), b.lower().strip()).ratio()

def extract_docx_questions(raw_text, chapter_num):
    """Extract questions from raw docx text using pattern matching"""
    questions = []

    # Clean the text and prepare for parsing
    text = raw_text.replace('\t', ' ').replace('\n', ' ')
    text = re.sub(r'\s+', ' ', text)  # Normalize whitespace

    # Find question blocks that follow the pattern: Question + options a,b,c,d + ANS: + explanation
    # Split by ANS: pattern to identify question boundaries
    parts = re.split(r'\bANS:\s*([A-D])', text)

    question_num = 1

    for i in range(0, len(parts)-1, 2):
        if i + 1 >= len(parts):
            break

        question_part = parts[i].strip()
        correct_letter = parts[i + 1].strip() if i + 1 < len(parts) else 'A'

        if not question_part:
            continue

        # Try to extract question and options
        # Look for the last complete question in this part
        sentences = question_part.split('.')

        # Find the question text - usually ends with ?
        question_text = ""
        remaining_text = question_part

        # Look for text ending with ?
        question_matches = re.findall(r'([^.]*\?)', question_part)
        if question_matches:
            question_text = question_matches[-1].strip()
            # Get text after the question for options
            question_pos = question_part.rfind(question_text)
            if question_pos != -1:
                remaining_text = question_part[question_pos + len(question_text):].strip()

        if not question_text:
            continue

        # Extract options - look for a., b., c., d. patterns
        options = []
        option_pattern = r'([a-d])\.\s*([^a-d]*?)(?=[a-d]\.|$)'
        option_matches = re.findall(option_pattern, remaining_text, re.IGNORECASE)

        for opt_letter, opt_text in option_matches:
            clean_text = opt_text.strip()
            # Remove common suffixes that might appear
            clean_text = re.sub(r'\s*ANS:.*$', '', clean_text)
            clean_text = re.sub(r'\s*(PTS|REF):.*$', '', clean_text)
            if clean_text:
                options.append(clean_text)

        # Only add if we have question text and 4 options
        if question_text and len(options) >= 4:
            correct_index = ord(correct_letter.upper()) - ord('A')

            questions.append({
                'question_number': question_num,
                'question_text': question_text.strip(),
                'options': options[:4],  # Take first 4 options
                'correct_answers': [correct_index],
                'rationale': f"Extracted from Chapter {chapter_num} docx"
            })
            question_num += 1

    return questions

def analyze_chapter_accuracy(docx_questions, json_questions, chapter_num):
    """Analyze accuracy between docx and JSON questions for a chapter"""
    analysis = {
        'chapter': chapter_num,
        'docx_question_count': len(docx_questions),
        'json_question_count': len(json_questions),
        'matches': [],
        'missing_from_json': [],
        'extra_in_json': [],
        'mismatched_content': []
    }

    # Create a mapping of JSON questions by their text similarity to docx questions
    used_json_indices = set()

    for i, docx_q in enumerate(docx_questions):
        best_match = None
        best_similarity = 0.0
        best_json_idx = -1

        # Find the best matching JSON question
        for j, json_q in enumerate(json_questions):
            if j in used_json_indices:
                continue

            sim = similarity(docx_q['question_text'], json_q['text'])
            if sim > best_similarity:
                best_similarity = sim
                best_match = json_q
                best_json_idx = j

        if best_similarity > 0.6:  # Reasonable similarity threshold
            used_json_indices.add(best_json_idx)

            # Check if content matches exactly
            options_match = True
            correct_match = True

            # Compare options
            if len(docx_q['options']) != len(best_match['options']):
                options_match = False
            else:
                for k, (docx_opt, json_opt) in enumerate(zip(docx_q['options'], best_match['options'])):
                    if similarity(docx_opt, json_opt) < 0.8:
                        options_match = False
                        break

            # Compare correct answers
            if docx_q['correct_answers'] != best_match['correct']:
                correct_match = False

            match_info = {
                'docx_question': docx_q,
                'json_question': best_match,
                'similarity': best_similarity,
                'exact_match': best_similarity > 0.95 and options_match and correct_match,
                'options_match': options_match,
                'correct_match': correct_match
            }

            if match_info['exact_match']:
                analysis['matches'].append(match_info)
            else:
                analysis['mismatched_content'].append(match_info)
        else:
            analysis['missing_from_json'].append(docx_q)

    # Find extra questions in JSON that don't match any docx questions
    for j, json_q in enumerate(json_questions):
        if j not in used_json_indices:
            analysis['extra_in_json'].append(json_q)

    return analysis

# Load the extracted docx data
base_path = r"C:\Users\jsamb\OneDrive\Desktop\Exampee"
with open(f"{base_path}\\docx_extracted_data.json", 'r', encoding='utf-8') as f:
    docx_data = json.load(f)

# Analyze each chapter
chapters = [28, 29, 30, 32, 34, 35, 37, 38]
all_analyses = {}
overall_report = {
    'total_chapters': len(chapters),
    'accurate_chapters': 0,
    'chapters_needing_updates': 0,
    'chapter_summaries': {}
}

print("=== COMPREHENSIVE ACCURACY ANALYSIS ===\n")

for chapter in chapters:
    print(f"Analyzing Chapter {chapter}...")

    # Extract questions from docx text
    if str(chapter) in docx_data:
        raw_text = docx_data[str(chapter)]['raw_text']
        # For Chapter 28, we need to read the full text from the JSON since it was truncated
        docx_questions = extract_docx_questions(raw_text, chapter)
    else:
        docx_questions = []

    # Load JSON questions
    json_file = f"{base_path}\\data\\chapter_{chapter}_questions.json"
    try:
        with open(json_file, 'r', encoding='utf-8') as f:
            json_questions = json.load(f)
    except FileNotFoundError:
        json_questions = []
        print(f"  JSON file not found for Chapter {chapter}")

    # Analyze accuracy
    analysis = analyze_chapter_accuracy(docx_questions, json_questions, chapter)
    all_analyses[chapter] = analysis

    # Summary for this chapter
    docx_count = analysis['docx_question_count']
    json_count = analysis['json_question_count']
    matches = len(analysis['matches'])
    mismatched = len(analysis['mismatched_content'])
    missing = len(analysis['missing_from_json'])
    extra = len(analysis['extra_in_json'])

    print(f"  Docx questions: {docx_count}")
    print(f"  JSON questions: {json_count}")
    print(f"  Exact matches: {matches}")
    print(f"  Mismatched content: {mismatched}")
    print(f"  Missing from JSON: {missing}")
    print(f"  Extra in JSON: {extra}")

    # Determine if chapter is accurate
    is_accurate = (missing == 0 and mismatched == 0 and extra == 0)
    if is_accurate:
        overall_report['accurate_chapters'] += 1
        print(f"  ✅ Chapter {chapter}: ACCURATE")
    else:
        overall_report['chapters_needing_updates'] += 1
        print(f"  ❌ Chapter {chapter}: NEEDS UPDATES")

    overall_report['chapter_summaries'][chapter] = {
        'docx_questions': docx_count,
        'json_questions': json_count,
        'exact_matches': matches,
        'mismatched': mismatched,
        'missing': missing,
        'extra': extra,
        'is_accurate': is_accurate
    }
    print()

# Save detailed analysis
with open(f"{base_path}\\detailed_analysis_report.json", 'w', encoding='utf-8') as f:
    json.dump({
        'overall_report': overall_report,
        'chapter_analyses': all_analyses
    }, f, indent=2, ensure_ascii=False)

print("=== OVERALL REPORT ===")
print(f"Total chapters analyzed: {overall_report['total_chapters']}")
print(f"Accurate chapters: {overall_report['accurate_chapters']}")
print(f"Chapters needing updates: {overall_report['chapters_needing_updates']}")
print(f"\nDetailed analysis saved to: detailed_analysis_report.json")

print("\n=== CHAPTERS NEEDING ATTENTION ===")
for chapter, summary in overall_report['chapter_summaries'].items():
    if not summary['is_accurate']:
        print(f"Chapter {chapter}:")
        if summary['missing'] > 0:
            print(f"  - {summary['missing']} questions missing from JSON")
        if summary['mismatched'] > 0:
            print(f"  - {summary['mismatched']} questions have mismatched content")
        if summary['extra'] > 0:
            print(f"  - {summary['extra']} extra questions in JSON")