import Hostelinfo from './analyticComponenets/Hostelinfo';
import PieChartWithCenterLabel from './analyticComponenets/FeeBreakdown';
import LinearDeterminate from './analyticComponenets/ComplaintsAnalytics';
import StudentUpdate from './analyticComponenets/StudentUpdate';
import Emergency from './analyticComponenets/Emergency';

const AnalyticPage = () => {
  return (
    <div className="flex basis[85%] w-full gap-4">
        <div className=" basis-[75%]">
            <Hostelinfo />
            <PieChartWithCenterLabel />
            <LinearDeterminate />
        </div>

        <div className=" basis-[25%] flex flex-col justify-between gap-3 h-full">
          
              <StudentUpdate />
              <Emergency />
            <div></div>
        </div>

    </div>
  )
}

export default AnalyticPage