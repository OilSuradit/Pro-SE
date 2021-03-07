import React from 'react';


import './HistoryInOut.css';

import {
    Button,
    InputGroup,
    InputGroupAddon,
    InputGroupText,
    FormGroup,
    Label,
    FormFeedback,
    Input,
    Table,
    Pagination,
    PaginationItem,
    PaginationLink, Row, Col, Container
} from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

import 'react-pro-sidebar/dist/css/styles.css';

import { BsFillPersonFill, BsFillLockFill } from "react-icons/bs";
import { MdSearch, MdDescription, MdCallReceived, MdCallMade } from "react-icons/md";
import { IoMdTrash } from "react-icons/io";

import * as Yup from 'yup';

const useSortableData = (items, config = null) => {
    const [sortConfig, setSortConfig] = React.useState(config);

    const sortedItems = React.useMemo(() => {
        let sortableItems = [...items];
        if (sortConfig !== null) {
            sortableItems.sort((a, b) => {
                if (a[sortConfig.key] < b[sortConfig.key]) {
                    return sortConfig.direction === "ascending" ? -1 : 1;
                }
                if (a[sortConfig.key] > b[sortConfig.key]) {
                    return sortConfig.direction === "ascending" ? 1 : -1;
                }
                return 0;
            });
        }
        return sortableItems;
    }, [items, sortConfig]);

    const requestSort = (key) => {
        let direction = "ascending";
        if (
            sortConfig &&
            sortConfig.key === key &&
            sortConfig.direction === "ascending"
        ) {
            direction = "descending";
        }
        setSortConfig({ key, direction });
    };

    return { items: sortedItems, requestSort, sortConfig };
};

const ProductTable = (props) => {
    const { items, requestSort, sortConfig } = useSortableData(props.products);
    const getClassNamesFor = (name) => {
        if (!sortConfig) {
            return;
        }
        return sortConfig.key === name ? sortConfig.direction : undefined;
    };
    return (
        <Table striped>
            <thead>
                <tr>
                    <th>
                        <button
                            type="button"
                            onClick={() => requestSort("id")}
                            className={getClassNamesFor("id")}
                        >
                            ลำดับ
                        </button>
                    </th>
                    <th>
                        <button
                            type="button"
                            onClick={() => requestSort("รหัสสินค้า")}
                            className={getClassNamesFor("รหัสสินค้า")}
                        >
                            รหัสสินค้า
                        </button>
                    </th>
                    <th>
                        <button
                            type="button"
                            onClick={() => requestSort("ชนิด")}
                            className={getClassNamesFor("ชนิด")}
                        >
                            ชนิด
              </button>
                    </th>
                    <th>
                        <button
                            type="button"
                            onClick={() => requestSort("รายการสินค้า")}
                            className={getClassNamesFor("รายการสินค้า")}
                        >
                            รายการสินค้า
              </button>
                    </th>
                    <th>
                        <button
                            type="button"
                            onClick={() => requestSort("ปริมาณ")}
                            className={getClassNamesFor("ปริมาณ")}
                        >
                            ปริมาณ
              </button>
                    </th>
                    <th>
                        <button
                            type="button"
                            onClick={() => requestSort("มูลค่าการขาย")}
                            className={getClassNamesFor("มูลค่าการขาย")}
                        >
                            มูลค่าการขาย
              </button>
                    </th>
                </tr>
            </thead>
            <tbody>
                {items.map((item) => (
                    <tr key={item.id}>
                        <td>{item.id}</td>
                        <td>{item.รหัสสินค้า}</td>
                        <td>{item.ชนิด}</td>
                        <td>{item.รายการสินค้า}</td>
                        <td>{item.ปริมาณ}</td>
                        <td>${item.มูลค่าการขาย}</td>

                    </tr>
                ))}
            </tbody>
        </Table>
    );
};

class SalesReport extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }
    render() {
        return (
            <Container fluid={true} style={{ backgroundColor: 'wheat' }} >
                <Row >
                    <h1 style={{
                        marginTop: 20,
                        marginBottom: 20,
                        width: '100%',
                        alignSelf: 'center'
                    }}>ยอดขายสินค้า</h1>
                </Row>
                <Row >
                    <Col md="1">
                        Date
                                </Col>
                    <Col md="3">
                        <Input
                            type="date"
                            name="date"
                            id="exampleDate"
                            placeholder="date placeholder"
                        />
                    </Col>


                    <Col md="1">
                        Date
                                </Col>
                    <Col md="3">
                        <Input
                            type="date"
                            name="date"
                            id="exampleDate"
                            placeholder="date placeholder"
                        />
                    </Col>

                    <Col md="auto">
                        <Button color="info" style={{ width: 200 }}>fillter</Button>
                    </Col>
                </Row>

                <ProductTable
                    products={[
                        { id: 1, "รหัสสินค้า": "110100", ชนิด: "ข้าวหอมมะลิ", รายการสินค้า: "ข้าวหอมมะลิ ตราสส", ปริมาณ: 80000, มูลค่าการขาย: 2000000.00 },
                        { id: 2, "รหัสสินค้า": "110100", ชนิด: "ข้าวหอมมะลิ", รายการสินค้า: "ข้าวหอมมะลิ ตราสส", ปริมาณ: 70000, มูลค่าการขาย: 7000000.00 },
                        { id: 3, "รหัสสินค้า": "110110", ชนิด: "มะลิ", รายการสินค้า: "หอมมะลิ ", ปริมาณ: 50000, มูลค่าการขาย: 3000000.00 },
                        { id: 4, "รหัสสินค้า": "110200", ชนิด: "ข้าวหอม", รายการสินค้า: "ข้าว ตราสส", ปริมาณ: 84000, มูลค่าการขาย: 5000000.00 },
                        { id: 5, "รหัสสินค้า": "110130", ชนิด: "ข้าว", รายการสินค้า: "มะลิ ตราสส", ปริมาณ: 10000, มูลค่าการขาย: 100000.00 },


                    ]}
                />


                <Pagination aria-label="Page navigation example"
                    style={{
                        justifyContent: 'center',
                        marginTop: 10
                    }}>
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


            </Container>
        );
    }
}


export default SalesReport;