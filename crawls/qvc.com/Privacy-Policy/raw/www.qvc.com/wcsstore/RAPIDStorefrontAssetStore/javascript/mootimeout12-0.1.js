/*
Class: Ajax
	timeout for the mootools 1.2 request class

Options:
	timeout - timeout in milliseconds; default is none
	onTimeout - timeout event

Author:
	Stefan Lange-Hegermann

License:
	Copyright (c) 2008 Stefan Lange-Hegermann
	
	Permission is hereby granted, free of charge, to any person obtaining a copy
	of this software and associated documentation files (the "Software"), to deal
	in the Software without restriction, including without limitation the rights
	to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
	copies of the Software, and to permit persons to whom the Software is
	furnished to do so, subject to the following conditions:
	
	The above copyright notice and this permission notice shall be included in
	all copies or substantial portions of the Software.
	
	THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
	IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
	FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
	AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
	LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
	OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
	THE SOFTWARE.
*/

TimedRequest = new Class({

	Extends: Request,
	
	options: {
		/*onTimeout:$empty,*/
		timeout:false
	},

	send: function(options){
		var timeout=(this.options.timeout || (options ? options.timeout: null));
		if (timeout) {
			this.timeoutTimer=window.setTimeout(this.callTimeout.bindWithEvent(this), timeout);
			this.addEvent('onComplete', this.removeTimer);
		}
		return this.parent(options);
	},

	callTimeout: function () {
		if (!this.running) return this;
		this.running = false;
		this.xhr.abort();
		this.xhr.onreadystatechange = $empty;
		this.xhr = new Browser.Request();
		this.onFailure();
		this.fireEvent('onTimeout');
	},
 
	removeTimer: function() {
		window.clearTimeout(this.timeoutTimer);
	}
});
