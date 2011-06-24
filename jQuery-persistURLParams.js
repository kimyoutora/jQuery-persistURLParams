/*
 *
 *  jQuery Persistent URL Parameters plugin v0.1
 *    Kang Chen
 *
 *  This plugin was written to address the pattern of having
 *  to persist certain URL parameters across requests. One instance
 *  where this might be useful is campaign codes. If someone visits
 *  the site with campaign=foo, this plugin will append that to all 'a'
 *  elements within the specified scope.
 *
 */

(function($){
  $.fn.persistUrlParams = function(options) {
  
    var settings = {
      localOnly : true,
      params    : ""
    };

    var fromQueryStringtoJSON = function(str) {
     var json = {};

     if(str.length > 1) {
       var pairs = str.split(/&/);
       for(var i = 0; i < pairs.length; i++) {
         vals = pairs[i].split(/=/);
         // fix to perpetually escaping bug
         if(vals[1] != undefined && vals[1] != null) {
           json[vals[0]] = unescape(vals[1].replace(/\+/g, " "));
         }
       }
     }

     return json;
    };
    
    // maintain chainability
    return this.each(function() {
      // If options exist, lets merge them
      // with our default settings
      if(options) {
        $.extend(settings, options);
      }
      
      var localPatterns = new RegExp("^(https?):\/\/[w\.]{0,3}\.?" + window.location.hostname.replace(/\./g, "\\.") + "|^\\/|^\\?");
      
      // Given the persistent params we want to keep,
      // append these params to the end every url
      var persistentParams = settings.params.split(/,\s?/);
      var currentUrlParams = fromQueryStringtoJSON(window.location.search.substr(1));
      
      var $this = $(this);
      $this.each(function() {
        var url = $this.attr("href");
        if(url != undefined) {
          if(settings.localOnly) {
            if(!$this.attr("href").match(localPatterns)) {
              return;
            }
          }
          
          url = url.split(/\?/);
          var urlParams = fromQueryStringtoJSON(url[1] || "");
      
          // merge the params
          for(var i = 0; i < persistentParams.length; i++) {
              var param = persistentParams[i];
              if($.inArray(param, persistentParams) > -1 && currentUrlParams[param] != undefined) {
                urlParams[param] = currentUrlParams[param];
              }
          }
      
          // re-attach URL params back to the element
          var mergedUrlParams = $.param(urlParams);
          if(mergedUrlParams.length > 0) {
            mergedUrlParams = "?" + mergedUrlParams;
          }
          $this.attr("href", url[0] + mergedUrlParams);
        }
      });
      
    });   
  };
})(jQuery);
