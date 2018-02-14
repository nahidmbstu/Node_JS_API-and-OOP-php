import React from 'react';

import { connect } from 'react-redux';

import { Link } from 'react-router';

import Messages from '../Messages';

import classnames from 'classnames';

import { saveBasicUser, getOneBasicUser, uploadFile } from '../../actions/basicAction';

//--------------------------------------------------------------------------

class BasicUser extends React.Component {

  constructor() {

    super();

    this.state = {

        data: []

    }

}

componentDidMount() {

    $.ajax({

        url: '/upload_file',

        dataType: 'json',

        cache: false,

        success: function(data) {

            this.setState({data: data});

        }.bind(this),

        error: function(xhr, status, err) {

            console.log( err);

        }.bind(this)

    });

}



handleFile(e) {

    e.preventDefault();



    var formData = new FormData($('form')[0]),

        isFileExist = !!$('input[type=file]')[0].files[0];



    if (isFileExist) {

        $.ajax({

            url:  '/upload_file',

            type: 'POST',

            data: formData,

            xhr: function () {

                var xhr = new window.XMLHttpRequest();

                xhr.upload.addEventListener("progress", function (e) {

                    if (e.lengthComputable) {

                        $('progress').attr({value: e.loaded, max: e.total});

                        $('#status').empty().text(parseInt((e.loaded / e.total * 100)) + '%');

                    }

                }, false);

                return xhr;

            }.bind(this),

            success: function (data) {

                this.setState({

                    data: JSON.parse(data)

                });

                $('#status').empty().text('Successfully loaded!');

            }.bind(this),

            error: function (xhr, status, err) {

                console.log( err);

            }.bind(this),

            cache: false,

            contentType: false,

            processData: false

        });

    } else {

        $('#status').empty().text('Please choose the file.');

    }

    }

  //----------------------------------------------------------------------------


  render() {

    var self = this,

    data = this.state.data,

    showListOfFiles = data.length > 0 ? '' : 'you have no any files yet..',

    files = data.map(function(file, index) {

        return (<File key={index} file={file}/>);

    });

    return (

      <div className="container ca-container">

        <div className="row">

          <div className="col-md-12">

            <h2> Add A New Basic User </h2>

            <hr />

          </div>

        </div>

       
          <div className="title">Available Files</div>

                <div>{showListOfFiles}</div>

                <div>{files}</div>

                <form id="uploadForm" className="form-padded" encType="multipart/form-data" onSubmit={this.handleFile.bind(this)}>

                    <input type="file" name="userFile"/>

                    <input type="submit" value="Upload File" name="submit"/>

                </form>

                <progress></progress>

                <span id="status" className="status-percentage"></span>





      </div>

    );

  }

}

// ======================== REDUX CONNECTORS ========================

const mapStateToProps = (state) => {

  return {

    basicUser: state.basicUser.basicUser

  };

};







export default connect(mapStateToProps)(BasicUser);

