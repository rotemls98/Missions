import puppeteer from 'puppeteer';

let page;
let browser;

describe('Mission App', () => {


    beforeAll(async () => {
        browser = await puppeteer.launch({headless : false, slowMo : 50, devtools: true});
        page = await browser.newPage();

        // await page.goto('http://localhost:3000', {waitUntil : 'load'});
    });

    it.only('lets debug', async () => {

        await page.goto("https://jedwatson.github.io/react-select/");
        const input = await page.waitForSelector('[aria-activedescendant=\'react-select-4--value\']');
        // await page.evaluate((input) => {
        //     input.onblur = (e) => e.target.value = '';
        // }, input);
        await input.type('bed');
        const a = 1+2;
    }, 60000);

    it('should add mission', async () => {
        const addButton = await page.waitForSelector("[data-test-id='add-button']");
        await addButton.click();
        const title = 'rotman';
        const desc = 'is the king';
        await page.type("[name='title']", title);
        await page.type("[name='description']", desc);
        // await page.evaluate(() => {debugger;});
        await page.click('#submit');
    
        // check that its added
        await page.waitForXPath(`//*[text()='${title}']`);
        const description = await page.waitForSelector('#mission-description');
        const text = await page.evaluate(e => e.textContent, description);
        expect(text).toBe(desc);
    }, 60000);


    it('should drop mission', async () => {
        await page.waitFor(1000);
        const mission = await page.$('.mission:nth-child(3)');
        // const missionBox = await mission.boundingBox();
        const list = await page.$('.mission-list');
        // const box = await list.boundingBox();

        await mission.hover();
        await page.mouse.down();
        await list.hover();
        await list.click();
        await page.mouse.up();

        // // await page.mouse.move(missionBox.x + missionBox.width/2, missionBox.y + missionBox.height/2);
        // await mission.hover();
        // await page.mouse.down();
        // // await page.evaluate(() => {debugger;});
        //
        // await page.mouse.move(box.x + box.width/2, box.y + box.height/2);
        // // await list.hover();
        // await page.mouse.up();
        await page.waitFor(3000);
    }, 60000);

    afterAll(async () => {
        await browser.close();
    })
});
