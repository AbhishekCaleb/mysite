/* global WebImporter */
export default function parse(element, { document }) {
  // Helper: Find the first image in the block (if any)
  function findImage(el) {
    return el.querySelector('img');
  }

  // Helper: Find the main heading (h1-h6, prioritizing h4 as in source)
  function findHeading(el) {
    return el.querySelector('h1, h2, h3, h4, h5, h6');
  }

  // Helper: Find the first paragraph (subheading/desc)
  function findParagraph(el) {
    return el.querySelector('p');
  }

  // 1. Header row (must match block name exactly)
  const headerRow = ['Hero (hero4)'];

  // 2. Background image row (optional)
  // In this HTML, the image is decorative, not a background, but per block spec, place it in the image row
  const image = findImage(element);
  const imageRow = [image ? image : ''];

  // 3. Content row: Title (heading), Subheading (paragraph)
  const heading = findHeading(element);
  const paragraph = findParagraph(element);

  // Compose content cell: heading and paragraph (if present), preserving semantic elements
  const contentCell = [];
  if (heading) contentCell.push(heading);
  if (paragraph) contentCell.push(paragraph);

  // Always provide an array for the cell, even if empty (edge case: missing heading/paragraph)
  const contentRow = [contentCell.length ? contentCell : ''];

  // Compose table
  const rows = [
    headerRow,
    imageRow,
    contentRow,
  ];

  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
