import os
import re

def allJsCss0():
 
   
    tm=[]
          
    tvjs=[f for f in os.listdir("./static/js") if re.match(r'.*\.js',f)]
    #files = [f for f in os.listdir('.') if re.match(r'[0-9]+.*\.jpg', f)]
    tvjs.sort
    
    

    tvcss=[f for f in os.listdir("./static/css") if re.match(r'.*\.css',f)]
    tvcss.sort
   
    tm.append(tvcss)
    tm.append(tvjs)
    return tm
        



