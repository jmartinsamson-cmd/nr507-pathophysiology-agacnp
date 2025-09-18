// Embedded study data to avoid CORS issues when running without a server
const EMBEDDED_STUDY_DATA = {
    immunity: [
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

    hematology: [
        {
            "id": 1,
            "text": "What is the primary cause of iron deficiency anemia?",
            "options": [
                "Inadequate dietary iron intake",
                "Chronic blood loss",
                "Decreased iron absorption",
                "Increased iron metabolism"
            ],
            "correct": [1],
            "rationale": "The most common cause of iron deficiency anemia is chronic blood loss, often from the gastrointestinal tract or menstrual bleeding. While dietary deficiency can occur, it's less common in developed countries."
        },
        {
            "id": 2,
            "text": "Which laboratory finding is most characteristic of vitamin B12 deficiency anemia?",
            "options": [
                "Microcytic, hypochromic red blood cells",
                "Macrocytic, normochromic red blood cells",
                "Normocytic, normochromic red blood cells",
                "Target cells and spherocytes"
            ],
            "correct": [1],
            "rationale": "Vitamin B12 deficiency causes megaloblastic anemia, characterized by large (macrocytic) red blood cells that are normally colored (normochromic) due to impaired DNA synthesis."
        },
        {
            "id": 3,
            "text": "What is the pathophysiology of sickle cell anemia?",
            "options": [
                "Deficiency of clotting factors",
                "Abnormal hemoglobin causing red cell sickling",
                "Bone marrow failure",
                "Autoimmune destruction of red cells"
            ],
            "correct": [1],
            "rationale": "Sickle cell anemia is caused by a mutation in the β-globin gene, resulting in hemoglobin S (HbS). Under low oxygen conditions, HbS polymerizes, causing red blood cells to assume a sickle shape, leading to vaso-occlusion and hemolysis."
        },
        {
            "id": 4,
            "text": "Which condition is associated with the highest risk of developing acute leukemia?",
            "options": [
                "Iron deficiency anemia",
                "Down syndrome",
                "Vitamin B12 deficiency",
                "Chronic kidney disease"
            ],
            "correct": [1],
            "rationale": "Individuals with Down syndrome have a 10-20 fold increased risk of developing acute lymphoblastic leukemia (ALL) and acute myeloid leukemia (AML) compared to the general population."
        }
    ],

    cardiovascular: [
        {
            "id": 1,
            "text": "What is the primary mechanism of atherosclerosis development?",
            "options": [
                "Viral infection of arterial walls",
                "Endothelial dysfunction and lipid accumulation",
                "Congenital arterial malformations",
                "Autoimmune destruction of blood vessels"
            ],
            "correct": [1],
            "rationale": "Atherosclerosis begins with endothelial dysfunction, followed by lipid accumulation, inflammation, and plaque formation. This process involves oxidized LDL, macrophages, smooth muscle cells, and inflammatory mediators."
        },
        {
            "id": 2,
            "text": "Which type of heart failure is characterized by preserved ejection fraction?",
            "options": [
                "Systolic heart failure",
                "Diastolic heart failure",
                "Right-sided heart failure",
                "Acute heart failure"
            ],
            "correct": [1],
            "rationale": "Diastolic heart failure (heart failure with preserved ejection fraction - HFpEF) occurs when the heart muscle becomes stiff and doesn't relax properly during diastole, despite maintaining normal systolic function."
        },
        {
            "id": 3,
            "text": "What is the most common cause of sudden cardiac death in young athletes?",
            "options": [
                "Coronary artery disease",
                "Hypertrophic cardiomyopathy",
                "Valvular heart disease",
                "Congenital heart defects"
            ],
            "correct": [1],
            "rationale": "Hypertrophic cardiomyopathy is the leading cause of sudden cardiac death in young athletes. The condition involves abnormal thickening of the heart muscle, which can obstruct blood flow and cause fatal arrhythmias during intense physical activity."
        },
        {
            "id": 4,
            "text": "Which mechanism best explains the pathophysiology of hypertension?",
            "options": [
                "Increased cardiac output only",
                "Increased peripheral vascular resistance only",
                "Complex interaction of multiple factors including RAAS activation",
                "Decreased blood volume"
            ],
            "correct": [2],
            "rationale": "Hypertension pathophysiology involves complex interactions including renin-angiotensin-aldosterone system (RAAS) activation, increased sympathetic nervous system activity, endothelial dysfunction, and multiple genetic and environmental factors."
        }
    ],

    pulmonary: [
        {
            "id": 1,
            "text": "What characterizes obstructive pulmonary disease?",
            "options": [
                "Decreased lung volumes with normal airflow",
                "Increased airway resistance with air trapping",
                "Normal lung function with exercise intolerance",
                "Decreased lung compliance only"
            ],
            "correct": [1],
            "rationale": "Obstructive pulmonary diseases like COPD and asthma are characterized by increased airway resistance, prolonged expiration, air trapping, and hyperinflation. The FEV1/FVC ratio is typically reduced below 70%."
        },
        {
            "id": 2,
            "text": "Which pathophysiological change is most characteristic of ARDS?",
            "options": [
                "Bronchoconstriction and mucus hypersecretion",
                "Alveolar-capillary membrane damage and increased permeability",
                "Pulmonary embolism and vascular occlusion",
                "Chronic inflammation and fibrosis"
            ],
            "correct": [1],
            "rationale": "ARDS is characterized by acute alveolar-capillary membrane damage, increased permeability leading to protein-rich pulmonary edema, impaired gas exchange, and decreased lung compliance."
        },
        {
            "id": 3,
            "text": "What is the primary mechanism of asthma pathophysiology?",
            "options": [
                "Chronic bacterial infection",
                "Allergic inflammation and bronchoconstriction",
                "Alveolar destruction and emphysema",
                "Pulmonary fibrosis and scarring"
            ],
            "correct": [1],
            "rationale": "Asthma involves allergic inflammation with mast cell activation, eosinophil infiltration, bronchial hyperresponsiveness, bronchoconstriction, mucus hypersecretion, and airway remodeling in chronic cases."
        }
    ],

    urinary: [
        {
            "id": 1,
            "text": "What is the primary cause of acute kidney injury (AKI)?",
            "options": [
                "Chronic hypertension",
                "Prerenal causes (decreased perfusion)",
                "Genetic mutations",
                "Autoimmune disorders"
            ],
            "correct": [1],
            "rationale": "Prerenal causes account for approximately 70% of AKI cases and include conditions that decrease renal perfusion such as hypovolemia, hypotension, heart failure, and renal artery stenosis."
        },
        {
            "id": 2,
            "text": "Which mechanism best explains the pathophysiology of chronic kidney disease (CKD)?",
            "options": [
                "Acute tubular necrosis",
                "Progressive nephron loss and compensatory hyperfiltration",
                "Urinary tract infections",
                "Kidney stone formation"
            ],
            "correct": [1],
            "rationale": "CKD involves progressive nephron loss with compensatory hyperfiltration in remaining nephrons, leading to glomerular hypertrophy, proteinuria, and eventual glomerulosclerosis, creating a cycle of further nephron loss."
        },
        {
            "id": 3,
            "text": "What characterizes nephrotic syndrome?",
            "options": [
                "Hematuria, hypertension, and oliguria",
                "Proteinuria, hypoalbuminemia, and edema",
                "Pyuria, dysuria, and frequency",
                "Azotemia, acidosis, and hyperkalemia"
            ],
            "correct": [1],
            "rationale": "Nephrotic syndrome is characterized by the classic triad of massive proteinuria (>3.5g/day), hypoalbuminemia, and peripheral edema, often accompanied by hyperlipidemia and hypercoagulability."
        },
        {
            "id": 4,
            "text": "What is the most common cause of urinary tract infections (UTIs)?",
            "options": [
                "Staphylococcus aureus",
                "Escherichia coli",
                "Streptococcus pneumoniae",
                "Pseudomonas aeruginosa"
            ],
            "correct": [1],
            "rationale": "Escherichia coli accounts for 80-85% of uncomplicated urinary tract infections, particularly in young, healthy women. It has specific adhesins that allow it to bind to uroepithelial cells and ascend the urinary tract."
        }
    ]
};