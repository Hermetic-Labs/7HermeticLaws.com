import { chromium } from 'playwright';
import path from 'path';
import { fileURLToPath } from 'url';

const root = path.dirname(fileURLToPath(import.meta.url));
const browser = await chromium.launch({ executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe' });
const page = await browser.newPage();
const errors = [];
page.on('pageerror', (error) => errors.push(error.message));
page.on('console', (message) => { if (message.type() === 'error') errors.push(message.text()); });

await page.route('https://hermetic-graph-mcp-lfrj8.azurewebsites.net/**', async (route) => {
  await route.fulfill({
    status: 200,
    contentType: 'application/json',
    body: JSON.stringify({
      generatedAt: '2026-08-12T07:44:32.957Z',
      contributor: { id: 'hiteshi-baldev', name: 'Hiteshi Hitu Seo Baldev', timezone: 'Asia/Kolkata' },
      campaign: { title: 'HALT awareness', summary: 'Build a consistent social rhythm.', platforms: ['LinkedIn'], status: 'active', startAt: '2026-08-10T00:00:00.000Z', endAt: '2026-08-16T00:00:00.000Z' },
      thisWeek: { weekOf: '2026-08-10', summary: 'Publish and engage.', score: 72, goals: [{ id: 'g1', title: 'Publish three posts', current: 2, target: 3, unit: 'posts', status: 'in_progress' }] },
      lastWeek: { weekOf: '2026-08-03', summary: 'Foundation week.', score: 84, rank: 1, cohortSize: 3, goals: [], wins: ['Completed profile'], improvements: ['Increase engagement'] },
      managerNote: 'Strong foundation. Keep the cadence steady.',
      lifecycle: [{ assignmentCode: 'SOCIAL-003', title: 'Contributor onboarding confirmation', lifecycleStatus: 'draft' }],
      updatedAt: '2026-08-12T07:44:26.452Z'
    })
  });
});

const pageUrl = `file://${path.join(root, 'social-health', 'index.html')}?contributor=hiteshi-baldev&expires=9999999999999&signature=test`;
await page.goto(pageUrl, { waitUntil: 'networkidle' });
await page.locator('#scorecardContent').waitFor({ state: 'visible' });

if ((await page.locator('#scorecardTitle').textContent()) !== 'Hiteshi Hitu Seo Baldev') errors.push('Contributor name did not render');
if ((await page.locator('#thisWeekScore').textContent()) !== '72') errors.push('This-week score did not render');
if ((await page.locator('#thisWeekGoals .goal-card').count()) !== 1) errors.push('Goal card did not render');
if ((await page.locator('#lifecycleList .lifecycle-item').count()) !== 1) errors.push('Lifecycle item did not render');
if (!(await page.locator('#scorecardLoading').isHidden())) errors.push('Loading panel remained visible after success');
if (!(await page.locator('#scorecardError').isHidden())) errors.push('Error panel remained visible after success');
if (!(await page.locator('#campaignFacts').textContent()).includes('Aug 10, 2026')) errors.push('Campaign dates shifted out of UTC calendar date');

await browser.close();
if (errors.length) {
  console.error(errors.join('\n'));
  process.exit(1);
}
console.log('Social-health scorecard rendering passed.');
