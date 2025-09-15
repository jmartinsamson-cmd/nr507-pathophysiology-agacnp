# NR507 Advanced Pathophysiology AGACNP

A comprehensive web-based study platform for Advanced Pathophysiology in the Adult-Gerontology Acute Care Nurse Practitioner (AGACNP) program.

**Created by: Martin Samson RN BSN**

## 🎯 Features

### 📝 Practice Exams
- **284 questions** across 9 comprehensive chapters
- **Dual modes**:
  - **Exam Mode**: Timed testing with final results and scoring
  - **Study Mode**: Immediate feedback with detailed rationales
- **Interactive interface** with progress tracking
- **Comprehensive review** with detailed explanations

### 📚 Class Materials & Interactive Study
- **5 key topic areas** based on midterm study guide:
  - 🛡️ Immunity & Inflammation (4 questions)
  - 🩸 Hematological Pathologies (4 questions)
  - ❤️ Cardiovascular Pathologies (4 questions)
  - 🫁 Pulmonary Pathologies (3 questions)
  - 🫀 Urinary System Pathologies (4 questions)
- **19 interactive study questions** with immediate feedback
- **Extracted content** from study guides and PowerPoint presentations

## 📋 Chapter Coverage

| Chapter | Topic | Questions |
|---------|-------|-----------|
| Chapter 9 | Immunity & Inflammation | 42 |
| Chapter 28 | Hematologic System | 38 |
| Chapter 29 | Alterations of Erythrocytes | 36 |
| Chapter 30 | Alterations of Leukocyte Function | 31 |
| Chapter 32 | Cardiovascular & Lymphatic Systems | 41 |
| Chapter 34 | Cardiovascular Alterations in Children | 22 |
| Chapter 35 | Structure & Function of Pulmonary System | 31 |
| Chapter 37 | Alterations of Pulmonary Function | 16 |
| Chapter 38 | Structure & Function of Renal System | 28 |

## 🚀 Getting Started

1. **Open the application**: Simply open `index.html` in any modern web browser
2. **Choose your study method**:
   - **Practice Exams**: Select exam or study mode, choose a chapter, and begin
   - **Class Materials**: Click topic cards for targeted study sessions
3. **Study effectively**: Use immediate feedback and detailed rationales to master concepts

## 🎨 Interface

- **Modern medical/academic design** with professional blue color scheme
- **Mobile-responsive** layout for studying on any device
- **Intuitive navigation** between practice exams and study materials
- **Progress tracking** and performance analytics

## 📁 Project Structure

```
├── index.html              # Main application interface
├── script.js              # JavaScript application logic
├── styles.css             # Responsive CSS styling
├── data/                  # Question and content data
│   ├── exam_questions.json         # Chapter 9 questions
│   ├── chapter_28_questions.json   # Chapter 28 questions
│   ├── chapter_29_questions.json   # Chapter 29 questions
│   ├── chapter_30_questions.json   # Chapter 30 questions
│   ├── chapter_32_questions.json   # Chapter 32 questions
│   ├── chapter_34_questions.json   # Chapter 34 questions
│   ├── chapter_35_questions.json   # Chapter 35 questions
│   ├── chapter_37_questions.json   # Chapter 37 questions
│   ├── chapter_38_questions.json   # Chapter 38 questions
│   ├── study_immunity_questions.json       # Immunity study questions
│   ├── study_hematology_questions.json     # Hematology study questions
│   ├── study_cardiovascular_questions.json # Cardiovascular study questions
│   ├── study_pulmonary_questions.json      # Pulmonary study questions
│   ├── study_urinary_questions.json        # Urinary study questions
│   ├── class_materials.json               # Extracted study guide content
│   └── study_materials_index.json         # Study materials index
├── extract_class_materials.py    # Content extraction script
├── generate_study_questions.py   # Question generation script
└── README.md                     # This documentation
```

## 🔧 Technical Details

- **Pure HTML/CSS/JavaScript** - No framework dependencies
- **JSON-based data storage** for questions and study materials
- **Responsive design** with mobile compatibility
- **Modern ES6+ JavaScript** with class-based architecture
- **Professional medical UI/UX** design

## 📊 Statistics

- **Total Questions**: 303 (284 practice + 19 study materials)
- **Content Sources**: Study guides and PowerPoint presentations
- **Question Types**: Multiple choice and multiple select
- **All questions include**: Detailed rationales and explanations

## 🎓 Educational Objectives

This platform supports learning objectives for:
- Pathophysiology of major body systems
- Clinical reasoning and case-based learning
- AGACNP program competencies
- Advanced practice nursing preparation

## 📝 Usage Notes

- **Study Mode**: Best for learning new concepts with immediate feedback
- **Exam Mode**: Ideal for self-assessment and test preparation
- **Class Materials**: Focused review of key concepts from study materials
- **Mobile Compatible**: Study anywhere on any device

## 🔄 Updates

The platform is designed for easy content updates:
- Add new chapters by placing JSON files in the `data/` directory
- Update study materials by running the extraction scripts
- Modify interface by editing the HTML, CSS, and JavaScript files

## 📧 Contact

**Created by**: Martin Samson RN BSN
**Course**: NR507 Advanced Pathophysiology
**Program**: Adult-Gerontology Acute Care Nurse Practitioner (AGACNP)

---

*This educational tool is designed to supplement formal pathophysiology education and should be used alongside official course materials and textbooks.*