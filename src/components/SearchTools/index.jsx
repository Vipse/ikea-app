import React, {Component} from 'react';
import {Select, Input, DatePicker, Button, Table} from 'antd';
import './style.css'
import axios from 'axios'
import moment from 'moment'
import { YMaps, Map, Placemark } from 'react-yandex-maps';

const {RangePicker} = DatePicker;
const Option = Select.Option;




class SearchTools extends Component {
    constructor(props) {
        super(props);
        this.state={
            type:'',
            volume: '',
            date: []
        }
    }
    handleSubmit = () => {
        console.log("SEARCH STATE")
        const obj = {};
        if(this.state.type || this.state.volume || this.state.date.length) {
            obj.filter = {};
        }
        if(this.state.type) {
            obj.filter.type = this.state.type
        }
        if(this.state.volume) {
            obj.filter.volume = this.state.volume
        }
        if(this.state.date.length) {
            obj.filter.date=[];
            obj.filter.date[0] = +moment(this.state.date[0]).format("X");
            obj.filter.date[1] = +moment(this.state.date[1]).format("X");
        }

        console.log(obj, "OBJ TO SEND");
        axios.post('http://178.172.201.108/~api/json/catalog.ikea/getCatalogData', JSON.stringify(obj))
            .then(res => {
                console.log(res, "RES GETING");
                console.log(res.data.document.modules["content-catalog"][14010].output.objects, "RESULT OF GETTING ALL MATERIALS");
                let parsedData;
                if(res.data.document.modules["content-catalog"][14010].output.objects.length) {
                parsedData = res.data.document.modules["content-catalog"][14010].output.objects.map((item, index) => {
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
            } else {
                parsedData = [];
            }
                this.setState({data:parsedData})
                console.log(parsedData);

            })
            .catch(err => {
                this.setState({data:[]}) 
            })
    }
    handleChangeDate = (date, dateString) => {
        this.setState({date: date})
    }
    handleChange = (value, field) => {
        this.setState({[field]: value})
        console.log(`${value}`);
    }
    componentDidMount() {
        this.handleSubmit();
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
        }];


        return (
            <div className='SearchTools'>
                <div className='dataGetters'>
                    <Select
                        showSearch
                        style={{width: "30%", marginRight: "5%"}}
                        placeholder="Select material"
                        optionFilterProp="children"
                        onChange={val=>this.handleChange(val, "type")}
                        filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                    >
                        <Option value="76539">Wood</Option>
                        <Option value="76541">Glass</Option>
                        <Option value="76538">Metal</Option>
                        <Option value="76540">Plastic</Option>
                    </Select>
                    <Input placeholder="Volume needs, m3"
                           onChange={e=>this.handleChange(e.target.value, 'volume')}
                           style={{width: "20%", marginRight: "5%"}}
                           type='number'


                    />
                    <RangePicker
                        onChange={this.handleChangeDate}
                        style={{width: "40%"}}


                    />
                </div>
                <Button type='primary' size="large" onClick={this.handleSubmit}>Search</Button>
                {this.props.list ? <Table dataSource={dataSource} columns={columns} style={{width:"100%"}} pagination={false}/>:
                    <YMaps>
                        <Map defaultState={{ center: [25,25], zoom: 1 }}
                             width='100%'
                             height={400}

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