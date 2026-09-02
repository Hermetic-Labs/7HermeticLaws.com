import { chromium } from 'playwright';
import path from 'path';
import { fileURLToPath } from 'url';

const root = path.dirname(fileURLToPath(import.meta.url));
const browser = await chromium.launch({ executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe' });
const page = await browser.newPage({ viewport: { width: 390, height: 844 } });
const errors = [];
page.on('pageerror', (error) => errors.push(error.message));
page.on('console', (message) => { if (message.type() === 'error') errors.push(message.text()); });
await page.addInitScript(() => {
  window.__copiedText = '';
  window.__copiedImages = 0;
  window.ClipboardItem = class ClipboardItem { constructor(data) { this.data = data; } };
  Object.defineProperty(navigator, 'clipboard', {
    configurable: true,
    value: {
      writeText: async (value) => { window.__copiedText = value; },
      write: async (items) => { window.__copiedImages = items.length; }
    }
  });
});

const boardFixture = {
  generatedAt: '2026-08-22T13:00:00.000Z',
  campaigns: [{
    projectId: 'halt',
    title: 'HALT awareness',
    summary: 'Build a consistent social rhythm.',
    platforms: ['LinkedIn'],
    status: 'active',
    startAt: '2026-08-10T00:00:00.000Z',
    endAt: '2026-08-16T00:00:00.000Z',
    assignments: [{ assignmentCode: 'SOCIAL-003', title: 'Contributor onboarding confirmation', lifecycleStatus: 'draft' }]
  }]
};

const scorecardFixture = {
  generatedAt: '2026-08-12T07:44:32.957Z',
  contributor: { id: 'hiteshi-baldev', name: 'Hiteshi Hitu Seo Baldev', timezone: 'Asia/Kolkata' },
  campaign: { title: 'HALT awareness', summary: 'Build a consistent social rhythm.', platforms: ['LinkedIn'], status: 'active', startAt: '2026-08-10T00:00:00.000Z', endAt: '2026-08-16T00:00:00.000Z' },
  thisWeek: { weekOf: '2026-08-10', summary: 'Publish and engage.', score: 72, goals: [{ id: 'g1', title: 'Publish three posts', current: 2, target: 3, unit: 'posts', status: 'in_progress' }] },
  lastWeek: { weekOf: '2026-08-03', summary: 'Foundation week.', score: 84, rank: 1, cohortSize: 3, goals: [], wins: ['Completed profile'], improvements: ['Increase engagement'] },
  managerNote: 'Strong foundation. Keep the cadence steady.',
  lifecycle: [{
    assignmentCode: 'SOCIAL-003', title: 'Contributor onboarding confirmation', lifecycleStatus: 'changes_requested',
    revisionRound: 1, feedback: 'Tighten the opening claim and keep the status bounded.',
    nextAction: 'Review Susan’s feedback, revise the contribution, and reply in the same email thread.',
    milestones: { submittedAt: '2026-08-12T06:00:00.000Z' }, publication: { calendarLinked: false },
    updatedAt: '2026-08-12T07:00:00.000Z'
  }],
  updatedAt: '2026-08-12T07:44:26.452Z'
};

await page.route('https://graph.7hermeticlabs.com/**', async (route) => {
  const body = route.request().url().includes('/public/contributor-scorecard/') ? scorecardFixture : boardFixture;
  await route.fulfill({ status: 200, contentType: 'application/json', body: JSON.stringify(body) });
});

const publicUrl = `file://${path.join(root, 'social-health', 'index.html')}`;
await page.goto(publicUrl, { waitUntil: 'networkidle' });
await page.locator('.campaign-card-public').waitFor({ state: 'attached' });

if ((await page.title()) !== 'Social Health — Hermetic Labs') errors.push('Public page title is incorrect');
if (!(await page.locator('link[href*="site.css?v=20260902-3"]').count())) errors.push('Site stylesheet cache marker is missing');
if (!(await page.locator('script[src*="site.js?v=20260902-1"]').count())) errors.push('Site script cache marker is missing');
if (!(await page.locator('#publicConsole').isVisible())) errors.push('Public console is not visible');
if (!(await page.locator('#contributorWorkspace').isHidden())) errors.push('Contributor workspace appeared without a signed link');
if ((await page.locator('.project-tab').count()) !== 4) errors.push('Expected four project lanes');
if ((await page.locator('.campaign-card-public').count()) !== 1) errors.push('Public campaign did not render');
if ((await page.locator('#mainContent > :first-child').getAttribute('id')) !== 'projects') errors.push('Portfolio map is not the first public section');
if (await page.locator('#materials').count()) errors.push('Mixed-project asset register remains on the landing page');
if ((await page.locator('#pulseTitle').textContent()) !== 'HALT campaign pulse') errors.push('Campaign pulse is not scoped to HALT by default');
if (await page.locator('#projectPanel .project-assets, #projectPanel .project-pulse').count()) errors.push('Project details remain exposed in the summary');
if ((await page.locator('#tab-halt').getAttribute('href')) !== null) errors.push('HALT tab still carries a page link');
if (await page.evaluate(() => Array.from(document.querySelectorAll('[download]')).some((node) => !node.closest('.project-assets')))) errors.push('A download control remains outside Project iconology');
if ((await page.locator('#projectAssetGrid .project-asset-card').count()) !== 1) errors.push('HALT project asset did not render in its lane');
if (!(await page.locator('#projectAssetGrid img[src$="halt-mark.png"]').count())) errors.push('HALT mark is not wired into the HALT lane');
if (!(await page.locator('.brand-logo').getAttribute('src')).includes('7hl-social-rgb-192.png')) errors.push('RGB site logo is not wired into the header');

await page.locator('#tab-fefe').click();
if ((await page.locator('#projectName').textContent()) !== 'FEFE Connect') errors.push('Project tab did not update the panel');
if (!(await page.locator('#haltStudio').isHidden())) errors.push('A project tab opened the workspace instead of its summary');
if (!(await page.locator('#projectAssetGrid img[src$="fefe-connect-mark.png"]').count())) errors.push('FEFE Connect mark is not contained in the FEFE lane');
if ((await page.locator('#pulseTitle').textContent()) !== 'FEFE Connect campaign pulse') errors.push('Campaign pulse did not switch to FEFE Connect');
if (await page.locator('.campaign-card-public').count()) errors.push('HALT campaign leaked into the FEFE Connect scope');
if (!(await page.locator('#campaignBoard').textContent()).includes('No named FEFE Connect campaign')) errors.push('FEFE Connect empty state is not project-specific');
await page.locator('#openProjectStudio').click();
if ((await page.locator('#studioProjectEyebrow').textContent()) !== 'FEFE Connect contribution studio') errors.push('FEFE Connect workspace did not inherit its identity');
if (!(await page.locator('#haltPlaytesting').isHidden())) errors.push('HALT playtesting leaked into the FEFE Connect workspace');
if (!(await page.locator('#haltStudio .project-assets').isVisible()) || !(await page.locator('#haltStudio .project-pulse').isVisible())) errors.push('FEFE Connect iconology and campaign pulse did not move into its workspace');
if ((await page.locator('#studioLanePicker [data-project-lane]').count()) !== 3) errors.push('FEFE Connect workspace lanes did not render');
await page.locator('#haltAssignmentCode').fill('SOCIAL-101');
if (!(await page.evaluate(() => localStorage.getItem('social-health.fefe-contribution.v1')))) errors.push('FEFE Connect draft was not isolated in project storage');
await page.locator('#closeHaltStudio').click();
await page.locator('#tab-vrf').click();
if (!(await page.locator('#projectAssetGrid img[src$="vrf-mark.png"]').count())) errors.push('VRF mark is not contained in the VRF lane');
if ((await page.locator('#pulseTitle').textContent()) !== 'VRF campaign pulse') errors.push('Campaign pulse did not switch to VRF');
await page.locator('#openProjectStudio').click();
if ((await page.locator('#studioProjectEyebrow').textContent()) !== 'VRF contribution studio') errors.push('VRF workspace did not inherit its identity');
if ((await page.locator('#haltAssignmentCode').inputValue()) !== '') errors.push('FEFE Connect draft leaked into the VRF workspace');
if ((await page.locator('#studioLanePicker [data-project-lane]').count()) !== 3) errors.push('VRF workspace lanes did not render');
await page.locator('#closeHaltStudio').click();
await page.locator('#tab-eve').click();
if ((await page.locator('#projectAssetGrid .project-asset-card').count()) !== 2) errors.push('Eve OS and Exchange marks are not grouped in their shared lane');
if ((await page.locator('#pulseTitle').textContent()) !== 'Eve OS / Exchange campaign pulse') errors.push('Campaign pulse did not switch to Eve OS / Exchange');
await page.locator('#openProjectStudio').click();
if (!(await page.locator('#haltStudio').isVisible())) errors.push('Eve OS / Exchange summary did not open its contribution workspace');
if ((await page.locator('#studioProjectEyebrow').textContent()) !== 'Eve OS / Exchange contribution studio') errors.push('Contribution workspace did not inherit the Eve OS / Exchange identity');
if ((await page.locator('#studioSteps').getAttribute('aria-label')) !== 'Eve OS / Exchange contribution lifecycle') errors.push('Contribution lifecycle kept the wrong project label');
if ((await page.locator('#studioLanePicker [data-project-lane]').count()) !== 3) errors.push('Eve OS / Exchange workspace lanes did not render');
if ((await page.locator('.project-asset-scroll').evaluate((node) => getComputedStyle(node).overflowX)) !== 'auto') errors.push('Project iconology asset rail is not horizontally scrollable');
await page.locator('.project-assets > summary').click();
if (await page.locator('.project-assets').getAttribute('open') !== null) errors.push('Project iconology did not collapse');
await page.locator('.project-assets > summary').click();
if (await page.locator('.project-assets').getAttribute('open') === null) errors.push('Project iconology did not expand');
await page.locator('#closeHaltStudio').click();

await page.locator('#tab-halt').click();
if (!(await page.locator('#haltStudio').isHidden())) errors.push('HALT tab bypassed its summary');
if (!(await page.locator('#openProjectStudio').textContent()).includes('HALT')) errors.push('HALT summary did not expose its workspace action');
await page.locator('#openProjectStudio').click();
if (!(await page.locator('#haltBuilds').isVisible())) errors.push('HALT build downloads are not visible in the HALT workspace');
if ((await page.locator('#haltBuilds .halt-build-card').count()) !== 3) errors.push('HALT build area does not expose all three product packages');
if (!(await page.locator('#haltBuilds a[href$="/builds/HALT_latest_setup.exe"]').count())) errors.push('HALT Organization tester alias is missing');
if (!(await page.locator('#haltBuilds a[href$="/builds/HALT_1.2.18_setup.exe"]').count())) errors.push('HALT Organization immutable package is missing');
if (!(await page.locator('#haltBuilds a[href$="/builds/HALT_Caregiver_1.2.19_setup.exe"]').count())) errors.push('HALT Caregiver immutable package is missing');
if (!(await page.locator('#haltBuilds a[href$="/builds/HALT_Community_1.2.19_setup.exe"]').count())) errors.push('HALT Community immutable package is missing');
if (await page.locator('#haltBuilds a[href*="Caregiver_latest"], #haltBuilds a[href*="Community_latest"]').count()) errors.push('Unpublished Caregiver or Community latest alias was inferred');
if (!(await page.locator('#haltBuilds .build-playtest-link[href="#haltPlaytesting"]').count())) errors.push('Caregiver playtesting link is missing beside the installer');
if (!(await page.locator('#haltStudio').isVisible())) errors.push('HALT summary did not open the focused contribution studio');
if (!(await page.locator('#haltPlaytesting').isVisible())) errors.push('HALT playtesting summary is not visible in the HALT workspace');
if ((await page.locator('#haltPlaytesting .playtest-gallery-card').count()) !== 3) errors.push('Playtesting contribution gallery does not contain three evidence cards');
if (!(await page.locator('#haltPlaytesting .playtest-report').first().locator(':scope > .playtest-gallery').count())) errors.push('PT-001 evidence gallery is not inside the extracted bug report');
if (await page.locator('#haltPlaytesting > .playtest-gallery').count()) errors.push('PT-001 evidence gallery remains outside the report history');
await page.locator('#haltPlaytesting .playtest-history > summary').click();
await page.locator('#haltPlaytesting .playtest-cycle > summary').click();
if ((await page.locator('#haltPlaytesting .playtest-gallery-card img').count()) !== 3) errors.push('Playtesting evidence images are missing');
if (await page.locator('#haltPlaytesting .playtest-gallery-card img').evaluateAll((images) => images.some((image) => !image.getAttribute('alt')?.trim()))) errors.push('Playtesting evidence image alt text is missing');
await page.locator('#haltPlaytesting .playtest-gallery-card:last-child').scrollIntoViewIfNeeded();
await page.waitForFunction(() => Array.from(document.querySelectorAll('#haltPlaytesting .playtest-gallery-card img')).every((image) => image.complete && image.naturalWidth > 0));
if (await page.locator('#haltPlaytesting .playtest-gallery-card img').evaluateAll((images) => images.some((image) => !image.complete || image.naturalWidth === 0))) errors.push('A playtesting evidence image failed to load');
if (!(await page.locator('#haltPlaytesting img[src$="playtest-caregiver-field-run-v8a.jpg"]').count())) errors.push('Caregiver field-run evidence is missing');
if (!(await page.locator('#haltPlaytesting img[src$="playtest-whisper-failure-v8a.jpg"]').count())) errors.push('Whisper failure evidence is missing');
if (!(await page.locator('#haltPlaytesting img[src$="playtest-summary-v8a.png"]').count())) errors.push('Playtesting summary evidence is missing');
if ((await page.locator('#haltPlaytesting .playtest-loop li').count()) !== 4) errors.push('Playtesting loop does not show all four stages');
if ((await page.locator('#haltPlaytesting .playtest-loop strong').allTextContents()).join(',') !== '11,11,0,0') errors.push('Playtesting loop counts are incorrect');
if ((await page.locator('#haltPlaytesting .playtest-report-list:not(.is-response) article').count()) !== 11) errors.push('Extracted bug report does not contain 11 findings');
if ((await page.locator('#haltPlaytesting .playtest-report-list.is-response article').count()) !== 11) errors.push('Build response does not pair all 11 findings');
if (!(await page.locator('#haltStudio .project-assets').isVisible()) || !(await page.locator('#haltStudio .project-pulse').isVisible())) errors.push('HALT iconology and campaign pulse did not move into its workspace');
const studioOrder = await page.locator('#haltStudio').evaluate((studio) => Array.from(studio.children).map((node) => node.id || node.className || node.tagName));
if (studioOrder[1] !== 'haltBuilds' || studioOrder[2] !== 'haltPlaytesting' || !String(studioOrder[3]).includes('project-pulse') || studioOrder[4] !== 'studioSteps' || studioOrder[5] !== 'haltContributionForm' || studioOrder[6] !== 'studio-project-context') errors.push('HALT build shelf, playtesting, and campaign pulse are not ordered correctly');
if (!(await page.locator('.studio-project-context').evaluate((context) => context.lastElementChild?.classList.contains('project-assets')))) errors.push('Project iconology is not the final workspace section');
if (!(await page.locator('#framework').isHidden())) errors.push('Long-form page sections remained visible in HALT focus mode');
await page.locator('[data-next-step="2"]').click();
if (!(await page.locator('#studioValidation').isVisible())) errors.push('HALT scope validation did not stop an incomplete draft');

await page.locator('#haltAssignmentCode').fill('social-003');
await page.locator('#haltContributionType').selectOption('social-copy');
await page.locator('[data-project-lane="organization"]').click();
await page.locator('[data-next-step="2"]').click();
await page.locator('#haltSourceUrl').fill('https://7hermeticlabs.health/');
await page.locator('#haltAudience').selectOption({ label: 'Medical and humanitarian organizations' });
await page.locator('#haltClaim').fill('HALT is an offline-capable medical coordination system in closed beta.');
await page.locator('[data-next-step="3"]').click();
if ((await page.locator('.post-example.is-positive').count()) !== 1 || (await page.locator('.post-example.is-negative').count()) !== 1) errors.push('Positive and negative post examples are not paired in the build step');
if ((await page.locator('.post-example.is-negative button').count()) !== 0) errors.push('The negative post example should not expose a copy control');
await page.locator('[data-copy-text-target="positiveExampleText"]').click();
if (!(await page.evaluate(() => window.__copiedText)).startsWith('HALT is a working closed-beta')) errors.push('Positive post example did not copy');
await page.locator('.channel-picker label').filter({ hasText: 'LinkedIn' }).click();
await page.locator('#haltDraftCopy').fill('A source-grounded HALT contribution for review.');
await page.locator('[data-next-step="4"]').click();
for (const id of ['checkSource', 'checkPrivacy', 'checkMedical', 'checkStatus']) await page.locator(`#${id}`).check();
await page.locator('[data-next-step="5"]').click();
if (!(await page.locator('#haltSubmissionPacket').textContent()).includes('SOCIAL-003')) errors.push('HALT submission packet omitted the assignment code');
if (!(await page.locator('#openHaltEmail').getAttribute('href')).startsWith('mailto:Susan@7hermeticlabs.com')) errors.push('HALT submission email handoff is not prepared');
if (await page.evaluate(() => document.documentElement.scrollWidth > document.documentElement.clientWidth)) errors.push('HALT studio has horizontal overflow at mobile width');
if (!(await page.evaluate(() => localStorage.getItem('social-health.halt-contribution.v1')))) errors.push('HALT local draft was not persisted');
await page.locator('#closeHaltStudio').click();
if (!(await page.locator('#projectPanel').isVisible()) || !(await page.locator('#haltStudio').isHidden())) errors.push('HALT studio did not return to the project summary');

const pageText = await page.locator('body').innerText();
for (const privateOrStaleText of ['805 S Glynn', 'frontdesk@', '146 curated hashtags', 'HALT qualifies', '93%', 'Warren', 'Nadeem', 'Nodeem']) {
  if (pageText.includes(privateOrStaleText)) errors.push(`Public page exposes stale or private text: ${privateOrStaleText}`);
}

const hasHorizontalOverflow = await page.evaluate(() => document.documentElement.scrollWidth > document.documentElement.clientWidth);
if (hasHorizontalOverflow) errors.push('Public page has horizontal overflow at mobile width');

const scorecardUrl = `${publicUrl}?contributor=hiteshi-baldev&expires=9999999999999&signature=test`;
await page.goto(scorecardUrl, { waitUntil: 'networkidle' });
await page.locator('#scorecardContent').waitFor({ state: 'visible' });

if ((await page.locator('#scorecardTitle').textContent()) !== 'Hiteshi Hitu Seo Baldev') errors.push('Contributor name did not render');
if ((await page.locator('#thisWeekScore').textContent()) !== '72') errors.push('This-week score did not render');
if ((await page.locator('#thisWeekGoals .goal-card').count()) !== 1) errors.push('Goal card did not render');
if ((await page.locator('#lifecycleList .lifecycle-item').count()) !== 1) errors.push('Lifecycle item did not render');
if ((await page.locator('#lifecycleList .submission-track li').count()) !== 4) errors.push('Contributor submission progress did not render');
if (!(await page.locator('#lifecycleList .assignment-feedback').textContent()).includes('Tighten the opening claim')) errors.push('Susan feedback did not render');
if (!(await page.locator('#lifecycleList .lifecycle-next-action').textContent()).includes('Review Susan’s feedback')) errors.push('Contributor next action did not render');
if (!(await page.locator('#publicConsole').isHidden())) errors.push('Public console remained visible in scorecard mode');
if (!(await page.locator('#scorecardLoading').isHidden())) errors.push('Loading panel remained visible after success');
if (!(await page.locator('#scorecardError').isHidden())) errors.push('Error panel remained visible after success');
if (!(await page.locator('#campaignFacts').textContent()).includes('Aug 10, 2026')) errors.push('Campaign dates shifted out of UTC calendar date');

await browser.close();
if (errors.length) {
  console.error(errors.join('\n'));
  process.exit(1);
}
console.log('Social Health public console and scorecard rendering passed.');
