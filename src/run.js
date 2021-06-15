const puppeteer = require('puppeteer');
const fs = require('fs');
const xlsx = require('node-xlsx');

(async () => {
	var list = xlsx.parse('urlScreenData.xlsx');
	console.info('list', list); // xlsx文件内容
    console.info('data:', JSON.stringify(list[0].data)); 
	var browser = await puppeteer.launch({
		timeout: 15000,
		ignoreHTTPSErrors: true,
		devtools: false,
		headless: false
	});
	const page = await browser.newPage();
	var array = list[0].data;
	for (let index = 1; index < array.length; index++) {
		const element = array[index];
		await page.goto(element[0]); 
		if (element[3] !== 'undefined' && element[3] !== 'undefined' && element[3] !== undefined && element[3] !== '') {
			await page.type(element[5], element[3]);
			await page.type(element[6], element[4]);
			await page.click(element[7]);
		}
		await page.waitFor(3000);
		var dateTime = new Date();
		const T = `${dateTime.getFullYear()}-${dateTime.getMonth()}-${dateTime.getDay()}-${dateTime.getHours()}-${dateTime.getMinutes()}-${dateTime.getSeconds()}`;
		await page.screenshot({
			fullPage: true, 
			path: `${element[2]}${element[1]}-${T}.jpg`
		});
		await page.waitFor(1000);
	}
	await browser.close();
})();
