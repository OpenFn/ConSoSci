---
name: Bug report
about: Create a report to help us improve
title: ''
labels: ''
assignees: ''

---

## Describe the bug
A clear and concise description of what the bug is.

## To Reproduce
1. Here is a link to a failed run on OpenFn.org wihch is indicative of the bug: __________

### expression.js
Link to the job itself in Github: _____________

### state.json

Either provide state directly, or link to a file. If sensitive information
should be in state, redact it and provide instructions for where it can be
found.

```json
{
  "configuration": ["SEE LAST PASS: 'client cred'"],
  "data": { "a": 1 },
  "cursor": "2020-01-19 00:00:00"
}
```

## Expected behavior
A clear and concise description of what you expected to happen.

## To test/resolve
1. After the desired output is working locally (from the CLI), please [push commits to master || open a pull request].
2. [Please test the change on OpenFn.org by re-running this run (link) and confirming success.]
