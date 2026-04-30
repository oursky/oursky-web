---
title: "5 Front-End Design Essentials for Developers"
description: "5 Front-End Design Essentials for Developers"
pubDate: 2025-01-28
author: "Frank Lam"
categories:
  - "ui-design"
displayCategory: "UX/UI Design"
image: "/images/blogs/a9c68f3416_67994b22dcaa9b5237fd24a7_pablo-24-1.webp"
draft: false
webflowId: "67994b37299fa013c65fba56"
---

![5 Front-End Design Essentials for Developers](/images/blogs/86c49dcae4_67994b1496dda19f1d1a85b6_pablo-24-1-720x360.webp)

I went from a part-time designer in a local Hong Kong tech company to one of its partners. Before I joined full-time, I taught myself CSS when I worked as a web designer for a number of agencies and clients. Since joining this company 6 years ago, I’ve been involved with 50+ projects (including in-house ones), including Apple’s Best New App 2016.

As our development team grew, I couldn’t just pass my Sketch design files with “a common understanding” to our senior developers, so I wrote this CSS checklist for the company. I’ve added additional notes on the concepts behind the checklist items.

## Layout

![Zurb Foundation 6 Layout Templates](/images/blogs/942d12ff78_67994b14f86d8834519172d5_Screen-Shot-2016-08-15-at-4.57.26-PM.png)

Front-end templates. Image courtesy of [Zurb Foundation 6](http://foundation.zurb.com/templates.html)

Layout is knowing how to arrange the information on your page to guide user behavior. The good news is, the web has many great, responsive templates. Your designer should have already decided whether a simple splash or a newspaper layout is more suitable for your site. As a front-end developer, you need to make sure their design is consistent across all platforms (i.e. web, tablet, mobile).

*   **Find a suitable framework.** We recommend Foundation from Zurb, one of the most powerful responsive front-end frameworks, and Bootstrap.
*   **Use rows and columns to create your layout.** Don’t depend on this once you populate with content. Grids are for basic layouts only.
*   **DON’T mess with the default grid stylesheet** — just don’t do it man.
*   **Build responsive.** Make sure your web design is viewable not only on desktop but can be viewed in response to different sized screens like mobile screens. Your content and elements should float around automatically (and check!). Avoid hard-coding and locking to specific positions. Use a mobile-first approach and add to your CSS style-sheet to accommodate larger screens. It’s easier to go from small to large than the opposite!

## Buttons

![UI-BASIC-1](/images/blogs/02aad79310_679926641a1728a7b81c8e7d_UI-BASIC-1.jpeg)

Centre-aligned button. Guiders are used for design software.

Buttons lead your visitor around your page, you want them to be easy to notice and to read.

*   **Use special colors sparingly (CTAs).**
*   **Equal padding** for top and bottom,\*\* left and right for your buttons / labels. Usually it’s nice to have content in the center of a frame. You don’t want your text too close to your button border. By having the same amount of padding on all sides, this ensures your content will be balanced and centered.
*   **Equal padding** for top and bottom,\*\* left and right for your buttons / labels. Usually it’s nice to have content in the center of a frame. You don’t want your text too close to your button border. By having the same amount of padding on all sides, this ensures your content will be balanced and centered.  
    Centre-align your text.\*\* It’s hard to go wrong, unless you have a special reason to left or right align.
*   **Create buttons that expand.** Apply a minimum width in case the label is very short. You want your buttons to stretch and expand (or shrink) to fit different screen sizes.
*   **Include hover states.** If the style for the hover state is not already given in your template, add a [simple darken or lighten function](https://css-tricks.com/snippets/javascript/lighten-darken-color/). You want your viewer to see that they’re either about to click on something. Why? This subtle cue helps a user navigate your site.

## Labels

![icon label UI design](/images/blogs/2be70a174d_679926643cdca49933e82423_UI-BASIC-2.jpeg)

Give space between your icon and label.

*   **Icons should be vertical-centre aligned** in most cases to go with your labels. Do not take this for granted and check on multiple browsers (Chrome, Firefox, Safari, and even in-app browsing).
*   **Give appropriate spacing between the icon and label.** Even though your prototype may look good, make sure your stylesheet renders spaces properly. People who start out usually put them too close to each other, so try giving 10% more space than your first choice.
*   **Align in groups** (ie. label + text), but the labels should be centre-aligned on their own (for the same reasons mentioned above): `<a href="”#”">Run</a>`

## Typography

![UI-BASIC-3](/images/blogs/d3def77853_67992664208e42e86abe90ad_UI-BASIC-3.jpeg)

Checking heading and text cohesion for our design.

The typography of your site is the first sense of “voice” your visitor will see before the actual content. Most good designers are obsessed about typography, but (if your designer will accept it) consider whether they chose a universal font and what alternative font the site will be rendered in if a user doesn’t have it. Typography is also about spacing, which creates an overall character to your site _and helps people read your content._

*   **Choose universal fonts.** [Google Fonts](https://fonts.google.com/) is a great place to start. Universal fonts also guarantee that viewers will see what you want them to see (rather than having everything turn to Arial). Also Check [Adobe Typekit](https://typekit.com/fonts) to see what styles are out there.
*   **Define your typography style.** Use em / remem/ sparingly. On the idea of having responsive content, you want your text to be scalable along with your content. [Check this comparison blog post](https://zellwk.com/blog/rem-vs-em/).
*   **Check line height.** Pay attention to the spacing above and below your text. Text that’s too cramped and close to other content is difficult to read, especially on small screens.
*   **Check letter-spacing.** More space is clearer, but too much and the letters get lost. Depending on what font and style you use, you may want to play around with the letter spacing as some fonts look better when the letters are spaced out, and some do not.
*   **Use margin-bottom** to separate text content (i.e. headers from paragraphs). Giving a little bit of space to the bottom of each area gives a clear, visual indication of separation of content.
*   **Check word-wrap** to see if it breaks your layout. Usually, most style sheets are set to have words break at “normal” break points like the end of a word. But other property values will let words “break” at different points like the end of a content area or if the sentence becomes too long the word will break to the next line like in a book.
*   **Use truncate** `(text-overflow: ellipsis)` for text that is too long and breaks your UI. You may want to use this if your string of text is really long and overflows your element’s box. It will just add some ellipsis when your text gets to the end of your element’s box.

## Images

![Buffer Pablo Twitter Facebook Headers](/images/blogs/7f95a24849_67994b14be2d1859c05c81a9_Screen-Shot-2016-08-15-at-5.33.44-PM.webp)

Know your screen dimensions across platforms. Image courtesy of [Buffer Pablo](https://pablo.buffer.com/app#).

It is often said that the average time it takes for someone to get an impression of your site is 6 seconds. And if all those 6 seconds are spent on loading time, you can guarantee your visitor is gone; the site load time should be within 1 second. What usually kills load time is huge pictures, so consider how your site either resizes or restricts user uploads. Resizing is more convenient for the user, but more is needed to ensure an image (i.e. profile pic) is correctly centred around the head.

*   **Compress your images.** Keep your beautiful hi-res hero images backed up if it’s static content, or if it’s user generated, think about how you will approach this.
*   **Request SVG if necessary** from designers because you will need to scale your images.
*   **Icon fonts are easier.** It will speed up your development if you don’t have an icon set in hand. Usually designed with simple shapes, they can save you text space, free up your web design, and you don’t have deal with all the different asset files!
*   **Always lock your ratios.** When you resize, choose the width or height and have your application auto-calculate the rest; if it isn’t, you haven’t locked the dimensions. Do not DISTORT the image ratio. You don’t want to force images into different sizes or stretch them, the pixels won’t comply and your image won’t look so nice.
*   **Always check image sizes, dimensions & position.** Are they where they’re supposed to be across all the platforms? Are they the right sizes across all platforms? Are they easy to see and scroll past across all platforms?

## Pro Tips

### Vertical Alignment

*   Only use top: 50%, margin -50% / transform -50% if the elements height is fixed and not dynamic.
*   In most cases we can use [table CSS hack](https://www.jakpsatweb.cz/css/css-vertical-center-solution.html).
*   If the parent height is specified you can use inline-block and css:before method.  
    Or forget everything and use [flexbox](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Flexible_Box_Layout/Using_CSS_flexible_boxes), time has changed.

### Content Alignment

*   As the main contents / paragraph in most cases is left aligned, left align the elements nicely will do the job. etc. Forms / Paragraph / List
*   **CLEAR** and always **NORMALISE** your CSS stylesheet if you don’t use any frameworks. This will help your alignment issues greatly.

### Jiggle Text when using CSS Transition Effect

![](/images/blogs/f445f34a1f_67994b14518e430f41f65bf7_UI-Render-4-300x179.png)

Subpixel rendering

*   Because of the text anti-aliasing problem in webkit, add specific anti-aliased text css for the text that are jiggled : `-webkit-font-smoothing: subpixel-antialiased;`

CSS is an art. One of the most frustrating things is spending hours to figure out why your text is breaking (in that case, just use Foundation styling best practices). Front-end development isn’t just deploying that Sketch design. It includes considering all the dynamic components that affect user experience, such as hover states and navigation bar rendering. Hope this helps you next time before you deploy!

‍
