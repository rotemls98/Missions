'use strict';
const puppeteer = require('puppeteer');

let page;
let browser;

describe('Google', () => {
    beforeAll(async () => {
        browser = await puppeteer.launch({headless : false, slowMo : 50});
        page = await browser.newPage();
        await page.goto('http://localhost:3000', {waitUntil : 'load'});
    });

    it('should add mission', async () => {
        const addButton = await page.waitForSelector("[data-test-id='add-button']");
        await addButton.click();
        const title = 'rotman';
        const desc = 'is the king';
        await page.type("#title", title);
        await page.type("#description", desc);
        await page.click('#submit');

        // check that its added
        await page.waitForXPath(`//*[text()='${title}']`);
        const description = await page.waitForSelector('#mission-description');
        const text = await page.evaluate(e => e.textContent, description);
        expect(text).toBe(desc);
    }, 60000);

    // it('should drop mission', async () => {
    //     await page.waitFor(1000);
    //     const mission = await page.$('.mission:nth-child(3)');
    //     const missionBox = await mission.boundingBox();
    //     const list = await page.$('.mission-list');
    //     const box = await list.boundingBox();
    //
    //     // await page.mouse.move(missionBox.x + missionBox.width/2, missionBox.y + missionBox.height/2);
    //     await mission.hover();
    //     await page.mouse.down();
    //     // await page.evaluate(() => {debugger;});
    //
    //     await page.mouse.move(box.x + box.width/2, box.y + box.height/2);
    //     // await list.hover();
    //     await page.mouse.up();
    // }, 60000);

    afterAll(async () => {
        await browser.close();
    })
});