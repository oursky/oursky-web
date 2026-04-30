---
title: "Journey Through Agile Test Automation"
description: "Journey Through Agile Test Automation"
pubDate: 2025-01-28
author: "Joyz Ng"
categories:
  - "qa"
displayCategory: "Software Testing"
image: "/images/blogs/05c0bac77b_679928a9b7be1beda2dc35e6_Agile-Pyramid-comic.png"
draft: false
webflowId: "679928e18a612cc0207e988f"
---

![](/images/blogs/05c0bac77b_679928a9b7be1beda2dc35e6_Agile-Pyramid-comic.png)

For QA in an agile development team, SPEED is everything. It is a game on a high-speed roundabout, developers introduce new features and fixes every day, and you better test everything before the next iteration. Besides the new features or fixes, you still need to handle a full UI regression smoke test, how is that possible? Hire more staff? Test automation is a way out for smart teams, and that’s what we do at [Oursky](https://oursky.com/).  

## Preparation

The basic aim of Test Automation is to replace repetitive human work with computers.

So, to get started, all you need to do is no more than **wrapping up your existing test plans**, and to decide which parts are to be automated. If you already have a comprehensive test plan, with step-by-step test cases and well-defined expected results, congratulations! You are perfectly ready for automation.

Or else, some preparation are needed.

### What is a Test Plan?

Your automation-friendly test plans should include the followings:

*   Testing environment
    *   Testing platform, OS version, browser version, etc.
*   Test Suites – wrapping test cases into groups
*   Step-by-step test cases, as detailed as possible, e.g:
    *   _Click_ **Login button**
    *   _Enter username:_ **abc**
    *   _Enter password:_ **123456**
    *   _Click_ **Done button**

*   Expected results, the checkpoints for each test case, e.g.
    *   The word “Success” shown on screen
    *   See profile picture appeared at the top-left corner

![First step of Test Automation - drafting your test plan](/images/blogs/df62d9b9ed_679928a9a4764d3e18b16601_1-1024x708.webp)

First step of Test Automation – drafting your test plan

Later you will take this test plan as a reference for your automation script. No need to worry about the format for now, just make it clear enough so that you could avoid test run failing due to missing steps.

If you have no idea how to write a good test plan, you may try drafting on a spreadsheet first, or write with helpers online like [LeanTesting](https://leantesting.com/) and [Testpad](https://ontestpad.com/).

## Choosing The Suitable Tool

Now you are ready to setup your tool. There are tons of automation tools all over the Internet, designed for testing on different platforms. For example, Selenium, Appium, Calabash, Cucumber, Ranorex, Robotium, Espresso, Frank, UI Automator, Phantom JS, QTP, Sahi, Watir…Much more than you think!

Among the sea of testing tools, you are suggested to spend some time comparing them first, as they vary in limitation and setup difficulty.

To help you choose a suitable tool — for starters, try to answer these questions, and then see if the tool support meets your requirements:

*   Which scripting language would you like to use?
*   Does the tool support your application platform (Web, Android or iOS)?
*   Is checking on special UI elements such as push notification and Android toast message required?
*   Is checking on system-level controls, say pressing device power button or home button, switching on and off Wifi signal, or changing device orientation required?
*   Is checking on different types of touch actions like swipe and pinch required?
*   Is image recognition required?
*   Is audio recognition required?
*   Can the tool generate script by recording user actions? **This may speed you up a lot**.

**We are preparing a comprehensive comparison between different test automation tools, subscribe to our newsletter to stay up-to-date**

### Selenium and Appium

While different tools might be more suitable in different situation, our team default goes to these two popular test automation tools:

*   [Selenium](http://www.seleniumhq.org/) for Web apps
*   [Appium](http://appium.io/) for Mobile apps

Both Selenium and Appium have active user communities, which meant great community support and readily available tutorials and solutions to the more generic problems. Another good thing about using these two with your stacks is that they have very similar architecture and scripting format, which you could learn the tricks once and apply them to both.

Basically, the testing work flows in Appium and Selenium are like this:

![Test Automation Tools, how test automation works](/images/blogs/6e91a6185d_679928a9778d40c8eb343fbf_2-1024x344.webp)

Test Automation Tools, how test automation works

They act as a driver between the testing machine and your target.

With a testing script written, you will

1.  Need to host a server on your machine,
2.  Get the client side setup ready as well (browser installed or simulator launched).
3.  While running your script, the server will drive the client to perform actions according to your codes, for example
    1.  clicking
    2.  typing
    3.  and verifying elements

As the test flow was based on your script, the machine could therefore automate your work like a human.

## Script and Run

At this point, you might be thinking that: “But I am not a developer, how can I script?!”

Not to worry — basic understanding of programming is all it required for translating your well-written test plan / process into an automated testing script.

By changing your human-readable instructions into corresponding commands, it is straight-forward and understandable even for programming beginners.

Without further ado, let’s take a look at this example of a testing script:

‍

`# lines start with # shortly describe what the codes are doing`

`# these lines will be skipped by the computer when running script`

`# import required components for the script`

**`import`** `os`

**`import`** `unittest`

**`from`** `appium` **`import`** `webdriver`

`# write a test suite called DemoAppTest`

**`class`** `DemoAppTests(unittest.TestCase):`

   `# define setup`

   **`def`** `setUp(self):`

       `print(&#039;Setup test&#039;)`

       `# set the testing client environment`

       `desired_caps` **`=`** `{}`

       `desired_caps[&#039;platformName&#039;] = &#039;iOS&#039;`

       `desired_caps[&#039;platformVersion&#039;] = &#039;9.3.1&#039;`

       `desired_caps[&#039;deviceName&#039;] = &#039;iPhone6S&#039;`

       `desired_caps[&#039;udid&#039;] = &#039;12345abcde67890fghijklmnopqrstuvw1234xyz&#039;`

       `desired_caps[&#039;bundleId&#039;] = &#039;com.testing.demoapp&#039;`

       `# map the settings to testing server by Appium driver`

       `self.driver` **`=`** `webdriver.Remote(&#039;`[`http://localhost:4723/wd/hub&#039;`](http://localhost:4723/wd/hub')`, desired_caps)`

   `# define tear down`

   **`def`** `tearDown(self):`

       `print(&#039;Tear down test&#039;)`

       `# stop the Appium driver`

       `self.driver.quit()`

   `# define test case 1`

   **`def`** `test_case_1(self):`

       `# find Button 1 and click it`

       `print(&#039;Click button 1&#039;)`

       `element` **`=`** `self.driver.find_element_by_ios_uiautomation(&#039;.buttons()[&quot;Button 1&quot;]&#039;)`

       `element.click()`

       `# find and check the element with the text &quot;Hello!&quot;`

       `print(&#039;Check result: Hello!&#039;)`

       `element` **`=`** `self.driver.find_element_by_ios_uiautomation(&#039;.tableViews()[0].cells()[0]&#039;)`

       `self.assertEqual(&#039;Hello!&#039;, element.get_attribute(&#039;name&#039;))`

   `# define test case 2`

   **`def`** `test_case_2(self):`

       `# find Button 2 and click it`

       `print(&#039;Click button 2&#039;)`

       `element` **`=`** `self.driver.find_element_by_ios_uiautomation(&#039;.buttons()[&quot;Button 2&quot;]&#039;)`

       `element.click()`

       `# find and check the element with the text &quot;World!&quot;`

       `print(&#039;Check result: World!&#039;)`

       `element` **`=`** `self.driver.find_element_by_ios_uiautomation(&#039;.tableViews()[0].cells()[0]&#039;)`

       `self.assertEqual(&#039;World!&#039;, element.get_attribute(&#039;name&#039;))`

`# start running the test suite`

**`if`** `__name__` **`==`** `&#039;__main__&#039;:`

   `# load all the test cases in DemoAppTest`

   `suite` **`=`** `unittest.TestLoader().loadTestsFromTestCase(DemoAppTests)`

   `# run the script`

   `unittest.TextTestRunner(verbosity`**`=`**`2).run(suite)`

### Explaining the script

This is a sample code written with [Appium Python Client](https://github.com/appium/python-client). It runs a test suite on an iPhone 6s, to click two buttons on screen and check for different results. The codes maybe quite different if you are using a different tool, but the structure is more or less the same.

In the example above, you can take the whole script as a test suite, and the functions inside are the fixtures (setup and tear down) and test cases to be ran. But if the above script is a bit hard for you, you could try to read through its structure first, which is actually like this:

1.  Import required components for the script
2.  Write a Test Suite called DemoAppTest
    1.  Define Setup
        1.  Set the Testing Client Environment
        2.  Map the settings to Testing Server by Appium driver
    2.  Define Tear down
        1.  Stop the Appium driver
    3.  Define Test Case 1
        1.  Find Button 1 and Click it
        2.  Find and check the element with the text “Hello!”
    4.  Define Test Case 2
        1.  Find Button 2 and Click it
        2.  Find and check the element with the text “World!”
3.  Start running the Test Suite
    1.  Load all the Test Cases in DemoAppTest
    2.  Run it! (It will run in the order: Setup -> Test Cases -> Tear Down)

You could easily find that the complexity of the script depends on your manual test plan a lot: how you define a test suite, testing environment, step-by-step test cases, expected results and so on. Take some time to learn the syntax from official documents, you will then be able to easily convert your words into codes!

Remember: The clearer your test plan, the faster you script.

### Running the test

Finally, if you have already setup the tool and created a testing script, it’s time to run it.

If you are using Appium, host a testing server by command line:

$ appium -p 4723

Get your device or browser ready. And run your testing script:

$ python samplescript.py

After a while, you will see the test result appearing like this:

test\_case\_1 (\_\_main\_\_.DemoAppTests) ...Click button 1Check result: Hello!test\_case\_2 (\_\_main\_\_.DemoAppTests) ...Click button 2Check result: World!----------------------------------------------------------------------Ran 2 tests in 10.061s

Done! Tests successfully ran by computer.

So now you can always simply call a command to run a test. How about integrate it into your workflow?

## Continuous Integration

Continuous Integration (CI) is a common practice in an agile workflow, at Oursky we wish to integrate the test automation in CI, here are what we do.

### Jenkins – Open-sourced test automation tool

[Jenkins](https://jenkins.io/) is an open-source option that you can fully manage and keep track with your test results. We integrate with Github which host our code:

![Test automation process flow chart](/images/blogs/ce85108eae_679928a93068a415569360f7_3-1024x163.png)

Test automation process flow chart

It communicates with the automation tool and your testing script to get it running. So all you need to do is to:

1.  Push your testing scripts to GitHub for the Jenkins server to retrieve
2.  Configure the Jenkins server and install the tools it may need
3.  Configure the running operations for a specific test, and
4.  Click the Build button

You could later on write advanced scripts to make it run periodically, or run it when the project has a new commit. _You can totally lean back and wait for the test results._

![Test automation with jUnit](/images/blogs/7abd7aa1c7_679928a9b3777f25b2be6794_4.webp)

A test result generated by Jenkins – Image from http://nelsonwells.net

It would be a good enough point to end at this stage. Yet, if your team are chatbot-savy like us, here is an even better option.

## Make It a Bot!

If you’re a part of a project team, you probably need to frequently report your test results to your project manager and other teammates. There are extra communication overhead, how can we automate it?

What if the test results would be automatically posted to your team’s messenger when it is finished?

What if your project manger could run the tests using the CI tools by typing one word in the team’s messenger?

We use [a lot](https://code.oursky.com/human-and-cat-friendly-chatops/) [of bots](https://code.oursky.com/slack-dsym-bot-report-via-sentry/) at Oursky, so that’s our default solution.

![Test Automation + ChatOps = Awesome!](/images/blogs/a6bda7a36d_679928a9bf957cb923d13fc2_5-1024x296.png)

Test Automation + ChatOps = Awesome!

If you use Jenkins and Slack like us, you can simply get the [Slack plugin](https://wiki.jenkins-ci.org/display/JENKINS/Slack+Plugin) of Jenkins: to send notifications to your Slack channel when a test has started or finished and vice versa. You can also add a slash command to your Slack channel: to post a network request to your Jenkins site, or to trigger a test run by typing a command in the messaging app.

Once the setting is done, the whole team in your group can use it. Project managers can trigger test runs whenever they want, and everyone will get notified when a test is passed or failed. You can now just sit comfortably and have a nice cup of coffee while the computers are doing the boring heavy lifting for you.

## Conclusion

The long test automation journey can actually be divided into three main stages:

1.  Automate a single test run
2.  Automate the build process
3.  Automate the communication with team

To automate a test run, write a good test plan, setup an automation tool and script the test plan.

To automate the build process, we setup a CI server and move everything to remote.

To automate team communication, we integrate it with messaging apps and send notifications.

At every stage, you may need to pick up new knowledge on the go, and it may be a difficult process, especially for non-tech teams. However, trust me on this – once you get through the bottleneck, you can be really FAST and ACCURATE!

Give it a try — you won’t regret it.

‍
