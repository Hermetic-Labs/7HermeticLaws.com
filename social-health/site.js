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
  const publicConsole = byId('publicConsole');
  const haltStudio = byId('haltStudio');
  const haltForm = byId('haltContributionForm');
  const haltStorageKey = 'social-health.halt-contribution.v1';
  const haltMailbox = 'Susan@7hermeticlabs.com';
  const laneButtons = Array.from(document.querySelectorAll('[data-halt-lane]'));
  const studioStages = Array.from(document.querySelectorAll('[data-studio-step]'));
  const studioIndicators = Array.from(document.querySelectorAll('[data-step-indicator]'));
  let currentStudioStep = 1;

  const haltLanes = {
    organization: {
      label: 'HALT Organization',
      truth: 'A working closed-beta, offline-capable medical coordination system designed for structured evaluation through a single-laptop, local-first model.',
      boundary: 'Keep qualified human review explicit. Do not imply clinical deployment, validation, authorization, or autonomous decision-making.'
    },
    caregiver: {
      label: 'HALT Caregiver',
      truth: 'A bedside and household workspace being shaped around care timelines, dietary needs, supplies, multilingual communication, and requests for assistance.',
      boundary: 'Describe it as part of the closed-beta family. Do not present emerging workflows as clinically validated or generally available.'
    },
    community: {
      label: 'HALT Community',
      truth: 'A simplified community-response workspace being shaped for household intake, local care mapping, food and WASH stock, first aid, translation, and coordination.',
      boundary: 'Keep the community-response scope distinct from clinical authority, emergency-service replacement, or proven field deployment.'
    }
  };

  function localDraft() {
    try {
      return JSON.parse(localStorage.getItem(haltStorageKey) || '{}');
    } catch (_error) {
      return {};
    }
  }

  function collectHaltDraft() {
    return {
      assignmentCode: byId('haltAssignmentCode').value.trim().toUpperCase(),
      contributionType: byId('haltContributionType').value,
      lane: byId('haltLane').value,
      sourceUrl: byId('haltSourceUrl').value.trim(),
      audience: byId('haltAudience').value,
      claim: byId('haltClaim').value.trim(),
      context: byId('haltContext').value.trim(),
      channels: Array.from(haltForm.querySelectorAll('[name="channels"]:checked')).map((input) => input.value),
      draftCopy: byId('haltDraftCopy').value.trim(),
      assetLinks: byId('haltAssetLinks').value.trim(),
      altText: byId('haltAltText').value.trim(),
      checks: {
        source: byId('checkSource').checked,
        privacy: byId('checkPrivacy').checked,
        medical: byId('checkMedical').checked,
        status: byId('checkStatus').checked
      }
    };
  }

  function saveHaltDraft() {
    try {
      localStorage.setItem(haltStorageKey, JSON.stringify(collectHaltDraft()));
    } catch (_error) {
      // The composer remains usable when browser storage is unavailable.
    }
  }

  function selectHaltLane(laneId, persist = true) {
    const lane = haltLanes[laneId];
    if (!lane) return;
    byId('haltLane').value = laneId;
    laneButtons.forEach((button) => button.setAttribute('aria-checked', String(button.dataset.haltLane === laneId)));
    const truth = byId('haltTruthCard');
    const identity = document.createElement('div');
    identity.append(element('small', '', 'Current product truth'), element('strong', '', lane.label));
    const copy = document.createElement('div');
    copy.append(element('p', '', lane.truth), element('p', '', lane.boundary));
    truth.replaceChildren(identity, copy);
    if (persist) saveHaltDraft();
  }

  function restoreHaltDraft() {
    const draft = localDraft();
    const values = {
      haltAssignmentCode: draft.assignmentCode,
      haltContributionType: draft.contributionType,
      haltSourceUrl: draft.sourceUrl,
      haltAudience: draft.audience,
      haltClaim: draft.claim,
      haltContext: draft.context,
      haltDraftCopy: draft.draftCopy,
      haltAssetLinks: draft.assetLinks,
      haltAltText: draft.altText
    };
    Object.entries(values).forEach(([id, value]) => { if (value) byId(id).value = value; });
    (draft.channels || []).forEach((channel) => {
      const input = Array.from(haltForm.querySelectorAll('[name="channels"]')).find((item) => item.value === channel);
      if (input) input.checked = true;
    });
    if (draft.checks) {
      byId('checkSource').checked = Boolean(draft.checks.source);
      byId('checkPrivacy').checked = Boolean(draft.checks.privacy);
      byId('checkMedical').checked = Boolean(draft.checks.medical);
      byId('checkStatus').checked = Boolean(draft.checks.status);
    }
    if (draft.lane) selectHaltLane(draft.lane, false);
    updateHaltCounters();
  }

  function showStudioValidation(message) {
    const panel = byId('studioValidation');
    panel.textContent = message;
    panel.hidden = !message;
    if (message) panel.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  }

  function validHttpUrl(value) {
    try {
      const parsed = new URL(value);
      return ['http:', 'https:'].includes(parsed.protocol);
    } catch (_error) {
      return false;
    }
  }

  function validateStudioStep(step) {
    const draft = collectHaltDraft();
    if (step === 1) {
      if (!/^SOCIAL-\d{3,}$/i.test(draft.assignmentCode)) return 'Enter the SOCIAL assignment code supplied by Susan.';
      if (!draft.lane) return 'Choose the HALT product lane this contribution belongs to.';
      if (!draft.contributionType) return 'Choose the kind of contribution you are preparing.';
    }
    if (step === 2) {
      if (!validHttpUrl(draft.sourceUrl)) return 'Add one current HTTP or HTTPS source URL.';
      if (!draft.audience) return 'Choose the audience this contribution is intended to reach.';
      if (!draft.claim) return 'State the bounded claim your source supports.';
    }
    if (step === 3) {
      if (!draft.channels.length) return 'Choose at least one target channel.';
      if (!draft.draftCopy) return 'Add the draft copy, script, correction, or outreach note.';
      if ((draft.assetLinks || ['visual', 'short-video'].includes(draft.contributionType)) && !draft.altText) {
        return 'Add alt text or a visual description for the proposed asset.';
      }
    }
    if (step === 4 && Object.values(draft.checks).some((checked) => !checked)) {
      return 'Confirm all four contributor safety checks before preparing the handoff.';
    }
    return '';
  }

  function reviewItem(label, value) {
    const wrapper = document.createElement('div');
    wrapper.append(element('span', '', label), element('strong', '', value || 'Not provided'));
    return wrapper;
  }

  function renderHaltReview() {
    const draft = collectHaltDraft();
    const lane = haltLanes[draft.lane];
    byId('haltReviewSummary').replaceChildren(
      reviewItem('Assignment', draft.assignmentCode),
      reviewItem('Product', lane ? lane.label : ''),
      reviewItem('Contribution', draft.contributionType.replaceAll('-', ' ')),
      reviewItem('Audience', draft.audience),
      reviewItem('Channels', draft.channels.join(', ')),
      reviewItem('Source', draft.sourceUrl)
    );
  }

  function buildHaltPacket() {
    const draft = collectHaltDraft();
    const lane = haltLanes[draft.lane];
    return [
      'HALT CONTRIBUTOR SUBMISSION',
      '',
      `Assignment: ${draft.assignmentCode}`,
      `Product: ${lane ? lane.label : draft.lane}`,
      `Contribution type: ${draft.contributionType.replaceAll('-', ' ')}`,
      `Audience: ${draft.audience}`,
      `Target channels: ${draft.channels.join(', ')}`,
      '',
      'PRIMARY SOURCE',
      draft.sourceUrl,
      '',
      'SUPPORTED CLAIM',
      draft.claim,
      '',
      'WHY THIS MATTERS NOW',
      draft.context || 'Not provided',
      '',
      'DRAFT CONTRIBUTION',
      draft.draftCopy,
      '',
      'ASSET OR WORKING-FILE LINKS',
      draft.assetLinks || 'No links provided; files may be attached to the email.',
      '',
      'ALT TEXT / VISUAL DESCRIPTION',
      draft.altText || 'Not applicable',
      '',
      'CONTRIBUTOR CHECKS',
      '- Source-bound claim confirmed',
      '- No private, patient, credential, or confidential data included',
      '- Qualified human review remains explicit',
      '- Product status and validation language checked',
      '',
      'Please attach any files before sending.'
    ].join('\n');
  }

  function prepareHaltSubmission() {
    const packet = buildHaltPacket();
    const draft = collectHaltDraft();
    const lane = haltLanes[draft.lane];
    byId('haltSubmissionPacket').textContent = packet;
    const subject = `[${draft.assignmentCode}] ${lane ? lane.label : 'HALT'} contribution submission`;
    byId('openHaltEmail').href = `mailto:${haltMailbox}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(packet)}`;
  }

  function setStudioStep(step) {
    currentStudioStep = step;
    showStudioValidation('');
    studioStages.forEach((stage) => { stage.hidden = Number(stage.dataset.studioStep) !== step; });
    studioIndicators.forEach((indicator) => {
      const indicatorStep = Number(indicator.dataset.stepIndicator);
      indicator.classList.toggle('is-current', indicatorStep === step);
      indicator.classList.toggle('is-complete', indicatorStep < step);
    });
    if (step === 4) renderHaltReview();
    if (step === 5) prepareHaltSubmission();
    const activeStage = studioStages.find((stage) => Number(stage.dataset.studioStep) === step);
    activeStage.setAttribute('tabindex', '-1');
    activeStage.focus({ preventScroll: true });
    activeStage.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  function updateHaltCounters() {
    byId('claimCount').textContent = String(byId('haltClaim').value.length);
    byId('contextCount').textContent = String(byId('haltContext').value.length);
    byId('draftCount').textContent = String(byId('haltDraftCopy').value.length);
  }

  async function copyHaltPacket() {
    const packet = buildHaltPacket();
    try {
      await navigator.clipboard.writeText(packet);
      byId('packetStatus').textContent = 'Copied';
    } catch (_error) {
      const helper = document.createElement('textarea');
      helper.value = packet;
      helper.style.position = 'fixed';
      helper.style.opacity = '0';
      document.body.appendChild(helper);
      helper.select();
      document.execCommand('copy');
      helper.remove();
      byId('packetStatus').textContent = 'Copied';
    }
  }

  function clearHaltDraft() {
    if (!window.confirm('Clear the HALT contribution saved in this browser?')) return;
    try { localStorage.removeItem(haltStorageKey); } catch (_error) { /* No stored draft to clear. */ }
    haltForm.reset();
    byId('haltLane').value = '';
    laneButtons.forEach((button) => button.setAttribute('aria-checked', 'false'));
    byId('haltTruthCard').replaceChildren();
    updateHaltCounters();
    setStudioStep(1);
  }

  function openHaltStudio() {
    publicConsole.classList.add('is-project-focused');
    haltStudio.hidden = false;
    byId('haltStudioTitle').focus({ preventScroll: true });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  function closeHaltStudio() {
    publicConsole.classList.remove('is-project-focused');
    haltStudio.hidden = true;
    byId('tab-halt').focus({ preventScroll: true });
  }

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
    tab.addEventListener('click', () => {
      setProject(tab.dataset.project);
      if (tab.dataset.project === 'halt') openHaltStudio();
    });
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

  byId('closeHaltStudio').addEventListener('click', closeHaltStudio);

  laneButtons.forEach((button, index) => {
    button.addEventListener('click', () => selectHaltLane(button.dataset.haltLane));
    button.addEventListener('keydown', (event) => {
      if (!['ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown'].includes(event.key)) return;
      event.preventDefault();
      const backwards = ['ArrowLeft', 'ArrowUp'].includes(event.key);
      const target = (index + (backwards ? -1 : 1) + laneButtons.length) % laneButtons.length;
      laneButtons[target].focus();
      selectHaltLane(laneButtons[target].dataset.haltLane);
    });
  });

  haltForm.addEventListener('input', (event) => {
    if (event.target === byId('haltAssignmentCode')) event.target.value = event.target.value.toUpperCase();
    updateHaltCounters();
    saveHaltDraft();
  });
  haltForm.addEventListener('change', saveHaltDraft);

  haltForm.querySelectorAll('[data-next-step]').forEach((button) => {
    button.addEventListener('click', () => {
      const message = validateStudioStep(currentStudioStep);
      if (message) {
        showStudioValidation(message);
        return;
      }
      saveHaltDraft();
      setStudioStep(Number(button.dataset.nextStep));
    });
  });

  haltForm.querySelectorAll('[data-prev-step]').forEach((button) => {
    button.addEventListener('click', () => setStudioStep(Number(button.dataset.prevStep)));
  });

  byId('copyHaltPacket').addEventListener('click', copyHaltPacket);
  byId('clearHaltDraft').addEventListener('click', clearHaltDraft);
  restoreHaltDraft();

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
