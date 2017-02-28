var multiply = 1;
var id_r = 1;
$(document).ready(function() {
	// btn add
	$("#tabelRouting").on( 'click','.btnModify', function(e) {
		e.preventDefault();
		// datepicker
		$('.datepicker').datepicker('destroy');
		var $this   = $(this);
			$tr     = $this.closest("tr");
		var allTrs = $tr.closest("table").find("tr");
		var id_sel = $tr.index() + 1;
		//var id_sel = $tr.attr('id').replace('tr_','');
        var lastTr = allTrs[id_sel];
        var $clone  = $(lastTr).clone(false); 
        //var i = allTrs.length;
        var i = add();
        
        $tr.closest('table').append($clone);
        updateElementIndex($clone, 'form', 1); 



        $clone.attr('id','tr_'+(i)).find('.step').val(i);    
        // td 2
        var value = $tr.find('select option:selected').val();
        $clone.find('td').find('select').val( value );
    	// td 2
    	// td 2
        var value = $tr.find('.instruction').val();
        $clone.find('td').find('.instruction').val( value );
    	// td 2
    	// td 3
        var value = $tr.find('.response').val();
        $clone.find('td').find('.response').val( value );
    	// td 3
    	// td 4
        var value = $tr.find('.baseline').val();
        $clone.find('td').find('.baseline').val( value );

        var value = $tr.find('.plan').val();
        $clone.find('td').find('.plan').val( value );

        var value = $tr.find('.actual').val();
        $clone.find('td').find('.actual').val( value );
    	// td 4
    	// td 5
    	var value = $tr.find('.divisionStatus').val();
        $clone.find('td').find('.divisionStatus').val( value );
    	// td 5
    	// td 6
    	var value = $tr.find('.rountingStatus').val();
        $clone.find('td').find('.rountingStatus').val( value );

        $('.datepicker').datepicker({   format: 'dd-mm-yyyy', autoclose: true  });
		 

    	// td 6
	});

	// btn remove
	$("#tabelRouting").on( 'click','.btnRemove', function(e) {
		e.preventDefault();
		var answer = confirm("Are you sure you want to remove?");
        if (answer) {
        	var tr = $(this).closest('tbody').find('tr').length;
        	if(tr < 2) {
        		alert ('minimal satu');
        		return false;
        	}        	 
        	
        	min();
			$(this).closest('tr').remove();

			$("#tabelRouting tbody tr").each(function(e,init){
            	var id = (e) * multiply;
            	$(this).find('.step').val(id + 1);
            	 
            });

	    }
	});

});

function updateElementIndex(el, prefix, index){
     var id_regex = new RegExp('(' + prefix + '-\\d+)');
     var replacement = prefix + '-' + index;
     if ($(el).attr("for")) $(el).attr("for", $(el).attr("for").replace(id_regex, replacement));    
     if (el.id) el.id = el.id.replace(id_regex, replacement);
     if (el.name) el.name = el.name.replace(id_regex, replacement);    
    
}

function add() {
    id_r++;
    return (id_r * multiply);
}

function min() {
    id_r--;
    return id_r;
}