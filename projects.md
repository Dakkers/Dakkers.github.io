---
layout: page
title: Projects
permalink: /projects/
---

Most of my time these days is spent working on [Bidvine](https://www.bidvine.com) stuff, followed by game development, followed by music.

# Old Projects

These are projects I no longer work on.

## numbers.js
**The most popular numerical library for JavaScript / NodeJS.**

I'm currently the lead developer and responsible for maintaining documentation. I'm in the process of writing linear system solvers. I'm also figuring out how to implement a sparse matrix data type and the associated reordering algorithms. Click [here](https://github.com/numbers/numbers.js) to check out the repo.

## node email verification
**Easily send verification emails for user signup when using Node and MongoDB.**

This is a npm package that easily allows you to send verification emails to a user after they sign up on your webpage, assuming you use MongoDB as your database. When a user signs up, their data is put into a temporary collection with a TTL and a randomly generated URL associated with the user. When this URL is accessed, the user's data is put into the real collection that you defined.

There are multiple configuration options, such as the content of the verification email, whether or not a confirmation email is sent, etc. The project is also pretty well documented (not to brag...). You can check out the [GitHub repository](https://github.com/SaintDako/node-email-verification), or you can check out the [NPM page](https://www.npmjs.com/package/email-verification).

## Roomsurfer
**Find a place to study on UW's campus.**

Roomsurfer was my second JavaScript project. I scraped the data required using the Python module beautifulsoup, and then sorted it accordingly. When I first wrote the client-side part of the app, I didn't actually know how to do any server-side stuff at the time, so I loaded all of the data into the user's browser, and called it from there. Yeah, pretty terrible, I know.

The first revision I did to the app fixed this problem. I decided to rent a DigitalOcean server and I set up a MongoDB database so the user's data wouldn't be sucked dry (the data loaded into the browser was a 2.4 MB JSON file). The second revision I did was to reduce the reliance on jQuery for editing the view; I decided to try out KnockoutJS. I later changed it to Angular. Click [here](http://saintdako.com/roomsurfer) to see.

## GRTexter
**Never forget a bus stop number again.**

A very simple Android app that allows the user to store GRT bus stop numbers as list items. Clicking on a list item sends a text to the GRT with the stop number. I'm looking into making it a bit more intricate with receiving texts, but Java hurts me. [Check it out on the Play Store](https://play.google.com/store/apps/details?id=com.saintdako.textabus) I may make it into an iOS app as well as a Windows phone app, if someone else is willing to publish it on the App Store so I don't have to give any money to Apple.

## Brackets Cheat Sheets
**Use cheat sheets for quick coding references while working in Brackets.**

A Brackets extension that makes use of the two-pane split to keep a cheat sheet open in the right pane. A different cheat sheet can be used for different languages. No need to Google keywords that you commonly forget. Download it through Brackets' extension manager, or click [here](https://github.com/SaintDako/brackets-cheatsheet) to see the source code.

## Scholzly
**A Chrome extension that will change your life in so, so, so many different ways.**

This extension replaces all instances of the word 'so' on the page with multiple 'so's that are either space-, comma- or ellipsis-separated (or a combination of the three). A minimum and maximum number of 'so's are able to be set. Why? Because UW Physics. Click [here](https://chrome.google.com/webstore/detail/scholzly/acaddkimmjhinkbhplbodaigapgcplbb) to check it out. **Note**: it currently breaks multiple sites. That'll be fixed... eventually.

## WareJects
**Manage your software and hardware project ideas.**

WareJects is a Chrome extension that allows the user to organize their software and hardware project ideas.
WareJects was both my first JavaScript project and project I released to the 'public', and as such, was a terrible, terrible mess of code. I originally used jQuery and jQuery UI, and based my layout off of a Tabs example that used jQuery UI, which is an ugly P.O.S. I ended up completely rewriting it, using jQuery and Flat UI as the design, which is infinitely prettier. Click [here](https://chrome.google.com/webstore/detail/warejects/nkmcljgcobeldlokkbdkbbfdfdmdmlbi?hl=en) to get it.

## The Collatz Conjecture
**Watch cool animations of one of the neatest unsolved mathematical problems.**

An interactive webpage for the Collatz conjecture. Nothing too fancy - the coolest part about this is the use of CanvasJS, which allows graphs to be updated dynamically (although it's a bit painful on the computer, from my understanding). Uses jQuery. Click [here](http://saintdako.com/collatz) to watch graphs do pretty things.

## The Lorenz System
**Watch cool animations of the world's best-known chaotic system.**

A group project for PMATH 370: Chaos and Fractals, a course offered at the University of Waterloo. Similar to the Collatz Conjecture webpage, but for the Lorenz system. Makes far prettier graphs than the Collatz Conjecture, IMO, but that's because strange attractors are so dang cool. Uses jQuery, CanvasJS and Flat UI. Click [here](http://saintdako.com/lorenz).
