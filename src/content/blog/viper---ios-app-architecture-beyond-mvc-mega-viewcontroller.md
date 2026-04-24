---
title: "VIPER – iOS App Architecture Beyond MVC (Mega-ViewController)"
description: "The MVC Architecture is generally used in developing iOS applications.However the “ViewController” approach widely used is the most evil part that messes up Views and Controllers: Developer writes both view animation and business logic in the UIViewController, hence introducing a MEGA-ViewController.In this passage, we will share our experience on how VIPER saves our lives from this monster in one of our projects."
pubDate: 2025-02-07
author: "David Ng"
categories:
  - "code"
displayCategory: "Code"
image: "/images/blogs/404d12a10d_673e2c371a8b4b3fe0c235c3_viper-.png"
draft: false
webflowId: "673e2c545b10a93fb3c7a09c"
---

The MVC Architecture is generally used in developing iOS applications.

However the “ViewController” approach widely used is the most evil part that messes up Views and Controllers: Developer writes both view animation and business logic in the UIViewController, hence introducing a **MEGA-ViewController**.

In this passage, we will share our experience on how [VIPER](http://www.objc.io/issue-13/viper.html) saves our lives from this monster in one of our projects.

VIPER is not a framework  but an approach to iOS application architecture, which stands for:

*   View
*   Interactor
*   Presenter
*   Entity
*   Routing(Wireframe)

## **The “MVC” monster**

![mega-viewcontroller monster](/images/blogs/92af61c51c_679924090c1b6110b87cc009_673e2c1ef6d8866fd1b57af6_mega-vc-1024x604.jpeg)

Typical **Model** objects are simple, they are just [NSManagedObject](https://developer.apple.com/library/ios/documentation/Cocoa/Reference/CoreDataFramework/Classes/NSManagedObject_Class/index.html).

**View** and **Controller** are wrapped in a single UIViewController class. The [UIViewController](https://developer.apple.com/library/ios/documentation/UIKit/Reference/UIViewController_Class/) class constraints the fundamental view management of the iOS app. As the name convention suggests,  view controllers often handle both business logics and logics for responding to user interactions.

For smaller scale applications (with less model and UI interactions), this should not be a nightmare.

But when we were building a slightly more complex application that includes several models and live UI updates, this leads to the most evil situation: resulting of a **MEGA-ViewController**. This makes the typical view controllers massive and difficult to test.

The resulting ViewController actually violates the original MVC design that _views are not supposed to have access to models_.

## **Introducing VIPER**

VIPER is an architecture based on the Single Responsibility Principle. There are several components working together to build up the application flow.

![viper-layout](/images/blogs/1a92d327e6_679924090c1b6110b87cc00e_673e2c1e8b9b46101fb646fa_viper-layout.png)

#### VIEW

The view consists of views and view controllers. It is responsible to receive user interactions and pass them to presenters for decision making. To keep the view simple, it shouldn’t contain any view logics. This is where to define how the view looks like, and nothing beyond this.

#### PRESENTER

The presenter defines the view logics, e.g. when to show a warning message or highlight a button. It is responsible to prepare content for the view to display. Whenever data is required, the presenter requests data from interactors (but not directly from the model).

#### INTERACTOR

The interactor mainly contains business logic, e.g. logging in the user /  processing a purchase / sending a friend request. It should be independent of the UI. It only handles requests from the presenter and prepare corresponding data regardless of how the view looks like.

#### ENTITY

Entities are the model objects manipulated by an Interactor **and only by the Interactor**. It is simply an NSManagedObject. It is model orientated and therefore should not contain any business logic.  
Something like  is not supposed to be placed inside an Entity.

#### ROUTING (WIREFRAME)

Wireframe defines the routes from one screen to another. In VIPER, the responsibility for Routing is shared between the presenter and the wireframe.  
When the presenter receives user interactions and decided to navigate to another screen, it will use the wireframe to perform the desired navigation (to which screen and how to navigate). The wireframe can also contain transition animations.

## **What does VIPER help us achieve?**

![viper-monster](/images/blogs/5071c59ee9_679924090c1b6110b87cc01a_673e2c255834a7e156a6de0f_viper-monster-1024x583.jpeg)

If MVC is a mega-monster that troubles you, VIPER is a little-monster-collection that aids you in building iOS apps – in a more delightful and controllable way.

By implementing the VIPER architecture, we successfully break down complex logical structures into layers of well-defined responsibilities. And yes, we did this in the early architecture design phase.

Now, we can finally say “good-bye” to the Mega-ViewControllers.

By separating responsibilities, it also enhances isolating dependencies. This makes testing and debugging much easier. Since the physical files are becoming smaller and putting more focus on their corresponding responsibilities , it facilitates team collaboration.

## **Code Example**

To help illustrate how we work with VIPER, in this example, we would like to show how we define components for a signup page.

At the first time the app launch, we have a **SignupViewController** as the rootViewController of **AppDelegate**.

#### **View**

![app-login](/images/blogs/4352010fbd_679924090c1b6110b87cc011_673e2c1e094173ab4139c204_app-login-577x1024.jpeg)

![app-signup](/images/blogs/f1b6438bdf_679924090c1b6110b87cc017_673e2c1e770dc3fd276e013f_app-signup-577x1024.jpeg)

#### Presenter

@interface LoginPresenter- (void)loginButtonTapped:(NSString \*)email password:(NSString \*)password;@end@protocol LoginPresenterProtocol- (void)showErrorMessage:(NSString \*)message;@end

#### Interactor

@protocol LoginInteractorProtocol <NSObject>- (void)requestSuccess;- (void)requestFailed:(NSString \*)errorMessage;@end@interface LoginInteractor : NSObject <ETRequestManagerProtocol>- (id)init:(NSString \*)emailpassword:(NSString \*)passworddelegate:(id<LoginInteractorProtocol>)delegate;- (void)startRequest;@end

#### Wireframe

@interface WireFrame : NSObject- (void)navigateToMainScreen;@end

## **VIPER Checklist**

To get started easier, we’ve prepared a list of notes to make sure everything follows the VIPER’s design principle. We hope this will be useful to you also as we find it to be.

**Views** and **view controllers** receive user interactions and pass them to presenters for decision making

**Presenters** contain the view logics and prepare content for display and reacting to user inputs

**Presenters** **should** **not** know about the existence of all UIViews

**Interactors** contain business logics and they should be independent of UI

**Entities** are  model objects manipulated by **Interactors**

**Wireframe** is the only place to define screen navigations and their transition animations

### **Conclusion**

We hope you enjoyed reading this post. If you also find the “Mega-ViewController monster” a nightmare for your iOS Application, VIPER might be one of the solutions.

As said in the very beginning, VIPER is an proposed architecture that components should be defined according to your own usecase. And we find this structure quite suitable for most Startup usecases 🙂

We will continue to share our experience in exploring interesting yet useful engineering technologies and tools in the future.

If you have any thoughts or comments, please do not hesitate to comment below.

## **More Resources**

**VIPER on objc.io**  
[http://www.objc.io/issue-13/viper.html](http://www.objc.io/issue-13/viper.html)

**Blog by Brigade Engineering sharing about VIPER**  
[https://medium.com/brigade-engineering/brigades-experience-using-an-mvc-alternative-36ef1601a41f](https://medium.com/brigade-engineering/brigades-experience-using-an-mvc-alternative-36ef1601a41f)

‍
