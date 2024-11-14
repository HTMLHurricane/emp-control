import { Attendance } from '../../home/ui/attendance';
import { Month } from '../../home/ui/month';
import { Header } from './header';

export const AdminMonthStatistic = () => {
    return (
        <div>
            <Header />
            <div className="flex flex-col justify-center items-center">
                <Month />
                <Attendance />
            </div>
        </div>
    );
};
