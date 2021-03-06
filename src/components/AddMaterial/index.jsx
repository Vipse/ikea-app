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
            date: moment(),
            data: []
        }
    }
    handleSubmit = () => {
        console.log(this.state, "STATE", "ADD ITEM");
        if(!this.state.type || !this.state.volume || !this.state.power || !this.state.date || !this.state.weight) {
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
                "resources.weight": this.state.weight,
                "resources.owner": "[\"76531\"]",
                "resources.factory": "[\"76559\"]",
                "PropertySetGroup": "4168",
                "Name": `${moment().format("X")}`
            }
        }
        console.log(dataToSend, "datatosend")
        axios.post('http://178.172.201.108/~api/json/catalog/createNewObject', JSON.stringify(dataToSend))
            .then(res => {
                console.log(res, "RESPONSE ADDING ITEM")
                if(res.status === 200) {
                    message.success("Resource succesfully added")
                } else {
                    message.error("Add resource - failed")

                }
                this.clearAdminCache().then((res)=>{
                    this.getData();
                });
            })
            .catch(err => console.log(err, "ERROR"))
    }
    handleChange = (value, field) => {
        this.setState({[field]: value})
        console.log(`${value}`);
    }
    clearAdminCache = () => {
        console.log("clear cache")
        return axios.post('http://178.172.201.108/~api/json/catalog.ikea/clearCache');
    }
    getData = () => {
        let obj;
        if(window.localStorage.getItem("userId")) {
            obj = {filter: {
                user: window.localStorage.getItem("userId")
            }}
        }
        console.log("filter send to catalog.ikea/getCatalogData", obj)
        axios.post('http://178.172.201.108/~api/json/catalog.ikea/getCatalogData', JSON.stringify(obj))
            .then(res => {
                console.log(res, "RES OF GETTING MY MATERIALS")
                const catalog = res.data.document.modules["content-catalog"];
                    console.log(catalog[Object.keys(catalog)[0]].output.objects, "RESULT OF GETTING ALL MATERIALS");
                this.clearAdminCache();
                let parsedData;
                if(catalog[Object.keys(catalog)[0]].output.objects.length) {
                parsedData = catalog[Object.keys(catalog)[0]].output.objects.filter(item => item.resources.factory).map((item, index) => {
                    console.log("map")
                    return {
                        key: index,
                        resource: item.resources.type.selector.val,
                        power: item.resources.power,
                        weight: item.resources.weight || '-',
                        volume: item.resources.volume || '-',
                        date: moment(+item.resources.date*1000).format("DD.MM.YYYY"),
                        coordinates: item.resources.factory[0].company.coordinates,
                        id: item.resources.factory[0]._main.id,
                        contactInfo: `${item.resources.factory[0]._main.Name},
                        ${item.resources.factory[0].company.city},
                        ${item.resources.factory[0].company.address},
                        ${item.resources.factory[0].company.contactFio},
                        ${item.resources.factory[0].company.contactPhone}`,

                    }
                })
            } else {
                parsedData = [];
            }
                console.log("PARSED DATA MY ITEMS", parsedData)
                this.setState({data:parsedData})
                console.log(parsedData);

            })
            .catch(err => {
                this.setState({data:[]}) 
            })
    }
    componentDidMount() {
        this.getData();
    }
    handleDelete = (record) => {
        axios.delete(`http://178.172.201.108/~api/json/catalog/deleteObject/id/${record.id}`)
        .then(()=>{
            this.clearAdminCache();
        })
        .then(()=> {
            this.getData();
        })


    }
    render() {
        const dataSource = this.state.data;

        const columns = [{
            title: 'Resource',
            dataIndex: 'resource',
            key: 'resource',
        }, {
            title: 'Power, volume/day',
            dataIndex: 'power',
            key: 'power',
        }, {
            title: 'Weight, kg',
            dataIndex: 'weight',
            key: 'weight',
        }, {
            title: 'Volume, m3',
            dataIndex: 'volume',
            key: 'volume',
        }, {
            title: 'Avail. date',
            dataIndex: 'date',
            key: 'date',
        }, {
            title: 'Delete',
            dataIndex: 'delete',
            key: 'delete',
            render: (text, record) => {
                return <Button className='delete' type="danger" onClick={()=>this.handleDelete(record)}>Delete</Button>
            }
        },
    ];
        return (
            <div className='SearchTools'>
                <div className='dataGetters'>
                    <Select
                        showSearch
                        style={{width: "20%", marginRight: "5%"}}
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
                    <Input placeholder="weight, kg"
                           onChange={(e)=>this.handleChange(e.target.value, "weight")}
                           style={{width: "20%", marginRight: "5%"}}
                           value={this.state.weight}
                           type='number'

                    />

                    <DatePicker
                        onChange={(val)=>this.handleChange(val, 'date')}
                        style={{width: "20%"}}
                        defaultValue={this.state.date}
                    />
                </div>
                <Button type='primary' size="large" onClick={this.handleSubmit}>Add</Button>
                <Table dataSource={dataSource} columns={columns} style={{width:"100%"}} pagination={false}/>
            </div>
        );
    }
}

export default AddMaterial;