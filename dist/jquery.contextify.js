/*!
* jQuery Contextify v1.0.2 (http://contextify.donlabs.com)
* Copyright (c) 2014 Adam Bouqdib
* Licensed under GPL-2.0 (http://abemedia.co.uk/license) 
*/

;(function ( $, window, document, undefined ) {

    // Create the defaults once
    var pluginName = 'contextify',
        defaults = {
            items: [],
            menuId: "contextify-menu"
        },
        contextifyId = 0;
        
    function Plugin( element, options ) {
        this.element = element;
        
        this.options = $.extend( {}, defaults, options) ;
        
        this._defaults = defaults;
        this._name = pluginName;
        
        this.init();
    }

    Plugin.prototype.init = function () {
        var options = this.options;
        $(this.element)
        .attr('data-contextify-id', contextifyId)
        .on('contextmenu', function (e) {
            e.preventDefault();
            
            var menu = $('<ul class="dropdown-menu" role="menu" id="' + options.menuId + '"/>');
            var l = options.items.length;
            var i;
            
            for (i = 0; i < l; i++) {
                var item = options.items[i];
                var el = $('<li/>');
                
                if (item.divider) {
                    el.addClass('divider');
                } 
                else if (item.header) {
                    el.addClass('dropdown-header');
                    el.html(item.header);
                }
                else {
                    el.append('<a/>');
                    var a = el.find('a');
                    
                    if (item.href) {
                        a.attr('href', item.href);
                    }
                    if (item.onclick) {
                        a.on('click', item.onclick);
                    }
                    if (item.data) {
                        a.data(item.data);
                    }
                    a.html(item.text);
                }
                
                menu.append(el);
            }
            
            if ($("#" + options.menuId).length > 0) {
                $("#" + options.menuId).replaceWith(menu);
            } 
            else {
                $('body').append(menu);
            }
            
            var x = (menu.width() + e.clientX < $(window).width()) ? e.clientX : e.clientX - menu.width(),
                y = (menu.height() + e.clientY < $(window).height()) ? e.clientY : e.clientY - menu.height();
            
            menu
                .css('top', y)
                .css('left', x)
                .show();
        })
        .parents().on('mouseup', function () {
            $("#" + options.menuId).hide();
        });
        
        contextifyId++;
    };
    
    $.fn[pluginName] = function ( options ) {
        return this.each(function () {
            if (!$.data(this, 'plugin_' + pluginName)) {
                $.data(this, 'plugin_' + pluginName, 
                new Plugin( this, options ));
            }
        });
    };

})( jQuery, window, document );
