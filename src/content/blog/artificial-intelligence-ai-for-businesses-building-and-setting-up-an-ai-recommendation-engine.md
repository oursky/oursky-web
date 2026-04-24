---
title: "Artificial Intelligence (AI) for Businesses: Building and Setting Up an AI Recommendation Engine"
description: "We take a closer look at AI-powered recommendation engines — and what you need to prepare and the tools you can use to build one."
pubDate: 2025-01-28
author: "May Yeung"
categories:
  - "machine-learning-and-ai"
displayCategory: "AI and Machine Learning"
image: "/images/blogs/62ba1c70d2_66e31a125f7a4f3b93322003_pexels-cristian-dina-1851415-scaled.jpg"
draft: false
webflowId: "66e31a727d296e49b395ff21"
---

For this guide, we’ll walk you through the following:

*   Types of recommendation systems to see which one suits your business needs
*   Tools and other options available for setting up one
*   What you need to prepare before building one
*   The costs involved in creating and implementing an AI recommendation engine

![](/images/blogs/ccada0a4d9_66e31a44917176679596b0bd_pexels-cristian-dina-1851415-1160x773.jpeg)

PHOTO BY [**CRISTIAN DINA**](https://www.pexels.com/@cristian-dina-924373?utm_content=attributionCopyText&utm_medium=referral&utm_source=pexels) FROM [**PEXELS**](https://www.pexels.com/photo/white-smartphone-1851415/?utm_content=attributionCopyText&utm_medium=referral&utm_source=pexels)

## What’s an AI recommendation engine?

An AI recommendation engine is a system that uses AI to suggest information, products, and services to end users based on analyzed data. This “recommendation” could be derived from a variety of factors, including the user’s digital habits, as well as histories, preferences, interests, and behaviors of similar users.

## What is an AI recommendation engine used for?

An AI recommendation engine is an efficient way for companies to provide its customers with personalized information or solution. Look no further than Netflix, Amazon, and Google to see how AI recommendation engines are used to personalize customer experience. B2C companies, too, benefit from an AI recommendation system by delivering better user experience, engaging with more users, and increasing their retention.

So why incorporate a recommendation engine to your digital product or service? You’d be surprised to know that [35% Amazon’s revenue](https://www.mckinsey.com/industries/retail/our-insights/how-retailers-can-keep-up-with-consumers) is generated thanks to its recommendation engine. Spotify, using its recommendation system to suggest playlists and new songs, increased its monthly users from 75 million to [100 million](https://www.bloomberg.com/news/articles/2016-09-21/spotify-is-perfecting-the-art-of-the-playlist) despite stiff competition against Apple Music.

## What are the different kinds of recommendation systems?

There are different types of recommender systems, each of which using various techniques and approaches to generate a prediction. Implementing one would largely depend on your use case (i.e., how it will address your business need), the scope of your project, and the amount and quality of your data. Generally, there’s content- and collaborative filtering-based recommender systems, with the latter split into memory- and model-based approaches.

![](/images/blogs/2f8f9b159f_66e31a45c29f2148873124d1_ai-for-business-reco-1.png)

AN OVERVIEW OF THE DIFFERENT KINDS OF RECOMMENDATION SYSTEMS

![](/images/blogs/6fc83f2c18_66e31a45c8cfac8c33ea97c6_ai-for-business-reco-2-e1600925303457-1160x728.png)

A MORE DETAILED VISUALIZATION OF THE DIFFERENT KINDS OF RECOMMENDATION SYSTEM

Content-based recommendation systems use filters based on the explicit feedback, attributes, keywords, or descriptions of products or services that the user likes. The algorithm recommends items based on what the user liked or currently looking at.

Recommendation systems that use collaborative filtering sift through items based on the reactions of similar users. These systems search a large group of users then find a similar set of people with similar preferences to that particular user. They then look at the items they like, combine them, then create a ranked list of recommendations. Systems that use collaborative filtering have two sub-groups and uses different approaches:

*   Model-based — Uses machine learning (ML) and involves extracting information (e.g., ratings, feedback, reviews, etc.) from data sets and using that to build an ML model
*   Memory-based — Analyzes a data set to find or establish correlations and similarities between other users or items in order to make a recommendation

## What is content-based filtering?

Content-based recommendation systems work with the data the user provides, either through explicit and implicit feedback. As the user provides more inputs or takes more actions on the initial recommendations, the engine/system becomes more accurate. It is less cumbersome as it only needs to analyze data from a single user profile, but at the same time, it may also be limited. It may produce inaccurate results if there’s not enough data, or if interdependencies and more complex user behaviors are needed to be taken into account.

![](/images/blogs/dffccac78d_66e31a45c12a4bd53ddf26cb_ai-for-business-reco-3.png)

AN OVERVIEW OF A RECOMMENDATION SYSTEM THAT USES CONTENT-BASED FILTERING

## What is collaborative filtering?

[Collaborative filtering](https://takuti.github.io/Recommendation.jl/latest/collaborative_filtering/) works on the assumption that users who agreed or liked in the past tend to do the same in the future. A key concept in collaborative filtering is that it employs the other users’ feedback or rating as a leverage in generating predictions for a particular user.

As shown below, collaborative filtering involves analyzing data, typically laid out in a matrix, which contains a set of items and a set of users with similar preferences who have indicated their reactions. These include explicit ratings (e.g., liking or disliking, rating on a scale of one to 10, one to five-star reviews, etc.) or implicit feedback (e.g., viewing, adding to a wish list, time spent on the page, etc.).

These reactions and feedback are collated then analyzed for similarities and correlations. As shown in the image below, the predictions can take the form of:

*   User-to-user recommendations, which takes into account variables like mutual friends and similar backgrounds or age
*   Item-to-item recommendations, which are adopted by Amazon, YouTube, and LinkedIn
*   User-to-item recommendations, which are used by many e-commerce businesses to suggest products or services based on user preferences or profiles (i.e., a tennis player or enthusiast will have an affinity for tennis-related products)

Check out this [resource](https://towardsdatascience.com/various-implementations-of-collaborative-filtering-100385c6dfe0) by Amazon Web Service’s Prince Grover if you want to delve deeper into collaborative filtering and its various implementations.

![](/images/blogs/7ab1c86cd6_66e31a455bff5e0a494dbc3b_cf.png)

_SOURCE/CREDIT TO:_ [_TAKUYA KITAZAWA_](https://github.com/takuti) _VIA_ [_RECOMMENDATION.JL_](https://takuti.github.io/Recommendation.jl/latest/collaborative_filtering/#k-Nearest-Neighbor-1)

![](/images/blogs/d4ed4f690f_66e31a45cff81fcead3ee3dd_ai-for-business-reco-4.png)

![](/images/blogs/14b5d74331_66e31a45b7441075464b2cdb_ai-for-business-reco-5.png)

A VISUALIZATION SHOWING COLLABORATIVE FILTERING (TOP) AND HOW USER-TO-USER (CENTER) AND USER-TO-ITEM RECOMMENDATIONS WORK (BOTTOM)

## What tools can I use for setting up a recommendation engine?

You can use [pre-trained and custom models](https://blog.oursky.com/2020/05/07/artificial-intelligence-ai-for-businesses-what-you-need-to-know-before-starting-an-ai-project/) for building an AI recommendation engine. Pre-trained models are built on top of an existing model, while custom models are built from scratch.

There are several options if you use pre-trained models, such as [Google Cloud Recommendation AI](https://cloud.google.com/recommendations), [Amazon Personalize](https://aws.amazon.com/personalize/), or [Azure Personalizer](https://azure.microsoft.com/en-us/services/cognitive-services/personalizer/). The obvious advantages are that less development effort and fewer data are needed. However, solely using pre-trained models might not be suitable for your customers or targeted users, and these models may not be flexible enough to be adjusted or updated.

As its moniker implies, custom models give you more options, techniques, and approaches at your disposal — whether you’re using a k-nearest neighbors (KNN) algorithm, matrix factorization, or neural network, among others. There is no “best” technique or approach: It will all depend on the quality, kind of inputs, and amount of your data. It’s not a one-off thing either — you have to experiment and iterate as you go along to achieve optimal results.

Custom models have the advantage of being built according to your actual users and their behavioral data, giving you the flexibility to fine-tune your model and add or remove model inputs as needed. The drawback is that they’re more expensive to develop, not to mention you need bigger data sets for the recommendation system to provide more meaningful results.

There are also open-source and proprietary tools and libraries you can use. For content-based recommendation systems, Azure offers several [scalable personalization](https://docs.microsoft.com/en-us/azure/architecture/example-scenario/ai/scalable-personalization) tools and services, including [Azure Databricks](https://azure.microsoft.com/en-us/services/databricks/). Microsoft also has a [GitHub repository for building recommendation systems](https://github.com/microsoft/recommenders).

For collaborative filtering-based recommendation systems, there are several projects and platforms you can explore, such as:

*   [LibRec](https://guoguibing.github.io/librec/index.html) — a Java library for recommendation systems
*   [SUGGEST](http://glaros.dtc.umn.edu/gkhome/suggest/overview) — a Top-N recommendation engine that implements user- and item-based collaborative filtering
*   [Implicit](https://github.com/benfred/implicit) — Provides Python implementations of recommendation algorithms for data sets that have implicit feedback
*   [Apache PredictionIO](https://predictionio.apache.org/) — Provides a machine learning server from which you can create a recommendation system
*   [The Universal Recommender](https://github.com/actionml/universal-recommender) — Built on Apache’s correlated, cross-occurrence algorithm that can use different kinds of inputs (e.g., user actions, profiles, contexts, metadata, etc.) to improve the quality of predictions
*   [Recommendation.jl](https://github.com/takuti/Recommendation.jl) — A customizable package written in Julia for building recommendation systems

## How much does an AI recommendation engine cost? What to do I need to prepare to set up one?

For pre-trained models from cloud service providers like AutoML, less data and financial investment are needed. The starting costs will be around US$2,000 – 5,000. As a starting point, the size of the data set could approximately include 1,000 rows’ worth of data in Excel.

For custom models, an early model development will be at least US$50,000. This accounts for the additional cloud consumption for model training. Depending on the size of your data, an early investment would be more or less US$500 per month. There will be ongoing model enhancement costs as well, depending on the number and types of iterations of the project.

A more practical alternative is to start with a pre-trained model then progressively switch to the custom-build model. Another option, if you have sufficient data set, is to work on a minimum proof of concept (PoC) then incrementally enhance the PoC’s capabilities.

Regardless of what approach you choose, the first thing you need to do is to start collecting the data. Factor in the time and resources needed to cleanse your data and make sure they don’t infringe on user privacy.

## Real-Life Examples of Using an AI-Powered Recommendation Engine

Over the years, we’ve worked with many startups and enterprises in incorporating AI-based recommendation engines in their projects or applications. In one of our successful projects, we helped a startup by developing an algorithm to [predict which team will win in NBA games](https://blog.oursky.com/2019/11/26/machine-learning-applications-nba-predictions/). We implemented the model using recurrent neural network (RNN) and long short-term memory (LSTM). This project helped create content for their target audience and subsequently improved their user engagement.

Another AI project we did was with a B2C multinational that was exploring ways to expand and set up more branches without cannibalizing its already existing stores. We developed a PoC — which we continued to iterate — that predicted the optimal location for a new store and included the capability to see how a new shop will affect nearby and existing ones. For this project, we developed an Extract, Load, Transform (ELT) flow and integrated it with TensorFlow for model training.

We also incorporated an AI recommendation engine to an online marketplace platform in order to provide a more personalized customer experience. We implemented this by analyzing search inputs and histories, real-time locations, and transactions, among others. The AI recommendation engine helped determine what listings to show along with their rankings, which were based on the users’ behavioral data. After implementing this, the five-day retention rate of the app increased by 22% within two weeks. The marketplace also saw improvements in the unique and send-message conversion rates. This project, in fact, won the best app of 2017 in the App Store under the leisure category.

Oursky has a team of data scientists, AI and machine learning experts, and dedicated developers who work on AI projects for startups and enterprises across different industries. [Get in touch with us](https://oursky.com/contact/) if you’re exploring AI solutions to your business, whether an AI-powered chatbot, prediction models, or recommendation engines.

‍
