import Hostelinfo from './analyticComponenets/Hostelinfo';
import PieChartWithCenterLabel from './analyticComponenets/FeeBreakdown';
import LinearDeterminate from './analyticComponenets/ComplaintsAnalytics';
import StudentUpdate from './analyticComponenets/StudentUpdate';
import Emergency from './analyticComponenets/Emergency';

const AnalyticPage = () => {
  return (
    <div className="flex    gap-5 ml-[255px]">
        <div className=" basis-[70%]">
            <Hostelinfo />
            <PieChartWithCenterLabel />
            <LinearDeterminate />
        </div>

        <div className=" basis-[25%] flex flex-col justify-between gap-3">
          
              <StudentUpdate />
              <Emergency />
            <div></div>
        </div>

    </div>
  )
}

export default AnalyticPage