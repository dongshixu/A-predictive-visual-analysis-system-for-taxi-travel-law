from __future__ import unicode_literals
from django.http import JsonResponse
import json
import tensorflow as tf
import numpy as np
import matplotlib.pyplot as plt
import time
import os
import pymysql
import csv
import sklearn.preprocessing
from .db import DB
from django.shortcuts import HttpResponse
from django.shortcuts import render
from django.views.decorators.csrf import csrf_exempt


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


def prediction(request):
    if request.method == 'POST':
        req = json.loads(request.body)
        res = use_lstm(req)
        return jsonres(res)
    else:
        return jsonres(result=False)


def weight_variable(shape):
    initial = tf.truncated_normal(shape, stddev=0.1)
    return tf.Variable(initial)


def bias_variable(shape):
    initial = tf.constant(0.1, shape=shape)
    return tf.Variable(initial)


def conv2d(x, w):
    return tf.nn.conv2d(x, w, strides=[1, 1, 1, 1], padding="SAME")  # 由于用的same采样后的值还是原数组


def max_pool_2x2(x):
    return tf.nn.max_pool(x, ksize=[1, 2, 2, 1], strides=[1, 2, 2, 1], padding="SAME")


def list_of_groups(init_list, childern_list_len):
    list_of_groups = zip(*(iter(init_list),) *childern_list_len)
    end_list = [list(i) for i in list_of_groups]
    count = len(init_list) % childern_list_len
    end_list.append(init_list[-count:]) if count != 0 else end_list
    return end_list


def test_cnn(A):
    A = int(A["x"])
    mysql = DB()
    a = []
    c = []
    d = []
    e = []
    aaa = []
    for i in range(985, 1025, 5):
        res_d_x = mysql.get_mysql("select * from five_carflow201402%02d" % A + " where time_minute = %d" % i)
        for j in res_d_x:
            a.append(j[2])
    c.append(a)
    for k in range(1030, 1060, 10):
        res_d_y = mysql.get_mysql("select * from five_carflow201402%02d" % A + " where time_minute = %d" % k)
        for l in res_d_y:
            e.append(l[2])
    d.append(e)
    c = np.array(c, dtype=float)
    d = np.array(d, dtype=float)

    xs = tf.placeholder(tf.float32, [None, 5424])
    ys = tf.placeholder(tf.float32, [None, 678*3])
    keep_prob = tf.placeholder(tf.float32)
    x_data = tf.reshape(xs, [-1, 8, 678, 1])

    # conv1 layer
    W_conv1 = weight_variable([5, 5, 1, 32])
    b_conv1 = bias_variable([32])
    h_conv1 = tf.nn.relu(conv2d(x_data, W_conv1) + b_conv1)  # output_size 678 * 8 * 32
    h_pool1 = max_pool_2x2(h_conv1)  # output_size 339 * 4 * 32

    # conv2 layer
    # W_conv2 = weight_variable([5, 5, 32, 64])
    # b_conv2 = bias_variable([64])
    # h_conv2 = tf.nn.relu(conv2d(x_data, W_conv2) + b_conv2)
    # h_pool2 = max_pool_2x2(h_conv2)

    # func1 layer
    W_fc1 = weight_variable([339 * 4 * 32, 512])
    b_fc1 = bias_variable([512])
    h_pool1_flat = tf.reshape(h_pool1, [-1, 339 * 4 * 32])
    h_fc1 = tf.nn.relu(tf.matmul(h_pool1_flat, W_fc1) + b_fc1)
    h_fc1_drop = tf.nn.dropout(h_fc1, keep_prob)

    # func2 layer
    W_fc2 = weight_variable([512, 678*3])
    b_fc2 = bias_variable([678*3])
    prediction = tf.nn.relu(tf.matmul(h_fc1_drop, W_fc2) + b_fc2)

    loss = tf.reduce_mean(tf.reduce_sum(tf.reduce_sum(tf.square(ys - prediction), reduction_indices=[1])))
    # loss = tf.reduce_mean(tf.nn.softmax_cross_entropy_with_logits(logits=prediction, labels=ys))
    train_step = tf.train.AdamOptimizer(0.0005).minimize(loss)
    init = tf.global_variables_initializer()
    sess = tf.Session()
    sess.run(init)
    saver = tf.train.Saver()
    cn = 0
    saver.restore(sess, 'D://savemodel//./mode69.ckpt')
    req = np.around(sess.run(prediction, feed_dict={xs: np.array([list(c[cn])]), ys: np.array([list(d[cn])]), keep_prob: 0.5}))
    acc = (list(req[0] - d[cn]).count(0) + list(req[0] - d[cn]).count(1) + list(req[0] - d[cn]).count(-1) + list(req[0] - d[cn]).count(-2) + list(req[0] - d[cn]).count(2) + list(req[0] - d[cn]).count(-3) + list(req[0] - d[cn]).count(3)) / (678*3)
    acc1 = req[0] - d[cn]
    # print(sum(d[cn]) / (678*3))
    # print(list(abs(acc1/d[cn])))
    acc1 = list(acc1)
    # print(acc1, len(acc1), acc1.count(0))
    result = list_of_groups(acc1, 678)
    eee = []
    for res in result:
        qqq = dict()
        c = []
        c1 = []
        c2 = []
        c3 = []
        c4 = []
        c5 = []
        w = res.count(0)
        w1 = res.count(1) + res.count(-1)
        w2 = res.count(2) + res.count(-2)
        w3 = res.count(3) + res.count(-3)
        c.append(w / 678 * 1000)
        c.append(w1 / 678 * 1000)
        c.append(w2 / 678 * 1000)
        c.append(w3 / 678 * 1000)
        c.append((678 - w - w1 - w2 - w3) / 678 * 1000)
        for i in range(len(res)):
            if res[i] == 0:
                c1.append(i+1)
            elif res[i] == 1 or res[i] == -1:
                c2.append(i+1)
            elif res[i] == 2 or res[i] == -2:
                c3.append(i+1)
            elif res[i] == 3 or res[i] == -3:
                c4.append(i+1)
            else:
                c5.append(i+1)
        qqq["pre"] = c
        qqq["zero"] = c1
        qqq["one"] = c2
        qqq["two"] = c3
        qqq["three"] = c4
        qqq["other"] = c5
        eee.append(qqq)
    # print(eee)
    aaa.append(req.tolist())  # 预测值
    aaa.append(d.tolist())  # 真实值
    aaa.append(eee)  # 饼状图数据
    np.set_printoptions(threshold='nan')  # 全部输出
    print(list_of_groups(req[0].tolist(), 678)[0])
    print(list_of_groups(d[cn].tolist(), 678)[0])
    return aaa


label_binarizer = ""


def def_one_hot(x):
    if label_binarizer == "":
        binarizer = sklearn.preprocessing.LabelBinarizer()
    else:
        binarizer = label_binarizer
    binarizer.fit(range(max(x)+1))
    y = binarizer.transform(x)
    return y


def use_lstm(A):
    # print(A)
    a = A[0]
    b = A[1]
    c = A[2]
    d = A[3]

    if b < 4:
        b = 4
    elif b > 46:
        b = 46

    x_time = def_one_hot([47, b])
    x_week = def_one_hot([6, d])
    x_day = def_one_hot([30, a-1])
    x_weather = def_one_hot([4, c])

    res_csv_x = csv.reader(open("D:/texi_data/usedata/flow_time01%02d.csv" % a))
    res_csv_y = csv.reader(open("D:/texi_data/usedata/flow_time_lable01%02d.csv" % a))

    aa_x = []
    bb_y = []
    oneday_data_x = []
    oneday_data_y = []

    for row in res_csv_x:
        aa_x.append(list(map(float, row)))
    for row in res_csv_y:
        bb_y.append(list(map(float, row)))  # 改动

    oneday_data_y.append(bb_y[b-4])

    p = list_of_groups(aa_x[b-4], 678)
    indirect = []
    for i in range(len(p) - 1):
        p[i].extend(x_time[1])
        p[i].extend(x_week[1])
        p[i].extend(x_day[1])
        p[i].extend(x_weather[1])
        indirect.extend(p[i])
    oneday_data_x.append(indirect)  # 改动

    n_inputs = 678 + 48 + 7 + 31 + 5
    n_steps = 8
    n_hidden_unis = 128
    n_class = 678 * 3
    size = 1

    x = tf.placeholder(tf.float32, [None, n_steps, n_inputs], name="x_input")
    y = tf.placeholder(tf.float32, [None, n_class], name="y_input")

    # Define weight
    weigths = {
        'in': tf.Variable(tf.random_normal([n_inputs, n_hidden_unis])),
        'out': tf.Variable(tf.random_normal([n_hidden_unis, n_class]))
    }

    biases = {
        'in': tf.Variable(tf.constant(0.1, shape=[n_hidden_unis, ])),
        'out': tf.Variable(tf.constant(0.1, shape=[n_class, ]))
    }

    def rnn1(X, weights, biases):
        X = tf.reshape(X, [-1, n_inputs])
        X_in = tf.matmul(X, weights['in']) + biases['in']
        X_in = tf.reshape(X_in, [-1, n_steps, n_hidden_unis])

        # cell
        lstm_cell = tf.nn.rnn_cell.BasicLSTMCell(n_hidden_unis, forget_bias=1.0, state_is_tuple=True)
        _init_state = lstm_cell.zero_state(size, dtype=tf.float32)

        outputs, state = tf.nn.dynamic_rnn(lstm_cell, X_in, initial_state=_init_state, time_major=False)

        # outputs
        results = tf.matmul(state[1], weights['out']) + biases['out']
        return results

    pred = rnn1(x, weigths, biases)
    saver = tf.train.Saver()
    os.environ['TF_CPP_MIN_LOG_LEVEL'] = '3'

    with tf.Session() as sess:
        bx = np.array([oneday_data_x[0]])
        bx = bx.reshape([1, n_steps, n_inputs])
        saver.restore(sess, 'D://LSTMmodel//./mode1000.ckpt')
        req = np.around(sess.run(pred, feed_dict={x: bx}))
        req = req.tolist()
        np.set_printoptions(threshold='nan')  # 全部输出
        # print(req[0].tolist())
        # print(oneday_data_y[0])
        # acc = list(map(abs, list(req[0] - oneday_data_y[0])))
        # print((acc.count(0)+acc.count(1)+acc.count(2)+acc.count(3))/(3*678))
        predvalue = map(abs, req[0])
        predvalue = list_of_groups(list(map(int, predvalue)), 678)
        realvalue = list_of_groups(list(map(int, oneday_data_y[0])), 678)
        # print(predvalue)
        # print(realvalue)
        return [predvalue, realvalue]


if __name__ == '__main__':
    # mysql = DB()
    # b = [2, 6, 7, 8, 9, 13, 14, 15, 16, 20, 21, 22, 23, 27, 28]
    # b1 = [2, 3, 4, 5, 9, 10, 11, 12, 16, 17, 18, 19, 23, 24, 25, 26, 30, 31]
    # b2 = [27, 11, 12, 13, 17, 18, 19, 20, 24, 25, 26, 10]
    # c = []
    # d = []
    # for re in b:
    #     a = []
    #     e = []
    #     for i in range(985, 1025, 5):
    #         res_d_x = mysql.get_mysql("select * from five_carflow201401%02d" % re + " where time_minute = %d" % i)
    #         for j in res_d_x:
    #             a.append(j[2])
    #     c.append(a)
    #     for k in range(1030, 1060, 10):
    #         res_d_y = mysql.get_mysql("select * from five_carflow201401%02d" % re + " where time_minute = %d" % k)
    #         for l in res_d_y:
    #             e.append(l[2])
    #     d.append(e)
    # for re in b1:
    #     a = []
    #     e = []
    #     for i in range(985, 1025, 5):
    #         res_d_x = mysql.get_mysql("select * from five_carflow201312%02d" % re + " where time_minute = %d" % i)
    #         for j in res_d_x:
    #             a.append(j[2])
    #     c.append(a)
    #     for k in range(1030, 1060, 10):
    #         res_d_y = mysql.get_mysql("select * from five_carflow201312%02d" % re + " where time_minute = %d" % k)
    #         for l in res_d_y:
    #             e.append(l[2])
    #     d.append(e)
    # for re in b2:
    #     a = []
    #     e = []
    #     for i in range(985, 1025, 5):
    #         res_d_x = mysql.get_mysql("select * from five_carflow201402%02d" % re + " where time_minute = %d" % i)
    #         for j in res_d_x:
    #             a.append(j[2])
    #     c.append(a)
    #     for k in range(1030, 1060, 10):
    #         res_d_y = mysql.get_mysql("select * from five_carflow201402%02d" % re + " where time_minute = %d" % k)
    #         for l in res_d_y:
    #             e.append(l[2])
    #     d.append(e)
    # c = np.array(c, dtype=float)
    # d = np.array(d, dtype=float)
    # print((np.array([list(c[0])])).shape)
    # print(c.shape, d.shape)
    #
    # xs = tf.placeholder(tf.float32, [None, 5424])
    # ys = tf.placeholder(tf.float32, [None, 678*3])
    # keep_prob = tf.placeholder(tf.float32)
    # x_data = tf.reshape(xs, [-1, 8, 678, 1])
    #
    # # conv1 layer
    # W_conv1 = weight_variable([5, 5, 1, 32])
    # b_conv1 = bias_variable([32])
    # h_conv1 = tf.nn.relu(conv2d(x_data, W_conv1) + b_conv1) # output_size 678 * 8 * 32
    # h_pool1 = max_pool_2x2(h_conv1) # output_size 339 * 4 * 32
    #
    # # conv2 layer
    # # W_conv2 = weight_variable([5, 5, 32, 64])
    # # b_conv2 = bias_variable([64])
    # # h_conv2 = tf.nn.relu(conv2d(x_data, W_conv2) + b_conv2)
    # # h_pool2 = max_pool_2x2(h_conv2)
    #
    # # func1 layer
    # W_fc1 = weight_variable([339*4*32, 512])
    # b_fc1 = bias_variable([512])
    # h_pool1_flat = tf.reshape(h_pool1, [-1, 339*4*32])
    # h_fc1 = tf.nn.relu(tf.matmul(h_pool1_flat, W_fc1) + b_fc1)
    # h_fc1_drop = tf.nn.dropout(h_fc1, keep_prob)
    #
    # # func2 layer
    # W_fc2 = weight_variable([512, 678*3])
    # b_fc2 = bias_variable([678*3])
    # prediction = tf.nn.relu(tf.matmul(h_fc1_drop, W_fc2) + b_fc2)
    #
    # loss = tf.reduce_mean(tf.reduce_sum(tf.reduce_sum(tf.square(ys - prediction), reduction_indices=[1])))
    # # loss = tf.reduce_mean(tf.nn.softmax_cross_entropy_with_logits(logits=prediction, labels=ys))
    # train_step = tf.train.AdamOptimizer(0.0005).minimize(loss)
    # init = tf.global_variables_initializer()
    # sess = tf.Session()
    # sess.run(init)
    # saver = tf.train.Saver()
    #
    # for q in range(3500):
    #     # sess.run(train_step, feed_dict={xs: c, ys: d, keep_prob: 0.5})
    #     for f in range(len(c) - 12):
    #         # print(np.array([list(c[0])]))
    #         sess.run(train_step, feed_dict={xs: np.array([list(c[f])]), ys: np.array([list(d[f])]), keep_prob: 0.5})
    #     # if q % 100 == 0:
    #     #     print(np.around(sess.run(loss, feed_dict={xs: c, ys: d, keep_prob: 0.5})))
    #     #     req = np.around(sess.run(prediction, feed_dict={xs: c, ys: d, keep_prob: 0.5}))
    #     #     # acc = list(req - ).count(0) / 678
    #     #     req_d = req - d
    #     #     acc = 0
    #     #     for i in req_d:
    #     #         acc += list(i).count(0) + list(i).count(1) + list(i).count(-1)
    #     #     print(acc / (18*8*678))
    #     if q % 100 == 0:
    #         cn = 44
    #         # acc = 0
    #         # acc1 = 0
    #         # acc2 = 0
    #         # acc3 = 0
    #         # acc4 = 0
    #         # Loss = 0
    #         # for cn in range(len(c) - 5, len(c)):
    #         #     req = np.around(sess.run(prediction, feed_dict={xs: np.array([list(c[cn])]), ys: np.array([list(d[cn])]), keep_prob: 1.0}))
    #         #     acc = acc + (list(req[0] - d[cn]).count(0) + list(req[0] - d[cn]).count(1) + list(req[0] - d[cn]).count(-1) + list(req[0] - d[cn]).count(-2) + list(req[0] - d[cn]).count(2) + list(req[0] - d[cn]).count(-3) + list(req[0] - d[cn]).count(3)) / 678
    #         #     acc1 = acc1 + (list(req[0] - d[cn]).count(0)) / 678
    #         #     acc2 = acc2 + (list(req[0] - d[cn]).count(1) + list(req[0] - d[cn]).count(-1)) / 678
    #         #     acc3 = acc3 + (list(req[0] - d[cn]).count(-2) + list(req[0] - d[cn]).count(2)) / 678
    #         #     acc4 = acc4 + (list(req[0] - d[cn]).count(-3) + list(req[0] - d[cn]).count(3)) / 678
    #         #     Loss = Loss + sess.run(loss, feed_dict={xs: np.array([list(c[cn])]), ys: np.array([list(d[cn])]), keep_prob: 1.0})
    #         # acc = acc / 5
    #         # acc1 = acc1 / 5
    #         # acc2 = acc2 / 5
    #         # acc3 = acc3 / 5
    #         # acc4 = acc4 / 5
    #         # Loss = Loss / 5
    #         # print(Loss, "第%d次准确率为%d%% 0为%d%%  1and-1为%d%%  2and-2为%d%%  3and-3为%d%%" % (q, int(acc * 100), int(acc1 * 100), int(acc2 * 100), int(acc3 * 100), int(acc4 * 100)))  # , sum1/(678*17))
    #         req = np.around(sess.run(prediction, feed_dict={xs: np.array([list(c[cn])]), ys: np.array([list(d[cn])]),keep_prob: 0.5}))
    #         acc = (list(req[0] - d[cn]).count(0) + list(req[0] - d[cn]).count(1) + list(req[0] - d[cn]).count(-1) + list(req[0] - d[cn]).count(-2) + list(req[0] - d[cn]).count(2) + list(req[0] - d[cn]).count(-3) + list(req[0] - d[cn]).count(3)) / (678*3)
    #         acc1 = (list(req[0] - d[cn]).count(0)) / (678*3)
    #         acc2 = (list(req[0] - d[cn]).count(1) + list(req[0] - d[cn]).count(-1)) / (678*3)
    #         acc3 = (list(req[0] - d[cn]).count(-2) + list(req[0] - d[cn]).count(2)) / (678*3)
    #         acc4 = (list(req[0] - d[cn]).count(-3) + list(req[0] - d[cn]).count(3)) / (678*3)
    #         Loss = sess.run(loss, feed_dict={xs: np.array([list(c[cn])]), ys: np.array([list(d[cn])]), keep_prob: 0.5})
    #         print(Loss, "第%d次准确率为%d%% 0为%d%%  1and-1为%d%%  2and-2为%d%%  3and-3为%d%%" % (q, int(acc * 100), int(acc1 * 100), int(acc2 * 100), int(acc3 * 100), int(acc4 * 100)))  # , sum1/(678*17))
    #         if int(acc * 100) >= 70 or q == 3400:
    #             print(Loss, list(req[0] - d[cn]))
    #             # x = np.arange(1, 679, 1)
    #             # y = d[cn]
    #             # fig = plt.figure()
    #             # ax = fig.add_subplot(1, 1, 1)
    #             # ax.scatter(x, y, s=10)
    #             # y1 = req[0]
    #             # ax.scatter(x, y1, s=10, c='r')
    #             # plt.show()
    #             filename = "D://savemodel//mode%d.ckpt" % int(acc * 100)
    #             saver_path = saver.save(sess, filename)
    #             print("Model saved in file:", saver_path)
    # cn = 44
    # saver.restore(sess, "./save/mode70.ckpt")
    # req = np.around(sess.run(prediction, feed_dict={xs: np.array([list(c[cn])]), ys: np.array([list(d[cn])]), keep_prob: 0.5}))
    # acc = (list(req[0] - d[cn]).count(0) + list(req[0] - d[cn]).count(1) + list(req[0] - d[cn]).count(-1) + list(req[0] - d[cn]).count(-2) + list(req[0] - d[cn]).count(2) + list(req[0] - d[cn]).count(-3) + list(req[0] - d[cn]).count(3)) / 678
    # print(req, acc)
    # test_cnn({"x": 18})
    # haha = use_lstm([1, 15, 2, 2])
    # print(len(haha), len(haha[0][1]), len(haha[1]))

    pass