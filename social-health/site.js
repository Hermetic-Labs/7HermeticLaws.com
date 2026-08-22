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
      nextGate: 'Bind claims to the relevant product and build.',
      pulse: {
        summary: 'Product education and contribution activity for the HALT family.',
        scope: 'HALT Organization, Caregiver, and Community',
        rule: 'Explicit HALT project key required',
        notice: 'Only campaigns explicitly assigned to HALT appear in this lane.',
        empty: 'No named HALT campaign is currently projected.',
        aliases: ['halt', 'halt-organization', 'halt-caregiver', 'halt-community']
      },
      studio: {
        title: 'Know the product. Build from truth.',
        description: 'HALT is an offline-capable medical coordination system in closed beta. Contributions must stay grounded in the product lane, current evidence, and qualified human review.',
        referenceUrl: 'https://7hermeticlabs.health/',
        referenceLabel: 'Open the full product reference',
        scopeQuestion: 'Which HALT experience are you speaking for?',
        scopeDescription: 'Start with an active Susan assignment, then choose the product and contribution type. Each lane serves a different person and setting.',
        audiences: ['Medical and humanitarian organizations', 'Caregivers and families', 'Community responders and mutual-aid teams', 'Researchers and evaluators', 'Technical builders and contributors', 'General public'],
        positive: 'HALT is a working closed-beta, offline-capable medical coordination system designed for structured evaluation in constrained environments. Core workflows are designed to run locally, with qualified human review kept in the loop.',
        positiveWhy: 'Why it works · Names the current status, bounds the capability, and keeps human review visible.',
        negative: 'HALT uses autonomous medical AI to diagnose patients anywhere with 100% reliability—even without doctors or internet.',
        negativeWhy: 'Why it fails · Invents autonomy, diagnosis, absolute performance, and removal of clinical oversight.',
        lanes: {
          organization: { label: 'HALT Organization', summary: 'Field medical coordination, structured intake, ward visibility, supplies, and local workflows.', truth: 'A working closed-beta, offline-capable medical coordination system designed for structured evaluation through a single-laptop, local-first model.', boundary: 'Keep qualified human review explicit. Do not imply clinical deployment, validation, authorization, or autonomous decision-making.' },
          caregiver: { label: 'HALT Caregiver', summary: 'Bedside and household timelines, needs, supplies, multilingual assistance, and requests for help.', truth: 'A bedside and household workspace being shaped around care timelines, dietary needs, supplies, multilingual communication, and requests for assistance.', boundary: 'Describe it as part of the closed-beta family. Do not present emerging workflows as clinically validated or generally available.' },
          community: { label: 'HALT Community', summary: 'Household intake, local response, food and WASH stock, first aid, translation, and coordination.', truth: 'A simplified community-response workspace being shaped for household intake, local care mapping, food and WASH stock, first aid, translation, and coordination.', boundary: 'Keep the community-response scope distinct from clinical authority, emergency-service replacement, or proven field deployment.' }
        }
      },
      assets: [{ name: 'HALT', source: './assets/halt-mark.png', description: 'Current public product-family mark.', role: 'Product family' }]
    },
    vrf: {
      index: '02',
      state: 'Project lane reserved',
      name: 'VRF',
      description: 'VRF has its own audience, voice, assets, approvals, outreach targets, and measurements. No public campaign state is inferred until the canonical project record identifies it.',
      products: [],
      job: 'Coordinate project-specific social communication without borrowing HALT claims or tone.',
      publicState: 'No project-scoped public campaign is asserted here yet.',
      nextGate: 'Establish the canonical project and asset roots.',
      pulse: {
        summary: 'Public communication and contributor activity belonging only to the VRF product family.',
        scope: 'VRF product-family communication',
        rule: 'Explicit VRF project key required',
        notice: 'Only campaigns explicitly assigned to VRF appear in this lane.',
        empty: 'No named VRF campaign is currently projected.',
        aliases: ['vrf']
      },
      studio: {
        title: 'Show the system. Bound the build.',
        description: 'VRF is a family of Unreal Engine and immersive-system assets. Contributions must identify the exact pack, version, source, and demonstrated capability.',
        referenceUrl: 'https://www.fab.com/sellers/Hermetic%20Labs',
        referenceLabel: 'Open the public VRF catalog',
        scopeQuestion: 'Which VRF surface are you speaking for?',
        scopeDescription: 'Choose the exact product or learning lane before drafting. Do not combine claims across packs, versions, or unpublished material.',
        audiences: ['Unreal Engine developers', 'XR and simulation teams', 'Technical artists and designers', 'Marketplace customers', 'Technical builders and contributors', 'General public'],
        positive: 'VRF is a family of Unreal Engine tools and learning materials. This demonstration covers the named feature in the cited pack and version; compatibility and setup should be confirmed from the linked source.',
        positiveWhy: 'Why it works · Names the product family, bounds the demonstration, and sends compatibility claims back to the source.',
        negative: 'VRF is a universal VR framework that works with every headset, engine version, and project without setup.',
        negativeWhy: 'Why it fails · Claims universal compatibility and frictionless performance without product-, version-, or device-level evidence.',
        lanes: {
          packs: { label: 'VRF packs', summary: 'Named Unreal Engine packs, modules, and demonstrated workflows.', truth: 'VRF includes a working family of Unreal Engine project assets and modular systems.', boundary: 'Name the exact pack and version. Do not promote deprecated, restricted, private, or unreleased material as currently available.' },
          demonstrations: { label: 'VRF demonstrations', summary: 'Feature demonstrations, compatibility notes, and implementation context.', truth: 'Public demonstrations can show bounded behavior from a named build or pack.', boundary: 'A demonstration proves only what is shown in that configuration; it does not establish universal compatibility or production readiness.' },
          learning: { label: 'VRF learning', summary: 'Public-safe tutorials, walkthroughs, and developer guidance.', truth: 'VRF is supported by tutorials and demonstrations that help builders understand specific workflows.', boundary: 'Use only public-safe learning material and keep the guidance tied to the version and source shown.' }
        }
      },
      assets: [{ name: 'VRF', source: './assets/vrf-mark.png', description: 'Canonical high-resolution mark for the VRF product family.', role: 'Product family' }]
    },
    fefe: {
      index: '03',
      state: 'Project lane reserved',
      name: 'FEFE Connect',
      description: 'FEFE Connect remains an independent communication lane. Its content must be grounded in its own product truth, audience, evidence, and approval chain.',
      products: [],
      job: 'Build a distinct, evidence-backed public presence for FEFE Connect.',
      publicState: 'No project-scoped public campaign is asserted here yet.',
      nextGate: 'Establish the canonical project and asset roots.',
      pulse: {
        summary: 'Public communication and contributor activity belonging only to FEFE Connect.',
        scope: 'FEFE Connect communication',
        rule: 'Explicit FEFE Connect project key required',
        notice: 'Only campaigns explicitly assigned to FEFE Connect appear in this lane.',
        empty: 'No named FEFE Connect campaign is currently projected.',
        aliases: ['fefe', 'fefe-connect']
      },
      studio: {
        title: 'Make the introduction. Keep the standard clear.',
        description: 'FEFE Connect is a private professional network for legal and mental-health professionals. Contributions must preserve its reviewed-membership model, professional boundaries, and privacy-minded positioning.',
        referenceUrl: 'https://fefeconnect.com/',
        referenceLabel: 'Open the FEFE Connect reference',
        scopeQuestion: 'Which FEFE Connect audience are you speaking for?',
        scopeDescription: 'Choose the professional lane or membership story before drafting. Keep review, pricing, privacy, and outcome claims exactly aligned with the current source.',
        audiences: ['Legal professionals and firms', 'Mental-health professionals and practices', 'Prospective members', 'Professional referral partners', 'Technical builders and contributors', 'General public'],
        positive: 'FEFE Connect is a private professional network for legal and mental-health professionals. Applicants complete a role-specific review before an approved profile becomes part of the member community.',
        positiveWhy: 'Why it works · Identifies the two professional groups and describes review without promising a connection or outcome.',
        negative: 'FEFE Connect guarantees fully vetted experts, instant referrals, and successful professional outcomes for every paying member.',
        negativeWhy: 'Why it fails · Turns a reviewed-membership process into absolute vetting, referral, and outcome guarantees.',
        lanes: {
          legal: { label: 'Legal professionals', summary: 'Reviewed firms and legal professionals seeking considered professional connections.', truth: 'FEFE Connect offers a legal-professional path into a private, reviewed membership community.', boundary: 'Do not imply legal endorsement, guaranteed introductions, case outcomes, or verification beyond the checks named in the current source.' },
          mentalHealth: { label: 'Mental-health professionals', summary: 'Reviewed practitioners presenting expertise and connection preferences.', truth: 'FEFE Connect offers a mental-health-professional path with reviewed profiles and member-controlled contact preferences.', boundary: 'Do not disclose clinical records, imply public directories, or promise referrals, engagements, or professional outcomes.' },
          membership: { label: 'Membership experience', summary: 'Application, review, activation, privacy, and community expectations.', truth: 'Applicants apply before payment; approved applicants can activate a fixed monthly membership.', boundary: 'Use current published pricing and terms only. Approval does not guarantee introductions or outcomes.' }
        }
      },
      assets: [{ name: 'FEFE Connect', source: './assets/fefe-connect-mark.png', description: 'Current public wordmark from the FEFE Connect site.', role: 'Service identity', wide: true }]
    },
    eve: {
      index: '04',
      state: 'Project lane reserved',
      name: 'Eve OS / Exchange',
      description: 'Eve OS and Hermetic Labs Exchange share a portfolio lane while their precise product and repository boundaries are resolved. No backup tree is treated as canonical by inference.',
      products: ['Eve OS', 'Hermetic Labs Exchange'],
      job: 'Organize approved public communication without inheriting claims from unrelated projects.',
      publicState: 'No project-scoped public campaign is asserted here yet.',
      nextGate: 'Confirm canonical product and repository identities.',
      pulse: {
        summary: 'Public communication for Eve OS and Hermetic Labs Exchange within their shared portfolio lane.',
        scope: 'Eve OS and Hermetic Labs Exchange',
        rule: 'Explicit Eve or Exchange project key required',
        notice: 'Only campaigns explicitly assigned to Eve OS or Hermetic Labs Exchange appear in this lane.',
        empty: 'No named Eve OS or Exchange campaign is currently projected.',
        aliases: ['eve', 'eve-os', 'exchange', 'hermetic-labs-exchange']
      },
      studio: {
        title: 'Name the layer. Keep the boundary visible.',
        description: 'Eve OS and Hermetic Labs Exchange share a portfolio lane, but they are not interchangeable. Contributions must identify whether they describe the operating system, a module, or the marketplace.',
        referenceUrl: 'https://7hermeticloops.com/',
        referenceLabel: 'Open the Exchange reference',
        scopeQuestion: 'Which Eve OS or Exchange layer are you speaking for?',
        scopeDescription: 'Choose the system, marketplace, or module lane first. Keep product status, availability, economics, and compatibility tied to the current public source.',
        audiences: ['Developers and module builders', 'Organizations evaluating Eve OS', 'Exchange publishers and customers', 'Integration and platform teams', 'Technical contributors', 'General public'],
        positive: 'Eve OS and Hermetic Labs Exchange serve different layers of the ecosystem: Eve OS provides the operating environment, while the Exchange presents modules and packages through a separate marketplace surface.',
        positiveWhy: 'Why it works · Separates the operating system from the marketplace and avoids inventing availability or adoption.',
        negative: 'Every Exchange module is certified by Hermetic Labs, works everywhere, and automatically becomes part of Eve OS.',
        negativeWhy: 'Why it fails · Invents certification, universal compatibility, and automatic platform inclusion.',
        lanes: {
          eveOs: { label: 'Eve OS', summary: 'The operating environment, orchestration layer, and system capabilities.', truth: 'Eve OS is the operating-system layer in the Hermetic Labs ecosystem.', boundary: 'Do not treat planned features, private integrations, or repository artifacts as live public capability without a current source.' },
          exchange: { label: 'Hermetic Labs Exchange', summary: 'The marketplace surface for discovering and presenting Eve OS modules and packages.', truth: 'Hermetic Labs Exchange is the marketplace layer associated with Eve OS modules and packages.', boundary: 'Do not imply that every listing is certified, compatible, approved, or generally available unless the current record says so.' },
          modules: { label: 'Modules and connectors', summary: 'Individual packages, integrations, documentation, and publisher material.', truth: 'Modules and connectors must be described from their own current package record and documentation.', boundary: 'Keep ownership, version, compatibility, pricing, and support claims specific to the named module.' }
        }
      },
      assets: [
        { name: 'Eve OS', source: './assets/eve-os-wordmark.png', description: 'Existing chromatic wordmark retained for identity reference.', role: 'Product identity', wide: true },
        { name: 'Hermetic Labs Exchange', source: './assets/exchange-mark.png', description: 'Existing RGB ring mark retained as the marketplace reference.', role: 'Marketplace identity' }
      ]
    }
  };

  const byId = (id) => document.getElementById(id);
  const tabs = Array.from(document.querySelectorAll('.project-tab'));
  const publicConsole = byId('publicConsole');
  const haltStudio = byId('haltStudio');
  const haltForm = byId('haltContributionForm');
  const studioMailbox = 'Susan@7hermeticlabs.com';
  const lanePicker = byId('studioLanePicker');
  const studioStages = Array.from(document.querySelectorAll('[data-studio-step]'));
  const studioIndicators = Array.from(document.querySelectorAll('[data-step-indicator]'));
  let currentStudioStep = 1;
  let activeProjectId = 'halt';
  let studioProjectId = 'halt';
  let publicBoardSnapshot = null;

  const studioStorageKey = () => `social-health.${studioProjectId}-contribution.v1`;
  const studioProject = () => projects[studioProjectId];
  const studioLanes = () => studioProject().studio.lanes;
  const laneButtons = () => Array.from(lanePicker.querySelectorAll('[data-project-lane]'));

  function localDraft() {
    try {
      return JSON.parse(localStorage.getItem(studioStorageKey()) || '{}');
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
      localStorage.setItem(studioStorageKey(), JSON.stringify(collectHaltDraft()));
    } catch (_error) {
      // The composer remains usable when browser storage is unavailable.
    }
  }

  function selectHaltLane(laneId, persist = true) {
    const lane = studioLanes()[laneId];
    if (!lane) return;
    byId('haltLane').value = laneId;
    laneButtons().forEach((button) => button.setAttribute('aria-checked', String(button.dataset.projectLane === laneId)));
    const truth = byId('haltTruthCard');
    const identity = document.createElement('div');
    identity.append(element('small', '', 'Current product truth'), element('strong', '', lane.label));
    const copy = document.createElement('div');
    copy.append(element('p', '', lane.truth), element('p', '', lane.boundary));
    truth.replaceChildren(identity, copy);
    if (persist) saveHaltDraft();
  }

  function configureProjectStudio(projectId) {
    const project = projects[projectId];
    const studio = project.studio;
    studioProjectId = projectId;

    const mark = project.assets[0];
    byId('studioProjectMark').src = mark.source;
    byId('studioProjectMark').alt = `${project.name} mark`;
    byId('studioProjectEyebrow').textContent = `${project.name} contribution studio`;
    byId('studioSteps').setAttribute('aria-label', `${project.name} contribution lifecycle`);
    byId('haltStudioTitle').textContent = studio.title;
    byId('studioProjectDescription').textContent = studio.description;
    byId('studioProjectReference').href = studio.referenceUrl;
    byId('studioProjectReference').firstChild.textContent = `${studio.referenceLabel} `;
    byId('haltBuilds').hidden = projectId !== 'halt';
    byId('scopeTitle').textContent = studio.scopeQuestion;
    byId('scopeDescription').textContent = studio.scopeDescription;
    byId('haltSourceUrl').placeholder = studio.referenceUrl;
    byId('positiveExampleText').textContent = studio.positive;
    byId('positiveExampleWhy').textContent = studio.positiveWhy;
    byId('negativeExampleText').textContent = studio.negative;
    byId('negativeExampleWhy').textContent = studio.negativeWhy;

    lanePicker.setAttribute('aria-label', `${project.name} product lane`);
    lanePicker.replaceChildren();
    Object.entries(studio.lanes).forEach(([laneId, lane]) => {
      const button = element('button');
      button.type = 'button';
      button.setAttribute('role', 'radio');
      button.setAttribute('aria-checked', 'false');
      button.dataset.projectLane = laneId;
      button.append(element('strong', '', lane.label), element('span', '', lane.summary));
      lanePicker.appendChild(button);
    });

    const audience = byId('haltAudience');
    audience.replaceChildren(new Option('Choose one', ''));
    studio.audiences.forEach((label) => audience.appendChild(new Option(label, label)));

    haltForm.reset();
    byId('haltLane').value = '';
    byId('haltTruthCard').replaceChildren();
    restoreHaltDraft();
    setStudioStep(1, false);
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
      if (!draft.lane) return `Choose the ${studioProject().name} lane this contribution belongs to.`;
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
    const lane = studioLanes()[draft.lane];
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
    const project = studioProject();
    const lane = studioLanes()[draft.lane];
    return [
      `${project.name.toUpperCase()} CONTRIBUTOR SUBMISSION`,
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
      '- No personal, private-contact, credential, confidential, or regulated data included',
      '- Qualified human review remains explicit',
      '- Product status and validation language checked',
      '',
      'Please attach any files before sending.'
    ].join('\n');
  }

  function prepareHaltSubmission() {
    const packet = buildHaltPacket();
    const draft = collectHaltDraft();
    const project = studioProject();
    const lane = studioLanes()[draft.lane];
    byId('haltSubmissionPacket').textContent = packet;
    const subject = `[${draft.assignmentCode}] ${lane ? lane.label : project.name} contribution submission`;
    byId('openHaltEmail').href = `mailto:${studioMailbox}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(packet)}`;
  }

  function setStudioStep(step, moveFocus = true) {
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
    if (moveFocus) {
      activeStage.setAttribute('tabindex', '-1');
      activeStage.focus({ preventScroll: true });
      activeStage.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }

  function updateHaltCounters() {
    byId('claimCount').textContent = String(byId('haltClaim').value.length);
    byId('contextCount').textContent = String(byId('haltContext').value.length);
    byId('draftCount').textContent = String(byId('haltDraftCopy').value.length);
  }

  async function copyPlainText(value) {
    try {
      await navigator.clipboard.writeText(value);
    } catch (_error) {
      const helper = document.createElement('textarea');
      helper.value = value;
      helper.style.position = 'fixed';
      helper.style.opacity = '0';
      document.body.appendChild(helper);
      helper.select();
      document.execCommand('copy');
      helper.remove();
    }
  }

  function temporaryButtonLabel(button, label) {
    const original = button.dataset.originalLabel || button.textContent;
    button.dataset.originalLabel = original;
    button.textContent = label;
    window.setTimeout(() => { button.textContent = original; }, 2200);
  }

  async function copyHaltPacket() {
    await copyPlainText(buildHaltPacket());
    byId('packetStatus').textContent = 'Copied';
  }

  async function copyIcon(button) {
    const source = button.dataset.copyIcon;
    const label = button.dataset.copyLabel || 'Icon';
    button.setAttribute('aria-busy', 'true');
    try {
      if (!window.ClipboardItem || !navigator.clipboard || !navigator.clipboard.write) throw new Error('Image clipboard unavailable');
      const response = await fetch(source);
      if (!response.ok) throw new Error(`Asset request failed: ${response.status}`);
      const sourceBlob = await response.blob();
      const pngBlob = sourceBlob.type === 'image/png' ? sourceBlob : new Blob([await sourceBlob.arrayBuffer()], { type: 'image/png' });
      await navigator.clipboard.write([new ClipboardItem({ 'image/png': pngBlob })]);
      temporaryButtonLabel(button, `${label} copied`);
    } catch (_error) {
      await copyPlainText(new URL(source, window.location.href).href);
      temporaryButtonLabel(button, 'Image link copied');
    } finally {
      button.removeAttribute('aria-busy');
    }
  }

  function clearHaltDraft() {
    if (!window.confirm(`Clear the ${studioProject().name} contribution saved in this browser?`)) return;
    try { localStorage.removeItem(studioStorageKey()); } catch (_error) { /* No stored draft to clear. */ }
    haltForm.reset();
    byId('haltLane').value = '';
    laneButtons().forEach((button) => button.setAttribute('aria-checked', 'false'));
    byId('haltTruthCard').replaceChildren();
    updateHaltCounters();
    setStudioStep(1);
  }

  function openHaltStudio() {
    configureProjectStudio(activeProjectId);
    publicConsole.classList.add('is-project-focused');
    haltStudio.hidden = false;
    byId('haltStudioTitle').focus({ preventScroll: true });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  function closeHaltStudio() {
    publicConsole.classList.remove('is-project-focused');
    haltStudio.hidden = true;
    byId(`tab-${studioProjectId}`).focus({ preventScroll: true });
  }

  function setProject(projectId) {
    const project = projects[projectId];
    if (!project) return;
    activeProjectId = projectId;

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
    byId('openProjectStudio').textContent = `Enter ${project.name} contribution workspace →`;

    const products = byId('projectProducts');
    products.replaceChildren();
    project.products.forEach((product) => {
      const chip = document.createElement('span');
      chip.textContent = product;
      products.appendChild(chip);
    });
    products.hidden = project.products.length === 0;
    renderProjectAssets(project);
    renderProjectPulse(projectId, project);
  }

  function renderProjectPulse(projectId, project) {
    byId('pulseTitle').textContent = `${project.name} campaign pulse`;
    byId('pulseScope').textContent = project.pulse.summary;
    byId('campaignScope').textContent = project.pulse.scope;
    byId('campaignAssociation').textContent = project.pulse.rule;
    byId('boardNotice').textContent = project.pulse.notice;
    if (publicBoardSnapshot) renderBoardForProject(projectId);
  }

  function renderProjectAssets(project) {
    byId('projectAssetsTitle').textContent = `${project.name} ${project.assets.length === 1 ? 'mark' : 'marks'}`;
    byId('projectAssetsDescription').textContent = `Use these assets only inside the ${project.name} lane.`;
    const grid = byId('projectAssetGrid');
    grid.replaceChildren();
    grid.classList.toggle('is-single', project.assets.length === 1);

    project.assets.forEach((asset) => {
      const card = element('article', `project-asset-card${asset.wide ? ' is-wide' : ''}`);
      const visual = element('div', 'project-asset-visual');
      const image = document.createElement('img');
      image.src = asset.source;
      image.alt = `${asset.name} mark`;
      visual.appendChild(image);

      const copy = element('div', 'project-asset-copy');
      copy.append(element('span', 'asset-status is-found', 'Source found'), element('h5', '', asset.name), element('p', '', asset.description), element('small', '', `Role · ${asset.role}`));
      const actions = element('div', 'asset-actions');
      const copyButton = element('button', '', 'Copy PNG');
      copyButton.type = 'button';
      copyButton.dataset.copyIcon = asset.source;
      copyButton.dataset.copyLabel = asset.name;
      copyButton.addEventListener('click', () => copyIcon(copyButton));
      const download = element('a', '', 'Download');
      download.href = asset.source;
      download.setAttribute('download', '');
      actions.append(copyButton, download);
      copy.appendChild(actions);
      card.append(visual, copy);
      grid.appendChild(card);
    });
  }

  tabs.forEach((tab, index) => {
    tab.addEventListener('click', () => {
      setProject(tab.dataset.project);
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

  byId('openProjectStudio').addEventListener('click', openHaltStudio);
  byId('closeHaltStudio').addEventListener('click', closeHaltStudio);

  lanePicker.addEventListener('click', (event) => {
    const button = event.target.closest('[data-project-lane]');
    if (button) selectHaltLane(button.dataset.projectLane);
  });
  lanePicker.addEventListener('keydown', (event) => {
    if (!['ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown'].includes(event.key)) return;
    const buttons = laneButtons();
    const index = buttons.indexOf(event.target.closest('[data-project-lane]'));
    if (index < 0) return;
    event.preventDefault();
    const backwards = ['ArrowLeft', 'ArrowUp'].includes(event.key);
    const target = (index + (backwards ? -1 : 1) + buttons.length) % buttons.length;
    buttons[target].focus();
    selectHaltLane(buttons[target].dataset.projectLane);
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
  document.querySelectorAll('[data-copy-text-target]').forEach((button) => {
    button.addEventListener('click', async () => {
      const target = byId(button.dataset.copyTextTarget);
      if (!target) return;
      await copyPlainText(target.textContent.trim());
      temporaryButtonLabel(button, 'Positive example copied');
    });
  });
  document.querySelectorAll('[data-copy-icon]').forEach((button) => {
    button.addEventListener('click', () => copyIcon(button));
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

  const normalizeProjectKey = (value) => String(value || '').trim().toLowerCase().replaceAll('_', '-').replace(/\s+/g, '-');

  function campaignProjectKeys(campaign) {
    const nested = campaign.project && typeof campaign.project === 'object' ? campaign.project : {};
    const scoped = campaign.scope && typeof campaign.scope === 'object' ? campaign.scope : {};
    return [
      campaign.projectId,
      campaign.projectKey,
      campaign.projectCode,
      campaign.projectSlug,
      nested.id,
      nested.key,
      nested.code,
      nested.slug,
      scoped.projectId,
      scoped.projectKey,
      scoped.projectCode
    ].map(normalizeProjectKey).filter(Boolean);
  }

  function renderBoardForProject(projectId) {
    const project = projects[projectId];
    const board = byId('campaignBoard');
    if (!project || !publicBoardSnapshot) return;

    const aliases = project.pulse.aliases.map(normalizeProjectKey);
    const campaigns = Array.isArray(publicBoardSnapshot.campaigns)
      ? publicBoardSnapshot.campaigns.filter((campaign) => {
        if (campaign.id === 'unassigned' || campaign.campaignCode === 'GENERAL') return false;
        return campaignProjectKeys(campaign).some((key) => aliases.includes(key));
      })
      : [];

    board.replaceChildren();
    if (!campaigns.length) board.appendChild(element('div', 'board-empty', project.pulse.empty));
    campaigns.forEach((campaign) => board.appendChild(renderCampaign(campaign)));
    board.setAttribute('aria-busy', 'false');
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
    publicBoardSnapshot = null;

    try {
      const response = await fetch('https://graph.7hermeticlabs.com/public/contributor-board', {
        headers: { Accept: 'application/json' },
        cache: 'no-store'
      });
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      const data = await response.json();
      publicBoardSnapshot = data;
      renderBoardForProject(activeProjectId);
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
  byId('mainContent').prepend(byId('projects'));
  setProject('halt');
  loadBoard();
})();
