import React, { Component } from 'react'
import { Modal, Form, Input, Button } from 'antd';

export default class CustomModal extends Component {
  
  handleAddCancel = (e) => {
    this.props.onCancel()
  }

  // handleAddOk = (e) => {
  //   this.props.onAdd()
  // }
  handleSubmitEdit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (err) {
        alert('Please input correct values.');
      }
      console.log('editing value', values)
      this.props.onEdit(values)

    });
  }
  handleSubmitAdd = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (err) {
        alert('failed');
      }
      const newData = {
        ...values
      }
      this.props.onAdd(newData)
    });
    
  }

  render() {
    const { editing, adding, visible } = this.props;
    const { getFieldDecorator } = this.props.form;
    let { editingIncome } = this.props

    return (
      <Modal
        title={ editing? "Edit" : "Add"}
        visible={ visible }
        onCancel={this.handleAddCancel}
        style={{
          position: 'relative',
          top: '100px'
        }}
        footer={[
          <Button key="back" onClick={this.handleAddCancel}>Cancel</Button>,
          <Button 
            form="addPlan" 
            htmlType="submit" 
            key="submit"
            type="primary" 
            onClick={this.handleAddOk}
          >
            OK
          </Button>,
        ]}
      > 
        <Form 
          id="addPlan"
          onSubmit={!adding && editing ? this.handleSubmitEdit : this.handleSubmitAdd}
        >
        {/* to */}
          <Form.Item
            label="Client Name"
            labelCol={{ span: 5 }}
            wrapperCol={{ span: 12 }}
          >
            {getFieldDecorator('client_name', {
              rules: [{ required: true, message: 'Please input Client!' }],
              initialValue: (!adding && editing) ? editingIncome.client_name : ''
            })(
              <Input />
            )}
          </Form.Item>
        {/* from */}
          <Form.Item
            label="Street Name"
            labelCol={{ span: 5 }}
            wrapperCol={{ span: 12 }}
          >
            {getFieldDecorator('street_name', {
              rules: [{ required: true, message: 'Please input your Street Name!' }],
              initialValue: (!adding && editing) ? editingIncome.street_name : ''
            })(
              <Input />
            )}
          </Form.Item>
        {/* price   */}
          <Form.Item
            label="Suburb"
            labelCol={{ span: 5 }}
            wrapperCol={{ span: 12 }}
          >
            {getFieldDecorator('suburb', {
              rules: [{ required: true, message: 'Please inout your Funds!' }],
              initialValue: (!adding && editing) ? editingIncome.suburb : ''
            })(
              <Input />
            )}
          </Form.Item>
          { <Form.Item
              label="Post code"
              labelCol={{ span: 5 }}
              wrapperCol={{ span: 12 }}
            >
              {getFieldDecorator('postcode', {
                initialValue: (!adding && editing) ? editingIncome.postcode : ''
              })(
                <Input />
              )}
            </Form.Item>
          }
          { 
            <Form.Item
              label="State"
              labelCol={{ span: 5 }}
              wrapperCol={{ span: 12 }}
            >
              {getFieldDecorator('state', {
                initialValue: (!adding && editing) ? editingIncome.state : ''
              })(
                <Input />
              )}
            </Form.Item>
          }
        {/* description  */}
          <Form.Item
            label="Email"
            labelCol={{ span: 5 }}
            wrapperCol={{ span: 12 }}
          >
            {getFieldDecorator('email', {
              initialValue: (!adding && editing) ? editingIncome.email : ''
            })(
              <Input />
            )}
            
          </Form.Item>
          <Form.Item
            label="Phone"
            labelCol={{ span: 5 }}
            wrapperCol={{ span: 12 }}
          >
            {getFieldDecorator('phone', {
              initialValue: (!adding && editing) ? editingIncome.phone : ''
            })(
              <Input />
            )}
            
          </Form.Item>
          <Form.Item
            label="Contact Name"
            labelCol={{ span: 5 }}
            wrapperCol={{ span: 12 }}
          >
            {getFieldDecorator('contact_name', {
              initialValue: (!adding && editing) ? editingIncome.contact_name : ''
            })(
              <Input />
            )}
            
          </Form.Item>
        {/* hidden key if it is editing...   */}
          
          { (editing) & (<Form.Item
              labelCol={{ span: 5 }}
              wrapperCol={{ span: 12 }}
            >
              {getFieldDecorator('key', {
                initialValue: editingIncome.key
              })(
                <Input type="hidden"/>
              )}
            </Form.Item>)
          }
          
        </Form>
      </Modal>
    )
  }
}
