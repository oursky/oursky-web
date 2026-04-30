---
title: "Here’s how I applied coding to my job – Crawl Medium post data using Scrapy"
description: "Here’s how I applied coding to my job – Crawl Medium post data using Scrapy"
pubDate: 2025-01-28
author: "May Yeung"
categories:
  - "product-growth"
displayCategory: "Growth"
image: "/images/blogs/cef7ac12b9_67994f623ab5547d307078d4_1EQ91GnXdCyjLulTsESZaJw.webp"
draft: false
webflowId: "679950076fa34d27f8f865a4"
---

![](/images/blogs/6701df8747_67994f5c9e5bbde3d2284b84_1EQ91GnXdCyjLulTsESZaJw-720x540.webp)

Photo by Beata Ratuszniak via [Unsplash](https://unsplash.com/photos/-6mZyblCys4)

When my company started writing blog posts a year ago, we discovered two big problems. One was that writing took a long time (majority of us are developers!), the other was distribution. We believe in contributing to the developer community, but what was the point if no one was reading them?

When one of our colleagues suggested we try Medium for more exposure, we were excited. We read stuff on Medium, but how does it work? What topics are Medium readers interested in? We wanted to do some research to answer all these questions. I have a technical background so I suggested crawling some data to see what types of posts and publications performed well. Here, I’ll share with you how we built a web crawler in a day to help our content team figure out what topics to focus on.  

![](/images/blogs/5d872b1048_67994f5c5908fb6007653aa0_1PXijbpzeZVGluY5MDckwCQ.webp)

Our results for the keyword “BaaS” (Backend-as-a-Serverless), which is related to our open-source product, Skygear

> **It only takes a day to write a useful web crawler for your content team.**

## Do you need a technical background to build a web crawler?

Building a web crawler does require basic coding skills. For this project I, I used the following:

*   [Codecademy](http://codecademy.com/) Python exercise (took about 3 hours and had 40% completion)
*   [Free Code Camp](http://freecodecamp.com/) front-end course (algorithm section)
*   [Scrapy](http://scrapy.org/) web crawler (written in Python)
*   Script Editor in Google Spreadsheet (JavaScript)

The goal is to extract data from Medium and represent it in a nice spreadsheet for my team to analyze like the one below.

![](/images/blogs/cecc560639_67994f5cf86d88345195fcc5_1elGvjnRffi4nwiYmqpHv0Q.webp)

We can also crawl based on publication and extract data such as tags and read length.

## Knowing what type of content we’re crawling.

First, we began by choosing the information we wanted and could probably extract, such as title, keywords, tags, and post length. We also manually researched the size of popular publications and popular writer followings. FreeCodeCamp has great insights from the [top 252 Medium stories of 2016](https://medium.freecodecamp.com/what-i-learned-from-analyzing-the-top-253-medium-stories-of-2016-9f5f1d0a2d1c).

> **How do we extract from all the different parts of a blog post on a page to insert the right data?**

However, not all sites store data the same way. There are structured data and unstructured data. Structured content includes RSS, JSON and XML that you can extract directly from to represent in an ordered way (such as a newsfeed or put on a spreadsheet). Unstructured content like Medium requires a two-step process of extracting data from HTML, then turning it into structured data.

No matter how different the layout of blogs or publications sites look, the data falls into two categories, structural and unstructured. Now, we need to choose a tool to help us build our crawler that will extract this data.

## Choosing your library: don’t build from scratch.

If you want to build something quickly like I did, open source tools are great. You can choose from a range of free crawler libraries for different programming languages. Here is [a list of libraries](http://bigdata-madesimple.com/top-50-open-source-web-crawlers-for-data-mining/) you can consider.

This time, I choose Scrapy as it is an open source Python library and well. They also have a great community support so beginners can ask for help easily.

## Using Scrapy to crawl data.

![](/images/blogs/a8c9c0c8ba_67994f5d211e09fdab3c8151_17rxCabgi9JfejokLGr1wew.png)

Our company loves open source and collaborative frameworks like Scrapy

## Install Scrapy

First, we will need to install Scrapy to your computer. You can follow the [guideline here](https://docs.scrapy.org/en/latest/intro/install.html) to install Scrapy on different platforms such as Windows, Mac OS X or Ubuntu.

## Install the start project

One of the best ways to get started is using their [start project](https://docs.scrapy.org/en/latest/intro/tutorial.html) since it helps you set up most of the configurations. Make a new directory and then run the following command after successful installation. (Or you can also read the documentation and set up everything yourself.)

You will see a spider folder in tutorial directory. Then go to `tutorial/spider`, open a new file called `stories_spider.py`. Then paste the below script in this file:

*   `name` : identifies the Spider.
*   `start_urls` : List of URLs you want to crawl. The list will be then used by default implementation of `start_requests()` to create the initial requests for your spider.
*   `parse()`: handles the response downloaded for each of the requests made.

For further details, you can reference the [Scrapy documentation](https://doc.scrapy.org/en/latest/intro/tutorial.html).

In order to crawl the data from Medium, we have to figure out the URLs & the paths of the data and put them to `stories_spider.py`.

## Study the website: URLs

Now, you will need to let the crawler know which site you want to crawl data from. You will have to pass the right URL to your Scrapy program. Don’t worry, you don’t have to input every post manually. Instead, look in the Archives that tell Scrapy to look at all the posts published within (usually) the time period.

Medium publications have a page call ‘Archive’, where you can find the blog posts published in the past few years. For example, the URL for 2016 is `https://m.oursky.com/archive/2016`

![](/images/blogs/1ee045bd75_67994f5c9e5bbde3d2284b79_1FjuTBiDQomAQsckj_-Zkw.webp)

You can search any publication with an archive and target date.

For Medium, you can find articles separated by year, then month, so you will have to input the URLs for the individual months.

Let’s crawl the Oursky publication from Jun 2016 — Feb 2017. I put the URLs in the `stories_spider.py`

So far so good? Hang in there, because it gets a bit trickier!

## Study the website: Identify the path of the components you want to crawl

![](/images/blogs/f2fd96a9e1_67994f5cdd39cae2d757a9bd_1z1S3xH09NK3aHBG4Pv206A.webp)

Tell your crawler which components you want to extract from the unstructured HTML data

Now, we need to find the right piece of information (i.e. date, author name, link) in the CSS expression or XPath expression. When you open the site HTML, you will find the tags & class name (or ID name) for every line of code. Copy those IDs into Scrapy so it can can extract.

CSS expression uses CSS selectors to get the DOM element while XPath expression queries the XML structure to get the element. Both CSS expression and XPath expression can be crawled. You can [reference Scrapy Documentation here](https://docs.scrapy.org/en/latest/topics/selectors.html) for the format of the CSS expression or XPath expression. I personally like CSS expression more since I think the syntax is easier to read.

Below, I will use CSS expression to do the demo.

Let’s crawl the author name. I open the console to view the HTML and find the CSS tags and classes of the author name. The process is the same for author link, article title, recommendation and postingTime. For Medium, I found this information under `div.u-borderBottomLightest`. Then I focused on finding their path after `div.u-borderBottomLightest`

I [listed a table for the CSS tags and classes of different elements](https://airtable.com/shrfVrLojKS2CL022/tblG0ENbX9EV5XiOD) and using this to write the codes in the program.

## Telling your crawler where to look

Scrapy provides the [Item](https://docs.scrapy.org/en/latest/topics/items.html) class to define common output data format. For the items you want to crawl, you have to declare them using a simple class definition syntax and `Field` objects.

Open `items.py` in `/tutorial`, declare all the items you need to crawl.

Now, save `items.py`.

One more thing: you will want to also crawl sites with a robot.txt setup. Scrapy has provided a solution to ignore the robot.txt document. Go to `/tutorial` and open `setting.py`.

Save the `setting.py` and open your terminal again.

## Extracting the Data as a JSON object

I wanted to extract the data as JSON object. I ran the following command in terminal

![](/images/blogs/712c93a57f_67994f5c9e5bbde3d2284b6e_1l9Jv-Qm8u46XevvmbQBbLw.png)

Command for crawling data

![](/images/blogs/8c9605916d_67994f5c0f76d341d9aeb8b8_1tzrCXftJBneN9nFd7bX2XA.png)

Completed

![](/images/blogs/822cfe4811_67994f5cba8a39e39ebe849b_1oVfCt9oXNzzvrk73yH1AXQ.webp)

stories.json

When it is done. You can see a Spider closed (finished). And I will have all the data in `stories.json`.

Now, it’s time to make all this information look a bit prettier.

## Import data to Google Spreadsheet.

Now, I want to represent the raw JSON data on Google Spreadsheet for my colleagues to reference and manipulate in a more convenient way.

First, create a new spreadsheet on Google Drive. Google Spreadsheets has a Script Editor function for you to integrate it to other programs. Open script editor for writing your program.

![](/images/blogs/c47821b9b7_67994f5cf80d7a7970e0df65_18_SgRuUfNirn1cI6OtGTTQ.webp)

Under Tools, there is a Script Editor

Steps for this program:

1.  Get the active spreadsheet and sheet
2.  Assign the JSON data to var info
3.  Loop through the data and write it on the sheet

You can try it yourself by referencing Google Spreadsheet Documentation. Below is my work.

![](/images/blogs/39833df99d_67994f5caa4593aa035f050d_1FIC77_fgRwdlQe0Eo9zA1A.webp)

JavaScript on Google Script Editor

Save and press Run. You will then see the result on the spreadsheet.

![](/images/blogs/58f7a4ef73_67994f5c0f76d341d9aeb8af_1AsBvNPU2OUcvJAqv0TRLzw.webp)

Everything on Spreadsheet. Other Team members can view themselves.

Done!

## What can you do with this data?

One of my technical colleagues always says, ‘When you need to spend 90 seconds daily to work on something, you should write a program for it.’ This saved my content colleagues hours of work. Instead, they could focus on brainstorming topics to write on that overlapped with Medium readers’ tastes.

Other things you can do, for example, is calculate correlations between key words / posting time / read duration and recommends (as a proxy for reads / popularity).

We looked at Medium’s top tech and startup publications in turn and learned a few things:

*   The biggest publications such as FreeCodeCamp and StartupGrind publish often
*   The largest tech publications had many posts that were 1000+ recommends
*   Many hit authors didn’t have to be famous
*   Not all tech topics were the same (for example, “Serverless” and “BaaS” didn’t have that many recommends relative to more generic tags such as “programming” and “tech”)

## How did this help us?

We have a lot of topics we are passionate about at Oursky. They can include [serverless products](http://www.skygear.io/) and [Tensorflow](https://medium.freecodecamp.com/why-i-gave-up-technology-specific-hiring-86cd75242b26) to [hiring developers](https://medium.freecodecamp.com/why-i-gave-up-technology-specific-hiring-86cd75242b26) and [building a team as an introverted founder](https://medium.com/personal-growth/how-i-attracted-awesome-team-members-as-an-introverted-founder-cd6c17cf627). By analyzing this data, we were able to focus on the topics that were interesting for us to write, and for the Medium community to read. Within three posts, our founder, [Ben Cheng](https://medium.com/@chpapa) became the top writer for the Startups section.

PS: One bonus tip from our content team based on our experience is that roughly 50 recommends is about 1000 views.

‍
