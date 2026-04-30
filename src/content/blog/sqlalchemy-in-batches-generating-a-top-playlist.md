---
title: "SQLAlchemy in batches: Generating a top playlist"
description: "SQLAlchemy in batches: Generating a top playlist"
pubDate: 2025-01-28
author: "Kenji Pa"
categories:
  - "code"
displayCategory: "Code"
image: "/images/blogs/a9703ec3a5_679925b5208e42e86abdef04_IMG_3332.webp"
draft: false
webflowId: "679925bb62f31298ce7515fe"
---

[SQLAlchemy](http://www.sqlalchemy.org/) is arguably the most powerful and ubiquitous ORM framework for Python.

At [Oursky](http://www.oursky.com/), we have been using SQLAlchemy for quite a period of time and appreciated the flexibility and elegance it provides over the [Data Mapper abstraction](https://en.wikipedia.org/wiki/Data_mapper_pattern#Python). No doubt, it works very well for modern web applications but what about long-running background jobs? Would the abstraction get in your ways? _(tl;dr: yes, but we still prefer it)_

Here are some hands-on experiences from us.

We built a popular iOS application with a song recommendation system at the backend. The system suggests a top list for 20 popular songs.

‍

![\_\_wf\_reserved\_inherit](/images/blogs/1887895a88_679926cc6d380fa2db7bb4aa_679925b5208e42e86abdef04_IMG_3332.webp)

Previously our editors hand-picked popular songs by download count and gather a new playlist as a recommendation to users. Now, we want to automate this process and generate the playlist weekly.

Obviously it can be a cron job.

We decided to write a python script for it. The flow follows:

*   Get the top 20 songs (across 100k+ analyzed songs)
*   Create a new playlist and insert it into the database
*   Run the above script weekly

Easy! It is a good exercise to get new python programmers familiar with SQLAlchemy. One of our colleagues, not having written a single line of Python, submitted the following piece of code for review:

def gen\_autotrend\_playlist(playlistdate):    r = get\_redis()    song\_ids = get\_trending\_song\_id(r, playlistdate)    if not song\_ids:        return    new\_playlist = Playlist(name='Top Charts',                            ordering=1,                            available=0,                            admin\_available=1,                            slug='topchart-week-' + playlistdate)    db.session.add(new\_playlist)    db.session.commit()    for i, song\_id in enumerate(song\_ids):        new\_entry = ListedEntry(song\_id=song\_id,                                playlist\_id=new\_playlist.id,                                ordering=i,                                is\_top=1)        db.session.add(new\_entry)        db.session.commit()

The code speaks for itself very well: crawl the most trendy songs from Redis and store them into Database one-by-one.

Impressive code for a beginner. _Good job,_ [_Peter_](https://twitter.com/chrismessina/status/605913635362177024)_._

That being said, sharp-eyed readers should have probably noticed something very wrong here. Can you suggest from the code above?

_(Hint: about database consistency)_

_Time’s up._ Let’s look at the loop overs `song_ids`:

for i, song\_id in enumerate(song\_ids):    new\_entry = ListedEntry(song\_id=song\_id,                            playlist\_id=new\_playlist.id,                            ordering=i,                            is\_top=1)    db.session.add(new\_entry)    db.session.commit()

If the operation crashes in the middle of the loop, say, the 5th song, the script will throw an exception and exit.

**Boom!** Your supposedly 20-song playlist now gets only 4 songs.

Worse, it might even throw an exception in the very first iteration and leave you with a playlist without any songs. That’s _bad_. _Really bad_.

So, how should we deal with this problem? Here Peter resubmit a patch:

def gen\_autotrend\_playlist(playlistdate):    r = get\_redis()    song\_ids = get\_trending\_song\_id(r, playlistdate)    if not song\_ids:        return    new\_playlist = Playlist(name='Top Charts',                            ordering=1,                            available=0,                            admin\_available=1,                            slug='topchart-week-' + playlistdate)    db.session.add(new\_playlist)    db.session.flush()    for i, song\_id in enumerate(song\_ids):        new\_entry = ListedEntry(song\_id=song\_id,                                playlist\_id=new\_playlist.id,                                ordering=i,                                is\_top=1)        db.session.add(new\_entry)    db.session.commit() # Only commit when everything is done correctly

Here is a major question by beginners: we want a `playlist_id` to associate the record with the new playlist. So we considered calling `db.commit()` before the insertion loop which might lead to inconsistency.

That’s what `session.flush()` might help:

`session.flush()` communicates a series of operations to the database. The database maintains them as **pending** **operations** in a transaction.

The changes aren’t persisted permanently to disk, or visible to other transactions until the database receives a **commit** for the current transaction.

The flush operation makes the `new_playlist` in a pending state, so we can query for the assigned `id` within this session.

The insertion loop does its job as usual, and we finally commit it at the end of the whole operation.

We can even do better: _(by using_ [_`relationship`_](http://docs.sqlalchemy.org/en/latest/orm/basic_relationships.html#one-to-many)_`()` provided by SQLAlchemy)_

class ListedEntry(db.Model):    song\_id = db.Column(db.Integer,                        db.ForeignKey('song.id'),                        primary\_key=True)    playlist\_id = db.Column(db.Integer,                            db.ForeignKey('playlist.id'),                            primary\_key=True)    playlist = db.relationship('Playlist', backref='listed\_entries') #Declare a relationshipdef gen\_autotrend\_playlist(playlistdate):    r = get\_redis()    song\_ids = get\_trending\_song\_id(r, playlistdate)    if not song\_ids:        return    new\_playlist = Playlist(name='Top Charts',                            ordering=1,                            available=0,                            admin\_available=1,                            slug='topchart-week-' + playlistdate)    db.session.add(new\_playlist)    for i, song\_id in enumerate(song\_ids):        new\_entry = ListedEntry(song\_id=song\_id,                                playlist=new\_playlist,                                ordering=i,                                is\_top=1)        new\_playlist.listed\_entries.append(new\_entry)    db.session.commit()

We can further save an `flush` operation while maintaining the database consistency.

## **Lesson 1**

> **Consider what shall be in a transaction!**

_“Hear that, Peter?”_

Next, we want to add two columns to DB for query and a planned feature

1.  `distinct_chords`: the unique chords appeared in a song (JSONText)
2.  `chord_num`: the number of `distinct_chords` (int)

We need a migration script to generate these two fields. Once again, our _Fearless_ _Peter_ has taken up the challenge:

def batch\_derive\_song\_chord:    for song in db.session.query(Song).all():        chords = derive\_chord(song.score)        song.chords = chords        song.chord\_num = len(chords)    db.session.commit()

“Look, ma! One commit and for all!” Yea _Peter_… You did learn _something_. It runs flawlessly on you development environment, but the whoever runs it on production would probably get angry at you.

Could you find out the reason for _Peter_?

3… 2…1.

Here is the solution:

\# Solutiondef batch\_derive\_song\_chord:    for song in db.session.query(Song).all(): ＃ Hold all 100k ORM objects in memory?        chords = derive\_chord(song.score)        song.chords = chords        song.chord\_num = len(chords)    db.session.commit() ＃ Committing 100k rows at once?

1.  An `query.all()` attempts to fetch all records from the Database, does the ORM work and return them as a list. It would be a disaster if your table is huge.
2.  It commits after all songs processed. That means: _one fails, all fails._ Let’s imagine the 99k-th song of 100k songs has a corrupted score and derive\_chord throws an exception… Congratulation! You are all new now and have to re-process 99k songs.

For this kind of script, we have to make it more error-tolerant and re-runnable. It is obvious that the processing on a single song is a unit of work that can be committed atomically. A naively modified version would be like this:

def batch\_derive\_song\_chord:    for song in db.session.query(Song).filter(Song.chords == None):        chords = derive\_chord(song.score)        song.chords = chords        song.chord\_num = len(chords)        db.session.commit()

If the script fails and terminates in midway, we can still guarantee the work we’ve done is not wasted.

## **Lesson 2**

1\. Prefer iterator over list in python, and avoid `query.all()` unless you have a reason **(if you need to, write a comment about it!)**

2\. Break gigantic commit into multiple smaller atomic commits. Try not to do long-running operation between \`flush\` and \`commit\` because some rows may be locked in the mean time.

3\. Make script re-runnable and traceable even it breaks midway.

# One more thing…

Let’s re-visit the modified version of migration script:

def batch\_derive\_song\_chord:    for song in db.session.query(Song).filter(Song.chords == None):        chords = derive\_chord(song.score)        song.chords = chords        song.chord\_num = len(chords)        db.session.commit()

There is an opaque performance issue here. Could you spot that out?

**Answer:** The session used for this query is being committed at every iteration. Since objects in a session are expunged every time committed, queried object will be re-fetched at the next iteration. It results in _all songs but the first_ is fetched twice, which is a huge waste. _(Peter: Ha! I am not that bad after all, right?)_

We dealt with this problem by using separate sessions for read and write such that our commits of writes do not mess with the session for the query. An example snippet follows:

def batch\_derive\_song\_chord:    # steal the session\_factory for illustration purpose    session\_factory = db.session.session\_factory    read\_session = session\_factory()    write\_session = session\_factory()    for (song\_id, ) in read\_session.query(Song.id).filter(Song.chords == None):        song = write\_session.query(Song).get(song\_id)        chords = derive\_chord(song.score)        song.chords = chords        song.chord\_num = len(chords)        write\_session.commit()

Session management complicated the script a bit, but overall it is still a very readable piece of code (what about RAW SQL anyone?)

## To sum it up

*   [SQLAlchemy](http://www.sqlalchemy.org/) provides a very good abstraction and aids in delivering highly readable code.
*   Think more on when you should commit. Using SQLAlchemy in a long-running script is very different from web application where in most cases session is only committed once per request. Expect your script to fail, define the unit of work for your purpose and commit your changes atomically.
*   Extra care should be taken towards session life cycle to optimize performance.

Overall we are satisfied with using SQLAlchemy in our long running scripts despite a few pitfalls of it. With SQLAlchemy, scripts are easier to write than raw-SQL counterpart, and more importantly, _easier to read_.

It is trivial for scripts with sophisticated routine logic. Like it or not, not all batch scripts are simple enough to write in 100 LOC, and they have to be maintained.

#### Life is too short for bad code.

> **“20 percent of the code has 80 percent of the errors. Find them, fix them!” _– Lowell Arthur_**

We care about code quality and maintain high code quality standards through code review and regularly update with new techniques and best practices.
