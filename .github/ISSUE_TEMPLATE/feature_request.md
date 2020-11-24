---
name: Feature request
about: Suggest an idea for this project
title: ''
labels: ''
assignees: ''

---

## Background, context, and business value

A clear and concise description of what the client wants and WHY.

For example: [wip...]

## The specific request, in as few words as possible

A clear and concise description of what you want to happen.

## state.json

Either provide state directly, or link to a file. If sensitive information
should be in state, redact it and provide instructions for where it can be
found.

```json
{
  "configuration": { "username": "abc", "password": "REDACTED" },
  "data": { "a": 1 },
  "cursor": "2020-01-19 00:00:00"
}
```

```json
{
  "configuration": ["SEE LAST PASS: 'client cred'"],
  "data": { "a": 1 },
  "cursor": "2020-01-19 00:00:00"
}
```

## adaptor

List the adaptor to be used for this job. If changes must be made to the
adaptor, explain why existing functions dont work and specify the new API you'd
like from a helper function.

```md
There is no "upsert" in postgres. I'd like an API where I can provide the table,
the UUID, and some data to upsert. Like this:

upsert('some_table', 'some_column', state.data.records);
```

## expression.js

In pseudocode, either in the current job expression or in a new file, describe
as best you can what changes need to be made

```js
each(
  'state.data.patients[*]' // PLEASE FIND THE PATIENTS AND DO THIS FOR EACH ONE
  create('object', fields(
    field('name', state.data.name)
    field('age', '????????') // PLEASE CALCULATE AGE
  ))
)
```

## output.json

Either provide the output you'd like, or describe it in terms of final state and
side effects.

### side effects

1. upsert new records to postgres

### output.json

```json
{
  "configuration": {},
  "data": { "statusCode": 200 },
  "references": { "a": 1 }
}
```
