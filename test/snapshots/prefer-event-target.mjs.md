# Snapshot report for `test/prefer-event-target.mjs`

The actual snapshot is saved in `prefer-event-target.mjs.snap`.

Generated by [AVA](https://avajs.dev).

## Invalid #1
      1 | class Foo extends EventEmitter {}

> Error 1/1

    `␊
    > 1 | class Foo extends EventEmitter {}␊
        |                   ^^^^^^^^^^^^ Prefer \`EventTarget\` over \`EventEmitter\`.␊
    `

## Invalid #2
      1 | class Foo extends EventEmitter { someMethod() {} }

> Error 1/1

    `␊
    > 1 | class Foo extends EventEmitter { someMethod() {} }␊
        |                   ^^^^^^^^^^^^ Prefer \`EventTarget\` over \`EventEmitter\`.␊
    `

## Invalid #3
      1 | const Foo = class extends EventEmitter {}

> Error 1/1

    `␊
    > 1 | const Foo = class extends EventEmitter {}␊
        |                           ^^^^^^^^^^^^ Prefer \`EventTarget\` over \`EventEmitter\`.␊
    `

## Invalid #4
      1 | class Foo extends EventEmitter {
      2 | 	addListener() {}
      3 | 	removeListener() {}
      4 | }

> Error 1/1

    `␊
    > 1 | class Foo extends EventEmitter {␊
        |                   ^^^^^^^^^^^^ Prefer \`EventTarget\` over \`EventEmitter\`.␊
      2 | 	addListener() {}␊
      3 | 	removeListener() {}␊
      4 | }␊
    `

## Invalid #5
      1 | new EventEmitter

> Error 1/1

    `␊
    > 1 | new EventEmitter␊
        |     ^^^^^^^^^^^^ Prefer \`EventTarget\` over \`EventEmitter\`.␊
    `

## Invalid #6
      1 | const emitter = new EventEmitter;

> Error 1/1

    `␊
    > 1 | const emitter = new EventEmitter;␊
        |                     ^^^^^^^^^^^^ Prefer \`EventTarget\` over \`EventEmitter\`.␊
    `

## Invalid #7
      1 | for (const {EventEmitter} of []) {new EventEmitter}

> Error 1/1

    `␊
    > 1 | for (const {EventEmitter} of []) {new EventEmitter}␊
        |                                       ^^^^^^^^^^^^ Prefer \`EventTarget\` over \`EventEmitter\`.␊
    `

## Invalid #8
      1 | for (const EventEmitter of []) {new EventEmitter}

> Error 1/1

    `␊
    > 1 | for (const EventEmitter of []) {new EventEmitter}␊
        |                                     ^^^^^^^^^^^^ Prefer \`EventTarget\` over \`EventEmitter\`.␊
    `
