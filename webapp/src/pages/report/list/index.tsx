import ReportFilter from '../components/filter';
import ReportTableList from '../components/table-list';
import ReportProvider from '../store';
import './style.less';
function ReportList() {
  return (
    <div className="report-wrapper">
      <div className="title">
        <span>Nhập báo cáo hợp đồng công chứng</span>
      </div>
      <div className="filter">
        <ReportFilter />
      </div>
      <div className="table-list">
        <ReportTableList />
      </div>
    </div>
  );
}

export default function ReportListWrapper() {
  return (
    <ReportProvider>
      <ReportList />
    </ReportProvider>
  );
}
