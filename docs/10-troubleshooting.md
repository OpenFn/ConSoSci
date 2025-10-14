---
layout: home
title: Troubleshooting Help
nav_order: 10
permalink: /troubleshooting/
---

# Troubleshooting Help & Common Errors


## OpenFn Work Order & Run Status Codes
[See OpenFn docs](https://docs.openfn.org/documentation/monitor-history/status-codes) to interpret common error codes for workflow runs that fail and are `killed`, `lost`, and more!

### Common Errors
`502 Gateway Error`: Sometimes when getting data from the KoboToolbox API, if the app is overwhelmed/has a lot of traffic and may time out and throw this error. Retry the OpenFn workflow and it should work well the next time!

`401` or `404` Errors: Indicate an issue with auth, so double check your credential and user permissions. 
