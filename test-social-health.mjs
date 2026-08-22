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
  lifecycle: [{ assignmentCode: 'SOCIAL-003', title: 'Contributor onboarding confirmation', lifecycleStatus: 'draft' }],
  updatedAt: '2026-08-12T07:44:26.452Z'
};

await page.route('https://graph.7hermeticlabs.com/**', async (route) => {
  const body = route.request().url().includes('/public/contributor-scorecard/') ? scorecardFixture : boardFixture;
  await route.fulfill({ status: 200, contentType: 'application/json', body: JSON.stringify(body) });
});

const publicUrl = `file://${path.join(root, 'social-health', 'index.html')}`;
await page.goto(publicUrl, { waitUntil: 'networkidle' });
await page.locator('.campaign-card-public').waitFor({ state: 'visible' });

if ((await page.title()) !== 'Social Health — Hermetic Labs') errors.push('Public page title is incorrect');
if (!(await page.locator('#publicConsole').isVisible())) errors.push('Public console is not visible');
if (!(await page.locator('#contributorWorkspace').isHidden())) errors.push('Contributor workspace appeared without a signed link');
if ((await page.locator('.project-tab').count()) !== 4) errors.push('Expected four project lanes');
if ((await page.locator('.campaign-card-public').count()) !== 1) errors.push('Public campaign did not render');
if ((await page.locator('.asset-card').count()) !== 6) errors.push('Expected six asset register entries');
if ((await page.locator('.asset-status.is-gap').count()) !== 0) errors.push('A sourced project identity is still marked as a gap');
if ((await page.locator('[data-copy-icon]').count()) !== 6) errors.push('Expected a PNG copy control for every asset register entry');
if (!(await page.locator('img[src$="vrf-mark.png"]').count())) errors.push('VRF mark is not wired into the asset register');
if (!(await page.locator('img[src$="fefe-connect-mark.png"]').count())) errors.push('FEFE Connect mark is not wired into the asset register');
if (!(await page.locator('.brand-logo').getAttribute('src')).includes('7hl-social-rgb-192.png')) errors.push('RGB site logo is not wired into the header');

await page.locator('#tab-fefe').click();
if ((await page.locator('#projectName').textContent()) !== 'FEFE Connect') errors.push('Project tab did not update the panel');

await page.locator('#tab-halt').click();
if (!(await page.locator('#haltStudio').isVisible())) errors.push('HALT tab did not open the focused contribution studio');
if (!(await page.locator('#materials').isHidden())) errors.push('Long-form page sections remained visible in HALT focus mode');
await page.locator('[data-next-step="2"]').click();
if (!(await page.locator('#studioValidation').isVisible())) errors.push('HALT scope validation did not stop an incomplete draft');

await page.locator('#haltAssignmentCode').fill('social-003');
await page.locator('#haltContributionType').selectOption('social-copy');
await page.locator('[data-halt-lane="organization"]').click();
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
if (!(await page.locator('#materials').isVisible())) errors.push('HALT studio did not return to the project overview');

const pageText = await page.locator('body').innerText();
for (const privateOrStaleText of ['805 S Glynn', 'frontdesk@', '146 curated hashtags', 'HALT qualifies', '93%']) {
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
