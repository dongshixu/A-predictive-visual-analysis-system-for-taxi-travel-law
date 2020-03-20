import pymysql
import time


class DB:
    conn = None

    # 构造函数
    def __init__(self):
        self.conn = pymysql.Connect(
            host='localhost',
            port=3306,
            user='root',
            passwd='vbnm',
            db='chinavis',
            charset='utf8',
            # host='10.1.130.254',
            # port=3306,
            # user='root',
            # passwd='root',
            # db='vis',
            # charset='utf8'

        )

    def get_mysql(self, sql, *parma):
        cursor = self.conn.cursor()
        cursor.execute(sql, *parma)
        result = cursor.fetchall()
        self.conn.commit()
        return result

    # 批量插入数据
    def insert_date(self, sql, ls):
        cursor = self.conn.cursor()
        cursor.executemany(sql, ls)
        self.conn.commit()

    def __del__(self):
        self.conn.cursor().close()
        self.conn.close()


def transferTime(str):
    str = int(str)
    time_local = time.localtime(str)
    dt = time.strftime("%Y-%m-%d %H:%M:%S", time_local)
    return int(dt[11:13])*3600 + int(dt[14:16])*60 + int(dt[17:19])


def secoendsTolocaltime(a):
    a1 = a // 3600
    b1 = (a - a1*3600) // 60
    c1 = a - a1*3600 - b1*60
    return str(a1) + ':' + str(b1) + ':' + str(c1)


def deal_one(str):
    a = str.split(',')
    b = list()
    for i in range(len(a)):
        if i == 0:
            b.append(a[i])
        elif i == 1 or i == 2:
            b.append(transferTime(a[i]))
        else:
            b.append(float(a[i]))
    return b


def deal_two(str):
    a = str.split(',')
    b = list()
    for i in range(len(a)):
        if i == 0:
            b.append(a[i])
        elif i == 1:
            b.append(transferTime(a[i]))
        else:
            b.append(float(a[i]))
    return b


if __name__ == '__main__':
    st = time.time()
    mysql = DB()
    # mysql.get_mysql(" CREATE TABLE  orderChart (`id` int(11) NOT NULL AUTO_INCREMENT, `orderID` varchar (50), `Otime` int (11), `Dtime` int (11), `lat1` decimal (18, 6), `lng1` decimal (18, 6), `lat2` decimal (18, 6), `lng2` decimal (18, 6), PRIMARY KEY (`id`))")
    # mysql.get_mysql(" CREATE TABLE  orderdetailChart (`id` int(11) NOT NULL AUTO_INCREMENT, `orderID` varchar (50), `Ntime` int (11), `lat` decimal (18, 6), `lng` decimal (18, 6), PRIMARY KEY (`id`))")

    # f_path = r'F:\baiduyundownload\20180501\order-uniq-20180501.txt'
    # f_path1 = r'F:\baiduyundownload\20180501\gps-20180501.txt'

    # file_container = list()
    # count = 10000
    # with open(f_path1) as f:
    #     for line in f:
    #         # print(line)
    #         file_container.append(tuple(deal_two(line.strip())))
    #         count -= 1
    #         if count == 0:
    #             # print(file_container)
    #             # break
    #             # mysql.insert_date("insert into orderChart (orderID, Otime, Dtime, lat1, lng1, lat2, lng2) values(%s, %s, %s, %s, %s, %s, %s)", file_container)  # ###### 数据库插入操作
    #             mysql.insert_date("insert into orderdetailChart (orderID, Ntime, lat, lng) values(%s, %s, %s, %s)", file_container)
    #             count = 10000
    #             file_container = []
    #     if count != 0 and len(file_container) != 0:
    #         # mysql.insert_date("insert into orderChart (orderID, Otime, Dtime, lat1, lng1, lat2, lng2) values(%s, %s, %s, %s, %s, %s, %s)", file_container)
    #         mysql.insert_date("insert into orderdetailChart (orderID, Ntime, lat, lng) values(%s, %s, %s, %s)", file_container)

    # mysql.get_mysql("ALTER TABLE orderChart ADD INDEX index_Otime (Otime)")
    # mysql.get_mysql("ALTER TABLE orderChart ADD INDEX index_Dtime (Dtime)")
    # mysql.get_mysql("ALTER TABLE orderdetailChart ADD INDEX index_Ntime (Ntime)")
    # mysql.get_mysql("ALTER TABLE orderdetailChart ADD INDEX index_orderID (orderID)")

    # timestamp = 1525140516
    # # 转换成localtime
    # time_local = time.localtime(timestamp)
    # # 转换成新的时间格式(2016-05-05 20:28:54)
    # dt = time.strftime("%Y-%m-%d %H:%M:%S", time_local)
    #
    # print(dt[11:13], dt[14:16], dt[17:19], int(dt[11:13])*3600 + int(dt[14:16])*60 + int(dt[17:19]))
    # print(secoendsTolocaltime(74884))

    # 读取数据 操作数据库
    res = mysql.get_mysql("SELECT * FROM orderdetailChart WHERE Ntime = 86299 ")
    print(res)

    ed = time.time()
    print(time.strftime('%m.%d %H:%M:%S', time.localtime(ed)))
    print(ed - st, 's', 'ok')

    pass