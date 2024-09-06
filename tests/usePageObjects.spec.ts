import {test, expect} from '@playwright/test'
import {NavigationPage} from '../page-objects/navigationPage'
import { DatepickerPage } from '../page-objects/datepickerPage'

test.beforeEach(async({page}) => {
    await page.goto('http://localhost:4200/')
})

test('navigate to form page', async({page}) => {
    const navigateTo = new NavigationPage(page)
    await navigateTo.formLayoutsPage()
    await navigateTo.datepickerPage()
    await navigateTo.smartTablePage()
    await navigateTo.toastrPage()
    await navigateTo.tooltipPage()
})

test('parametrized methods', async({page}) => {
    const navigateTo = new NavigationPage(page)
    const onDatepickerPage = new DatepickerPage(page)

    await navigateTo.datepickerPage()
    await onDatepickerPage.selectCommonDatePickerDateFromToday(5)
    await onDatepickerPage.selectDatepickerWithRangeFromToday(6,15)
})

