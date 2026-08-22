(function () {
  'use strict';

  const projects = {
    halt: {
      index: '01',
      state: 'Family workspace',
      name: 'HALT',
      description: 'Organization, Caregiver, and Community share a product family while retaining distinct audiences, evidence, wording, and approval context.',
      products: ['HALT Organization', 'HALT Caregiver', 'HALT Community'],
      job: 'Translate verified product truth into useful public communication.',
      publicState: 'Only sanitized, named campaign records appear here.',
      nextGate: 'Bind claims to the relevant product and build.'
    },
    vrf: {
      index: '02',
      state: 'Project lane reserved',
      name: 'VRF',
      description: 'VRF has its own audience, voice, assets, approvals, outreach targets, and measurements. No public campaign state is inferred until the canonical project record identifies it.',
      products: [],
      job: 'Coordinate project-specific social communication without borrowing HALT claims or tone.',
      publicState: 'No project-scoped public campaign is asserted here yet.',
      nextGate: 'Establish the canonical project and asset roots.'
    },
    fefe: {
      index: '03',
      state: 'Project lane reserved',
      name: 'FEFE Connect',
      description: 'FEFE Connect remains an independent communication lane. Its content must be grounded in its own product truth, audience, evidence, and approval chain.',
      products: [],
      job: 'Build a distinct, evidence-backed public presence for FEFE Connect.',
      publicState: 'No project-scoped public campaign is asserted here yet.',
      nextGate: 'Establish the canonical project and asset roots.'
    },
    eve: {
      index: '04',
      state: 'Project lane reserved',
      name: 'Eve OS / Exchange',
      description: 'Eve OS and Hermetic Labs Exchange share a portfolio lane while their precise product and repository boundaries are resolved. No backup tree is treated as canonical by inference.',
      products: ['Eve OS', 'Hermetic Labs Exchange'],
      job: 'Organize approved public communication without inheriting claims from unrelated projects.',
      publicState: 'No project-scoped public campaign is asserted here yet.',
      nextGate: 'Confirm canonical product and repository identities.'
    }
  };

  const byId = (id) => document.getElementById(id);
  const tabs = Array.from(document.querySelectorAll('.project-tab'));

  function setProject(projectId) {
    const project = projects[projectId];
    if (!project) return;

    tabs.forEach((tab) => {
      const active = tab.dataset.project === projectId;
      tab.classList.toggle('is-active', active);
      tab.setAttribute('aria-selected', String(active));
      tab.tabIndex = active ? 0 : -1;
    });

    const activeTab = tabs.find((tab) => tab.dataset.project === projectId);
    const panel = byId('projectPanel');
    panel.setAttribute('aria-labelledby', activeTab.id);
    byId('projectIndex').textContent = project.index;
    byId('projectState').textContent = project.state;
    byId('projectName').textContent = project.name;
    byId('projectDescription').textContent = project.description;
    byId('projectJob').textContent = project.job;
    byId('projectPublicState').textContent = project.publicState;
    byId('projectNextGate').textContent = project.nextGate;

    const products = byId('projectProducts');
    products.replaceChildren();
    project.products.forEach((product) => {
      const chip = document.createElement('span');
      chip.textContent = product;
      products.appendChild(chip);
    });
    products.hidden = project.products.length === 0;
  }

  tabs.forEach((tab, index) => {
    tab.addEventListener('click', () => setProject(tab.dataset.project));
    tab.addEventListener('keydown', (event) => {
      if (!['ArrowLeft', 'ArrowRight', 'Home', 'End'].includes(event.key)) return;
      event.preventDefault();
      let target = index;
      if (event.key === 'ArrowRight') target = (index + 1) % tabs.length;
      if (event.key === 'ArrowLeft') target = (index - 1 + tabs.length) % tabs.length;
      if (event.key === 'Home') target = 0;
      if (event.key === 'End') target = tabs.length - 1;
      tabs[target].focus();
      setProject(tabs[target].dataset.project);
    });
  });

  const formatStatus = (value) => String(value || 'in progress').replaceAll('_', ' ');
  const formatDate = (value) => {
    if (!value) return '';
    const parsed = new Date(value);
    if (Number.isNaN(parsed.getTime())) return '';
    return new Intl.DateTimeFormat(undefined, { month: 'short', day: 'numeric', year: 'numeric' }).format(parsed);
  };

  function element(tag, className, content) {
    const node = document.createElement(tag);
    if (className) node.className = className;
    if (content !== undefined) node.textContent = content;
    return node;
  }

  function renderCampaign(campaign) {
    const card = element('article', 'campaign-card-public');
    const copy = element('div', 'campaign-card-copy');
    copy.appendChild(element('p', 'card-label', formatStatus(campaign.status || 'planning')));
    copy.appendChild(element('h3', '', campaign.title || 'Campaign'));
    copy.appendChild(element('p', '', campaign.summary || 'No public summary is available.'));

    const metadata = element('div', 'campaign-meta');
    (campaign.platforms || []).forEach((platform) => metadata.appendChild(element('span', '', platform)));
    if (campaign.startAt || campaign.endAt) {
      metadata.appendChild(element('span', '', [formatDate(campaign.startAt), formatDate(campaign.endAt)].filter(Boolean).join(' – ')));
    }
    copy.appendChild(metadata);
    card.appendChild(copy);

    const assignments = element('div', 'assignment-list-public');
    const items = Array.isArray(campaign.assignments) ? campaign.assignments : [];
    if (!items.length) {
      assignments.appendChild(element('div', 'assignment-public', 'No public assignments are attached.'));
    } else {
      items.forEach((assignment) => {
        const row = element('div', 'assignment-public');
        const detail = document.createElement('div');
        detail.appendChild(element('strong', '', assignment.title || assignment.assignmentCode || 'Assignment'));
        const due = assignment.dueAt ? ` · due ${formatDate(assignment.dueAt)}` : '';
        detail.appendChild(element('small', '', `${assignment.assignmentCode || 'Work item'}${due}`));
        row.append(detail, element('span', '', formatStatus(assignment.lifecycleStatus || assignment.stage)));
        assignments.appendChild(row);
      });
    }
    card.appendChild(assignments);
    return card;
  }

  async function loadBoard() {
    const board = byId('campaignBoard');
    const refresh = byId('refreshBoard');
    const rail = byId('graphRailStatus');
    board.setAttribute('aria-busy', 'true');
    const loading = element('div', 'board-loading');
    const pulse = document.createElement('span');
    pulse.setAttribute('aria-hidden', 'true');
    loading.append(pulse, document.createTextNode('Loading sanitized public campaign state…'));
    board.replaceChildren(loading);
    refresh.disabled = true;

    try {
      const response = await fetch('https://graph.7hermeticlabs.com/public/contributor-board', {
        headers: { Accept: 'application/json' },
        cache: 'no-store'
      });
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      const data = await response.json();
      board.replaceChildren();
      const campaigns = Array.isArray(data.campaigns)
        ? data.campaigns.filter((campaign) => campaign.id !== 'unassigned' && campaign.campaignCode !== 'GENERAL')
        : [];
      if (!campaigns.length) {
        board.appendChild(element('div', 'board-empty', 'No named public campaigns are currently projected.'));
      }
      campaigns.forEach((campaign) => board.appendChild(renderCampaign(campaign)));
      rail.textContent = 'Public read verified';
      rail.className = 'is-live';
      byId('boardFreshness').textContent = data.generatedAt ? `Read verified · ${formatDate(data.generatedAt)}` : 'Public read verified';
    } catch (_error) {
      board.replaceChildren(element('div', 'board-error', 'The public campaign projection is temporarily unavailable. No cached claim is shown.'));
      rail.textContent = 'Public read unavailable';
      rail.className = 'is-degraded';
      byId('boardFreshness').textContent = 'Public graph unavailable';
    } finally {
      board.setAttribute('aria-busy', 'false');
      refresh.disabled = false;
    }
  }

  byId('refreshBoard').addEventListener('click', loadBoard);
  setProject('halt');
  loadBoard();
})();
