import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Table, Divider, Popconfirm, Form, Button, Icon, Input, Row, Col } from 'antd';

import LayoutContentWrapper from '../../../../components/utility/layoutWrapper';
import LayoutContent from '../../../../components/utility/layoutContent';
import CustomModal from './CustomModal';
import RevenueAction from '../../../../redux/app/development/revenue/actions';
import './style.css';

const { getIncome, addIncome, deleteIncome, editIncome } = RevenueAction;

const data = [];
const count = data.length;
const filterData = [];


class Revenue extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data, 
      count,
      editModal: false,
      addModal: false,
      adding: false,
      editing: false,
      filtering: false,
      filterDate: null,
      filterName: '',
      editingIncome: [],
      filterData
    };
    this.columns = [
      {
        title: "Client Name",
        dataIndex: 'client_name',
        // width: '40%',
        key: 'client_name',
        sorter: (a, b) => a.client_name.toLowerCase() < b.client_name.toLowerCase() ? 1 : -1,
        sortDirections: ['descend'],
      },
      {
        title: "street_name",
        dataIndex: 'street_name',
        // width: '15%',
        key: 'street_name',
        sorter: (a, b) => a.street_name.toLowerCase() < b.street_name.toLowerCase() ? 1 : -1,
        sortDirections: ['descend'],
      },
      {
        title: "Contact Name",
        dataIndex: 'contact_name',
        key: 'contact_name',
        sorter: (a, b) => a.contact_name.toLowerCase() < b.contact_name.toLowerCase() ? 1 : -1,
        sortDirections: ['descend'],
      },
      {
        title: "Email",
        dataIndex: 'email',
        // width: '15%',
        key: 'email',
        sorter: (a, b) => a.email.toLowerCase() < b.email.toLowerCase() ? 1 : -1,
        sortDirections: ['descend'],
      },
      {
        title: "State",
        dataIndex: 'state',
        // width: '40%',
        key: 'state',
        sorter: (a, b) => a.state.toLowerCase() < b.state.toLowerCase() ? 1 : -1,
        sortDirections: ['descend'],
      },
      {
        title: "Post code",
        dataIndex: 'postcode',
        // width: '40%',
        key: 'postcode',
        sorter: (a, b) => a.postcode.toLowerCase() < b.postcode.toLowerCase() ? 1 : -1,
        sortDirections: ['descend'],
      },
      {
        title: "Phone Number",
        dataIndex: 'phone',
        // width: '40%',
        key: 'phone',
        sorter: (a, b) => a.phone.toLowerCase() < b.phone.toLowerCase() ? 1 : -1,
        sortDirections: ['descend'],
      },
      {
        title: "Suburb",
        dataIndex: 'suburb',
        // width: '40%',
        key: 'suburb',
        sorter: (a, b) => a.suburb.toLowerCase() < b.suburb.toLowerCase() ? 1 : -1,
        sortDirections: ['descend'],
      },
      {
        title: '',
        dataIndex: 'action',
        key: 'action',
        render: (text, record) => (
          <span>
            <a  href="#/" onClick={() => this.showEditModal(record)} > { <Icon type="edit" theme="filled" /> } </a>
            <Divider type="vertical" />
            <Popconfirm
              title="Delete"
              onConfirm={() => this.handleDelete(record.key)}
            >
              <a href="#/"><Icon type="delete" theme="filled" /></a>
            </Popconfirm>
          </span>
        )
      },
    ];
  }


  componentDidMount = () => {
    this.props.getIncome();
  }

  componentDidUpdate = () => {
    const { deleteIncome, editedIncome } = this.props.data;
    if ((deleteIncome && deleteIncome === 204) || editedIncome) {
      this.props.getIncome();
    }
  }

  handleDelete = (key) => {
    this.props.deleteIncome(key);
  }
  handleAddOk = (newData) => {
    this.setState({ 
      addModal: false
    })
    console.log(this.state.addModal)
    this.props.addIncome(newData)
  }
  handleEditOk = (editData) => {
    console.log(editData)
    this.setState({
      addModal: false
    })
    this.props.editIncome(editData)
  }

  handleAddCancel = (e) => {
    this.setState({
      addModal: false,
      adding: false,
      editing: false,
      editingIncome: []
    });
  }

  showAddModal = () => {
    this.setState({
      addModal: true,
      adding: true,
      editing: false
    });
  }

  showEditModal = (record) => {
    this.setState({
      addModal: true,
      editing: true,
      adding: false,
      editingIncome: record
    });
  }

  onFilterNameChange = (evt) => {
    this.setState ({
      filterName: evt.target.value
    })
  }

  onFilter = () => {
    const { filterName } = this.state
    if (filterName !== '') {
      this.setState({
        filtering: true
      })
    } else {
      this.setState({
        filtering: false
      })
    }
    // let { filterData } = this.state
    const data = this.props.data.income
    
    const filterData2 = data.filter(
      item => item.client_name.toLowerCase().indexOf(filterName.toLowerCase()) !== -1
    )
    this.setState({
      filterData: filterData2
    });
  }
  

  render() {

    let { filterData, data, filtering } = this.state
    data = this.props.data.income;
    const FormModal = Form.create()(CustomModal);

    data.forEach(item => (
      item['key'] = item['id']
    ))
    
    return (

      <LayoutContentWrapper>
        <LayoutContent>
          <h1>WebIT Django Assessment</h1>
          
          <Row style={{ padding: '5px' }}>
            <Col span="6">
              <Button
                onClick={this.showAddModal} 
                type="primary"
                style={{
                  marginBottom: '10px'
                }}
              >
                <Icon type="plus-circle" theme="filled" />
                Add
              </Button>
            </Col>
            <Col span="18" className="gutter-row">
              <a style={{ float: 'right', margin: '5px' }} href="#/" onClick={ this.onFilter }><Icon type="search" /></a>
              <div style={{ float: 'right', margin: '0 5px' }} className="gutter-box">
                <Input 
                  placeholder="Client Name"
                  value={ this.state.filterName } 
                  onChange={ this.onFilterNameChange }
                >
                </Input>
              </div>
            </Col>
          </Row>
          <Row>
          </Row>
          
          <Table
            bordered
            dataSource={ filtering ? filterData : data }
            columns={this.columns}
          />
            <FormModal 
              editing={ this.state.editing } 
              adding={ this.state.adding }
              editingIncome={ this.state.editingIncome }
              visible = { this.state.addModal }
              onCancel = { () => this.handleAddCancel() }
              onAdd = { (newData) => this.handleAddOk(newData) }
              onEdit = { (editData) => this.handleEditOk(editData) }
              onSub = { () => this.handleSubmit() }
            />
          </LayoutContent>
        </LayoutContentWrapper>
    );
  }
}

const mapStateToProps = (state) => ({
  data: state.Revenue
})

const mapDispatchToProps = (dispatch) => ({
  ...bindActionCreators ({
      getIncome,
      addIncome,
      editIncome,
      deleteIncome
    }, 
    dispatch
  ),
})

const RevenueForm = Form.create({})(Revenue)
export {RevenueForm}
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RevenueForm);
