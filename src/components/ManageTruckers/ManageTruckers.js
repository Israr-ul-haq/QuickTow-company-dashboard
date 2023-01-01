import React from "react"
import DataTable from "react-data-table-component"
import { Link } from "react-router-dom"
import { useEffect, useState } from "react"
import DriversService from "../../services/DriversService"
import deleteItem from "../../shared/DeleteItem"
import downloadCSV from "../../shared/CSV"
import "jspdf-autotable"
import jsPDF from "jspdf"
import Loader from "../../shared/Loader"



const ManageTruckers = () => {
  // SERVICES

  const driverService = new DriversService()

  //State
  const [data, setData] = useState([{}])
  const [loader, setLoader] = useState(false)
  const [dataCount, setDataCount] = useState(0)
  const columnNames = [
    {
      userStatusesTitle: "Active",
      firstName: "Driver",
      lastName: "01",
      phoneNumber: "123",
      email: "driver101@jinnbyte.com",
    },
  ]
  const columns = [
    {
      name: "No#",
      cell: (row, index) => index + 1,
      sortable: true,
      grow: 0,
    },


    {
      name: "First Name",
      selector: "firstName",
      sortable: true,

    },
    {
      name: "Last Name",
      selector: "lastName",
      sortable: true,

    },
    {
      name: "Email",
      selector: "email",
      sortable: true,

    },
    {
      name: "Phone Number",
      selector: "phoneNumber",
      sortable: true,
    },
    {
      name: "Status",
      cell: (row) => (
        <p>
          {row.userStatusesTitle === "Active" ? (<span style={{ color: "green", fontWeight: "bolder" }}>Active</span>
          ) : row.userStatusesTitle === "InProgress" ? (
            <span style={{ color: "#C29109" }}>In-Progress</span>
          ) : ("")}
        </p>
      ),
      sortable: true,
    },

    {
      name: "Actions",
      button: true,
      cell: (row) => (
        <div className="tableactions">
          <Link to={`/ViewTrucker/${row.id}`} className="TableEdit">
            <img src="./img/view.svg" alt="event" />
          </Link>
          <Link to={`/EditTrucker/${row.id}`} className="TableEdit">
            <img alt="table-action" className="tableactions_image" src="./img/Edit.svg" />
          </Link>
          <button
            type="button"
            data-toggle="modal"
            class="tableactions_action"
            onClick={() => deleteItem(row.id, data, driverService, "Trucker", setLoader, "TruckerId")}
          >
            <img alt="table-action" class="tableactions_image" src="./img/Delete.svg" />
          </button>
        </div>
      ),
      grow: 0,
    },
  ]

  //UseEffect


  //Functions

  const exportPDF = () => {
    const unit = "pt"
    const size = "A4" // Use A1, A2, A3 or A4
    const orientation = "portrait" // portrait or landscape

    const marginLeft = 40
    const doc = new jsPDF(orientation, unit, size)

    doc.setFontSize(15)

    const title = "Drivers"
    const headers = [["First Name", "Last Name", "Email", "Phone", "Status"]]
    const pdfData = data.map((elt) => {
      return [elt.firstName, elt.lastName, elt.email, elt.phoneNumber, elt.userStatusesTitle]
    })

    let content = {
      startY: 50,
      head: headers,
      body: pdfData,
    }

    doc.text(title, marginLeft, 40)
    doc.autoTable(content)
    doc.save("Drivers.pdf")
  }
  useEffect(() => {
    if (dataCount === 0) {
      getDrivers()
      setDataCount(1)
    }
  }, [data]) // eslint-disable-line react-hooks/exhaustive-deps


  const getDrivers = async () => {
    setLoader(true)
    const response = await driverService.getDrivers()
    setData(response.data.data)
    setLoader(false)
  }


  return (
    <div>
      <main>
        <div className="container-fluid">
          <div className="row">
            <div className="col-12">
              <div className="headertopbar">
                <h1 className="headertopbar_title"> Truckers Management</h1>
                <Link to="/AddNewTrucker" className="profile-business-accept btn btn-primary btnAddnew">Add</Link>
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
                  <button className="btn btn-secondary datatablebuttons" onClick={(e) => downloadCSV(data, columnNames, "Dirvers")}>
                    CSV
                  </button>
                </div>
                <input
                  className="tablesearchbox"
                  type="text"
                  placeholder="Search"
                  aria-label="Search Input"
                />
                {loader ? (
                  Loader
                ) : (
                  <DataTable
                    title=""
                    columns={columns}
                    data={data}
                    // progressPending={loader}
                    pagination
                  // paginationServer
                  // paginationTotalRows={totalRows}
                  />
                )}
              </div>
            </div>
          </div>
        </div>


      </main>

    </div>
  )
}

export default ManageTruckers
