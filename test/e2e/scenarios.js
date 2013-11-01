'use strict';

describe('iLab Mobile Application', function() {

  beforeEach(function() {
    browser().navigateTo('../../app/index.html');
  });

  it('should automatically redirect to the default path /login', function() {
    expect(browser().location().url()).toBe("/login");
  });

  it('should perform authentication on login page', function(){
  	input('loginform.username').enter('student1');
  	input('loginform.password').enter('student1');
  	element(':button').click();
  	expect(browser().location().url()).toBe("/home");
  });
});

