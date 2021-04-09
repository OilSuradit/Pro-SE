import React from 'react';


import './DashBoard.css';

import {
    Button,
    InputGroup,
    InputGroupAddon,
    InputGroupText,
    Input,
    Table,
    Pagination,
    PaginationItem,
    PaginationLink,
    Card
} from 'reactstrap';

import 'bootstrap/dist/css/bootstrap.min.css';

import {
    ProSidebar,
    Menu,
    MenuItem,
    SubMenu
} from 'react-pro-sidebar';

// import 'react-pro-sidebar/dist/css/styles.css';
// import './CustomSideBar.scss';

import {
    MdMenu,
    MdArchive
} from "react-icons/md";
import { IoMdAlarm } from "react-icons/io";

import {
    BsFillLockFill,
    BsFillGrid1X2Fill,
    BsFillArchiveFill,
    BsBriefcaseFill,
    BsFillPeopleFill,
    BsSearch,
    BsCheckAll
} from "react-icons/bs";

import {
    AiOutlineLineChart,
    AiFillCalculator
} from "react-icons/ai";

import Chart from "react-apexcharts";
// import { Line, Pie } from '@reactchartjs/react-chart.js'
import { Line, Pie } from 'react-chartjs-2';

import firestore from '../../firebase/Firestore'
import fire_base from '../../firebase/Firebase';
import { array } from 'yup/lib/locale';


class DashBoard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            lineChartData: {
                labels: ['จันทร์', 'อังคาร', 'พุธ', 'พฤหัสบดี', 'ศุกร์', 'เสาร์', 'อาทิตย์'],
                datasets: [
                    {
                        label: 'สินค้าเข้า',
                        data: [0, 0, 0, 0, 0, 0, 0],
                        // data: [10, 20, 30, 30, 50, 30, 20],
                        fill: false,
                        backgroundColor: 'rgb(255, 99, 132)',
                        borderColor: 'rgba(255, 99, 132, 0.6)',
                    },
                    {
                        label: 'สินค้าออก',
                        // data: [40, 70, 60, 20, 40, 50, 60],
                        data: [0, 0, 0, 0, 0, 0, 0],
                        // data: [],
                        fill: false,
                        backgroundColor: 'rgb(44, 232, 143)',
                        borderColor: 'rgba(44, 232, 143, 0.6)',
                    }
                ]
            },
            options: {
                scales: {
                    yAxes: [
                        {
                            ticks: {
                                beginAtZero: true,
                            },
                        },
                    ],
                },
            },

            pineChartData: {
                labels: [],
                datasets: [
                    {
                        label: 'สัดส่วนโกดัง',
                        data: [12, 19, 3, 5, 2, 3],
                        backgroundColor: [
                            'rgba(255, 99, 132, 0.2)',
                            'rgba(54, 162, 235, 0.2)',
                            'rgba(255, 206, 86, 0.2)',
                            'rgba(75, 192, 192, 0.2)',
                            'rgba(153, 102, 255, 0.2)',
                            'rgba(255, 159, 64, 0.2)',
                        ],
                        borderColor: [
                            'rgba(255, 99, 132, 1)',
                            'rgba(54, 162, 235, 1)',
                            'rgba(255, 206, 86, 1)',
                            'rgba(75, 192, 192, 1)',
                            'rgba(153, 102, 255, 1)',
                            'rgba(255, 159, 64, 1)',
                        ],
                        borderWidth: 1,
                    },
                ],
            },

            productTypeID : [],
         
        }
    }

    getProductSuccess=(q)=>{
        let tempValue = new Array(this.state.productTypeID.length)
        tempValue.fill(0)
        console.log('prod id list' ,this.state.productTypeID)
        q.forEach(doc => {
            // console.log(doc.id)
            // console.log(doc.data())
            // console.log(doc.data().productType.id)
            let idx = this.state.productTypeID.indexOf(doc.data().productType.id)
            tempValue[idx] += doc.data().productTotal

        });
        console.log(tempValue)
        let temp_pineChartData = this.state.pineChartData
        temp_pineChartData.datasets[0].data = tempValue
        this.setState({pineChartData : temp_pineChartData})
    }

    getProductTypeSuccess=(q)=>{
        let tempLabels = []
        let tempProductTypeID =[]
        q.forEach(doc => {
            // console.log(doc.id)
            // console.log(doc.data())
            tempLabels.push(doc.data().name)
            tempProductTypeID.push(doc.id)
        });
        let temp_pineChartData = this.state.pineChartData;
        temp_pineChartData.labels = tempLabels;
        this.setState({pineChartData : temp_pineChartData})
        this.setState({productTypeID : tempProductTypeID})
        fire_base.getAllProduct(this.getProductSuccess, this.reject);

    }

    getCountSellOrderSuccess = (size) => {
        console.log(size)
        let temp = this.state.lineChartData
        // temp.datasets[1].data.push(size)
        temp.datasets[1].data = size
        if(size.length == 7){
            temp.datasets[1].data.reverse()
        }

        this.setState({ lineChartData: temp })

        console.log(temp)
        console.log('from state : ', this.state.lineChartData)


    }
    getCountBuyOrderSuccess = (size) => {
        console.log(size)
        let temp = this.state.lineChartData
        // temp.datasets[1].data.push(size)
        temp.datasets[0].data = size
        if(size.length == 7){
            temp.datasets[0].data.reverse()
        }

        this.setState({ lineChartData: temp })

        console.log(temp)
        console.log('from state : ', this.state.lineChartData)


    }

    reject(error) {
        console.log(error)
    }

    componentDidMount() {
        firestore.getCountSellOrderComplete(this.getCountSellOrderSuccess, this.reject)
        firestore.getCountBuyOrderComplete(this.getCountBuyOrderSuccess, this.reject)
        // fire_base.getAllProduct(this.getProductSuccess, this.reject);
        fire_base.getAllProductType(this.getProductTypeSuccess, this.reject)

        let currentDate = new Date()
        let temp = this.state.lineChartData
        let m = 0;
        for (let i = 6; i >= 0; i--) {
            if (currentDate.getDate() - m > 0) {
                temp.labels[i] = (currentDate.getDate() - m) + "/" + (currentDate.getMonth() + 1)
            } else {

            }
            m++
        }

        this.setState({ lineChartData: temp })

    }

    render() {
        return (
            <body className="DBBody">

                <div className="lineChart">
                    <h3 style={{
                        justifySelf: 'flex-start',

                    }}>จำนวนออร์เดอร์สินค้าเข้า/ออก</h3>
                    {/* <Chart
                                options={this.state.options}
                                series={this.state.series}
                                // type="line"
                                // width={this.state.chartWidth}
                                // height="300"
                                style={{alignSelf:'center',
                                        backgroundColor: "white"}}
                            /> */}
                    <Line data={this.state.lineChartData}
                        options={this.state.options}
                        height={70}
                        redraw />
                </div>
                <div style={{
                    display: 'flex',
                    marginTop: '1.5%',
                    justifyContent: 'center',
                    flexDirection: 'row'
                }}>
                    <div className="donutChartContainer">
                        <div className="pineChart">
                            <h3 style={{
                                justifySelf: 'flex-start',
                                marginBottom: '2%',
                                alignSelf: 'flex-start'
                            }}>สัดส่วนเนื้อที่โกดัง</h3>
                            {/* <Chart
                                        options={this.state.pineChartOption}
                                        series={this.state.pineChartOption.series}
                                        type="donut"
                                        width="150%"
                                        // height="450"
                                        style={{alignSelf:'center',
                                                backgroundColor: "white",
                                                marginBottom:20,
                                                marginTop:10}}
                                    /> */}
                            <Pie data={this.state.pineChartData}
                                height='240'
                                redraw />
                            <div style={{ display: 'flex' }}></div>
                        </div>
                    </div>
                    <div className="cardContainer">
                        <Card style={{
                            borderColor: "transparent",
                            width: "98.5%",

                        }}>
                            <p />
                            <h3 style={{ marginLeft: '2.5%' }}>สินค้าขายดี</h3>
                            <p />
                            <Table striped style={{ width: '95%', alignSelf: 'center' }}>
                                <thead>
                                    <tr>
                                        <th>#</th>
                                        <th>รหัสสินค้า</th>
                                        <th>ชื่อสินค้า</th>
                                        <th>ปริมาณ</th>
                                        <th>มูลค่า(บาท)</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <th scope="row">1</th>
                                        <td>110101</td>
                                        <td>ข้าวขาวดี</td>
                                        <td>1000</td>
                                        <td>1,000,000</td>
                                    </tr>

                                </tbody>
                            </Table>
                        </Card>
                    </div>
                </div>


            </body>

        );
    }
}


export default DashBoard;