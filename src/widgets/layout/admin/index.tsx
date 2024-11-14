import { Button, Layout } from 'antd';
import { FC } from 'react';
import type { MenuProps } from 'antd';
import { Menu } from 'antd';
import { Link, Outlet } from 'react-router-dom';
import { FaArrowLeft, FaArrowRight, FaBuildingUser } from 'react-icons/fa6';
import { VscGraphLine } from 'react-icons/vsc';
import { useAppActions, useAppSelector } from '@/shared';

type MenuItem = Required<MenuProps>['items'][number];
const { Content, Sider } = Layout;

const items: MenuItem[] = [
    {
        key: '1',
        label: <Link to="/">Главная</Link>,
        icon: <FaBuildingUser />,
        children: [
            {
                key: '13',
                label: <Link to="/monthStatistic">Месячная статистика</Link>,
            },
            { key: '5', label: <Link to="/employees">Сотрудники</Link> },
            { key: '6', label: <Link to="/branches">Филиалы</Link> },
            { key: '7', label: <Link to="/roles">Роли</Link> },
            {
                key: '8',
                label: <Link to="/schedules">Рабочий график</Link>,
            },
        ],
    },
    {
        key: '2',
        label: <Link to="/count">Анализ клиентов</Link>,
        icon: <VscGraphLine />,
        children: [{ key: '9', label: <Link to="/count">Статистика</Link> }],
    },
];

const AdminLayout: FC = () => {
    const { collapsed } = useAppSelector();
    const { setCollapsed } = useAppActions();

    const handleCollapsed = () => {
        setCollapsed(!collapsed);
    };

    return (
        <Layout className="relative min-h-screen">
            <Sider
                theme="dark"
                width={collapsed ? 80 : '18%'}
                className="my-4 ml-4 rounded-lg h-[96%] !fixed z-50"
                collapsed={collapsed}
            >
                <div className="text-center text-white text-2xl py-5">
                    {collapsed ? 'A' : 'AralHUB'}
                </div>
                <Menu
                    defaultSelectedKeys={['1']}
                    defaultOpenKeys={['sub1']}
                    mode="inline"
                    theme="dark"
                    items={items}
                />
                <Button
                    onClick={handleCollapsed}
                    className="bg-transparent text-white hover:!bg-transparent hover:!text-white border-none w-full absolute bottom-0 py-8"
                >
                    {collapsed ? <FaArrowRight /> : <FaArrowLeft />}
                </Button>
            </Sider>
            <Layout>
                <Content
                    className={`p-4 fixed ${
                        collapsed ? 'w-[93%]' : 'w-[81%]'
                    } h-[96%] right-1 `}
                >
                    <div className="bg-white p-5 rounded-lg h-[104.6%] shadow-sm overflow-y-auto overflow-x-hidden custom-scroll relative">
                        <Outlet />
                    </div>
                </Content>
            </Layout>
        </Layout>
    );
};

export { AdminLayout };
