/* global WebImporter */
export default function parse(element, { document }) {
  // Header row for columns2 block
  const headerRow = ['Columns (columns2)'];

  // Defensive: collect all immediate children of the nav bar root
  // The nav bar is visually a single row of multiple columns: logo, nav items, utility icons, login
  // We'll group these into 3 columns: left (logo), center (main nav), right (utility+login)

  // 1. Left: logo (first child div)
  const leftLogo = element.children[0];
  // 2. Center: nav links (third child div)
  const centerNav = element.children[2];
  // 3. Right: utility icons and login (fifth child div)
  const rightUtil = element.children[4];

  // Defensive: fallback if structure changes
  const columns = [];
  if (leftLogo) columns.push(leftLogo);
  if (centerNav) columns.push(centerNav);
  if (rightUtil) columns.push(rightUtil);

  // If for some reason we have fewer than 3 columns, fill with empty strings
  while (columns.length < 3) columns.push('');

  // Table rows: header, then one row with 3 columns
  const rows = [
    headerRow,
    columns
  ];

  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
