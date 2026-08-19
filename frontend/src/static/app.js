document.addEventListener('DOMContentLoaded', () => {
    // Mobile navigation & View Switching
    const navItems = document.querySelectorAll('.nav-item');
    const viewSections = document.querySelectorAll('.view-section');

    function switchView(viewId) {
        // Update nav
        navItems.forEach(item => {
            if (item.dataset.view === viewId) {
                item.classList.add('active');
            } else {
                item.classList.remove('active');
            }
        });

        // Update sections
        viewSections.forEach(section => {
            if (section.id === viewId) {
                section.classList.add('active');
            } else {
                section.classList.remove('active');
            }
        });

        // Hide results area when in schema view
        const resultsArea = document.querySelector('.results-area');
        if (resultsArea) {
            if (viewId === 'view-schema') {
                resultsArea.style.display = 'none';
            } else {
                resultsArea.style.display = 'block';
            }
        }

        // Store preference
        localStorage.setItem('activeView', viewId);
    }

    navItems.forEach(item => {
        item.addEventListener('click', (e) => {
            e.preventDefault();
            switchView(item.dataset.view);
        });
    });

    // Restore active view
    const savedView = localStorage.getItem('activeView');
    if (savedView) {
        switchView(savedView);
    }



    // Query Shortcuts
    const shortcutBtns = document.querySelectorAll('.shortcut-btn');
    shortcutBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const inputId = btn.dataset.input;
            const inputEl = document.getElementById(inputId);
            if (inputEl) {
                inputEl.value = btn.dataset.val;
                inputEl.focus();
            }
        });
    });

    // Copy Actions
    const copyBtns = document.querySelectorAll('.copy-btn');
    copyBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const textToCopy = btn.dataset.copy;
            navigator.clipboard.writeText(textToCopy).then(() => {
                const originalIcon = btn.innerHTML;
                btn.innerHTML = '<svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" stroke-width="2" fill="none"><polyline points="20 6 9 17 4 12"></polyline></svg>';
                setTimeout(() => {
                    btn.innerHTML = originalIcon;
                }, 2000);
            });
        });
    });

    // Copy Results Action (Table/JSON)
    const copyResultsBtns = document.querySelectorAll('.copy-results-btn');
    copyResultsBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            let textToCopy = "";
            const activePane = document.querySelector('.results-content .view-pane.active');
            if (activePane) {
                if (activePane.id === 'results-table') {
                    const table = activePane.querySelector('table');
                    if (table) {
                        const rows = table.querySelectorAll('tr');
                        textToCopy = Array.from(rows).map(row => {
                            const cells = row.querySelectorAll('th, td');
                            return Array.from(cells).map(cell => cell.innerText.trim()).join('\t');
                        }).join('\n');
                    } else {
                        textToCopy = activePane.innerText;
                    }
                } else if (activePane.id === 'results-json') {
                    textToCopy = activePane.innerText;
                }
            }
            if (textToCopy) {
                navigator.clipboard.writeText(textToCopy).then(() => {
                    const originalIcon = btn.innerHTML;
                    btn.innerHTML = '<svg viewBox="0 0 24 24" width="16" height="16" stroke="#2ecc71" stroke-width="2" fill="none"><polyline points="20 6 9 17 4 12"></polyline></svg>';
                    btn.style.transform = "scale(1.2)";
                    btn.style.transition = "transform 0.2s ease";
                    setTimeout(() => {
                        btn.innerHTML = originalIcon;
                        btn.style.transform = "scale(1)";
                    }, 2000);
                });
            }
        });
    });

    // Result View Switcher
    const switcherBtns = document.querySelectorAll('.switcher-btn');
    const viewPanes = document.querySelectorAll('.view-pane');

    switcherBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remove active from all siblings
            const parent = btn.parentElement;
            parent.querySelectorAll('.switcher-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const targetId = btn.dataset.target;
            const contentParent = parent.parentElement.nextElementSibling;
            
            contentParent.querySelectorAll('.view-pane').forEach(pane => {
                if (pane.id === targetId) {
                    pane.classList.add('active');
                } else {
                    pane.classList.remove('active');
                }
            });
        });
    });

    // Schema Filtering
    const schemaFilter = document.getElementById('schema-filter-input');
    if (schemaFilter) {
        schemaFilter.addEventListener('input', (e) => {
            const query = e.target.value.toLowerCase();
            const rows = document.querySelectorAll('#schema-table tbody tr');
            
            rows.forEach(row => {
                const text = row.textContent.toLowerCase();
                if (text.includes(query)) {
                    row.style.display = '';
                } else {
                    row.style.display = 'none';
                }
            });
        });
    }

    // Async Forms (UX enhancement for loading states)
    const asyncForms = document.querySelectorAll('.async-form');
    asyncForms.forEach(form => {
        form.addEventListener('submit', () => {
            const btn = form.querySelector('button[type="submit"]');
            if (btn) {
                const spinner = btn.querySelector('.spinner');
                if (spinner) spinner.style.display = 'inline-block';
                btn.classList.add('loading');
                btn.disabled = true;
            }
        });
    });
    
    // Custom handling for Insert Data Adapter
    const addForm = document.getElementById('add-form');
    if (addForm) {
        addForm.addEventListener('submit', (e) => {
            // Assemble fields into CSV format
            const title = document.getElementById('field_title').value.trim();
            const director = document.getElementById('field_director').value.trim();
            const age = document.getElementById('field_age').value.trim();
            const year = document.getElementById('field_year').value.trim();
            const genre = document.getElementById('field_genre').value.trim();
            
            // Process platforms (comma separated)
            let platformsInput = document.getElementById('field_platforms').value;
            let platformsList = platformsInput.split(',')
                                  .map(p => p.trim())
                                  .filter(p => p.length > 0)
                                  .join(',');

            // Format: Title,Director,Age,Year,Genre,Platform...
            let csvStr = `${title},${director},${age},${year},${genre}`;
            if (platformsList) {
                csvStr += `,${platformsList}`;
            }

            document.getElementById('data_line_hidden').value = csvStr;

            // Loading state UX is handled by the generic .async-form listener
        });
    }
});
