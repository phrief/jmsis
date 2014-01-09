
//datetimepicker
function show_date(v,formattype)
{
	if(formattype && formattype != "undefined")
	{
		var datetype = "%Y-%m-%d %H:%M";
		var show_time = true;
	}
	else
	{
		var datetype = "%Y-%m-%d";
		var show_time = false;
	}
	jQuery("#"+v).dynDateTime({
		showsTime: show_time,
		ifFormat: datetype,
		timeFormat:"24"
	});
}
//fileupload
function ajaxFileUpload(fid,bid,lid)
{
	//notify(bid);
	if(!$('#'+ fid).val()){
		return false;
	}
	var loadingc = '<img src="images/loading.gif" >';
	//return false;
	$("#"+lid)
	.ajaxStart(function(){
		$(this).html(loadingc);
	})
	.ajaxComplete(function(){
		//$(this).html('');
	});
	$.ajaxFileUpload
	(
		{
			url:'uploada.php', 
			secureuri:false,
			fileElementId:fid,
			dataType: 'json',
			success: function (data, status)
			{
				if(typeof(data.error) != 'undefined')
				{
					if(data.error != '')
					{
						//notify(data.error);
						$("#"+lid).html(data.error);
					}else
					{
						//notify(data.msg);
						$("#"+lid).html(data.msg);
						$('#'+ bid).val(data.file);
					}
				}
			},
			error: function (data, status, e)
			{
				//notify(e);
				$("#"+lid).html(data.error);
			}
		}
	)
	return false;
}  