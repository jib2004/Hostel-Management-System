import Hostelinfo from './analyticComponenets/Hostelinfo';
import PieChartWithCenterLabel from './analyticComponenets/FeeBreakdown';
import LinearDeterminate from './analyticComponenets/ComplaintsAnalytics';

const AnalyticPage = () => {
  return (
    <div className="flex basis[85%] w-full">
        <div className=" basis-[75%]">
            <Hostelinfo />
            <PieChartWithCenterLabel />
            <LinearDeterminate />

            
        </div>

        <div className=" basis-[25%]">
            <div></div>
            <div></div>
        </div>

    </div>
  )
}

export default AnalyticPage