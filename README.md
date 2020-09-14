# Lightning Web Worker

Web Worker implementation running on Lightning platform (Locker Service)

## Abstract



## Setup

### Creating Scratch Org

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

