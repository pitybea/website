import os
import re


def genAllJS():
    tvjs=[f for f in os.listdir("./static/jsorigin") if re.match(r'.*\.js',f)  ]      
    tvjs.sort
    for tj in tvjs:
        cmd="java -jar compiler.jar --js ./static/jsorigin/"+ tj+ " --js_output_file ./static/js/" + tj
        print cmd
        os.system(cmd)
    
    print "compiling all js files"
    
def updateJS():
    cmd="rm ./static/js/*.js"
    print cmd
    os.system(cmd)
    genAllJS()
    cmd="cp ./static/jslib/*.js ./static/js/"
    print cmd
    os.system(cmd)
    print "all js files updated"
    
    
    

def genSingleJS(tj):
    tvjs=[f for f in os.listdir("./static/jsorigin") if re.match(r'.*\.js',f)] 

    if(tj in tvjs):
        cmd="java -jar compiler.jar --js ./static/jsorigin/"+ tj+ " --js_output_file ./static/js/" + tj
        print cmd
        os.system(cmd) 
        print "compiling finished"
    else:
        print "invalid file name"

if __name__ == '__main__':
    #genAllJS()
    genSingleJS("zd_test.js")
