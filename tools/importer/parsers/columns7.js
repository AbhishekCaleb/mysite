/* global WebImporter */
export default function parse(element, { document }) {
  // Find the main grid container
  const mainGrid = element.querySelector('.aem-Grid.aem-Grid--12');
  if (!mainGrid) return;

  // Find all direct children that are columns
  const gridChildren = Array.from(mainGrid.children);
  // Find text column (contains h2) and image column (contains img)
  let textCol = null;
  let imageCol = null;
  gridChildren.forEach((col) => {
    if (!textCol && col.querySelector('h2')) textCol = col;
    if (!imageCol && col.querySelector('img')) imageCol = col;
  });
  if (!textCol && !imageCol) return;

  // --- LEFT COLUMN CONTENT ---
  const leftCellContent = [];
  if (textCol) {
    const heading = textCol.querySelector('h2');
    const description = textCol.querySelector('[data-rte-editelement="true"]');
    const button = textCol.querySelector('a');
    if (heading) leftCellContent.push(heading.cloneNode(true));
    if (description) leftCellContent.push(description.cloneNode(true));
    if (button) leftCellContent.push(button.cloneNode(true));
  }

  // --- RIGHT COLUMN CONTENT ---
  const rightCellContent = [];
  if (imageCol) {
    const image = imageCol.querySelector('img');
    if (image) rightCellContent.push(image.cloneNode(true));
  }

  // --- TABLE CONSTRUCTION ---
  const headerRow = ['Columns (columns7)'];
  const contentRow = [leftCellContent, rightCellContent];
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    contentRow
  ], document);

  element.replaceWith(table);
}
