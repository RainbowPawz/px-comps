# Px-App-Switcher

## Overview

The px-app-switcher is a Predix UI component for displaying additional information to a user with and icon list popdown.
## Usage

### Prerequisites
1. node.js
2. npm
3. bower
4. [webcomponents-lite.js polyfill](https://github.com/webcomponents/webcomponentsjs)

Node, npm and bower are necessary to install the component and dependencies. webcomponents.js adds support for web components and custom elements to your application.

## Getting Started

First, install the component via bower on the command line.

```
bower install --save https://github.com/RainbowPawz/px-comps.git
```

Second, import the component to your application with the following tag in your head.

```
<link rel="import" href="/bower_components/px-app-switcher/px-app-switcher.html"/>
```

Finally, use the component in your application:

```
<div>
  <px-app-switcher items="[{ icon: 'fa icon', title: 'Google', url:'www.google.com'}]"></px-app-switcher>
</div>

```

<br />
<hr />

## Local Development

From the component's directory...

```
$ npm install
$ bower install
$ gulp sass
```

From the component's directory, to start a local server run:

```
$ gulp serve
```

Navigate to the root of that server (e.g. http://localhost:8080/) in a browser to open the API documentation page, with link to the "Demo" / working examples.

### GE Coding Style Guide
[GE JS Developer's Guide](https://github.com/GeneralElectric/javascript)

<br />
<hr />

## Known Issues

Please use [Github Issues](https://github.com/PredixDev/px-app-switcher/issues) to submit any bugs you might find.
