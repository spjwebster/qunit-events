/**
* qunit-events - a "plugin" for QUnit to dispatch events at test/module/run 
* start and done.
*
* LICENSE:
*
* Licensed under MIT: http://www.opensource.org/licenses/mit-license.php
*
* Copyright (c) 2011 Steve Webster.
* 
* Permission is hereby granted, free of charge, to any person obtaining a copy
* of this software and associated documentation files (the "Software"), to
* deal in the Software without restriction, including without limitation the
* rights to use, copy, modify, merge, publish, distribute, sublicense, and/or
* sell copies of the Software, and to permit persons to whom the Software is
* furnished to do so, subject to the following conditions:
*
* The above copyright notice and this permission notice shall be included in
* all copies or substantial portions of the Software.
* 
* THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
* IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
* FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
* AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
* LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
* FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS
* IN THE SOFTWARE.
*/

(function() {
	var listeners = {};

	QUnit.extend( QUnit, {
	    on: function(type, callback) {
    		if ( false === type in listeners ) {
    			listeners[type] = [];
    		}
    		listeners[type].push(callback);
    	}
	});
	
	function dispatch(type, data) {
		if ( type in listeners ) {
			for ( var i = listeners[type].length - 1; i >= 0; i-- ) {
				listeners[type][i].call(QUnit, data);
			}
		}
	}
	
	var oldTestStart = QUnit.testStart;
	QUnit.testStart = function(o) {
		oldTestStart.call(QUnit, o);
		dispatch('test-start', o);
	};

	var oldTestDone = QUnit.testDone;
	QUnit.testDone = function(o) {
		oldTestDone.call(QUnit, o);
		dispatch('test-done', o);
	};

	var oldModuleStart = QUnit.moduleStart;
	QUnit.moduleStart = function(o) {
		oldModuleStart.call(QUnit, o);
		dispatch('module-start', o);
	};

	var oldModuleDone = QUnit.moduleDone;
	QUnit.moduleDone = function(o) {
		oldModuleDone.call(QUnit, o);
		dispatch('module-done', o);
	};

	var oldBegin = QUnit.begin;
	QUnit.begin = function(o) {
		oldBegin.call(QUnit, o);
		dispatch('begin', o);
	};
	
	var oldDone = QUnit.done;
	QUnit.done = function(o) {
		oldDone.call(QUnit, o);
		dispatch('done', o);
	};	
}());