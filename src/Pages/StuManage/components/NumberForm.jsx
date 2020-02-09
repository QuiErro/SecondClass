import React, {Component} from 'react'
import { InputNumber, Form, Modal } from 'antd'

const NumberForm = Form.create({ name: 'form_in_modal' })(
    class extends Component {

        render() {
            const { visible, onCancel, onCreate, form } = this.props;
            const { getFieldDecorator } = form;
            return (
                <Modal
                    visible={visible}
                    title="设置奖项数量"
                    okText="确定"
                    cancelText="取消"
                    onCancel={onCancel}
                    onOk={onCreate}
                >
                    <Form 
                      layout="vertical"
                      labelCol= {{ span: 4 }}   
                      wrapperCol= {{ span: 8 }} 
                    >
                        <Form.Item label="特等奖">
                            {getFieldDecorator('best', {
                                rules: [{ required: true, message: '请设置特等奖数量!' }],
                            })(<InputNumber min={0} size="small"/>)}
                        </Form.Item>
                        <Form.Item label="一等奖">
                            {getFieldDecorator('first', {
                                rules: [{ required: true, message: '请设置一等奖数量!' }],
                            })(<InputNumber min={0} size="small"/>)}
                        </Form.Item>
                        <Form.Item label="二等奖">
                            {getFieldDecorator('second', {
                                rules: [{ required: true, message: '请设置二等奖数量!' }],
                            })(<InputNumber min={0} size="small"/>)}
                        </Form.Item>
                        <Form.Item label="三等奖">
                            {getFieldDecorator('third', {
                                rules: [{ required: true, message: '请设置三等奖数量!' }],
                            })(<InputNumber min={0} size="small"/>)}
                        </Form.Item>
                        <Form.Item label="优秀奖">
                            {getFieldDecorator('excellent', {
                                rules: [{ required: true, message: '请设置优秀奖数量!' }],
                            })(<InputNumber min={0} size="small"/>)}
                        </Form.Item>
                    </Form>
                </Modal>
            );
       }
    },
);

export default NumberForm;