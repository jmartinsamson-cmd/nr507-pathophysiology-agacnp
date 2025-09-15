import json
import re
from pathlib import Path

def create_study_guide_questions():
    """Create interactive questions based on the study guide content"""

    # Load the extracted class materials
    with open('data/class_materials.json', 'r', encoding='utf-8') as f:
        materials = json.load(f)

    study_guide_content = materials['study_guide']['content']

    # Define question templates based on study guide topics
    questions_by_topic = {
        'immunity': [
            {
                "id": 1,
                "text": "What are the four types of hypersensitivity reactions in immunology?",
                "options": [
                    "Type I: IgE-mediated, Type II: Cytotoxic, Type III: Immune complex, Type IV: Delayed-type",
                    "Type I: Antibody-mediated, Type II: Cell-mediated, Type III: Complement, Type IV: Inflammatory",
                    "Type I: Acute, Type II: Chronic, Type III: Autoimmune, Type IV: Allergic",
                    "Type I: Humoral, Type II: Cellular, Type III: Mixed, Type IV: Innate"
                ],
                "correct": [0],
                "rationale": "The four types of hypersensitivity reactions are classified based on their underlying mechanisms: Type I (IgE-mediated immediate reactions), Type II (cytotoxic antibody-mediated), Type III (immune complex-mediated), and Type IV (delayed-type cell-mediated reactions)."
            },
            {
                "id": 2,
                "text": "Which of the following is a prototype disease for Type IV hypersensitivity?",
                "options": [
                    "Anaphylaxis",
                    "Hemolytic anemia",
                    "Contact dermatitis",
                    "Serum sickness"
                ],
                "correct": [2],
                "rationale": "Contact dermatitis is the classic example of Type IV delayed-type hypersensitivity, which is T cell-mediated and typically occurs 24-48 hours after exposure to the allergen."
            },
            {
                "id": 3,
                "text": "What characterizes the pathophysiology of HIV infection?",
                "options": [
                    "Progressive destruction of CD4+ T helper cells",
                    "Overproduction of antibodies",
                    "Inflammation of blood vessels",
                    "Autoimmune attack on joints"
                ],
                "correct": [0],
                "rationale": "HIV specifically targets and destroys CD4+ T helper cells, which are crucial for coordinating the immune response. This leads to progressive immunodeficiency and increased susceptibility to opportunistic infections."
            },
            {
                "id": 4,
                "text": "Which autoantibodies are most commonly associated with Systemic Lupus Erythematosus (SLE) diagnosis?",
                "options": [
                    "Anti-nuclear antibodies (ANA) and Anti-dsDNA",
                    "Rheumatoid factor and anti-CCP",
                    "Anti-mitochondrial and anti-smooth muscle",
                    "Anti-thyroid peroxidase and anti-thyroglobulin"
                ],
                "correct": [0],
                "rationale": "SLE is characterized by the presence of anti-nuclear antibodies (ANA), particularly anti-double-stranded DNA (anti-dsDNA) antibodies, which are highly specific for SLE and correlate with disease activity and kidney involvement."
            }
        ],

        'hematology': [
            {
                "id": 1,
                "text": "What is the primary pathophysiology behind microcytic anemia?",
                "options": [
                    "Vitamin B12 deficiency",
                    "Iron deficiency leading to impaired hemoglobin synthesis",
                    "Chronic kidney disease",
                    "Hemolysis of red blood cells"
                ],
                "correct": [1],
                "rationale": "Microcytic anemia is most commonly caused by iron deficiency, which impairs hemoglobin synthesis. Without adequate iron, the body cannot produce normal-sized red blood cells, resulting in small (microcytic) and pale (hypochromic) cells."
            },
            {
                "id": 2,
                "text": "Which lab markers are most useful for diagnosing iron deficiency anemia?",
                "options": [
                    "Low ferritin, low transferrin saturation, high TIBC",
                    "High ferritin, high transferrin saturation, low TIBC",
                    "Normal ferritin, high transferrin saturation, normal TIBC",
                    "Low ferritin, high transferrin saturation, low TIBC"
                ],
                "correct": [0],
                "rationale": "Iron deficiency anemia is characterized by low ferritin (iron stores), low transferrin saturation (iron transport), and high total iron-binding capacity (TIBC) as the body attempts to capture more iron from available sources."
            },
            {
                "id": 3,
                "text": "What is the pathophysiology of sickle cell anemia?",
                "options": [
                    "Deficiency in iron absorption",
                    "Genetic mutation causing abnormal hemoglobin S that polymerizes under low oxygen",
                    "Autoimmune destruction of red blood cells",
                    "Failure of bone marrow to produce red blood cells"
                ],
                "correct": [1],
                "rationale": "Sickle cell anemia is caused by a genetic mutation in the beta-globin chain, producing hemoglobin S. Under low oxygen conditions, HbS polymerizes, causing red blood cells to become rigid and sickle-shaped, leading to vaso-occlusive crises and hemolysis."
            },
            {
                "id": 4,
                "text": "What role does erythropoietin play in red blood cell production?",
                "options": [
                    "It breaks down old red blood cells in the spleen",
                    "It carries oxygen from lungs to tissues",
                    "It stimulates bone marrow to produce red blood cells",
                    "It helps with iron absorption in the intestines"
                ],
                "correct": [2],
                "rationale": "Erythropoietin (EPO) is a hormone produced primarily by the kidneys that stimulates the bone marrow to increase red blood cell production (erythropoiesis) in response to low oxygen levels or anemia."
            }
        ],

        'cardiovascular': [
            {
                "id": 1,
                "text": "What is the primary pathophysiology of coronary artery disease (CAD)?",
                "options": [
                    "Valvular stenosis reducing cardiac output",
                    "Atherosclerotic plaque formation in coronary arteries reducing blood flow to myocardium",
                    "Electrical conduction abnormalities causing arrhythmias",
                    "Pericardial inflammation causing chest pain"
                ],
                "correct": [1],
                "rationale": "CAD is primarily caused by atherosclerosis, where lipid plaques build up in coronary arteries, progressively narrowing them and reducing blood flow to the myocardium. This can lead to angina, myocardial infarction, and heart failure."
            },
            {
                "id": 2,
                "text": "Which are modifiable risk factors for coronary artery disease?",
                "options": [
                    "Age, gender, family history",
                    "Smoking, hypertension, diabetes, dyslipidemia",
                    "Ethnicity, genetic mutations",
                    "Previous heart attacks, congenital defects"
                ],
                "correct": [1],
                "rationale": "Modifiable risk factors for CAD include lifestyle and medical conditions that can be changed or treated: smoking cessation, blood pressure control, diabetes management, cholesterol management, weight control, and regular exercise."
            },
            {
                "id": 3,
                "text": "What characterizes left-sided heart failure?",
                "options": [
                    "Peripheral edema and ascites",
                    "Pulmonary congestion and dyspnea",
                    "Jugular venous distention",
                    "Hepatomegaly and splenomegaly"
                ],
                "correct": [1],
                "rationale": "Left-sided heart failure results in backup of blood into the pulmonary circulation, causing pulmonary congestion, pulmonary edema, and symptoms like dyspnea (shortness of breath), orthopnea, and paroxysmal nocturnal dyspnea."
            },
            {
                "id": 4,
                "text": "What is ejection fraction and its significance in heart failure?",
                "options": [
                    "The percentage of blood ejected from the left ventricle with each heartbeat; normal is >55%",
                    "The rate at which the heart beats; normal is 60-100 bpm",
                    "The pressure in the left ventricle; normal is <12 mmHg",
                    "The volume of blood in the left ventricle; normal is 100-150 mL"
                ],
                "correct": [0],
                "rationale": "Ejection fraction (EF) measures the percentage of blood pumped out of the left ventricle with each heartbeat. Normal EF is ≥55%. Reduced EF (<40%) indicates systolic heart failure, while preserved EF (≥50%) with heart failure symptoms indicates diastolic dysfunction."
            }
        ],

        'pulmonary': [
            {
                "id": 1,
                "text": "How do obstructive and restrictive pulmonary disorders differ?",
                "options": [
                    "Obstructive: difficulty exhaling air; Restrictive: difficulty expanding lungs",
                    "Obstructive: difficulty inhaling air; Restrictive: difficulty exhaling air",
                    "Both cause the same breathing pattern difficulties",
                    "Obstructive affects oxygen only; Restrictive affects CO2 only"
                ],
                "correct": [0],
                "rationale": "Obstructive disorders (like asthma, COPD) involve airway narrowing making it difficult to exhale air, leading to air trapping. Restrictive disorders involve reduced lung compliance or chest wall movement, making it difficult to expand the lungs and inhale."
            },
            {
                "id": 2,
                "text": "What characterizes the pathophysiology of emphysema?",
                "options": [
                    "Inflammation and narrowing of airways with excessive mucus production",
                    "Destruction of alveolar walls and loss of elastic recoil",
                    "Inflammation of bronchioles with smooth muscle constriction",
                    "Fluid accumulation in alveolar spaces"
                ],
                "correct": [1],
                "rationale": "Emphysema involves destruction of alveolar walls (septae) and loss of elastic recoil, leading to enlarged air spaces, reduced surface area for gas exchange, and difficulty with expiration due to loss of elastic recoil that normally helps push air out."
            },
            {
                "id": 3,
                "text": "What is the primary difference between chronic bronchitis and emphysema?",
                "options": [
                    "Chronic bronchitis affects small airways; emphysema affects large airways",
                    "Chronic bronchitis involves mucus hypersecretion and airway inflammation; emphysema involves alveolar destruction",
                    "Chronic bronchitis is reversible; emphysema is not",
                    "There is no difference between the two conditions"
                ],
                "correct": [1],
                "rationale": "Chronic bronchitis is characterized by chronic inflammation and excessive mucus production in airways ('blue bloaters'), while emphysema involves destruction of alveolar walls and loss of lung elasticity ('pink puffers'). Both are forms of COPD but have different primary pathophysiologies."
            }
        ],

        'urinary': [
            {
                "id": 1,
                "text": "What characterizes the pathophysiology of a urinary tract infection (UTI)?",
                "options": [
                    "Viral infection of the bladder wall",
                    "Bacterial ascension from urethra to bladder causing inflammation",
                    "Autoimmune attack on kidney tissue",
                    "Obstruction of urine flow causing backup"
                ],
                "correct": [1],
                "rationale": "UTIs typically occur when bacteria (most commonly E. coli) ascend from the urethra to the bladder, causing inflammation of the bladder wall (cystitis). Women are more susceptible due to shorter urethral length and proximity to anal opening."
            },
            {
                "id": 2,
                "text": "What distinguishes complicated from uncomplicated UTIs?",
                "options": [
                    "Complicated UTIs occur in males; uncomplicated occur in females",
                    "Complicated UTIs involve structural/functional urinary tract abnormalities or immunocompromised hosts",
                    "Complicated UTIs require surgery; uncomplicated do not",
                    "Complicated UTIs are chronic; uncomplicated are acute"
                ],
                "correct": [1],
                "rationale": "Complicated UTIs occur in patients with structural or functional genitourinary abnormalities, immunosuppression, pregnancy, or in males. Uncomplicated UTIs occur in healthy, non-pregnant women with normal urinary tract anatomy and function."
            },
            {
                "id": 3,
                "text": "What is the pathophysiology of acute kidney injury (AKI)?",
                "options": [
                    "Gradual loss of kidney function over months to years",
                    "Sudden decrease in kidney function occurring over hours to days",
                    "Inflammation of the bladder causing urinary symptoms",
                    "Obstruction of urine flow at the urethral level"
                ],
                "correct": [1],
                "rationale": "AKI is characterized by a rapid decline in kidney function occurring over hours to days, leading to accumulation of waste products and fluid/electrolyte imbalances. It can be classified as prerenal, intrinsic (intrarenal), or postrenal based on the underlying cause."
            },
            {
                "id": 4,
                "text": "What characterizes uremic syndrome in chronic kidney disease?",
                "options": [
                    "High blood pressure only",
                    "Multi-system symptoms due to accumulation of uremic toxins affecting cardiovascular, neurologic, and other systems",
                    "Kidney stones causing pain",
                    "Simple electrolyte imbalances"
                ],
                "correct": [1],
                "rationale": "Uremic syndrome occurs in advanced chronic kidney disease when accumulated uremic toxins affect multiple organ systems, causing cardiovascular complications, neurologic symptoms (uremic encephalopathy), gastrointestinal issues, bone disease, and bleeding disorders."
            }
        ]
    }

    return questions_by_topic

def save_study_questions():
    """Save the generated study questions to JSON files"""
    questions_by_topic = create_study_guide_questions()

    # Save each topic as a separate file
    for topic, questions in questions_by_topic.items():
        filename = f'data/study_{topic}_questions.json'
        with open(filename, 'w', encoding='utf-8') as f:
            json.dump(questions, f, indent=2, ensure_ascii=False)
        print(f"Saved {len(questions)} questions for {topic} to {filename}")

    # Create a master index of all study materials
    study_materials_index = {
        'topics': {
            'immunity': {
                'title': '🛡️ Immunity & Inflammation',
                'description': 'Hypersensitivity reactions, HIV, SLE, immunodeficiencies',
                'question_file': 'data/study_immunity_questions.json',
                'question_count': len(questions_by_topic['immunity']),
                'key_concepts': [
                    'Four types of hypersensitivity reactions',
                    'HIV pathophysiology and progression',
                    'SLE autoantibodies and clinical symptoms',
                    'Primary vs secondary immunodeficiency',
                    'Common variable immunodeficiency'
                ]
            },
            'hematology': {
                'title': '🩸 Hematological Pathologies',
                'description': 'Anemias, blood cell production, lab markers',
                'question_file': 'data/study_hematology_questions.json',
                'question_count': len(questions_by_topic['hematology']),
                'key_concepts': [
                    'Microcytic, macrocytic, and normocytic anemias',
                    'Iron deficiency anemia pathophysiology',
                    'Sickle cell anemia and genetic basis',
                    'Role of erythropoietin in RBC production',
                    'Laboratory markers for anemia diagnosis'
                ]
            },
            'cardiovascular': {
                'title': '❤️ Cardiovascular Pathologies',
                'description': 'CAD, heart failure, valve disorders',
                'question_file': 'data/study_cardiovascular_questions.json',
                'question_count': len(questions_by_topic['cardiovascular']),
                'key_concepts': [
                    'Coronary artery disease pathophysiology',
                    'Modifiable and non-modifiable CAD risk factors',
                    'Left vs right-sided heart failure',
                    'Heart failure staging (ACC/AHA)',
                    'Ejection fraction significance'
                ]
            },
            'pulmonary': {
                'title': '🫁 Pulmonary Pathologies',
                'description': 'Obstructive/restrictive disorders, asthma, COPD',
                'question_file': 'data/study_pulmonary_questions.json',
                'question_count': len(questions_by_topic['pulmonary']),
                'key_concepts': [
                    'Obstructive vs restrictive patterns',
                    'Chronic bronchitis pathophysiology',
                    'Emphysema and alveolar destruction',
                    'Asthma pathophysiology and management',
                    'Pulmonary function test interpretation'
                ]
            },
            'urinary': {
                'title': '🫀 Urinary System Pathologies',
                'description': 'UTIs, renal failure, BPH, incontinence',
                'question_file': 'data/study_urinary_questions.json',
                'question_count': len(questions_by_topic['urinary']),
                'key_concepts': [
                    'UTI pathophysiology and risk factors',
                    'Complicated vs uncomplicated UTIs',
                    'Acute kidney injury classification',
                    'Chronic kidney disease staging',
                    'Uremic syndrome manifestations'
                ]
            }
        }
    }

    # Save the index
    with open('data/study_materials_index.json', 'w', encoding='utf-8') as f:
        json.dump(study_materials_index, f, indent=2, ensure_ascii=False)

    print(f"\nStudy materials index saved to data/study_materials_index.json")

    total_questions = sum(len(questions) for questions in questions_by_topic.values())
    print(f"\n=== STUDY QUESTIONS GENERATED ===")
    print(f"Total interactive questions created: {total_questions}")
    for topic, questions in questions_by_topic.items():
        print(f"  - {topic.title()}: {len(questions)} questions")

if __name__ == "__main__":
    save_study_questions()