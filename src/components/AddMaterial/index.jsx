import React, {Component} from 'react';
import {Select, Input, DatePicker, Button, message, Table} from 'antd';
import moment from 'moment';
import axios from 'axios';
import './style.css'

const Option = Select.Option;




class AddMaterial extends Component {
    constructor(props) {
        super(props);
        this.state = {
            type:'',
            volume: '',
            power: '',
            date: ''
        }
    }
    handleSubmit = () => {
        console.log(this.state, "STATE", "ADD ITEM");
        if(!this.state.type || !this.state.volume || !this.state.power || !this.state.date) {
            message.error("Please, fill all fields")
            return
        }
        const dataToSend = {
            "ancestor": "4224",
            "objType": "_CATOBJ",
            "basic": "%SAMEASID%",
            "params": {
                "resources.type": this.state.type,
                "resources.date": moment(this.state.date).format("X"),
                "resources.volume": this.state.volume,
                "resources.power": this.state.power,
                "resources.weight": "",
                "resources.owner": "[\"76531\"]",
                "resources.factory": "[\"76532\"]",
                "PropertySetGroup": "4168",
                "Name": `${moment().format("X")}`
            }
        }
        console.log(dataToSend, "datatosend")
        //http://178.172.201.108/~api/json/catalog/createNewObject
        axios.post('http://178.172.201.108/~api/json/catalog/createNewObject', JSON.stringify(dataToSend))
            .then(res => {
                console.log(res, "RESPONSE ADDING ITEM")
            })
            .catch(err => console.log(err, "ERROR"))
    }
    handleChange = (value, field) => {
        this.setState({[field]: value})
        console.log(`${value}`);
    }

    componentDidMount() {
        const obj = {
            "url": "/catalog"
        };
        axios.post('http://178.172.201.108/~api/json/pages/headlessRoute', JSON.stringify(obj))
            .then(res => {
                console.log(res.data.document.modules["content-catalog"][13994].output.objects, "RESULT OF GETTING ALL MATERIALS");
                let parsedData = res.data.document.modules["content-catalog"][13994].output.objects.map((item, index) => {
                    return {
                        key: index,
                        resource: item.resources.type.selector.val,
                        power: item.resources.power,
                        weight: item.resources.weight || '-',
                        volume: item.resources.volume || '-',
                        date: moment(+item.resources.date*1000).format("DD.MM.YYYY"),
                        coordinates: item.resources.factory[0].company.coordinates,
                        // factoryName: item.resources.factory[0]._main.Name,
                        // city: item.resources.factory[0].сompany.city,
                        // address: item.resources.factory[0].сompany.address,
                        // contactFio: item.resources.factory[0].сompany.contactFio,
                        // contactPhone: item.resources.factory[0].сompany.contactPhone,
                        contactInfo: `${item.resources.factory[0]._main.Name},
                        ${item.resources.factory[0].company.city},
                        ${item.resources.factory[0].company.address},
                        ${item.resources.factory[0].company.contactFio},
                        ${item.resources.factory[0].company.contactPhone}`

                    }
                })
                this.setState({data:parsedData})
                console.log(parsedData);

            })
            .catch(err => {
                console.log(err);
            })
    }
    render() {
        const dataSource = this.state.data;

        const columns = [{
            title: 'Resource',
            dataIndex: 'resource',
            key: 'resource',
        }, {
            title: 'Power',
            dataIndex: 'power',
            key: 'power',
        }, {
            title: 'Weight',
            dataIndex: 'weight',
            key: 'weight',
        }, {
            title: 'Volume',
            dataIndex: 'volume',
            key: 'volume',
        }, {
            title: 'Date',
            dataIndex: 'date',
            key: 'date',
        }];
        return (
            <div className='SearchTools'>
                <div className='dataGetters'>
                    <Select
                        showSearch
                        style={{width: "25%", marginRight: "5%"}}
                        placeholder="Select material"
                        optionFilterProp="children"
                        onChange={(val)=>this.handleChange(val, 'type')}
                        filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                    >
                        <Option value="[76539]">Wood</Option>
                        <Option value="[76541]">Glass</Option>
                        <Option value="[76538]">Metal</Option>
                        <Option value="[76540]">Plastic</Option>
                    </Select>
                    <Input placeholder="volume, m3"
                           onChange={(e)=>this.handleChange(e.target.value, 'volume')}
                           style={{width: "20%", marginRight: "5%"}}
                           value={this.state.volume}
                           type='number'
                    />
                    <Input placeholder="power, v/month"
                           onChange={(e)=>this.handleChange(e.target.value, "power")}
                           style={{width: "20%", marginRight: "5%"}}
                           value={this.state.power}
                           type='number'

                    />

                    <DatePicker
                        onChange={(val)=>this.handleChange(val, 'date')}
                        style={{width: "35%"}}
                    />
                </div>
                <Button type='primary' size="large" onClick={this.handleSubmit}>Add</Button>
                <Table dataSource={dataSource} columns={columns} style={{width:"100%"}} pagination={false}/>
            </div>
        );
    }
}

export default AddMaterial;