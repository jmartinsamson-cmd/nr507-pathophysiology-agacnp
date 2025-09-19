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
    ],

    week1: [
        {
            "id": 1,
            "text": "A 25-year-old woman develops hives, swelling of lips, and difficulty breathing within minutes of eating shellfish. What type of hypersensitivity reaction is this?",
            "options": [
                "Type I (IgE-mediated immediate hypersensitivity)",
                "Type II (Cytotoxic antibody-mediated)",
                "Type III (Immune complex-mediated)",
                "Type IV (Delayed-type cell-mediated)"
            ],
            "correct": [0],
            "rationale": "This is a classic Type I hypersensitivity reaction (anaphylaxis). It involves IgE antibodies, mast cell degranulation, and histamine release, occurring within minutes of exposure to the allergen."
        },
        {
            "id": 2,
            "text": "A patient with rheumatoid arthritis receives a blood transfusion and develops fever, chills, and hemolysis. What mechanism is responsible?",
            "options": [
                "IgE-mediated mast cell activation",
                "IgG/IgM antibodies causing complement activation",
                "Immune complex deposition",
                "T cell-mediated cytotoxicity"
            ],
            "correct": [1],
            "rationale": "This describes a Type II hypersensitivity reaction - hemolytic transfusion reaction. IgG or IgM antibodies bind to antigens on the transfused RBCs, activating complement and causing hemolysis."
        },
        {
            "id": 3,
            "text": "A 35-year-old man develops joint pain, kidney problems, and skin rash. Laboratory shows immune complexes in blood vessels. What type of reaction is this?",
            "options": [
                "Type I hypersensitivity",
                "Type II hypersensitivity",
                "Type III hypersensitivity (immune complex disease)",
                "Type IV hypersensitivity"
            ],
            "correct": [2],
            "rationale": "Type III hypersensitivity involves immune complex formation and deposition in tissues, causing inflammation. Examples include serum sickness, systemic lupus erythematosus, and post-infectious glomerulonephritis."
        },
        {
            "id": 4,
            "text": "A healthcare worker develops a skin reaction 48 hours after exposure to latex gloves. The reaction involves redness, swelling, and vesicles. What cells are primarily responsible?",
            "options": [
                "Mast cells and basophils",
                "B cells and plasma cells",
                "T helper cells and macrophages",
                "Natural killer cells"
            ],
            "correct": [2],
            "rationale": "This is Type IV (delayed-type) hypersensitivity, involving T cells (particularly Th1 cells) and macrophages. The reaction occurs 24-48 hours after exposure and is cell-mediated rather than antibody-mediated."
        },
        {
            "id": 5,
            "text": "Case Study: A 28-year-old nurse develops contact dermatitis from latex gloves. She also has a history of food allergies. Which clinical reasoning approach is most appropriate?",
            "options": [
                "Focus only on the immediate skin symptoms",
                "Consider both immediate (Type I) and delayed (Type IV) hypersensitivity mechanisms",
                "Treat symptomatically without investigating the cause",
                "Assume all reactions are the same type"
            ],
            "correct": [1],
            "rationale": "Clinical reasoning requires understanding that latex can cause both Type I (immediate, IgE-mediated anaphylaxis) and Type IV (delayed, T cell-mediated contact dermatitis) reactions. Patients with food allergies may have cross-reactivity."
        },
        {
            "id": 6,
            "text": "A patient with HIV infection shows progressive decline in CD4+ T cell count. What is the primary pathophysiological mechanism?",
            "options": [
                "Autoimmune destruction of T cells",
                "Viral integration into CD4+ cells leading to cell death",
                "Lack of T cell production in bone marrow",
                "Excessive T cell migration to lymph nodes"
            ],
            "correct": [1],
            "rationale": "HIV preferentially infects CD4+ T helper cells through gp120 binding to CD4 receptors. Viral replication leads to cell death, progressively depleting CD4+ cells and compromising cell-mediated immunity."
        },
        {
            "id": 7,
            "text": "Primary immunodeficiency diseases typically present with which pattern of infections?",
            "options": [
                "Single episodes of common viral infections",
                "Recurrent, severe, or unusual infections from early age",
                "Only bacterial infections in adulthood",
                "Seasonal allergies and mild cold symptoms"
            ],
            "correct": [1],
            "rationale": "Primary immunodeficiencies are congenital defects in immune system components, leading to recurrent, severe, or opportunistic infections that begin in infancy or early childhood."
        },
        {
            "id": 8,
            "text": "A patient develops systemic lupus erythematosus (SLE). Which autoantibodies are most specific for diagnosis?",
            "options": [
                "Rheumatoid factor (RF)",
                "Anti-nuclear antibodies (ANA) and anti-dsDNA",
                "Anti-mitochondrial antibodies",
                "Anti-smooth muscle antibodies"
            ],
            "correct": [1],
            "rationale": "While ANA is sensitive for SLE (95%), anti-dsDNA antibodies are highly specific and correlate with disease activity and renal involvement. Anti-Smith antibodies are also highly specific for SLE."
        }
    ],

    week2: [
        {
            "id": 1,
            "text": "A 65-year-old woman presents with fatigue and pale conjunctiva. Lab results show Hgb 8.5 g/dL, MCV 70 fL, and low serum ferritin. What is the most likely diagnosis?",
            "options": [
                "Vitamin B12 deficiency anemia",
                "Iron deficiency anemia",
                "Anemia of chronic disease",
                "Hemolytic anemia"
            ],
            "correct": [1],
            "rationale": "The combination of low hemoglobin, low MCV (microcytic), and low ferritin strongly suggests iron deficiency anemia. This is the most common cause of anemia worldwide."
        },
        {
            "id": 2,
            "text": "Case Study: A 45-year-old man with chronic kidney disease shows Hgb 9.0 g/dL with normal MCV and low reticulocyte count. What is the primary mechanism?",
            "options": [
                "Decreased iron absorption",
                "Decreased erythropoietin production",
                "Increased red blood cell destruction",
                "Vitamin B12 malabsorption"
            ],
            "correct": [1],
            "rationale": "Chronic kidney disease causes decreased erythropoietin production by the kidneys, leading to normocytic, normochromic anemia with low reticulocyte count (hypoproliferative anemia)."
        },
        {
            "id": 3,
            "text": "A patient with pernicious anemia shows large, oval-shaped red blood cells. What is the underlying pathophysiology?",
            "options": [
                "Iron deficiency affecting hemoglobin synthesis",
                "B12 deficiency affecting DNA synthesis",
                "Chronic inflammation affecting iron utilization",
                "Genetic defect in globin chain production"
            ],
            "correct": [1],
            "rationale": "Pernicious anemia results from vitamin B12 deficiency due to lack of intrinsic factor. B12 is essential for DNA synthesis, so deficiency causes megaloblastic anemia with large, immature RBCs."
        },
        {
            "id": 4,
            "text": "What is the primary mechanism of atherosclerosis development?",
            "options": [
                "Viral infection of coronary arteries",
                "Endothelial dysfunction and lipid infiltration",
                "Congenital coronary anomalies",
                "Autoimmune destruction of vessel walls"
            ],
            "correct": [1],
            "rationale": "Atherosclerosis begins with endothelial dysfunction, allowing LDL cholesterol infiltration. This triggers inflammation, foam cell formation, and plaque development through the response-to-injury hypothesis."
        },
        {
            "id": 5,
            "text": "A 58-year-old man with coronary artery disease experiences crushing chest pain radiating to his left arm. What is the pathophysiological mechanism?",
            "options": [
                "Coronary artery spasm only",
                "Myocardial oxygen supply-demand imbalance",
                "Pericardial inflammation",
                "Pulmonary embolism"
            ],
            "correct": [1],
            "rationale": "Angina results from myocardial ischemia due to inadequate oxygen supply to meet myocardial oxygen demand. This occurs when coronary blood flow is compromised by atherosclerotic plaque."
        },
        {
            "id": 6,
            "text": "Heart failure with preserved ejection fraction (HFpEF) is characterized by:",
            "options": [
                "Inability of the heart to contract effectively",
                "Inability of the heart to relax and fill properly",
                "Primary valve dysfunction",
                "Congenital heart defects"
            ],
            "correct": [1],
            "rationale": "HFpEF involves diastolic dysfunction where the left ventricle becomes stiff and cannot relax properly during diastole, impairing ventricular filling despite preserved systolic function (EF ≥50%)."
        },
        {
            "id": 7,
            "text": "Case Study: A 72-year-old woman with diabetes and hypertension develops shortness of breath and ankle swelling. Echo shows EF 45%. What type of heart failure?",
            "options": [
                "Heart failure with preserved ejection fraction (HFpEF)",
                "Heart failure with reduced ejection fraction (HFrEF)",
                "Right-sided heart failure only",
                "Acute heart failure syndrome"
            ],
            "correct": [1],
            "rationale": "EF 45% indicates reduced ejection fraction (normal >50-55%). HFrEF is often caused by ischemic heart disease, previous MI, or cardiomyopathy, commonly seen in patients with diabetes and hypertension."
        },
        {
            "id": 8,
            "text": "The pathophysiology of hypertension involves multiple mechanisms. Which system is most central to long-term blood pressure regulation?",
            "options": [
                "Sympathetic nervous system only",
                "Renin-angiotensin-aldosterone system (RAAS)",
                "Endocrine system only",
                "Respiratory system"
            ],
            "correct": [1],
            "rationale": "The RAAS is central to long-term blood pressure regulation. Renin release leads to angiotensin II formation, causing vasoconstriction and aldosterone release, which increases sodium retention and blood volume."
        },
        {
            "id": 9,
            "text": "A patient with sickle cell disease experiences a pain crisis. What is the primary pathophysiological mechanism?",
            "options": [
                "Immune system attack on red blood cells",
                "Sickling of RBCs causing vaso-occlusion",
                "Excessive iron accumulation",
                "Bone marrow failure"
            ],
            "correct": [1],
            "rationale": "Sickle cell crises occur when deoxygenated hemoglobin S polymerizes, causing RBCs to sickle. These rigid, crescent-shaped cells occlude small blood vessels, causing tissue ischemia and severe pain."
        },
        {
            "id": 10,
            "text": "Clinical Reasoning: A young athlete collapses during practice. Family history reveals sudden cardiac deaths. What is the most likely cause?",
            "options": [
                "Coronary artery disease",
                "Hypertrophic cardiomyopathy",
                "Myocarditis",
                "Mitral valve prolapse"
            ],
            "correct": [1],
            "rationale": "Hypertrophic cardiomyopathy is the leading cause of sudden cardiac death in young athletes. The thick ventricular walls can obstruct outflow and cause fatal arrhythmias, especially during intense physical activity."
        }
    ],

    week3: [
        {
            "id": 1,
            "text": "A 55-year-old smoker presents with chronic cough and progressive dyspnea. Spirometry shows FEV1/FVC ratio of 0.65. What is the primary pathophysiology?",
            "options": [
                "Alveolar inflammation and fibrosis",
                "Airway obstruction and air trapping",
                "Pulmonary vascular constriction",
                "Pleural effusion and compression"
            ],
            "correct": [1],
            "rationale": "An FEV1/FVC ratio <0.70 indicates obstructive lung disease. In COPD, chronic inflammation causes airway narrowing, increased resistance, air trapping, and hyperinflation."
        },
        {
            "id": 2,
            "text": "A 28-year-old woman with asthma experiences an acute exacerbation. What is the primary mechanism of bronchoconstriction?",
            "options": [
                "Bacterial infection and inflammation",
                "IgE-mediated mast cell degranulation and smooth muscle contraction",
                "Alveolar collapse and surfactant deficiency",
                "Pulmonary edema and fluid accumulation"
            ],
            "correct": [1],
            "rationale": "Asthma involves Type I hypersensitivity with IgE antibodies causing mast cell and basophil degranulation, releasing histamine and leukotrienes that cause bronchoconstriction, inflammation, and mucus hypersecretion."
        },
        {
            "id": 3,
            "text": "Case Study: A 45-year-old patient develops sudden onset severe dyspnea and chest pain. CT angiography reveals pulmonary embolism. What is the primary pathophysiological consequence?",
            "options": [
                "Increased pulmonary vascular resistance and V/Q mismatch",
                "Decreased lung compliance only",
                "Bronchoconstriction and airway obstruction",
                "Alveolar flooding and surfactant loss"
            ],
            "correct": [0],
            "rationale": "Pulmonary embolism obstructs pulmonary vessels, increasing pulmonary vascular resistance and creating ventilation-perfusion (V/Q) mismatch. Ventilated alveoli receive no perfusion, leading to dead space and hypoxemia."
        },
        {
            "id": 4,
            "text": "What characterizes the pathophysiology of acute respiratory distress syndrome (ARDS)?",
            "options": [
                "Chronic airway inflammation and remodeling",
                "Acute alveolar-capillary membrane damage and increased permeability",
                "Pulmonary hypertension and right heart failure",
                "Bronchial hyperresponsiveness and reversible obstruction"
            ],
            "correct": [1],
            "rationale": "ARDS involves acute lung injury with alveolar-capillary membrane damage, increased permeability leading to protein-rich pulmonary edema, impaired gas exchange, and decreased lung compliance."
        },
        {
            "id": 5,
            "text": "A patient with pneumonia develops hypoxemia. Which mechanism best explains the gas exchange impairment?",
            "options": [
                "Airway obstruction preventing ventilation",
                "V/Q mismatch due to alveolar consolidation",
                "Decreased respiratory drive",
                "Chest wall restriction"
            ],
            "correct": [1],
            "rationale": "Pneumonia causes alveolar consolidation and inflammation, creating areas of perfusion without effective ventilation (low V/Q ratio or shunt), leading to hypoxemia that typically responds to supplemental oxygen."
        },
        {
            "id": 6,
            "text": "What distinguishes restrictive lung disease from obstructive lung disease on pulmonary function tests?",
            "options": [
                "Restrictive shows normal FEV1/FVC ratio with reduced lung volumes",
                "Restrictive shows reduced FEV1/FVC ratio only",
                "No difference in pulmonary function patterns",
                "Restrictive shows increased lung volumes"
            ],
            "correct": [0],
            "rationale": "Restrictive lung disease typically shows normal or increased FEV1/FVC ratio (>0.70) but reduced lung volumes (FVC, TLC). Obstructive disease shows reduced FEV1/FVC ratio with air trapping."
        },
        {
            "id": 7,
            "text": "Case Study: A coal miner develops progressive dyspnea and bilateral lung infiltrates. What is the likely pathophysiological mechanism?",
            "options": [
                "Acute allergic reaction to coal dust",
                "Chronic inhalation causing pulmonary fibrosis",
                "Infectious pneumonia from contaminated coal",
                "Bronchial carcinoma development"
            ],
            "correct": [1],
            "rationale": "Pneumoconiosis (coal worker's lung) results from chronic inhalation of mineral dust, causing inflammatory response, macrophage activation, and progressive pulmonary fibrosis with restrictive lung disease pattern."
        },
        {
            "id": 8,
            "text": "What is the primary mechanism of hypoxemic respiratory failure in COPD exacerbation?",
            "options": [
                "Complete airway obstruction",
                "Worsening V/Q mismatch and increased dead space",
                "Pneumothorax development",
                "Pulmonary edema formation"
            ],
            "correct": [1],
            "rationale": "COPD exacerbation worsens ventilation-perfusion mismatch due to increased airway obstruction, mucus plugging, and inflammation, leading to hypoxemia and often hypercapnia from increased dead space ventilation."
        },
        {
            "id": 9,
            "text": "A patient with idiopathic pulmonary fibrosis shows progressive dyspnea. What characterizes this condition?",
            "options": [
                "Reversible airway obstruction",
                "Progressive alveolar and interstitial fibrosis",
                "Acute inflammatory response only",
                "Pulmonary vascular malformations"
            ],
            "correct": [1],
            "rationale": "IPF involves progressive fibroblast proliferation and collagen deposition in the alveolar walls and interstitium, leading to impaired gas exchange, reduced lung compliance, and restrictive physiology."
        },
        {
            "id": 10,
            "text": "Clinical Reasoning: A patient with chronic bronchitis shows cor pulmonale. What is the pathophysiological sequence?",
            "options": [
                "Left heart failure causing right heart strain",
                "Chronic hypoxemia → pulmonary vasoconstriction → pulmonary hypertension → right heart failure",
                "Direct myocardial toxicity from smoking",
                "Systemic hypertension affecting both ventricles"
            ],
            "correct": [1],
            "rationale": "Chronic lung disease causes hypoxemia, leading to pulmonary vasoconstriction and increased pulmonary vascular resistance. This creates pulmonary hypertension, increasing right ventricular workload and eventually causing right heart failure (cor pulmonale)."
        }
    ]
};