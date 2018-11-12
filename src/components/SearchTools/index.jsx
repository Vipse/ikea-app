import React, {Component} from 'react';
import {Select, Input, DatePicker, Button, Table} from 'antd';
import './style.css'
import axios from 'axios'
import { YMaps, Map, Placemark } from 'react-yandex-maps';

const {RangePicker} = DatePicker;
const Option = Select.Option;




class SearchTools extends Component {
    constructor(props) {
        super(props);
        this.state={
            data:[]
        }
    }
    handleSubmit = () => {
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
                        date: item.resources.date,
                        coordinates: item.resources.factory[0].сompany.сoordinates,
                        // factoryName: item.resources.factory[0]._main.Name,
                        // city: item.resources.factory[0].сompany.city,
                        // address: item.resources.factory[0].сompany.address,
                        // contactFio: item.resources.factory[0].сompany.contactFio,
                        // contactPhone: item.resources.factory[0].сompany.contactPhone,
                        contactInfo: `${item.resources.factory[0]._main.Name},
                        ${item.resources.factory[0].сompany.city},
                        ${item.resources.factory[0].сompany.address},
                        ${item.resources.factory[0].сompany.contactFio},
                        ${item.resources.factory[0].сompany.contactPhone}`

                    }
                })
                this.setState({data:parsedData})
                console.log(parsedData);

            })
            .catch(err => {
                console.log(err);
            })
    }
    handleChange = (value) => {
        console.log(`${value}`);
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
        }, {
            title: 'Contact Info',
            dataIndex: 'contactInfo',
            key: 'contactInfo',
        }, /*{
            title: 'Weight',
            dataIndex: 'weight',
            key: 'weight',
        }, {
            title: 'Weight',
            dataIndex: 'weight',
            key: 'weight',
        }, {
            title: 'Weight',
            dataIndex: 'weight',
            key: 'weight',
        },*/
        ];


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
                <Button type='primary' size="large" onClick={this.handleSubmit}>Search</Button>
                {this.props.list ? <Table dataSource={dataSource} columns={columns} style={{width:"100%"}} pagination={false}/>:
                    <YMaps>
                        <Map defaultState={{ center: [25.545,24.4343], zoom: 4 }}
                             width='100%'
                             height={600}

                        >
                            {this.state.data && this.state.data.map((item,index)=>{
                                return <Placemark
                                key={index}
                                defaultGeometry={item.coordinates.split(",")}
                                defaultProperties={{hintContent:"123123123", balloonContent: "sdfjksdfjh"}}

                                />})}
                        </Map>
                    </YMaps>


                }
            </div>
        );
    }
}

export default SearchTools;