import zipfile
import xml.etree.ElementTree as ET
import json
import re
from pathlib import Path

def extract_docx_content(docx_path):
    """Extract text content from a DOCX file"""
    content = []

    try:
        with zipfile.ZipFile(docx_path, 'r') as docx:
            # Get the main document
            document_xml = docx.read('word/document.xml')
            root = ET.fromstring(document_xml)

            # Define namespace
            ns = {'w': 'http://schemas.openxmlformats.org/wordprocessingml/2006/main'}

            # Extract paragraphs
            paragraphs = root.findall('.//w:p', ns)
            for para in paragraphs:
                text_runs = para.findall('.//w:t', ns)
                paragraph_text = ''.join([run.text for run in text_runs if run.text])
                if paragraph_text.strip():
                    content.append(paragraph_text.strip())

    except Exception as e:
        print(f"Error extracting DOCX content: {e}")

    return content

def extract_pptx_content(pptx_path):
    """Extract text content from a PPTX file"""
    slides_content = []

    try:
        with zipfile.ZipFile(pptx_path, 'r') as pptx:
            # Get slide files
            slide_files = [name for name in pptx.namelist() if name.startswith('ppt/slides/slide') and name.endswith('.xml')]

            for slide_file in sorted(slide_files):
                slide_xml = pptx.read(slide_file)
                root = ET.fromstring(slide_xml)

                # Define namespaces
                ns = {
                    'a': 'http://schemas.openxmlformats.org/drawingml/2006/main',
                    'p': 'http://schemas.openxmlformats.org/presentationml/2006/main'
                }

                # Extract text from slide
                text_elements = root.findall('.//a:t', ns)
                slide_text = []
                for elem in text_elements:
                    if elem.text:
                        slide_text.append(elem.text.strip())

                if slide_text:
                    slides_content.append({
                        'slide_number': len(slides_content) + 1,
                        'content': slide_text
                    })

    except Exception as e:
        print(f"Error extracting PPTX content: {e}")

    return slides_content

def save_extracted_content():
    """Extract and save content from all class materials"""
    materials = {}

    # Extract study guide
    print("Extracting midterm study guide...")
    study_guide_path = "NR507_Midterm Studyguide.docx"
    if Path(study_guide_path).exists():
        study_guide_content = extract_docx_content(study_guide_path)
        materials['study_guide'] = {
            'title': 'NR507 Midterm Study Guide',
            'content': study_guide_content
        }
        print(f"Study guide: {len(study_guide_content)} paragraphs extracted")

    # Extract Week 1 PowerPoint
    print("Extracting Week 1 PowerPoint...")
    week1_pptx_path = "Week 1 Content Applications in Pathophysiology.pptx"
    if Path(week1_pptx_path).exists():
        week1_content = extract_pptx_content(week1_pptx_path)
        materials['week1_slides'] = {
            'title': 'Week 1: Content Applications in Pathophysiology',
            'slides': week1_content
        }
        print(f"Week 1 slides: {len(week1_content)} slides extracted")

    # Extract Week 2 PowerPoint
    print("Extracting Week 2 PowerPoint...")
    week2_pptx_path = "Week 2 Clinical Reaonsing Webinar in Pathophysiology_Anemias_CAD_Heart Failure.pptx"
    if Path(week2_pptx_path).exists():
        week2_content = extract_pptx_content(week2_pptx_path)
        materials['week2_slides'] = {
            'title': 'Week 2: Clinical Reasoning - Anemias, CAD, Heart Failure',
            'slides': week2_content
        }
        print(f"Week 2 slides: {len(week2_content)} slides extracted")

    # Save to JSON file
    with open('data/class_materials.json', 'w', encoding='utf-8') as f:
        json.dump(materials, f, indent=2, ensure_ascii=False)

    print(f"\nClass materials saved to data/class_materials.json")
    return materials

if __name__ == "__main__":
    extracted_materials = save_extracted_content()

    # Print summary
    print("\n=== EXTRACTION SUMMARY ===")
    for key, material in extracted_materials.items():
        print(f"\n{material['title']}:")
        if 'content' in material:
            print(f"  - {len(material['content'])} paragraphs")
            # Show first few paragraphs as sample
            for i, para in enumerate(material['content'][:3]):
                print(f"    {i+1}. {para[:100]}{'...' if len(para) > 100 else ''}")
        elif 'slides' in material:
            print(f"  - {len(material['slides'])} slides")
            # Show first slide as sample
            if material['slides']:
                first_slide = material['slides'][0]
                print(f"    Slide 1: {' | '.join(first_slide['content'][:2])}")