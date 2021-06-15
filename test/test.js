const puppeteer = require('puppeteer');
const fs = require('fs');
const xlsx = require('node-xlsx');
describe('', async () => {
	it.skip('node-xlsx', async () => {
		// 解析xlsx文件
		var list = xlsx.parse('urlScreenData.xlsx');
		console.log('list', list); // xlsx文件内容
		console.log('data:', JSON.stringify(list[0].data)); //
	});

	it.skip('screen pdf', async () => {
		puppeteer
			.launch({
				timeout: 10000,
				ignoreHTTPSErrors: true,
				devtools: false,
				headless: true,
				ignoreDefaultArgs: [ '--enable-automation' ]
			})
			.then(async (browser) => {
				const page = await browser.newPage();
				const dimensions = await page.evaluate(() => {
					return {
						width: document.body.scrollWidth,
						height: document.body.scrollHeight,
						deviceScaleFactor: window.devicePixelRatio
					};
				});
				await page.setViewport(dimensions);
				await page.goto('https://www.qq.com');
				await page.waitFor(6000);
				await page.pdf({ path: 'example.pdf', format: 'A4' });
				await browser.close();
			});
	});
	it.skip('screen image', async () => {
		await puppeteer
			.launch({
				timeout: 10000,
				ignoreHTTPSErrors: true,
				devtools: false,
				headless: true,
				ignoreDefaultArgs: [ '--enable-automation' ]
			})
			.then(async (browser) => {
				const page = await browser.newPage();
				await page.goto('https://www.qq.com');
				await page.waitFor(3000);
				await page.screenshot({
					fullPage: true, // 全屏
					path: 'example.png'
				});
				await browser.close();
			});
	});
	it.skip('node-xlsx to pdf', async () => {
		// 解析xlsx文件
		var list = xlsx.parse('urlScreenData.xlsx');
		console.info('list', list);
		console.info('data:', JSON.stringify(list[0].data)); //
		//
		puppeteer
			.launch({
				timeout: 10000,
				ignoreHTTPSErrors: true,
				devtools: false,
				headless: true,
				ignoreDefaultArgs: [ '--enable-automation' ]
			})
			.then(async (browser) => {
				var array = list[0].data;
				// 逐行执行
				for (let index = 1; index < array.length; index++) {
					const element = array[index];
					const page = await browser.newPage();
					await page.goto(element[0]);
					await page.waitFor(3000);
					await page.pdf({ path: `./Screen/PDF/${element[1]}.pdf`, format: 'A4', fullPage: true });
				}
				await browser.close();
			});
	});

	it.skip('node-xlsx to jpg', async () => {
		// 解析xlsx文件
		var list = xlsx.parse('urlScreenData.xlsx');
		console.info('list', list); // xlsx文件内容
		console.info('data:', JSON.stringify(list[0].data)); //
		//
		puppeteer
			.launch({
				timeout: 10000,
				ignoreHTTPSErrors: true,
				devtools: false,
				headless: true,
				ignoreDefaultArgs: [ '--enable-automation' ]
			})
			.then(async (browser) => {
				var array = list[0].data;
				for (let index = 1; index < array.length; index++) {
					const element = array[index];
					const page = await browser.newPage();
					await page.goto(element[0]);
					await page.waitFor(3000);
					await page.screenshot({
						fullPage: true,
						path: `./Screen/PIC/${element[1]}.jpg`
					});
				}
				await browser.close();
			});
	});

	it.skip('node-xlsx login to jpg', async () => {
		var list = xlsx.parse('urlScreenData.xlsx');
		console.info('list', list);
		console.info('data:', JSON.stringify(list[0].data)); //
		//
		puppeteer
			.launch({
				timeout: 10000,
				ignoreHTTPSErrors: true,
				devtools: false,
				headless: true,
				ignoreDefaultArgs: [ '--enable-automation' ]
			})
			.then(async (browser) => {
				var array = list[0].data;
				for (let index = 1; index < array.length; index++) {
					const element = array[index];
					const page = await browser.newPage();
					await page.goto(element[0]);
					await page.waitFor(3000);
					// 判断是否需要登录
					if (
						element[3] !== 'undefined' &&
						element[3] !== 'undefined' &&
						element[3] !== undefined &&
						element[3] !== ''
					) {
						console.log(typeof element[3]);
						console.log(`${element[3]},${element[5]},${element[6]},${element[7]}`);
						await page.type(element[5], element[3]);
						await page.type(element[6], element[4]);
						await page.click(element[7]);
					}
					await page.waitFor(1000);
					var dateTime = new Date();
					const T = `${dateTime.getFullYear()}-${dateTime.getMonth()}-${dateTime.getDay()}-${dateTime.getHours()}-${dateTime.getMinutes()}-${dateTime.getSeconds()}`;
					await page.screenshot({
						fullPage: true,
						path: `${element[2]}${element[1]}-${T}.jpg`
					});
					await page.waitFor(1000);
				}
				await browser.close();
			});
	});

	it('node-xlsx login to jpg', async () => {
		var list = xlsx.parse('urlScreenData.xlsx');
		console.info('list', list);
		console.info('data:', JSON.stringify(list[0].data)); //
		//
		puppeteer
			.launch({
				timeout: 10000,
				ignoreHTTPSErrors: true,
				devtools: false,
				headless: true,
				ignoreDefaultArgs: [ '--enable-automation' ]
			})
			.then(async (browser) => {
				var array = list[0].data;
				for (let index = 1; index < array.length; index++) {
					const element = array[index];
					const page = await browser.newPage();
					await page.goto(element[0]);
					await page.waitFor(3000);
					if (
						element[3] !== 'undefined' &&
						element[3] !== 'undefined' &&
						element[3] !== undefined &&
						element[3] !== ''
					) {
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
			});
	});
});
