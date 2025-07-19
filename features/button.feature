# This spec is written according to the Muse manifesto principles:
# - Human-readable (for all stakeholders)
# - Defines a user journey (for a developer/designer)
# - Covers multiple scenarios and edge cases
# - Ready to be automated with Playwright/Cucumber

Feature: Reusable Button Component
  As a developer or designer on the team,
  I want a consistent, accessible, and versatile button component,
  So that I can build user interfaces quickly without reinventing common patterns, ensuring a joyful and efficient creation process.

  Background:
    Given I am viewing the component library documentation page for the "Button"

  Scenario: Primary button for a main call to action
    When I view the "Solid" variant of the button
    Then it should have a solid background color for emphasis
    And it should have clear, high-contrast text
    And it should have a visible focus state when tabbed to
    And the documentation should show the code snippet: '<Button>Submit</Button>'

  Scenario: Outline button for secondary actions
    When I view the "Outline" variant of the button
    Then it should have a transparent background with a colored border
    And it should be less visually prominent than the solid button
    And the documentation should show the code snippet: '<Button outline>Cancel</Button>'

  Scenario: Plain button for tertiary actions
    When I view the "Plain" variant of the button
    Then it should have a transparent background and no border
    And it should have a subtle hover state
    And the documentation should show the code snippet: '<Button plain>Learn More</Button>'

  Scenario: Button used as a link
    When I view the "Link" usage example
    Then the button should be rendered as an '<a>' tag
    And it should have an 'href' attribute pointing to "/some/path"
    And clicking it should navigate to the new page
    And the documentation should show the code snippet: '<Button href="/some/path">Go to Settings</Button>'

  Scenario: Disabled button state
    When I view the "Disabled" state example
    Then the button should be visually de-emphasized with lower opacity
    And it should not be clickable or focusable
    And it should have the 'disabled' attribute
    And the documentation should show the code snippet: '<Button disabled>Processing...</Button>'

  Scenario: Button with a leading icon
    When I view the "With Leading Icon" example
    Then the button should display an icon to the left of the text
    And there should be appropriate spacing between the icon and the text
    And the documentation should show the code snippet: '<Button><Icon name="plus" /> Add Item</Button>'

  Scenario: Accessibility compliance
    When I run an automated accessibility check on all button variants
    Then all buttons must have a contrast ratio of at least 4.5:1 for text
    And all buttons must have a clearly visible focus indicator
    And screen readers should announce the button's text and role correctly