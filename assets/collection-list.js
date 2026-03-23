//   document.addEventListener('click', function (e) {
//     const btn = e.target.closest('.tab-btn');
//     console.log(btn);
//     if (!btn) return;

//     const section = btn.closest('.shopify-section');
//     const sectionId = section.dataset.sectionId;
//     const handle = btn.dataset.handle;
//     console.log('section', section);
//     console.log('sectionId', sectionId);
//     console.log('handle', handle);

//     const target = section.querySelector('#collection-products');
//     console.log(target);
//  fetch(`/collections/${handle}?section_id=main-collection-product-grid`)
//       .then((res) => res.text())
//       .then((html) => {
//         const doc = new DOMParser().parseFromString(html, 'text/html');
//         const newGrid = doc.querySelector('#ProductGridContainer');

//         if (newGrid && target) {
//           target.innerHTML = newGrid.innerHTML;
//         }
//       })
//   });

(function () {

  function initCollectionTabs(section) {
    const grid = section.querySelector('#collection-products');
    const viewMore = section.querySelector('#collection-tabs__view-more');
    const viewLink = section.querySelector('#collection-tabs__view-more-link');
    const btnText = viewMore ? (viewLink ? viewLink.textContent.trim() : '') : '';

    if (!grid) return;

    // ── Tab click handler ──────────────────────────────────────
    section.addEventListener('click', function (e) {
      const btn = e.target.closest('.tab-btn');
      if (!btn || btn.disabled) return;

      const handle = btn.dataset.handle;
      const limit = parseInt(btn.dataset.limit, 10) || 4;
      const total = parseInt(btn.dataset.total, 10) || 0;
      const collectionUrl = btn.dataset.collectionUrl || '';

      // Already active — do nothing
      if (btn.classList.contains('tab-btn--active')) return;

      // Update active state on buttons
      section.querySelectorAll('.tab-btn').forEach(b => {
        b.classList.remove('tab-btn--active');
        b.setAttribute('aria-selected', 'false');
      });
      btn.classList.add('tab-btn--active');
      btn.setAttribute('aria-selected', 'true');

      // Show loading state
      grid.classList.add('collection-tabs__grid--loading');

      // Fetch the collection product grid from Shopify
      fetch(`/collections/${handle}?section_id=main-collection-product-grid`)
        .then(res => res.text())
        .then(html => {
          const doc = new DOMParser().parseFromString(html, 'text/html');

          // Try to grab individual product cards (li items) first.
          // This prevents Shopify's inner grid wrapper from conflicting
          // with our own .collection-tabs__grid layout.
          const productItems = doc.querySelectorAll('#product-grid .grid__item');

          grid.innerHTML = '';

          productItems.forEach((item, index) => {
            if (index < limit) {
              const product = item.querySelector('.card-wrapper');
              if (product) {
                grid.appendChild(product.cloneNode(true));
              }
            }

            else {
              // Fallback: pull inner HTML of the grid container
              const container = doc.querySelector('#ProductGridContainer') || doc.querySelector('.product-grid');
              grid.innerHTML = container ? container.innerHTML : '<p>No products found.</p>';
            }
          })
          grid.classList.remove('collection-tabs__grid--loading');

          // ── Update View More button ──────────────────────────
          if (viewMore && viewLink) {
            if (total > limit) {
              viewLink.setAttribute('href', collectionUrl);
              viewMore.style.display = '';
            } else {
              viewMore.style.display = 'none';
            }
          }
        })
        .catch(() => {
          grid.classList.remove('collection-tabs__grid--loading');
          grid.innerHTML = '<p>Could not load products. Please try again.</p>';
        });
    });
  }

  // ── Init on page load ──────────────────────────────────────
  function init() {
    document.querySelectorAll('.collection-tabs-section').forEach(initCollectionTabs);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  // ── Shopify theme editor live reload ──────────────────────
  document.addEventListener('shopify:section:load', e => {
    const section = e.target.querySelector('.collection-tabs-section');
    if (section) initCollectionTabs(section);
  });

})();