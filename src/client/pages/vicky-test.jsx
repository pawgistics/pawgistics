// @flow
// This is the screen with user profile.
import React from 'react';
// import { Button } from 'reactstrap';

const VickyTestPage = () => (
  <div className="container">
    <div className="row">
      <div className="col-md-5  toppad  pull-right col-md-offset-3 ">
        <a href="edit.html" >Edit Profile</a>

        <a href="edit.html" >Logout</a>
        <br />
        <p className="text-info">May 05,2014,03:00 pm </p>
      </div>
      <div className="col-xs-12 col-sm-12 col-md-6 col-lg-6 col-xs-offset-0 col-sm-offset-0 col-md-offset-3 col-lg-offset-3 toppad" >


        <div className="panel panel-info">
          <div className="panel-heading">
            <h3 className="panel-title">Sheena Chung</h3>
          </div>
          <div className="panel-body">
            <div className="row">
              <div className="col-md-3 col-lg-3 " align="center"> <img alt="User Pic" src="http://babyinfoforyou.com/wp-content/uploads/2014/10/avatar-300x300.png" className="img-circle img-responsive" /> </div>

              <div className="col-xs-10 col-sm-10 hidden-md hidden-lg"> <br />
                <dl>
                  <dt>DEPARTMENT:</dt>
                  <dd>Administrator</dd>
                  <dt>HIRE DATE</dt>
                  <dd>11/12/2013</dd>
                  <dt>DATE OF BIRTH</dt>
                  <dd>11/12/2013</dd>
                  <dt>GENDER</dt>
                  <dd>Male</dd>
                </dl>
              </div>
              <div className=" col-md-9 col-lg-9 ">
                <table className="table table-user-information">
                  <tbody>
                    <tr>
                      <td>Department:</td>
                      <td>Programming</td>
                    </tr>
                    <tr>
                      <td>Hire date:</td>
                      <td>06/23/2013</td>
                    </tr>
                    <tr>
                      <td>Date of Birth</td>
                      <td>01/24/1988</td>
                    </tr>

                    <tr>
                      <tr>
                        <td>Gender</td>
                        <td>Female</td>
                      </tr>
                      <tr>
                        <td>Home Address</td>
                        <td>Kathmandu,Nepal</td>
                      </tr>
                      <tr>
                        <td>Email</td>
                        <td><a href="mailto:info@support.com">info@support.com</a></td>
                      </tr>
                      <td>Phone Number</td>
                      <td>123-4567-890(Landline)<br /><br />555-4567-890(Mobile)
                      </td>

                    </tr>

                  </tbody>
                </table>

                <button className="btn btn-primary">My Sales Performance</button>
                <button className="btn btn-primary">Team Sales Performance</button>
              </div>
            </div>
          </div>
          <div className="panel-footer">
            <button data-original-title="Broadcast Message" data-toggle="tooltip" className="btn btn-sm btn-primary"><span className="glyphicon glyphicon-envelope" /></button>
            <span className="pull-right">
              <button data-original-title="Edit this user" data-toggle="tooltip" className="btn btn-sm btn-warning"><span className="glyphicon glyphicon-edit" /></button>
              <button data-original-title="Remove this user" data-toggle="tooltip" className="btn btn-sm btn-danger"><span className="glyphicon glyphicon-remove" /></button>
            </span>
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default VickyTestPage;
