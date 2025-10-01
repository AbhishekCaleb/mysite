/* global WebImporter */
export default function parse(element, { document }) {
  // Find the columns: each .aem-GridColumn--default--3 > .aem-container is a column
  const columns = [];
  const grid = element.querySelector('.aem-Grid.aem-Grid--12');
  if (grid) {
    const colRoots = Array.from(grid.querySelectorAll(':scope > .sc-dBmzty'));
    for (const colRoot of colRoots) {
      const gridCol = colRoot.querySelector('.aem-GridColumn--default--3');
      if (!gridCol) continue;
      const container = gridCol.querySelector('.aem-container');
      if (!container) continue;
      const frag = document.createElement('div');
      // 1. Image (if present)
      const img = container.querySelector('img');
      if (img) frag.appendChild(img);
      // 2. Title (h6)
      const h6 = container.querySelector('h6');
      if (h6) frag.appendChild(h6);
      // 3. Text (rich text)
      const textBlocks = container.querySelectorAll('[data-regionid="text"] > div[data-rte-editelement="true"]');
      textBlocks.forEach(tb => frag.appendChild(tb));
      columns.push(frag);
    }
  }

  // Defensive: if no columns found, fallback to .aem-GridColumn--default--3 anywhere
  if (columns.length === 0) {
    const gridCols = element.querySelectorAll('.aem-GridColumn--default--3');
    gridCols.forEach(gridCol => {
      const container = gridCol.querySelector('.aem-container');
      if (!container) return;
      const frag = document.createElement('div');
      const img = container.querySelector('img');
      if (img) frag.appendChild(img);
      const h6 = container.querySelector('h6');
      if (h6) frag.appendChild(h6);
      const textBlocks = container.querySelectorAll('[data-regionid="text"] > div[data-rte-editelement="true"]');
      textBlocks.forEach(tb => frag.appendChild(tb));
      columns.push(frag);
    });
  }

  // Compose the table
  const headerRow = ['Columns (columns8)'];
  const contentRow = columns.length > 0 ? columns : [''];
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    contentRow,
  ], document);

  element.replaceWith(table);
}
