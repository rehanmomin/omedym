import { expect } from '@playwright/test';

export class profileSettings{

    constructor(page){
        this.page = page
        this.email_tb = page.getByPlaceholder('Email')
        this.password_tb = page.getByPlaceholder('Password')
        this.submit_btn = page.getByRole('button', { name: ' Submit' })

        this.settings_lnk = page.getByTitle('Settings')

        this.mySettings_btn = page.getByRole('button', { name: 'My Settings' })
        this.omedymProfile_lnk =  page.getByRole('link', { name: 'Omedym Profile' })
        this.edituser_btn = page.locator('#EditUser')

        this.deleteImage_btn = page.getByRole('button', { name: 'delete' })
        this.uploadImage_btn = page.locator('span > input[type=file]')
        this.cropImage_btn = page.getByRole('button', { name: 'Crop Image' })
        this.avatar_img = page.locator('a.ant-upload-list-item-thumbnail')

        this.title_txt = page.getByPlaceholder('Enter Title')
        this.linkedInProfile_txt = page.getByPlaceholder('Enter LinkedIn Profile URL')

        this.saveProfile_btn = page.getByRole('button', { name: 'Save' })

        this.signout_lnk = page.getByRole('button', { name: 'Sign Out' })
    }

    async gotoOmedymSite(){
        await this.page.goto('https://omedym-assess-qa.omedym.com/login');
    }

    async login(email , password){
        await expect(this.email_tb).toBeVisible()
        await this.email_tb.click()
        await this.email_tb.fill(email)
        await this.email_tb.press('Enter');
        await this.password_tb.click()
        await this.password_tb.fill(password)
        await this.submit_btn.click()
        await expect(this.signout_lnk).toBeVisible()
        
    }

    async goToMySettings(){
        await this.settings_lnk.click()
        await this.mySettings_btn.click()
    }

    async gotToMyOmedymProfile(){
        await this.omedymProfile_lnk.click()
    }

    async editUser(){
        await this.edituser_btn.click()
    }

    async uploadImage(path){
        if(this.deleteImage_btn.count() > 0){
            this.deleteImage_btn.click()
        }
        this.uploadImage_btn.setInputFiles(path);
        this.cropImage_btn.click()
    }

    async addTitle(title){
        await this.title_txt.click();
        await this.title_txt.fill(title);
    }

    async addLinkedInProfileUrl(url){
        await this.linkedInProfile_txt.click();
        await this.linkedInProfile_txt.fill(url);
  
    }

    async saveProfile(){
        await this.saveProfile_btn.click();
    }
}