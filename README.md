# Lightning Web Worker

A Web Worker implementation running on Lightning platform (Locker Service)

## Abstract

The Lightning (Aura/Web) components are using Lightning Locker (a.k.a. Locker Service) for the separation of execution context.
It is known that the Locker prevents the usage of some built-in objects which web browsers are exposing.
Web Worker is one of the objects that is not available in the context of Locker.

This implementation polyfills the Worker object in the Locker context, and passes to the native Worker living in lightning:container.


## Setup

### Create Scratch Org

```
$ sfdx force:org:create -f config/project-scratch-def.json --setdefaultusername
```

### Build Library

```
$ npm install
$ npm run build
$ npm run dist
```

### Push Source (including example app) to the Scratch Org

```
$ sfdx force:source:push
```

### Open Example

```
$ sfdx force:org:open -p lightning/n/WebWorker
```

## How to Use Lightning Web Worker in Your Component

If you want to use Web Worker in Lightning Components, first you need to preare a wrapping Aura component with following component definition.

```
<aura:component>
  <c:lightningWebWorker proxy="{!$Resource.YourWebWorkerProxy + '/index.html'}" />
  <c:yourCompWithWebWorker></c:yourCompWithWebWorker>
</aura:component>	
```

The `YourWebWorkerProxy` is a static resource which has following file structure:

```
- staticresources
  └── YourWebWorkerProxy
      ├── index.html
      ├── server.js
      └── worker.js
```

First you have to prepare a proxy html file with a very simple content to invoke Workers in lightning container. 

```html:index.html
<!DOCTYPE html>
<html>
  <head>
    <script src="./server.js"></script>
  </head>
  <body></body>
</html>
```

Then copy the `server.js` in `dist` folder in this package.

Finally add the `worker.js` as your own script to be run in the Web Worker.

As the global `Worker` object is defined in `c:lightningWebWorker` component,
you just add code to invoke Worker like usual browser app in your Lightning component.

Note that the path to the worker script should be relative to the proxy html file, not from the component.

```javascript
class CountCalculationCmp extends LightningElement {  

  // ...
  startCalcInWorker() {
    console.log("creating worker...");
    this.calculating = true;
    this.output = null;
    const worker = new Worker("./worker.js");
    const input = Number(this.input);
    worker.postMessage(input);
    worker.onmessage = (e) => {
      console.log("worker onmessage", e);
      this.output = e.data;
      this.calculating = false;
    };
  }
  // ...
}
```

## Known Limits

As it uses `lightning-container` for message communication between workers, the message objects are serialized in JSON.
So only the transferable objects that can be serialized to JSON is supported as messages.


