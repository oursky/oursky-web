---
title: "Type Hints - Better type at Python"
description: "New Python Type hints offers type checking on to function parameters, return values, class attributes, as if it's a static typed language."
pubDate: 2024-09-16
author: "Rick Mak"
category: "code"
image: "https://cdn.prod.website-files.com/654ba60def05336c1f0eb138/66e347f913eb0585f98ca7a5_type-hints-cover-150x150.gif"
draft: false
webflowId: "66e34920e47fbd9c1711e790"
---

Python is known as a dynamic, \[strong-typed\](https://wiki.python.org/moin/Why is Python a dynamic language and also a strongly typed language) language. Most developers love it but some feel mad without type checking or type-hinted auto-completion. In Python3.5, [Type Hints](https://www.python.org/dev/peps/pep-0484/) is introduced to further delight developers who want those features.  

Type Hints offers type checking on function parameters, return values and class attributes, _as if_ it's static-typed. If you pass something does not match the expected type, a warning will be given.

According to [The Theory of Type Hints](https://www.python.org/dev/peps/pep-0483/), here's an example showing how the rules work out in practice:

Say there is an `Employee` class, and a subclass `Manager`:

Let's say variable e is declared with type `Employee`:

Now it's OK to assign a `Manager` instance to e:

It's not OK to assign an `Employee` instance to a variable declared with type `Manager`:

Now, suppose we have a variable whose type is [Any](https://www.python.org/dev/peps/pep-0484/#the-any-type):

It's OK to assign `a` to `Employee e`:

Of course it's also OK to assign `Employee e` to `a`:

‍

## Benefits

By introducing Type Hints in Python, it makes Python even more friendly to programmers. At least it helps prevents premature-idiot bugs regarding type errors. And there are more benefits we might consider:

### Make IDE to work better

IDE like [PyCharm](https://www.jetbrains.com/pycharm/) can perform type checking on variable assignments and return values in local functions. Since type information is crucial for static code analysis, this also make code completion easier.

\[caption id="attachment\_174" align="aligncenter" width="448"\]

![pycharm](https://cdn.prod.website-files.com/654ba60def05336c1f0eb138/66e347fccf9939c6d3b7320a_pycharm.png)

Warning on wrong type - PyCharm\[/caption\]

### Improve code readabilty

We often emphasize **Code as documentation**. Type Hints makes code more readable to both human and tools. Let's spend less time to figure out what type to pass and return as the information is clearly written in the func type annotation.

### Serve as Documentation

Now you can get rid of specifying argument types in the wordy docs. Some documentation generation tool like [Sphinx](http://sphinx-doc.org/) reads Type Hints annotation as information.

Previously:

‍

with Type Hints:

‍

## What Type Hints is NOT

Type Hints works on code level and involves syntax, yet it is not about the followings:

### It's not about code generation

It's not going to affect how your compiler complies your code.

### It's not going to fix all code issues

Your code can still break during run time after type checking.

### It's not about runtime type checking, nor performance overhead

Since there's no effect on the compiled code, you won't get a faster nor slower program with Type Hints on.

### It's not going to make Python static-typed

This might be concerned by Python-lovers. In [PEP-0484](https://www.python.org/dev/peps/pep-0484/), the authors put the following disclaimer to clam the over-reacted Python fans:

![It should also be emphasized that Python will remain a dynamically typed language, and the authors have no desire to ever make type hints mandatory, even by convention.](https://cdn.prod.website-files.com/654ba60def05336c1f0eb138/66e347fc2c6a7b5ab60d9f8f_type-hints-disclaimer.png)

Those who worried about Python will be made static-typed can now relax :)

## When using Type Hints

To use the max power of Type Hints, take this piece of advice:

“Be liberal in what you accept, and conservative in what you return”

Example:

‍

## Get Type Hints in your Python

### For Python 3.5

just `import typing`

### For Python 3.2 - 3.4

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
