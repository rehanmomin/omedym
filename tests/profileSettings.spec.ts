require('dotenv').config();
import { test, expect } from '@playwright/test';
import { profileSettings } from '../pages/profileSettings'
import data from '../test_data/testdata.json'

test.describe('Omedym Profile Settings Test', () => {
  test('Verify successful login', async ({ page }) => {

    const ps = new profileSettings(page);
    await ps.gotoOmedymSite()
    await ps.login(process.env.USERNAME , process.env.PASSWORD)
    
  });

  test('Verify Profile settings update Test', async ({ page }) => {

    const ps = new profileSettings(page);
    await ps.gotoOmedymSite()
    await ps.login(process.env.USERNAME , process.env.PASSWORD)
    await ps.goToMySettings()
    await ps.gotToMyOmedymProfile()
    await ps.editUser()
  
    const imagePath = 'test_data/Selfie2.jpg';
    await ps.uploadImage(imagePath)
  
    await ps.addLinkedInProfileUrl(data.linkedinProfile)
    await ps.addTitle(data.title)
    await ps.saveProfile()
    await ps.goToMySettings()
    await ps.gotToMyOmedymProfile()
    await ps.editUser()
    
    //Verify if Title is updated as entered by user
    await expect(ps.title_txt).toHaveValue(data.title);
    //Verify if Linkedin Url is as entered by user
    await expect(ps.linkedInProfile_txt).toHaveValue(data.linkedinProfile);
    //Verify im thumbnail is shown for the profile image uploaded by user
    await expect(ps.avatar_img).toHaveClass('ant-upload-list-item-thumbnail');
  
  });
});

