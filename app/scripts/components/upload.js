import React from 'react'
import Dropzone from './dropzone'
import UploadAction from '../actions/UploadAction'
import UploadStore from '../stores/UploadStore'

function getFilesFromStore() {
  return {
    files: UploadStore.getFiles(),
    preview_src: ""
  };
}

export default React.createClass({
  getInitialState() {
    return {
      files: []
    };
  },

  componentDidMount() {
    UploadStore.addChangeListener(this._onChange);
  },

  componentWillUnmount() {
    UploadStore.removeChangeListener(this._onChange);
  },

  onDrop(file) {
    UploadAction.addFile(file)
  },

  uploadFile(e) {
    var fileIndex = parseInt(e.target.value, 10);
    var files = this.state.files;

    UploadAction.uploadFile(files[fileIndex], fileIndex);
  },

  uploadAllFile(e) {
    UploadAction.uploadAllFile(this.state.files);
  },

  cancelFile(e) {
    var fileIndex = parseInt(e.target.value, 10);
    UploadAction.cancelFile(fileIndex);
  },

  deleteFile(e) {
    var fileIndex = parseInt(e.target.value, 10);
    var files = this.state.files;

    var fileId = files[taskIndex].id;
    UploadAction.deleteFile(files[fileIndex].id, fileIndex);
  },

  previewImg(e) {
    this.setState({
      preview_src: e.target.src
    });
    $('#imagemodal').modal('show');
  },

  _onChange() {
    this.setState(getFilesFromStore());
  },

  render() {
    var that = this;

    var row_padding = {
      paddingLeft: 5,
      paddingRight: 5
    };

    function imagePreview(value, index) {
      var barWidth = {},
          message = null;
      if(value.progress) {
        barWidth = {
          width: value.progress+"%",
          height: "2px",
          padding: "1px"
        };
      }
      if(value.status === 'error') {
        message = <span><span className="label label-danger">{value.status}</span>{value.message}</span>;
      }

      return(
        <div className='row preview-row' key={index}>
          <p style={barWidth}></p>
          <div className='col-xs-2' style={row_padding}><div className='img-wrapper'><img src={value.preview} onClick={that.previewImg}/></div></div>
          <div className='col-xs-5 filename'><span>{value.name}</span> {message}</div>
          <div className='col-xs-2 text-right' style={row_padding}>{Math.ceil(value.size / 1024)} kb</div>
          <div className='col-xs-3 text-right' style={row_padding}>
            &nbsp;
            <button type="button" className={'btn btn-danger ' + (!value.id ? 'hidden':'')} onClick={that.deleteFile} value={index}>刪除</button>&nbsp;
            <button type="button" className={'btn btn-primary ' + (value.id ? 'hidden':'')} onClick={that.uploadFile} value={index}>上傳</button>&nbsp;
            <button type="button" className={'btn btn-warning ' + (value.id ? 'hidden':'')} onClick={that.cancelFile} value={index}>取消</button>&nbsp;
          </div>
        </div>
      );
    }

    return (
      <div>
        <div className='dropzone'>
          <Dropzone
            onDrop={this.onDrop}
          >
            <div>拖拉檔案至此或點擊選擇檔案</div>
          </Dropzone>

          <div className="form-group text-right">
            {this.state.files.length ? <button className='btn btn-success' onClick={this.uploadAllFile}>全部上傳</button> : ''}
          </div>

          <div className='dropzone-preview'>
            {this.state.files.length > 0 ? this.state.files.map(imagePreview) : null}
          </div>
        </div>

        <div className="modal fade text-center" id="imagemodal" tabindex="-1" role="dialog">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <button type="button" className="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                <h4 className="modal-title">圖片預覽</h4>
              </div>
              <div className="modal-body">
                <img src={this.state.preview_src}/>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
});
