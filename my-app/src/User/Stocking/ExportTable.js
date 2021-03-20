import React from 'react';

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
    FormControl
} from 'reactstrap';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-pro-sidebar/dist/css/styles.css';

import './Style/ExportTable.css';

class ExportTable extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            lot:"100100",
            channel:"A1"
        }
    }

    render(){
        return(
            <div className = "ContainerTable">

                <body className = "ContentTable">

                    <h1 style={{width:'100%', alignSelf:'center', marginTop:60, marginBottom:20}}>รายการนำสินค้าออกคลัง</h1>
                    <h3 style={{width:'100%', alignSelf:'center', marginTop:10}}>หมายเลขล็อต : {this.state.lot}</h3>
                    <h3 style={{width:'100%', alignSelf:'center', marginTop:10, marginBottom:20}}>ช่องขนส่ง : {this.state.channel}</h3>
                    
                    <Table hover style={{width:'100%', alignSelf:'center', marginTop:20, marginBottom:20 ,background:"#f1f1f1"}}>

                            {/* -------------------------- This is header for table  --------------------------*/}
                            <thead>
                                <tr style ={{textAlign:'center'}}>
                                    <th>ลำดับ</th>
                                    <th>รหัสสินค้า</th>
                                    <th>เก่า/ใหม่</th>
                                    <th>ชื่อบริษัท</th>
                                    <th>ชื่อสินค้า</th>
                                    <th>น้ำหนัก</th>
                                    <th>จำนวน</th>
                                </tr>
                            </thead>

                            {/* -------------------------- This is datafrom for table  --------------------------*/}
                            {/* Example */}
                            <tbody>
                                <tr style ={{textAlign:'center'}}>
                                    <th scope="row">1</th>
                                    <td>11323</td>
                                    <td>ใหม่</td>
                                    <td>สส.จำกัด</td>
                                    <td>ข้าวหอมมะลิ ตราสส</td>
                                    <td>5</td>
                                    <td>20</td>
                                    <td>
                                        <InputGroup>
                                            <Input addon type="checkbox" style = {{width:20,height:20}} />
                                        </InputGroup>
                                    </td>
                                </tr>
                            </tbody>
                    </Table>

                    <body className = 'PaginationTable'>
                        <Pagination aria-label="Page navigation example" style={{justifyContent:'center', marginTop:10}}>
                            <PaginationItem>
                                <PaginationLink first href="#" />
                            </PaginationItem>
                            <PaginationItem>
                                 <PaginationLink previous href="#" />
                            </PaginationItem>
                            <PaginationItem>
                                <PaginationLink href="#">1</PaginationLink>
                            </PaginationItem>
                            <PaginationItem>
                                <PaginationLink href="#">2</PaginationLink>
                            </PaginationItem>
                            <PaginationItem>
                                <PaginationLink href="#">3</PaginationLink>
                            </PaginationItem>
                            <PaginationItem>
                                <PaginationLink next href="#" />
                            </PaginationItem>
                            <PaginationItem>
                                <PaginationLink last href="#" />
                            </PaginationItem>
                        </Pagination>
                    </body>

                    <body className = "ButtonTable">
                        <Button style = {{height:40, width:80, background:"#FF0000"}}>ยกเลิก</Button>
                        <Button style = {{height:40, width:80, background:"#00B046", marginRight: 20}}>บันทึก</Button>
                    </body>

                </body>
            </div>
        )
    }
}

export default ExportTable