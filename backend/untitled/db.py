import pymysql

class DB:
    # 这里的None相当于其他语言的null
    conn = None

    # 构造函数
    def __init__(self):
        self.conn = pymysql.Connect(
            host='xudongshi.cn',
            port=3306,
            user='root',
            passwd='vbnm',
            db='track_log',
            charset='utf8'
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