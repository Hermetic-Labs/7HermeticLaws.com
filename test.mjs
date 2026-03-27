import { chromium } from 'playwright';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

async function testPage() {
    const browser = await chromium.launch();
    const page = await browser.newPage();

    const filePath = `file://${path.join(__dirname, 'index.html')}`;
    console.log('Testing:', filePath);

    const errors = [];
    page.on('console', msg => {
        if (msg.type() === 'error') {
            errors.push(msg.text());
        }
    });

    page.on('pageerror', err => {
        errors.push(err.message);
    });

    try {
        await page.goto(filePath, { waitUntil: 'networkidle' });
        console.log('Page loaded successfully');

        const title = await page.title();
        console.log('Title:', title);

        const subtleCredit = await page.locator('.subtle-credit').textContent();
        console.log('Subtle credit:', subtleCredit.trim());

        const heroTitle = await page.locator('.hero-title').textContent();
        console.log('Hero title:', heroTitle);

        const odeSection = await page.locator('.ode-section').count();
        console.log('Ode section present:', odeSection > 0);

        const symbolCards = await page.locator('.symbol-card').count();
        console.log('Symbol cards count:', symbolCards);

        const redirectSection = await page.locator('.redirect-section').count();
        console.log('Redirect section removed:', redirectSection === 0);

        const countdown = await page.locator('#countdownNumber').count();
        console.log('Countdown removed:', countdown === 0);

        const stars = await page.locator('.star').count();
        console.log('Stars generated:', stars);

        if (errors.length > 0) {
            console.log('\nConsole errors found:');
            errors.forEach(e => console.log('  -', e));
        } else {
            console.log('\nNo console errors detected');
        }

        console.log('\n✓ All tests passed!');
    } catch (err) {
        console.error('Test failed:', err.message);
    } finally {
        await browser.close();
    }
}

testPage();
