---
title: "Customer Identity Management: Why and How to Implement Multifactor Authentication (MFA) in Consumer Apps"
description: "Multifactor authentication (MFA) is a must-have in customer identity management systems. Here's how you can implement MFA to your own app."
pubDate: 2025-12-13
author: "Oursky Team"
category: "development"
image: "https://cdn.prod.website-files.com/654ba60def05336c1f0eb138/66e303fdbf76331a3fa1bfd1_franck-DoWZMPZ-M9s-unsplash-1160x870.jpg"
draft: false
webflowId: "66e3046b7077ba8363d54ebe"
---

In August last year, someone going by the handle “[Kromatix](https://krebsonsecurity.com/2020/08/sendgrid-under-siege-from-hacked-accounts/)” was seen peddling 400 compromised SendGrid accounts in the cybercriminal underground. Kromatix sold these for as much as US$400 per hacked SendGrid account, touting that they can send as much as 10 million emails per month.

In the following months, antispam and antivirus firms detected spikes of spam and phishing emails coming from SendGrid accounts. In the ensuing ruckus, a lot of their customers called, angrily asking them why they’re receiving malicious, malware-laden emails. Twilio, SendGrid’s parent company, finally acknowledged the security gaffe, and are now dealing with the fallout and trying to mitigate the breach.

The culprit: The lack of authentication in SendGrid’s customer accounts. This horror story doesn’t come as a surprise, given how [99% of hacked enterprise accounts](https://www.welivesecurity.com/2020/03/09/microsoft-99-percent-hacked-accounts-lacked-mfa/) reportedly don’t have multifactor authentication enabled.

This is just one of the many reasons why we created [Authgear](https://www.authgear.com/#Features), our own open-source and developer-friendly authentication-as-a-service solution for mobile and web applications.

Let’s take a look at multifactor authentication, why businesses obviously need one — and what you need to consider when implementing your own customer identity management for a consumer-facing web or mobile app.

![](https://cdn.prod.website-files.com/654ba60def05336c1f0eb138/66e3041bb42bcc17bc4eb972_franck-DoWZMPZ-M9s-unsplash-1160x870.jpeg)

PHOTO BY [FRANCK](https://unsplash.com/@franckinjapan?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText) ON [UNSPLASH](https://unsplash.com/s/photos/smartphone-security?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText)

# 2FA vs MFA: What is multifactor authentication, and how does MFA work?

You’ve most likely already used some form of multifactor authentication on your favorite websites or mobile apps. For example, after you log in to your banking app with your username and password, you may get a screen asking you to key in a code that was either sent to your phone or email.

Another is when you’re working from home. You use a mobile app to generate tokens so you can connect to a virtual private network in order to access and edit internal corporate SharePoint sites.

Simply put, multifactor authentication (MFA) is the use of multiple ways to confirm and verify the identity of a digital user who is requesting access to a software, application, website, or other resource.

These “multiple factors” are commonly based on:

*   Knowledge (something you know, e.g., password, PIN)
*   Possession (something you own, e.g., smartphone, desktop, USB)
*   Inherence (something you are, e.g., biometric data such as fingerprint, retina scan, facial recognition, etc.)
*   Location (where you are, e.g., geolocation, IP address, etc.)

Multifactor authentication uses at least two types of these identifying information. Requiring the user to confirm their identity in various ways greatly assures that they really are who they claim to be. It also minimizes the risk of unauthorized access to the user’s sensitive data. After all, using a stolen password to log in is vastly different from using a stolen password and then be required to enter another passcode from a smartphone.

Here’s multifactor authentication in action:

_HERE’S AN EXAMPLE OF HOW MULTIFACTOR AUTHENTICATION WORKS. ON THE LEFT SIDE, YOU HAVE THE USUAL GMAIL LOG-IN PAGE WHERE YOU ENTER CREDENTIALS. ON THE RIGHT SIDE IS THE PUSH NOTIFICATION METHOD OF AUTHENTICATION WHERE YOU APPROVE (OR DENY) THE LOGIN._

### 2FA vs MFA

Two-factor authentication (2FA) is quite different in that 2FA always uses two methods of verification. Simply put, multifactor authentication uses multiple kinds of methods to authenticate a user. All 2FA methods are MFA, but not all MFA is 2FA.

An example of 2FA is when you sign in to your Google or Facebook account. After you enter your password, you’ll be prompted to enter a code to fully access your Gmail or Facebook profile.

Multifactor authentication uses different kinds of identifiers. For example, you may have changed your phone number or lost your smartphone, so you can no longer receive codes to authenticate yourself. You can use your biometric data, software-based authenticators, or USB security key to verify your identity.

# Which methods can be used to implement multifactor authentication?

There are several methods for implementing multifactor authentication to your mobile app, website, or web app as part of your customer identity management system. The most common are:

*   **SMS one-time passwords (OTPs).** Randomly generated digits are sent to a user’s phone via SMS, which the user then enters to log in to the app or site. It’s the most common method of authentication, but consider if they’re enough to protect your customers’ data. There are many instances where [SMS messages can be intercepted](https://www.cnet.com/how-to/do-you-use-sms-for-two-factor-authentication-heres-why-you-shouldnt/).
*   **Email authentication.** The process works similarly to an SMS-based authentication, but the passcode or link is sent to the user’s email.
*   **Time-based one-time passwords (TOTP).** This involves generating a temporary passcode (through a cryptographic function) that can only be used for one log-in session and is valid only for a certain period of time.
*   **Hardware tokens.** Hardware tokens can come in the form of key fobs, smart keys, or USB dongles that generate OTPs, tokens, and digital signatures; or use biometric data. They’re very secure but they could be a logistical nightmare. Their users must always carry them around, most are proprietary (and thus expensive), and they can be easily lost or damaged.
*   **Software tokens.** Software tokens are the “digital” version of hardware tokens (i.e., as an app on a smartphone) sans a physical device. Passcodes are stored on the devices and can be duplicated. Both use encrypted keys in which the algorithm is known to an authentication server, and are configured for each user.
*   **Push-based notifications.** This method uses push technology to authenticate the user. It’s unlike SMSs and usual push notifications you see in your apps, as they don’t actually have the OTP. They can only be opened by a specific app on the user’s mobile device. Users can then either approve or deny access with a press of a button. A good example of this is when you sign in to your Gmail on a desktop. You may then be prompted to approve (or deny) the log-in attempt from a notification sent to your smartphone. Push-based authentication needs data/internet connection.
*   **QR code authentication.** Users will need to scan a badge or [QR code](https://www.adobe.com/express/feature/image/qr-code-generator)using their smartphone’s camera. It’s convenient for users as they can work offline, but you’ll need additional development effort to generate and configure one for your app.

# Customer Identity Management: Why Every Business Needs MFA

Multifactor authentication is a must-have feature in customer identity management systems. This is especially true for consumer-facing businesses whose mobile apps or websites handle sensitive and personally identifiable information.

### Avoid loss of customer trust.

Today’s consumers are technically savvier and more privacy-aware. They want brands to provide amazing digital experiences while protecting them from identity theft, phishing, and fraud.

A data breach tarnishes a company’s reputation — so much so that [87% of consumers](https://www.fisglobal.com/-/media/fisglobal/worldpay/docs/insights/consumer-intelligence-series-protectme.pdf) will take their business elsewhere if they feel like their data is not responsibly managed. In fact, the National Cyber Security Alliance reported that, after a data breach, [10% of surveyed businesses went bust](https://staysafeonline.org/small-business-target-survey-data/) while 25% had to file for bankruptcy.

Implementing multifactor authentication makes it harder for hackers and cybercriminals to illicitly access customer accounts by requiring them additional pieces of information. A brand that takes security and privacy seriously is always a plus point for customers!

### Comply with data privacy regulations.

Data privacy laws like the [EU’s General Data Protection Regulation (GDPR)](https://gdprinfo.eu/)and [California Consumer Privacy Act (CCPA)](https://oag.ca.gov/privacy/ccpa) mandate businesses to secure the privacy and security of data they’re collecting and processing. Infringing the GDPR can cost businesses as much as €20 million or 4 percent of the company’s annual turnover, whichever is higher.

Last year, [British Airways got slapped with a €20-million fine](https://ico.org.uk/about-the-ico/news-and-events/news-and-blogs/2020/10/ico-fines-british-airways-20m-for-data-breach-affecting-more-than-400-000-customers/) for violating the GDPR. Multifactor authentication puts an additional layer of data security by requiring users to verify their identity before granting them access to their accounts.

## Multifactor Authentication Use Cases

The use cases for implementing multifactor authentication are more than just for securing your customer’s data:

### Financial Institutions

Any business providing financial services, including banks and FinTech companies, must comply with information security standards for authentication. This includes the likes of Payment Card Industry Data Security Standard (PCI DSS), [Open Banking](https://www.openbanking.org.uk/), and [PSD2](https://ec.europa.eu/info/law/payment-services-psd-2-directive-eu-2015-2366_en). A common example of MFA for the high-risk financial industry is using tokens and one-time passwords (OTPs) sent to the smartphone to approve or decline transactions, like ATM or debit card deposits, withdrawals, loan payments, or [insurance claims](https://blog.oursky.com/2021/03/15/embedded-insurance-an-api-first-approach-to-improving-digital-customer-experience/).

### Retail and E-Commerce

Compliance and helping against fraud are the obvious use cases for implementing multifactor authentication. If you have an app with shopping carts or platforms that allow direct/in-app purchases (like Messenger or WhatsApp), MFA adds an extra layer of security.

Attacks on e-commerce apps are [reported to be the leading cause of data breaches](https://enterprise.verizon.com/resources/reports/dbir/) in the retail industry. Implementing an authentication process at the point of sale helps deter cybercriminals and scammers from defrauding customers. Of course, you have to incentivize your customers to enable MFA while also minimizing its disruption to user experience. It also helps that more and more customers (at least the millennials and Gen Z!) are [adopting 2FA and MFA](https://www.darkreading.com/application-security/younger-generations-drive-bulk-of-2fa-adoption/d/d-id/1336581)!

The data processed within these industries are sensitive by nature, such as name, credit card data, email, and billing address, so there are many technical considerations for implementing MFA in retail or e-commerce apps. The National Institute of Standards and Technology (NIST) has a [comprehensive guide](https://www.nccoe.nist.gov/publication/1800-17/VolB/) if you want to know more.

### Device and Vendor Management

In one of Oursky’s app development projects, we used our own authentication as a service — [Authgear](https://www.authgear.com/) — to help gamers and e-sports professionals manage the devices they use for gaming, whether it’s a smartphone, laptop, or desktop. We also incorporated [Authgear’s single sign-on and user management features](https://www.authgear.com/#Features) to simplify the sign-up and log-in process for users.

We also implemented multifactor authentication (via [Authgear](https://www.authgear.com/)) in our app development project with a multinational company. They needed a solution to manage and control access to their internal systems and databases, which they had to give access to third-party vendors and contractors for their projects. We customized the MFA solution to allow only authenticated and authorized users to access the systems.

## What to Consider for Implementing Multifactor Authentication

A combination of different authentication methods is recommended for implementing multifactor authentication for your app or website. There are also other factors to consider — when to implement MFA, or what authentication method to deploy. Some methods may be applicable, and others may not be so practical to implement. They’ll depend on:

*   The kind of customer data you’re protecting (i.e., the [EU GDPR](https://gdpr-info.eu/issues/personal-data) and [CCPA](https://oag.ca.gov/privacy/ccpa) have their definitions of personal information)
*   User activity, i.e., it may not be practical to enforce MFA for users just browsing through product promotions, but MFA should be required when updating their profile or payment information
*   Balance between user experience and security
*   Ways to incentivize your users to enable MFA
*   Integration with [native, web, or hybrid apps](https://blog.oursky.com/2021/04/08/progressive-web-apps-a-viable-solution-for-cross-platform-mobile-development/)
*   Regional/country-specific regulations that require you to implement specific kinds of authentication
*   Maintenance of your MFA, e.g., APIs and SDKs that need to be integrated or updated
*   How you manage the interactions between the users and your app (i.e., session management)
*   Support for modern authentication protocols, frameworks, and technologies like [OAuth 2.0](https://oauth.net/2/), [OpenID Connect](https://openid.net/connect/), Lightweight Directory Access Protocol (LDAP), and [Active Directory](https://docs.microsoft.com/en-us/windows/win32/ad/directory-system-agent)
*   Reporting and auditing, i.e., if the MFA solution can provide audit trails and reports that can be reviewed to identify and fix issues
*   Password and authentication policies set by the company
*   Developers often need to debug or test TOTP flows during integration. A handy resource is [Authgear’s TOTP Authenticator tool](https://www.authgear.com/tools/totp-authenticator), which supports SHA-1/256/512, 6–8 digits, and live code generation for testing.

### Single Sign-On (SSO) and Social Login

Another technical consideration is using single sign-on (SSO) and social login. Nowadays, many apps have MFA systems complemented with SSO and social login features for registering or logging in to apps.

Single sign-on allows users to log in to different or interdependent websites, software, or applications with a single set of ID and password/credentials. The websites or apps basically rely on a trusted third party to verify the user.

In the enterprise, SSO can make it easier for IT teams to monitor user activity. Identities and log-in activities are more centralized, so there’s less passwords to use (and remember!). This means less entry points for hackers.

Social login is a form of single sign-on that uses and links already existing information from social networking services to register or sign in to an app.

A common example of SSO is when using Google’s suite of apps — you only need to log in once to access Gmail, Google Drive, Docs, Meet, or Calendar. If you’re using a gaming app, you can create an account by linking it to your Facebook profile. When you log in through a different smartphone, you can just sign in through your Facebook account or Apple ID and the gaming data will be synced to the device.

### Passwordless Authentication

Another factor to consider when implementing MFA is “passwordless authentication.” It is a method of verifying the user’s identity without requiring a traditional password, and instead uses:

*   Something the user owns, like a trusted mobile device (to access soft tokens or OTPs)
*   Something the user is (i.e., biometric data), like a fingerprint or facial scan

Passwordless authentication is a bit of a misnomer. Depending on the app, software, or device, users may still need to enter passcodes or use one or two factors to authenticate themselves. Still, this method greatly reduces the need for using traditional passwords and PINs, which are very [susceptible to hacking](https://enterprise.verizon.com/resources/reports/DBIR_2018_Report_execsummary.pdf).

An example of passwordless authentication is how [Slack uses a “magic link”](https://slack.com/intl/en-ph/help/articles/212681477-Sign-in-to-Slack) to sign users in to their Slack accounts. Instead of the traditional username-password form fields, Slack will prompt users to tap the “Send Magic Link” button. The user is then emailed a link to authenticate and finalize the login. Apart from using, say, an email app on a mobile device, no password is ever entered in the authentication flow.

Other examples of passwordless methods of authentication are Touch ID, Face ID, Windows Hello, or authenticator apps on mobile devices. Google has even started to roll out [passwordless authentication through Android phones](https://security.googleblog.com/2019/08/making-authentication-even-easier-with_12.html)themselves.

Single sign-on methods like social login can be considered a kind of passwordless authentication. There are also methods that entirely remove passwords in the authentication process, like what [a bank in the UK](https://www.fstech.co.uk/cybersecuritylive/venafi.php) and a US financial services firm recently did.

If there’s at least two factors and none are traditional passwords, it’s “passwordless MFA.” This essentially combines passwordless methods and multiple factors to authenticate users.

## Using Authentication as a Service

Implementing authentication also begs the question: Build or buy? Authentication is a straightforward concept, but it’s difficult (and expensive) to properly set up. Your team needs the technical skills, resources, and infrastructure to configure one, not to mention the time needed to develop and test it.

In today’s era of the cloud, IT teams no longer have to purchase dedicated hardware, software, and infrastructure and manage their implementations on-premises. They can leverage cloud platforms to accomplish the same tasks, and that includes authentication.

Authentication as a service (AaaS) provides customer identity management services like customizable log-in and log-out functionalities, multifactor authentication, single sign-on, and password and session management, to name a few. An authentication-as-a-service solution can be a practical option for adding customer identity management features to your app.

Consider these when choosing an authentication-as-service solution:

*   **User experience.** How will the auth-as-a-service solution affect customer experience? Will it slow down the app? Will it make registrations and logins more complicated for your users? Will it be scalable enough as you grow your product and customer base?
*   **Security and compliance.** How does the solution help mitigate security incidents? Does it have countermeasures against attacks like brute force? Does it provide logs that you can keep track of?
*   **Development costs.** You shouldn’t have to reinvent the wheel to customize your login, logout, or password reset flows. It should be easy to deploy and modify.
*   **Time to market.** If you’ve already launched your app or website, you can be further pressed for development time. Consider an AaaS solution that can be quickly integrated without refactoring or recoding your app.
*   **Reliability.** Spell out the service uptime that the AaaS provider can guarantee to you. What is their acceptable use policy? Take into account the outages that may happen to the vendor’s authentication server and additional network latencies that could occur, which can affect your app’s performance.
*   **Transparency.** The AaaS provider should clearly demonstrate how sensitive and personally identifiable information is stored and processed by the service. Where are their servers located? How do they track sessions? Do they store logs? Do they share information to third parties?
*   **Budget.** How many staff and how much financial resources are you willing to invest when you implement it?

Customer identity management is driven by business — empowering your customers, converting sales, and increasing trust and loyalty to your brand. When implementing multifactor authentication into your app, don’t choose or prioritize between security and user experience. You must strike the right balance of safeguarding their personal data and delivering a digital experience they’ll enjoy. Identity is security, but it’s also a doorway for creating new opportunities!

_Oursky’s_ [_Authgear_](https://www.authgear.com/) _provides an authentication-as-a-service solution for web and mobile applications._ [_Authgear is developer-friendly with opinionated defaults_](https://docs.authgear.com/)_. Authgear helps companies unify the authentication experience across multiple platforms with simple integration. Authgear can be easily integrated into the application via the iOS, Android, and JS SDKs, helping manage the app’s user sessions. Authgear can be easily integrated with microservices and cloud functions to provide authentication and authorization over API endpoints._ [_Take a look at a demo here to see Authgear in action_](https://www.youtube.com/watch?v=5Lr0d-KsIS0)_!_

‍
