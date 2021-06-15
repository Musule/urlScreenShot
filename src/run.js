const puppeteer = require('puppeteer');
const fs = require('fs');
const xlsx = require('node-xlsx');

(async () => {
	// 解析xlsx文件
	var list = xlsx.parse('urlScreenData.xlsx');
	console.info('list', list); // xlsx文件内容
    console.info('data:', JSON.stringify(list[0].data)); 
    // puppeteer启动参数配置
	var browser = await puppeteer.launch({
		//设置超时时间
		timeout: 15000,
		//如果是访问https页面 此属性会忽略https错误
		ignoreHTTPSErrors: true,
		// 打开开发者工具, 当此值为true时, headless总为false
		devtools: false,
		// 关闭headless模式, 不会打开浏览器
		headless: false
	});
	const page = await browser.newPage(); //实例化浏览器页面
	var array = list[0].data;
	// 逐行执行
	for (let index = 1; index < array.length; index++) {
		const element = array[index];
		await page.goto(element[0]); // 访问
		// 判断是否需要登录
		if (element[3] !== 'undefined' && element[3] !== 'undefined' && element[3] !== undefined && element[3] !== '') {
			// 输入账号（对应urlScreenData.xlsx中F列）
			await page.type(element[5], element[3]);
			// 输入密码（对应urlScreenData.xlsx中G列）
			await page.type(element[6], element[4]);
			// 点击登录（对应urlScreenData.xlsx中H列）
			await page.click(element[7]);
		}
		await page.waitFor(3000);
		// 获取当前时间
		var dateTime = new Date();
		const T = `${dateTime.getFullYear()}-${dateTime.getMonth()}-${dateTime.getDay()}-${dateTime.getHours()}-${dateTime.getMinutes()}-${dateTime.getSeconds()}`;
		// 截屏
		await page.screenshot({
			fullPage: true, // 全屏
			path: `${element[2]}${element[1]}-${T}.jpg`
		});
		await page.waitFor(1000);
	}
	await browser.close();
})();
