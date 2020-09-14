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

## Known Limits

As it uses `lightning-container` for message communication between workers, the message objects are serialized in JSON.
So only the transferable objects that can be serialized to JSON is supported as messages.


