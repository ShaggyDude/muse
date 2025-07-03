# features/onboarding.feature

Feature: New User Onboarding
  As a new user
  I want to sign up for an account and set up my profile
  So that I can start using the application

  Background:
    Given I am a new visitor to the application

  Scenario: Successful sign-up and initial profile setup
    When I navigate to the "/signup" page
    And I enter "test.user@example.com" into the "email" field
    And I enter a secure password into the "password" field
    And I click the "Sign Up" button
    Then I should be redirected to the "/onboarding/welcome" page
    And I should see a welcome message "Welcome to the Tree of Life!"

    When I enter "Test User" into the "full name" field
    And I click the "Complete Profile" button
    Then I should be redirected to my "/dashboard"
    And I should see a confirmation message "Your profile is all set up!"
    And my user name "Test User" should be visible on the page