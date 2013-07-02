#!/usr/bin/env python

import web
import os
import json
import sys

from socketio import SocketIOServer
from gevent import monkey 
monkey.patch_all()
from webpy_socketio import *


from settings import *
from common import *
import tools
import searchtest
from subprocess import Popen,PIPE
import subprocess as subp
#import juggernaut
#from gevent import monkey; monkey.patch_all()
#from gevent.pywsgi import WSGIServer
#from socketio.server import SocketIOServer



import time

urls = (
    '/(static)/(.*)', 'static',
'/','search',
'/ok', 'Index'
        )
urls += socketio_urls



render = web.template.render('templates/')
db = web.database(dbn='postgres', user='postgres', pw='admin', db='template1')
web.config.debug = True


class search:
    def GET(self,name=''):
        return render.search()
    
    def POST(self,name=''):
        data = web.input()
        #print data
        chnl=data.chanel
       
        return ""    


class Index:
    def GET(self,name=''):
        tv=allJsCss0()
        print tv
        return render.index(tv[0],tv[1])
        #return render.index("ok")
        
    def POST(self,name=''):
        data=web.input()
        qcmd="select * FROM todo WHERE todo.id='"+data.good+"'"
        try:
            todos = db.query(qcmd)
            
            temv=[]
            for td in todos:
                temv.append(td)
     
            tv=json.dumps(temv)
            return tv
        except Exception:
            return json.dumps([])
 
        
#'/(static)/(.*)', 'static',
class static:
    def GET(self, media, file):
        try:
            f = open(media+'/'+file, 'r')
            return f.read()
        except:
            return '' # you can send an 404 error here if you want




application = web.application(urls, globals())

current_dir = os.path.abspath(os.path.dirname(__file__))
session_dir = os.path.join(current_dir,"sessions")
if web.config.debug:
	if web.config.get('_session') is None:
		session = web.session.Session(application, web.session.DiskStore(session_dir))
		web.config._session = session
	else:
		session = web.config._session
else:	
	session = web.session.Session(application, web.session.DiskStore(session_dir))

#share session with sub-app    
def session_hook():
	web.ctx.session = session
		
application.add_processor(web.loadhook(session_hook))

SOCKETIO_HOST = ""
SOCKETIO_PORT = 8000


if __name__ == '__main__':

    SocketIOServer((SOCKETIO_HOST, SOCKETIO_PORT), application.wsgifunc(), resource="socket.io").serve_forever()
#    web.application(urls,globals()).run()
                

#    WSGIServer(('', 8000), application).serve_forever()
    
    
#    SocketIOServer((SOCKETIO_HOST, SOCKETIO_PORT), \
#                   app, resource="socket.io").serve_forever()
