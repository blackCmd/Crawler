#-*- coding: utf-8 -*-
import urllib
from bs4 import BeautifulSoup
import os

title_no = []
title = []
href = []
date = []

def contents_spider(href):
    if href == "null":
        contents = "null contents"
    else:
        contents_url = href
        contents_code = urllib.urlopen(contents_url)
        contents_soup = BeautifulSoup(contents_code, 'lxml')
        contents = contents_soup.find('td').text
    return contents

def board_spider(max_pages):
    page=1
    while page <= max_pages:
        url = "http://gall.dcinside.com/board/lists/?id=inha&page=" + str(page)
        source_code = urllib.urlopen(url)
        soup = BeautifulSoup(source_code, "lxml")
        title_no_tag = soup.findAll('td', attrs={"class": "t_notice"})
        title_tag = soup.findAll('td', attrs={'class': 't_subject'})
        date_tag = soup.findAll('td',attrs={'class':'t_date'})

        for i in range(0,31):
            if title_no_tag[i].text == u'공지':
                continue

            title_no.append(title_no_tag[i].text)
            title.append(title_tag[i].find('a').text)
            href.append("http://gall.dcinside.com/board/view/?id=inha&no=%s&page=%d" % (title_no[-1], page))

            if len(date) == 0:
                date.append(date_tag[i].text)
            elif date[-1] != date_tag[i].text :
                date.append(date_tag[i].text)

        '''for i in range(len(title)):
            print href[i]
            print title_no[i],; print title[i]
            print contents_spider(href[i])'''

        page += 1

def make_directory(date):
    if not os.path.isdir("Crawling"):
        os.mkdir("Crawling")
    os.chdir("Crawling")
    for i in date:
        homeDir = os.getcwd()
        if not os.path.isdir(i):
            os.mkdir(i)
        os.chdir(i)
        for k in range(len(title)):
            f = open(title_no[k]+'.txt', 'w')
            f.write(title[k].encode('utf-8'))
            f.write('\n//==========//\n')
            f.write(contents_spider(href[k]).encode('utf-8'))
            f.close()
        os.chdir(homeDir)
    return

board_spider(1)
make_directory(date)