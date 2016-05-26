var uploadAPIUrl = "http://localhost/test/api_upload.php",
		deleteAPIUrl = "";

module.exports = {
	uploadFile: function(file, callback) {
		var reader = new FileReader();
		reader.readAsDataURL(file);
		reader.onload = function(event) {
			var filename = file.name;

			$.ajax({
				url: uploadAPIUrl,
				type: 'POST',
				data: {
					data: event.target.result,
					fileName: filename
				},
				xhr: function() {
          var myXhr = $.ajaxSettings.xhr();
          if(myXhr.upload){

							//return current progress
              myXhr.upload.addEventListener('progress', function(e) {
								var done = e.position || e.loaded;
  							var total = e.totalSize || e.total;

								callback({progress: Math.round(done/total*100)});
							}, false);
          }
          return myXhr;
        },
				success: function(response) {
					var obj = JSON.parse(response);
					callback(obj);
        }
			})
		};
	},

	deleteFile(fileId, callback) {
		$.ajax({
			url: deleteAPIUrl,
			type: 'POST',
			data: {
				id: fileId
			},
			success: function(response) {
				var obj = JSON.parse(response);
				callback(obj);
			}
		})
	}
};
