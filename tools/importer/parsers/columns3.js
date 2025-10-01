/* global WebImporter */
export default function parse(element, { document }) {
  // Find all visible slides (slick-active)
  const slides = Array.from(
    element.querySelectorAll('.slick-track > .slick-slide.slick-active')
  );

  if (!slides.length) return;

  // Each slide becomes a column. Extract the main content for each card
  const columns = slides.map((slide) => {
    // Find the card root
    const card = slide.querySelector('[data-testid="base-product-card"]');
    if (!card) return '';
    // Clone the card to avoid modifying the original DOM
    const cardClone = card.cloneNode(true);
    // Remove all script and style tags for cleanliness
    cardClone.querySelectorAll('script, style').forEach((el) => el.remove());
    // Return the full card content (not just the card node)
    return Array.from(cardClone.childNodes);
  });

  // Table header row: must match block name exactly
  const headerRow = ['Columns (columns3)'];
  // Table content row: all columns side by side
  const tableRows = [columns];

  // Create table and replace
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    ...tableRows,
  ], document);

  element.replaceWith(table);
}
