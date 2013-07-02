function genli(objs)
{
    var to='';
    for(var tt in objs)
    {
        to+= '<li>'+objs[tt].title+'</li>';
    }
    return to;
}


function turncolor(a,b, inp)
{
    if (inp==a)
        return b;
    else
        return a;
}