---
title: "11 Command Line Tips That You Probably Missed"
description: "11 Command Line Tips That You Probably Missed"
pubDate: 2025-01-28
author: "Ben Cheng"
categories:
  - "engineering"
displayCategory: "Geek"
image: "/images/blogs/28e3fe7eff_67993db647f7923e8b796257_keep-calm-and-sudo.webp"
draft: false
webflowId: "67993debf9deac5f8d0cd84d"
---

A list of command line tips to optimize your terminal experience. All the recommended features are linked to their appropriate sources.

![keep-calm-and-sudo](/images/blogs/94514cf8e2_67993dc1f8310651bf25b511_keep-calm-and-sudo-1024x576.png)

We’ve all been there.

## 1\. Bootstrap your terminals: Bashstrap & oh-my-zsh

[**Bashstrap**](https://github.com/barryclark/bashstrap) is a quick way to spruce up your OSX terminal. It cuts out the fluff, adds in timesaving features, and provides a solid foundation for customising your terminal style.

![bashstrap](/images/blogs/33c718f11c_67993dc15d936e4b69f4fef5_bashstrap.png)

**Features:**

*   Faster directory navigation
*   Customized bash prompt line
*   Updated color scheme

[**iTerm**](https://www.iterm2.com/) is also a recommended terminal replacement for the Mac OSX default one. iTerm supports more features such as split pane view, hotkey window for instant terminal anywhere, mouseless copy. It improves working efficiency.

**For zsh lovers:** Check out [**oh-my-zsh**](https://github.com/robbyrussell/oh-my-zsh) which super-power zsh like Bashstrap to Bash.

## 2\. Set editing-mode vi

More familiar with vim than Emacs? Did you know you can use vim instead of Emacs hotkeys on bash? (Such as $ instead of Ctrl+A for jumping to start of line)

Put `Set editing-mode vi` into this file `~/.inputrc` . Then you can use vim hotkeys in the terminal.

echo 'Set editing-mode vi' >> ~/.inputrc

![command line hacks vim hotkeys emacs](/images/blogs/6aaf7a7824_67993dc1240ba8d13d55d8ef_11commands_blogpost-1024x705.png)

After setting this up, open a new tab on the terminal. Type anything on it.

![command line hacks vim hotkeys emacs bash](/images/blogs/25feb8ed4e_67993dc12ad51c2aa8ce3b28_Screen-Shot-2016-08-18-at-1.35.15-PM.png)

This is, of course, not a command line. I would like to delete it using vim command “dd” which is “delete current line”.

All you need to do it is press “escape” on your keyboard to enter the vim mode. Then press “dd”. The whole current line will be deleted.

![command line hacks vim hotkeys emacs bash](/images/blogs/2affa44dc7_67993dc1349163223abddea0_Screen-Shot-2016-08-18-at-1.35.25-PM.png)

Here is a cheat sheet for vi by Peteris Krumins – [http://www.catonmat.net/download/bash-vi-editing-mode-cheat-sheet.pdf](http://www.catonmat.net/download/bash-vi-editing-mode-cheat-sheet.pdf)

## 3\. Byobu

![Byobu multiplexer ubuntu open source](/images/blogs/dd8c2a1ce0_66e31036301d32ee6856cfc2_image-placeholder.svg)

Image courtesy of Byobu

[**Byobu**](http://byobu.co/) is a [GPLv3](http://www.gnu.org/licenses/gpl-3.0.txt) open source text-based window manager and terminal multiplexer. You can do window management using the terminal. [**Byobu**](http://byobu.co/) was originally designed for the Ubuntu server distribution, but the Tmux terminal multiplexer works on most Linux, BSD, and Mac distributions.

Go to [byobu.co](http://byobu.co/) to check out the demo video.

## 4\. pushd / popd

`pushd` & `popd` are two commands for you to jump between directories like a stack. The `pushd` command ‘pushes’ the target directory to the top of the stack and saves the previous directory. The previous directory can be ‘popped’ back with the `popd` command.

pushd popd

pushd == save current directory + optional path: change to new directory  
popd == return to saved directory.

**Here is an example:**

I started in /Users/mayyeung/Documents/SkygearCMS directory.

I type `pushd ~/Downloads/Skygear\ Chat\ SDK` . This means I saved the path `/Users/mayyeung/Documents/SkygearCMS` at the top of directory stack and at the same time I change directory to Skygear Chat SDK.

Finally, I can switch back to `~/Documents/SkygearCMS` by typing ‘`popd`‘

![command line hacks developer popd pushd](/images/blogs/6798d7defd_67993dc1c0359ca5700d9b6c_Screen-Shot-2016-08-18-at-4.18.29-PM.png)

Using popd and pushd

If the path parameter is omitted, the path at the top of the directory stack will be used, which looks like toggling between 2 directories.

## 5\. ctrl-r

With `ctrl-r` , you can search your terminal command line history. Sometimes you might forget the exact command, but you still remember some characters. You can then use `ctrl-r` to search it.

![command line hacks developer ](/images/blogs/c804fd08a8_67993dc1c3544ff0a20a52f3_Screen-Shot-2016-08-18-at-4.34.50-PM.png)

Using Ctrl + R to search previous command lines

I typed ‘brew’ and then saw the previous command lines I’d used. Then, I just press ‘enter’ to run the command line!

![command line hacks developer ](/images/blogs/eca6f93e5c_67993dc179416f07ba2134a6_Screen-Shot-2016-08-18-at-4.35.09-PM.png)

## 6\. ssh config

Hate waiting for the SSH handshake and also typing username / hostname for a frequently used host? Take 5 mins to set up ssh config (~/.ssh/config), and that shortens the ssh [chpapa@hostname.com](mailto:chpapa@hostname.com) into `ssh w`! With ssh session caching to save you from waiting for the handshake.

![ssh config command line hacks](/images/blogs/48e01096f7_67993dc1d654ec44c00f5d4b_Screen-Shot-2016-08-12-at-6.42.51-PM.png)

## 7\. F\*ck China’s GFW

Have you been behind China’s Great FireWall? Of course, there are holes. Here is a handy way to get a quick SOCKS server with SSH.

First, type the command on the terminal `ssh -c arcfour -D 8080` . It opens a SOCKS proxy server via server.com

Then open your browser and go changing your proxy setting. By choosing the “change proxy settings”, you can check the SOCKS Proxy and type the SOCKS Proxy Server address 127.0.0.1:8080. The Great FireWall is no longer an obstacle to Google or Facebook.

![Screen Shot 2016-08-17 at 6.05.46 PM](/images/blogs/66b2fc73f9_67993dc1e60cb7aadb93cc8e_Screen-Shot-2016-08-17-at-6.05.46-PM-1024x512.png)

## 8\. mkdir -p what/the/hell

Most of you have opened a new directory by typing `mkdir` . When you need to open a new sub-directory inside a new directory, eg `~/What/the/hell`, what will you do? This command comes in handy.

mkdir -p directory/subDirectory/sub-subDirectory

It’s like telling mkdir: if there is any non-existing directory along the path, just create it.

![Screen Shot 2016-08-18 at 5.57.41 PM](/images/blogs/56af2f500e_67993dc1b9703b83c511f5ec_Screen-Shot-2016-08-18-at-5.57.41-PM.png)

## 9\. open .     (Mac Only)

Command line for opening a Finder.

![Screen Shot 2016-08-18 at 5.58.55 PM](/images/blogs/9b0bcf2ef8_67993dc179416f07ba2134ac_Screen-Shot-2016-08-18-at-5.58.55-PM-1024x547.png)

## 10\. pbcopy / pbpaste (Mac Only)

These 2 commands provide copying and pasting to the clipboard in terminal. For example, when you need to copy a public key from a file to a setting page on your browser, you can type cat ~/.ssh/id\_rsa.pub | pbcopy and then use keyword ‘command + v’ to paste into the terminal.

![11commands\_blogpost2](/images/blogs/c3e85db614_67993dc2f694c2f3deb2345b_11commands_blogpost2-1024x705.png)

## 11\. sudo !!

sudo !!

!! == repeat last command

When we type the commands, the terminal notified you ‘**Permission denied’** that you don’t have access. Then what will you do? Add sudo at the front and type command again right?

![Screen Shot 2016-08-18 at 6.02.02 PM](/images/blogs/e03ad21cef_67993dc11445436566e5d604_Screen-Shot-2016-08-18-at-6.02.02-PM.png)

Now you have a smarter way to do that. Just type **`sudo !!`** so that you can execute the same command without entering the whole line it again!

## Any more?

These 11 small hacks make my day a bit easier and hope it helps you too.

What are your favourite command hacks? Please share it in the comments! And don’t forget to share this post with your engineer friends! ^^

‍
