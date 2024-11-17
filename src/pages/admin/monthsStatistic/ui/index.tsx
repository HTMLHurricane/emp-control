import { Attendance } from '../../home/ui/attendance';
import { Month } from '../../home/ui/month';
import { Header } from './header';

export const AdminMonthStatistic = () => {
    return (
        <div>
            <Header />
            <div className="md:flex md:flex-col md:justify-center md:items-center">
                <Month />
                <Attendance />
            </div>
        </div>
    );
};
