import React, {Component} from 'react'
import { Select, Form, Modal } from 'antd'

const { Option } = Select;

const IntegralForm = Form.create({ name: 'form_in_modal' })(
    class extends Component {

        render() {
            const { visible, onCancel, onCreate, form, name } = this.props;
            return (
                <Modal
                    visible={visible}
                    title="修改积分"
                    okText="确定"
                    cancelText="取消"
                    onCancel={onCancel}
                    onOk={onCreate}
                >
                    <p>{name}</p>
                    <Form 
                      layout="inline"
                    >
                        <Form.Item>
                            <Select
                                showSearch
                                placeholder="无"
                                style={{ width: 120 }}
                            >
                                <Option value="特等奖">特等奖</Option>
                                <Option value="一等奖">一等奖</Option>
                                <Option value="二等奖">二等奖</Option>
                                <Option value="三等奖">三等奖</Option>
                                <Option value="优秀奖">优秀奖</Option>
                                <Option value="无">无</Option>
                            </Select>     
                        </Form.Item>
                        <Form.Item>
                            <Select
                                showSearch
                                placeholder="0"
                                style={{ width: 100 }}
                            >
                                <Option value="10">10</Option>
                                <Option value="9">9</Option>
                                <Option value="8">8</Option>
                                <Option value="7">7</Option>
                                <Option value="6">6</Option>
                                <Option value="5">5</Option>
                                <Option value="4">4</Option>
                                <Option value="3">3</Option>
                                <Option value="2">2</Option>
                                <Option value="1">1</Option>
                                <Option value="0">0</Option>
                            </Select>
                        </Form.Item>
                    </Form>
                </Modal>
            );
       }
    },
);

export default IntegralForm;