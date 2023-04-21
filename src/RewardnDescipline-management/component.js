import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Table } from 'antd';
import { fetchRewardsAndPunishments } from '../actions';

function RewardsList({ rewards, punishments, fetchRewardsAndPunishments }) {
    useEffect(() => {
        fetchRewardsAndPunishments();
    }, [fetchRewardsAndPunishments]);

    const columns = [
        {
            title: 'Tên',
            dataIndex: 'name',
            key: 'name'
        },
        {
            title: 'Loại',
            dataIndex: 'type',
            key: 'type'
        },
        {
            title: 'Ngày thực hiện',
            dataIndex: 'date',
            key: 'date'
        }
    ];

    const data = rewards.concat(punishments).map((reward, index) => ({
        key: index,
        name: reward.name,
        type: reward.type,
        date: reward.date
    }));

    return (
        <Table columns={columns} dataSource={data} />
    );
}

function mapStateToProps(state) {
    return {
        rewards: state.rewards,
        punishments: state.punishments
    };
}

export default connect(mapStateToProps, { fetchRewardsAndPunishments })(RewardsList);
