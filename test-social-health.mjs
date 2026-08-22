import { chromium } from 'playwright';
import path from 'path';
import { fileURLToPath } from 'url';

const root = path.dirname(fileURLToPath(import.meta.url));
const browser = await chromium.launch({ executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe' });
const page = await browser.newPage({ viewport: { width: 390, height: 844 } });
const errors = [];
page.on('pageerror', (error) => errors.push(error.message));
page.on('console', (message) => { if (message.type() === 'error') errors.push(message.text()); });

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
if ((await page.locator('.asset-status.is-gap').count()) !== 2) errors.push('Expected two explicitly marked identity gaps');
if (!(await page.locator('.brand-logo').getAttribute('src')).includes('7hl-social-rgb-192.png')) errors.push('RGB site logo is not wired into the header');

await page.locator('#tab-fefe').click();
if ((await page.locator('#projectName').textContent()) !== 'FEFE Connect') errors.push('Project tab did not update the panel');

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
