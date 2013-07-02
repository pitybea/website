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

    jQuery(".btn5").click(function() {



      function person(){
          this.interf=function(){console.log('hello')};

          this.test=function(){
              this.interf();
          };
      }
        var p1=new person();
        p1.interf=function(){console.log('hi')};
        p1.test();


     //   jQuery(".lst0").append(' <tk-element-databinding></tk-element-databinding>');
    });


    jQuery(".btn3").click(function() {
        jQuery(".container").append('<div id=\"boxD\" class=\"D\"></div>');
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


