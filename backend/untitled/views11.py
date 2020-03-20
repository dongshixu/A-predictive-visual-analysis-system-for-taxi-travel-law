from __future__ import unicode_literals
from django.shortcuts import HttpResponse
from django.http import JsonResponse
from django.shortcuts import render
from django.views.decorators.csrf import csrf_exempt
import json
import pymysql
import math

'''
用于数据库取数据Mysql
'''


def jsonres(data=None, result=True, reason=None):
    res = dict()
    if result:
        if data:
            res['data'] = data
            res['code'] = 0
            res['msg'] = 'ok'
            return JsonResponse(res)
        else:
            res['code'] = -1
            res['msg'] = 'no data'
            return JsonResponse(res)
    else:
        res['code'] = 1
        res['msg'] = reason or 'error'
    return JsonResponse(res)


# #######     0   ########

def recv_data(request):
    if request.method == 'POST':
        req = json.loads(request.body)
        return jsonres(req)
    else:
        return jsonres(result=False)

# #######     1 路口坐标   ########


def get_data(request):
    res = G_data()
    return jsonres(res)

# #######     2 出租车数据    ########


def get_texidata(request):
    if request.method == 'POST':
        req = json.loads(request.body)
        print(req, req['y'], type(req['y']))
        return jsonres(req)
    else:
        return jsonres(result=False)

# #######     3    ########
def rec_data(request):
    if request.method == 'POST':
        req = json.loads(request.body)
        res = get_from_Mysql(480, 490)
        return jsonres(res)
    else:
        return jsonres(result=False)

# #######     4    ########
def receive_data(request):
    if request.method == 'POST':
        req = json.loads(request.body)
        # print(req)
        # res = find_Road(req)
        res = change_data()
        return jsonres(res)
        # return jsonres(req)
    else:
        return jsonres(result=False)


# #######     6    ########
def F_road(request):
    a =dict()
    if request.method == 'POST':
        req = json.loads(request.body)
        # # print(req)
        # res = find_Road(req)
        # # calcu1(res)
        # # res = change_data()
        # rep = calculate(res, 480, 510)
        # a['L'] = rep
        # res.append(a)
        # print(res)
        return jsonres(req)
        # return jsonres(req)
    else:
        return jsonres(result=False)


# #######     test    ########
def test(request):
    if request.method == 'POST':
        req = json.loads(request.body)
        # print(req)
        res = get_data2()
        return jsonres(res)
    else:
        return jsonres(result=False)


def G_data():
    connect = pymysql.Connect(
        host='localhost',
        port=3306,
        user='root',
        passwd='vbnm',
        db='track_log',
        charset='utf8'
    )
    # 使用cursor()方法获取操作游标
    cur = connect.cursor()
    sql = "SELECT * FROM Road_point"
    try:
        cur.execute(sql)  # 执行sql语句
        results = cur.fetchall()  # 获取查询的所有记录
    except Exception as e:
        raise e
    finally:
        cur.close()
        connect.close()  # 关闭连接
    dict_set = []
    lat = []
    lng = []
    for index in range(len(results)):
        lat.append(results[index][1])
        lng.append(results[index][2])
    for i in range(len(lat)):
        a = dict()
        a['lat'] = lat[i]
        a['lng'] = lng[i]
        dict_set.append(a)
    # print(dict_set)
    return dict_set


######     根据输入坐标找路坐标     ######
def find_Road(A):
    # print(A)
    list = G_data()
    b = []
    Road_set = []
    ######     点击路口找出路     ######
    for index in range(len(list)):
        a = abs(A['lat'] - float(list[index]['lat'])) + abs(A['lng'] - float(list[index]['lng']))
        b.append(a)
    # print(len(b))
    a = b[0]
    for index in range(len(b)):
        if a > b[index]:
            a = b[index]
    c = b.index(a)
    # print(c)
    res = get_Road1(c)

    for i in range(len(res)):
        e = dict()
        f = dict()
        g = dict()
        d = []
        if res[i].count(None) == 4:
            d.append(list[res[i][1]])
            d.append(list[res[i][2]])
        elif res[i].count(None) == 2:
            d.append(list[res[i][1]])
            d.append(list[res[i][2]])
            e['lat'] = res[i][3]
            e['lng'] = res[i][4]
            d.append(e)
        else:
            d.append(list[res[i][1]])
            d.append(list[res[i][2]])
            e['lat'] = res[i][3]
            e['lng'] = res[i][4]
            f['lat'] = res[i][5]
            f['lng'] = res[i][6]
            d.append(e)
            d.append(f)
        g['R'] = d
        Road_set.append(g)
    # print(len(Road_set), len(Road_set[0]['R']))
    return Road_set


def get_Road():
    connect = pymysql.Connect(
            host='localhost',
            port=3306,
            user='root',
            passwd='vbnm',
            db='track_log',
            charset='utf8'
        )
    # 使用cursor()方法获取操作游标
    cur = connect.cursor()
    sql = "SELECT * FROM load_track"
    try:
        cur.execute(sql)  # 执行sql语句
        results = cur.fetchall()  # 获取查询的所有记录
        return results
    except Exception as e:
        raise e
    finally:
        cur.close()
        connect.close()  # 关闭连接


def change_data():
    res = get_Road()
    list = G_data()
    Road_set = []
    for i in range(len(res)):
        e = dict()
        f = dict()
        g = dict()
        d = []
        if res[i].count(None) == 4:
            d.append(list[res[i][1]])
            d.append(list[res[i][2]])
        elif res[i].count(None) == 2:
            d.append(list[res[i][1]])
            d.append(list[res[i][2]])
            e['lat'] = res[i][3]
            e['lng'] = res[i][4]
            d.append(e)
        else:
            d.append(list[res[i][1]])
            d.append(list[res[i][2]])
            e['lat'] = res[i][3]
            e['lng'] = res[i][4]
            f['lat'] = res[i][5]
            f['lng'] = res[i][6]
            d.append(e)
            d.append(f)
        g['R'] = d
        Road_set.append(g)
    # print(len(Road_set), Road_set)
    return Road_set

def get_Road1(A):
    connect = pymysql.Connect(
            host='localhost',
            port=3306,
            user='root',
            passwd='vbnm',
            db='track_log',
            charset='utf8'
        )
    # 使用cursor()方法获取操作游标
    cur = connect.cursor()
    sql = "SELECT * FROM load_track AS lo WHERE lo.st = %d OR lo.ed = %d" % (A, A)
    try:
        cur.execute(sql)  # 执行sql语句
        results = cur.fetchall()  # 获取查询的所有记录
        return results
    except Exception as e:
        raise e
    finally:
        cur.close()
        connect.close()  # 关闭连接


def get_data2():
    res = ['浙C02668', '浙C04248']
    c = []
    b = []
    connect = pymysql.Connect(
        host='localhost',
        port=3306,
        user='root',
        passwd='vbnm',
        db='track_log',
        charset='utf8'
    )
    cur = connect.cursor()
    for i in range(len(res)):
        sql = "SELECT * FROM new_taxitraj20140101 WHERE car_no = %s"
        try:
            cur.execute(sql, res[i])  # 执行sql语句
            results = cur.fetchall()  # 获取查询的所有记录
            zuobiao_set = []
            lat = []; lng = []
            for i in range(len(results)):
                lat.append(results[i][6])
                lng.append(results[i][5])

            for i in range(len(lat)):
                a = dict()
                a['lat'] = lat[i]
                a['lng'] = lng[i]
                zuobiao_set.append(a)
            c.append(zuobiao_set)
            b.append(len(zuobiao_set))
        except Exception as e:
            raise e
    c.append(b)
    cur.close()
    connect.close()  # 关闭连接
    return c

#  #####测试等下删除######  #


def gtd_F_Mysql(A, B):
    a = []; c = []
    connect = pymysql.Connect(
        host='localhost',
        port=3306,
        user='root',
        passwd='vbnm',
        db='track_log',
        charset='utf8'
    )
    cur = connect.cursor()
    sql = "SELECT * FROM taxitraj20140101 AS ta WHERE ta.time BETWEEN %d AND %d" % (A, B)
    try:
        cur.execute(sql)  # 执行sql语句
        results = cur.fetchall()  # 获取查询的所有记录
        # print(results, len(results))
        # return results
        results = list(results)
        print(len(results))
        for each in results:
            count = 0
            for j in range(len(a)):
                if each[1] == a[j][1]:
                    count += 1
            if count == 0:
                a.append(each)
        for i in range(len(a)):
            b = dict()
            b['lat'] = a[i][6]
            b['lng'] = a[i][5]
            c.append(b)
        print(len(c))
        return c
    except Exception as e:
        raise e
    finally:
        cur.close()
        connect.close()  # 关闭连接

####以上为测试内容###########


def get_from_Mysql(A, B):
    connect = pymysql.Connect(
        host='localhost',
        port=3306,
        user='root',
        passwd='vbnm',
        db='track_log',
        charset='utf8'
    )
    # 使用cursor()方法获取操作游标
    cur = connect.cursor()
    sql = "SELECT * FROM taxitraj20140101 AS ta WHERE ta.time BETWEEN %d AND %d" % (A, B)
    try:
        cur.execute(sql)  # 执行sql语句
        results = cur.fetchall()  # 获取查询的所有记录
        # print(results, len(results))
        return results
    except Exception as e:
        raise e
    finally:
        cur.close()
        connect.close()  # 关闭连接

def calculate_traffic_volume(x, y, x1, y1, x2, y2):
    #计算这辆车是否在这条道路上#
    a = (x2 - x1) * (x - x1) + (y2 - y1) * (y - y1)
    if a <= 0:
        return math.sqrt((x - x1) * (x - x1) + (y - y1) * (y - y1))

    b = (x2 - x1) * (x2 - x1) + (y2 - y1) * (y2 - y1)
    if a >= b:
        return math.sqrt((x - x2) * (x - x2) + (y - y2) * (y - y2))
    r = a / b
    px = x1 + (x2 - x1) * r
    py = y1 + (y2 - y1) * r
    return math.sqrt((x - px) * (x - px) + (y - py) * (y - py))


def calculate(A, B, C):
    '''
     get_from_Mysql(B, C) 从mysql中找到每段时间相应的数据
     calculate_traffic_volume(x, y, x1, y1, x2, y2) 计算点到每段路的距离
    1.判断有几条路，每条路中有几段
    2.计算从B到C中间每隔5分钟统计一下经过的车辆
    说明 a， b， c分别存储每一段路的坐标，e为某一时间段所有车辆坐标的集合， f为去除重复车辆后的集合
    '''
    temp = 0.0002201529809643723
    results = calcu1(A)
    # print(results)
    d = []
    set2 = []
    count = 0
    for index in range(B, C, 5):
        count += 1
        f = []
        e = []
        set1 = []
        res = get_from_Mysql(index, index+5)
        res = list(res)
        #### 将取出车辆当中重复的去除掉 ####
        for I in res:
            count = 0
            for j in range(len(f)):
                if I[1] == f[j][1]:
                    count += 1
            if count == 0:
                f.append(I)
        for k in range(len(f)):
            d.append(float(f[k][6]))
            d.append(float(f[k][5]))
            e.append(d)  ### e[] list 当中为每一辆车此时间段的坐标
            d = []

        for i in range(len(results)):
            b1 = []
            g = []
            h = []
            a1 = []
            if len(results[i]) == 3:
                for J in range(len(e)):
                    g.append(calculate_traffic_volume(e[J][0], e[J][1], results[i][0][0], results[i][0][1], results[i][0][2], results[i][0][3]))
                    h.append(calculate_traffic_volume(e[J][0], e[J][1], results[i][1][0], results[i][1][1], results[i][1][2], results[i][1][3]))
                    a1.append(calculate_traffic_volume(e[J][0], e[J][1], results[i][2][0], results[i][2][1], results[i][2][2], results[i][2][3])) ## g, h, a1表示这一条分为三段的路上每一个点到这三段的分别误差接下来就是设置阈值提取属于这条路上的点
                ####保存计算之后的点####
                for x in range(len(g)):
                    if g[x] <= temp:
                        b1.append(f[x][1])
                    if h[x] <= temp:
                        b1.append(f[x][1])
                    if a1[x] <= temp:
                        b1.append(f[x][1])
            elif len(results[i]) == 2:
                for J in range(len(e)):
                    g.append(calculate_traffic_volume(e[J][0], e[J][1], results[i][0][0], results[i][0][1], results[i][0][2], results[i][0][3]))
                    h.append(calculate_traffic_volume(e[J][0], e[J][1], results[i][1][0], results[i][1][1], results[i][1][2], results[i][1][3]))
                ####保存计算之后的点####
                for x in range(len(g)):
                    if g[x] <= temp:
                        b1.append(f[x][1])
                    if h[x] <= temp:
                        b1.append(f[x][1])
            else:
                for J in range(len(e)):
                    g.append(calculate_traffic_volume(e[J][0], e[J][1], results[i][0][0], results[i][0][1], results[i][0][2], results[i][0][3]))
                ####保存计算之后的点####
                for x in range(len(g)):
                    if g[x] <= temp:
                        b1.append(f[x][1])
            set1.append(b1)
            # print(set1)
        set2.append(set1)
    # print(set2)
    # print(set2)
    sum2 = []
    for index in range(len(set2)-1):
        sum1 = []
        for i in range(len(set2[index])):
            sum1.append(cmp_list(set2[index][i], set2[index+1][i]))
        sum2.append(sum1)
    # print(sum2)
    q = sum2[0]
    for index in range(1, len(sum2)):
        for j in range(len(sum2[index])):
            q[j] += sum2[index][j]
    print(q)
    return q





def calcu1(A):
    set2 = []
    for i in range(len(A)):
        a = []
        b = []
        c = []
        set1 = []
        if len(A[i]['R']) == 4:
            a.append(float(A[i]['R'][0]['lat']))
            a.append(float(A[i]['R'][0]['lng']))
            a.append(float(A[i]['R'][2]['lat']))
            a.append(float(A[i]['R'][2]['lng']))
            b.append(float(A[i]['R'][2]['lat']))
            b.append(float(A[i]['R'][2]['lng']))
            b.append(float(A[i]['R'][3]['lat']))
            b.append(float(A[i]['R'][3]['lng']))
            c.append(float(A[i]['R'][3]['lat']))
            c.append(float(A[i]['R'][3]['lng']))
            c.append(float(A[i]['R'][1]['lat']))
            c.append(float(A[i]['R'][1]['lng']))
            set1.append(a); set1.append(b); set1.append(c)
            set2.append(set1)

        elif len(A[i]['R']) == 3:
            a.append(float(A[i]['R'][0]['lat']))
            a.append(float(A[i]['R'][0]['lng']))
            a.append(float(A[i]['R'][2]['lat']))
            a.append(float(A[i]['R'][2]['lng']))
            b.append(float(A[i]['R'][2]['lat']))
            b.append(float(A[i]['R'][2]['lng']))
            b.append(float(A[i]['R'][1]['lat']))
            b.append(float(A[i]['R'][1]['lng']))
            set1.append(a); set1.append(b)
            set2.append(set1)

        else:
            a.append(float(A[i]['R'][0]['lat']))
            a.append(float(A[i]['R'][0]['lng']))
            a.append(float(A[i]['R'][1]['lat']))
            a.append(float(A[i]['R'][1]['lng']))
            set1.append(a)
            set2.append(set1)
    # print(set2)
    return set2


def cmp_list(A, B):
    temp = 0
    for i in range(len(A)):
        count = 0
        for j in range(len(B)):
            if A[i] == B[j]:
                count += 1
        if count == 0:
            temp += 1
    for i1 in range(len(B)):
        count = 0
        for j1 in range(len(A)):
            if B[i1] == A[j1]:
                count += 1
        if count == 0:
            temp += 1
    return temp

# change_data()