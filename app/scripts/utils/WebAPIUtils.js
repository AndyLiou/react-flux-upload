var uploadAPIUrl = "http://profitget.net/api/file/upload/",
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
					auth_token: '',
					file_name: filename,
					file_data: event.target.result
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
				statusCode: {
					200: function (response) {
		         alert('1');
		         console.log(response);
		      }
				},
				success: function(data, textStatus, xhr) {

					// var obj = JSON.parse(response);
					// callback(obj);
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
