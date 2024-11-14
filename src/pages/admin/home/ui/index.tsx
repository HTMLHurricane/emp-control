import { FlexBox } from '@/shared';
import { Doughnut } from './doughnut';
import { Last } from './last/ui';
import { Line } from './line/ui';
import { ComeModal, LateModal, NotComeModal } from '@/entities/home/model';
import { Header } from './header';

const AdminHomePage = () => (
    <>
        <FlexBox cls="flex-col gap-10">
            <Header />
            <FlexBox cls="items-start">
                <Doughnut />
                <Line />
            </FlexBox>
            <Last />
        </FlexBox>
        <NotComeModal />
        <LateModal />
        <ComeModal />
    </>
);

export { AdminHomePage };
