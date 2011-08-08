# qunit-events

QUnit provides DOM Level 0 style placeholder functions you can override to
hook into interesting points in the test run cycle. However, just like DOM
Level 0 event handlers, you can only have one handler for given function at a
time.

This "plugin" implements an event-dispatching mechanism on top of those
placeholder functions:

Old:

    QUnit.testDone = function(data) {
      ...
    };

New:

    QUnit.on('test-done', function(data) {
      ...
    });

The big advantage of this approach is that you can register as many 
`test-done` (or other event) handlers as you like.


## Installation

Simply load qunit-events.js after the main qunit.js file:

    <script src="lib/qunit/qunit.js"></script>
    <script src="lib/qunit-events/qunit-events.js"></script>

## Events

Supported events:

- `begin`
- `test-start`
- `test-done`
- `module-start`
- `module-done`
- `done`

The argument sent to the event handler are exactly the same as the QUnit placeholder functions (i.e. an object with various properties). See [QUnit documentation](http://docs.jquery.com/Qunit#Integration_into_Browser_Automation_Tools) for more details.