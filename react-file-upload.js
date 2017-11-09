import React from 'react';

import { connect } from 'react-redux';

// import {bindActionCreators} from 'redux'

import { Link } from 'react-router';

import Messages from '../Messages';

import classnames from 'classnames';

import { saveBasicUser, getOneBasicUser, uploadFile } from '../../actions/basicAction';

//--------------------------------------------------------------------------







class BasicUser extends React.Component {

  // constructor(props) {

  //   super(props);

  //   this.state = { name: '', phone: '', account_status: '',

  //    address: '', shop_name: '', ext_req: '' ,backup_database: '',

  //    db_expiry: '', ser_expiry: '',

  //    re_amount :'', sale_by: '', sale_date:''};

  //   //this.props.dispatch(getOneBasicUser(this.props.params.id));

  //   this.handleChange = this.handleChange.bind(this);

  //   this.handleSubmit = this.handleSubmit.bind(this);



  // }

  // // //--------------------------------------------------------------------------

  // // componentWillReceiveProps(newProps) {

  // //   console.log('componentWillReceiveProps');

  // //   console.log(newProps)

  // //   this.setState({

  // //     name: newProps.basicUser.name,

  // //     phone: newProps.basicUser.phone

  // //   })

  // // }

  // //--------------------------------------------------------------------------

  // handleChange(event) {

  //   this.setState({

  //     [event.target.name]: event.target.value

  //   });

  // }

  // //--------------------------------------------------------------------------

  // handleSubmit(event) {

  //   event.preventDefault();

  //   var userId = this.props.params.id;

  //   var obj = {};

  //   obj["name"] = this.state.name

  //   obj["shop_name"] = this.state.shop_name

  //   obj["address"] = this.state.address

  //   obj["phone"] = this.state.phone

  //   obj["ext_req"] = this.state.ext_req

  //   obj["backup_database"] = this.state.backup_database

  //   obj["db_expiry"] = this.state.db_expiry

  //   obj["ser_expiry"] = this.state.ser_expiry

  //   obj["re_amount"] = this.state.re_amount

  //   obj["sale_by"] = this.state.sale_by

  //   obj["sale_date"] = this.state.sale_date

  //   obj["account_status"] = this.state.account_status

    

  //    this.props.dispatch(saveBasicUser(obj))

   

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



  //--------------------------------------------------------------------------

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

        {/* <form onSubmit={this.handleSubmit} encType="multipart/form-data">

          <div className="row">

            <div className="col-md-12">

            <div className="col-md-6">

              <div className="form-group">

                <label>

                  Name:

               </label>

                <input type="text" className="form-control" name="name" value={this.state.name} onChange={this.handleChange} placeholder="Zahid Hasan" />

              </div>

              <div className="form-group">

                <label>shop_name</label>

                <input type="text" className="form-control" name="shop_name" value={this.state.shop_name} onChange={this.handleChange} placeholder="Zahid's General Store" />

              </div>

              <div className="form-group">

                <label>shop_address</label>

                <input type="text" className="form-control" name="address" value={this.state.address} onChange={this.handleChange} placeholder="Store Address" />

              </div>

              <div className="form-group">

                <label>

                  phone:

                </label>

                <input type="text" className="form-control" name="phone" value={this.state.phone} onChange={this.handleChange} placeholder="Phone Number" />

              </div>

              <div className="form-group">

                <label>

                extra requirement:

                </label>

                <textarea  rows="8" cols="50"  type="text" className="form-control" name="ext_req" value={this.state.ext_req} onChange={this.handleChange} placeholder="extra requirement" />

              </div>

              <div className="form-group">

                <label>backup_database</label>

                <select className="form-control" value={this.state.backup_database} name="backup_database" onChange={this.handleChange}>

                  <option value="true">True</option>

                  <option value="false">False</option>

                </select>

              </div>

              </div>

              <div className="col-md-6">

              <div className="form-group">

                <label> Databse Backup Expiry Date</label>

                <input type="date" className="form-control" name="db_expiry" onChange={this.handleChange} value={this.state.db_expiry} placeholder="12/28/18" />

              </div>

              <div className="form-group">

                <label> Service Expiry Date</label>

                <input type="date" className="form-control" name="ser_expiry" onChange={this.handleChange} value={this.state.ser_expiry} placeholder="12/28/18" />

              </div>

              <div className="form-group">

                <label> Sale Date</label>

                <input type="date" className="form-control" name="sale_date" onChange={this.handleChange} value={this.state.sale_date} placeholder="12/28/18" />

              </div>



              <div className="form-group">

                <label>

                  Sale By :

                </label>

                <input type="text" className="form-control" name="sale_by" value={this.state.sale_by} onChange={this.handleChange} placeholder="sale_by whom" />

              </div>

              <div className="form-group">

                <label>

                  Received Amount:

                </label>

                <input type="text" className="form-control" name="re_amount" value={this.state.re_amount} onChange={this.handleChange} placeholder="Received Amount" />

              </div>

              </div>



              <div className="col-md-12">

              <div className="panel-heading">

                <h3 >Account Status</h3>

              </div>

              <div className="form-group">

                <label className="radio-inline">

                  <input type="radio" name="account_status" onChange={this.handleChange} value="active" checked={this.state.account_status === 'active'} /> Active

                    </label>

                <label className="radio-inline">

                  <input type="radio" name="account_status" onChange={this.handleChange} value="pending" checked={this.state.account_status === 'pending'} /> Pending

                    </label>

                <label className="radio-inline">

                  <input type="radio" name="account_status" onChange={this.handleChange} value="suspended" checked={this.state.account_status === 'suspended'} /> Suspended

                    </label>

                <label className="radio-inline">

                  <input type="radio" name="account_status" onChange={this.handleChange} value="deleted" checked={this.state.account_status === 'deleted'} /> Deleted

                    </label>

              </div>



              </div>



             

              <div className="col-md-12">

             

             

              <div className="btn-group" role="group">

                <button type="submit" className="btn btn-success btn-lg">Submit</button>

              </div>

              </div>

              <div className="col-md-12">

                <hr/>

              </div>

            

            </div>

          </div>

        </form> */}

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

