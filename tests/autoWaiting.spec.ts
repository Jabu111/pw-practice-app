import {test, expect} from '@playwright/test'
import { assert } from 'console'
import { first } from 'rxjs-compat/operator/first'

test.beforeEach(async({page}) => {
    await page.goto('http://uitestingplayground.com/ajax')
    await page.getByText('Button Triggering AJAX Request').click()
})

test('auto waiting', async({page}) => {
    const successButton = page.locator('.bg-success')

    // await successButton.click()

    // const text = successButton.textContent()
    // await successButton.waitFor({state: "attached"})
    // const text = await successButton.allTextContents()

    // expect(text).toContain('Data loaded with AJAX get request.')

    await expect(successButton).toHaveText('Data loaded with AJAX get request.', {timeout: 20000})
})

test('alternative wait', async({page}) => {
    const successButton = page.locator('.bg-success')

    //____ wait for element
    // await page.waitForSelector('.bg-success')

    //____ wait for particular response
    await page.waitForResponse('http://uitestingplayground.com/ajaxdata')

    //___ wait for network calls to be completed ('NOT RECOMMENDED')
    await page.waitForLoadState('networkidle')

    const text = await successButton.allTextContents()
    expect(text).toContain('Data loaded with AJAX get request.')
})

test('timeouts', async({page}) => {
    //test.setTimeout(10000)
    test.slow() // increase timout x3
    const successButton = page.locator('.bg-success')
    //await successButton.click({timeout: 16000})
    await successButton.click()
})