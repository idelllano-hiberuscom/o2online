export default function decorate(block) {
  const tabList = document.createElement('div');
  tabList.classList.add('tabs-list');
  tabList.setAttribute('role', 'tablist');

  const tabPanels = document.createElement('div');
  tabPanels.classList.add('tabs-panels');

  [...block.children].forEach((row, index) => {
    const [labelCell, contentCell] = [...row.children];

    const tab = document.createElement('button');
    tab.classList.add('tabs-tab');
    tab.setAttribute('role', 'tab');
    tab.setAttribute('aria-selected', index === 0 ? 'true' : 'false');
    tab.setAttribute('aria-controls', `tabpanel-${index}`);
    tab.setAttribute('id', `tab-${index}`);
    tab.textContent = labelCell.textContent.trim();
    if (index === 0) tab.classList.add('active');
    tabList.append(tab);

    const panel = document.createElement('div');
    panel.classList.add('tabs-panel');
    panel.setAttribute('role', 'tabpanel');
    panel.setAttribute('id', `tabpanel-${index}`);
    panel.setAttribute('aria-labelledby', `tab-${index}`);
    panel.hidden = index !== 0;
    panel.append(...contentCell.childNodes);
    tabPanels.append(panel);
  });

  tabList.addEventListener('click', (e) => {
    const clickedTab = e.target.closest('.tabs-tab');
    if (!clickedTab) return;

    tabList.querySelectorAll('.tabs-tab').forEach((t) => {
      t.classList.remove('active');
      t.setAttribute('aria-selected', 'false');
    });
    clickedTab.classList.add('active');
    clickedTab.setAttribute('aria-selected', 'true');

    tabPanels.querySelectorAll('.tabs-panel').forEach((p) => { p.hidden = true; });
    const targetPanel = tabPanels.querySelector(`#${clickedTab.getAttribute('aria-controls')}`);
    if (targetPanel) targetPanel.hidden = false;
  });

  block.replaceChildren(tabList, tabPanels);
}
