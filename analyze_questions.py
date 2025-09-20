#!/usr/bin/env python3
"""Analyze and compare DOCX questions with JSON files"""

import re
import json
import sys
import os
import docx2txt

def parse_docx_questions(text):
    """Parse questions from extracted DOCX text"""
    questions = []

    # Split text into sections - each question starts with a question and ends before the next question or section
    lines = text.split('\n')

    current_question = None
    current_options = []
    current_answer = None
    current_rationale = None

    i = 0
    question_id = 1

    while i < len(lines):
        line = lines[i].strip()

        # Skip empty lines and headers
        if not line or line in ['MULTIPLE CHOICE', 'MULTIPLE RESPONSE', 'MATCHING']:
            i += 1
            continue

        # Check if this is a question (ends with ?)
        if line.endswith('?') and len(line) > 10:
            # Save previous question if exists
            if current_question and current_options and current_answer is not None:
                questions.append({
                    'id': question_id,
                    'text': current_question,
                    'options': current_options.copy(),
                    'correct': [current_answer],
                    'rationale': current_rationale or "No rationale provided"
                })
                question_id += 1

            # Start new question
            current_question = line
            current_options = []
            current_answer = None
            current_rationale = None

            # Look for options in the following lines
            i += 1
            option_text = []

            while i < len(lines):
                line = lines[i].strip()

                # Check for ANS: line
                if line.startswith('ANS:'):
                    answer_letter = line.split(':')[1].strip()
                    if answer_letter == 'A':
                        current_answer = 0
                    elif answer_letter == 'B':
                        current_answer = 1
                    elif answer_letter == 'C':
                        current_answer = 2
                    elif answer_letter == 'D':
                        current_answer = 3

                    # Parse options from collected text
                    if option_text:
                        current_options = parse_options('\n'.join(option_text))

                    # Look for rationale after ANS line
                    i += 1
                    rationale_lines = []
                    while i < len(lines):
                        line = lines[i].strip()
                        if line.startswith('PTS:') or line.endswith('?') or not line:
                            break
                        rationale_lines.append(line)
                        i += 1

                    current_rationale = ' '.join(rationale_lines)
                    break
                else:
                    option_text.append(line)
                    i += 1
        else:
            i += 1

    # Don't forget the last question
    if current_question and current_options and current_answer is not None:
        questions.append({
            'id': question_id,
            'text': current_question,
            'options': current_options.copy(),
            'correct': [current_answer],
            'rationale': current_rationale or "No rationale provided"
        })

    return questions

def parse_options(option_text):
    """Parse answer options from text"""
    options = []

    # Split by typical patterns like "a.", "A.", "1.", or tab-separated
    lines = option_text.split('\n')

    current_options = []

    for line in lines:
        line = line.strip()
        if not line:
            continue

        # Try different patterns
        # Pattern: "Text \t c. Other text"
        if '\t' in line:
            parts = line.split('\t')
            for part in parts:
                part = part.strip()
                # Remove option letters/numbers at beginning
                part = re.sub(r'^[a-d]\.?\s*', '', part, flags=re.IGNORECASE)
                if part:
                    current_options.append(part)
        else:
            # Single line option
            line = re.sub(r'^[a-d]\.?\s*', '', line, flags=re.IGNORECASE)
            if line:
                current_options.append(line)

    # If we have exactly 4 options, that's typical for multiple choice
    if len(current_options) >= 2:
        return current_options[:4]  # Take first 4

    return current_options

def compare_questions(docx_questions, json_questions):
    """Compare DOCX and JSON questions"""
    results = {
        'total_docx': len(docx_questions),
        'total_json': len(json_questions),
        'matches': 0,
        'differences': [],
        'missing_in_json': [],
        'extra_in_json': []
    }

    # Create a simple comparison - match by question text similarity
    for i, docx_q in enumerate(docx_questions):
        found_match = False
        for j, json_q in enumerate(json_questions):
            if docx_q['text'].lower().strip() == json_q['text'].lower().strip():
                found_match = True
                results['matches'] += 1

                # Check for differences in options, correct answers, rationale
                differences = []
                if len(docx_q['options']) != len(json_q['options']):
                    differences.append(f"Options count: DOCX={len(docx_q['options'])}, JSON={len(json_q['options'])}")

                if docx_q['correct'] != json_q['correct']:
                    differences.append(f"Correct answer: DOCX={docx_q['correct']}, JSON={json_q['correct']}")

                if differences:
                    results['differences'].append({
                        'question_id': i + 1,
                        'question_text': docx_q['text'][:100] + '...',
                        'differences': differences
                    })
                break

        if not found_match:
            results['missing_in_json'].append({
                'id': i + 1,
                'text': docx_q['text'][:100] + '...'
            })

    return results

def main():
    if len(sys.argv) != 3:
        print("Usage: python analyze_questions.py <chapter_docx> <chapter_json>")
        sys.exit(1)

    docx_path = sys.argv[1]
    json_path = sys.argv[2]

    # Extract DOCX content
    print(f"Extracting content from {docx_path}...")
    docx_text = docx2txt.process(docx_path)

    # Parse questions
    print("Parsing DOCX questions...")
    docx_questions = parse_docx_questions(docx_text)

    # Load JSON questions
    print(f"Loading JSON from {json_path}...")
    with open(json_path, 'r', encoding='utf-8') as f:
        json_questions = json.load(f)

    # Compare
    print("Comparing questions...")
    results = compare_questions(docx_questions, json_questions)

    print(f"\nResults for {os.path.basename(docx_path)}:")
    print(f"DOCX questions: {results['total_docx']}")
    print(f"JSON questions: {results['total_json']}")
    print(f"Matches: {results['matches']}")
    print(f"Differences: {len(results['differences'])}")
    print(f"Missing in JSON: {len(results['missing_in_json'])}")

    # Save detailed results
    output_file = f"analysis_{os.path.basename(docx_path).replace('.docx', '')}.json"
    with open(output_file, 'w', encoding='utf-8') as f:
        json.dump({
            'docx_questions': docx_questions,
            'comparison_results': results
        }, f, indent=2)

    print(f"Detailed analysis saved to {output_file}")

    return docx_questions, results

if __name__ == "__main__":
    main()