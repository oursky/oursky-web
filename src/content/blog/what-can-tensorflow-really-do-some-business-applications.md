---
title: "What can TensorFlow really do? Some business applications"
description: "What can TensorFlow really do? Some business applications"
pubDate: 2025-01-28
author: "Athena Lam"
categories:
  - "machine-learning-and-ai"
displayCategory: "Machine Learning and AI"
image: "/images/blogs/278184106d_6799525493bdb1ce79fd97ef_xIp6NSz.jpg"
draft: false
webflowId: "6799526c3d41623f5f3d80d3"
---

![TensorFlow logo](/images/blogs/91e20071c0_6799524ca48dced294109882_xIp6NSz-720x405.jpeg)

_TL;DR: Google’s open-source TensorFlow library helps developers build computational graphs and contains free_ [_additional modules_](https://www.tensorflow.org/api_docs/python/tf/contrib) _that make AI/ML software development easier for consumer products and mobile apps. Developers require knowledge of Python or C++. This piece covers 3 common modules and possible business applications:_

*   _Convolutional Neural Networks (CNN) for image recognition_
*   _Sequence-to-Sequence (Seq2Seq) models for human language_
*   _Large-scale linear models for data analysis_

## What’s in TensorFlow?

Open-sourced in 2015, TensorFlow is a framework by Google for creating deep learning models. Deep Learning is one of several categories of machine learning (ML) models that use multi-layer neural networks. The TensorFlow library allows users to perform functions by creating a computational graph.

TensorFlow took the world by storm because it is free, (relatively) easy to use and gives developers with entry-level machine learning backgrounds access a powerful library instead of building all their AI models from scratch. TensorFlow and its accompanying modules make ML/AI software development for both mobile apps and backend services easier.

## How does TensorFlow fit into AI and Machine learning?

Tensorflow is _one of_ many machine learning libraries (other examples include [CNTK](https://github.com/Microsoft/cntk) and [Theano](https://github.com/Theano/Theano)). Machine learning is a field of computer science that gives [computers](https://en.wikipedia.org/wiki/Computer) the ability to learn without being explicitly programmed.[\[1\]](https://en.wikipedia.org/wiki/Machine_learning#cite_note-1) For example, [AlphaGo Zero](https://deepmind.com/blog/alphago-zero-learning-scratch/)‘s AI taught itself to play Go and outperformed its predecessor, AlphaGo, which had defeated the world champion in Go. Machine learning is useful for tasks where explicit algorithms don’t yield good results, such as user screening, sorting high context data and clustering for predictions and profiling.

Practical examples include detecting fraud or data breaches, [email filtering](https://en.wikipedia.org/wiki/Email_filtering), optical character recognition (OCR), and ranking.

In the next section, we’ll demystify the computational graph, which is essential for understanding how TensorFlow works in human-speak.

## Trigger Warning: Computational graphs and a bit of theory

One of the most common terms heard in AI is neural networks. Neural networks are a type of computational graph. A computational graph is a directed graph where operations or variables can be nodes that feed into each other. Every node in the graph can, therefore, define a function of the variables. Most deep learning models, AI, and neural networks, are just math models. We can use computational graphs to represent and implement different maths models.

![http://www.deepideas.net/deep-learning-from-scratch-ii-perceptrons/](/images/blogs/1bf91b113e_6799524c7b48cb88eccf0951_computational-graph-inputs.png)

Image Source: [Deep Learning from Scratch](http://www.deepideas.net/deep-learning-from-scratch-i-computational-graphs%3E%3C/a%3E%E2%80%9CDeep%20Ideas%3C/figcaption%3E%3C/figure%3E%3Cp%3EOne%20of%20the%20most%20common%20terms%20heard%20in%20AI%20is%20neural%20networks.%20Neural%20networks%20are%20a%20type%20of%20computational%20graph.%20A%20computational%20graph%20is%20a%20directed%20graph%20where%20operations%20or%20variables%20can%20be%20nodes%20that%20feed%20into%20each%20other.%20Every%20node%20in%20the%20graph%20can,%20therefore,%20define%20a%20function%20of%20the%20variables.%20%20Most%20deep%20learning%20models,%20AI,%20and%20neural%20networks,%20are%20just%20math%20models.%20We%20can%20use%20computational%20graphs%20to%20represent%20and%20implement%20different%20maths%20models.%3C/p%3E%3Cp%3EIf%20you%20have%20some%20memory%20of%20linear%20algebra%20and%20calculus,%20you%20should%20check%20out%20this%20great%20tutorial%20called%20%3Ca%20href=)

If you have some memory of linear algebra and calculus, you should check out this great tutorial called [Deep Learning from Scratch](http://www.deepideas.net/deep-learning-from-scratch-i-computational-graphs/).

## What do developers need to do to use TensorFlow?

TensorFlow was created with processing power limitations in mind (check [TensorFlow Lite and TensorFlow Mobile](https://www.tensorflow.org/mobile/)), making it easier for mobile and web developers to make use of the library and create AI-powered features for consumer products. Developers with a basic background in neural networks can use the framework for data sets, estimators, training and inference.

Developers with no background in neural networks may want to start with a higher-level neural network API, such as [Keras.io](https://keras.io/). Written in Python, Keras is capable of running on top of [TensorFlow](https://github.com/tensorflow/tensorflow), [CNTK](https://github.com/Microsoft/cntk), and [Theano](https://github.com/Theano/Theano) and is good for easy and fast prototyping.

**To start with TensorFlow, a developer needs to know:**

*   Python or C++
*   A little bit about `arrays` (specifically the `numpy.array`, which is provided by Numpy, a numerical computation library for Python, that Tensorflow uses to deal with an array/matrix)

## 3 Common Applications for TensorFlow

The [many modules included in the TensorFlow library](https://www.tensorflow.org/api_docs/python/tf/contrib)can perform a variety of functions known as AI/ML. Below are three commonly used modules:

*   **Convolutional Neural Networks (CNN) for image recognition and processing**
*   **Sequence-to-Sequence (Seq2Seq) models for human language-related features**
*   **Large-scale linear models for data analysis and simple behavioural predictions**

Below, we’ll list out some examples for commercial and consumer applications:

### **Convolutional Neural networks (CNN) and** [**Image Recognition**](https://www.tensorflow.org/tutorials/image_recognition)

![AI face detection feature](/images/blogs/abbe09be1e_6799524ce5c70fc684f88b70_Oursky-Xmas-Party-Slides-1.jpeg)

We used a [dilib](http://blog.dlib.net/2014/08/real-time-face-pose-estimation.html) for our [facial landmark detection](https://pdfs.semanticscholar.org/d78b/6a5b0dcaa81b1faea5fb0000045a62513567.pdf) on a client app.

One of the many applications for [CNNs](http://colah.github.io/posts/2014-07-Conv-Nets-Modular/) is to help machines recognize images and make them meaningful in a way that is intuitive to humans. For example, this means having a computer recognizing the coloured dots in an image combine to become a cake. In order to check accuracy, an AI can be trained on a training data where correct answers are already available. The CNN will learn to identify an image, check if it is correct, and improve its ability to make sense of the coloured clusters. But a true performance is giving AI a new dataset to see how it performs.

![AI business application hong kong](/images/blogs/6c5bb245c7_6799524ca75bd78e4bb15170_Oursky-Xmas-Party-Slides-2.jpeg)

Oursky compared two machine learning libraries to help a client use image classification for inventory matching.

**Transfer learning** is a shortcut technique that takes a fully-trained AI model and repurpose it for new image classification rather than retraining an AI model from scratch every time. ImageNet is a good resource for providing an image training data set.

CNN can be applied in a range of fields such as:

*   **image classification** for business applications like [our client case of matching and sorting inventory](https://code.oursky.com/tensorflow-svm-image-classifications-engine/)
*   **medical diagnostics** to match patient image data with known visual symptoms for medical conditions
*   **line sensors for sports** for judging in-out based on high resolution image data
*   **risk assessment** for applications (such as for insurance or a credit card)

The benefits of starting early with AI/ML is that early adopters will have larger datasets to work with than competitors years from now.

### Sequence-to-Sequence models and human language

![sequence to sequence language](/images/blogs/186583028e_6799524c3d41623f5f3d6206_tenorflow_cantonese_mini_english_Final.007.webp)

Implementing TensorFlow’s Sequence-to-Sequence framework for chatbot conversation.

Sequence-to-Sequence (Seq2Seq) models use [recurrent neural networks](https://www.tensorflow.org/tutorials/recurrent) as a building block by feeding lots of sentence pairs during model training so that we can generate one sentence from another sentence. These sentence pairs can be anything. For example, when it is words from two different languages, the model can be used for translations. When it is a pair of conversational messages, the model can be used for chat bots.

One interesting point is that we just need to feed in a raw word sequence and we can get back a word sequence output with mostly correct grammar (not perfect, but at least understandable). This means that seq2seq models can learn the language model from the training sample and implicitly learn it during training, which usually is not the case in traditional NLP where the language model needs to be explicitly taught.

![artificial intelligence chatbot](/images/blogs/a11434e126_6799524cff9dc23d3b01c890_tenorflow_cantonese_mini_english_Final.015.webp)

Oursky trained a [Cantonese chatbot](https://www.facebook.com/oursky.hk/posts/10155107424981485) from scratch using local forum data.

Language modeling (in short, the probability a word is going to appear given previous sequence of words) is key to many interesting problems such as:

*   Speech recognition for real-time subtitling
*   AI chatbots, such as our [Cantonese Chatbot for Telegram](https://www.facebook.com/oursky.hk/posts/10155107424981485)
*   Virtual assistants like Apple’s Siri, Amazon’s Alexa, and the Google Assistant
*   Machine translation
*   Summarize documents
*   Batch image captioning

### Large-Scale Linear models

[Large-scale linear models](https://www.tensorflow.org/tutorials/linear) are more simple than complex neural networks with many layers. But going on the principle of using the right tool for the right job, linear models are still powerful when applied for the appropriate cases. Compared to deep neural nets, linear models train more quickly, can work well on large feature sets, and be interpreted and debugged more easily. As a general approach, linear models are effective for data crunching and making simple predictions to help businesses with large datasets.

Linear models can be used for binary classification (predicting _a_ or _b_ outcome), multiclass classification (predicting one of multiple outcomes) and regression (predicting a numeric value). These models can be used for evaluating big data, such as census data or financial data.

As an example, [Amazon ML](http://docs.aws.amazon.com/machine-learning/latest/dg/machine-learning-concepts.html) uses linear models in ecommerce to help make suggestions for sellers such as:

*   Will the customer buy this product or not buy this product? (Binary Classification)
*   Is this product a computer, smartphone, or accessory? (Multiclass Classification)
*   What is an appropriate price for this car model and vintage? (Regression)

Of course, we’ve just scraped the surface of what AI/ML can do. If you would like to learn more about how AI-powered features can be incorporated into your product, [get in touch](https://oursky.com/contact/).

‍
