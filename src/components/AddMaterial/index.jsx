import React, {Component} from 'react';
import {Select, Input, DatePicker, Button} from 'antd';
import './style.css'

const {RangePicker} = DatePicker;
const Option = Select.Option;




class AddMaterial extends Component {
    handleSubmit = () => {
        console.log(this.state, "STATE", "ADD ITEM");
    }
    handleChange = (value) => {
        console.log(`${value}`);
    }
    render() {
        return (
            <div className='SearchTools'>
                <div className='dataGetters'>
                    <Select
                        showSearch
                        style={{width: "30%", marginRight: "5%"}}
                        placeholder="Select material"
                        optionFilterProp="children"
                        onChange={this.handleChange}
                        filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                    >
                        <Option value="76539">Wood</Option>
                        <Option value="76541">Glass</Option>
                        <Option value="76538">Metal</Option>
                        <Option value="76540">Plastic</Option>
                    </Select>
                    <Input placeholder="Needs in kgs"
                           onChange={this.handleChange}
                           style={{width: "20%", marginRight: "5%"}}


                    />
                    <RangePicker
                        onChange={this.handleChange}
                        style={{width: "40%"}}
                    />
                </div>
                <Button type='primary' size="large" onClick={this.handleSubmit}>Add</Button>

            </div>
        );
    }
}

export default AddMaterial;