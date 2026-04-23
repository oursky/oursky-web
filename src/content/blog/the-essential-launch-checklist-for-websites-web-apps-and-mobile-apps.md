---
title: "The Essential Launch Checklist for Websites, Web Apps, and Mobile Apps"
description: "Here's quick website/web app launch checklist and tools for product and project managers, including security, broken links, browser compatibility, SEO/social, and commonly overlooked mobile app simple tests."
pubDate: 2025-01-28
author: "Oursky Team"
category: "qa"
image: "https://cdn.prod.website-files.com/654ba60def05336c1f0eb138/66e315c6a62b8d557057d579_glenn-carstens-peters-190592-unsplash-720x479-1-320x240.jpg"
draft: false
webflowId: "66e315f28332af75a834fa34"
---

![https://unsplash.com/photos/RLw-UC03Gwc](https://cdn.prod.website-files.com/654ba60def05336c1f0eb138/66e3159eb317696432493f87_glenn-carstens-peters-190592-unsplash-720x479.jpeg)

This simple website and web app checklist will help product and project managers to quickly test their performance before launching them. We also list commonly overlooked mobile app simple tests to confirm that the app behaves as expected and functions as intended. Product managers on the client side can use the tools we enumerate, as they can help in providing performance results when working with digital consultancies or app development agencies.

## Launch Checklist for Websites

1.  Performance: Pass Google Page Speed Insights Test
2.  Security
3.  Broken links
4.  Compatibility
5.  Search engine optimization (SEO) and social media
6.  Other nice-to-have tests

### Performance Check: Pass Google PageSpeed Insights Test

1.  Plug the site into Google [PageSpeed Insights](https://developers.google.com/speed/pagespeed/insights/) to see your results.
2.  If the site requires login and credentials, log in to the site first and check with [Chrome Page Speed Insights Extension.](https://chrome.google.com/webstore/detail/pagespeed-insights-with-p/lanlbpjbalfkflkhegagflkgcfklnbnh)
3.  An alternative tool you can use is [Pass GTMetrix Analysis.](https://gtmetrix.com/)

**Why perform this test:** Statistics consistently show that a few seconds in load time makes a huge difference in retention. In fact, [53% of site visits are abandoned if a site takes more than three seconds to load](https://www.thinkwithgoogle.com/data-gallery/detail/mobile-site-abandonment-three-second-load/). Having a faster site retains visitors, which actually enables them to engage with your site, reduce your bounce rate, and help with your SEO.

### Security Check

![website launch checklist](https://cdn.prod.website-files.com/654ba60def05336c1f0eb138/66e3159f24bcdfb7e000175a_github-ssl-report-qualys-720x347.png)

ENSURE THAT YOUR WEBSITE OR WEB APP HAS AT LEAST GRADE A SCORE FOR SSL.

1.  Enforce HTTPS only; HTTP should always redirect to HTTPS.
2.  Your [Qualys SSL Server Test](https://www.ssllabs.com/ssltest/index.html) should at least result in Score A.
3.  There are free and open-source scanning tools such as [Qualys](https://www.qualys.com/forms/freescan/), [OpenVAS](http://www.openvas.org/), [Nmap](http://nmap.org/), [OSSEC](https://ossec.github.io/), [Security Onion](http://securityonion.blogspot.com/), and [OpenSSH.](http://www.openssh.org/)

**Why perform these tests:** It’s easy to forget implementing these checks if there is no checklist, because these features are usually not part of the user interface (UI) and may not be caught in [exploratory tests](https://blog.oursky.com/2018/05/08/software-qa-exploratory-testing/).

### Check for Broken Links

![website launch checklist](https://cdn.prod.website-files.com/654ba60def05336c1f0eb138/66e3159ecbbfa7e53d7d5516_screaming-frog-720x297.png)

IMAGE SOURCE: SCREAMING FROG

1.  Check that all pages get no broken links on [Monkeytest.](https://monkeytest.it/)
2.  Check all pages get no invalid links on [Screaming Frog.](https://www.screamingfrog.co.uk/)

**Why check for broken links:** It helps with the user experience (UX). Broken links can also hurt your SEO.

### Browser Compatibility

![website browser compatibility](https://cdn.prod.website-files.com/654ba60def05336c1f0eb138/66e3159ef8e725cdde02140d_Screen-Shot-2018-05-14-at-3.52.54-PM-720x599.png)

WEBSITES NEED TO BE COMPATIBLE WITH THE LATEST BROWSERS.

1.  Check the website or web app’s compatibility with major desktop browsers and their versions (e.g., Chrome, Firefox, Safari, Opera, Internet Explorer, Edge)
2.  Check the compatibility for mobile browsers, too!
3.  Check Safari (iOS) and Chrome (Android) for various screen sizes.
4.  In-app browsers can also behave differently. Since they are very common, you can try opening a link from Facebook, Reddit, Twitter, or even your Inbox app.

**Why do compatibility tests:** Not all desktop browsers render the same way, and you want to ensure consistent quality for user experience. In addition, responsive websites or web apps should adjust according to screen sizes, but sometimes the rendered version does not behave as expected for a specific size. For example, we discussed a case we found with [YouTube’s sticky header for Internet Explorer](https://code.oursky.com/should-you-use-sticky-header/).

### SEO and Social Media

![website launch checklist](https://cdn.prod.website-files.com/654ba60def05336c1f0eb138/66e3159e176d8187cdc97213_SEO-for-websites-720x390.png)

KEEPING #1 IN GOOGLE’S SERPS IS ESSENTIAL FOR CLICKS!

1.  Is it fetched correctly by Google? Check with [Google Webmaster Tools.](https://www.google.com/webmasters/)
2.  Is it in the first page of Google Search Results Pages (SERPs)?
3.  Does it contain the correct OpenGraph tags for social sharing?
4.  Have you previewed how it appears? Test by dropping the link into Facebook, Twitter, LinkedIn, or Pinterest to see what image, title, and description are generated.
5.  Does the site or app have the correct title and meta description tags?
6.  Does it have favicon?

**Why check for SEO and social media:** Ensure your app, service, or website is discoverable by completing the technical side of SEO and social media. SEO helps potential users find you using key search terms. Social media optimization formats your site’s content so that your users and community can easily share and refer more users. According to [Hubspot](https://www.hubspot.com/marketing-statistics), 61% of marketers say improving SEO and growing an organic online presence is their top priority for inbound marketing.

### Nice-to-Have Tests

![offline paper css](https://cdn.prod.website-files.com/654ba60def05336c1f0eb138/66e3159fca8f21dff8956c45_live-reload.png)

IMAGE SOURCE[PAPER CSS](https://github.com/cognitom/paper-css) BY COGNITOM ON GITHUB

1.  Validate HTML and CSS with the [W3C Markup Validation Service](https://validator.w3.org/).
2.  Conduct basic web accessibility with [WAVE](https://wave.webaim.org/) or with tools available from the [W3C Web Accessibility Tools List](https://www.w3.org/WAI/ER/tools/).
3.  Are the 404 pages informative?
4.  Does your site need a [print stylesheet](https://github.com/cognitom/paper-css)?
5.  Make sure JavaScript is error free (check from Google Chrome’s Developer Tools).
6.  Are the URLs reasonable/descriptive? Reasonable URLs help visitors and search engines to understand your content.
7.  Does canonical domain work ( i.e., [www.abc.com](http://www.abc.com/) vs abc.com)?

## Launch Checklist for Mobile Apps

![iphone 4se ui breaks](https://cdn.prod.website-files.com/654ba60def05336c1f0eb138/66e3159f24bcdfb7e0001777_Screen-Shot-2018-05-14-at-3.34.47-PM-2-720x405.png)

SMALL SCREENS LIKE THE IPHONE 4SE POSE UI CHALLENGES.

This is a simple checklist for testing mobile apps. Here are some commonly overlooked problems with mobile apps and best practices for addressing them:

*   Does the input use the correct type of keyboard (i.e., email or number inputs should use the related type of keyboards) and CTA (i.e., in a form, the keyboard CTA on the bottom right in iOS should show next, and when tapped on, it should go to the next input of the form)?
*   Does the app have proper loading indicator when it is performing work that requires users to wait?
*   Test the app in poor network conditions to check if it behaves as expected. You can read about this topic on our [blog about handling network connection errors](https://code.oursky.com/offline-first-network-connection-error/).
*   Test the app in airplane mode (i.e., if it is supposed to work offline).
*   Test the compatibility of apps in different screen dimensions, especially small screens.
*   Test if the app asks for permissions with proper explanations.
*   Test if the app displays error messages that are easy to understand.
*   Test if the app works correctly during interruptions in Android, such as a call, or low storage.
*   Test the app with different localization and time zones.
*   Test the app with different font sizes (especially in iOS).

_Found this post useful? Please share!_ [_Subscribe to our newsletter for more dev and design hacks!_](http://eepurl.com/bYYI1P)

_Oursky is an engineer-led digital agency that has worked with global brands and listed companies. If you have an app or would like to develop a digital solution for your product,_ [_get in touch_](https://oursky.com/contact) _with us!_

‍
