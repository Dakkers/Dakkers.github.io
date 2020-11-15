---
layout: post
title:  "Installing the PCE-N53 Driver on Ubuntu 12.04"
date:   2015-08-10 23:00:00
categories: ubuntu wireless
comments: true
---

I recently set up Ubuntu 12.04 and, to no one's surprise, the wireless was being touchy. I have an ASUS PCE-N53 N600 wireless adapter, and was able to figure it out after a bit of pain.
<!-- more -->

## Prerequisites
You need `make`, `gcc`, `build-essentials`, `linux-headers-generic`, and maybe `g++`.

## Installing the driver
Run the following code:

{% highlight bash %}
wget http://dlcdnet.asus.com/pub/ASUS/wireless/PCE-N53/Linux_PCE_N53_1008.zip
unzip Linux_PCE_N53_1008.zip
cd Linux

tar -jxvf DPO_GPL_RT5592STA_LinuxSTA_v2.6.0.0_20120326.tar.bz2
cd DPO_GPL_RT5592STA_LinuxSTA_v2.6.0.0_20120326

wget http://gridlox.net/diff/rt5592sta_fix_64bit_3.8.patch
patch -p1 < rt5592sta_fix_64bit_3.8.patch

make  # this might fail!

sudo make install
modprobe rt5592sta
{% endhighlight %}

This will:

1. Download the driver and unzip
2. Untar the insides (yummy)
3. Download a patch for the driver and patch it
4. Recompile and install the driver
5. Activate the wireless adapter

If the `make` command fails, that's okay, just run the rest of the commands and it should work!
