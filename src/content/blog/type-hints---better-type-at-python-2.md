---
title: "Type Hints – Better type at Python"
description: "Type Hints – Better type at Python"
pubDate: 2025-01-28
author: "Rick Mak"
categories:
  - "development"
displayCategory: "Python"
image: "/images/blogs/7bc189e0d4_679927f66d380fa2db7d03d8_type-hints-cover.gif"
draft: false
webflowId: "6799286dc784dff69b0754a0"
---

![Type Hints – Better type at Python](/images/blogs/7132217b26_679927fe3a98e00badef85ad_type-hints-cover.gif)

‍

Python is known as a dynamic, (https://wiki.python.org/moin/Why is Python a dynamic language and also a strongly typed language) language. Most developers love it but some feel mad without type checking or type-hinted auto-completion. In Python3.5, [Type Hints](https://www.python.org/dev/peps/pep-0484/) is introduced to further delight developers who want those features.  

Type Hints offers type checking on function parameters, return values and class attributes, _as if_ it’s static-typed. If you pass something does not match the expected type, a warning will be given.

According to [The Theory of Type Hints](https://www.python.org/dev/peps/pep-0483/), here’s an example showing how the rules work out in practice:

Say there is an `Employee` class, and a subclass `Manager`:

‍

**`class`** `Employee:`

   **`pass`**

**`class`** `Manager(Employee):`

   **`pass`**

Let’s say variable e is declared with type `Employee`:

`e` **`=`** `Employee() # type: Employee`

Now it’s OK to assign a `Manager` instance to e:

`e` **`=`** `Manager()`

It’s not OK to assign an `Employee` instance to a variable declared with type `Manager`:

‍

`m` **`=`** `Manager() # type: Manager`

`m` **`=`** `Employee() # Fails static check`

Now, suppose we have a variable whose type is [Any](https://www.python.org/dev/peps/pep-0484/#the-any-type):

`a` **`=`** `some_func() # type: Any`

It’s OK to assign `a` to `Employee e`:

`e` **`=`** `a # OK`

Of course it’s also OK to assign `Employee e` to `a`:

`a` **`=`** `e # OK`

## Benefits

By introducing Type Hints in Python, it makes Python even more friendly to programmers. At least it helps prevents premature-idiot bugs regarding type errors. And there are more benefits we might consider:

### Make IDE to work better

IDE like [PyCharm](https://www.jetbrains.com/pycharm/) can perform type checking on variable assignments and return values in local functions. Since type information is crucial for static code analysis, this also make code completion easier.

![pycharm](/images/blogs/3a5da67d54_66e347fccf9939c6d3b7320a_pycharm.png)

‍

### Improve code readabilty

We often emphasize **Code as documentation**. Type Hints makes code more readable to both human and tools. Let’s spend less time to figure out what type to pass and return as the information is clearly written in the func type annotation.

### Serve as Documentation

Now you can get rid of specifying argument types in the wordy docs. Some documentation generation tool like [Sphinx](http://sphinx-doc.org/) reads Type Hints annotation as information.

Previously:

‍

**`def`** `hello(name`**`=`**`&amp;#039;nobody&amp;#039;):`

   `&amp;quot;&amp;quot;&amp;quot;Say hello to a person`

   `:param name: string value`

   `:rtype: string value`

   `&amp;quot;&amp;quot;&amp;quot;`

   **`return`** `&amp;#039;Hello&amp;#039; + name`

with Type Hints:

‍

**`def`** `hello(name: str` **`=`** `&amp;#039;nobody&amp;#039;) -&amp;gt; str:`

   `&amp;#039;&amp;#039;&amp;#039;Say hello to a person`

   `&amp;#039;&amp;#039;&amp;#039;`

   **`return`** `&amp;#039;Hello&amp;#039; + name`

## What Type Hints is NOT

Type Hints works on code level and involves syntax, yet it is not about the followings:

### It’s not about code generation

It’s not going to affect how your compiler complies your code.

### It’s not going to fix all code issues

Your code can still break during run time after type checking.

### It’s not about runtime type checking, nor performance overhead

Since there’s no effect on the compiled code, you won’t get a faster nor slower program with Type Hints on.

### It’s not going to make Python static-typed

This might be concerned by Python-lovers. In [PEP-0484](https://www.python.org/dev/peps/pep-0484/), the authors put the following disclaimer to clam the over-reacted Python fans:

![It should also be emphasized that Python will remain a dynamically typed language, and the authors have no desire to ever make type hints mandatory, even by convention.](/images/blogs/dd8c2a1ce0_66e31036301d32ee6856cfc2_image-placeholder.svg)

Those who worried about Python will be made static-typed can now relax 🙂

## When using Type Hints

To use the max power of Type Hints, take this piece of advice:

> **“Be liberal in what you accept, and conservative in what you return”**

Example:

‍

**`from`** `typing` **`import`** `Iterable, List`

**`def`** `even(numbers: Iterable)` **`-`**`&amp;gt; List:`

   **`return`** `list(n` **`for`** `n` **`in`** `numbers` **`if`** `n` **`%`** `2` **`==`** `0)`

## Get Type Hints in your Python

### For Python 3.5

just `import typing`

### For Python 3.2 – 3.4

you will need to `pip install typing` before importing

### For Python2

you can enable type checking with pyi stub: [python/typeshed](https://github.com/python/typeshed)

## More

*   [How You Can Benefit from Type Hints – Andrey Vlasovskikh JetBrains](http://blog.pirx.ru/media/files/2015/type-hinting-talk/type-hinting.html#1)
*   [Better type at Python – Rick Mak](https://go-talks.appspot.com/github.com/oursky/slides/py-type.slide#1)
*   [mypy – an experimental optional static type checker for Python](http://www.mypy-lang.org/)
*   [Guido van Rossum – Type Hints for Python 3.5](https://www.youtube.com/watch?v=Yqnrfa5ri7E)
*   [PEP483 – The Theory of Type Hints](https://www.python.org/dev/peps/pep-0483/)

‍
