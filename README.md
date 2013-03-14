iOS Notes over GMail
====================

This library offers read access to iOS Notes (the official Apple Notes application) if the notes were configured to be synced with Google through IMAP ([see here how to do this](http://googlesystem.blogspot.ro/2010/06/save-iphone-notes-to-gmail-account.html)).

It is recommended to use an [application-specific password](http://support.google.com/accounts/bin/answer.py?hl=en&answer=185833) when connecting to the GMail IMAP server.

## Installation

`npm install ios-gmail-notes`

## Usage

 ```javascript
var notes = require("ios-gmail-notes").bind({
	user: 'your-account@gmail.com',
	password: 'your-app-specific-password'
});

notes.list({
	success: function(list) {
		console.log(list);
	},

	error: function(error) {
		console.log("ERROR: " + error);
	}
});
```

## Why is this useful?

If you're on a Windows / Linux machine, with no way to easily access your iOS Notes, it's very simple to use this library to fetch all the notes and dump them into separate txt files. 

When this library will also support write access, it can be used as a Dropbox-like sync tool for your notes.

## Dependencies

* imap package ([repository](https://github.com/mscdex/node-imap))

## Author

**Andrei Gheorghe**

* [About me](http://idevelop.github.com)
* LinkedIn: [linkedin.com/in/idevelop](http://www.linkedin.com/in/idevelop)
* Twitter: [@idevelop](http://twitter.com/idevelop)

## License

- This code is licensed under the MIT License.
