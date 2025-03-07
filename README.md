<p align="center">
    <img src="./src/thumb.jpg" width="100%" style="margin-left: auto;margin-right: auto;display: block;">
</p>
<h1 align="center">Ely-MD ESM</h1>

</p>
<p align="center">
<a href="https://github.com/arasea2"><img title="Author" src="https://img.shields.io/badge/AUTHOR-arasea2-green.svg?style=for-the-badge&logo=github"></a>

##
<p align="center">
<a><img src="https://img.shields.io/badge/Maintaned%3F-Actively%20Developed-blue?style=flat-square"></a>

##
<a href="https://github.com/arasea2/ely-md/network/members"><img title="Forks" src="https://img.shields.io/github/forks/arasea2/ely-md?label=Forks&color=blue&style=flat-square"></a>
<a href="https://github.com/arasea2/ely-md/watchers"><img title="Watchers" src="https://img.shields.io/github/watchers/arasea2/ely-md?label=Watchers&color=green&style=flat-square"></a>
<a href="https://github.com/arasea2/ely-md/stargazers"><img title="Stars" src="https://img.shields.io/github/stars/arasea2/ely-md?label=Stars&color=yellow&style=flat-square"></a>
<a href="https://github.com/arasea2/ely-md/graphs/contributors"><img title="Contributors" src="https://img.shields.io/github/contributors/arasea2/ely-md?label=Contributors&color=blue&style=flat-square"></a>
<a href="https://github.com/arasea2/ely-md/issues"><img title="Issues" src="https://img.shields.io/github/issues/arasea2/ely-md?label=Issues&color=success&style=flat-square"></a>
<a href="https://github.com/arasea2/ely-md/issues?q=is%3Aissue+is%3Aclosed"><img title="Issues" src="https://img.shields.io/github/issues-closed/arasea2/ely-md?label=Issues&color=red&style=flat-square"></a>
<a href="https://github.com/arasea2/ely-md/pulls"><img title="Pull Request" src="https://img.shields.io/github/issues-pr/arasea2/ely-md?label=PullRequest&color=success&style=flat-square"></a>
<a href="https://github.com/arasea2/ely-md/pulls?q=is%3Apr+is%3Aclosed"><img title="Pull Request" src="https://img.shields.io/github/issues-pr-closed/arasea2/ely-md?label=PullRequest&color=red&style=flat-square"></a>

##
[![Bot WhatsApp Number](https://img.shields.io/badge/WhatsApp%20BOT-25D366?style=for-the-badge&logo=whatsapp&logoColor=white)](https://wa.me/6285179826307?text=.menu)
**NO BOT**


#### Deploy to Heroku
[![Deploy](https://www.herokucdn.com/deploy/button.svg)](https://heroku.com/deploy?template=https://github.com/arasea2/ely-md)

#### Deploy to Koyeb
[![Deploy to Koyeb](https://www.koyeb.com/static/images/deploy/button.svg)](https://app.koyeb.com/services/deploy?name=ely-md-wabot&privileged=true&type=git&repository=arasea2/ely-md&branch=main&builder=dockerfile)

#### Heroku Buildpack
| BuildPack | LINK |
|--------|--------|
| **FFMPEG** |[here](https://github.com/jonathanong/heroku-buildpack-ffmpeg-latest) |
| **IMAGEMAGICK** | [here](https://github.com/DuckyTeam/heroku-buildpack-imagemagick) |

### FOR TERMUX USER
1. Type mentioned below given commands one by one in Termux.
```sh
$ pkg upgrade && pkg update
$ pkg install git -y
$ pkg install nodejs -y
$ pkg install ffmpeg -y
$ pkg install imagemagick -y
$ git clone https://github.com/arasea2/ely-md -b multi-device
$ cd ely-md
$ npm i 
```
If error try using yarn instead of npm, see [here](https://github.com/arasea2/ely-md/tree/multi-device#if-npm-install-failed--try--using-yarn-instead-of-npm)
```sh
$ node .
```
2. Wait for bot starting...
3. Scan QR code from 2nd device. (Go to whatsapp > Linked Devices > Click on `link device`)
4. Now your bot is ready to rock n roll.

#### If npm install failed, try using yarn instead of npm
```sh
$ pkg install yarn -y
$ yarn install
```
---------

## INSTALL ON TERMUX WITH UBUNTU

[ INSTALLING UBUNTU ]

```bash
apt update && apt full-upgrade
apt install wget curl git proot-distro
proot-distro install ubuntu
echo "proot-distro login ubuntu" > $PREFIX/bin/ubuntu
ubuntu
```
---------

[ INSTALLING REQUIRED PACKAGES ]

```bash
ubuntu
apt update && apt full-upgrade
apt install wget curl git ffmpeg imagemagick build-essential libcairo2-dev libpango1.0-dev libjpeg-dev libgif-dev librsvg2-dev dbus-x11 ffmpeg2theora ffmpegfs ffmpegthumbnailer ffmpegthumbnailer-dbg ffmpegthumbs libavcodec-dev libavcodec-extra libavcodec-extra58 libavdevice-dev libavdevice58 libavfilter-dev libavfilter-extra libavfilter-extra7 libavformat-dev libavformat58 libavifile-0.7-bin libavifile-0.7-common libavifile-0.7c2 libavresample-dev libavresample4 libavutil-dev libavutil56 libpostproc-dev libpostproc55 graphicsmagick graphicsmagick-dbg graphicsmagick-imagemagick-compat graphicsmagick-libmagick-dev-compat groff imagemagick-6.q16hdri imagemagick-common libchart-gnuplot-perl libgraphics-magick-perl libgraphicsmagick++-q16-12 libgraphicsmagick++1-dev
```

---------

[ Installing Nodejs & ely-md]

```bash
ubuntu
curl -fsSL https://deb.nodesource.com/setup_current.x | sudo -E bash -
apt install -y nodejs gcc g++ make
git clone https://github.com/arasea2/ely-md
cd ely-md
npm install
npm start
```

---------

## FOR WINDOWS/VPS/RDP USER

* Download And Install Git [`Click Here`](https://git-scm.com/downloads)
* Download And Install NodeJS [`Click Here`](https://nodejs.org/en/download)
* Download And Install FFmpeg [`Click Here`](https://ffmpeg.org/download.html) (**Don't Forget Add FFmpeg to PATH enviroment variables**)
* Download And Install ImageMagick [`Click Here`](https://imagemagick.org/script/download.php)

```bash
git clone https://github.com/arasea2/ely-md
cd ely-md
npm install
npm start
```

---------

## Arguments `node . [--options] [<session name>]`
### `Contoh: node . --pairing`

### `--pairing`
Link device via pairing

### `--self`
Mode self (gak ada yang bisa gunakan, kecuali nomor bot dan owner)

### `--pconly`
Bot cuma bisa dipakai di Private Chat (kecuali user premium)

### `--gconly`
Bot cuma bisa dipakai di Grup (kecuali user premium)

### `--swonly`
bot cuma respon dari status

### `--server`
Untuk [heroku](https://heroku.com/) atau scan lewat website

### `--restrict`
Enables restricted plugins (which can lead your number to be **banned** if used too often)

* Group Administration `add, kick`

### `--img`
Enable image inspector through terminal

### `--autoread`
Autoread pesan

### `--autocleartmp`
If enabled, *tmp* folder contain files will be auto delete

### `--nyimak`
Bot nyimak doang, nampilin pesan di console dan add user ke database

### `--test`
**Development** Testing Mode

### `--db`
pass mongodb url or cloud url to connect to database, by the default it will connect to database.json

---------

### Cara set Nomor Owner ?

> Via command: .addrealowner saat bot berjalan, atau set dalam file `config.js`, di global.mods..
```js
global.mods = ['6287815756002']
```
> Contoh nomor `6287815756002`, bisa add lebih dari 1

---------

### Thanks To
[![clicknetcafe](https://github.com/clicknetcafe.png?size=100)](https://github.com/clicknetcafe)
[![BochilGaming](https://github.com/BochilGaming.png?size=100)](https://github.com/BochilGaming)
[![WhiskeySockets](https://github.com/WhiskeySockets.png?size=100)](https://github.com/WhiskeySockets/Baileys)
[![arasea2](https://github.com/arasea2.png?size=100)](https://github.com/arasea2)
#### Contributor
[![arasea2](https://github.com/arasea2.png?size=100)](https://github.com/arasea2)

---------
