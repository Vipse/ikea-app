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
            factory: '',
            date: [],
            factories: [],
            factoryMaterials: []
        }
    }
    getFactoryMaterials = (id) => {
        const obj = {
            filter: {
                factory: id
            }
        }
        axios.post('http://178.172.201.108/~api/json/catalog.ikea/getCatalogData', JSON.stringify(obj))
            .then(res => {
                console.log(res);
                const catalog = res.data.document.modules["content-catalog"];

                console.log(res, "RES GETING");
                console.log(catalog[Object.keys(catalog)[0]].output.objects, "RESULT OF GETTING ALL MATERIALS");

                let parsedData;
                if(catalog[Object.keys(catalog)[0]].output.objects.length) {

                    parsedData = catalog[Object.keys(catalog)[0]].output.objects.filter(item => item.resources.factory).map((item, index) => {
                        console.log("map", item);
                        return {
                            key: index,
                            resource: item.resources.type.selector.val,
                            power: item.resources.power,
                            weight: item.resources.weight || '-',
                            volume: item.resources.volume || '-',
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
                console.log(parsedData, "PARSED DATA")
                this.setState({factoryMaterials:parsedData})
                console.log(parsedData);

            })
            .catch(err => {
                this.setState({factoryMaterials:[]})
            })
    }
    handleSubmit = () => {
        const obj = {};
        if(this.state.type || this.state.volume || this.state.date.length || this.state.factory) {
            obj.filter = {};
        }
        if(this.state.type) {
            obj.filter.type = this.state.type
        }
        if(this.state.factory) {
            obj.filter.factory = this.state.factory
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
                const catalog = res.data.document.modules["content-catalog"];

                console.log(res, "RES GETING");
                console.log(catalog[Object.keys(catalog)[0]].output.objects, "RESULT OF GETTING ALL MATERIALS");
                
                this.setState({factories: catalog[Object.keys(catalog)[1]].output.matrix['resources.factoryasc'].filterValues})
                let parsedData;
                if(catalog[Object.keys(catalog)[0]].output.objects.length) {
                
                parsedData = catalog[Object.keys(catalog)[0]].output.objects.filter(item => item.resources.factory).map((item, index) => {
                    return {
                        key: index,
                        resource: item.resources.type.selector.val,
                        power: item.resources.power,
                        weight: item.resources.weight || '-',
                        volume: item.resources.volume || '-',
                        date: moment(+item.resources.date*1000).format("DD.MM.YYYY"),
                        coordinates: item.resources.factory[0].company.coordinates,
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
                console.log(parsedData, "PARSED DATA")
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
        console.log(this.state.factories, "FACTORIES")
        const dataSource = this.state.data;
        const factoryMaterialsSource = this.state.factoryMaterials;


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
            title: 'Avail. date',
            dataIndex: 'date',
            key: 'date',
        }, {
            title: 'Contact Info',
            dataIndex: 'contactInfo',
            key: 'contactInfo',
        }];
        const columnsFactoryMaterials = [{
            title: 'Resource',
            dataIndex: 'resource',
            key: 'resource',
        }, {
            title: 'Weight',
            dataIndex: 'weight',
            key: 'weight',
        }, {
            title: 'Volume',
            dataIndex: 'volume',
            key: 'volume',
        }];


        return (
            <div className='SearchTools'>
                <div className='dataGetters'>
                    <Select
                        showSearch
                        style={{width: "15%", marginRight: "5%"}}
                        placeholder="Select material"
                        optionFilterProp="children"
                        onChange={val=>this.handleChange(val, "type")}
                        filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                    >
                        <Option value="">Select material</Option>
                        <Option value="76539">Wood</Option>
                        <Option value="76541">Glass</Option>
                        <Option value="76538">Metal</Option>
                        <Option value="76540">Plastic</Option>
                    </Select>
                    <Select
                        showSearch
                        style={{width: "15%", marginRight: "5%"}}
                        placeholder="Select factory"
                        optionFilterProp="children"
                        onChange={val=>this.handleChange(val, "factory")}
                        filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                    >
                        <Option value=''>Select factory</Option>
                        {this.state.factories.length && this.state.factories.map((item, index)=>{
                            return <Option key={index} value={item.value._main.id}>{item.value._main.Name}</Option>
                        })}
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
                    <div style={{width: '100%'}} className='mapAndTable'>
                        <YMaps>
                            <Map defaultState={{ center: [25,25], zoom: 1 }}
                                 width='70%'
                                 height={500}

                            >
                                {this.state.data && this.state.factories.map((item, index) => {
                                    const factoryId=item.value._main.id;
                                    return <Placemark
                                        onClick={()=>{this.getFactoryMaterials(factoryId)}}
                                        key={index}
                                        defaultGeometry={item.value.company.coordinates.split(",")}
                                    />
                                })}
                            </Map>
                        </YMaps>
                        {this.state.factoryMaterials.length > 0 && <div style={{width: "30%"}}>
                            <div className='contactInfo'>{this.state.factoryMaterials[0].contactInfo}</div>
                            <Table dataSource={factoryMaterialsSource} columns={columnsFactoryMaterials} style={{width:"100%"}} pagination={false}/>

                        </div>}
                    </div>


                }
            </div>
        );
    }
}

export default SearchTools;