var imap = require('imap');

exports.bind = function(options, callback) {
	return new gmailConnection(options, callback);
};

function gmailConnection(options) {
	this.imap = new imap({
		user: options.user,
		password: options.password,
		host: 'imap.gmail.com',
		port: 993,
		secure: true
	});
}

gmailConnection.prototype.open = function(callback) {
	var imap = this.imap;
	imap.connect(function(err) {
		if (err) return callback(err);

		imap.openBox('Notes', true, function(err, mailbox) {
			if (err) return callback(err);

			callback(null, imap);
		});
	});
};

gmailConnection.prototype.close = function() {
	this.imap.logout();
}

gmailConnection.prototype.list = function(options) {
	options = options || {};
	options.success = options.success || doNothing;
	options.error = options.error || doNothing;

	var connection = this;
	this.open(function(err, imap) {
		if (err) return options.error(err);

		imap.search(['SEEN', ['ALL']], function(err, results) {
			if (err) return options.error(err);

			var total = results.length;
			imap.fetch(results, {
				headers: ['subject', 'date', 'X-Uniform-Type-Identifier'],
				body: true,
				cb: function(fetch) {
					var list = [];
					fetch.on('message', function(msg) {
						var isNote = true;
						var note = {
							text: ''
						};

						msg.on('headers', function(hdrs) {
							note.date = hdrs.date[0];
							note.subject = hdrs.subject[0];
							if (typeof hdrs['x-uniform-type-identifier'] == "undefined") {
								isNote = false;
							}
						});

						msg.on('data', function(chunk) {
							note.text += chunk.toString('utf8');
						});

						msg.on('end', function() {
							if (isNote) list.push(note);

							total--;
							if (total === 0) {
								options.success(list);
							}
						});
					});
				}
			}, function(err) {
				if (err) return options.error(err);
				connection.close();
			});
		});
	});
};

function doNothing() {
	// :-|
}