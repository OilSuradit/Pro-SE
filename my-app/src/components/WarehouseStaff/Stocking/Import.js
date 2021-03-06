import React from 'react';
import './Style/Import.css'

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

import { FiFileText } from 'react-icons/fi'

import importList from './importList.json'

class Import extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            importList:importList
        }
    }

    render() {

        let i = 0
        const listItems = this.state.importList.map((data) => {
            i++
            return (

                <tr style={{ textAlign: 'center' }}>
                    <th scope="row">{i}</th>
                    <td>{data.lot}</td>
                    <td>{data.channel}</td>
                    <td onClick={() => this.props.history.push({
                        pathname : this.props.match.url + "/import_product_tb",
                        lot : data.lot,
                        channel : data.channel,
                        data: data.detail
                    })}>
                        <FiFileText style={{ color: "#00A3FF" }} />
                    </td>
                </tr>
            )
        }
        );

        return (
            <div className='ContainerImport'>

                <div className='ContentImport' style={{ border: '2px solid gray' }}>
                    <h1 style={{ width: '95%', alignSelf: 'center', marginTop: 60 }}>ตารางงานขนสินค้าเข้าคลัง</h1>

                    <Table hover style={{ width: '95%', alignSelf: 'center', marginTop: 30, marginBottom: 20, background: "#f1f1f1" }}>

                        {/* -------------------------- This is header for table  --------------------------*/}
                        <thead>
                            <tr style={{ textAlign: 'center' }}>
                                <th>ลำดับ</th>
                                <th>หมายเลขล็อต</th>
                                <th>ช่องขนส่ง</th>
                                <th>รายละเอียด</th>
                            </tr>
                        </thead>

                        {/* -------------------------- This is dataFrom for table that should render --------------------------*/}
                        {/* Example */}
                        <tbody style={{ justifyContent: 'center' }}>

                            {listItems}

                        </tbody>
                    </Table>

                    {/* <body className = 'ButtonImport'>
                        <Button style = {{height:40, width:100, background:"#FF0000"}} onClick ={()=> this.props.history.goBack()}>ย้อนกลับ</Button>
                    </body> */}

                </div>
            </div>
        )
    }
}

export default Import