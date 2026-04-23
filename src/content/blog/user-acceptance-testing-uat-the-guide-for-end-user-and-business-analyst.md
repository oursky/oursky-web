---
title: "User Acceptance Testing (UAT): The Guide for End-user and Business Analyst"
description: "User Acceptance Testing (UAT) is a gatekeeping process in the software development lifecycle, to ensure a new product or version update is ready for public release."
pubDate: 2025-01-28
author: "Joyz Ng"
category: "qa"
image: "https://cdn.prod.website-files.com/654ba60def05336c1f0eb138/66e3017c827228b7ba355125_uat_balance_2640x1200-1160x527.jpg"
draft: false
webflowId: "66e301e7daff84e0e3a0a7ae"
---

User Acceptance Testing (UAT) is a gatekeeping process in the software development lifecycle, to ensure a new product or version update is ready for public release. The application needs to be fully tested and accepted by the real End-Users and/or the Business Analysts (BA), to make sure the business requirements are met and the features are worked as intended from the users’ point of view.

Depending on the scale, complexity and nature of products, there are many different approaches to perform the UAT. For general user-facing applications, a common method is to run through a combination of **Functional Testing** and **Exploratory Testing**, to evaluate whether the functionality, UI/UX, performance, stability and overall quality match with the business needs.

![](https://cdn.prod.website-files.com/654ba60def05336c1f0eb138/66e301c37113cc800421bb47_uat_balance_2640x1200-1160x527.jpeg)

## Functional Testing

Functional Testing validates whether the application works as expected. Through comparing the product behaviours against the functional requirements in specification, the test result acts as a green light for release if all acceptance criteria are passed.

To get started with Functional Testing, testers design and write **Test Cases**based on the business requirements and use cases. They then execute the test cases step-by-step to ensure that all procedures result in the expected behaviors.

A **Test Suite** is a group of test cases that includes **happy paths (positive cases)**, where the user uses the product as expected, e.g. _filling in all fields correctly and submitting a form_, and **unhappy paths (negative cases)**, where the user performs unexpected actions, e.g. _filling in a form with invalid input and trying to submit it_. A good functional test suite should include both types of cases to ensure that the product can handle both success and failure cases properly.

### Functional Test Cases Example

Imagine that you are working on an e-commerce mobile app. Recently, the app has added a credit card payment option via [Stripe](https://stripe.com/). To design the test cases for this feature, you could check the product specification with support from the [documentation of Stripe](https://stripe.com/docs/testing), and add various cases to your functional test suite, for example, payment with credit cards issued in different countries, card brands, invalid cards, 3D secured cards, etc.

Here is a simple format of Functional Test Cases:

![](https://cdn.prod.website-files.com/654ba60def05336c1f0eb138/66e301c3b50949f894808d27_Screenshot-2023-03-01-at-3.25.43-PM-1160x421.png)

## Exploratory Testing

Exploratory Testing is a context-driven methodology of testing, which relies on the subject knowledge of testers to simulate how the product will be used in real-life situations. As a supplement to functional testing, testers explore the application creatively instead of following any scripted test cases or specifications, to discover defects, usability problems, or even business concerns from the perspective of an end-user.

### Session-based Exploratory Testing

To execute Exploratory Testing, there are **Session-based** and **Scenario-based**methodologies to control the scope and resources of test. The idea of Session-based Exploratory Testing is to set a timebox, like a 60–90 minutes session, and assign a group of testers to explore the app within this time, given a **Test Charter** that describes the test focus and objectives of this session.

#### Exploratory Test Charter Template

Below is a template of an Exploratory Test Charter, proposed by Elisabeth Hendrickson in the book _Explore It!, Chapter 2, page 67 of 502 (ebook) — “A simple charter template”_.

_Explore (target) With (resources) To discover (information)_

*   **Target**: What are you exploring? It could be a feature, a requirement, or a module.
*   **Resources**: What resources will you bring with you? Resources can be anything: a tool, a data set, a technique, a configuration, or perhaps an interdependent feature.
*   **Information**: What kind of information are you hoping to find? Are you characterizing the security, performance, reliability, capability, usability or some other aspect of the system? Are you looking for consistency of design or violations of a standard?

### Scenario-based Exploratory Testing

Scenario-based Exploratory Testing is another direction to explore the app based on the story about how the product is used, including information about the motivations of the users involved.

Let’s use a social app with a login function as an example. The **User Story** is simple:

_As a user, I want to securely log in to the system, so that I can access the Home page content that is exclusive to me._

Based on the story, testers can brainstorm different scenarios that may occur in real-life situations and execute the flows to discover misbehaviors, defects in edge cases, UIUX problems, or even business concerns.

For example,

*   What if the user double clicks on the login button?
*   What if the internet is disconnected while loading?
*   What if the user cannot receive the one-time password (OTP)?
*   What if the user has already logged in on another device?

The expected behaviours of these scenarios may not be fully stated in the functional requirements, but should also be addressed if they go against a good user experience.

![](https://cdn.prod.website-files.com/654ba60def05336c1f0eb138/66e301c331363a07fbcf9c57_session-1160x773.jpeg)

BE CREATIVE, AND TIMEBOX YOUR EXPLORATORY TEST SESSION.

## Test Preparation

Before running the UAT, testers should have a basic understanding of the test run workflow and information, product scope and features, and any necessary resources to ensure a smooth and efficient test execution. Typically, the test manager will create a test document that includes all required references to support the test run, such as:

*   Testing environment
*   Testing build version and Installation guide
*   Supporting browsers, devices and platforms
*   Type of test and related documents
*   Feature scope
*   Specifications
*   Design reference
*   Test accounts and Test data
*   Issue reporting instructions
*   Known issues

Test documentation serves as a knowledge base for testers and helps new testers onboard when the test run is distributed. Without sufficient preparation, testers may easily get blocked during testing or need to spend a lot of time gathering information from different parties to resolve obstacles. This could cause delays in the process and, in the worst case, it could also affect the release schedule.

## After the UAT

After completing all the test runs for UAT, a list of defects and feedback will be collected. The product owner and project team will need to understand and discuss the issues in order to prioritize and arrange for further enhancements.

Once the bugs have been fixed and passed regression testing, Congratulations🎉 — the project team can finally proceed to prepare for public release! The testing period to perform a full UAT can sometimes be long, maybe up to 1–2 months, but the high quality of the final product and the satisfaction of end-users will definitely make it worthwhile.

‍
