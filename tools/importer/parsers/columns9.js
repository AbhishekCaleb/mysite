/* global WebImporter */
export default function parse(element, { document }) {
  // Table header
  const headerRow = ['Columns (columns9)'];

  // Find the columns container (the div holding the four columns)
  let columnsContainer = element.querySelector('.sc-eqUAAy.ghMDmX') || element.querySelector('.sc-eqUAAy');
  let columnDivs = [];
  if (columnsContainer) {
    // The columns are inside .sc-ivgJuh > div
    const inner = columnsContainer.querySelector('.sc-ivgJuh');
    if (inner) {
      columnDivs = Array.from(inner.querySelectorAll(':scope > div'));
    } else {
      // Fallback: direct children
      columnDivs = Array.from(columnsContainer.querySelectorAll(':scope > div'));
    }
  } else {
    // Fallback: try direct children of element
    columnDivs = Array.from(element.querySelectorAll(':scope > div'));
  }

  // Defensive: if still not found, try direct children
  if (columnDivs.length === 0) {
    columnDivs = Array.from(element.children);
  }

  // For each column, extract heading and links as DOM references
  const columns = columnDivs.map((colDiv) => {
    const cellContent = [];
    // Heading is first <p>
    const heading = colDiv.querySelector('p');
    if (heading) cellContent.push(heading);
    // All <a> links
    const links = Array.from(colDiv.querySelectorAll(':scope > a'));
    if (links.length) cellContent.push(...links);
    return cellContent;
  });

  // Compose table data: header + one row with all columns
  const tableData = [headerRow, columns];

  // Create block table
  const block = WebImporter.DOMUtils.createTable(tableData, document);

  element.replaceWith(block);
}
