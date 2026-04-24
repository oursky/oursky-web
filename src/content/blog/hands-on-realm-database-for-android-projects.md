---
title: "Hands on Realm Database for Android projects"
description: "Hands on Realm Database for Android projects"
pubDate: 2025-01-28
author: "Jim Chim"
categories:
  - "code"
displayCategory: "Code"
image: "/images/blogs/6f741420a1_679924a6635e53a391cbc08f_Screen-Shot-2015-04-30-at-5.41.10-pm-676x429.png"
draft: false
webflowId: "679924ba92400b3f2818f9ba"
---

In one of the Android app projects at [Oursky](http://www.oursky.com/), we started using [**Realm**](http://realm.io/) for data caching. So users won’t have to look at blank pages when they log back to the app, waiting for remote API results.

We think it’s a minimalistic yet reliable solution, and is worth giving it a shot for your next app. Just beware of the differences between versions, follow the conventions, and pay extra attention when using with other libraries.

More is discussed below in details and with example snippets.

## **What is Realm?**

Realm is the mobile database solution that  proposed as  a replacement for SQLite & Core Data.

It’s like using SQLite with an ORM (as those who used SQLAlchemy may have experience), with a lot of awesome and convenient methods for data transactions.

However, Realm is **NOT** built on top of SQLite. It persists on its own persistence engine.

Realm is  also cross-platform that supports both iOS and Android, so developers who write Java, Swift, Objective-C can share the same Realm files painlessly.

## **Getting Started**

To get Realm for your Android project, you can use either Maven or add a Jar into the project.

For more, see [the official installation guide](http://realm.io/docs/java/latest/)

## **So, is it cool?**

Realm is said to be lightweight and fast compared to traditional solutions, like using SQLite and a fully-fledged ORM.

Bundling Realm into your app saves space and is capable of doing pretty much the same thing.

IMHO, the simplicity and minimalistic nature of Realm is its biggest advantage, but also its limitation over other solutions at the same time.

This is how we define a `Post` record for Realm:

Realm realm = Realm.getInstance(this.getContext());realm.beginTransaction();Post post = realm.createObject(Post.class);post.setTitle("Awesome Topic Title");post.setBody("Main body passage we write along");realm.commitTransaction();

Query the first `Post`:

post = realm.where(Post.class).findFirst();

On the bright side, being fast and light-weighted is a huge advantage when it comes to building mobile applications.

The transaction on Realm is really fast. Also, using a light-weight SQLite + ORM alternative also means that your app will be slightly smaller, which might appeal to some users.

On the other hand, as a highly integrated tool, flexibility is sacrificed. Using Realm means that you will have to follow its strictly pre-defined methods and procedures.

For a traditional SQLite + ORM setup, if there is a case where the ORM of your choice cannot cater to, you can always write your own standard SQL code. This is something almost, if not entirely, impossible to do with Realm.

## **Some limitations**

However, _(till May 2015)_ there are serval limitations you might want to consider before using :

#### Getter and Setter Restrictions

Due to how the proxy classes override getters and setters in the model classes, there are some restrictions to what is allowed in a model class:

public class Person extends RealmObject {    private String name;    private int age;    public String getName() {        return name;    }    public void setName(String name) {        this.name = name;    }    public int getAge() {        return age;    }    public void setAge(int age) {        this.age = age;    }}

*   Only private instance fields
*   Only default getter and setter methods
*   Static fields, both public and private
*   Static methods
*   Implementing interfaces with no methods

So you can not extend anything else than `RealmObject` or to override methods like `toString()` or `equals()`.

#### Not supporting null values

You can not store `null` as a value for primitive data types (booleans, integers, floating-point numbers, dates, and strings). You will need an extra boolean field to capture if a field is null or not.

and further more listed [here](http://realm.io/docs/java/latest/#objects).

## **From SQLite to Realm**

Since our existing Android project has a SQLite database implementation. We want to move data from one to one, while in most cases, our app will only have one database – the default one.

It’s actually quite simple to apply the written migration to an app with a pre-existing app that has an outdated schema.

*   You will need a Java class that implements the RealmMigrations interface.
*   To avoid app crashes due to RealmMigrationNeededException you’d want to do something like this in the main/landing activity of the app – before any attempt to call `Realm.getInstance()`try {  
       Realm.getInstace(this); // getting the default realm instance  
    }  
    catch (RealmMigrationNeededException exception) {  
       // do your migration here  
    }
*   The following line will initiate the migration (in an activity)String realmPath = getFilesDir() + "/default.realm"; // location of the default realm file.  
    Realm.migrateRealmAtPath(path, new Migration());  
    // NOTE, you will need the Migration class written before doing this
*   The Realm’s official migration example is actually quite clear on this one, so follow that example, for the actual migration.
*   To ensure the app does not keep crashing because of migration error, you might want to add another try block after attempting to implement the migration that force delete the pre-existing realm file.try {  
       Realm.getInstance(this);  
    }  
    catch (RealmMigrationNeededException exception) {  
       Realm.deleteRealmFile(this);  
    }

## **Overall**

Generally speaking, Realm is a reliable mobile database solution.

Realm works as advertised, but Realm is still a rapidly growing and evolving project. Be sure to follow the [latest release](http://realm.io/docs/java/latest/api/) , some problems that requires tens line of custom code before might be handled for you by Realm with a single method (e.g. storing an array of object into Realm, update existing record instead of inserting new record when applicable).

Realm for the Cocoa framework and Realm for Java are both available on GitHub under the Apache 2.0 license.

Happy DBing.

## **Resources**

**Official Site for Realm  
**[https://realm.io/](https://realm.io/)

**Realm Full API for Java  
**[http://realm.io/docs/java/latest/api/](http://realm.io/docs/java/latest/api/)

**Realm Browser  
**To inspect your ream data. Only available on Mac OS X till now _(May 2015)  
_If you are interested, it’s inside [tools/RealmBrowser](https://github.com/realm/realm-cocoa/tree/master/tools/RealmBrowser) in the [Realm GitHub repository](https://github.com/realm/realm-cocoa/).

‍
