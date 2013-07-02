jQuery(document).ready(function()
{

    jQuery(".btn2").click(function()
    {
        jQuery('.D').each(function() {
            var color= turncolor('rgb(255, 255, 0)','rgb(255, 0, 0)',jQuery(this).css("background-color"));
            console.log(color);
            jQuery(this).css({"background-color": color});
            //    alert( this.id );
        });
    //    console.log(jQuery('.D').length);

    //      jQuery('.D').each(function() {
    //        tc=jQuery(this).css("background-color");
    //        tc=jQuery(this).css("background-color");
    //        co= turncolor('rgb(255, 255, 0)','rgb(255, 0, 0)',tc);

    //        jQuery(this).css({"background-color": co});
    //        console.log(co);

    //    });

    });
    jQuery(".btn4").click(function()
    {
     jQuery(".container").find(':last-child').remove();
     var curre="[seldef='" + "1" + "']";

     console.log(curre);

     jQuery(".bcont").find(curre).each(function(){
         console.log(this.className);
     })
    });

    jQuery(".gtest").click(function() {

        this.foo();
       // this.g();
        jQuery('.gtest').get(0).foo();
        console.log(jQuery('.gtest').get(0).className);
     //   jQuery(".lst0").append(' <tk-element-databinding></tk-element-databinding>');
    });


    jQuery(".btn3").click(function() {
        jQuery(".container").append(jQuery('<div/>', {
            id: 'boxD',
            className: 'D'
        }));
    });

    jQuery(".btn1").click(function() {
        var input_string = jQuery(".word").val();

        jQuery.ajax(
            {
                type: "POST",
                data: {good: input_string},
                success: function(myg)
                {

                        var obj = JSON.parse(myg);
                        jQuery(".lst").html(genli(obj));


                }
            });
        return false;
    });



});




//jQuery(".btn2").click(function(){
//    jQuery("#boxC").css("background-color","red");
//});


