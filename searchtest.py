#! /usr/bin/python

import os
import sys
import datetime
from subprocess import Popen, PIPE
def sentimentSearch(query):
    result=[]
    #dictionary=readDict("/home/melo/workspace/SeikenKoukai2013/liblinear.index")
    env={"NLP":"/home/melo/workspace/NLP/"}
    stdin=Popen(("java -cp /home/melo/workspace/NLP/lib/edu.mit.jwi_2.2.3.jar:/home/melo/workspace/NLP/bin:/home/melo/workspace/NLP/lib/lucene-4.3/queriesucene-queries-4.3.0.jar:/home/melo/workspace/NLP/lib/lucene-4.3/core/lucene-core-4.3.0.jar:/home/melo/workspace/NLP/lib/lucene-4.3/analysis/common/lucene-analyzers-common-4.3.0.jar:/home/melo/workspace/NLP/lib/lucene-4.3/queryparser/lucene-queryparser-4.3.0.jar:/home/melo/workspace/NLP/liblinear-java/bin:/home/melo/workspace/NLP/lib/commons-cli-1.2.jar:/home/melo/workspace/NLP/lib/commons-logging-1.1.1.jar:/home/melo/workspace/NLP/lib/jedis-2.0.0.jar:/home/melo/workspace/NLP/lib/stanford-corenlp-2012-07-09/stanford-corenlp-2012-07-09.jar:/home/melo/workspace/NLP/lib/stanford-corenlp-2012-07-09/stanford-corenlp-2012-07-06-models.jar:/usr/lib/jvm/java-6-openjdk/lib/commons-pool-1.6.jar:/home/melo/workspace/opennlp/lib/opennlp-tools-1.5.2-incubating.jar:$/home/melo/workspace/NLP/lib/edu.mit.jwi_2.2.3.jar Lucene/Queryer \""+query+"\" 2 > /home/melo/error").split(" "),env=env,stdout=PIPE,stderr=None).stdout
    for line in stdin:
        splits=line.split(" ")
        queries=query.split(" ")
        if float(splits[1])>0 :
            pol=1
        else:
            pol=-1;
        lst=[splits[0],datetime.datetime.fromtimestamp(int(splits[2])).isoformat(),pol]
        words=[]
        for i in range(len(splits)-3):
            index=splits[i+3].rfind("/")
            word=splits[i+3][:index]
            if index==-1:
                val=0.0
            else:
                val=float(splits[i+3][index+1:])
            inq=False
            for q in queries:
                if word.lower().find(q.lower())!=-1:
                    inq=True
            words.append((word,val,inq));
        lst.append(words)
        line=lst[0]+" "+lst[1]+" "+str(lst[2])
        for word in lst[3]:
            line+=" "+word[0]+" "+str(word[1])+" "+str(word[2])
        print line
        sys.stdout.flush()
        #yield lst
        #result.append(lst)
    #return result
if __name__=="__main__":
    #print "The return is structured as:"
    #print "\t[elem1,elem2,...]"
    #print "\telemN=[user:string,"+"time:string,"+"polarity:int(-1,+1),"+"[wordTuple1,wordTuple2,...]]"
    #print "\twordTupleN=(word:string,weight:float(-inf,+inf),query:boolean)"
    for i in range(len(sys.argv)):
        if sys.argv[i].find("searchtest.py")!=-1:
            sentimentSearch(sys.argv[i+1])
            break
