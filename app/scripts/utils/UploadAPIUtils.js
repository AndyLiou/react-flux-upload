var uploadAPIUrl = "http://profitget.net/api/file/upload/",
		deleteAPIUrl = "";

module.exports = {
		getItem:function(callback) {
			$.ajax({
				url: 'http://profitget.net/api/product/info/',
				type: 'GET',
				data: {
					product_id: 'AwyyZTD2LwqyMwSuAQqxATD1Mwt2ZGxjAwuyBQZ0MGuWnxIc'
				},
				dataType: 'json',
				complete: function(data, status) {
					var responseData = {};
					switch (data.status) {
						case 200:
							responseData = data.responseJSON;
							responseData.status = 'success';
							break;
						default:
							responseData.status = 'error';
							responseData.message = data.responseJSON['error'];
					}

					callback(responseData);
				}
			})
	},
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
				dataType: 'json',
				xhrFields: {
			    withCredentials: false
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
				complete: function(data, status) {
					var responseData = {};
					switch (data.status) {
						case 200:
							responseData.item = data.responseJSON;
							responseData.status = 'success';
							break;
						case 400:
							responseData.status = 'error';
							responseData.message = data.responseJSON['error'];
							break;
						case 403:
							responseData.status = 'error';
							responseData.message = data.responseJSON['error'];
							break;
						default:
							responseData.status = 'error';
							responseData.message = data.responseJSON['error'];
					}

					callback(responseData);
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
