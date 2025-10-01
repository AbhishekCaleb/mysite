/* global WebImporter */
export default function parse(element, { document }) {
  // Find the tablist container
  const tablist = element.querySelector('[role="tablist"]');
  if (!tablist) return;

  // Get all tab buttons
  const tabButtons = Array.from(tablist.querySelectorAll('[role="tab"]'));

  // Header row as required
  const headerRow = ['Tabs (tabs6)'];

  // Only create tab rows if there is at least one tab label
  if (tabButtons.length === 0) {
    const cells = [headerRow];
    const block = WebImporter.DOMUtils.createTable(cells, document);
    element.replaceWith(block);
    return;
  }

  // Always two columns: label, content (content is not present in source HTML, so empty)
  const rows = tabButtons.map((btn) => {
    let label = '';
    const labelDiv = btn.querySelector('.sc-byGQZk');
    if (labelDiv && labelDiv.textContent) {
      label = labelDiv.textContent.trim();
    } else if (btn.getAttribute('aria-label')) {
      label = btn.getAttribute('aria-label').trim();
    } else {
      label = btn.textContent.trim();
    }
    return [label, ''];
  });

  // Compose table data
  const cells = [headerRow, ...rows];

  // Create table block
  const block = WebImporter.DOMUtils.createTable(cells, document);

  // Replace original element
  element.replaceWith(block);
}
