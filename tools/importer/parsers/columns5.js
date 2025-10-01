/* global WebImporter */
export default function parse(element, { document }) {
  // Helper to extract left column content (text, headings, links)
  function getLeftColumnContent() {
    const leftCol = element.querySelector('.aem-GridColumn.aem-GridColumn--default--5');
    if (!leftCol) return '';
    // Only include visible, meaningful content
    const fragment = document.createDocumentFragment();
    // Kids Plan block
    const kidsHeading = leftCol.querySelector('.title--headingS h2');
    if (kidsHeading) fragment.appendChild(kidsHeading.cloneNode(true));
    const kidsDesc = leftCol.querySelector('.title-color--newZealandBlack');
    if (kidsDesc) {
      const p = kidsDesc.querySelector('p');
      if (p) fragment.appendChild(p.cloneNode(true));
    }
    const kidsBtn = leftCol.querySelector('.button--text a');
    if (kidsBtn && kidsBtn.textContent.trim()) {
      // Create a link element
      const link = document.createElement('a');
      link.href = kidsBtn.href;
      link.textContent = kidsBtn.textContent.trim();
      fragment.appendChild(link);
    }
    // Parent Hub block
    const parentHeading = leftCol.querySelector('.title--subheadingM h2');
    if (parentHeading) fragment.appendChild(parentHeading.cloneNode(true));
    const parentDesc = leftCol.querySelectorAll('.title-color--newZealandBlack');
    if (parentDesc.length > 1) {
      const p = parentDesc[1].querySelector('p');
      if (p) fragment.appendChild(p.cloneNode(true));
    }
    const parentBtn = leftCol.querySelectorAll('.button--text a');
    if (parentBtn.length > 1 && parentBtn[1].textContent.trim()) {
      const link = document.createElement('a');
      link.href = parentBtn[1].href;
      link.textContent = parentBtn[1].textContent.trim();
      fragment.appendChild(link);
    }
    return fragment;
  }

  // Helper to extract right column image
  function getRightColumnImage() {
    const rightCol = element.querySelector('.aem-GridColumn.aem-GridColumn--default--6');
    if (!rightCol) return '';
    const img = rightCol.querySelector('img');
    if (img) return img;
    return '';
  }

  // Build table rows
  const headerRow = ['Columns (columns5)'];
  const leftCol = getLeftColumnContent();
  const rightCol = getRightColumnImage();
  const row = [leftCol, rightCol];

  // Create the table
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    row,
  ], document);

  element.replaceWith(table);
}
