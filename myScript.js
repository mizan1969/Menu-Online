
// JavaScript Document
$(function() {
	//hide the all of the element with class msg_body
	$(".msg_body").hide();
	//slides the element with class "msg_body" when paragraph with class "msg_head" is clicked 
	$("#menu p.msg_head").click(function()
    {
		$(this).next("div.msg_body").slideToggle(700).siblings("div.msg_body").slideUp("slow");	
	});
	
	// Online Order
	
	var subtotal=0;
	var qty =0;
	var discount=0;
	var total=0;
	var price=0;
	var qty_txt=0;
		
	// add item
	
	$('.add_order').on('click', function(){
	
	     qty =1;
	 	
		var return_value = "true";
		
		price = parseFloat( $(this).val()) ;
		
		var item =  $(this).attr("alt");
		
		// removing any empty order
		  $(".qty").each(function(value){
		     
			 if ($(this).val() == '' || $(this).val()==0 )
		  		$(this).closest('table#add_item tr').remove();
		  });
		  // end 
		
		
		if( $(".itm").length >0 ) {

		  // each loop 
		  $(".itm").each(function(value){
		
			var unt_item = $(this).text();

			  if (unt_item == item) { 
			    
				qty_txt = parseInt($(this).next().children().val());
				
				qty_txt = qty_txt +1;	
				
				 var this_price = $(this).next().next().text();
				     this_price = this_price.slice(1);
					 this_price = parseFloat(this_price) ;
				   
					$(this).next().next().html("£" +(this_price + price).toFixed(2) );
					$(this).next().children().val(qty_txt);

					return_value = "false";
				} // endif
		
		   });  // end each loop  
		
		if ( return_value != "false" ){
		 
		  $("table#add_item").append("<tr><td class='itm'>"+item+"</td><td>&nbsp;<input class='qty' type='text' value='"+qty+"'/> </td><td style='text-align:right'>£"+price.toFixed(2)+"</td><td class='hidden_price'>"+price+"</td><td><a class='remove_item' ><img src='image/btn-remove.png' width='15' border='0px'></a></td></tr>");
		 }
		 	
		}else {
		//	alert ("Entering ur first record");
	    $("table#add_item").append("<tr><td class='itm'>"+item+"</td> <td>&nbsp;<input class='qty' type='text' value='"+qty+"'/></td> <td style='text-align:right'>£"+price.toFixed(2)+"</td><td class='hidden_price'>"+price+"</td><td><a class='remove_item' ><img src='image/btn-remove.png' width='15' border='0px'></a></td></tr>");
		
		}
		
			
		// Subtotal
		subtotal = (parseFloat(subtotal) + parseFloat(price)).toFixed(2) ;
		discount = ((subtotal *10 )/100).toFixed(2);
		total = subtotal - discount;
	
		$("#subtotal").text(subtotal);
		$("#discount").text(discount);
		$("#total").text(total.toFixed(2));
		
	});   // end of add item

	
// remove item
$('table#add_item').on('click','.remove_item',function(){

	var item_price = ($(this).parent().prev().prev().text()).slice(1);

 	$(this).closest('table#add_item tr').remove();
 
 		// Subtotal
	    subtotal = (subtotal - item_price).toFixed(2);
		discount = ((subtotal *10 )/100).toFixed(2);
		total = subtotal - discount;
	
		$("#subtotal").text(subtotal);
		$("#discount").text(discount);
		$("#total").text(total.toFixed(2));
 
});
	

// qty value change on keypress
		
$('table#add_item').on('keyup','.qty',function(){
     
	  var temp_price = parseFloat( ($(this).parent().next().text()).slice(1) );
	  
	
	  var unit_price = $(this).parent().next().next().text();
      
	  var this_qty = $(this).val();
      var price_tag = unit_price * this_qty;

   	  $(this).parent().next().html("£" +(price_tag).toFixed(2) );
	   $(this).val(this_qty);
	   
	 
	  
	  // subtotal 
	    subtotal = ( parseFloat(subtotal) - temp_price).toFixed(2) ;
		
		subtotal = ( parseFloat(subtotal) + price_tag).toFixed(2) ;
		discount = ((subtotal *10 )/100).toFixed(2);
		total = subtotal - discount;
	
		$("#subtotal").text(subtotal);
		$("#discount").text(discount);
		$("#total").text(total.toFixed(2));


});

// Empty Order
  $("#empty_order").click(function(){
  
  	$("table#add_item tr:not(.head)").empty();
	$("#subtotal").html("0.00");
	$("#discount").html("0.00");
	$("#total").html("0.00");
	subtotal = 0;
 
  });	
  
  
  // checkout 
  
  $('#checkout').on('click',function(){
  
  
 		 // removing any empty order
		  $(".qty").each(function(value){
		     
			 if ($(this).val() == '' || $(this).val()==0 )
		  		$(this).closest('table#add_item tr').remove();
		  });
		  // end 




}); // end document

});