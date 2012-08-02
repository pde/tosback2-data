$('#btn_continue').click(function()
{
  if ($('#promo').attr('value').length == 9)
  {
    var itc = $.cookie('itc');
    if (itc.length == 25)
    {
      $.cookie('tmp_offer',itc.substr(23,2), { path: '/', domain: 'capitalone.com' }); 
      $.cookie('itc', itc.substr(0,16) + $('#promo').attr('value').toUpperCase(), { expires: 60, path: '/' ,domain: 'capitalone.com' });
    }

  }
});
