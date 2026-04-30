---
title: "Basic Open Graph techniques that optimize shared links on Facebook"
description: "Basic Open Graph techniques that optimize shared links on Facebook"
pubDate: 2025-01-28
author: "David Ng"
categories:
  - "code"
displayCategory: "Code"
image: "/images/blogs/2658bb5a22_679926163cdca49933e7e4c9_Screen-Shot-2015-07-14-at-8.webp"
draft: false
webflowId: "6799261a4273ee79928878b5"
---

[Open Graph](http://ogp.me/) is a good standard, it helps turning a web page to become a rich object in a social graph.  
If you follow the Open Graph protocol, most of the social platforms (Facebook, Reddit, etc. ) will crawl your website and present it in a nice and structured format.  

A minimal open graph set-up requires these 4 tags:

*   `og:title`
*   `og:type`
*   `og:url`
*   `og:image`

To start with, implement Open Graph Tags as the followings:

<meta property="og:title" content="The Dancing Bananas" /><meta property="og:type" content="website" /><meta property="og:url" content="http://www.oursky.com/dancing-bananas" /><meta property="og:image" content="http://www.oursky.com/dancing-bananas.png" />

Further optimizing the related Open Graph tags would be an advanced SEO skills for grow hackers.  
An eye-catching and structured graph information will positively affect your post exposure.

## Facebook with Open Graph

Facebook is one of the leading platform that strongly encourages the use of OG Tags.  
On Facebook, you might already notice some shared links are displayed in different forms.

###### FOMR 1 – IMAGE Grid on left

![small-og-image-sample](/images/blogs/d0a5553b66_679925e1ba7b1c72b426724b_Screen-Shot-2015-07-14-at-8.06.35-pm.png)

###### FORM2 – Top cover Image

![large-og-image-sample](/images/blogs/d6b49dd3f6_679925e13a98e00baded4983_Screen-Shot-2015-07-14-at-8.06.21-pm.webp)

Research shows that a large cover image can positively affect the conversion rate of shared your post.  
**You might now want to ask, why do these two posts are presented so differently?**  
Ans: It’s all about how the Facebook Feed consider your `og:image` property.

If your image is smaller than 600 x 315 px, it will still display in the link page post, but the size will be much smaller.

Tips: If you want a great result on Retina display device (e.g. iPad air, MacBookPro), you should consider making an `og:image` with 1200 x 630px.

Nevertheless, Facebook is smart enough to crawl other images in your shared page if it does not specify a default `og:image`.

And here’s how [Facebook says](https://developers.facebook.com/docs/sharing/best-practices) about the image and other best practices:

### _Image Sizes_

_Use images that are at least 1200 x 630 pixels for the best display on high resolution devices. At the minimum, you should use images that are 600 x 315 pixels to display link page posts with larger images._

### _Small Images_

_If your image is smaller than 600 x 315 px, it will still display in the link page post, but the size will be much smaller._

_Note that, if you want to display an OG image, the minimum image size should be at least 200 x 200px._

### Test it out!

Do test out how Facebook interprets your Open Graph post! At any time, you can use this debug tool provided by Facebook.  
[https://developers.facebook.com/tools/debug/](https://developers.facebook.com/tools/debug/)

![og-debug-sample](/images/blogs/952d08c48e_679925e10c0cbb9edb1b8942_Screen-Shot-2015-07-15-at-12.37.51-am-1024x341.png)

### **News Feed Image Generator to make your life easier**

Our editors are using a tool to generate standard News Feed Images. Select an image and give it a title, the tool will ensure the image ready to share beautifully on Facebook Feed in a minute.

[http://newfeedimage.appspot.com/](http://newfeedimage.appspot.com/)

![News Feed Generator Image](/images/blogs/780b298e5a_679925e208f9d71df7e4bc62_Screen-Shot-2015-07-14-at-7.15.11-pm.webp)

We’ve also made life-saver other tools for developers. Check them out and share with your friends.

*   MakeAppIcon [http://](http://makeappicon.com/)[makeappicon.com](http://makeappicon.com/)
    *   One click to generate iOS / Android app icons in all sizes!

*   MockUPhone [http://mockuphone.com/](http://mockuphone.com/)
    *   Best way to embed your screenshots into iOS / Android / Window Phone Devices

‍
