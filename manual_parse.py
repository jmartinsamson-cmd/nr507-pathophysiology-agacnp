import json
import re

# Load the extracted data
base_path = r"C:\Users\jsamb\OneDrive\Desktop\Exampee"
with open(f"{base_path}\\docx_extracted_data.json", 'r', encoding='utf-8') as f:
    extracted_data = json.load(f)

def manual_parse_chapter_28(raw_text):
    """Manual parsing for Chapter 28 based on observed format"""
    questions = []

    # Based on the raw text, I can see the pattern:
    # Question text followed by options a., b., c., d. then ANS: X

    # Let me extract specific questions I can see in the text

    # Question 1
    questions.append({
        'question_number': 1,
        'question_text': 'What is the most abundant class of plasma protein?',
        'options': [
            'Globulin',
            'Albumin',
            'Clotting factors',
            'Complement proteins'
        ],
        'correct_answers': [1],  # B - Albumin
        'rationale': 'Albumin (approximately 60% of total plasma protein at a concentration of about 4 g/dl) is the most abundant plasma protein.'
    })

    # Question 2
    questions.append({
        'question_number': 2,
        'question_text': 'What is the effect of low plasma albumin?',
        'options': [
            'Clotting factors decrease, thus increasing the chance of prolonged bleeding.',
            'Fewer immunoglobulins are synthesized, thus impairing the immune function.',
            'Less iron is stored, thus increasing the incidence of iron deficiency anemia.',
            'Osmotic pressure decreases, thus water moves from the capillaries to the interstitium.'
        ],
        'correct_answers': [3],  # D
        'rationale': 'In the case of decreased production (e.g., cirrhosis, other diffuse liver diseases, protein malnutrition) or excessive loss of albumin (e.g., certain kidney diseases, extensive burns), the reduced oncotic pressure leads to excessive movement of fluid and solutes into the tissues and decreased blood volume.'
    })

    # Question 3
    questions.append({
        'question_number': 3,
        'question_text': 'What is the life span of an erythrocyte (in days)?',
        'options': [
            '20 to 30',
            '60 to 90',
            '100 to 120',
            '200 to 240'
        ],
        'correct_answers': [2],  # C
        'rationale': 'Because it cannot undergo mitotic division, the erythrocyte has a limited life span of approximately 120 days.'
    })

    # Question 4
    questions.append({
        'question_number': 4,
        'question_text': 'Which statement concerning erythrocytes is true?',
        'options': [
            'Erythrocytes contain a nucleus, mitochondria, and ribosomes.',
            'Erythrocytes synthesize proteins.',
            'Erythrocytes have the ability to change shape to squeeze through microcirculation.',
            'Erythrocyte colony-stimulating factor (E-CSF) stimulates erythrocytes.'
        ],
        'correct_answers': [2],  # C
        'rationale': 'Reversible deformity enables the erythrocyte to assume a more compact torpedo-like shape, squeeze through the microcirculation, and return to normal.'
    })

    # Question 5
    questions.append({
        'question_number': 5,
        'question_text': 'Granulocytes that contain granules of vasoactive amines, such as histamine, are called:',
        'options': [
            'Neutrophils',
            'Eosinophils',
            'Monocytes',
            'Basophils'
        ],
        'correct_answers': [3],  # D
        'rationale': 'Basophils contain cytoplasmic granules that hold an abundant mixture of biochemical mediators, including histamine, chemotactic factors, proteolytic enzymes, and an anticoagulant (heparin).'
    })

    # Question 6
    questions.append({
        'question_number': 6,
        'question_text': 'Which of the following are formed elements of the blood that are not cells but are disk-shaped cytoplasmic fragments essential for blood clotting?',
        'options': [
            'Monocytes',
            'Platelets',
            'Macrophages',
            'Erythrocytes'
        ],
        'correct_answers': [1],  # B
        'rationale': 'Platelets (thrombocytes) are not true cells but are disk-shaped cytoplasmic fragments that are essential for blood coagulation and control of bleeding.'
    })

    # Question 7
    questions.append({
        'question_number': 7,
        'question_text': 'Blood cells that differentiate into macrophages are known as:',
        'options': [
            'Monocytes',
            'Neutrophils',
            'Eosinophils',
            'Basophils'
        ],
        'correct_answers': [0],  # A
        'rationale': 'Only monocytes migrate into a variety of tissues and fully mature into tissue macrophages.'
    })

    return questions

def manual_parse_chapter_29(raw_text):
    """Manual parsing for Chapter 29"""
    questions = []

    # Question 1
    questions.append({
        'question_number': 1,
        'question_text': 'What term is used to describe the capacity of some erythrocytes to vary in size, especially in relationship to some anemias?',
        'options': [
            'Poikilocytosis',
            'Isocytosis',
            'Anisocytosis',
            'Microcytosis'
        ],
        'correct_answers': [2],  # C
        'rationale': 'Additional descriptors of erythrocytes associated with some anemias include anisocytosis (assuming various sizes) or poikilocytosis (assuming various shapes).'
    })

    # Question 2
    questions.append({
        'question_number': 2,
        'question_text': 'What is the fundamental physiologic manifestation of anemia?',
        'options': [
            'Hypotension',
            'Hyperesthesia',
            'Hypoxia',
            'Ischemia'
        ],
        'correct_answers': [2],  # C
        'rationale': 'The fundamental physiologic manifestation of anemia is a reduced oxygen-carrying capacity of the blood, resulting in tissue hypoxia.'
    })

    # Continue with more questions...
    return questions

# Parse Chapter 28 manually first to test
chapter_28_text = extracted_data['28']['raw_text']
chapter_28_questions = manual_parse_chapter_28(chapter_28_text)

print(f"Chapter 28: Manually parsed {len(chapter_28_questions)} questions")
for q in chapter_28_questions:
    print(f"  Q{q['question_number']}: {q['question_text'][:50]}...")

# Save the manual parsing
manual_results = {
    28: {
        'questions': chapter_28_questions,
        'question_count': len(chapter_28_questions)
    }
}

with open(f"{base_path}\\manual_parsed_questions.json", 'w', encoding='utf-8') as f:
    json.dump(manual_results, f, indent=2, ensure_ascii=False)

print("\nManual parsing test completed for Chapter 28.")