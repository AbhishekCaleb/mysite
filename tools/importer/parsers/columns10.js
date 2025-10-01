/* global WebImporter */
export default function parse(element, { document }) {
  // Helper: get immediate children
  const children = Array.from(element.querySelectorAll(':scope > div'));
  if (children.length < 3) return; // Defensive: expect 3 columns

  // Column 1: Social icons (first child)
  const col1 = children[0];
  // Column 2: Footer links (second child)
  const col2 = children[1];
  // Column 3: Copyright and button (third child)
  const col3 = children[2];

  // Table header
  const headerRow = ['Columns (columns10)'];
  // Table content row: three columns
  const row = [col1, col2, col3];

  // Table structure
  const cells = [headerRow, row];

  // Create block table
  const block = WebImporter.DOMUtils.createTable(cells, document);

  // Replace original element
  element.replaceWith(block);
}
