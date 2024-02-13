![Banner](https://s-christy.com/sbs/status-banner.svg?icon=action/http&hue=260&title=Backend&description=A%20web%20backend%20for%20handling%20user%20data%20with%20care)

## Overview

This is a little web server project that I built to explore how user accounts
and user data could be handled for a simple website. I also explored
templating, using a file-based database, routers, user sessions and more.

Despite the fact that I think what I wrote is pretty solid, I came to the
conclusion that rolling your own auth is a bad idea, and these days I rely on
authentication middleware that doesn't require me to manually call crypto
algorithms.

This repository is called `backend` but does include a thin frontend mostly for
demonstration purposes.

## Features

## Usage

First, add your `SESSION_SECRET` to your `.env` file:

```sh
SESSION_SECRET=some_secret
```

Then you can install your dependencies and run the server with these commands:

```sh
npm install
git submodule update --init
node main.js
```

## Dependencies

```
Node.js
```

## License

This work is licensed under the GNU General Public License version 3 (GPLv3).

[<img src="https://s-christy.com/status-banner-service/GPLv3_Logo.svg" width="150" />](https://www.gnu.org/licenses/gpl-3.0.en.html)
