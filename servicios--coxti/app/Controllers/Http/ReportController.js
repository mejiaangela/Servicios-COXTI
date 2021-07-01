'use strict'
const Report = use('App/Models/Report')

class ReportController {
  async reportes ({ view }) {
    const reports = await Report.all()
    return view.render('reports.reportes', { reports: reports.toJSON() })
  }
}

module.exports = ReportController
