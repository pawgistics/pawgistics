// @flow

import React from 'react';
import { Switch, Route } from 'react-router';
import NaviconRound from 'react-icons/lib/io/navicon-round';
import { Row, Col, Fade, Alert, Modal, ModalHeader, ModalBody, ModalFooter, Button } from 'reactstrap';

import Sidebar from '../components/sidebar';
import AdminRoute from '../containers/admin-route';

import { UIProvider } from '../util/ui';

import HomePage from './home';
import DogsPage from './dogs';
import UsersPage from './users';
import FostersPage from './fosters';
import DogDetailPage from './dog-detail';
import ReturnDogPage from './return-dog';
// import MyProfilePage from './my-profile';
import UserDetailPage from './user-detail';
import AddDogPage from './add-dog';
import AddUserPage from './add-user';
// import AddLitterPage from './add-litter';
// import OutingRequestPage from './outing-request';
import EditUser from './edit-user';
import EditDogPage from './edit-dog';
import NotFoundPage from './not-found';

import {
  HOME_PAGE_ROUTE,
  DOGS_PAGE_ROUTE,
  USERS_PAGE_ROUTE,
  DOG_DETAIL_PAGE_ROUTE,
  // MY_PROFILE_PAGE_ROUTE,
  USER_DETAIL_PAGE_ROUTE,
  FOSTERS_PAGE_ROUTE,
  RETURN_DOG_PAGE_ROUTE,
  // OUTING_REQUEST_PAGE_ROUTE,
  ADD_DOG_PAGE_ROUTE,
  ADD_USER_PAGE_ROUTE,
  // ADD_LITTER_PAGE_ROUTE,
  EDIT_USER_PAGE_ROUTE,
  EDIT_DOG_PAGE_ROUTE,
} from '../routes';

import '../styles/pages/dashboard.m.scss';

class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      sidebarActive: false,
      alert: {
        visible: false,
        color: '',
        text: '',
      },
      confirmation: {
        visible: false,
        text: '',
        action: () => {},
      },
    };

    this.showSidebar = this.showSidebar.bind(this);
    this.hideSidebar = this.hideSidebar.bind(this);

    this.showAlert = (color, text) => {
      this.setState({
        alert: {
          visible: true,
          color,
          text,
        },
      });
      setTimeout(() => {
        this.hideAlert();
      }, 2000);
    };
    this.hideAlert = () => {
      this.setState({
        alert: {
          ...this.state.alert,
          visible: false,
        },
      });
    };

    this.showConfirmation = (text, action) => {
      this.setState({
        confirmation: {
          visible: true,
          text,
          action,
        },
      });
    };
    this.hideConfirmation = () => {
      this.setState({
        confirmation: {
          ...this.state.confirmation,
          visible: false,
        },
      });
    };
  }

  showSidebar() { this.setState({ sidebarActive: true }); }
  hideSidebar() { this.setState({ sidebarActive: false }); }

  render() {
    return (
      <>
        <Sidebar active={this.state.sidebarActive} onClick={this.hideSidebar} />
        <Fade
          in={this.state.sidebarActive}
          mountOnEnter
          unmountOnExit
          timeout={{ enter: 0, exit: 300 }}
          tag="div"
          baseClass=""
          styleName="overlay"
          onClick={this.hideSidebar}
        />
        <Alert
          style={{ position: 'fixed' }}
          styleName="alert"
          color={this.state.alert.color}
          isOpen={this.state.alert.visible}
          toggle={this.hideAlert}
        >
          {this.state.alert.text}
        </Alert>
        <Modal
          isOpen={this.state.confirmation.visible}
          toggle={this.hideConfirmation}
        >
          <ModalHeader toggle={this.hideConfirmation}>Confirmation</ModalHeader>
          <ModalBody>
            {this.state.confirmation.text}
          </ModalBody>
          <ModalFooter>
            <Row noGutters className="justify-content-end w-100">
              <Col xs="" sm="auto" className="mr-2 mx-sm-2 mb-sm-0">
                <Button block color="primary" size="lg" onClick={() => { this.hideConfirmation(); this.state.confirmation.action(); }}>Confirm</Button>
              </Col>
              <Col xs="" sm="auto" className="ml-2 mx-sm-2 mb-sm-0">
                <Button block outline size="lg" onClick={this.hideConfirmation}>Cancel</Button>
              </Col>
            </Row>
          </ModalFooter>
        </Modal>
        <div styleName="content">
          <div styleName="sidebar_btn">
            <Button outline onClick={this.showSidebar}>
              <NaviconRound size="2rem" />
            </Button>
          </div>
          <UIProvider
            value={{
              showAlert: this.showAlert,
              showConfirmation: this.showConfirmation,
            }}
          >
            <Switch>
              <Route exact path={HOME_PAGE_ROUTE} component={HomePage} />
              <Route exact path={DOGS_PAGE_ROUTE} component={DogsPage} />
              <Route exact path={USERS_PAGE_ROUTE} component={UsersPage} />
              <Route exact path={FOSTERS_PAGE_ROUTE} component={FostersPage} />
              <Route exact path={DOG_DETAIL_PAGE_ROUTE} component={DogDetailPage} />
              <Route exact path={USER_DETAIL_PAGE_ROUTE} component={UserDetailPage} />
              {/* <Route path={MY_PROFILE_PAGE_ROUTE} component={MyProfilePage} /> */}
              <AdminRoute exact path={ADD_DOG_PAGE_ROUTE} component={AddDogPage} />
              {/* <AdminRoute exact path={OUTING_REQUEST_PAGE_ROUTE}
              component={OutingRequestPage} /> */}
              <AdminRoute exact path={ADD_USER_PAGE_ROUTE} component={AddUserPage} />
              {/* <AdminRoute exact path={ADD_LITTER_PAGE_ROUTE} component={AddLitterPage} /> */}
              <AdminRoute exact path={RETURN_DOG_PAGE_ROUTE} component={ReturnDogPage} />
              <AdminRoute exact path={EDIT_USER_PAGE_ROUTE} component={EditUser} />
              <AdminRoute exact path={EDIT_DOG_PAGE_ROUTE} component={EditDogPage} />
              <Route component={NotFoundPage} />
            </Switch>
          </UIProvider>
        </div>
      </>
    );
  }
}

export default Dashboard;
