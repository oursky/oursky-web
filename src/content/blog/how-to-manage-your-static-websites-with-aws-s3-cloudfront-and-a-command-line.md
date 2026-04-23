---
title: "How to manage your static websites with AWS S3, CloudFront, and a command line"
description: "How to manage your static websites with AWS S3, CloudFront, and a command line"
pubDate: 2025-01-28
author: "Ben Cheng"
category: "development"
image: "https://cdn.prod.website-files.com/654ba60def05336c1f0eb138/67993d6d38bb3b02c87e5439_1zxIISvYq2_dz4R3THj17pA.jpeg"
draft: false
webflowId: "67993d8c320ba379f9b47141"
---

![](https://cdn.prod.website-files.com/654ba60def05336c1f0eb138/67993d7496cc2cace8581887_1zxIISvYq2_dz4R3THj17pA.jpeg)

Image by Samson via [Unsplash](https://unsplash.com/collections/211345/cyberpunk?photo=ZGjbiukp_-A)

Here’s a short list of things you shouldn’t need to worry about when setting up a static website:

*   scaling up your servers for surges in traffic
*   logging into the AWS Management Console just to upload a new index.html file
*   spending US$5 to host a single static website

I myself was sick of worrying about these things. So I learned some Go, developed a small command line tool over the weekend, and open-sourced it.

[AWS S3](https://aws.amazon.com/s3) is an affordable option for for hosting (and free for first time users), and [AWS CloudFront](https://aws.amazon.com/cloudfront/) is good for CDN. But setting up the two is a pain.  

The checklist is pretty long:

1.  set up S3 correctly
2.  configure CloudFront
3.  make sure you’ve followed best practices such as HTTP -> HTTPS redirection
4.  sync files
5.  invalidate CloudFront for updates.

Luckily, my open source [AWS-site-manager](https://github.com/oursky/aws-site-manager) makes hosting and updating a static site as simple as a single command line.

AWS Site Manager is a simple command-line tool that makes it easy to host a static website with AWS S3 and CloudFront, without running afoul of best practices.

If this is your first time hosting a site, create an AWS account and register your domain name with a service such as [Namecheap](https://www.namecheap.com/) (make sure you use their monthly discount coupon).

![AWS-s3-cloudfront-open-source](https://cdn.prod.website-files.com/654ba60def05336c1f0eb138/67993d752ad51c2aa8cdd91f_speedup-s3-cloudfront-thum2.png)

Combining AWS S3 and Cloudfront

## Why use S3 and CloudFront for static sites?

So given all the trouble, why bother with S3 and CloudFront? The two main reasons are:

1.  Affordability for features (compared to free Heroku dyno — which shuts down when you reach their inactivity limit — or Github.io — which doesn’t support HTTPS with custom domains)
2.  Speed (CloudFront is a cheap, but acceptable CDN)

Given the advantages, the only barrier was the setup, so we created a command line tool for convenient future usage. Below, I’ll walk you through how to set up this open-source site manager.

## AWS-site-manager does 2 things:

### 1\. Setup S3 and CloudFront with an opinionated configuration:

*   Create S3 buckets
*   Configure CloudFront Distribution and set up CNAME
*   Upload and set custom HTTPS certs
*   Redirect www to naked domains for better SEO
*   Redirect HTTP to HTTPS for better SEO (if HTTPS is enabled)
*   _Set up IAM / let’s encrypt cert automatically (coming soon)_

### 2\. Sync a local folder with S3

*   Gzip files for better site speed (will replace with CloudFront Gzip Setting)
*   Sensible default for HTTP Header (correct MIME type, max-age=900, etag etc)
*   Invalidate CloudFront distribution for files synced

## Getting started: Install

Download the binary for Linux / Mac / Windows [release here](https://github.com/oursky/aws-site-manager/releases/).

Or compile from sources: If you have [Go 1.6 or above installed](https://golang.org/dl/), run the following command:

`go get -u github.com/oursky/aws-site-manager   go install github.com/oursky/aws-site-manager   `

## How to Use AWS Site Manager

### 1\. Set up AWS Credentials and config.

If you haven’t set up AWS credentials on your environment before, you can set it up by putting the following lines in `~/.aws/credentials`.

`    aws_access_key_id=   aws_secret_access_key=    `

And in `~/.aws/config`

`    region=us-west-2    `

You should also set the environment variable of `AWS_SDK_LOAD_CONFIG`. If you’re on Linux / Mac using bash put the following line in `~/.bashrc`

`export AWS_SDK_LOAD_CONFIG=1   `

You can read more about AWS CLI set up on its [official documentation](http://docs.aws.amazon.com/cli/latest/userguide/cli-chap-getting-started.html).

### 2\. Use it!

Assuming you’re going to set up a website `example.com` and `www.example.com`, you can run:

`cd ~/my_html_css_js   aws-site-manager create --domain example.com --www   aws-site-manager sync --domain example.com   `

The commands above will:

*   set up a S3 bucket example.com and www.example.com
*   sync all files in local folder
*   redirect www.example.com to example.com

If you want to use https, and have the cert in PEM format ready, run the following command lines instead to setup HTTPS. (if your SSL registry sent you .key / .crt, [read this](http://stackoverflow.com/questions/991758/how-to-get-an-openssl-pem-file-from-key-and-crt-files))

`cd ~/my_html_css_js   aws-site-manager create --domain example.com --www --ssl --certBody body.pem --certChain chain.pem --privateKey key.pem   aws-site-manager sync --domain example.com   `

Finally, you need to set up DNS mapping to your CloudFront distribution endpoint. Consider using [AWS Route-53](https://aws.amazon.com/route53/) for that.

You need to setup a CNAME record to point your domain name to the Cloud Front Distribution. You can get your CloudFront Domain Name from AWS Management Console, then set your domain’s CNAME to the Domain Name.

![](https://cdn.prod.website-files.com/654ba60def05336c1f0eb138/67993d75d01fe4ac5d4848da_1TGXROtf37r5f-_ysbdornQ.png)

Screenshots of how to find the CloudFront Distribution Domain Name

If you need to update the site, just run `aws-site-manager sync –domain example.com` In the folder and the command will compare the file changes, upload new files to S3, and invalidate the CloudFront cache for you.

## Go forth and launch

This project solved a recurring problem for me and my team at [Oursky](https://oursky.com/). In addition to building mobile and web apps, we also often create one-off static sites that we want to be able to conveniently update every once in a while.

[AWS-site-manager](https://github.com/oursky/aws-site-manager) is open source and in its preliminary stages. If you want to contribute, you can create issues or submit a pull request.

If you have any questions about this project or serverless solutions in general, you can contact me here or on [Twitter](https://twitter.com/chpapa). Or, if you’re ever dropping by Hong Kong, come visit my office for a chat!

Enjoy!

PS: My company’s also working on another open-sourced project called [Skygear.io](https://skygear.io/), which is a free BaaS that includes features such as chat, social networks, bots, social logins, real-time and offline data sync, CMS for mobile, user management, etc.

‍
