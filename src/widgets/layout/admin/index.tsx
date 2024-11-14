import { Layout } from 'antd';
import { FC } from 'react';
import { MailOutlined } from '@ant-design/icons';

import type { MenuProps } from 'antd';
import { Menu } from 'antd';
import { Link, Outlet } from 'react-router-dom';

type MenuItem = Required<MenuProps>['items'][number];
const { Content, Sider } = Layout;

const AdminLayout: FC = () => {
    const items: MenuItem[] = [
        {
            key: '1',
            label: <Link to="/">Главная</Link>,
            icon: <MailOutlined />,
            children: [
                {
                    key: '13',
                    label: (
                        <Link to="/monthStatistic">Месячная статистика</Link>
                    ),
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
            icon: <MailOutlined />,
            children: [
                { key: '9', label: <Link to="/count">Статистика</Link> },
            ],
        },
    ];

    return (
        <Layout className="relative min-h-screen">
            <Sider
                theme="dark"
                width={'18%'}
                className="my-4 ml-4 rounded-lg h-[96%] !fixed"
            >
                <div className="text-center text-white text-2xl py-5">
                    AralHUB
                </div>
                <Menu
                    defaultSelectedKeys={['1']}
                    defaultOpenKeys={['sub1']}
                    mode="inline"
                    theme="dark"
                    items={items}
                />
            </Sider>
            <Layout>
                <Content className="p-4 fixed w-[81%] h-[96%] right-1 ">
                    <div className="bg-white p-5 rounded-lg h-[104.6%] shadow-sm overflow-y-auto overflow-x-hidden custom-scroll">
                        <Outlet />
                    </div>
                </Content>
            </Layout>
        </Layout>
    );
};

export { AdminLayout };
