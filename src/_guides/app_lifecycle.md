---
title: App Lifecycle
layout: guide
---
The Nxus Application Lifecycle is defined by the following high-level events.

1. **init**: core functionality exists, modules are being initialized - do your own initialization here, but don’t count on anything else being available.
1. **load**: modules are initialized and available. This is where you want to send/receive info your module needs to load successfully.
1. **startup**: the application is starting up. This is where work should happen to initialize the application state (static processing for example)
1. **launch**: the application is launched, everything is configured, you can assume that all functionality in other modules is available for use. E.g. do something like start a webserver or process a data file.
