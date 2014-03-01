(function() {
	var URL_BLANK_IMAGE = 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7';
	var elDrop = document.getElementById('dropzone');
	var elFiles = document.getElementById('files');

	elDrop.addEventListener('dragover', function(event) {
			event.preventDefault();
			event.dataTransfer.dropEffect = 'copy';
			showDropping();
	});

	elDrop.addEventListener('dragleave', function(event) {
			hideDropping();
	});

	elDrop.addEventListener('drop', function(event) {
			event.preventDefault();
			hideDropping();

			var files = event.dataTransfer.files;
			showFiles(files);
	});

	document.addEventListener('click', function(event) {
		var elTarget = event.target;
		if (elTarget.tagName === 'IMG') {
			var src = elTarget.src;
			var w = window.open('about:blank');
			var d = w.document;
			var title = escapeHtml(elTarget.getAttribute('title'));

			d.open();
			d.write('<title>' + title + '</title>');
			d.write('<img src="' + src + '" />');
			d.close();
		}
	});

	function showDropping() {
			elDrop.classList.add('dropover');
	}

	function hideDropping() {
			elDrop.classList.remove('dropover');
	}

	function showFiles(files) {
			elFiles.innerHTML = '';

			for (var i=0, l=files.length; i<l; i++) {
					var file = files[i];
					var elFile = buildElFile(file);
					elFiles.appendChild(elFile);
			}
	}

	function buildElFile(file) {
			var elFile = document.createElement('li');

			var text = file.name + ' (' + file.type + ',' + file.size + 'bytes)';
			elFile.appendChild(document.createTextNode(text));

			if (file.type.indexOf('image/') === 0) {
				var elImage = document.createElement('img');
				elImage.src = URL_BLANK_IMAGE;
				elFile.appendChild(elImage);

				attachImage(file, elImage);
			}

			return elFile;
	}

	function attachImage(file, elImage) {
		var reader = new FileReader();
		reader.onload = function(event) {
			var src = event.target.result;
			elImage.src = src;
			elImage.setAttribute('title', file.name);
		};
		reader.readAsDataURL(file);
	}

	function escapeHtml(source) {
		var el = document.createElement('div');
		el.appendChild(document.createTextNode(source));
		var destination = el.innerHTML;
		return destination;
	}
})();
