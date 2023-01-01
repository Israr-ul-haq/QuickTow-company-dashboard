
import { useEffect, useState } from "react"
import Loader from "../../shared/Loader"
import { Line } from "react-chartjs-2"
import "jspdf-autotable"
import jsPDF from "jspdf"
import downloadCSV from "../../shared/CSV"
import PerfectScrollbar from "perfect-scrollbar"

function Dashboard() {
  //Se
  const [dashboard, setDashBoard] = useState({})
  const [data, setData] = useState([])
  const [loader, setLoader] = useState(true)
  const [eventCount, setEventCount] = useState(0)
  const [dashboardLabels, setDashboardLabels] = useState([])
  const [dashboardchartData, setDashBoardChartData] = useState([])
  const [salereportchartData, setSaleReportChartData] = useState([])
  const [salereportLabels, setSaleReportLabels] = useState([])
  const [newCustomers, setNewCustomers] = useState([{}])

 
  const columnNames = [
    {
      Month: "",
      Price: 0,
    },
  ]
  const saleColumnNames = [
    {
      Day: "",
      Price: 0,
    },
  ]
  const dashboardChart = {
    labels: dashboardLabels,
    datasets: [
      {
        label: "Monthly Reports ",
        data: dashboardchartData,
        fill: false,
        backgroundColor: "#279527",
        borderColor: "#279527",
      },
    ],
  }
  const saleReportChart = {
    labels: salereportLabels,
    datasets: [
      {
        label: "Sale Reports ",
        data: salereportchartData,
        fill: false,
        backgroundColor: "#279527",
        borderColor: "#279527",
      },
    ],
  }

  const options = {
    scales: {
      yAxes: [
        {
          ticks: {
            beginAtZero: true,
          },
        },
      ],
    },
  }
  //UseEffect

 

  useEffect(() => {
    //To initialise:
    const container = document.querySelector("#menuScroll")
    const ps = new PerfectScrollbar(container)
  })



  // eslint-disable-line react-hooks/exhaustive-deps

  //Functions
  // const getDashBoard = async () => {
  //   debugger
  //   const response = await userService.get("")
  //   setUser(response.data.Data.slice(0, 5))
  // }

  const exportPDF = () => {
    const unit = "pt"
    const size = "A4" // Use A1, A2, A3 or A4
    const orientation = "portrait" // portrait or landscape

    const marginLeft = 40
    const doc = new jsPDF(orientation, unit, size)

    doc.setFontSize(15)

    const title = "Events"
    const headers = [["Month", "Price"]]
    const pdfData = data.MonthlyReports.map((elt) => {
      return [elt.Month, elt.Price]
    })

    let content = {
      startY: 50,
      head: headers,
      body: pdfData,
    }

    doc.text(title, marginLeft, 40)
    doc.autoTable(content)
    doc.save("Monthly Reports.pdf")
  }

  const exportPDF1 = () => {
    const unit = "pt"
    const size = "A4" // Use A1, A2, A3 or A4
    const orientation = "portrait" // portrait or landscape

    const marginLeft = 40
    const doc = new jsPDF(orientation, unit, size)

    doc.setFontSize(15)

    const title = "Events"
    const headers = [["Day", "Price"]]
    const pdfData = data.SalesReport.map((elt) => {
      return [elt.Day, elt.Price]
    })

    let content = {
      startY: 50,
      head: headers,
      body: pdfData,
    }

    doc.text(title, marginLeft, 40)
    doc.autoTable(content)
    doc.save("Sales Reports.pdf")
  }

  return (
    <div>
      <main>
        <div className="container-fluid">
          <div className="row">
            <div className="col-12">
              <div className="headertopbar">
                <h1 className="headertopbar_title">Dashboard</h1>
              </div>
            </div>
            
              <div className="col-12 column_margin">
                <div className="dasboardstatscards">
                  <div className="dasboardstatscards_column">
                    <div className="dasboardstatscards_card">
                      <div className="dasboardstatscards_left">
                        <h5 className="dasboardstatscards_subtitle">Total Drivers</h5>
                        <h3 className="dasboardstatscards_title">1800</h3>
                      </div>

                      <div className="dasboardstatscards_right">
                        <img className="dasboardstatscards_image" src="./img/mainUser.svg" alt="stat-img" />
                      </div>
                    </div>
                  </div>
                  <div className="dasboardstatscards_column">
                    <div className="dasboardstatscards_card">
                      <div className="dasboardstatscards_left">
                        <h5 className="dasboardstatscards_subtitle">Total Trucks</h5>
                        <h3 className="dasboardstatscards_title">3000</h3>
                      </div>
                      <div className="dasboardstatscards_right">
                        <img className="dasboardstatscards_image" src="./img/truck.svg" alt="stat-img" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
           
            <div className="col-12 column_margin">
              <div className="card_custom">
                <h2 className="card_custom_title">Monthly Reports</h2>

             
                  <>
                    <div className="chart-container chart">
                      <Line height="100%" data={dashboardChart} options={options} />
                    </div>
                  </>
                
              </div>
            </div>
            <div className="col-12">
              <div className="row">
                <div className="col-md-8">
                  <div className="card_custom">
                    <h2 className="card_custom_title">Sales Report</h2>

                    <div className="chart-container chart">
                     
                        <>
                          <Line height="100%" data={saleReportChart} options={options} />
                        </>
                      
                    </div>
                  </div>
                </div>

                <div className="col-md-4">
                  <div className="card_custom customer_card">
                    <h2 className="card_custom_title customer_title">New Customers</h2>
                    <div className=" newcustomers">
                      <div id="menuScroll">
                        
                            
                              <div className="newcustomers_item">
                                <div className="newcustomers_left">
                                  <img className="newcustomers_image" src="/img/Profile@2x.png" alt="" />
                                </div>
                                <div className="newcustomers_right">
                                  <h4 className="newcustomers_title">New Customer</h4>
                                  <h5 className="newcustomers_subtitle">Customer ID#500</h5>
                                </div>
                              </div>
                          
                          
                        
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
export default Dashboard
