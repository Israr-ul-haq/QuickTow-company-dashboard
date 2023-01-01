import React from "react"
import DataTable from "react-data-table-component"
import { Link } from "react-router-dom"
import { useEffect, useState } from "react"

import deleteItem from "../../shared/DeleteItem"
import downloadCSV from "../../shared/CSV"

import "jspdf-autotable"
import jsPDF from "jspdf"


const ManageHistory = () => {
    // SERVICES


    //State
    const [data, setData] = useState([{
        DriverName: "Lahaina Grill",
        UserName: "Lahaina Grill",
        Price: "$500",
        VehicleType: "FWD",
        VehicleNumber: "AHD 795",
        Date: "22-04-2022"
    }])
    const [loader, setLoader] = useState(false)
    const [dataCount, setDataCount] = useState(0)
    const [totalRows, setTotalRows] = useState(0)
    const [perPage, setPerPage] = useState(10)
    const columnNames = [
        {
            UserId: 14,
            Name: "jan",
            Email: "jan@gmail.com",
            Phone: "35688",
            Password: "123",
            UserTypeId: 5,
            UserType: "User",
            DeviceId: "1122",
        },
    ]
    const columns = [
        {
            name: "No#",
            cell: (row, index) => index + "1",
            sortable: true,
            grow: 0

        },


        {
            name: "Driver Name",
            selector: "DriverName",
            sortable: true,

        },
        {
            name: "User Name",
            selector: "UserName",
            sortable: true,

        },
        {
            name: "Price",
            selector: "Price",
            sortable: true,
        },
        {
            name: "Vehicle Type",
            selector: "VehicleType",
            sortable: true,
        },
        {
            name: "Vehicle Number",
            selector: "VehicleNumber",
            sortable: true,
        },
        {
            name: "Date",
            selector: "Date",
            sortable: true,
        },

        {
            name: "Actions",
            button: true,
            cell: (row) => (
                <div className="tableactions">
                    <Link to="/ViewHistory" className="TableEdit">
                        <img src="./img/view.svg" alt="event" />
                    </Link>
                    <button
                        type="button"
                        data-toggle="modal"
                        class="tableactions_action"
                        onClick={() => deleteItem()}
                    >
                        <img alt="table-action" class="tableactions_image" src="./img/Delete.svg" />
                    </button>
                </div>
            ),
            grow: 0,
        },
    ]






    const exportPDF = () => {
        const unit = "pt"
        const size = "A4" // Use A1, A2, A3 or A4
        const orientation = "portrait" // portrait or landscape

        const marginLeft = 40
        const doc = new jsPDF(orientation, unit, size)

        doc.setFontSize(15)

        const title = "Users"
        const headers = [["User Name", "Email", "Phone", "Password"]]
        const pdfData = data.map((elt) => {
            return [elt.Name, elt.Email, elt.Phone, elt.Password]
        })

        let content = {
            startY: 50,
            head: headers,
            body: pdfData,
        }

        doc.text(title, marginLeft, 40)
        doc.autoTable(content)
        doc.save("User.pdf")
    }



    return (
        <div>
            <main>
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-12">
                            <div className="headertopbar">
                                <h1 className="headertopbar_title"> Booking History</h1>
                            </div>
                        </div>
                        <div className="col-12 column_margin">
                            <div className="card_custom">
                                {" "}
                                <div className="datatableheading">Export to:</div>
                                <div>
                                    <button className="btn btn-secondary datatablebuttons" onClick={(e) => exportPDF()}>
                                        PDF
                                    </button>
                                    <button className="btn btn-secondary datatablebuttons" onClick={(e) => downloadCSV(data, columnNames)}>
                                        CSV
                                    </button>
                                </div>
                                <input
                                    className="tablesearchbox"
                                    type="text"
                                    placeholder="Search"
                                    aria-label="Search Input"
                                />
                                <DataTable
                                    title=""
                                    columns={columns}
                                    data={data}
                                // progressPending={loader}
                                // pagination
                                // paginationServer
                                // paginationTotalRows={totalRows}
                                />
                            </div>
                        </div>
                    </div>
                </div>


            </main>

        </div>
    )
}

export default ManageHistory
