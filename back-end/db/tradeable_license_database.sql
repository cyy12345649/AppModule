-- tradeable_license_database
-- 创建数据库

DROP DATABASE IF EXISTS tradeable_license_database;
CREATE DATABASE tradeable_license_database;

-- 使用创建的数据库
USE tradeable_license_database;

-- 创建用户活动参与状态表
-- 状态：
    -- 不存在: 没有过报名操作,
    -- -1: not eligible,
    -- 1 : already participated, 
    -- 2 : Administrator
CREATE TABLE IF NOT EXISTS user_activity_participation_status (
    userId VARCHAR(255) NOT NULL,
    status INT NOT NULL,
    PRIMARY KEY (userId)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- 创建用户初始化与统计数据表
CREATE TABLE IF NOT EXISTS user_init_data (
    userId VARCHAR(255) NOT NULL,
    week INT NOT NULL,
    initCoupons INT NOT NULL,
    initPoints INT NOT NULL,
    PRIMARY KEY (userId, week)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- 创建用户账户表
CREATE TABLE IF NOT EXISTS user_account (
    userId VARCHAR(255) NOT NULL,
    curCoupons INT NOT NULL,
    curPoints INT NOT NULL,
    todayImpact INT NOT NULL,
    PRIMARY KEY (userId)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- 创建用户交易事件表
-- 交易类别：
-- 买/卖/使用/结算
-- Buy/Sell/Use/Settle

CREATE TABLE IF NOT EXISTS user_transaction_event (
    transactionId INT NOT NULL AUTO_INCREMENT,
    userId VARCHAR(255) NOT NULL,
    transactionTime TIMESTAMP NOT NULL,
    transactionCategory VARCHAR(32) NOT NULL,
    couponChange INT NOT NULL,
    pointChange INT NOT NULL,
    PRIMARY KEY (transactionId)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- 创建用户用电行为表
CREATE TABLE IF NOT EXISTS user_electricity_consumption (
    recordId INT NOT NULL AUTO_INCREMENT,
    consuDate DATE NOT NULL,
    consuHour INT NOT NULL,
    location VARCHAR(10) NOT NULL,
    electricityConsumption INT NOT NULL,
    PRIMARY KEY (recordId)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- 创建用户使用行为表
-- 行为分类：transaction view
CREATE TABLE IF NOT EXISTS user_usage_event (
    recordId INT NOT NULL AUTO_INCREMENT,
    time TIMESTAMP NOT NULL,
    userId VARCHAR(255) NOT NULL,
    event VARCHAR(10) NOT NULL,
    PRIMARY KEY (recordId)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- 创建市场初始化与结算数据表
CREATE TABLE IF NOT EXISTS market_init_data (
    week INT NOT NULL,
    couponIssued INT NOT NULL,
    pointIssued INT NOT NULL,
    PRIMARY KEY (week)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- 创建历史电劵价格数据表
CREATE TABLE IF NOT EXISTS historical_coupon_price_data (
    periodId INT NOT NULL AUTO_INCREMENT,
    modifyTime TIMESTAMP NOT NULL,
    price INT NOT NULL,
    PRIMARY KEY (periodId)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- 创建当前电劵价格表
-- id = 0，只有一行, 需要初始化
CREATE TABLE IF NOT EXISTS cur_coupon_price (
    id INT NOT NULL,
    price INT NOT NULL,
    T INT NOT NULL,
    PRIMARY KEY (id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- 创建每日电劵上限表
CREATE TABLE IF NOT EXISTS daily_coupon_limit (
    recordId INT NOT NULL AUTO_INCREMENT,
    moodifyTime TIMESTAMP NOT NULL,
    D1 INT NOT NULL,
    D2 INT NOT NULL,
    D3 INT NOT NULL,
    D4 INT NOT NULL,
    D5 INT NOT NULL,
    D6 INT NOT NULL,
    D7 INT NOT NULL,
    PRIMARY KEY (recordId)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- 创建电劵价格算法参数表
CREATE TABLE IF NOT EXISTS coupon_price_algorithm_parameters (
    recordId INT NOT NULL AUTO_INCREMENT,
    moodifyTime TIMESTAMP NOT NULL,
    changeThreshold INT NOT NULL,
    userImpactThreshold INT NOT NULL,
    priceChangeStep INT NOT NULL,
    PRIMARY KEY (recordId)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;