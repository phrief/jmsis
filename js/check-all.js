(function(){
    /* jQuery check-all plugin */
    function onChange(ev){
        var $this = $(this);
        var $group = $this.closest('form').find('input[name="'+ $this.data('name') +'"]');

        $group.each(function(i, el){
            el.checked = $this.is(':checked');
        });
    }
    $(function(){
        $('body').delegate('input.check-all', 'change', onChange);
    });
})();