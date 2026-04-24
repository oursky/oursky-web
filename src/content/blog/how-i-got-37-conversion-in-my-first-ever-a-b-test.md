---
title: "How I got 37% conversion in my first ever A/B test"
description: "How I got 37% conversion in my first ever A/B test"
pubDate: 2025-01-28
author: "Oursky Team"
categories:
  - "product-growth"
displayCategory: "Product Growth"
image: "/images/blogs/c6ccdd7924_66e31372ffe29e9cf6815c0e_matthew-henry-87142-768x512.jpg"
draft: false
webflowId: "66e313f24464199c0e59de76"
---

![](/images/blogs/1e53a90844_66e3138dec3f1f2d489152e5_matthew-henry-87142-720x480.jpeg)

PHOTO BY MATTHEW HENRY ON UNSPLASH

There isn’t only one right way to perform an A/B test. That doesn’t mean, however, that observations can’t be made or correlations drawn. As a fresh intern growth hacking the landing page of [ShotBot](http://shotbot.io/), a developer’s tool to help submit screenshots to iTunes Connect, I performed enough trials and errors to fill an 80s film shopping montage. To spoil the movie, I eventually managed to boost our landing page’s conversion rate to 37%. This post is on how I got there — _and I think you could do it even faster._  

## Starting out

When I first joined the Oursky team as an intern, I knew nothing about the principles of A/B testing. Where to start, where to go from there, and what common pitfalls to avoid were all realized only in hindsight.

I documented three tests that I gained insights from, but my tests didn’t have a consistent logic at the time — almost the opposite of what you’d expect in an A/B test. I approached the trials from a low-hanging fruit perspective, which is to say I performed tests that were easier to implement, quick and inexpensive.

Take a look at my three trials of A/B tests below for ideas of what not to do, and maybe some things to try. Since A/B testing is basically about predicting user behaviour, I had a hypothesis for every test that I hoped would get people to click download (and pay!). I would then set up comparisons (A vs B) to see if the things I thought mattered actually affected user conversion.

I lucked out, and I learned a lot. But I in retrospect, I could have engineered the learnings without depending on luck.

## Trial 1 — Changing the tagline only

![](/images/blogs/866f456111_66e3138d00cae42b61548d07_1xScfyUoxxEELqYDXU8xiDg.png)

### Hypothesis

Changing the landing page tagline will result in more people converting.

Sometimes, all it takes is a small change. Maybe the problem was just our choice of words, since the company is full of developers rather than marketers.

### Test

For an A/B test to be effective, it needs to produce a result with a confidence level of at least 80%. While the industry standard is 95%, our team decided that an 80% confidence level was good enough to decide which variation to use.

With this in mind, I equally exposed our daily site’s traffic of 200 visitors to three different landing pages. The only difference between each of these three landing pages was the tagline. The variations included:

*   ‘Generate, submit screenshots to iTunes Connect fast’ (Original)
*   ‘In 3 steps, Generate and submit screenshots to iTunes Connect’ (Challenger 1)
*   ‘Save you 15 minutes in preparing screenshots for iTunes Connect’. (Challenger 2)

My assumption was that once the each tagline variation reaches 700 visitors, the results would be examined to see which tagline resulted in the highest conversion rate.

### Results

Both challengers achieved only around 26%-27% conversion rate, short of our internal target of 40%. I then realized that I made the mistake of introducing more than one challenger to my original tagline.

> **Unless you’re Kim K’s Instagram page, stick to one variation.**

To reach a certain confidence level, an A/B test requires a solid sample size for each variation. The larger your sample size, the more confident you can be in your test’s results. By introducing more than one challenger, I reduced my sample size for each variation. Below is a comparison of the time it would take for 1 challenger vs 2 challengers to reach a significant enough sample size to analyze:

*   Designated Sample Size (DSS): 5,000 visitors
*   Daily visitors to site: 200
*   Number of variables (original + two challengers): 3
*   Number of daily visitors per variable: 66
*   Number of days required for each variable to reach DSS (DSS/# of daily visitors): 76

> **Don’t turn your A/B test into an A/B/C test**

*   Designated Sample Size (DSS): 5,000 visitors
*   Daily visitors to site: 200
*   Number of variables (original + one challenger): 2
*   Number of daily visitors per variable: 100
*   Number of days required for each variable to reach DSS (DSS/# of daily visitors): 50

Even with just two variations the test would still take 50 days. Add another variation on top of that and you’re looking at almost three months to complete one test! No startup has time for that.

By limiting your variations to the original and one challenger, you can more accurately pinpoint what particular change made people act differently.

## Trial 2 — Changing videos to GIFs

![](/images/blogs/6620443165_66e3138e9f1eb48e11539247_1NIxQOYSsrCon87NNhKjvFw.gif)

### Hypothesis

Visitors are too lazy to click the play button on the video illustrating the features of ShotBot.

The additional step of pressing play results in fewer visitors getting relevant information about the product, and thus results in fewer visitors willing to convert and buy the product.

### Test

I replaced the landing page’s video with an animated GIF that conveyed the same ideas. The two options that site visitors were exposed to included:

*   Video displaying the features of ShotBot requiring the visitor to click a play button (Original)
*   Automatically-playing GIF displaying the same information as the original (Challenger 1)

After four days of visitors coming to the site, the results were examined to see which format resulted in the highest conversion rate.

### Results

The conversion rate for both versions were nearly identical at around 28%.

> **“Where” turned out to be more important than “what” for landing pages.**

What really intrigued me was that most users still clicked the download button located at the top of the landing page, despite all the information I gave them in the GIF. This made me realize that people just wanted the most relevant information without having to either watch a video and/or scroll down the page.

> **Where things were placed on the site, then, became more of a priority than what was being placed.**

## Trial 3 — Adding a user’s testimonial above the fold

![](/images/blogs/350e384b6c_66e3138d7a74628b269e2533_1fNcm6yPC05kl8_mcpdMH_A.png)

### Hypothesis

Adding relevant information to the top section of the page will mean visitors can decide if they’re interested without scrolling down.

From the results of Trial 2 and observing other SaaS landing pages, I concluded that location of information was as, if not more, important than the actual contents of the information. Two things needed to happen:

1.  I needed a quick, trust worthy, and concise way to deliver relevant information about our product
2.  I needed to fit that information above the fold (the part of the page that doesn’t require you to scroll down)

The easiest way to accomplish both those things? User testimonials — also because this was a product for developers, and developers seem to care that other users are using these tools, too.

### Test

I reached out to users of ShotBot and asked them to share their experiences with the tool. I chose the one that read, ‘I no longer spend hours just to upload localized screenshots one by one’ and placed it at the top of the landing page. Site traffic was then diverted so that half of the visitors landed on the original page with no testimonials, and the other half on the new page with the testimonial.

### Results

The testimonial page’s conversion rate shot up to 37%, a significant increase from our previous page’s 24% conversion rate.

![](/images/blogs/78c672af92_66e3138dc417eae3608a01c6_1NsIcIjX39KieJ4JjJzCLUw.png)

CREENSHOT OF RESULTS FROM OPTIMIZELY

## We assumed people were lazy — and we were right.

Our internal target was to reach 40%, but, like our site’s visitors, we’re a little lazy. With a little rounding, 37% could be 40% anyway. 😉  
##Where you could save time on your first A/B test  
\* **Make your big changes first and fine tune after.** Larger changes like adding a video or switching the page layout will likely have more notable impacts than smaller changes like changing your product’s tagline.  
\* **Unless you have HUGE sample sizes, stick to one variation in your tests.** You’ll be able to more easily locate notable differences, plus your tests will take less time to reach its designated confidence level.  
\* **Don’t neglect peripheral observations.** As I found in Trial 2, even though what I was testing didn’t necessarily produce conversion results, the user behaviour showed me that focusing on the location of information within the landing page was important. This unrelated realization paved the way for the ultimate success of the following trial.  
\* **Keep a log of everything.** Hypothesis, findings, thoughts — everything. Not only does note-taking objectify your thoughts and thus allow you to clarify your own thinking, but it also can act as an aid for any future testing. In the future, when others look at your recorded tests, they can understand what hypothesis you’ve made, which ones proved successful, and which ones failed. From here, they can save time and perform tests in worthwhile directions.

If you found this piece helpful, follow [Oursky’s Medium Publication](https://m.oursky.com/) for more startup/entrepreneurship/project management/app dev/design hacks!

‍
